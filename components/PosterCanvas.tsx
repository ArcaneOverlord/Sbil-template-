"use client";
import React, { forwardRef } from 'react';
import { Template } from '@/lib/templates';

interface PosterProps {
  template: Template;
  achievers: {
    [key: string]: any; 
    image: string | null;
    imgConfig: { scale: number; x: number; y: number };
  }[];
}

const PosterCanvas = forwardRef<HTMLDivElement, PosterProps>(({ template, achievers }, ref) => {
  return (
    <div className="relative flex justify-center items-center w-full h-full pointer-events-none">
      <div 
        className="origin-center"
        style={{ transform: 'scale(0.10)', width: '3508px', height: '4961px' }}
      >
        <div 
          ref={ref}
          className="relative bg-white shadow-2xl"
          style={{ width: '3508px', height: '4961px', backgroundImage: `url(${template.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {template.slots.map((slot, index) => {
            const achiever = achievers[index];
            if (!achiever) return null;

            return (
              <React.Fragment key={slot.id}>
                <div 
                  className="absolute overflow-hidden bg-gray-200 z-0"
                  style={{
                    top: slot.imageBox.top, left: slot.imageBox.left, width: slot.imageBox.width, height: slot.imageBox.height, borderRadius: slot.imageBox.borderRadius
                  }}
                >
                  {achiever.image && (
                    <img 
                      src={achiever.image} 
                      alt="Achiever" 
                      className="w-full h-full object-cover"
                      style={{
                        transform: `scale(${achiever.imgConfig.scale}) translate(${achiever.imgConfig.x}px, ${achiever.imgConfig.y}px)`,
                        transformOrigin: 'center'
                      }}
                    />
                  )}
                </div>

                {slot.textBoxes.map((tb) => (
                  <div 
                    key={tb.id}
                    className="absolute z-10 flex flex-col justify-center"
                    style={{
                      top: tb.top, left: tb.left, width: tb.width, fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, transform: tb.transform || 'none'
                    }}
                  >
                    <span style={{ lineHeight: '1.1' }}>
                      {achiever[tb.id] || tb.placeholder}
                    </span>
                  </div>
                ))}
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
