// lib/fileLoader.ts
import fs from 'fs';
import path from 'path';

export type FileNode = {
    name: string;
    type: 'file' | 'folder';
    path: string;     // Der Pfad für die Anzeige (z.B. src/main.rs)
    content?: string; // Der Inhalt der Datei
    children?: FileNode[];
};

const BASE_PATH = process.cwd(); // Das Hauptverzeichnis deines Projekts

export function getCodeTree(dirPath: string): FileNode[] {
    // Wir bauen den vollen Pfad zum Zielordner
    const fullPath = path.join(BASE_PATH, dirPath);

    // Sicherheitscheck: Existiert der Ordner?
    if (!fs.existsSync(fullPath)) return [];

    const items = fs.readdirSync(fullPath, { withFileTypes: true });

    return items.map((item) => {
        // Der relative Pfad für die Anzeige im Dashboard
        const relativePath = path.join(dirPath, item.name).replace(/\\/g, '/');

        if (item.isDirectory()) {
            return {
                name: item.name,
                type: 'folder',
                path: relativePath,
                children: getCodeTree(relativePath), // Rekursion!
            };
        } else {
            // Dateiinhalt lesen
            const fileContent = fs.readFileSync(path.join(fullPath, item.name), 'utf-8');
            return {
                name: item.name,
                type: 'file',
                path: relativePath,
                content: fileContent,
            };
        }
    });
}