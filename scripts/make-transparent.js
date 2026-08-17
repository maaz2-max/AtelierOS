const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const inputPath = 'C:\\Users\\91725\\.gemini\\antigravity\\brain\\75ee8ebd-6054-44ef-8a2d-9d149049317e\\.user_uploaded\\media_1786999353652.png';
const outPath1 = path.join(__dirname, '..', 'assets', 'ai_logo.png');
const outPath2 = path.join(__dirname, '..', 'public', 'assets', 'ai_logo.png');

function processPng(buffer) {
  // Check PNG signature
  if (buffer.readUInt32BE(0) !== 0x89504E47 || buffer.readUInt32BE(4) !== 0x0D0A1A0A) {
    throw new Error('Not a valid PNG');
  }

  let offset = 8;
  let width, height, bitDepth, colorType;
  let idatChunks = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const data = buffer.slice(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      console.log(`PNG Dimensions: ${width}x${height}, BitDepth: ${bitDepth}, ColorType: ${colorType}`);
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);

  // Determine bytes per pixel
  let bpp = 4;
  if (colorType === 2) bpp = 3; // RGB
  else if (colorType === 6) bpp = 4; // RGBA

  const rowSize = width * bpp;
  const newRowSize = width * 4;
  const newDecompressed = Buffer.alloc(height * (1 + newRowSize));

  let srcOffset = 0;
  let dstOffset = 0;

  // Unfilter scanlines and convert to RGBA
  let prevRawRow = Buffer.alloc(width * 4);
  const rawRows = [];

  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcOffset++];
    const rawRow = Buffer.alloc(width * 4);

    for (let x = 0; x < width; x++) {
      let r, g, b, a = 255;
      if (bpp === 3) {
        r = decompressed[srcOffset++];
        g = decompressed[srcOffset++];
        b = decompressed[srcOffset++];
      } else {
        r = decompressed[srcOffset++];
        g = decompressed[srcOffset++];
        b = decompressed[srcOffset++];
        a = decompressed[srcOffset++];
      }

      // Unfilter based on filterType
      let leftR = x > 0 ? rawRow[(x - 1) * 4] : 0;
      let leftG = x > 0 ? rawRow[(x - 1) * 4 + 1] : 0;
      let leftB = x > 0 ? rawRow[(x - 1) * 4 + 2] : 0;
      let leftA = x > 0 ? rawRow[(x - 1) * 4 + 3] : 0;

      let upR = prevRawRow[x * 4];
      let upG = prevRawRow[x * 4 + 1];
      let upB = prevRawRow[x * 4 + 2];
      let upA = prevRawRow[x * 4 + 3];

      let upLeftR = (x > 0) ? prevRawRow[(x - 1) * 4] : 0;
      let upLeftG = (x > 0) ? prevRawRow[(x - 1) * 4 + 1] : 0;
      let upLeftB = (x > 0) ? prevRawRow[(x - 1) * 4 + 2] : 0;
      let upLeftA = (x > 0) ? prevRawRow[(x - 1) * 4 + 3] : 0;

      if (filterType === 1) { // Sub
        r = (r + leftR) & 0xFF;
        g = (g + leftG) & 0xFF;
        b = (b + leftB) & 0xFF;
        a = (a + leftA) & 0xFF;
      } else if (filterType === 2) { // Up
        r = (r + upR) & 0xFF;
        g = (g + upG) & 0xFF;
        b = (b + upB) & 0xFF;
        a = (a + upA) & 0xFF;
      } else if (filterType === 3) { // Average
        r = (r + Math.floor((leftR + upR) / 2)) & 0xFF;
        g = (g + Math.floor((leftG + upG) / 2)) & 0xFF;
        b = (b + Math.floor((leftB + upB) / 2)) & 0xFF;
        a = (a + Math.floor((leftA + upA) / 2)) & 0xFF;
      } else if (filterType === 4) { // Paeth
        r = (r + paeth(leftR, upR, upLeftR)) & 0xFF;
        g = (g + paeth(leftG, upG, upLeftG)) & 0xFF;
        b = (b + paeth(leftB, upB, upLeftB)) & 0xFF;
        a = (a + paeth(leftA, upA, upLeftA)) & 0xFF;
      }

      // Check for white / near white background
      // The background is pure white #FFFFFF (or very close > 248)
      if (r >= 245 && g >= 245 && b >= 245) {
        a = 0;
      } else if (r > 225 && g > 225 && b > 225) {
        // Soft alpha feathering on white halo edges
        const maxVal = Math.min(r, g, b);
        a = Math.round(255 * (1 - (maxVal - 225) / 20));
      }

      rawRow[x * 4] = r;
      rawRow[x * 4 + 1] = g;
      rawRow[x * 4 + 2] = b;
      rawRow[x * 4 + 3] = a;
    }

    prevRawRow = rawRow;
    rawRows.push(rawRow);
  }

  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }

  // Pack as uncompressed filter 0 (None) RGBA
  let packOffset = 0;
  for (let y = 0; y < height; y++) {
    newDecompressed[packOffset++] = 0; // Filter None
    rawRows[y].copy(newDecompressed, packOffset);
    packOffset += width * 4;
  }

  const newCompressed = zlib.deflateSync(newDecompressed, { level: 9 });

  // Build new PNG
  const chunks = [];
  chunks.push(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])); // Signature

  // IHDR (Color Type 6 = RGBA)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  chunks.push(createChunk('IHDR', ihdrData));

  // IDAT
  chunks.push(createChunk('IDAT', newCompressed));

  // IEND
  chunks.push(createChunk('IEND', Buffer.alloc(0)));

  const finalPng = Buffer.concat(chunks);
  fs.writeFileSync(outPath1, finalPng);
  fs.writeFileSync(outPath2, finalPng);
  console.log(`✓ Transparent PNG saved! Output size: ${finalPng.length} bytes`);
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(calculateCrc(body), 0);
  return Buffer.concat([len, body, crc]);
}

// Standard CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xEDB88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function calculateCrc(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

const inputBuffer = fs.readFileSync(inputPath);
processPng(inputBuffer);
