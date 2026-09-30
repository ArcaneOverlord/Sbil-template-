export interface TextConfig {
  id: string;          
  placeholder?: string;
  top: string;         
  left: string;
  width: string;
  height: string;
  
  // Base styling (Now optional so they can fall back to defaults)
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  transform?: string;  
  
  // Curve & Super-Bold settings
  isCurved?: boolean;
  curvePath?: string; 
  strokeColor?: string;
  strokeWidth?: string;

  // Main Text Gradient Settings
  isGradient?: boolean;
  gradientColors?: { from: string; to: string; direction?: string };
  
  // NEW: Entered Value Emphasis & Gradient Settings
  valueFontSize?: string;
  valueFontWeight?: string;
  valueColor?: string;
  isValueGradient?: boolean; 
  valueGradientColors?: { from: string; to: string; direction?: string };

  // Prefix (e.g., "Prem:") Settings
  prefixFontSize?: string;
  prefixFontWeight?: string;
  prefixColor?: string;
  isPrefixGradient?: boolean;
  prefixGradientColors?: { from: string; to: string; direction?: string };

  // Unit (e.g., "Cr") Settings
  unitFontSize?: string;
  unitFontWeight?: string;
  unitColor?: string;
  isUnitGradient?: boolean;
  unitGradientColors?: { from: string; to: string; direction?: string };
}

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

export interface SlotConfig {
  id: number;
  imageBox: ImageConfig;
  textBoxes: TextConfig[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  background: string;
  globalTexts?: TextConfig[]; 
  defaultTextStyles?: Record<string, Partial<TextConfig>>; // NEW: Template-specific master theme
  slots: SlotConfig[];
}

export const posterTemplates: Template[] = [
  {
    id: 'sbi-life-top-3',
    name: 'Top 3 Achievers (Gold)',
    description: 'Standard MTD/YTD recognition poster for top 3 sales performers.',
    thumbnail: '/1000114310.png',
    background: '/1000114310.png',
    
    // NEW MASTER THEME: Set your common sizes, colors, and gradients here!
    defaultTextStyles: {
      name: {
        fontSize: '160px',
        fontWeight: 'bold',
        color: '#ffffff',
        isGradient: false,
        gradientColors: { from: '#fef08a', to: '#eab308', direction: 'to bottom right' }
      },
      detail: {
        // Base Detail text (fallback)
        fontSize: '100px',
        fontWeight: 'bold',
        color: '#94a3b8',
        
        // Value styling
        valueFontSize: '180px',
        valueFontWeight: '900',
        valueColor: '#ffffff',
        isValueGradient: true,
        valueGradientColors: {from: '#fef08a', to: '#eab308', direction: 'to bottom'},
        
        // Prefix styling
        prefixFontSize: '110px',
        prefixFontWeight: 'bold',
        prefixColor: '#cbd5e1',
        isPrefixGradient: false,
        prefixGradientColors: { from: '#fef08a', to: '#eab308', direction: 'to bottom right' },
        
        // Unit styling
        unitFontSize: '120px',
        unitFontWeight: 'bold',
        unitColor: '#fef08a',
        isUnitGradient: false,
        unitGradientColors: { from: '#fef08a', to: '#eab308', direction: 'to right' }
      }
    },
    
    globalTexts: [
      { 
        id: 'banner', 
        placeholder: 'MTD TOPPERS', 
        top: '16.5%', left: '20%', width: '60%', height: '300px', 
        fontSize: '200px', fontWeight: '900', color: '#000000',
        isCurved: true, curvePath: 'M 100,250 Q 1050,80 2000,250', 
        strokeColor: '#000000', strokeWidth: '6px' 
      },
      { 
        id: 'bottomBanner', 
        placeholder: 'TEAM KATTAKADA', 
        top: '90%', left: '20%', width: '60%', height: '250px', 
        fontSize: '140px', fontWeight: '900', color: '#000000',
        isCurved: true, curvePath: 'M 100,250 Q 1050,80 2000,250',
        strokeColor: '#000000', strokeWidth: '4px'
      }
    ],
    
    // Slots are now drastically simplified. They inherit styling from defaultTextStyles above.
    slots: [
      {
        id: 0,
        imageBox: { top: '27.5%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '34.5%', left: '48%', width: '1600px', height: '250px' },
          { id: 'detail', placeholder: 'Enter Value', top: '41.5%', left: '48%', width: '1600px', height: '150px' }
        ]
      },
      {
        id: 1,
        imageBox: { top: '49%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '56%', left: '48%', width: '1600px', height: '250px' },
          { id: 'detail', placeholder: 'Enter Value', top: '62.5%', left: '48%', width: '1600px', height: '150px' }
        ]
      },
      {
        id: 2,
        imageBox: { top: '70%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '76.3%', left: '48%', width: '1600px', height: '250px' },
          { id: 'detail', placeholder: 'Enter Value', top: '82.5%', left: '48%', width: '1600px', height: '150px' }
        ]
      }
    ]
  }
];
