import { useEffect, useRef, useState } from "react";
import type { BrandSlide, SlideElement } from "@/lib/presentation-types";

const media = import.meta.glob("/src/assets/**/*.{jpg,jpeg,png}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
export function SlideLayout({ slide, onSelect, selected }: { slide: BrandSlide; onSelect?: (element: SlideElement) => void; selected?: string }) {
  return <div className="slide-content" style={{ background: `hsl(var(--${slide.background}))` }}>
    {slide.elements.map(e => <div key={e.id} className={`slide-element ${onSelect && e.type === "text" ? "slide-editable" : ""} ${selected === e.id ? "slide-selected" : ""}`} onClick={() => e.type === "text" && onSelect?.(e)} style={{ left: e.x, top: e.y, width: e.w, height: e.h, background: e.fill ? `hsl(var(--${e.fill}))` : undefined }}>
      {e.type === "text" && <div className={e.font === "display" ? "slide-display" : "slide-body"} style={{ fontSize: e.size, color: `hsl(var(--${e.color || "forest"}))`, fontWeight: e.bold ? 600 : 400 }}>{e.text}</div>}
      {e.type === "image" && <img src={media[`/src/assets/${e.asset}`]} alt={e.asset?.replace(/[-.]/g, " ")} draggable={false} style={{ objectFit: e.fit || "contain" }} />}
    </div>)}
  </div>;
}
export function ScaledSlide({ slide, onSelect, selected }: { slide: BrandSlide; onSelect?: (element: SlideElement) => void; selected?: string }) {
  const parent = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const node = parent.current; if (!node) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(entry.contentRect.width / 1920, entry.contentRect.height / 1080)));
    observer.observe(node); return () => observer.disconnect();
  }, []);
  return <div ref={parent} className="scaled-slide"><div className="slide-wrapper" style={{ transform: `scale(${scale})` }}><SlideLayout slide={slide} onSelect={onSelect} selected={selected} /></div></div>;
}