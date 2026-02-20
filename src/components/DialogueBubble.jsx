import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { formatLine } from '../data/story';

function plainText(raw) {
  return raw.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
}

export default function DialogueBubble({ speaker, rawText, isActive, onTypewriterComplete }) {
  const bubbleRef = useRef(null);
  const lineRef = useRef(null);
  const tlRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'typing' | 'done'
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    if (!rawText || !isActive) return;

    const bubble = bubbleRef.current;
    if (!bubble) return;

    const text = plainText(rawText);
    const fullHtml = formatLine(rawText);
    const words = text.split(/(\s+)/);
    setVisibleText('');
    setPhase('typing');

    // Defer so we survive React Strict Mode double-mount (start after mount is stable)
    const t = setTimeout(() => {
      const bubbleNow = bubbleRef.current;
      if (!bubbleNow) return;

      tlRef.current = gsap.timeline({
        onComplete: () => {
          setVisibleText(fullHtml);
          setPhase('done');
          onTypewriterComplete?.();
        },
      });

      const tl = tlRef.current;
      tl.fromTo(bubbleNow, { opacity: 0, scale: 0.92, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.2)' });

      const wordDelay = Math.min(0.14, 2800 / words.length / 1000);
      let acc = '';
      words.forEach((w, i) => {
        acc += w;
        tl.call(() => setVisibleText(acc), null, (i + 1) * wordDelay);
      });
    }, 50);

    return () => {
      clearTimeout(t);
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [rawText, isActive, onTypewriterComplete]);

  if (!rawText) return null;

  const speakerName = speaker === 'alex' ? 'Alex' : 'Sam';
  const showFormatted = phase === 'done';
  const lineHtml = showFormatted ? visibleText : visibleText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return (
    <div ref={bubbleRef} className={`dialogue-bubble ${phase}`} data-speaker={speaker}>
      <div className="speaker">{speakerName}</div>
      <div ref={lineRef} className="line" dangerouslySetInnerHTML={{ __html: lineHtml }} />
      {phase === 'typing' && <span className="cursor">|</span>}
    </div>
  );
}
