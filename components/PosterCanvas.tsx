"use client";
import React, { forwardRef } from 'react';
import { Template } from '@/lib/templates';

interface PosterProps {
  template: Template;
  globalBanner: string;
  globalBottomBanner: string;
  globalMetric: string;
  achievers: {
    [key: string]: any; 
    image: string | null;
    imgConfig: { scale: number; x: number; y: number };
  }[];
}

const DEBUG_MODE = true; 

const PosterCanvas = forwardRef<HTMLDivElement, PosterProps>(({ template, globalBanner, globalBottomBanner, globalMetric, achievers }, ref) => {
  return (
    <div className="relative flex justify-center items-center w-full h-full pointer-events-none">
      <div className="origin-center" style={{ transform: 'scale(0.10)', width: '3508px', height: '4961px' }}>
        <div ref={ref} className="relative bg-transparent shadow-2xl overflow-hidden" style={{ width: '3508px', height: '4961px' }}>
          
          <img src={template.background} alt="Template" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 10 }} />

          {/* RENDER GLOBAL TEXTS (Top & Bottom Banners) */}
          {template.globalTexts && template.globalTexts.map((tb) => {
            const textValue = tb.id === 'banner' ? globalBanner : (tb.id === 'bottomBanner' ? globalBottomBanner : tb.placeholder);
            
            return (
              <div 
                key={tb.id} 
                className="absolute flex items-center justify-center text-center"
                style={{
                  top: tb.top, left: tb.left, width: tb.width, height: tb.height, 
                  fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, zIndex: 20,
                  WebkitTextStroke: tb.strokeWidth && tb.strokeColor && !tb.isCurved ? `${tb.strokeWidth} ${tb.strokeColor}` : undefined,
                  border: DEBUG_MODE ? '4px dashed rgba(239, 68, 68, 0.8)' : 'none',
                  backgroundColor: DEBUG_MODE ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                  transform: tb.transform || 'none'
                }}
              >
                {/* SVG Curve Engine */}
                {tb.isCurved && tb.curvePath ? (
                  <svg width="100%" height="100%" viewBox="0 0 2100 300" style={{ overflow: 'visible' }}>
                    {/* The transparent path the text follows */}
                    <path id={`curve-${tb.id}`} d={tb.curvePath} fill="transparent" />
                    <text 
                      fill={tb.color} 
                      stroke={tb.strokeColor} 
                      strokeWidth={tb.strokeWidth} 
                      style={{ fontSize: tb.fontSize, fontWeight: tb.fontWeight }}
                    >
                      {/* Centers the text perfectly on the curve */}
                      <textPath href={`#curve-${tb.id}`} startOffset="50%" textAnchor="middle">
                        {textValue}
                      </textPath>
                    </text>
                  </svg>
                ) : (
                  <span style={{ lineHeight: '1.1', width: '100%', wordWrap: 'break-word' }}>
                    {textValue}
                  </span>
                )}
              </div>
            );
          })}

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
                      key={tb.id} 
                      className="absolute flex flex-col items-center justify-center text-center"
                      style={{
                        top: tb.top, left: tb.left, width: tb.width, height: tb.height, 
                        fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, transform: tb.transform || 'none', zIndex: 20,
                        WebkitTextStroke: tb.strokeWidth && tb.strokeColor ? `${tb.strokeWidth} ${tb.strokeColor}` : undefined,
                        border: DEBUG_MODE ? '4px dashed rgba(239, 68, 68, 0.8)' : 'none',
                        backgroundColor: DEBUG_MODE ? 'rgba(239, 68, 68, 0.2)' : 'transparent'
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
