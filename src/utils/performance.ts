
/**
 * Performance utilities for optimizing app performance
 */

// Throttle function to limit the frequency of function calls
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Debounce function to delay execution until after a period of inactivity
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Optimized image loader for lazy loading images
export const optimizedImageLoader = (imgUrl: string, imgElement: HTMLImageElement) => {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = imgUrl;
    
    img.onload = () => {
      imgElement.src = imgUrl;
      resolve();
    };
    
    img.onerror = () => {
      // Set a fallback image or handle error
      imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';
      resolve();
    };
    
    // Set timeout for slow connections
    setTimeout(() => {
      if (!img.complete) {
        img.src = '';
        imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';
        resolve();
      }
    }, 5000);
  });
};

// Memory leak prevention utility
export const cleanupEventListeners = (elements: HTMLElement[], events: string[]) => {
  elements.forEach(element => {
    events.forEach(event => {
      element.replaceWith(element.cloneNode(true));
    });
  });
};

// Check if app runs in low-memory environment
export const isLowMemoryDevice = (): boolean => {
  if (typeof navigator !== 'undefined' && 'deviceMemory' in navigator) {
    // @ts-ignore - deviceMemory is not in the standard types
    return navigator.deviceMemory < 4;
  }
  return false;
};

// Update app settings based on device capabilities
export const optimizeForDevice = () => {
  const settings = {
    enableAnimations: true,
    enableTransitions: true,
    imageQuality: 'high',
    cacheLevel: 'normal'
  };
  
  if (isLowMemoryDevice()) {
    settings.enableAnimations = false;
    settings.enableTransitions = false;
    settings.imageQuality = 'low';
    settings.cacheLevel = 'minimum';
  }
  
  return settings;
};
