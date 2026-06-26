const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace text-white with text-main
  content = content.replace(/\btext-white\b/g, 'text-main');
  
  // Replace text-white/opacity with text-main/opacity
  content = content.replace(/\btext-white\/([0-9\.]+)\b/g, 'text-main/$1');

  // Replace border-white/opacity with border-glass/opacity
  content = content.replace(/\bborder-white\/([0-9\.]+)\b/g, 'border-glass/$1');

  // Replace bg-white/opacity with bg-glass/opacity
  content = content.replace(/\bbg-white\/([0-9\.]+)\b/g, 'bg-glass/$1');

  // Replace placeholder-white/opacity with placeholder-main/opacity
  content = content.replace(/\bplaceholder-white\/([0-9\.]+)\b/g, 'placeholder-main/$1');

  // Replace text-white/[0.04] (arbitrary tailwind opacity format)
  content = content.replace(/\btext-white\/\[([^\]]+)\]/g, 'text-main/[$1]');
  content = content.replace(/\bborder-white\/\[([^\]]+)\]/g, 'border-glass/[$1]');
  content = content.replace(/\bbg-white\/\[([^\]]+)\]/g, 'bg-glass/[$1]');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log('All files processed.');
