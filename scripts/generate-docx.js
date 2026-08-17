const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Lightweight PKZip Packer using pure Node.js (zero external dependencies)
class SimpleZip {
  constructor() {
    this.files = [];
  }

  addFile(name, content) {
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf-8');
    const crc = this.crc32(data);
    this.files.push({
      name,
      data,
      crc,
      uncompressedSize: data.length,
      compressedData: zlib.deflateRawSync(data)
    });
  }

  crc32(buf) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      c = SimpleZip.crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  toBuffer() {
    const localHeaders = [];
    const cdHeaders = [];
    let offset = 0;

    for (const file of this.files) {
      const nameBuf = Buffer.from(file.name, 'utf-8');
      
      // Local File Header (30 bytes + name)
      const lh = Buffer.alloc(30 + nameBuf.length);
      lh.writeUInt32LE(0x04034b50, 0); // Signature
      lh.writeUInt16LE(20, 4);         // Version needed
      lh.writeUInt16LE(0, 6);          // General flag
      lh.writeUInt16LE(8, 8);          // Compression method (Deflate)
      lh.writeUInt16LE(0, 10);         // Last mod time
      lh.writeUInt16LE(0, 12);         // Last mod date
      lh.writeUInt32LE(file.crc, 14);  // CRC32
      lh.writeUInt32LE(file.compressedData.length, 18); // Compressed size
      lh.writeUInt32LE(file.uncompressedSize, 22);     // Uncompressed size
      lh.writeUInt16LE(nameBuf.length, 26);            // Filename length
      lh.writeUInt16LE(0, 28);                         // Extra field length
      nameBuf.copy(lh, 30);

      localHeaders.push(lh, file.compressedData);

      // Central Directory Header (46 bytes + name)
      const cdh = Buffer.alloc(46 + nameBuf.length);
      cdh.writeUInt32LE(0x02014b50, 0); // Signature
      cdh.writeUInt16LE(20, 4);          // Version made by
      cdh.writeUInt16LE(20, 6);          // Version needed
      cdh.writeUInt16LE(0, 8);           // General flag
      cdh.writeUInt16LE(8, 10);          // Compression method
      cdh.writeUInt16LE(0, 12);          // Time
      cdh.writeUInt16LE(0, 14);          // Date
      cdh.writeUInt32LE(file.crc, 16);   // CRC32
      cdh.writeUInt32LE(file.compressedData.length, 20); // Comp size
      cdh.writeUInt32LE(file.uncompressedSize, 24);     // Uncomp size
      cdh.writeUInt16LE(nameBuf.length, 28);            // Name length
      cdh.writeUInt16LE(0, 30);                         // Extra length
      cdh.writeUInt16LE(0, 32);                         // Comment length
      cdh.writeUInt16LE(0, 34);                         // Disk number
      cdh.writeUInt16LE(0, 36);                         // Internal attr
      cdh.writeUInt32LE(0, 38);                         // External attr
      cdh.writeUInt32LE(offset, 42);                    // Local header offset
      nameBuf.copy(cdh, 46);

      cdHeaders.push(cdh);
      offset += lh.length + file.compressedData.length;
    }

    const cdOffset = offset;
    const cdSize = cdHeaders.reduce((acc, b) => acc + b.length, 0);

    // End of Central Directory Record (22 bytes)
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0); // Signature
    eocd.writeUInt16LE(0, 4);          // Disk number
    eocd.writeUInt16LE(0, 6);          // Disk where CD starts
    eocd.writeUInt16LE(this.files.length, 8);  // Number of CD records on disk
    eocd.writeUInt16LE(this.files.length, 10); // Total number of CD records
    eocd.writeUInt32LE(cdSize, 12);            // Size of CD
    eocd.writeUInt32LE(cdOffset, 16);          // Offset of CD
    eocd.writeUInt16LE(0, 20);                 // Comment length

    return Buffer.concat([...localHeaders, ...cdHeaders, eocd]);
  }
}

SimpleZip.crcTable = (() => {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xEDB88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

// Build Word Document XML
const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;

const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Segoe UI" w:hAnsi="Segoe UI" w:cs="Segoe UI"/>
        <w:sz w:val="22"/>
        <w:color w:val="2D3748"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>`;

function p(text, options = {}) {
  const { bold, size, color, align, spaceBefore, spaceAfter } = options;
  let pPr = '';
  let rPr = '';

  if (align || spaceBefore || spaceAfter) {
    pPr = '<w:pPr>';
    if (align) pPr += `<w:jc w:val="${align}"/>`;
    if (spaceBefore || spaceAfter) pPr += `<w:spacing w:before="${spaceBefore || 0}" w:after="${spaceAfter || 120}"/>`;
    pPr += '</w:pPr>';
  }

  if (bold || size || color) {
    rPr = '<w:rPr>';
    if (bold) rPr += '<w:b/>';
    if (size) rPr += `<w:sz w:val="${size}"/>`;
    if (color) rPr += `<w:color w:val="${color}"/>`;
    rPr += '</w:rPr>';
  }

  const cleanText = (text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<w:p>${pPr}<w:r>${rPr}<w:t xml:space="preserve">${cleanText}</w:t></w:r></w:p>`;
}

function heading1(text) {
  return p(text, { bold: true, size: 36, color: '0066FF', spaceBefore: 300, spaceAfter: 150 });
}

function heading2(text) {
  return p(text, { bold: true, size: 28, color: '101010', spaceBefore: 240, spaceAfter: 100 });
}

function heading3(text) {
  return p(text, { bold: true, size: 24, color: '0071E3', spaceBefore: 180, spaceAfter: 80 });
}

function bullet(text, boldPrefix = '') {
  const cleanPrefix = boldPrefix.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cleanText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<w:p><w:pPr><w:ind w:left="360"/><w:spacing w:after="80"/></w:pPr><w:r><w:rPr><w:color w:val="0066FF"/><w:b/></w:rPr><w:t xml:space="preserve">▪ </w:t></w:r>${cleanPrefix ? `<w:r><w:rPr><w:b/><w:color w:val="101010"/></w:rPr><w:t xml:space="preserve">${cleanPrefix}: </w:t></w:r>` : ''}<w:r><w:t xml:space="preserve">${cleanText}</w:t></w:r></w:p>`;
}

function callout(text, title = 'IMPORTANT NOTE') {
  return `<w:p><w:pPr><w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="0066FF"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="F0F7FF"/><w:spacing w:before="140" w:after="140"/><w:ind w:left="240" w:right="240"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="0066FF"/><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">${title}: </w:t></w:r><w:r><w:rPr><w:color w:val="334155"/><w:sz w:val="21"/></w:rPr><w:t xml:space="preserve">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</w:t></w:r></w:p>`;
}

// Assemble full bilingual document content
const docBody = [
  p('ATELIEROS — AUTO WORKSHOP OPERATING SYSTEM', { bold: true, size: 40, color: '0066FF', align: 'center', spaceBefore: 200, spaceAfter: 80 }),
  p('MASTER PRODUCT REQUIREMENTS & ARCHITECTURE SPECIFICATION', { bold: true, size: 26, color: '475569', align: 'center', spaceAfter: 60 }),
  p('Engineered for France 🇫🇷 & Switzerland 🇨🇭 • Dual Language: English & Français', { size: 20, color: '64748B', align: 'center', spaceAfter: 300 }),

  callout(
    'All cost estimates, API token fees, hosting plans, and messaging charges in this document are conservative baseline estimates based on current standard vendor rates. Actual operational charges may vary depending on repair order volume, database storage growth, peak SMS/WhatsApp messaging traffic, selected French PDP provider contracts, and client customization preferences.',
    '⚠️ IMPORTANT COST VARIANCE NOTICE'
  ),

  heading1('1. EXECUTIVE SUMMARY & CORE MISSION'),
  p('AtelierOS is a modern, high-precision Operating System for automotive repair workshops operating in France and Switzerland. It eliminates administrative friction and double-booking errors by unifying workshop agenda scheduling, mechanic tablet stations, instant magic-link quote approvals, and regulatory electronic invoicing into a single cohesive platform.'),
  
  heading2('The 4 Core Requirements from Luca Sigon'),
  bullet('AtelierOS generates invoices internally and connects via a pluggable API connector to an approved French Plateforme Agréée (PA/PDP) or Chorus Pro (B2G), keeping staff inside the SaaS with 0 manual uploads.', '1. French E-Invoicing'),
  bullet('Built from Day 1 for France & Switzerland with dual-currency (EUR € / CHF CHF), dynamic VAT rules (FR 20.0% vs CH 8.1%), Swiss UID numbers, and Swiss QR-Bill structured BVR generation.', '2. Swiss & Cross-Border Customers'),
  bullet('A dedicated 60-second browser booking wizard accessible via SMS/Email link sharing the EXACT SAME central calendar engine (lift specs, mechanic skills, 15m buffers) with zero WhatsApp dependency.', '3. Web Booking (No WhatsApp Dependency)'),
  bullet('OpenAI-powered receptionist that understands natural language symptoms ("car squeaks when braking") and books available slots directly from the central scheduling engine.', '4. AI-Assisted Intake'),

  heading1('2. FRENCH E-INVOICING & PDP CLARIFICATION'),
  p('There is an important regulatory separation of duties between AtelierOS and external French tax platforms:'),
  bullet('Calculates parts, labor, deterministic multi-country VAT, generates sequential invoice numbers (FAC-FR-2026-0058), compiles Factur-X / UBL 2.1 XML data, builds Swiss QR-Bills, and renders hybrid PDF documents.', 'AtelierOS Invoicing Core'),
  bullet('Normal B2B electronic invoice transmission and B2C/Cross-Border transaction e-reporting to the French DGFiP network. Paid directly by the garage to their chosen provider (e.g. Pennylane, Sage, etc.). AtelierOS charges €0/mo extra.', 'Plateforme Agréée (PA / PDP)'),
  bullet('Dedicated exclusively to French government/public sector clients (town halls, police, public hospitals). 100% Free state-funded API platform.', 'Chorus Pro (PPF / B2G)'),

  heading1('3. ESTIMATED THIRD-PARTY INFRASTRUCTURE & MONTHLY CHARGES'),
  p('The table below provides a transparent breakdown of baseline operational estimates for both a single-garage MVP pilot and a 10-garage production scale:'),

  bullet('€0.00/mo (Free 300 emails/day) for MVP pilot; €19.00/mo (Starter up to 20,000 emails/mo) for 10 garages.', 'Brevo Email Automation'),
  bullet('€5.00/mo (Meta grants 1,000 free conversations/mo) for MVP; €25.00 - €40.00/mo pooled PAYG across 10 garages.', 'WhatsApp & SMS Alerts'),
  bullet('€2.50/mo (~1.5M tokens GPT-4o-mini) for MVP; €15.00 - €25.00/mo shared token pool for 10 garages.', 'OpenAI Diagnostic Intake'),
  bullet('€0.00/mo (Free tier 500MB DB, 1GB storage) for MVP; €23.00/mo ($25 Pro Tier with daily backups & PITR) for 10 garages.', 'Supabase PostgreSQL 16'),
  bullet('€0.00/mo (Hobby Tier) for MVP; €18.50/mo ($20 Pro Tier per team developer) for 10 garages.', 'Vercel Edge Hosting'),
  bullet('Chorus Pro is 100% Free; PA/PDP subscription is managed directly by the garage. AtelierOS surcharge: €0.00/mo.', 'Approved French PDP'),
  p('ESTIMATED PILOT TOTAL: ~€7.50 / month • ESTIMATED 10-GARAGE TOTAL: ~€100.50 / month (~€10 / garage / month)', { bold: true, color: '0066FF', spaceBefore: 80, spaceAfter: 120 }),

  heading1('4. RÉSUMÉ EN FRANÇAIS (FRENCH SPECIFICATION)'),
  p("AtelierOS est le système d'exploitation nouvelle génération pour ateliers automobiles en France et en Suisse. Il intègre le planning centralisé, les tablettes mécaniciens 48px résistantes aux graisses, la validation de devis par lien magique en moins de 3 minutes et la facturation conforme Factur-X / QR-Facture suisse."),
  bullet("Connexion API standardisée vers une Plateforme Agréée (PA) pour les entreprises et Chorus Pro pour le secteur public, avec mise à jour automatique des statuts (Transmise -> Validée -> Acceptée).", "Facturation Électronique Française"),
  bullet("Gestion native EUR (€) et CHF (CHF), calcul déterministe de la TVA (France 20.0% / Suisse 8.1%), numéros IDE suisses et générateur de QR-Facture BVR structurée à 27 chiffres.", "Clients Suisses & Transfrontaliers"),
  bullet("Page web accessible en 60 secondes sans dépendance à WhatsApp, connectée au même moteur de planning (ponts élévateurs, compétences mécaniciens, battements 15 min).", "Prise de Rendez-Vous Web"),
  bullet("Compréhension des symptômes en langage naturel et proposition de créneaux réels directement reliés au planning central.", "Accueil par IA (AutoAI)"),

  heading1('5. CLIENT REVIEW & FEEDBACK REQUEST'),
  p("We are committed to delivering the exact workflow that best supports your workshop operations.", { spaceAfter: 80 }),
  callout(
    "Please let us know if you would like any adjustments, if anything needs refinement or clarification, or if your garage accountant has specific preferences regarding the Plateforme Agréée (PA) provider selection. We are ready to adjust any technical detail upon your request!",
    "💬 CLIENT FEEDBACK INVITATION"
  ),
  p('Document Version 4.3.0 • AtelierOS Engineering Team • 2026', { size: 18, color: '94A3B8', align: 'center', spaceBefore: 200 })
];

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${docBody.join('')}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

// Package into ZIP / DOCX
const zip = new SimpleZip();
zip.addFile('[Content_Types].xml', contentTypesXml);
zip.addFile('_rels/.rels', relsXml);
zip.addFile('word/_rels/document.xml.rels', docRelsXml);
zip.addFile('word/styles.xml', stylesXml);
zip.addFile('word/document.xml', documentXml);

const docxBuffer = zip.toBuffer();

const outDir1 = path.join(__dirname, '..', 'docs');
const outDir2 = path.join(__dirname, '..', 'public', 'docs');

if (!fs.existsSync(outDir1)) fs.mkdirSync(outDir1, { recursive: true });
if (!fs.existsSync(outDir2)) fs.mkdirSync(outDir2, { recursive: true });

const docxPath1 = path.join(outDir1, 'AtelierOS_Master_PRD_Architecture.docx');
const docxPath2 = path.join(outDir2, 'AtelierOS_Master_PRD_Architecture.docx');

fs.writeFileSync(docxPath1, docxBuffer);
fs.writeFileSync(docxPath2, docxBuffer);

console.log(`✓ Master DOCX successfully generated! File size: ${docxBuffer.length} bytes`);
