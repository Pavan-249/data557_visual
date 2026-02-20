import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Character({ who, name, isSpeaking, isMoving }) {
  const containerRef = useRef(null);
  const bodyRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const headRef = useRef(null);
  const mouthRef = useRef(null);

  const idleTween = useRef(null);
  const walkTl = useRef(null);
  const hoverTween = useRef(null);
  const speakTl = useRef(null);

  const isGhost = who === 'sam';

  // ── Idle / hover animation ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isGhost) {
      hoverTween.current = gsap.to(el, {
        y: -12,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    } else {
      idleTween.current = gsap.to(el, {
        y: -4,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      idleTween.current?.kill();
      hoverTween.current?.kill();
    };
  }, [isGhost]);

  // ── Walk cycle ──
  useEffect(() => {
    if (isGhost) return;

    const lArm = leftArmRef.current;
    const rArm = rightArmRef.current;
    const lLeg = leftLegRef.current;
    const rLeg = rightLegRef.current;
    if (!lLeg || !rLeg) return;

    if (isMoving) {
      idleTween.current?.pause();
      walkTl.current?.kill();

      walkTl.current = gsap.timeline({ repeat: -1 })
        .to(lLeg, { rotation: -30, duration: 0.2, ease: 'sine.inOut' }, 0)
        .to(rLeg, { rotation: 30, duration: 0.2, ease: 'sine.inOut' }, 0)
        .to(lArm, { rotation: 25, duration: 0.2, ease: 'sine.inOut' }, 0)
        .to(rArm, { rotation: -25, duration: 0.2, ease: 'sine.inOut' }, 0)
        .to(lLeg, { rotation: 30, duration: 0.2, ease: 'sine.inOut' }, 0.2)
        .to(rLeg, { rotation: -30, duration: 0.2, ease: 'sine.inOut' }, 0.2)
        .to(lArm, { rotation: -25, duration: 0.2, ease: 'sine.inOut' }, 0.2)
        .to(rArm, { rotation: 25, duration: 0.2, ease: 'sine.inOut' }, 0.2);
    } else {
      walkTl.current?.kill();
      gsap.to([lLeg, rLeg, lArm, rArm], { rotation: 0, duration: 0.35, ease: 'power2.out' });
      idleTween.current?.play();
    }
  }, [isMoving, isGhost]);

  // ── Speaking animation ──
  useEffect(() => {
    const head = headRef.current;
    const mouth = mouthRef.current;
    const el = containerRef.current;
    if (!el) return;

    speakTl.current?.kill();

    if (isSpeaking) {
      // Scale up slightly
      gsap.to(el, { scale: 1.08, duration: 0.4, ease: 'back.out(1.5)' });

      // Head tilt
      if (head) {
        speakTl.current = gsap.timeline({ repeat: -1, yoyo: true })
          .to(head, { rotation: -3, duration: 0.6, ease: 'sine.inOut' })
          .to(head, { rotation: 3, duration: 0.6, ease: 'sine.inOut' });
      }

      // Mouth open-close
      if (mouth) {
        gsap.to(mouth, {
          scaleY: 1.5,
          duration: 0.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Arm gesture for the speaking character
      if (!isGhost) {
        const arm = who === 'alex' ? rightArmRef.current : leftArmRef.current;
        if (arm) {
          gsap.to(arm, { rotation: -45, duration: 0.3, ease: 'back.out(1.7)' });
        }
      }
    } else {
      gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.inOut' });
      if (head) gsap.to(head, { rotation: 0, duration: 0.3 });
      if (mouth) gsap.to(mouth, { scaleY: 1, duration: 0.2 });
      if (!isGhost) {
        const arm = who === 'alex' ? rightArmRef.current : leftArmRef.current;
        if (arm) gsap.to(arm, { rotation: 0, duration: 0.3 });
      }
    }

    return () => speakTl.current?.kill();
  }, [isSpeaking, who, isGhost]);

  // ── Colors ──
  const headColor = isGhost ? '#c8dff0' : '#FFD93D';
  const bodyColor = isGhost ? 'rgba(160, 200, 230, 0.45)' : (who === 'alex' ? '#4a9e6e' : '#4a9e6e');
  const limbColor = isGhost ? 'rgba(180, 215, 240, 0.5)' : '#2d2d2d';
  const eyeColor = isGhost ? '#fff' : '#1a1a1a';
  const nameColor = isGhost ? '#a8c8e8' : '#FFD93D';

  return (
    <div
      ref={containerRef}
      className={`character ${isSpeaking ? 'speaking' : ''} ${isMoving ? 'walking' : ''} ${isGhost ? 'ghost' : ''}`}
      data-who={who}
    >
      <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        {/* ── Legs ── */}
        {!isGhost ? (
          <>
            <g ref={leftLegRef} style={{ transformOrigin: '48px 140px' }}>
              <rect x="44" y="138" width="8" height="40" rx="4" fill={limbColor} />
              {/* Shoe */}
              <ellipse cx="48" cy="180" rx="8" ry="5" fill="#5a3a2a" />
            </g>
            <g ref={rightLegRef} style={{ transformOrigin: '72px 140px' }}>
              <rect x="68" y="138" width="8" height="40" rx="4" fill={limbColor} />
              <ellipse cx="72" cy="180" rx="8" ry="5" fill="#5a3a2a" />
            </g>
          </>
        ) : (
          /* Ghost tail/wispy bottom */
          <path
            d="M 38 130 Q 40 160 48 170 Q 55 155 60 170 Q 65 155 72 170 Q 80 160 82 130"
            fill={bodyColor}
            opacity="0.6"
          />
        )}

        {/* ── Shadow on ground ── */}
        <ellipse cx="60" cy="188" rx={isGhost ? 14 : 20} ry="5" fill="rgba(0,0,0,0.15)" />

        {/* ── Body ── */}
        <g ref={bodyRef}>
          {isGhost ? (
            <path
              d="M 38 65 Q 38 50 60 48 Q 82 50 82 65 L 82 130 Q 70 120 60 130 Q 50 120 38 130 Z"
              fill={bodyColor}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
            />
          ) : (
            <>
              {/* Shirt body */}
              <path
                d="M 42 82 Q 42 72 60 70 Q 78 72 78 82 L 78 140 Q 60 136 42 140 Z"
                fill={who === 'alex' ? '#4a9e6e' : '#4a9e6e'}
              />
              {/* Collar */}
              <path
                d="M 52 74 L 60 80 L 68 74"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}
        </g>

        {/* ── Arms ── */}
        {!isGhost && (
          <>
            <g ref={leftArmRef} style={{ transformOrigin: '42px 88px' }}>
              <rect x="28" y="85" width="8" height="36" rx="4" fill={limbColor} />
              <circle cx="32" cy="123" r="5" fill={headColor} /> {/* Hand */}
            </g>
            <g ref={rightArmRef} style={{ transformOrigin: '78px 88px' }}>
              <rect x="84" y="85" width="8" height="36" rx="4" fill={limbColor} />
              <circle cx="88" cy="123" r="5" fill={headColor} />
            </g>
          </>
        )}

        {/* ── Head ── */}
        <g ref={headRef} style={{ transformOrigin: '60px 42px' }}>
          <circle cx="60" cy="42" r="28" fill={headColor} />
          {isGhost && (
            <circle cx="60" cy="42" r="28" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          )}

          {/* Eyes — large and expressive */}
          <g>
            <ellipse cx="50" cy="38" rx="5" ry="6" fill="#fff" />
            <circle cx="51" cy="39" r="3" fill={eyeColor} />
            {!isGhost && <circle cx="52" cy="37.5" r="1.2" fill="#fff" />}

            <ellipse cx="70" cy="38" rx="5" ry="6" fill="#fff" />
            <circle cx="71" cy="39" r="3" fill={eyeColor} />
            {!isGhost && <circle cx="72" cy="37.5" r="1.2" fill="#fff" />}
          </g>

          {/* Eyebrows */}
          <path
            d={isSpeaking ? "M 44 30 Q 50 27 56 30" : "M 44 31 Q 50 29 56 31"}
            stroke={isGhost ? '#8ab' : '#5a4a3a'}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={isSpeaking ? "M 64 30 Q 70 27 76 30" : "M 64 31 Q 70 29 76 31"}
            stroke={isGhost ? '#8ab' : '#5a4a3a'}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Mouth */}
          <g ref={mouthRef} style={{ transformOrigin: '60px 52px' }}>
            {isSpeaking ? (
              <ellipse cx="60" cy="52" rx="5" ry="4" fill={isGhost ? '#8ab' : '#c96a52'} />
            ) : (
              <path
                d="M 53 51 Q 60 56 67 51"
                stroke={isGhost ? '#8ab' : '#c96a52'}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* Hair (Alex only) */}
          {!isGhost && (
            <g>
              <path d="M 35 28 Q 45 12 60 14 Q 75 12 85 28" stroke="#5a4a3a" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 38 24 Q 50 16 62 18" stroke="#5a4a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* Ghost halo / glow */}
          {isGhost && (
            <circle cx="60" cy="42" r="32" fill="none" stroke="rgba(180, 220, 255, 0.2)" strokeWidth="4" />
          )}
        </g>

        {/* Ghost particle effects */}
        {isGhost && (
          <g className="ghost-particles" opacity="0.4">
            <circle cx="42" cy="90" r="2" fill="#c8dff0">
              <animate attributeName="cy" values="90;70;50" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="78" cy="100" r="1.5" fill="#c8dff0">
              <animate attributeName="cy" values="100;75;50" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="opacity" values="0.3;0.1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="55" cy="110" r="2" fill="#c8dff0">
              <animate attributeName="cy" values="110;85;60" dur="3.5s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.35;0.1;0" dur="3.5s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>
        )}
      </svg>

      <span className="name">{name}</span>
    </div>
  );
}
