export interface PhotoAsset {
  src: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

export const photos: Record<string, PhotoAsset> = {
  '道頓堀夜景・大阪城市風光': {
    src: `${import.meta.env.BASE_URL}images/cover/dotonbori.jpg`,
    alt: '夜晚的道頓堀河畔與霓虹招牌',
    author: 'Sakai Yayoi',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Osaka_Dotonbori_yoru_00.jpg',
  },
  '大阪城與天守閣': {
    src: `${import.meta.env.BASE_URL}images/day1/osaka-castle.jpg`,
    alt: '大阪城天守閣與石垣護城河',
    author: 'Otto Domes',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Osaka_Castle_Japan.jpg',
  },
  '伏見稻荷大社的朱紅鳥居': {
    src: `${import.meta.env.BASE_URL}images/day2/fushimi-inari.jpg`,
    alt: '伏見稻荷大社山徑上的朱紅色千本鳥居',
    author: 'Redrat72',
    license: 'Public domain',
    licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fushimi-Inari.jpg',
  },
  '清水寺與東山街景': {
    src: `${import.meta.env.BASE_URL}images/day2/kiyomizu-dera.jpg`,
    alt: '京都清水寺本堂與周邊山景',
    author: 'Grueslayer',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:JAP_Kyoto_Kiyomizu-dera.jpg',
  },
  '日本環球影城園區': {
    src: `${import.meta.env.BASE_URL}images/day3/usj.jpg`,
    alt: '日本環球影城入口拱門與園區景色',
    author: 'Leeyj0401',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Universal_Studios_in_Japan.jpg',
  },
  '勝尾寺的達摩祈願': {
    src: `${import.meta.env.BASE_URL}images/day4/katsuoji-daruma.jpg`,
    alt: '勝尾寺供奉的紅色達摩祈願人偶',
    author: 'Chris Gladis',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Katsuo-ji_daruma_07.jpg',
  },
  '關西機場出境大廳': {
    src: `${import.meta.env.BASE_URL}images/day5/kix-terminal.jpg`,
    alt: '關西國際機場第一航廈內部與手扶梯',
    author: 'Whity',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kansai_International_Airport_Terminal.JPG',
  },
  '大阪街頭章魚燒': {
    src: `${import.meta.env.BASE_URL}images/food/takoyaki.jpg`,
    alt: '大阪街頭剛烤好的章魚燒',
    author: 'ZhengZhou',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Takoyaki_in_Osaka.jpg',
  },
};
