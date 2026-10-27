"use client";
import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { Template, GradientDef } from '@/lib/templates';

interface PosterProps {
  template: Template;
  globalBanner: string;
  globalBottomBanner: string;
  globalMetric: string;
  isExporting: boolean;
  showTeamInput: boolean;
  achievers: {
    [key: string]: any; 
    image: string | null;
    imgConfig: { scale: number; x: number; y: number };
  }[];
  customData: Record<string, any>; 
}

const DEBUG_MODE = false; 

// NEW HELPER: Safely constructs robust 3-stop and radial gradients
const getGradientString = (g?: GradientDef) => {
  if (!g || !g.from || !g.to) return undefined;
  
  const type = g.type || 'linear';
  // Default to 'circle' for radial, or 'to right' for linear
  const dir = g.direction || (type === 'radial' ? 'circle' : 'to right');
  // Inject the middle 'via' color if it exists
  const colorStops = g.via ? `${g.from}, ${g.via}, ${g.to}` : `${g.from}, ${g.to}`;
  
  return `${type}-gradient(${dir}, ${colorStops})`;
};

const FitText = ({ children, gradientStyle }: { children: React.ReactNode, gradientStyle: React.CSSProperties }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    textRef.current.style.transform = 'scale(1)';
    const containerWidth = containerRef.current.clientWidth;
    const textWidth = textRef.current.scrollWidth;
    if (textWidth > containerWidth && containerWidth > 0) {
      const squeezeRatio = (containerWidth / textWidth) * 0.98;
      textRef.current.style.transform = `scale(${squeezeRatio})`;
    }
  }, [children]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <span ref={textRef} style={{ lineHeight: '1.1', whiteSpace: 'nowrap', display: 'inline-block', transformOrigin: 'center', ...gradientStyle }}>
        {children}
      </span>
    </div>
  );
};

const PosterCanvas = forwardRef<HTMLDivElement, PosterProps>(({ template, globalBanner, globalBottomBanner, globalMetric, isExporting, showTeamInput, achievers, customData }, ref) => {
  
  const showDebug = DEBUG_MODE && !isExporting;

  return (
    <div className="relative flex justify-center items-center w-full h-full pointer-events-none">
      <div className="origin-center" style={{ transform: 'scale(0.10)', width: '3508px', height: '4961px' }}>
        <div ref={ref} className="relative bg-transparent shadow-2xl overflow-hidden" style={{ width: '3508px', height: '4961px' }}>
          
          <img src={template.background} alt="Template" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" style={{ zIndex: 10 }} />

          {template.customFields && template.customFields.map((field) => {
            const data = customData[field.id];
            if (field.type === 'text' && field.textConfig) {
              const tb = field.textConfig;
              const textValue = data || '';
              
              const gradStr = getGradientString(tb.gradientColors);
              const gradientStyle = tb.isGradient && gradStr ? { backgroundImage: gradStr, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};
              
              let containerBgStyle: React.CSSProperties = {};
              if (showDebug) {
                containerBgStyle = { backgroundColor: 'rgba(239, 68, 68, 0.2)' };
              } else if (tb.boxStyle?.isGradient && tb.boxStyle?.gradientColors) {
                containerBgStyle = { backgroundImage: getGradientString(tb.boxStyle.gradientColors) };
              } else if (tb.boxStyle?.backgroundColor) {
                containerBgStyle = { backgroundColor: tb.boxStyle.backgroundColor };
              } else {
                containerBgStyle = { backgroundColor: 'transparent' };
              }

              return (
                <div key={field.id} className="absolute flex flex-col items-center justify-center text-center"
                  style={{ top: tb.top, left: tb.left, width: tb.width, height: tb.height, fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, zIndex: 20, border: showDebug ? '4px dashed rgba(239, 68, 68, 0.8)' : (tb.boxStyle?.border || 'none'), borderRadius: tb.boxStyle?.borderRadius, padding: tb.boxStyle?.padding, transform: tb.transform || 'none', ...containerBgStyle }}
                >
                  <FitText gradientStyle={gradientStyle}>{textValue}</FitText>
                </div>
              );
            } 
            if (field.type === 'image' && field.imageConfig && data?.url) {
              const ib = field.imageConfig;
              return (
                <div key={field.id} className="absolute overflow-hidden" style={{ top: ib.top, left: ib.left, width: ib.width, height: ib.height, borderRadius: ib.borderRadius, backgroundColor: ib.backgroundColor, borderColor: ib.borderColor, borderWidth: ib.borderWidth, borderStyle: 'solid', zIndex: ib.zIndex, opacity: ib.opacity }}>
                  <img src={data.url} alt={field.label} className="w-full h-full object-contain" style={{ transform: `scale(${data.scale}) translate(${data.x}px, ${data.y}px)`, transformOrigin: 'center' }} />
                </div>
              );
            }
            return null;
          })}

          {template.globalTexts && template.globalTexts.map((tb) => {
            const textValue = tb.id === 'banner' ? globalBanner : (tb.id === 'bottomBanner' ? globalBottomBanner : tb.placeholder);
            
            const gradStr = getGradientString(tb.gradientColors);
            const gradientStyle = tb.isGradient && gradStr ? { backgroundImage: gradStr, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};

            let containerBgStyle: React.CSSProperties = {};
            if (showDebug) {
              containerBgStyle = { backgroundColor: 'rgba(239, 68, 68, 0.2)' };
            } else if (tb.boxStyle?.isGradient && tb.boxStyle?.gradientColors) {
              containerBgStyle = { backgroundImage: getGradientString(tb.boxStyle.gradientColors) };
            } else if (tb.boxStyle?.backgroundColor) {
              containerBgStyle = { backgroundColor: tb.boxStyle.backgroundColor };
            } else {
              containerBgStyle = { backgroundColor: 'transparent' };
            }

            return (
              <div 
                key={tb.id} className="absolute flex items-center justify-center text-center"
                style={{ top: tb.top, left: tb.left, width: tb.width, height: tb.height, fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, zIndex: 20, WebkitTextStroke: tb.strokeWidth && tb.strokeColor && !tb.isCurved ? `${tb.strokeWidth} ${tb.strokeColor}` : undefined, border: showDebug ? '4px dashed rgba(239, 68, 68, 0.8)' : (tb.boxStyle?.border || 'none'), borderRadius: tb.boxStyle?.borderRadius, padding: tb.boxStyle?.padding, transform: tb.transform || 'none', ...containerBgStyle }}
              >
                {tb.isCurved && tb.curvePath ? (
                  <svg width="100%" height="100%" viewBox="0 0 2100 300" style={{ overflow: 'visible' }}>
                    <path id={`curve-${tb.id}`} d={tb.curvePath} fill="transparent" />
                    <text fill={tb.color} stroke={tb.strokeColor} strokeWidth={tb.strokeWidth} style={{ fontSize: tb.fontSize, fontWeight: tb.fontWeight }}>
                      <textPath href={`#curve-${tb.id}`} startOffset="50%" textAnchor="middle">{textValue}</textPath>
                    </text>
                  </svg>
                ) : ( 
                  <FitText gradientStyle={gradientStyle}>{textValue}</FitText>
                )}
              </div>
            );
          })}

          {template.slots.map((slot, index) => {
            const achiever = achievers[index];
            if (!achiever) return null;

            return (
              <React.Fragment key={slot.id}>
                <div className="absolute overflow-hidden" style={{ top: slot.imageBox.top, left: slot.imageBox.left, width: slot.imageBox.width, height: slot.imageBox.height, borderRadius: slot.imageBox.borderRadius, backgroundColor: slot.imageBox.backgroundColor, borderColor: slot.imageBox.borderColor, borderWidth: slot.imageBox.borderWidth, borderStyle: 'solid', zIndex: slot.imageBox.zIndex, opacity: slot.imageBox.opacity !== undefined ? slot.imageBox.opacity : 1 }}>
                  {achiever.image && ( <img src={achiever.image} alt="Achiever" className="w-full h-full object-contain" style={{ transform: `scale(${achiever.imgConfig.scale}) translate(${achiever.imgConfig.x}px, ${achiever.imgConfig.y}px)`, transformOrigin: 'center' }} /> )}
                </div>

                {slot.textBoxes.map((baseTb) => {
                  if (baseTb.id === 'team' && !showTeamInput) return null;
                  
                  const baseMerged = { ...(template.defaultTextStyles?.[baseTb.id] || {}), ...baseTb };
                  const hasActiveOverride = showTeamInput && baseMerged.activeTeamOverride && baseMerged.activeTeamOverride.active !== false;
                  const overrideParams = hasActiveOverride ? baseMerged.activeTeamOverride : {};
                  
                  // Clean Merge of Gradient Definitions (Strictly Typed)
                  const mergedBoxStyle: any = { ...(baseMerged.boxStyle || {}), ...(overrideParams?.boxStyle || {}) };
                  if (baseMerged.boxStyle?.gradientColors || overrideParams?.boxStyle?.gradientColors) {
                      mergedBoxStyle.gradientColors = { ...(baseMerged.boxStyle?.gradientColors || {}), ...(overrideParams?.boxStyle?.gradientColors || {}) } as GradientDef;
                  }
                  
                  const mergedGradientColors = { ...(baseMerged.gradientColors || {}), ...(overrideParams?.gradientColors || {}) } as GradientDef;
                  const mergedPrefixGradient = { ...(baseMerged.prefixGradientColors || {}), ...(overrideParams?.prefixGradientColors || {}) } as GradientDef;
                  const mergedValueGradient = { ...(baseMerged.valueGradientColors || {}), ...(overrideParams?.valueGradientColors || {}) } as GradientDef;
                  const mergedUnitGradient = { ...(baseMerged.unitGradientColors || {}), ...(overrideParams?.unitGradientColors || {}) } as GradientDef;
                  
                  const tb = { 
                    ...baseMerged, 
                    ...overrideParams,
                    boxStyle: Object.keys(mergedBoxStyle).length > 0 ? mergedBoxStyle : undefined,
                    gradientColors: Object.keys(mergedGradientColors).length > 0 ? mergedGradientColors : undefined,
                    prefixGradientColors: Object.keys(mergedPrefixGradient).length > 0 ? mergedPrefixGradient : undefined,
                    valueGradientColors: Object.keys(mergedValueGradient).length > 0 ? mergedValueGradient : undefined,
                    unitGradientColors: Object.keys(mergedUnitGradient).length > 0 ? mergedUnitGradient : undefined
                  };
                  
                  // Generate cleanly utilizing our new helper
                  const gStyleStr = getGradientString(tb.gradientColors);
                  const gradientStyle = tb.isGradient && gStyleStr ? { backgroundImage: gStyleStr, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};
                  
                  const preStr = getGradientString(tb.prefixGradientColors);
                  const prefixGradientStyle = tb.isPrefixGradient && preStr ? { backgroundImage: preStr, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};
                  
                  const valStr = getGradientString(tb.valueGradientColors);
                  const valueGradientStyle = tb.isValueGradient && valStr ? { backgroundImage: valStr, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};
                  
                  const unitStr = getGradientString(tb.unitGradientColors);
                  const unitGradientStyle = tb.isUnitGradient && unitStr ? { backgroundImage: unitStr, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};

                  let containerBgStyle: React.CSSProperties = {};
                  if (showDebug) {
                    containerBgStyle = { backgroundColor: 'rgba(239, 68, 68, 0.2)' };
                  } else if (tb.boxStyle?.isGradient && tb.boxStyle?.gradientColors) {
                    containerBgStyle = { backgroundImage: getGradientString(tb.boxStyle.gradientColors) };
                  } else if (tb.boxStyle?.backgroundColor) {
                    containerBgStyle = { backgroundColor: tb.boxStyle.backgroundColor };
                  } else {
                    containerBgStyle = { backgroundColor: 'transparent' };
                  }

                  return (
                    <div key={tb.id} className="absolute flex flex-col items-center justify-center text-center" 
                      style={{ 
                        top: tb.top, left: tb.left, width: tb.width, height: tb.height, 
                        fontSize: tb.fontSize, fontWeight: tb.fontWeight, color: tb.color, transform: tb.transform || 'none', zIndex: 20, 
                        WebkitTextStroke: tb.strokeWidth && tb.strokeColor ? `${tb.strokeWidth} ${tb.strokeColor}` : undefined, 
                        border: showDebug ? '4px dashed rgba(239, 68, 68, 0.8)' : (tb.boxStyle?.border || 'none'), 
                        borderRadius: tb.boxStyle?.borderRadius,
                        padding: tb.boxStyle?.padding,
                        ...containerBgStyle
                      }}>
                      
                      <FitText gradientStyle={gradientStyle}>
                        {tb.id === 'detail' ? (
                          <React.Fragment>
                            <span style={{ fontSize: tb.prefixFontSize || tb.fontSize, fontWeight: tb.prefixFontWeight || tb.fontWeight, color: tb.prefixColor || tb.color, WebkitTextFillColor: tb.isPrefixGradient ? 'transparent' : (tb.prefixColor || tb.color || 'unset'), ...prefixGradientStyle }}>{globalMetric}: </span>
                            <span style={{ fontSize: tb.valueFontSize || tb.fontSize, fontWeight: tb.valueFontWeight || tb.fontWeight, color: tb.valueColor || tb.color, WebkitTextFillColor: tb.isValueGradient ? 'transparent' : (tb.valueColor || tb.color || 'unset'), ...valueGradientStyle }}>{` ${achiever.metricValue || '00.00'} `}</span>
                            <span style={{ fontSize: tb.unitFontSize || tb.fontSize, fontWeight: tb.unitFontWeight || tb.fontWeight, color: tb.unitColor || tb.color, WebkitTextFillColor: tb.isUnitGradient ? 'transparent' : (tb.unitColor || tb.color || 'unset'), ...unitGradientStyle }}>{achiever.metricUnit}</span>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {achiever[tb.id] || tb.placeholder}
                          </React.Fragment>
                        )}
                      </FitText>

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
