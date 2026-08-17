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
      
      const lh = Buffer.alloc(30 + nameBuf.length);
      lh.writeUInt32LE(0x04034b50, 0);
      lh.writeUInt16LE(20, 4);
      lh.writeUInt16LE(0, 6);
      lh.writeUInt16LE(8, 8);
      lh.writeUInt16LE(0, 10);
      lh.writeUInt16LE(0, 12);
      lh.writeUInt32LE(file.crc, 14);
      lh.writeUInt32LE(file.compressedData.length, 18);
      lh.writeUInt32LE(file.uncompressedSize, 22);
      lh.writeUInt16LE(nameBuf.length, 26);
      lh.writeUInt16LE(0, 28);
      nameBuf.copy(lh, 30);

      localHeaders.push(lh, file.compressedData);

      const cdh = Buffer.alloc(46 + nameBuf.length);
      cdh.writeUInt32LE(0x02014b50, 0);
      cdh.writeUInt16LE(20, 4);
      cdh.writeUInt16LE(20, 6);
      cdh.writeUInt16LE(0, 8);
      cdh.writeUInt16LE(8, 10);
      cdh.writeUInt16LE(0, 12);
      cdh.writeUInt16LE(0, 14);
      cdh.writeUInt32LE(file.crc, 16);
      cdh.writeUInt32LE(file.compressedData.length, 20);
      cdh.writeUInt32LE(file.uncompressedSize, 24);
      cdh.writeUInt16LE(nameBuf.length, 28);
      cdh.writeUInt16LE(0, 30);
      cdh.writeUInt16LE(0, 32);
      cdh.writeUInt16LE(0, 34);
      cdh.writeUInt16LE(0, 36);
      cdh.writeUInt32LE(0, 38);
      cdh.writeUInt32LE(offset, 42);
      nameBuf.copy(cdh, 46);

      cdHeaders.push(cdh);
      offset += lh.length + file.compressedData.length;
    }

    const cdOffset = offset;
    const cdSize = cdHeaders.reduce((acc, b) => acc + b.length, 0);

    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0);
    eocd.writeUInt16LE(0, 4);
    eocd.writeUInt16LE(0, 6);
    eocd.writeUInt16LE(this.files.length, 8);
    eocd.writeUInt16LE(this.files.length, 10);
    eocd.writeUInt32LE(cdSize, 12);
    eocd.writeUInt32LE(cdOffset, 16);
    eocd.writeUInt16LE(0, 20);

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

// XML Boilerplates
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
      <w:rFonts w:ascii="Segoe UI" w:hAnsi="Segoe UI" w:cs="Segoe UI"/>
      <w:sz w:val="21"/>
      <w:color w:val="2D3748"/>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>`;

function escapeXml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function p(text, options = {}) {
  const { bold, size, color, align, spaceBefore, spaceAfter } = options;
  let pPr = '';
  let rPr = '';

  if (align || spaceBefore || spaceAfter) {
    pPr = '<w:pPr>';
    if (align) pPr += `<w:jc w:val="${align}"/>`;
    if (spaceBefore || spaceAfter) pPr += `<w:spacing w:before="${spaceBefore || 0}" w:after="${spaceAfter || 100}"/>`;
    pPr += '</w:pPr>';
  }

  if (bold || size || color) {
    rPr = '<w:rPr>';
    if (bold) rPr += '<w:b/>';
    if (size) rPr += `<w:sz w:val="${size}"/>`;
    if (color) rPr += `<w:color w:val="${color}"/>`;
    rPr += '</w:rPr>';
  }

  return `<w:p>${pPr}<w:r>${rPr}<w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
}

function heading1(text) {
  return p(text, { bold: true, size: 30, color: '0066FF', spaceBefore: 280, spaceAfter: 120 });
}

function heading2(text) {
  return p(text, { bold: true, size: 24, color: '0F172A', spaceBefore: 200, spaceAfter: 80 });
}

function bullet(text) {
  return `<w:p><w:pPr><w:ind w:left="360"/><w:spacing w:after="70"/></w:pPr><w:r><w:rPr><w:color w:val="0066FF"/><w:b/></w:rPr><w:t xml:space="preserve">▪ </w:t></w:r><w:r><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
}

function sectionLabel(text) {
  return `<w:p><w:pPr><w:spacing w:before="240" w:after="60"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="64748B"/><w:caps/></w:rPr><w:t xml:space="preserve">// ${escapeXml(text)}</w:t></w:r></w:p>`;
}

function flowBanner(stepsOrRows) {
  const isArray = Array.isArray(stepsOrRows);
  const text = isArray ? stepsOrRows.join('  ➔  ') : stepsOrRows;
  return `<w:p><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:spacing w:before="100" w:after="100"/><w:ind w:left="180" w:right="180"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="0F172A"/><w:sz w:val="20"/></w:rPr><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
}

function callout(text, title = 'IMPORTANT NOTE') {
  return `<w:p><w:pPr><w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="0066FF"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="F0F7FF"/><w:spacing w:before="120" w:after="120"/><w:ind w:left="240" w:right="240"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="0066FF"/><w:sz w:val="21"/></w:rPr><w:t xml:space="preserve">${title}: </w:t></w:r><w:r><w:rPr><w:color w:val="334155"/><w:sz w:val="20"/></w:rPr><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
}

function renderTable(headers, rows) {
  let tblXml = '<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:left w:val="none"/><w:right w:val="none"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/><w:insideV w:val="none"/></w:tblBorders></w:tblPr>';

  // Header Row
  tblXml += '<w:tr><w:trPr><w:tblHeader/></w:trPr>';
  headers.forEach(h => {
    tblXml += `<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/></w:tcPr><w:p><w:pPr><w:spacing w:before="80" w:after="80"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="0F172A"/></w:rPr><w:t xml:space="preserve">${escapeXml(h)}</w:t></w:r></w:p></w:tc>`;
  });
  tblXml += '</w:tr>';

  // Data Rows
  rows.forEach(r => {
    tblXml += '<w:tr>';
    r.forEach(cell => {
      tblXml += `<w:tc><w:p><w:pPr><w:spacing w:before="60" w:after="60"/></w:pPr><w:r><w:rPr><w:sz w:val="19"/><w:color w:val="334155"/></w:rPr><w:t xml:space="preserve">${escapeXml(cell)}</w:t></w:r></w:p></w:tc>`;
    });
    tblXml += '</w:tr>';
  });

  tblXml += '</w:tbl>';
  return tblXml;
}

// Load PRD JSON
const prdJsonPath = path.join(__dirname, '..', 'docs', 'PRD_MASTER_SPECIFICATION.json');
const prdData = JSON.parse(fs.readFileSync(prdJsonPath, 'utf-8'));

const docBody = [];

// Title & Metadata
docBody.push(p('CLIENT REQUIREMENTS — FUNCTIONAL & TECHNICAL SPECIFICATION', { bold: true, size: 36, color: '0066FF', align: 'center', spaceBefore: 200, spaceAfter: 80 }));
docBody.push(p('Automotive Workshop Management SaaS • France 🇫🇷 & Switzerland 🇨🇭', { bold: true, size: 22, color: '475569', align: 'center', spaceAfter: 40 }));
docBody.push(p('Bilingual Edition: English & Français • Scope: Central Scheduling, Invoicing, Tax, AI, Multi-Tenancy', { size: 18, color: '64748B', align: 'center', spaceAfter: 240 }));

// Document Note Callout
docBody.push(callout(prdData.document_note.english, 'DOCUMENT NOTE (EN)'));
docBody.push(callout(prdData.document_note.french, 'NOTE DU DOCUMENT (FR)'));

// Render Function for Language Sections
function renderLanguageSections(sections, langPrefix) {
  docBody.push(p(`=== PART: ${langPrefix.toUpperCase()} SPECIFICATION ===`, { bold: true, size: 28, color: '0066FF', spaceBefore: 300, spaceAfter: 120 }));

  sections.forEach(sec => {
    docBody.push(heading1(sec.title));

    sec.content.forEach(item => {
      if (item.type === 'paragraph') {
        docBody.push(p(item.text, { spaceAfter: 80 }));
      } else if (item.type === 'bullet') {
        docBody.push(bullet(item.text));
      } else if (item.type === 'section_label') {
        docBody.push(sectionLabel(item.text));
      } else if (item.type === 'callout') {
        docBody.push(callout(item.text, 'CRITICAL NOTE'));
      } else if (item.type === 'flow') {
        docBody.push(flowBanner(item.steps));
      } else if (item.type === 'banner_or_flow') {
        if (item.rows) {
          item.rows.forEach(r => docBody.push(flowBanner(r)));
        }
      } else if (item.type === 'table') {
        docBody.push(renderTable(item.headers, item.rows));
      } else if (item.type === 'subsection') {
        docBody.push(heading2(item.title));
        if (item.content) {
          item.content.forEach(subItem => {
            if (subItem.type === 'bullet') docBody.push(bullet(subItem.text));
            else if (subItem.type === 'paragraph') docBody.push(p(subItem.text));
          });
        }
      }
    });
  });
}

// Render English Sections
renderLanguageSections(prdData.english.sections, 'English');

// Render French Sections
renderLanguageSections(prdData.french.sections, 'Français');

// Document Footer
docBody.push(p('End of Specification • Functional & Technical PRD Verified • 2026', { size: 18, color: '94A3B8', align: 'center', spaceBefore: 240 }));

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

const docxPath1 = path.join(outDir1, 'Client_Requirements_Technical_PRD_EN_FR_Verified.docx');
const docxPath2 = path.join(outDir2, 'Client_Requirements_Technical_PRD_EN_FR_Verified.docx');
const legacyDocxPath1 = path.join(outDir1, 'AtelierOS_Master_PRD_Architecture.docx');
const legacyDocxPath2 = path.join(outDir2, 'AtelierOS_Master_PRD_Architecture.docx');

fs.writeFileSync(docxPath1, docxBuffer);
fs.writeFileSync(docxPath2, docxBuffer);
fs.writeFileSync(legacyDocxPath1, docxBuffer);
fs.writeFileSync(legacyDocxPath2, docxBuffer);

console.log(`✓ Master DOCX successfully compiled! File size: ${docxBuffer.length} bytes`);
