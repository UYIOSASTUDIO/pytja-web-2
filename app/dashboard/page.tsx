// WICHTIG: Nutze @/lib... und achte auf fileLoader (großes L)
import { getCodeTree } from '@/lib/fileLoader';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
    // HIER gibst du den Ordnernamen an!
    const fileTree = getCodeTree('demo-code');

    return <DashboardClient initialFileTree={fileTree} />;
}