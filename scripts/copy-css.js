const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');

function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    fs.readdirSync(src).forEach((file) => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else if (file.endsWith('.scss')) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${file}`);
        }
    });
}

copyRecursive(srcDir, distDir);
