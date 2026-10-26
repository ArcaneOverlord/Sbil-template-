export interface TextConfig {
  id: string;          
  placeholder?: string;
  top: string;         
  left: string;
  width: string;
  height: string;
  
  // ========================================================================
  // ABSOLUTE OVERRIDE ENGINE:
  // When Team Input is ON, ANY property you put inside this object will 
  // replace the base properties above it. You can change top, left, fontSize, 
  // color, or even the boxStyle dynamically!
  // ========================================================================
  activeTeamOverride?: Partial<Omit<TextConfig, 'id' | 'activeTeamOverride'>>;
  
  // ========================================================================
  // ROUND EDGE BLOCK CONTROLS:
  // Use this to add shapes behind text. To hide it, either delete this block 
  // or set backgroundColor to 'transparent'.
  // ========================================================================
  boxStyle?: {
    backgroundColor?: string; // e.g., 'rgba(0,0,0,0.5)' or 'transparent'
    borderRadius?: string;    // Adjust roundness here (e.g., '20px' or '100px')
    border?: string;          // e.g., '2px solid #ffffff'
    padding?: string;         
  };
  
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  transform?: string;  
  
  isCurved?: boolean;
  curvePath?: string; 
  strokeColor?: string;
  strokeWidth?: string;

  isGradient?: boolean;
  gradientColors?: { from: string; to: string; direction?: string };
  
  valueFontSize?: string;
  valueFontWeight?: string;
  valueColor?: string;
  isValueGradient?: boolean; 
  valueGradientColors?: { from: string; to: string; direction?: string };

  prefixFontSize?: string;
  prefixFontWeight?: string;
  prefixColor?: string;
  isPrefixGradient?: boolean;
  prefixGradientColors?: { from: string; to: string; direction?: string };

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

export interface CustomField {
  id: string;
  type: 'text' | 'image';
  label: string; 
  defaultValue?: string; 
  textConfig?: TextConfig;
  imageConfig?: ImageConfig;
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
  defaultTextStyles?: Record<string, Partial<TextConfig>>; 
  customFields?: CustomField[]; 
  slots: SlotConfig[];
}

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
        textBoxes: [ 
          // Example: When Team is active, we move the Name UP to 31% and SHRINK the font to 140px so it fits better!
          { id: 'name', top: '34.5%', left: '48%', width: '1600px', height: '250px', activeTeamOverride: { top: '31%', fontSize: '140px' } }, 
          { id: 'detail', top: '41.5%', left: '48%', width: '1600px', height: '150px', activeTeamOverride: { top: '38%' } }, 
          { id: 'team', top: '46%', left: '48%', width: '1600px', height: '120px' } 
        ]
      },
      {
        id: 1, imageBox: { top: '49%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '56%', left: '48%', width: '1600px', height: '250px', activeTeamOverride: { top: '52.5%', fontSize: '140px' } }, { id: 'detail', top: '62.5%', left: '48%', width: '1600px', height: '150px', activeTeamOverride: { top: '59.5%' } }, { id: 'team', top: '67%', left: '48%', width: '1600px', height: '120px' } ]
      },
      {
        id: 2, imageBox: { top: '70%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ { id: 'name', top: '76.3%', left: '48%', width: '1600px', height: '250px', activeTeamOverride: { top: '73%', fontSize: '140px' } }, { id: 'detail', top: '82.5%', left: '48%', width: '1600px', height: '150px', activeTeamOverride: { top: '79.5%' } }, { id: 'team', top: '87%', left: '48%', width: '1600px', height: '120px' } ]
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
      team: { fontSize: '70px', fontWeight: 'bold', color: '#ffffff' } 
    },
    globalTexts: [
      { id: 'banner', placeholder: 'MTD TOPPERS', top: '14.5%', left: '31%', width: '60%', height: '400px', fontSize: '220px', fontWeight: '900', color: '#ffffff', isCurved: false, curvePath: 'M 100,250 Q 1050,250 2000,250', strokeColor: '#1e293d', strokeWidth: '6px' },
      { id: 'bottomBanner', placeholder: 'TEAM KATTAKADA', top: '93.8%', left: '27%', width: '47%', height: '250px', fontSize: '140px', fontWeight: '900', color: '#1e293d', isCurved: false, curvePath: 'M 100,250 Q 1050,250 2000,250', strokeColor: '#1e293d', strokeWidth: '4px' }
    ],
    slots: [
      {
        id: 0, imageBox: { top: '21%', left: '28%', width: '1500px', height: '1400px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ 
          { id: 'name', top: '47.5%', left: '33%', width: '1200px', height: '220px', fontSize: '160px', activeTeamOverride: { top: '45%' } }, 
          { id: 'detail', top: '51.1%', left: '33%', width: '1200px', height: '180px', prefixFontSize: '100px', valueFontSize: '140px', unitFontSize: '120px', activeTeamOverride: { top: '48.5%' } }, 
          { 
            id: 'team', top: '54%', left: '33%', width: '1200px', height: '120px', 
            // Control the Box Style right here!
            boxStyle: { backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '60px' } 
          } 
        ]
      },
      {
        id: 1, imageBox: { top: '56%', left: '13%', width: '1000px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ 
          { id: 'name', top: '74.3%', left: '13.7%', width: '900px', height: '180px', activeTeamOverride: { top: '72%' } }, 
          { id: 'detail', top: '77.4%', left: '13.7%', width: '900px', height: '150px', activeTeamOverride: { top: '75%' } }, 
          { id: 'team', top: '81%', left: '13.7%', width: '900px', height: '120px', boxStyle: { backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '60px' } } 
        ]
      },
      {
        id: 2, imageBox: { top: '56%', left: '60.7%', width: '900px', height: '950px', borderRadius: '40px', backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 },
        textBoxes: [ 
          { id: 'name', top: '74.3%', left: '61%', width: '900px', height: '180px', activeTeamOverride: { top: '72%' } }, 
          { id: 'detail', top: '77.4%', left: '61%', width: '900px', height: '150px', activeTeamOverride: { top: '75%' } }, 
          { id: 'team', top: '81%', left: '61%', width: '900px', height: '120px', boxStyle: { backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '60px' } } 
        ]
      }
    ]
  }
];
