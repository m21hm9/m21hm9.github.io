// Set before the first paint; later visits in this session use the static layout.
export const introScript = `(function(){try{if(!sessionStorage.getItem('portfolio-intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-motion');sessionStorage.setItem('portfolio-intro-seen','true')}}catch(e){}})();`;
