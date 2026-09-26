"use client";
import React, { forwardRef } from 'react';
import { Template } from '@/lib/templates';

interface PosterProps {
  template: Template;
  globalBanner: string;
  globalMetric: string;
  achievers: {
    [key: string]: any; 
    image: string | null;
    imgConfig: { scale: number; x: number; y: number };
  }[];
}

const PosterCanvas = forwardRef<HTMLDivElement, PosterProps>(({ template, globalBanner, globalMetric, achievers }, ref) => {
  return (
    <div className="relative flex justify-center items-center w-full h-full pointer-events-none">
      <div className="origin-center" style={{ transform: 'scale(0.10)', width: '3508px', height: '4961px' }}>
        <div ref={ref} className="relative bg-transparent shadow-2xl overflow-hidden" style={{ width: '3508px', height: '4961px' }}>
          
          <img src={template.background} alt="Template" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 10 }} />

          {/* RENDER GLOBAL TEXTS (e.g., The Top Banner) */}
          {template.globalTexts && template.globalTexts.map((tb) => (
            <div 
              key={tb.id} className="absolute flex flex-col items-center justify-center text-center"
              style={{
                top: tb.top, left: tb.left, width: tb.width, height: tb.height, 
                fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, zIndex: 20 
              }}
            >
              <span style={{ lineHeight: '1.1', width: '100%', wordWrap: 'break-word' }}>
                {tb.id === 'banner' ? globalBanner : tb.placeholder}
              </span>
            </div>
          ))}

          {/* RENDER INDIVIDUAL ACHIEVER SLOTS */}
          {template.slots.map((slot, index) => {
            const achiever = achievers[index];
            if (!achiever) return null;

            return (
              <React.Fragment key={slot.id}>
                <div 
                  className="absolute overflow-hidden"
                  style={{
                    top: slot.imageBox.top, left: slot.imageBox.left, width: slot.imageBox.width, height: slot.imageBox.height, 
                    borderRadius: slot.imageBox.borderRadius, backgroundColor: slot.imageBox.backgroundColor,
                    borderColor: slot.imageBox.borderColor, borderWidth: slot.imageBox.borderWidth, borderStyle: 'solid',
                    zIndex: slot.imageBox.zIndex, opacity: slot.imageBox.opacity !== undefined ? slot.imageBox.opacity : 1
                  }}
                >
                  {achiever.image && (
                    <img 
                      src={achiever.image} alt="Achiever" className="w-full h-full object-cover"
                      style={{ transform: `scale(${achiever.imgConfig.scale}) translate(${achiever.imgConfig.x}px, ${achiever.imgConfig.y}px)`, transformOrigin: 'center' }}
                    />
                  )}
                </div>

                {slot.textBoxes.map((tb) => {
                  // DYNAMIC STITCHING: Combine the 3 UI elements into one string for the 'detail' box
                  let textToShow = achiever[tb.id] || tb.placeholder;
                  
                  if (tb.id === 'detail') {
                    if (achiever.metricValue) {
                      textToShow = `${globalMetric}: ${achiever.metricValue} ${achiever.metricUnit}`;
                    } else {
                      textToShow = tb.placeholder;
                    }
                  }

                  return (
                    <div 
                      key={tb.id} className="absolute flex flex-col items-center justify-center text-center"
                      style={{
                        top: tb.top, left: tb.left, width: tb.width, height: tb.height, 
                        fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, transform: tb.transform || 'none', zIndex: 20 
                      }}
                    >
                      <span style={{ lineHeight: '1.1', width: '100%', wordWrap: 'break-word' }}>
                        {textToShow}
                      </span>
                    </div>
                  );
                })}

              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
});

PosterCanvas.displayName = 'PosterCanvas';
export default PosterCanvas;
