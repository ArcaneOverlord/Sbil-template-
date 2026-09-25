export interface TextConfig {
  id: string;          // e.g., 'name' or 'detail'
  placeholder: string;
  top: string;         // e.g., '100px' or '15%'
  left: string;
  width: string;
  fontSize: string;
  fontWeight: string;
  color: string;
  transform?: string;  // Use this for text curvature/rotation e.g., 'rotate(-5deg)'
}

export interface ImageConfig {
  top: string;
  left: string;
  width: string;
  height: string;
  borderRadius: string;
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
  slots: SlotConfig[];
}

// Your modular templates array
export const posterTemplates: Template[] = [
  {
    id: 'sbi-life-top-3',
    name: 'Top 3 Achievers (Gold)',
    description: 'Standard MTD/YTD recognition poster for top 3 sales performers.',
    thumbnail: '/1000114310.png',
    background: '/1000114310.png',
    slots: [
      // SLOT 1 (Top)
      {
        id: 0,
        imageBox: { top: '30%', left: '26.5%', width: '700px', height: '750px', borderRadius: '40px' },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '35%', left: '46%', width: '1200px', fontSize: '140px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Details / Branch', top: '40.5%', left: '46%', width: '1200px', fontSize: '90px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      },
      // SLOT 2 (Middle)
      {
        id: 1,
        imageBox: { top: '53.5%', left: '26.5%', width: '700px', height: '750px', borderRadius: '40px' },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '58.5%', left: '46%', width: '1200px', fontSize: '140px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Details / Branch', top: '64%', left: '46%', width: '1200px', fontSize: '90px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      },
      // SLOT 3 (Bottom)
      {
        id: 2,
        imageBox: { top: '77%', left: '26.5%', width: '700px', height: '750px', borderRadius: '40px' },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '82%', left: '46%', width: '1200px', fontSize: '140px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Details / Branch', top: '87.5%', left: '46%', width: '1200px', fontSize: '90px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      }
    ]
  },
  // ADD NEW TEMPLATES HERE following the same structure
];
