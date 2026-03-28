const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'generation-preview', 'page.tsx');

// Read the file
const content = fs.readFileSync(filePath, 'utf8');

// Split into lines
const lines = content.split('\n');

// Keep only the first 986 lines
const truncated = lines.slice(0, 986).join('\n');

// Write back
fs.writeFileSync(filePath, truncated, 'utf8');

console.log('✅ File truncated to 986 lines');
console.log('Removed', lines.length - 986, 'orphaned lines');
