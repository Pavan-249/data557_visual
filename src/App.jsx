import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scenes, formatLine } from './data/story';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Characters config ── */
const CHARACTERS = {
  alex: { name: 'Alex 🐼', img: '/characters/panda.png', color: '#4a9e6e', bg: 'rgba(74, 158, 110, 0.12)' },
  sam: { name: 'Sam 🐻‍❄️', img: '/characters/polarbear.png', color: '#7eb8da', bg: 'rgba(126, 184, 218, 0.12)' },
};

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Animate each scene section on scroll ──
      gsap.utils.toArray('.story-scene').forEach((section) => {
        // Background parallax
        const bg = section.querySelector('.scene-bg-img');
        if (bg) {
          gsap.to(bg, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // Scene title entrance
        const title = section.querySelector('.scene-title');
        if (title) {
          gsap.from(title, {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.8,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // Dialogue cards stagger in
        const cards = section.querySelectorAll('.dialogue-card');
        cards.forEach((card, i) => {
          const isAlex = card.dataset.who === 'alex';
          gsap.from(card, {
            opacity: 0,
            x: isAlex ? -60 : 60,
            y: 20,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          });

          // Character image bounce
          const charImg = card.querySelector('.char-img');
          if (charImg) {
            gsap.from(charImg, {
              scale: 0,
              rotation: isAlex ? -15 : 15,
              duration: 0.5,
              delay: 0.15,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            });
          }
        });
      });

      // Hero section entrance
      gsap.from('.hero-title', { opacity: 0, y: -40, duration: 1, ease: 'power3.out', delay: 0.3 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out', delay: 0.6 });
      gsap.from('.hero-characters', { opacity: 0, scale: 0.7, duration: 0.8, ease: 'back.out(1.5)', delay: 0.8 });
      gsap.from('.scroll-hint', { opacity: 0, y: 10, duration: 0.6, delay: 1.2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="app">
      {/* ══════ HERO SECTION ══════ */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">The Salary Story</h1>
          <p className="hero-subtitle">
            Milestone 2 — Faculty data, two friends, and what the numbers say
          </p>
          <div className="hero-characters">
            <img src="/characters/panda.png" alt="Alex the Panda" className="hero-char hero-char--alex" />
            <img src="/characters/polarbear.png" alt="Sam the Polar Bear" className="hero-char hero-char--sam" />
          </div>
          <div className="scroll-hint">
            <span>Scroll down to start the story</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* ══════ STORY SCENES ══════ */}
      {scenes.map((scene, si) => (
        <section key={scene.id} className="story-scene" data-scene={scene.id}>
          {/* Background */}
          <div className="scene-bg">
            <img src={scene.bg} alt="" className="scene-bg-img" />
            <div className="scene-bg-overlay" />
          </div>

          {/* Scene Title */}
          <div className="scene-title">
            <span className="scene-title__num">Scene {si + 1}</span>
            <h2>{scene.title}</h2>
          </div>

          {/* Dialogue Cards */}
          <div className="dialogue-flow">
            {scene.lines.map((line, li) => {
              const char = CHARACTERS[line.who];
              const isAlex = line.who === 'alex';
              return (
                <div
                  key={`${scene.id}-${li}`}
                  className={`dialogue-card ${isAlex ? 'dialogue-card--left' : 'dialogue-card--right'}`}
                  data-who={line.who}
                >
                  <div className="dialogue-card__avatar">
                    <img src={char.img} alt={char.name} className="char-img" />
                  </div>
                  <div className="dialogue-card__bubble" style={{ borderColor: char.color, background: char.bg }}>
                    <div className="dialogue-card__name" style={{ color: char.color }}>
                      {char.name}
                    </div>
                    <div
                      className="dialogue-card__text"
                      dangerouslySetInnerHTML={{ __html: formatLine(line.text) }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ══════ ENDING ══════ */}
      <section className="ending">
        <div className="ending-content">
          <div className="ending-characters">
            <img src="/characters/panda.png" alt="Alex" className="ending-char ending-char--alex" />
            <img src="/characters/polarbear.png" alt="Sam" className="ending-char ending-char--sam" />
          </div>
          <h2>The End</h2>
          <p>Thanks for scrolling through our data story!</p>
          <p className="ending-note">Data 557 — Final Project, Milestone 2</p>
        </div>
      </section>
    </div>
  );
}
