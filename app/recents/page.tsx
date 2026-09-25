import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export default function RecentsDummy() {
  return (
    <main className="min-h-[100dvh] bg-slate-950 text-slate-200 p-6">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div className="flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-slate-800 rounded-3xl">
        <Clock size={48} className="text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Exported Files</h2>
        <p className="text-slate-500">Dummy page. File system tracking will go here.</p>
      </div>
    </main>
  );
}
