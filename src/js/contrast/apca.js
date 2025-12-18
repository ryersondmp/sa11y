// biome-ignore-all lint: third party APCA library.

/**
 * @license
 *
 * The APCA contrast prediction algorithm is based of the formulas published
 * in the APCA-1.0.98G specification by Myndex.
 *
 * @link https://github.com/Myndex/apca-w3/tree/master
 * @license https://github.com/Myndex/apca-w3/tree/master?tab=License-1-ov-file
 */

const SA98G = {
  mainTRC: 2.4,
  get mainTRCencode() {
    return 1 / this.mainTRC;
  },
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.072175,
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  scaleWoB: 1.14,
  loBoWoffset: 0.027,
  loWoBoffset: 0.027,
  deltaYmin: 0.0005,
  loClip: 0.1,
  mFactor: 1.9468554433171,
  get mFactInv() {
    return 1 / this.mFactor;
  },
  mOffsetIn: 0.0387393816571401,
  mExpAdj: 0.283343396420869,
  get mExp() {
    return this.mExpAdj / this.blkClmp;
  },
  mOffsetOut: 0.312865795870758,
};

export function APCAcontrast(txtY, bgY, places = -1) {
  const icp = [0.0, 1.1];
  if (isNaN(txtY) || isNaN(bgY) || Math.min(txtY, bgY) < icp[0] || Math.max(txtY, bgY) > icp[1]) {
    return 0.0;
  }
  let SAPC = 0.0;
  let outputContrast = 0.0;
  let polCat = 'BoW';
  txtY = txtY > SA98G.blkThrs ? txtY : txtY + Math.pow(SA98G.blkThrs - txtY, SA98G.blkClmp);
  bgY = bgY > SA98G.blkThrs ? bgY : bgY + Math.pow(SA98G.blkThrs - bgY, SA98G.blkClmp);
  if (Math.abs(bgY - txtY) < SA98G.deltaYmin) {
    return 0.0;
  }
  if (bgY > txtY) {
    SAPC = (Math.pow(bgY, SA98G.normBG) - Math.pow(txtY, SA98G.normTXT)) * SA98G.scaleBoW;
    outputContrast = SAPC < SA98G.loClip ? 0.0 : SAPC - SA98G.loBoWoffset;
  } else {
    polCat = 'WoB';
    SAPC = (Math.pow(bgY, SA98G.revBG) - Math.pow(txtY, SA98G.revTXT)) * SA98G.scaleWoB;
    outputContrast = SAPC > -SA98G.loClip ? 0.0 : SAPC + SA98G.loWoBoffset;
  }
  if (places < 0) {
    return outputContrast * 100.0;
  } else if (places == 0) {
    return Math.round(Math.abs(outputContrast) * 100.0) + '<sub>' + polCat + '</sub>';
  } else if (Number.isInteger(places)) {
    return (outputContrast * 100.0).toFixed(places);
  } else {
    return 0.0;
  }
}

export function fontLookupAPCA(contrast, places = 2) {
  const fontMatrixAscend = [
    ['Lc', 100, 200, 300, 400, 500, 600, 700, 800, 900],
    [0, 999, 999, 999, 999, 999, 999, 999, 999, 999],
    [10, 999, 999, 999, 999, 999, 999, 999, 999, 999],
    [15, 777, 777, 777, 777, 777, 777, 777, 777, 777],
    [20, 777, 777, 777, 777, 777, 777, 777, 777, 777],
    [25, 777, 777, 777, 120, 120, 108, 96, 96, 96],
    [30, 777, 777, 120, 108, 108, 96, 72, 72, 72],
    [35, 777, 120, 108, 96, 72, 60, 48, 48, 48],
    [40, 120, 108, 96, 60, 48, 42, 32, 32, 32],
    [45, 108, 96, 72, 42, 32, 28, 24, 24, 24],
    [50, 96, 72, 60, 32, 28, 24, 21, 21, 21],
    [55, 80, 60, 48, 28, 24, 21, 18, 18, 18],
    [60, 72, 48, 42, 24, 21, 18, 16, 16, 18],
    [65, 68, 46, 32, 21.75, 19, 17, 15, 16, 18],
    [70, 64, 44, 28, 19.5, 18, 16, 14.5, 16, 18],
    [75, 60, 42, 24, 18, 16, 15, 14, 16, 18],
    [80, 56, 38.25, 23, 17.25, 15.81, 14.81, 14, 16, 18],
    [85, 52, 34.5, 22, 16.5, 15.625, 14.625, 14, 16, 18],
    [90, 48, 32, 21, 16, 15.5, 14.5, 14, 16, 18],
    [95, 45, 28, 19.5, 15.5, 15, 14, 13.5, 16, 18],
    [100, 42, 26.5, 18.5, 15, 14.5, 13.5, 13, 16, 18],
    [105, 39, 25, 18, 14.5, 14, 13, 12, 16, 18],
    [110, 36, 24, 18, 14, 13, 12, 11, 16, 18],
    [115, 34.5, 22.5, 17.25, 12.5, 11.875, 11.25, 10.625, 14.5, 16.5],
    [120, 33, 21, 16.5, 11, 10.75, 10.5, 10.25, 13, 15],
    [125, 32, 20, 16, 10, 10, 10, 10, 12, 14],
  ];

  const fontDeltaAscend = [
    ['∆Lc', 100, 200, 300, 400, 500, 600, 700, 800, 900],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [25, 0, 0, 0, 12, 12, 12, 24, 24, 24],
    [30, 0, 0, 12, 12, 36, 36, 24, 24, 24],
    [35, 0, 12, 12, 36, 24, 18, 16, 16, 16],
    [40, 12, 12, 24, 18, 16, 14, 8, 8, 8],
    [45, 12, 24, 12, 10, 4, 4, 3, 3, 3],
    [50, 16, 12, 12, 4, 4, 3, 3, 3, 3],
    [55, 8, 12, 6, 4, 3, 3, 2, 2, 0],
    [60, 4, 2, 10, 2.25, 2, 1, 1, 0, 0],
    [65, 4, 2, 4, 2.25, 1, 1, 0.5, 0, 0],
    [70, 4, 2, 4, 1.5, 2, 1, 0.5, 0, 0],
    [75, 4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
    [80, 4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
    [85, 4, 2.5, 1, 0.5, 0.125, 0.125, 0, 0, 0],
    [90, 3, 4, 1.5, 0.5, 0.5, 0.5, 0.5, 0, 0],
    [95, 3, 1.5, 1, 0.5, 0.5, 0.5, 0.5, 0, 0],
    [100, 3, 1.5, 0.5, 0.5, 0.5, 0.5, 1, 0, 0],
    [105, 3, 1, 0, 0.5, 1, 1, 1, 0, 0],
    [110, 1.5, 1.5, 0.75, 1.5, 1.125, 0.75, 0.375, 1.5, 1.5],
    [115, 1.5, 1.5, 0.75, 1.5, 1.125, 0.75, 0.375, 1.5, 1.5],
    [120, 1, 1, 0.5, 1, 0.75, 0.5, 0.25, 1, 1],
    [125, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const weightArray = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const weightArrayLen = weightArray.length;
  let returnArray = [contrast.toFixed(places), 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const returnArrayLen = returnArray.length;
  const contrastArrayAscend = [
    'lc',
    0,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90,
    95,
    100,
    105,
    110,
    115,
    120,
    125,
  ];
  const contrastArrayLenAsc = contrastArrayAscend.length;
  let tempFont = 777;
  contrast = Math.abs(contrast);
  const factor = 0.2;
  const index = contrast == 0 ? 1 : (contrast * factor) | 0;
  let w = 0;
  let scoreAdj = (contrast - fontMatrixAscend[index][w]) * factor;
  w++;
  for (; w < weightArrayLen; w++) {
    tempFont = fontMatrixAscend[index][w];
    if (tempFont > 400) {
      returnArray[w] = tempFont;
    } else if (contrast < 14.5) {
      returnArray[w] = 999;
    } else if (contrast < 29.5) {
      returnArray[w] = 777;
    } else {
      tempFont > 24
        ? (returnArray[w] = Math.round(tempFont - fontDeltaAscend[index][w] * scoreAdj))
        : (returnArray[w] = tempFont - ((2.0 * fontDeltaAscend[index][w] * scoreAdj) | 0) * 0.5);
    }
  }
  return returnArray;
}

export function sRGBtoY(rgb = [0, 0, 0]) {
  function simpleExp(chan) {
    return Math.pow(chan / 255.0, SA98G.mainTRC);
  }
  return (
    SA98G.sRco * simpleExp(rgb[0]) + SA98G.sGco * simpleExp(rgb[1]) + SA98G.sBco * simpleExp(rgb[2])
  );
}

export function displayP3toY(rgb = [0, 0, 0]) {
  const mainTRC = 2.4;
  const sRco = 0.228982959480578,
    sGco = 0.691749262585238,
    sBco = 0.0792677779341829;
  function simpleExp(chan) {
    return Math.pow(chan, mainTRC);
  }
  return sRco * simpleExp(rgb[0]) + sGco * simpleExp(rgb[1]) + sBco * simpleExp(rgb[2]);
}

export function adobeRGBtoY(rgb = [0, 0, 0]) {
  const mainTRC = 2.35;
  const sRco = 0.297355022711381,
    sGco = 0.627372749714528,
    sBco = 0.0752722275740913;
  function simpleExp(chan) {
    return Math.pow(chan / 255.0, mainTRC);
  }
  return sRco * simpleExp(rgb[0]) + sGco * simpleExp(rgb[1]) + sBco * simpleExp(rgb[2]);
}

export function alphaBlend(rgbaFG = [0, 0, 0, 1.0], rgbBG = [0, 0, 0], round = true) {
  rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1.0), 0.0);
  let compBlend = 1.0 - rgbaFG[3];
  let rgbOut = [0, 0, 0, 1, true];
  for (let i = 0; i < 3; i++) {
    rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3];
    if (round) rgbOut[i] = Math.min(Math.round(rgbOut[i]), 255);
  }
  return rgbOut;
}
