"use client";
import Link from 'next/link';
import InstallPWA from '@/components/InstallPWA';
import { Image as ImageIcon, FolderClock, LayoutTemplate, HelpCircle, User } from 'lucide-react';

export default function Home() {
  return (
    // FIX: Changed min-h-[100dvh] to min-h-[100svh] to fix the downward push
    <main className="min-h-[100svh] bg-slate-950 text-slate-200 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* UI IMPROVEMENT: Added Support and Account buttons to top right */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-5 bg-slate-900/50 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
        <button className="text-slate-400 hover:text-white transition-colors flex flex-col items-center gap-1">
          <HelpCircle size={20} />
          <span className="text-[10px] font-medium">Support</span>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors flex flex-col items-center gap-1">
          <User size={20} />
          <span className="text-[10px] font-medium">Account</span>
        </button>
        <div className="w-px h-8 bg-slate-700 mx-1"></div>
        <InstallPWA />
      </div>

      <div className="flex flex-col items-center text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] mb-6">
          <ImageIcon size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">PosterGen</h1>
        <p className="text-slate-400">SBI Life Achievement Posters</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl px-4 relative z-10">
        <Link href="/gallery" className="flex-1 group bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LayoutTemplate size={32} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Template Gallery</h2>
          <p className="text-sm text-slate-400">Browse and create new posters from available templates.</p>
        </Link>

        <Link href="/recents" className="flex-1 group bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FolderClock size={32} className="text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Exported Files</h2>
          <p className="text-sm text-slate-400">View your previously exported and recent templates.</p>
        </Link>
      </div>
    </main>
  );
}
