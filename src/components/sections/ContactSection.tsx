'use client';

import React from 'react';
import { scrollToSection } from '../../app/hooks/useStackScroll';

interface ContactSectionProps {
  className?: string;
}

// TODO: swap in the real email address and working hours
const EMAIL = 'herwindermawan9@gmail.com';

const WORKING_HOURS = 'Mon-Fri / 09:00-17:00 WIB';

// live Jakarta clock: external store so the server render stays empty and there is no hydration mismatch
const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Jakarta',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
const subscribeClock = (notify: () => void) => {
  const id = window.setInterval(notify, 5000);
  return () => window.clearInterval(id);
};
const getClock = () => clockFormat.format(new Date());
const getServerClock = () => '';

// deterministic bar heights (percent) so server and client render the same markup
const WAVE = Array.from({ length: 34 }, (_, i) =>
  Math.round(18 + 78 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.55))),
);

const SOCIALS = [
  { num: '02', name: 'GitHub', handle: '22Herwin', href: 'https://github.com/22Herwin' },
  {
    num: '03',
    name: 'Instagram',
    handle: '@hrwn._.me',
    href: 'https://www.instagram.com/hrwn._.me',
  },
  {
    num: '04',
    name: 'LinkedIn',
    handle: 'herwin-dermawan',
    href: 'https://www.linkedin.com/in/herwin-dermawan-579894368/',
  },
];

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const [copied, setCopied] = React.useState(false);
  const clock = React.useSyncExternalStore(subscribeClock, getClock, getServerClock);
  const resetTimer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked (insecure context / permission): fall back to the mail client
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      className={`ct tx tx-dark select-none ${className}`}
      data-theme="contact"
      data-bg="#0a0908"
    >
      <div className="ct-top">
        <span>04 / Contact</span>
        <span>[ hover / tap a row ]</span>
      </div>

      <div className="ct-head">
        <h2 className="ct-heading" data-reveal="lines">
          Get in touch
        </h2>

        <aside className="ct-note" data-reveal="fade">
          <p>Say hi, pitch an idea, or just send a meme. I read everything.</p>
        </aside>
      </div>

      <div className="ct-body">
        <aside className="ct-meta" data-reveal="fade">
          <p className="ct-label">{'//'} Index</p>
          <dl>
            <div className="ct-meta-item">
              <dt>Status</dt>
              <dd>
                <span className="ct-tag">
                  <span aria-hidden>⚠</span> Currently occupied
                </span>
              </dd>
            </div>
            <div className="ct-meta-item">
              <dt>Working hours</dt>
              <dd>{WORKING_HOURS}</dd>
            </div>
            <div className="ct-meta-item">
              <dt>Preferred</dt>
              <dd className="ct-red">Email / Instagram</dd>
            </div>
            <div className="ct-meta-item">
              <dt>Timezone</dt>
              <dd>UTC+7{clock && <> &middot; {clock} WIB</>}</dd>
            </div>
          </dl>

          <div className="ct-wave" aria-hidden>
            <div className="ct-wave-row">
              <span>Blackbox recording</span>
              <span className="ct-rec">
                <i /> REC
              </span>
            </div>
            <div className="ct-wave-bars">
              {WAVE.map((h, i) => (
                <span key={i} style={{ '--h': `${h}%`, '--i': i } as React.CSSProperties} />
              ))}
            </div>
            <div className="ct-wave-row">
              <span>00:00:00</span>
              <span>FILE: HRWN_2026.WAV</span>
            </div>
          </div>
        </aside>

        <div className="ct-channels" data-reveal="fade">
          <p className="ct-label">[ Direct channels ]</p>
          <ul className="ct-list">
            <li>
              <button
                type="button"
                className="ct-row"
                onClick={copyEmail}
                aria-label={`Copy email address ${EMAIL}`}
              >
                <span className="ct-row-num">01</span>
                <span className="ct-row-name">Email</span>
                <span className="ct-row-handle" aria-live="polite">
                  {copied ? 'Copied ✓' : EMAIL}
                </span>
                <span className="ct-row-arrow" aria-hidden>
                  {copied ? '✓' : '⧉'}
                </span>
              </button>
            </li>

            {SOCIALS.map(({ num, name, handle, href }) => (
              <li key={name}>
                <a className="ct-row" href={href} target="_blank" rel="noopener noreferrer">
                  <span className="ct-row-num">{num}</span>
                  <span className="ct-row-name">{name}</span>
                  <span className="ct-row-handle">{handle}</span>
                  <span className="ct-row-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ct-foot">
        <span>&copy; 2026 Herwin</span>
        <button type="button" className="ct-top-btn" onClick={() => scrollToSection('home')}>
          Back to top <span aria-hidden>↑</span>
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
