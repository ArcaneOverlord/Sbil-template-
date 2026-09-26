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
  globalTexts?: TextConfig[]; // NEW: For the master YTD/MTD Banner
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
        top: '19.5%', // Positioned over the top golden ribbon
        left: '20%', 
        width: '60%', 
        height: '150px', 
        fontSize: '85px', 
        fontWeight: 'bold', 
        color: '#000000' 
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
          { id: 'name', placeholder: 'Enter Name', top: '31.5%', left: '46%', width: '1600px', height: '250px', fontSize: '130px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Value', top: '40%', left: '46%', width: '1600px', height: '150px', fontSize: '90px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      },
      {
        id: 1,
        imageBox: { 
          top: '49%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px',
          backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1
        },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '53.5%', left: '46%', width: '1600px', height: '250px', fontSize: '130px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Value', top: '61.5%', left: '46%', width: '1600px', height: '150px', fontSize: '90px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      },
      {
        id: 2,
        imageBox: { 
          top: '70%', left: '20.5%', width: '900px', height: '950px', borderRadius: '40px',
          backgroundColor: '#e5e7eb', borderColor: 'transparent', borderWidth: '0px', zIndex: 0, opacity: 1 
        },
        textBoxes: [
          { id: 'name', placeholder: 'Enter Name', top: '74%', left: '46%', width: '1600px', height: '250px', fontSize: '130px', fontWeight: 'bold', color: '#ffffff' },
          { id: 'detail', placeholder: 'Enter Value', top: '82%', left: '46%', width: '1600px', height: '150px', fontSize: '90px', fontWeight: 'normal', color: '#e2e8f0' }
        ]
      }
    ]
  }
];
