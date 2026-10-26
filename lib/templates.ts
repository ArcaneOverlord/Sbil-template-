// ============================================================================
// POSTERGEN TEMPLATE ENGINE CONFIGURATION
// This file defines the data structure and specific layouts for all posters.
// The PosterCanvas component reads these properties to render the final image.
// ============================================================================

/**
 * TextConfig defines how a specific text box should be rendered.
 * It controls position, typography, gradients, and specific styling for the 3-part metric display.
 */
export interface TextConfig {
  id: string;          
  placeholder?: string;
  
  // --- POSITIONING & SIZING ---
  // Coordinates are percentages relative to the 3508x4961 canvas.
  top: string;         
  left: string;
  width: string;
  height: string;
  
  // --- CONDITIONAL LAYOUT SHIFTING ---
  // If the "Enable Achiever Team Input" toggle is ON, any values defined here 
  // will OVERRIDE the base positioning above. This allows you to shift the 
  // Name or Detail boxes up/down to make room for the Team box.
  activeTeamOverride?: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
  };
  
  // --- TEXT BACKGROUND SHAPE ---
  // Renders a colored shape (like a rounded pill) directly behind the text.
  boxStyle?: {
    backgroundColor?: string;
    borderRadius?: string;
    border?: string;
    padding?: string;
  };
  
  // --- BASE TYPOGRAPHY ---
  // These apply to standard text (like 'name' or 'team') and act as the 
  // fallback for the 3-part metric display if specific sizes aren't provided.
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  transform?: string;  
  
  // --- SVG CURVED PATH ENGINE ---
  // If isCurved is true, the canvas ignores standard HTML text and draws an SVG.
  // curvePath uses standard SVG 'd' syntax (e.g., 'M startX,startY Q curveX,curveY endX,endY')
  isCurved?: boolean;
  curvePath?: string; 
  strokeColor?: string; // Adds a thick border to make text ultra-bold
  strokeWidth?: string;

  // --- MAIN TEXT GRADIENT ---
  isGradient?: boolean;
  gradientColors?: { from: string; to: string; direction?: string };
  
  // ==========================================================================
  // 3-PART METRIC STYLING (Used exclusively for the 'detail' ID)
  // Allows you to uniquely style "Prem:" (Prefix), "12.34" (Value), and "Cr" (Unit)
  // ==========================================================================
  
  // 1. Entered Value Emphasis (The actual number)
  valueFontSize?: string;
  valueFontWeight?: string;
  valueColor?: string;
  isValueGradient?: boolean; 
  valueGradientColors?: { from: string; to: string; direction?: string };

  // 2. Prefix (e.g., "Prem:") 
  prefixFontSize?: string;
  prefixFontWeight?: string;
  prefixColor?: string;
  isPrefixGradient?: boolean;
  prefixGradientColors?: { from: string; to: string; direction?: string };

  // 3. Unit (e.g., "Cr") 
  unitFontSize?: string;
  unitFontWeight?: string;
  unitColor?: string;
  isUnitGradient?: boolean;
  unitGradientColors?: { from: string; to: string; direction?: string };
}

/**
 * ImageConfig defines the position and masking container for user-uploaded photos.
 * The canvas uses these constraints to ensure images don't bleed into the design.
 */
export interface ImageConfig {
  top: string;
  left: string;
  width: string;
  height: string;
  borderRadius: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
  zIndex: number;
  opacity: number; 
}

/**
 * CustomField allows you to add dynamic extra inputs to the Editor sidebar
 * (like Sponsor Logos, Event Dates) that are specific to a single template design.
 */
export interface CustomField {
  id: string;
  type: 'text' | 'image';
  label: string; 
  defaultValue?: string; 
  textConfig?: TextConfig;
  imageConfig?: ImageConfig;
}

/**
 * SlotConfig defines a single Achiever's block on the poster (Photo + Name + Detail + Team).
 */
export interface SlotConfig {
  id: number;
  imageBox: ImageConfig;
  textBoxes: TextConfig[];
}

/**
 * Template is the master configuration object for a specific poster design.
 */
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  background: string;
  globalTexts?: TextConfig[]; 
  
  // defaultTextStyles acts as a master theme for this template.
  // Instead of copy/pasting fonts/colors into every single slot, you define them 
  // here once. The slot configs only need to define top/left/width/height coordinates.
  defaultTextStyles?: Record<string, Partial<TextConfig>>; 
  
  customFields?: CustomField[]; 
  slots: SlotConfig[];
}

// ============================================================================
// ACTIVE TEMPLATE CATALOG
// Add new objects to this array to make them appear in the Gallery.
// ============================================================================

export const posterTemplates: Template[] = [
  // ----------------------------------------------------
  // TEMPLATE 1: Original V1
  // ----------------------------------------------------
  {
    id: 'sbi-life-top-3',
    name: 'Top 3 Achievers (Gold)',
    description: 'Standard MTD/YTD recognition poster for top 3 sales performers.',
    thumbnail: '/v1.png',
    background: '/v1.png',
    defaultTextStyles: {
      name: { fontSize: '160px', fontWeight: 'bold', color: '#ffffff', isGradient: false, gradientColors: { from: '#fef08a', to: '#eab308', direction: 'to bottom right' } },
      detail: {
        fontSize: '100px', fontWeight: 'bold', color: '#94a3b8',
        valueFontSize: '180px', valueFontWeight: '900', valueColor: '#ffffff', isValueGradient: true, valueGradientColors: {from: '#fef08a', to: '#eab308', direction: 'to bottom'},
        prefixFontSize: '110px', prefixFontWeight: 'bold', prefixColor: '#cbd5e1', isPrefixGradient: false, prefixGradientColors: { from: '#fef08a', to: '#eab308', direction: 'to bottom right' },
        unitFontSize: '120px', unitFontWeight: 'bold', unitColor: '#fef08a', isUnitGradient: false, unitGradientColors: { from: '#fef08a', to: '#eab308', direction: 'to right' }
      },
      team: { fontSize: '90px', fontWeight: 'bold', color: '#cbd5e1' }
    },
    globalTexts: [
      { id: 'banner', placeholder: 'MTD TOPPERS', top: '16.5%', left: '20%', width: '60%', height: '300px', fontSize: '200px', fontWeight: '900', color: '#000000', isCurved: true, curvePath: 'M 100,250 Q 1050,80 2000,250', strokeColor: '#000000', strokeWidth: '6px', isGradient: true, gradientColors: { from: '#fef08a', to: '#eab308', direction: 'to bottom right' } },
      { id: 'bottomBanner', placeholder: 'TEAM KATTAKADA', top: '90%', left: '20%', width: '60%', height: '250px', fontSize: '140px', fontWeight: '900', color: '#000000', isCurved: true, curvePath: 'M 100,250 Q 1050,80 2000,250', strokeColor: '#000000', strokeWidth: '4px' }
    ],
    slots: [
      {
        id: 0, imageBox: { top: '27.5%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '34.5%', left: '48%', width: '1600px', height: '250px', activeTeamOverride: { top: '31%' } }, { id: 'detail', top: '41.5%', left: '48%', width: '1600px', height: '150px', activeTeamOverride: { top: '38%' } }, { id: 'team', top: '46%', left: '48%', width: '1600px', height: '120px' } ]
      },
      {
        id: 1, imageBox: { top: '49%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '56%', left: '48%', width: '1600px', height: '250px', activeTeamOverride: { top: '52.5%' } }, { id: 'detail', top: '62.5%', left: '48%', width: '1600px', height: '150px', activeTeamOverride: { top: '59.5%' } }, { id: 'team', top: '67%', left: '48%', width: '1600px', height: '120px' } ]
      },
      {
        id: 2, imageBox: { top: '70%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '76.3%', left: '48%', width: '1600px', height: '250px', activeTeamOverride: { top: '73%' } }, { id: 'detail', top: '82.5%', left: '48%', width: '1600px', height: '150px', activeTeamOverride: { top: '79.5%' } }, { id: 'team', top: '87%', left: '48%', width: '1600px', height: '120px' } ]
      }
    ]
  },

  // ----------------------------------------------------
  // TEMPLATE 2: New V2
  // ----------------------------------------------------
  {
    id: 'sbi-life-top-3-v2',
    name: 'Top 3 Achievers (V2)',
    description: 'Alternative MTD/YTD recognition poster for top 3 sales performers.',
    thumbnail: '/v2.png',
    background: '/v2.png',
    defaultTextStyles: {
      name: { fontSize: '120px', fontWeight: 'bold', color: '#ffffff', isGradient: true, gradientColors: { from: '#F0D28E', to: '#C8A263', direction: 'to bottom right' } },
      detail: {
        fontSize: '100px', fontWeight: 'bold', color: '#94a3b8',
        valueFontSize: '110px', valueFontWeight: '900', valueColor: '#ffffff', isValueGradient: true, valueGradientColors: {from: '#F0D28E', to: '#C8A263 ', direction: 'to bottom'},
        prefixFontSize: '80px', prefixFontWeight: 'bold', prefixColor: '#ffffff', isPrefixGradient: false, prefixGradientColors: { from: '#fef08a', to: '#eab308', direction: 'to bottom right' },
        unitFontSize: '80px', unitFontWeight: 'bold', unitColor: '#fef08a', isUnitGradient: true, unitGradientColors: { from: '#F0D28E', to: '#C8A263', direction: 'to right' }
      },
      team: { fontSize: '70px', fontWeight: 'bold', color: '#cbd5e1' } 
    },
    globalTexts: [
      { id: 'banner', placeholder: 'MTD TOPPERS', top: '14.5%', left: '31%', width: '38%', height: '300px', fontSize: '140px', fontWeight: '900', color: '#1e293d', isCurved: false, curvePath: 'M 100,250 Q 1050,250 2000,250', strokeColor: '#1e293d', strokeWidth: '6px' },
      { id: 'bottomBanner', placeholder: 'TEAM KATTAKADA', top: '93.8%', left: '27%', width: '47%', height: '250px', fontSize: '140px', fontWeight: '900', color: '#1e293d', isCurved: false, curvePath: 'M 100,250 Q 1050,250 2000,250', strokeColor: '#1e293d', strokeWidth: '4px' }
    ],
    slots: [
      {
        id: 0, imageBox: { top: '21%', left: '28%', width: '1500px', height: '1400px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '47.5%', left: '33%', width: '1200px', height: '220px', fontSize: '150px', activeTeamOverride: { top: '46%' } }, { id: 'detail', top: '51.1%', left: '33%', width: '1200px', height: '180px', prefixFontSize: '100px', valueFontSize: '140px', unitFontSize: '120', activeTeamOverride: { top: '49%' } }, { id: 'team', top: '54%', left: '33%', width: '1200px', height: '120px' } ]
      },
      {
        id: 1, imageBox: { top: '56%', left: '13%', width: '1000px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '74.3%', left: '13.7%', width: '900px', height: '180px', activeTeamOverride: { top: '72%' } }, { id: 'detail', top: '77.4%', left: '13.7%', width: '900px', height: '150px', activeTeamOverride: { top: '75%' } }, { id: 'team', top: '81%', left: '13.7%', width: '900px', height: '120px' } ]
      },
      {
        id: 2, imageBox: { top: '56%', left: '60.7%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '74.3%', left: '61%', width: '900px', height: '180px', activeTeamOverride: { top: '72%' } }, { id: 'detail', top: '77.4%', left: '61%', width: '900px', height: '150px', activeTeamOverride: { top: '75%' } }, { id: 'team', top: '81%', left: '61%', width: '900px', height: '120px' } ]
      }
    ]
  },
  
  // ----------------------------------------------------
  // TEMPLATE 3: New V3
  // ----------------------------------------------------
  {
    id: 'sbi-life-top-3-v3',
    name: 'Top 3 Achievers (V3)',
    description: 'Alternative MTD/YTD recognition poster for top 3 sales performers.',
    thumbnail: '/v3.png',
    background: '/v3.png',
    customFields: [], 
    defaultTextStyles: {
      name: { fontSize: '120px', fontWeight: 'bold', color: '#ffffff', isGradient: true, gradientColors: { from: '#F0D28E', to: '#C8A263', direction: 'to bottom right' } },
      detail: {
        fontSize: '100px', fontWeight: 'bold', color: '#94a3b8',
        valueFontSize: '110px', valueFontWeight: '900', valueColor: '#ffffff', isValueGradient: true, valueGradientColors: {from: '#F0D28E', to: '#C8A263 ', direction: 'to bottom'},
        prefixFontSize: '80px', prefixFontWeight: 'bold', prefixColor: '#ffffff', isPrefixGradient: false, prefixGradientColors: { from: '#fef08a', to: '#eab308', direction: 'to bottom right' },
        unitFontSize: '80px', unitFontWeight: 'bold', unitColor: '#fef08a', isUnitGradient: true, unitGradientColors: { from: '#F0D28E', to: '#C8A263', direction: 'to right' }
      },
      team: { fontSize: '70px', fontWeight: 'bold', color: '#cbd5e1' } 
    },
    globalTexts: [
      { id: 'banner', placeholder: 'MTD TOPPERS', top: '14.5%', left: '31%', width: '60%', height: '400px', fontSize: '220px', fontWeight: '900', color: '#ffffff', isCurved: false, curvePath: 'M 100,250 Q 1050,250 2000,250', strokeColor: '#1e293d', strokeWidth: '6px' },
      { id: 'bottomBanner', placeholder: 'TEAM KATTAKADA', top: '93.8%', left: '27%', width: '47%', height: '250px', fontSize: '140px', fontWeight: '900', color: '#1e293d', isCurved: false, curvePath: 'M 100,250 Q 1050,250 2000,250', strokeColor: '#1e293d', strokeWidth: '4px' }
    ],
    slots: [
      {
        id: 0, imageBox: { top: '21%', left: '28%', width: '1500px', height: '1400px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '47.5%', left: '33%', width: '1200px', height: '220px', fontSize: '160px', activeTeamOverride: { top: '45%' } }, { id: 'detail', top: '51.1%', left: '33%', width: '1200px', height: '180px', prefixFontSize: '100px', valueFontSize: '140px', unitFontSize: '120', activeTeamOverride: { top: '48.5%' } }, { id: 'team', top: '54%', left: '33%', width: '1200px', height: '120px', boxStyle: { backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '60px' } } ] // Notice boxStyle added here to demonstrate the background shape!
      },
      {
        id: 1, imageBox: { top: '56%', left: '13%', width: '1000px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '74.3%', left: '13.7%', width: '900px', height: '180px', activeTeamOverride: { top: '72%' } }, { id: 'detail', top: '77.4%', left: '13.7%', width: '900px', height: '150px', activeTeamOverride: { top: '75%' } }, { id: 'team', top: '81%', left: '13.7%', width: '900px', height: '120px', boxStyle: { backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '60px' } } ]
      },
      {
        id: 2, imageBox: { top: '56%', left: '60.7%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '74.3%', left: '61%', width: '900px', height: '180px', activeTeamOverride: { top: '72%' } }, { id: 'detail', top: '77.4%', left: '61%', width: '900px', height: '150px', activeTeamOverride: { top: '75%' } }, { id: 'team', top: '81%', left: '61%', width: '900px', height: '120px', boxStyle: { backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '60px' } } ]
      }
    ]
  }
];
