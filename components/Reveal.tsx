import type { ElementType, ReactNode } from "react";

/**
 * Marks content to fade/slide in when it scrolls into view.
 * This is a plain server component: the observing is done by the tiny inline
 * script in RevealScript (rendered once in app/layout.tsx), so reveals work
 * immediately on page load without waiting for React hydration.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  return (
    <Tag className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}

/**
 * Inline script: adds `js-reveal` to <html> (enabling the hidden state in
 * globals.css) and reveals `.reveal` elements as they enter the viewport.
 * A MutationObserver picks up elements added by client-side navigation.
 * If IntersectionObserver is unavailable, nothing is ever hidden.
 */
const revealScript = `(function(){
  if(!('IntersectionObserver' in window)) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-reveal');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}
  });},{rootMargin:'0px 0px -10% 0px'});
  function scan(){document.querySelectorAll('.reveal:not(.is-visible):not([data-rv])').forEach(function(el){el.setAttribute('data-rv','');io.observe(el);});}
  document.addEventListener('DOMContentLoaded',function(){
    scan();
    new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
  });
})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: revealScript }} />;
}
