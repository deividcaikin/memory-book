const fs = require('fs');
const path = require('path');

// Path to your Photos folder
const photosDir = path.join(__dirname, 'Photos');

// Supported image formats
const formats = ['.jpg', '.jpeg', '.png', '.gif'];

// Extract number from IMG_####.jpg filenames
function getImgNumber(filename) {
  const match = filename.match(/IMG_(\d+)\./i);
  return match ? parseInt(match[1], 10) : Infinity;
}

// Read all files in folder
const allFiles = fs.readdirSync(photosDir)
  .filter(file => formats.includes(path.extname(file).toLowerCase()));

// photo1 always goes first, rest sorted by IMG number
const photo1   = allFiles.filter(f =>  f.toLowerCase().startsWith('photo1'));
const imgFiles = allFiles
  .filter(f => !f.toLowerCase().startsWith('photo1'))
  .sort((a, b) => getImgNumber(a) - getImgNumber(b));

const files = [...photo1, ...imgFiles].map(f => `"Photos/${f}"`);

// Make the JS array string
const arrayString = `const photos = [\n  ${files.join(',\n  ')}\n];\n`;

// Write to file
fs.writeFileSync('photosArray.js', arrayString);

console.log('photosArray.js generated successfully!');
console.log(arrayString);