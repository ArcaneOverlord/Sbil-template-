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

const DEBUG_MODE = false; 

const PosterCanvas = forwardRef<HTMLDivElement, PosterProps>(({ template, globalBanner, globalBottomBanner, globalMetric, achievers }, ref) => {
  return (
    <div className="relative flex justify-center items-center w-full h-full pointer-events-none">
      <div className="origin-center" style={{ transform: 'scale(0.10)', width: '3508px', height: '4961px' }}>
        <div ref={ref} className="relative bg-transparent shadow-2xl overflow-hidden" style={{ width: '3508px', height: '4961px' }}>
          
          <img src={template.background} alt="Template" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 10 }} />

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
                {tb.isCurved && tb.curvePath ? (
                  <svg width="100%" height="100%" viewBox="0 0 2100 300" style={{ overflow: 'visible' }}>
                    <path id={`curve-${tb.id}`} d={tb.curvePath} fill="transparent" />
                    <text fill={tb.color} stroke={tb.strokeColor} strokeWidth={tb.strokeWidth} style={{ fontSize: tb.fontSize, fontWeight: tb.fontWeight }}>
                      <textPath href={`#curve-${tb.id}`} startOffset="50%" textAnchor="middle">{textValue}</textPath>
                    </text>
                  </svg>
                ) : (
                  <span style={{ lineHeight: '1.1', width: '100%', wordWrap: 'break-word' }}>{textValue}</span>
                )}
              </div>
            );
          })}

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
                      src={achiever.image} alt="Achiever" 
                      className="w-full h-full object-contain" 
                      style={{ transform: `scale(${achiever.imgConfig.scale}) translate(${achiever.imgConfig.x}px, ${achiever.imgConfig.y}px)`, transformOrigin: 'center' }}
                    />
                  )}
                </div>

                {slot.textBoxes.map((baseTb) => {
                  
                  // THEME MERGE: Overlays the specific slot coordinates on top of the template's default master styles
                  const tb = { ...(template.defaultTextStyles?.[baseTb.id] || {}), ...baseTb };
                  
                  const gradientStyle = tb.isGradient && tb.gradientColors ? {
                    backgroundImage: `linear-gradient(${tb.gradientColors.direction || 'to right'}, ${tb.gradientColors.from}, ${tb.gradientColors.to})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  } : {};

                  const prefixGradientStyle = tb.isPrefixGradient && tb.prefixGradientColors ? {
                    backgroundImage: `linear-gradient(${tb.prefixGradientColors.direction || 'to right'}, ${tb.prefixGradientColors.from}, ${tb.prefixGradientColors.to})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  } : {};

                  // NEW: Value Gradient Processing
                  const valueGradientStyle = tb.isValueGradient && tb.valueGradientColors ? {
                    backgroundImage: `linear-gradient(${tb.valueGradientColors.direction || 'to right'}, ${tb.valueGradientColors.from}, ${tb.valueGradientColors.to})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  } : {};

                  const unitGradientStyle = tb.isUnitGradient && tb.unitGradientColors ? {
                    backgroundImage: `linear-gradient(${tb.unitGradientColors.direction || 'to right'}, ${tb.unitGradientColors.from}, ${tb.unitGradientColors.to})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  } : {};

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
                      {tb.id === 'detail' && achiever.metricValue ? (
                        <span style={{ lineHeight: '1.1', width: '100%', wordWrap: 'break-word', ...gradientStyle }}>
                          
                          <span style={{ 
                            fontSize: tb.prefixFontSize || tb.fontSize, fontWeight: tb.prefixFontWeight || tb.fontWeight, 
                            color: tb.prefixColor || tb.color, WebkitTextFillColor: tb.isPrefixGradient ? 'transparent' : (tb.prefixColor || tb.color || 'unset'),
                            ...prefixGradientStyle
                          }}>
                            {globalMetric}: 
                          </span>
                          
                          {/* NEW: Value Gradient Output */}
                          <span style={{ 
                            fontSize: tb.valueFontSize || tb.fontSize, fontWeight: tb.valueFontWeight || tb.fontWeight, 
                            color: tb.valueColor || tb.color, WebkitTextFillColor: tb.isValueGradient ? 'transparent' : (tb.valueColor || tb.color || 'unset'),
                            ...valueGradientStyle
                          }}>
                            {` ${achiever.metricValue} `}
                          </span>
                          
                          <span style={{ 
                            fontSize: tb.unitFontSize || tb.fontSize, fontWeight: tb.unitFontWeight || tb.fontWeight, 
                            color: tb.unitColor || tb.color, WebkitTextFillColor: tb.isUnitGradient ? 'transparent' : (tb.unitColor || tb.color || 'unset'),
                            ...unitGradientStyle
                          }}>
                            {achiever.metricUnit}
                          </span>
                          
                        </span>
                      ) : (
                        <span style={{ lineHeight: '1.1', width: '100%', wordWrap: 'break-word', ...gradientStyle }}>
                          {achiever[tb.id] || tb.placeholder}
                        </span>
                      )}
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
