import React from 'react';
import { getCodeTree } from '@/lib/fileLoader';
import CodeClient from './CodeClient';

export default function CodePage() {
    // Holt die Struktur aus dem Ordner 'demo-code'
    const fileTree = getCodeTree('demo-code');

    return <CodeClient initialFileTree={fileTree} />;
}