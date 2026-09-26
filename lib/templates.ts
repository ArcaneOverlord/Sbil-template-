export interface TextConfig {
  id: string;          
  placeholder: string;
  top: string;         
  left: string;
  width: string;
  height: string;
  fontSize: string;
  fontWeight: string;
  color: string;
  transform?: string;
  // NEW: Curve & Super-Bold settings
  isCurved?: boolean;
  curvePath?: string; 
  strokeColor?: string;
  strokeWidth?: string;
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
  slots: SlotConfig[];
}

export const posterTemplates: Template[] = [
  {
    id: 'sbi-life-top-3',
    name: 'Top 3 Achievers (Gold)',
    description: 'Standard MTD/YTD recognition poster for top 3 sales performers.',
    thumbnail: '/1000114310.png',
    background: '/1000114310.png',
    globalTexts: [
      { 
        id: 'banner', 
        placeholder: 'MTD TOPPERS', 
        top: '14.5%', // Shifted up slightly to account for the curve's height
        left: '20%', 
        width: '60%', 
        height: '300px', // Taller box to give the curve room to arc
        fontSize: '180px', 
        fontWeight: '900', // Max standard bold
        color: '#000000',
        isCurved: true,
        // Q calculates the arc: M(StartX, StartY) Q(CurveX, CurveY) EndX, EndY
        curvePath: 'M 100,250 Q 1050,40 2000,250', // Arcs upwards in the middle
        strokeColor: '#000000',
        strokeWidth: '6px' // The higher this number, the bolder the text becomes
      },
      { 
        id: 'bottomBanner', 
        placeholder: 'KERALA REGION', 
        top: '91%', 
        left: '20%', 
        width: '60%', 
        height: '250px', 
        fontSize: '140px', 
        fontWeight: '900', 
        color: '#000000',
        isCurved: true,
        curvePath: 'M 100,60 Q 1050,220 2000,60', // Arcs downwards in the middle
        strokeColor: '#000000',
        strokeWidth: '4px'
      }
    ],
    slots: [
      {
        id: 0,
        imageBox: { 
          top: '27.5%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px',
          backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1
        },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '34.5%', left: '48%', width: '1600px', height: '250px', fontSize: '130px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Value', top: '41.5%', left: '48%', width: '1600px', height: '150px', fontSize: '120px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      },
      {
        id: 1,
        imageBox: { 
          top: '49%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px',
          backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1
        },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '56%', left: '48%', width: '1600px', height: '250px', fontSize: '130px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Value', top: '62.5%', left: '48%', width: '1600px', height: '150px', fontSize: '120px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      },
      {
        id: 2,
        imageBox: { 
          top: '70%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px',
          backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 
        },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '76%', left: '48%', width: '1600px', height: '250px', fontSize: '130px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Value', top: '82.5%', left: '48%', width: '1600px', height: '150px', fontSize: '120px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      }
    ]
  }
];
