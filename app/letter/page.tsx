'use client';

import { useRouter } from 'next/navigation';

// ─── CUSTOMIZABLE LETTER CONTENT ──────────────────────────────────────────
const LETTER = {
  date: 'February 2025',
  salutation: '',
  paragraphs: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

  ],
  closing: '...',
  signature: '...',
};
// ─────────────────────────────────────────────────────────────────────────

function renderPara(text: string) {
  const parts = text.split(/<highlight>(.*?)<\/highlight>/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function LetterPage() {
  const router = useRouter();

  return (
    <div className="letter-page">
      {/* Page top decoration */}
      <div style={{
        width: '100%',
        height: '5px',
        background: 'repeating-linear-gradient(90deg, var(--dusty-rose) 0px, var(--dusty-rose) 12px, var(--sage) 12px, var(--sage) 24px, var(--golden) 24px, var(--golden) 36px, var(--blush) 36px, var(--blush) 48px)',
        opacity: 0.7,
        marginBottom: '24px',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 10,
      }} />

      <div style={{ paddingTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="scroll-reveal" style={{ width: 'min(480px, 94vw)' }}>
          {/* Top roll */}
          <div className="scroll-top-roll">
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: 0.5,
            }}>
              {['✦','·','✦','·','✦'].map((s, i) => (
                <span key={i} style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: '10px',
                  color: '#7A5A30',
                  letterSpacing: '3px',
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Scroll body */}
          <div className="scroll-body">
            <div className="letter-date">{LETTER.date}</div>

            <div className="letter-salutation">{LETTER.salutation}</div>

            {LETTER.paragraphs.map((para, i) => (
              <p key={i} className="letter-para" style={{
                animationDelay: `${0.2 + i * 0.1}s`,
              }}>
                {renderPara(para)}
              </p>
            ))}

            <div className="letter-closing">{LETTER.closing}</div>
            <span className="letter-signature">{LETTER.signature}</span>

            <div className="letter-doodles">
              {['🌸', '✨', '🍃', '🌷', '⭐'].map((d, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  transform: `rotate(${(i - 2) * 8}deg)`,
                  fontSize: '18px',
                }}>{d}</span>
              ))}
            </div>

            {/* Decorative corner folded */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 0 28px 28px',
              borderColor: 'transparent transparent #d4b896 transparent',
              filter: 'drop-shadow(-1px -1px 1px rgba(0,0,0,0.1))',
            }} />

            {/* Red margin line decoration */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0, left: '42px',
              width: '1px',
              background: 'rgba(200,100,100,0.2)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Bottom roll */}
          <div className="scroll-bottom-roll">
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: 0.5,
            }}>
              {['✦','·','✦','·','✦'].map((s, i) => (
                <span key={i} style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: '10px',
                  color: '#7A5A30',
                  letterSpacing: '3px',
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative scattered elements */}
      <div style={{
        position: 'fixed',
        top: '30px',
        left: '12px',
        fontSize: '22px',
        opacity: 0.3,
        transform: 'rotate(-20deg)',
        pointerEvents: 'none',
      }}>🌿</div>
      <div style={{
        position: 'fixed',
        top: '60px',
        right: '10px',
        fontSize: '18px',
        opacity: 0.3,
        transform: 'rotate(15deg)',
        pointerEvents: 'none',
      }}>🌸</div>
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: '8px',
        fontSize: '20px',
        opacity: 0.25,
        transform: 'rotate(-10deg)',
        pointerEvents: 'none',
      }}>✨</div>

      <button
        className="back-btn"
        onClick={() => router.push('/')}
        style={{ marginTop: '28px' }}
      >
        ← go back
      </button>
    </div>
  );
}