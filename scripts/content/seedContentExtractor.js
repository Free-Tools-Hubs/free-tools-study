import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SEED_DATA_PATH = path.resolve(__dirname, '../seedData.js');

/**
 * Parses realContentMap directly from scripts/seedData.js source.
 */
export function loadSeedRealContentMap() {
  const code = fs.readFileSync(SEED_DATA_PATH, 'utf8');
  const startMarker = 'const realContentMap = {';
  const endMarker = '/* ====================== FALLBACK GENERATOR';
  const startIdx = code.indexOf(startMarker);
  const endIdx = code.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Unable to locate realContentMap in scripts/seedData.js');
  }
  const objCode = code.slice(startIdx + 'const realContentMap = '.length, endIdx).trim();
  // Strip trailing semicolon if present
  const cleanCode = objCode.endsWith(';') ? objCode.slice(0, -1).trim() : objCode;
  
  // Safely evaluate using Function
  const map = new Function(`return (${cleanCode});`)();
  return map;
}

