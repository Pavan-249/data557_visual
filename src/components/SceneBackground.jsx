import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './SceneBackground.css';

export default function SceneBackground({ bgSrc, sceneId }) {
  const currentRef = useRef(null);
  const prevRef = useRef(null);
  const [prevBg, setPrevBg] = useState(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const curr = currentRef.current;
    const prev = prevRef.current;
    if (!curr) return;

    // Crossfade: show old bg behind, fade in new on top
    setPrevBg(curr.src);

    gsap.set(curr, { opacity: 0, scale: 1.08 });
    gsap.to(curr, {
      opacity: 1,
      scale: 1.02,
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => setPrevBg(null),
    });

    if (prev) {
      gsap.to(prev, { opacity: 0, duration: 1.4, ease: 'power2.inOut' });
    }
  }, [bgSrc]);

  return (
    <div className="scene-bg" aria-hidden="true">
      {/* Previous image (behind) for crossfade */}
      {prevBg && (
        <img
          ref={prevRef}
          className="scene-bg__img scene-bg__img--prev"
          src={prevBg}
          alt=""
        />
      )}
      {/* Current image */}
      <img
        ref={currentRef}
        className="scene-bg__img"
        src={bgSrc}
        alt=""
        key={bgSrc}
      />
      {/* Vignette / overlay for text readability */}
      <div className="scene-bg__vignette" />
      {/* Bottom gradient for character area */}
      <div className="scene-bg__ground-fade" />
    </div>
  );
}
