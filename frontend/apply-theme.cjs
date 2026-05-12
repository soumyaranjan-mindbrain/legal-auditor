const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // 1. Shadows
            content = content.replace(/shadow-xl/g, 'shadow-sm');
            content = content.replace(/shadow-2xl/g, 'shadow-sm');
            content = content.replace(/shadow-lg/g, 'shadow-sm');
            content = content.replace(/shadow-\[.*?\]/g, 'shadow-sm');
            content = content.replace(/shadow-ambient-xl/g, 'shadow-sm');
            content = content.replace(/shadow-ambient-lg/g, 'shadow-sm');

            // 2. Backgrounds for primary surfaces
            content = content.replace(/bg-white dark:bg-zinc-950(?!\/)/g, 'bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm');
            content = content.replace(/bg-white dark:bg-zinc-950\/80/g, 'bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm');
            
            // Fix hardcoded bg-zinc-950 and bg-zinc-900 panels
            content = content.replace(/bg-zinc-950 text-zinc-100/g, 'bg-zinc-950/40 backdrop-blur-sm text-foreground');
            content = content.replace(/bg-zinc-950 text-white/g, 'bg-zinc-950/40 backdrop-blur-sm text-foreground');
            // Remove remaining isolated bg-zinc-950 replacing with bg-zinc-950/40 backdrop-blur-sm
            // Wait, maybe we just replace `bg-white dark:bg-zinc-950` first.
            
            // 3. Border Radius
            content = content.replace(/rounded-lg/g, 'rounded-[6px]');
            content = content.replace(/rounded-xl/g, 'rounded-[6px]');
            content = content.replace(/rounded-2xl/g, 'rounded-[6px]');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated:', fullPath);
            }
        }
    }
}

processDir(path.join(process.cwd(), 'src/pages'));
processDir(path.join(process.cwd(), 'src/components'));
