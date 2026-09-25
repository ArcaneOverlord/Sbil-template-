"use client";
import React from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { Template } from '@/lib/templates';

interface PreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PreviewModal({ template, isOpen, onClose }: PreviewModalProps) {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col md:flex-row overflow-hidden shadow-2xl">
        
        {/* Left Side: Scaled Preview (Fixed Mobile Overflow) */}
        <div className="w-full md:w-2/3 bg-slate-950 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-700 h-[45vh] md:h-auto">
          <img 
            src={template.thumbnail} 
            alt={template.name} 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-1/3 p-6 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-white">{template.name}</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full bg-slate-800/50">
              <X size={20} />
            </button>
          </div>
          <p className="text-slate-400 text-sm mb-6">{template.description}</p>
          
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-amber-400">{template.slots.length}</span> Image Slots Available
            </p>
            <p className="text-sm text-slate-300 mt-1">
              Format: <span className="font-semibold">A3 (300 DPI)</span>
            </p>
          </div>

          <div className="mt-auto pb-2">
            <Link 
              href={`/editor/${template.id}`}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              Create Poster <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
