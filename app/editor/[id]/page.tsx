"use client";
import { useState, useRef, useEffect, use } from 'react';
import { toPng } from 'html-to-image';
import PosterCanvas from '@/components/PosterCanvas';
import { Download, ImagePlus, ArrowLeft, Maximize, Move, ZoomIn, ZoomOut, Lock, Unlock, Settings } from 'lucide-react';
import { posterTemplates } from '@/lib/templates';
import { notFound, useRouter } from 'next/navigation';

interface AchieverData {
  [key: string]: any; 
  name: string;
  metricValue: string;
  metricUnit: string;
  image: string | null;
  imgConfig: { scale: number; x: number; y: number };
}

export default function Editor(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const template = posterTemplates.find(t => t.id === params.id);
  if (!template) notFound(); 

  const router = useRouter();
  const posterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [drawerHeight, setDrawerHeight] = useState(15); 
  const [isDraggingDrawer, setIsDraggingDrawer] = useState(false);
  const [isPanEnabled, setIsPanEnabled] = useState(false);
  const [workspaceZoom, setWorkspaceZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 }); 
  const [isPanning, setIsPanning] = useState(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });
  const [viewportHeight, setViewportHeight] = useState('100vh');

  // NEW: Global Config States
  const [globalBanner, setGlobalBanner] = useState('MTD TOPPERS');
  const [globalMetric, setGlobalMetric] = useState('Prem');
  const [globalUnit, setGlobalUnit] = useState('Cr');

  const [achievers, setAchievers] = useState<AchieverData[]>(
    template.slots.map(() => ({ name: '', metricValue: '', metricUnit: 'Cr', image: null, imgConfig: { scale: 1, x: 0, y: 0 } }))
  );

  useEffect(() => {
    const updateHeight = () => setViewportHeight(`${window.innerHeight}px`);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      if (confirm("Are you sure you want to leave? All progress will be lost.")) router.push('/gallery');
    };
    window.addEventListener('popstate', handlePopState);
    const handleBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('resize', updateHeight);
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

  const startPan = (e: React.PointerEvent) => { if (!isPanEnabled) return; setIsPanning(true); lastPanPoint.current = { x: e.clientX, y: e.clientY }; };
  const doPan = (e: React.PointerEvent) => {
    if (!isPanning || !isPanEnabled) return;
    const dx = e.clientX - lastPanPoint.current.x; const dy = e.clientY - lastPanPoint.current.y;
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPanPoint.current = { x: e.clientX, y: e.clientY };
  };
  const endPan = () => setIsPanning(false);

  const handleInputFocus = (idx: number) => { setActiveSlot(idx); setDrawerHeight(65); };

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

  const handleGlobalUnitChange = (newUnit: string) => {
    setGlobalUnit(newUnit);
    // Bulk update all achievers when the global default is changed
    setAchievers(prev => prev.map(a => ({ ...a, metricUnit: newUnit })));
  };

  const exportPoster = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      setIsPanEnabled(false); 
      await new Promise(r => setTimeout(r, 150)); 
      const dataUrl = await toPng(posterRef.current, { quality: 1, pixelRatio: 1 });
      const link = document.createElement('a');
      link.download = `${template.id}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert('Export failed.'); } finally { setIsExporting(false); }
  };

  return (
    <main 
      className="fixed top-0 left-0 w-full bg-slate-950 text-slate-200 flex flex-col overflow-hidden overscroll-none touch-none"
      style={{ height: viewportHeight }}
      onMouseMove={handleDrawerMove} onTouchMove={handleDrawerMove}
      onMouseUp={() => setIsDraggingDrawer(false)} onTouchEnd={() => setIsDraggingDrawer(false)}
    >
      <div className="absolute top-0 left-0 w-full pt-6 pb-4 px-4 flex justify-between items-center z-50 pointer-events-none bg-gradient-to-b from-slate-950/80 to-transparent">
        <button onClick={() => { if(confirm("Discard progress?")) router.push('/gallery'); }} className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-lg text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-slate-800">
          <ArrowLeft size={18} /> Exit
        </button>
        <button onClick={exportPoster} disabled={isExporting} className="pointer-events-auto flex items-center gap-2 bg-blue-600/90 backdrop-blur-md border border-blue-500 shadow-lg text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-blue-500">
          <Download size={18} /> {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>

      <div 
        className={`w-full absolute top-0 left-0 flex justify-center items-center overflow-hidden pt-[80px] pb-4 ${isPanEnabled ? 'touch-none' : ''}`}
        style={{ height: `${100 - drawerHeight}%` }}
        onPointerDown={startPan} onPointerMove={doPan} onPointerUp={endPan} onPointerLeave={endPan}
      >
        <div className="absolute right-4 bottom-2 mb-2 flex flex-col gap-2 z-10 bg-slate-900/80 p-2 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg">
           <button 
              onClick={() => setIsPanEnabled(!isPanEnabled)} 
              className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-bold transition-all ${isPanEnabled ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
           >
              {isPanEnabled ? <Unlock size={18} className="mb-1" /> : <Lock size={18} className="mb-1" />}
              {isPanEnabled ? 'MOVE' : 'LOCK'}
           </button>
           {isPanEnabled && (
             <div className="flex flex-col gap-1 mt-1 pt-2 border-t border-slate-700/50 animate-in fade-in zoom-in duration-200">
               <button onClick={() => setWorkspaceZoom(z => Math.min(z + 0.2, 3))} className="p-2 hover:bg-slate-700 rounded-lg text-white transition-colors"><ZoomIn size={18}/></button>
               <button onClick={() => {setWorkspaceZoom(1); setPan({x:0, y:0})}} className="text-[10px] font-bold text-slate-400 py-1 hover:text-white transition-colors">RESET</button>
               <button onClick={() => setWorkspaceZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 hover:bg-slate-700 rounded-lg text-white transition-colors"><ZoomOut size={18}/></button>
             </div>
           )}
        </div>

        <div 
          className={`transition-transform w-full h-full flex items-center justify-center ${isPanEnabled ? 'duration-0 cursor-grab active:cursor-grabbing' : 'duration-300 pointer-events-none'}`}
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${workspaceZoom})` }}
        >
          {/* Passed the new global states into the Canvas Engine */}
          <PosterCanvas ref={posterRef} template={template} achievers={achievers} globalBanner={globalBanner} globalMetric={globalMetric} />
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
          
          {/* NEW: Global Poster Settings Module */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={16} className="text-slate-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block font-medium">Banner Text</label>
                <select
                  value={globalBanner} onChange={(e) => setGlobalBanner(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
                >
                  <option value="MTD TOPPERS">MTD TOPPERS</option>
                  <option value="YTD TOPPERS">YTD TOPPERS</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block font-medium">Default Master Values</label>
                <div className="flex gap-2">
                  <select
                    value={globalMetric} onChange={(e) => setGlobalMetric(e.target.value)}
                    className="w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="Prem">Prem</option>
                    <option value="Sales">Sales</option>
                    <option value="Rev">Revenue</option>
                  </select>
                  <input
                    type="text" disabled placeholder="Value"
                    className="w-1/3 bg-slate-900/50 border border-slate-800 rounded-lg px-2 py-2 text-sm text-slate-600 text-center cursor-not-allowed"
                  />
                  <select
                    value={globalUnit} onChange={(e) => handleGlobalUnitChange(e.target.value)}
                    className="w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="Cr">CR</option>
                    <option value="Lakhs">Lakhs</option>
                    <option value="Lakh">Lakh</option>
                    <option value="K">K</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {achievers.map((achiever, idx) => (
              <div key={idx} className={`p-4 rounded-xl border transition-all duration-300 ${activeSlot === idx ? 'bg-slate-800 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-slate-950 border-slate-800'}`}>
                <h3 className="font-semibold text-amber-400 mb-3 text-sm">Achiever No.{idx + 1}</h3>
                <div className="space-y-3">
                  
                  {/* Name Input */}
                  <input 
                    type="text" value={achiever.name}
                    onFocus={() => handleInputFocus(idx)}
                    onChange={(e) => handleTextChange(idx, 'name', e.target.value)}
                    placeholder="Enter Name" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                  
                  {/* The 3-Part Achiever Value UI */}
                  <div className="flex gap-2">
                    <div className="w-1/3 bg-slate-900/80 border border-slate-800 rounded-lg px-2 py-2 text-sm text-slate-500 flex items-center justify-center font-medium">
                      {globalMetric}
                    </div>
                    <input 
                      type="number" value={achiever.metricValue}
                      onFocus={() => handleInputFocus(idx)}
                      onChange={(e) => handleTextChange(idx, 'metricValue', e.target.value)}
                      placeholder="Value" 
                      className="w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-center" 
                    />
                    <select
                      value={achiever.metricUnit}
                      onChange={(e) => handleTextChange(idx, 'metricUnit', e.target.value)}
                      className="w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
                    >
                      <option value="Cr">CR</option>
                      <option value="Lakhs">Lakhs</option>
                      <option value="Lakh">Lakh</option>
                      <option value="K">K</option>
                    </select>
                  </div>

                  <label className="flex items-center justify-center w-full h-12 border border-dashed border-slate-600 rounded-lg hover:border-blue-500 hover:bg-slate-800/50 cursor-pointer transition-colors mt-2">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(idx, e)} />
                    <div className="flex items-center gap-2 text-slate-400 text-sm"><ImagePlus size={16} />{achiever.image ? 'Change Photo' : 'Upload Photo'}</div>
                  </label>
                  
                  {achiever.image && (
                    <div className="pt-3 border-t border-slate-700/50 mt-3 space-y-3 animate-in fade-in duration-300">
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
            <div className="h-80 sm:h-8 w-full shrink-0 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
