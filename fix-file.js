const fs = require('fs');
const path = require('path');

const cleanFile = 'c:\\Users\\aravi\\Desktop\\OpenMAIC\\app\\generation-preview\\page.clean.tsx';
const targetFile = 'c:\\Users\\aravi\\Desktop\\OpenMAIC\\app\\generation-preview\\page.tsx';

try {
  const content = fs.readFileSync(cleanFile, 'utf-8');
  fs.writeFileSync(targetFile, content, 'utf-8');
  fs.unlinkSync(cleanFile);
  console.log('✓ File fixed successfully!');
  console.log('✓ page.tsx has been replaced with the clean version');
  console.log('✓ page.clean.tsx has been deleted');
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
