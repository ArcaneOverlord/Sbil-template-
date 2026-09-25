"use client";
import { useState } from 'react';
import Link from 'next/link';
import PreviewModal from '@/components/PreviewModal';
import { posterTemplates, Template } from '@/lib/templates';
import { LayoutTemplate, ArrowLeft } from 'lucide-react';

export default function GalleryPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-[100dvh] bg-slate-950 text-slate-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Back Button */}
        <div className="flex flex-col mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors w-fit">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <LayoutTemplate className="text-blue-500" size={36} />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Template Gallery</h1>
              <p className="text-slate-400 mt-1">Select a design to generate MTD/YTD achievements.</p>
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posterTemplates.map((template) => (
            <div 
              key={template.id}
              onClick={() => handlePreview(template)}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer transition-all duration-300"
            >
              {/* Thumbnail Area */}
              <div className="aspect-[3/4] bg-slate-800 overflow-hidden relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    Preview
                  </span>
                </div>
              </div>
              
              {/* Meta Info */}
              <div className="p-4 border-t border-slate-800">
                <h3 className="font-semibold text-lg text-white truncate">{template.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{template.slots.length} Achiever Slots</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <PreviewModal 
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
