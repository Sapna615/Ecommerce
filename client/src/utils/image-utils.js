/**
 * Optimizes image URLs from Unsplash and Pexels by adding parameters for format, quality, and dimensions.
 * 
 * @param {string} url - The original image URL
 * @param {Object} options - Optimization options
 * @param {number} [options.width] - Desired width
 * @param {number} [options.height] - Desired height
 * @param {number} [options.quality=75] - Image quality (1-100)
 * @param {string} [options.format='webp'] - Image format (webp, jpg, etc.)
 * @returns {string} - The optimized URL
 */
export const optimizeImageUrl = (url, { width, height, quality = 75, format = 'webp' } = {}) => {
  if (!url) return url;

  try {
    const urlObj = new URL(url);

    // Handle Unsplash
    if (url.includes('images.unsplash.com')) {
      urlObj.searchParams.set('fm', format);
      urlObj.searchParams.set('q', quality.toString());
      if (width) urlObj.searchParams.set('w', width.toString());
      if (height) {
        urlObj.searchParams.set('h', height.toString());
        urlObj.searchParams.set('fit', 'crop');
        urlObj.searchParams.set('crop', 'center');
      }
      urlObj.searchParams.set('auto', 'format,compress');
      return urlObj.toString();
    }

    // Handle Pexels
    if (url.includes('images.pexels.com')) {
      urlObj.searchParams.set('auto', 'compress');
      urlObj.searchParams.set('cs', 'tinysrgb');
      if (width) urlObj.searchParams.set('w', width.toString());
      if (height) urlObj.searchParams.set('h', height.toString());
      return urlObj.toString();
    }

    // Handle Cloudinary (if applicable)
    if (url.includes('res.cloudinary.com')) {
      // Cloudinary uses path-based optimization e.g. /upload/q_auto,f_auto,w_500/
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        const params = [];
        if (width) params.push(`w_${width}`);
        if (height) params.push(`h_${height},c_fill`);
        params.push('q_auto', 'f_auto');
        return `${parts[0]}/upload/${params.join(',')}/${parts[1]}`;
      }
    }

    return url;
  } catch (e) {
    return url;
  }
};

// Maintain backward compatibility for now
export const optimizeUnsplashUrl = optimizeImageUrl;
