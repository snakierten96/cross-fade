export interface ImageData {
  color: string,
  swatch: string,
  main: string,
  others: string[],
  alternates: string[]
}

export const images: ImageData[] = [
  {
    color: 'black',
    swatch: '/assets/LL220-1101/black.gif',
    main: '/assets/LL220-1101/black/image1xl.jpg',
    others: [
      '/assets/LL220-1101/black/image1xl.jpg',
      '/assets/LL220-1101/black/image2xl.jpg',
      '/assets/LL220-1101/black/image3xl.jpg'
    ],
    alternates: [
      '/assets/LL220-1101/black/image1s.jpg',
      '/assets/LL220-1101/black/image2s.jpg',
      '/assets/LL220-1101/black/image3s.jpg'
    ]
  },
  {
    color: 'nude',
    swatch: '/assets/LL220-1101/nude.gif',
    main: '/assets/LL220-1101/nude/image1xl.jpg',
    others: [
      '/assets/LL220-1101/nude/image1xl.jpg',
      '/assets/LL220-1101/nude/image2xl.jpg',
      '/assets/LL220-1101/nude/image3xl.jpg'
    ],
    alternates: [
      '/assets/LL220-1101/nude/image1s.jpg',
      '/assets/LL220-1101/nude/image2s.jpg',
      '/assets/LL220-1101/nude/image3s.jpg'
    ]
  },
  {
    color: 'hot-pink-animal',
    swatch: '/assets/LL220-1101/hot-pink-animal.gif',
    main: '/assets/LL220-1101/hot-pink-animal/image1xl.jpg',
    others: [
      '/assets/LL220-1101/hot-pink-animal/image1xl.jpg',
      '/assets/LL220-1101/hot-pink-animal/image2xl.jpg',
      '/assets/LL220-1101/hot-pink-animal/image3xl.jpg'
    ],
    alternates: [
      '/assets/LL220-1101/hot-pink-animal/image1s.jpg',
      '/assets/LL220-1101/hot-pink-animal/image2s.jpg',
      '/assets/LL220-1101/hot-pink-animal/image3s.jpg'
    ]
  }
];
