const fs = require('fs');
const path = require('path');

const API_BASE_URL_IMPORT = `import { API_BASE_URL } from '@/utils/api';\n`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    if (!content.includes('http://localhost:8080')) return;

    // Add import if not present
    if (!content.includes('API_BASE_URL')) {
        // Find the last import statement or put it at the top after "use client" if it exists
        if (content.includes('"use client"')) {
            content = content.replace('"use client";', '"use client";\n' + API_BASE_URL_IMPORT);
        } else {
            content = API_BASE_URL_IMPORT + content;
        }
    }

    // Replace strings
    // Cases:
    // 'http://localhost:8080/api/...' -> `${API_BASE_URL}/api/...`
    // `http://localhost:8080/api/...` -> `${API_BASE_URL}/api/...`
    
    // Replace single quotes
    content = content.replace(/'http:\/\/localhost:8080([^']*)'/g, '`${API_BASE_URL}$1`');
    // Replace double quotes
    content = content.replace(/"http:\/\/localhost:8080([^"]*)"/g, '`${API_BASE_URL}$1`');
    // Replace inside template literals
    content = content.replace(/http:\/\/localhost:8080/g, '${API_BASE_URL}');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            processFile(fullPath);
        }
    }
}

walkDir(path.join(__dirname, 'app'));
