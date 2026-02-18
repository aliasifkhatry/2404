'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ─── CUSTOMIZABLE SECTION ───────────────────────────────────────────────────
const CONFIG = {
  password: 'haha',               // Change this!
  birthdayName: 'Twin',               // The person's name
  passwordHint: ' ', // Password hint (optional, or set to '')
  tags: ['you are loved', 'always', 'forever & ever', 'so special', '🌸'],
  candles: [
    { color: '#D4A5A5', dotColor: '#A87A7A' },
    { color: '#A8B89A', dotColor: '#7A9B6E' },
    { color: '#BBA9C4', dotColor: '#8A79A4' },
    { color: '#C9A84C', dotColor: '#A07A20' },
    { color: '#CC6B5A', dotColor: '#A04535' },
  ],
};
// ────────────────────────────────────────────────────────────────────────────

const HAPPY = ['H','a','p','p','y'];
const BIRTHDAY = ['B','i','r','t','h','d','a','y'];

const letterStyles = [
  { font: 'Special Elite', size: '2.2rem', rot: '-4deg', color: '#D4A5A5', bg: '#FBF5E6', pad: '1px 4px' },
  { font: 'Caveat', size: '2.8rem', rot: '3deg', color: '#3D3033', bg: '#EFE3C8', pad: '0 3px' },
  { font: 'Reenie Beanie', size: '3.4rem', rot: '-2deg', color: '#A8B89A', bg: 'transparent', pad: '0 2px' },
  { font: 'Kalam', size: '2.4rem', rot: '4deg', color: '#BBA9C4', bg: '#FAF0E6', pad: '1px 4px' },
  { font: 'Special Elite', size: '2rem', rot: '-3deg', color: '#CC6B5A', bg: 'transparent', pad: '0 2px' },
  { font: 'Caveat', size: '3rem', rot: '2deg', color: '#C9A84C', bg: '#EFE3C8', pad: '0 3px' },
  { font: 'Kalam', size: '2.6rem', rot: '-1deg', color: '#3D3033', bg: 'transparent', pad: '0' },
  { font: 'Reenie Beanie', size: '3.2rem', rot: '5deg', color: '#D4A5A5', bg: 'transparent', pad: '0 2px' },
];

const stickers = [
  { emoji: '🌿', top: '8%', left: '4%', rot: '-15deg', delay: '0s' },
  { emoji: '✨', top: '12%', right: '6%', rot: '10deg', delay: '0.5s' },
  { emoji: '🌸', top: '22%', left: '2%', rot: '20deg', delay: '1s' },
  { emoji: '🍃', top: '28%', right: '3%', rot: '-8deg', delay: '0.3s' },
  { emoji: '⭐', top: '5%', left: '40%', rot: '12deg', delay: '0.8s' },
  { emoji: '🌷', bottom: '35%', left: '5%', rot: '-20deg', delay: '0.2s' },
  { emoji: '🍀', bottom: '40%', right: '5%', rot: '15deg', delay: '0.6s' },
];

function Confetti({ active }: { active: boolean }) {
  const colors = ['#D4A5A5', '#A8B89A', '#BBA9C4', '#C9A84C', '#CC6B5A', '#E8C4B8'];
  if (!active) return null;
  return (
    <>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${20 + Math.random() * 20}vh`,
            background: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 0.6}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '1px',
          }}
        />
      ))}
    </>
  );
}

function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = () => {
    if (value.toLowerCase().trim() === CONFIG.password.toLowerCase()) {
      setError('');
      setUnlocking(true);
      setTimeout(onUnlock, 800);
    } else {
      setError('incorrect password');
      setValue('');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className={`password-screen${unlocking ? ' unlocking' : ''}`}>
      <div className="pw-label"></div>
      <div className="pw-title"></div>
      <div className="pw-subtitle">enter the password</div>
      <div className="pw-input-wrap">
        <input
          className="pw-input"
          type="password"
          placeholder="...."
          value={value}
          autoFocus
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          autoComplete="off"
        />
      </div>
      {error && <div className="pw-error">{error}</div>}
      {CONFIG.passwordHint && !error && (
        <div className="pw-hint">{CONFIG.passwordHint}</div>
      )}
    </div>
  );
}

function CakeCandles({ blown }: { blown: boolean }) {
  return (
    <div className="candles-row">
      {CONFIG.candles.map((c, i) => (
        <div key={i} className={`candle${blown ? ' blown' : ''}`}>
          <div className="flame-wrap">
            {!blown && (
              <>
                <div className="flame" style={{ animationDelay: `${i * 0.1}s` }} />
                <div className="flame-inner" style={{ animationDelay: `${i * 0.07}s` }} />
              </>
            )}
            {blown && <div className="smoke" style={{ animationDelay: `${i * 0.08}s` }} />}
          </div>
          <div
            className="candle-body"
            style={{
              background: `linear-gradient(to right, ${c.color}cc, ${c.color}, ${c.color}cc)`,
              height: `${20 + (i % 2) * 8}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function BirthdayPage() {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const router = useRouter();

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div className="birthday-page">
      <Confetti active={confetti} />

      {/* Floating stickers */}
      {stickers.map((s, i) => (
        <div
          key={i}
          className="sticker"
          style={{
            top: s.top,
            left: (s as any).left,
            right: (s as any).right,
            bottom: (s as any).bottom,
            '--rot': s.rot,
            animationDelay: s.delay,
          } as React.CSSProperties}
        >
          {s.emoji}
        </div>
      ))}

      {/* Tape strips */}
      <div className="tape" style={{ top: '52px', left: '18px', '--tape-rot': '-12deg' } as React.CSSProperties} />
      <div className="tape" style={{ top: '48px', right: '22px', '--tape-rot': '14deg' } as React.CSSProperties} />

      {/* Ransom-style Happy Birthday heading */}
      <div className="ransom-heading">
        <div className="ransom-word" style={{ gap: '1px' }}>
          {HAPPY.map((l, i) => {
            const s = letterStyles[i % letterStyles.length];
            return (
              <span
                key={i}
                className="ransom-letter"
                style={{
                  fontFamily: `'${s.font}', cursive`,
                  fontSize: s.size,
                  transform: `rotate(${s.rot})`,
                  color: s.color,
                  background: s.bg,
                  padding: s.pad,
                  display: 'inline-block',
                }}
              >
                {l}
              </span>
            );
          })}
        </div>
        <div style={{ width: '100%' }} />
        <div className="ransom-word" style={{ gap: '1px' }}>
          {BIRTHDAY.map((l, i) => {
            const s = letterStyles[(i + 3) % letterStyles.length];
            return (
              <span
                key={i}
                className="ransom-letter"
                style={{
                  fontFamily: `'${s.font}', cursive`,
                  fontSize: s.size,
                  transform: `rotate(${s.rot})`,
                  color: s.color,
                  background: s.bg,
                  padding: s.pad,
                  display: 'inline-block',
                }}
              >
                {l}
              </span>
            );
          })}
        </div>
        <div style={{ width: '100%' }} />
        <div style={{
          fontFamily: "'Reenie Beanie', cursive",
          fontSize: 'clamp(26px, 7vw, 38px)',
          color: 'var(--warm-brown)',
          transform: 'rotate(1.5deg)',
          marginTop: '-8px',
          display: 'block',
          width: '100%',
          textAlign: 'center',
        }}>
          {CONFIG.birthdayName} ♡
        </div>
      </div>

      {/* Cake section */}
      <div className="cake-section">
        <div className="cake-wrapper">
          <CakeCandles blown={blown} />

          {/* Top tier */}
          <div className="cake-top-layer" />

          {/* Mid tier */}
          <div className="cake-mid-layer" />

          {/* Dots row */}
          <div className="cake-dots">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="cake-dot"
                style={{ background: CONFIG.candles[i % CONFIG.candles.length].color }}
              />
            ))}
          </div>

          {/* Base tier */}
          <div className="cake-base-layer" />

          {/* Plate */}
          <div className="cake-plate" />
        </div>

        {/* Blow button section */}
        <div className="blow-section">
          {!blown && <div className="blow-label"></div>}
          {!blown ? (
            <button className="blow-btn" onClick={handleBlow}>
              🌬️ blow the candles
            </button>
          ) : (
            <div style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '20px',
              color: 'var(--sage-dark)',
              textAlign: 'center',
              animation: 'pageReveal 0.6s steps(6, end) both',
              padding: '8px 16px',
            }}>
              ✨ ✨<br />
              <span style={{ fontSize: '14px', fontFamily: "'Kalam', cursive", color: 'var(--warm-brown)', opacity: 0.8 }}>
              
              </span>
            </div>
          )}
        </div>
      </div>


      {/* Read me button */}
      <div className="read-me-section">
        <div className="read-me-label"></div>
        <button
          className="read-me-btn"
          onClick={() => router.push('/letter')}
        >
          read me
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [showing, setShowing] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    setTimeout(() => setShowing(true), 50);
  };

  return (
    <>
      {!unlocked && <PasswordScreen onUnlock={handleUnlock} />}
      {unlocked && showing && <BirthdayPage />}
    </>
  );
}