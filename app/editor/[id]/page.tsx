"use client";
import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import PosterCanvas from '@/components/PosterCanvas';
import { Download, ImagePlus, ArrowLeft, Maximize, Move, ZoomIn, ZoomOut } from 'lucide-react';
import { posterTemplates } from '@/lib/templates';
import { notFound, useRouter } from 'next/navigation';

interface AchieverData {
  [key: string]: any; 
  image: string | null;
  imgConfig: { scale: number; x: number; y: number };
}

export default function Editor({ params }: { params: { id: string } }) {
  // If the URL ID doesn't match a template in lib/templates.ts, it triggers a 404
  const template = posterTemplates.find(t => t.id === params.id);
  if (!template) notFound(); 

  const router = useRouter();
  const posterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  
  const [drawerHeight, setDrawerHeight] = useState(15); 
  const [isDraggingDrawer, setIsDraggingDrawer] = useState(false);
  
  const [workspaceZoom, setWorkspaceZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });

  const [achievers, setAchievers] = useState<AchieverData[]>(
    template.slots.map(() => ({ name: '', detail: '', image: null, imgConfig: { scale: 1, x: 0, y: 0 } }))
  );

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      if (confirm("Are you sure you want to leave? All progress will be lost.")) {
        router.push('/gallery');
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  const handleDrawerMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingDrawer) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const windowHeight = window.innerHeight;
    const newHeight = ((windowHeight - clientY) / windowHeight) * 100;
    if (newHeight >= 15 && newHeight <= 65) setDrawerHeight(newHeight);
  };

  const startPan = (e: React.PointerEvent) => {
    setIsPanning(true);
    lastPanPoint.current = { x: e.clientX, y: e.clientY };
  };
  const doPan = (e: React.PointerEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - lastPanPoint.current.x;
    const dy = e.clientY - lastPanPoint.current.y;
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPanPoint.current = { x: e.clientX, y: e.clientY };
  };
  const endPan = () => setIsPanning(false);

  const handleInputFocus = (idx: number) => {
    setActiveSlot(idx);
    setDrawerHeight(65); 
  };

  const handleTextChange = (index: number, field: string, value: string) => {
    const newAchievers = [...achievers];
    newAchievers[index][field] = value;
    setAchievers(newAchievers);
  };

  const handleImgConfigChange = (index: number, field: 'scale' | 'x' | 'y', value: number) => {
    const newAchievers = [...achievers];
    newAchievers[index].imgConfig[field] = value;
    setAchievers(newAchievers);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAchievers = [...achievers];
        newAchievers[index].image = event.target?.result as string;
        newAchievers[index].imgConfig = { scale: 1, x: 0, y: 0 }; 
        setAchievers(newAchievers);
        setActiveSlot(index); 
        setDrawerHeight(65);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const exportPoster = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      setWorkspaceZoom(1); 
      setPan({x:0, y:0});
      await new Promise(r => setTimeout(r, 300)); 
      const dataUrl = await toPng(posterRef.current, { quality: 1, pixelRatio: 1 });
      const link = document.createElement('a');
      link.download = `${template.id}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main 
      className="h-[100dvh] w-full bg-slate-950 text-slate-200 flex flex-col relative overflow-hidden overscroll-none"
      onMouseMove={handleDrawerMove} onTouchMove={handleDrawerMove}
      onMouseUp={() => setIsDraggingDrawer(false)} onTouchEnd={() => setIsDraggingDrawer(false)}
    >
      <div className="fixed top-0 left-0 w-full pt-6 pb-4 px-4 flex justify-between items-center z-50 pointer-events-none bg-gradient-to-b from-slate-950/80 to-transparent">
        <button onClick={() => { if(confirm("Discard progress?")) router.push('/gallery'); }} className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-lg text-white px-4 py-2 rounded-xl text-sm font-medium">
          <ArrowLeft size={18} /> Exit
        </button>
        <button onClick={exportPoster} disabled={isExporting} className="pointer-events-auto flex items-center gap-2 bg-blue-600/90 backdrop-blur-md border border-blue-500 shadow-lg text-white px-4 py-2 rounded-xl text-sm font-medium">
          <Download size={18} /> {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>

      <div 
        className="w-full absolute top-0 left-0 flex justify-center items-center overflow-hidden touch-none"
        style={{ height: `${100 - drawerHeight}%` }}
        onPointerDown={startPan} onPointerMove={doPan} onPointerUp={endPan} onPointerLeave={endPan}
      >
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10 bg-slate-900/80 p-2 rounded-xl border border-slate-700">
           <button onClick={() => setWorkspaceZoom(z => Math.min(z + 0.2, 3))} className="p-2 hover:bg-slate-700 rounded-lg"><ZoomIn size={20}/></button>
           <button onClick={() => {setWorkspaceZoom(1); setPan({x:0, y:0})}} className="text-xs font-bold text-slate-400">RESET</button>
           <button onClick={() => setWorkspaceZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 hover:bg-slate-700 rounded-lg"><ZoomOut size={20}/></button>
        </div>

        <div 
          className="transition-transform duration-75 ease-linear w-full h-full flex items-center justify-center mt-12 cursor-grab active:cursor-grabbing"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${workspaceZoom})` }}
        >
          <PosterCanvas ref={posterRef} template={template} achievers={achievers} />
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.5)] flex flex-col z-40 transition-all duration-300"
        style={{ height: `${drawerHeight}%` }}
      >
        <div 
          className="w-full flex justify-center p-4 cursor-ns-resize touch-none"
          onMouseDown={() => setIsDraggingDrawer(true)} onTouchStart={() => setIsDraggingDrawer(true)}
        >
          <div className="w-16 h-1.5 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors"></div>
        </div>

        <div className="px-6 pb-6 overflow-y-auto flex-1 overscroll-contain">
          <div className="space-y-4">
            {achievers.map((achiever, idx) => (
              <div key={idx} className={`p-4 rounded-xl border transition-colors ${activeSlot === idx ? 'bg-slate-800 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-slate-950 border-slate-800'}`}>
                <h3 className="font-semibold text-amber-400 mb-3 text-sm">Achiever No.{idx + 1}</h3>
                <div className="space-y-3">
                  {template.slots[idx].textBoxes.map(tb => (
                    <input 
                      key={tb.id} type="text" value={achiever[tb.id] || ''}
                      onFocus={() => handleInputFocus(idx)}
                      onChange={(e) => handleTextChange(idx, tb.id, e.target.value)}
                      placeholder={tb.placeholder} 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  ))}
                  <label className="flex items-center justify-center w-full h-12 border border-dashed border-slate-600 rounded-lg hover:border-blue-500 hover:bg-slate-800/50 cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(idx, e)} />
                    <div className="flex items-center gap-2 text-slate-400 text-sm"><ImagePlus size={16} />{achiever.image ? 'Change Photo' : 'Upload Photo'}</div>
                  </label>
                  
                  {achiever.image && (
                    <div className="pt-3 border-t border-slate-700/50 mt-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <Maximize size={14} className="text-slate-500 shrink-0" />
                        <input type="range" min="0.5" max="3" step="0.1" value={achiever.imgConfig.scale} onChange={(e) => handleImgConfigChange(idx, 'scale', parseFloat(e.target.value))} className="w-full accent-blue-500" />
                      </div>
                      <div className="flex items-center gap-3">
                        <Move size={14} className="text-slate-500 shrink-0" />
                        <div className="flex w-full gap-2">
                           <input type="range" min="-300" max="300" step="10" value={achiever.imgConfig.x} onChange={(e) => handleImgConfigChange(idx, 'x', parseInt(e.target.value))} className="w-1/2 accent-slate-400" />
                           <input type="range" min="-300" max="300" step="10" value={achiever.imgConfig.y} onChange={(e) => handleImgConfigChange(idx, 'y', parseInt(e.target.value))} className="w-1/2 accent-slate-400" />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
