const maxCacheSize = 500;
const colorCache = new Map();

// Persistent canvas for fallback/complex parsing.
let sharedContext = null;
function getSharedContext(colorSpace = 'srgb') {
  if (!sharedContext) {
    if (typeof OffscreenCanvas !== 'undefined') {
      const canvas = new OffscreenCanvas(1, 1);
      sharedContext = canvas.getContext('2d', { colorSpace, willReadFrequently: true });
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      sharedContext = canvas.getContext('2d', { willReadFrequently: true });
    }
  }
  return sharedContext;
}

// Delete the oldest entry (the one added first) if cache size exceeds max.
function setCache(key, value) {
  if (colorCache.size >= maxCacheSize) {
    const firstKey = colorCache.keys().next().value;
    colorCache.delete(firstKey);
  }
  colorCache.set(key, value);
}

/**
 * Convert colour string to RGBA format.
 * @param {string} color The colour string to convert.
 * @param {number} opacity The computed opacity of the element (0 to 1).
 * @returns Returns colour in rgba format with alpha value.
 */
export function convertToRGBA(color, opacity = 1) {
  const cacheKey = `${color}_${opacity}`;

  // 1. Cache Hit
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey);
  }

  let r;
  let g;
  let b;
  let a = 1;

  // 2. Fast Path: Hex
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const len = hex.length;
    if (len === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  }

  // 3. Fast Path: RGB/RGBA
  else if (color.startsWith('rgb')) {
    const values = color.match(/[\d.]+/g);
    if (values) {
      r = parseInt(values[0], 10);
      g = parseInt(values[1], 10);
      b = parseInt(values[2], 10);
      a = values[3] !== undefined ? parseFloat(values[3]) : 1;
    }
  }

  // 4. Fallback Path: Canvas for CSS Names (e.g., "rebeccapurple") or P3
  else {
    const colorSpace = color.startsWith('color(display-p3') ? 'display-p3' : 'srgb';
    const ctx = getSharedContext(colorSpace);
    if (!ctx || color.startsWith('color(rec2020')) return 'unsupported';

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const imageData = ctx.getImageData(0, 0, 1, 1);
    [r, g, b, a] = imageData.data;
    a = a / 255;
  }

  // 5. Apply opacity.
  const finalAlpha = opacity < 1 ? Number((a * opacity).toFixed(2)) : a;
  const result = [r, g, b, finalAlpha];

  // 6. Store in managed cache.
  setCache(cacheKey, result);
  return result;
}
