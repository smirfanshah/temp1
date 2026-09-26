import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Circle,
  Clock3,
  Copy,
  Heart,
  MapPin,
  Mail,
  Navigation,
  Shirt,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function FloralCorners() {
  return (
    <>
      <svg className="floral-corner tl" viewBox="0 0 150 180" aria-hidden="true">
        <path className="floral-stem" d="M8 165C22 111 62 69 120 42M25 128C18 98 23 69 42 40M54 91c24-17 39-41 44-71" />
        <path className="floral-stem" d="M54 91c-10-20-27-28-43-30M71 70c13 3 25 0 36-10M26 124c-12-7-19-17-22-30" />
        <path className="floral-fill" d="M42 40c-8-13-4-26 9-32 6 12 3 24-9 32ZM100 20c-3-14 4-24 18-27 1 13-5 23-18 27ZM110 60c10-14 22-15 34-6-8 10-20 13-34 6ZM11 94C-2 86-5 74 3 63c12 6 15 17 8 31ZM72 73c-2-12 6-21 19-23 0 12-7 20-19 23Z" />
        <circle className="floral-fill" cx="121" cy="41" r="7" />
      </svg>
      <svg className="floral-corner br" viewBox="0 0 150 180" aria-hidden="true">
        <path className="floral-stem" d="M8 165C22 111 62 69 120 42M25 128C18 98 23 69 42 40M54 91c24-17 39-41 44-71" />
        <path className="floral-stem" d="M54 91c-10-20-27-28-43-30M71 70c13 3 25 0 36-10M26 124c-12-7-19-17-22-30" />
        <path className="floral-fill" d="M42 40c-8-13-4-26 9-32 6 12 3 24-9 32ZM100 20c-3-14 4-24 18-27 1 13-5 23-18 27ZM110 60c10-14 22-15 34-6-8 10-20 13-34 6ZM11 94C-2 86-5 74 3 63c12 6 15 17 8 31ZM72 73c-2-12 6-21 19-23 0 12-7 20-19 23Z" />
        <circle className="floral-fill" cx="121" cy="41" r="7" />
      </svg>
    </>
  );
}

function EnvelopeCover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.main
      className="envelope-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: .7 }}
      data-testid="screen-envelope"
    >
      <div className="cover-content">
        <div className="cover-kicker">A keepsake for our favourite people</div>
        <h1 className="cover-title">Syed Muneeb<br /><span className="ampersand">&amp;</span><br />Syeda Emaan</h1>
        <p className="cover-subtitle">A little paper moment, made for a very big day.</p>
        <div className="envelope" aria-label="Wedding invitation envelope">
          <div className="envelope-paper" />
          <div className="envelope-pocket" />
          <div className="envelope-flap" />
          <div className="ribbon" />
          <button className="seal" type="button" onClick={onOpen} data-testid="button-open-invitation" aria-label="Open Syed Muneeb and Syeda Emaan's invitation">
            <span className="seal-mark">M <span className="ampersand">&amp;</span> L</span>
          </button>
        </div>
        <span className="seal-hint">Press the seal to open</span>
        <div className="cover-footer">Lahore · Friday, 09 October 2026</div>
      </div>
    </motion.main>
  );
}

function Countdown() {
  const target = useMemo(() => new Date('2026-05-23T17:00:00+05:00').getTime(), []);
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));


  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (!remaining) return <div className="countdown-value">Today is the day</div>;
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  return <div className="countdown-value">{days}d&nbsp; {hours}h&nbsp; {minutes}m&nbsp; {seconds}s</div>;
}

function InvitationSlide() {
  return (
    <motion.article className="slide-card" data-testid="card-invitation" initial={{ opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <FloralCorners />
      <div className="slide-inner centered">
        <div className="eyebrow">In the name of Allah</div>
        <div className="script-line">Together with their families</div>
        <p className="slide-copy" style={{ maxWidth: 310, marginTop: '1.25rem' }}>
          Request the honour of your presence at the wedding of
        </p>
        <h2 className="slide-title">Syed Muneeb<br /><span className="ampersand">&amp;</span> Syeda Emaan</h2>
        <Heart className="hero-heart" size={17} strokeWidth={1.3} fill="currentColor" />
        <div className="hero-date">Friday · 09 October · 2026</div>
        <div className="hero-venue">Kahna · Lahore</div>
      </div>
    </motion.article>
  );
}

function CalendarSlide() {
  const year = 2026;
  const month = 9; // October (0 = January, 9 = October)

  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 4 = Thu
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <motion.article className="slide-card" data-testid="card-calendar" initial={{ opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <FloralCorners />

      <div className="slide-inner">
        <div className="calendar-layout">
          <div>
            <div className="eyebrow">Save this little date</div>

            <div className="calendar-heading">
              <div className="month-name">October</div>
              <div className="month-year">
                Twenty<br />twenty-six
              </div>
            </div>

            <div className="calendar-grid" style={{ marginTop: '1.1rem' }}>
              {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                <div className="weekday" key={day}>
                  {day}
                </div>
              ))}

              {days.map((day, index) => (
                <div
                  className={`day ${
                    day === null ? 'muted' : ''
                  } ${day === 9 ? 'highlight' : ''}`}
                  key={`${day}-${index}`}
                  data-testid={
                    day === 9 ? 'date-highlighted' : undefined
                  }
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

        </div>

        <div
          style={{
            marginTop: 'auto',
            paddingTop: '2rem',
            color: '#9c7078',
            fontFamily: 'var(--app-font-serif)',
            fontSize: '1.02rem',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          Mark your calendar, then bring your whole heart.
        </div>
      </div>
    </motion.article>
  );
}


function ItinerarySlide() {
  const moments = [
    { time: '2 PM', title: 'The ceremony', copy: 'A garden promise, witnessed by the people who made us who we are.' },
  ];
  return (
    <motion.article className="slide-card" data-testid="card-itinerary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .6 }}>
      <FloralCorners />
      <div className="slide-inner">
        <div className="itinerary-head">
          <div>
            <div className="eyebrow">A small map of the day</div>
            <h2 className="slide-title">The<br /><span className="ampersand">&amp;</span> weekend</h2>
          </div>
          <div className="itinerary-note">come for the vows,<br />stay for the stories</div>
        </div>
        <div className="timeline">
          {moments.map((moment, index) => (
            <div className="event-row" key={moment.title} data-testid={`event-${index}`}>
              <div className="event-time">{moment.time}</div>
              <div className="event-body">
                {index === 0 && <span className="day-ribbon">Friday · 09 Oct</span>}
                <div className="event-name">{moment.title}</div>
                <div className="event-detail">{moment.copy}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginTop: 'auto', paddingTop: '1rem', color: '#a06c75', fontSize: '.7rem' }}>
          <Clock3 size={14} strokeWidth={1.5} /> Please arrive 30 minutes before the ceremony
        </div>
      </div>
    </motion.article>
  );
}

function DetailsSlide({ onMap, onCopy, copied }: { onMap: () => void; onCopy: () => void; copied: boolean }) {
  const moments = [
    { time: '2 PM', title: 'The ceremony', copy: 'A garden promise, witnessed by the people who made us who we are.' },
  ];
  return (
    <motion.article className="slide-card" data-testid="card-details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .6 }}>
      <FloralCorners />
      <div className="slide-inner">
        <div className="details-layout">
          <div>
            <div className="eyebrow">A few useful things</div>
            <h2 className="slide-title">The<br /><span className="ampersand">&amp;</span> details</h2>
          </div>
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-card-header"><MapPin size={17} strokeWidth={1.5} /><span className="detail-label">The venue</span></div>
              <div className="address-row">
                <div>
                  <div className="detail-value">Bismillah marquee</div>
                  <div className="detail-copy">Location will be updated soon</div>
                </div>
                <button className="copy-button" type="button" onClick={onCopy} data-testid="button-copy-address">
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="details-actions">
            <button className="map-button" type="button" onClick={onMap} data-testid="button-open-map" disabled aria-disabled="true"><Navigation size={14} /> Location (will be updated)</button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div className="eyebrow">Itinerary</div>
            <div className="timeline">
              {moments.map((moment, index) => (
                <div className="event-row" key={moment.title} data-testid={`event-${index}`}>
                  <div className="event-time">{moment.time}</div>
                  <div className="event-body">
                    {index === 0 && <span className="day-ribbon">Friday · 09 Oct</span>}
                    <div className="event-name">{moment.title}</div>
                    <div className="event-detail">{moment.copy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function InvitationDeck() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.play().catch(() => setSoundOn(false));
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundOn) {
      audio.pause();
      setSoundOn(false);
      return;
    }

    try {
      await audio.play();
      setSoundOn(true);
    } catch {
      setSoundOn(false);
    }
  };

  const copyAddress = async () => {
    const text = 'Location will be updated';
    try {
      await navigator.clipboard?.writeText(text);
    } catch (e) {
      // ignore clipboard errors
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const openMap = () => {
    // no-op since location will be updated
    console.info('Map link not available yet');
  };
  return (
    <main className="deck-shell" data-testid="screen-deck">
      <audio ref={audioRef} src="/audio.mpeg" autoPlay loop preload="auto" />
      <header className="deck-header">
        <div className="brand-lockup">M <span className="ampersand">&amp;</span> E<small>Our wedding, in little moments</small></div>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleSound} data-testid="button-toggle-sound" aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}>{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
        </div>
      </header>
      <section className="deck-main">
        <div className="deck-stage" data-testid="deck-stage">
          {/* curtains that open on mount */}
          <motion.div className="curtain-top" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: .9, delay: .12, ease: 'easeInOut' }} aria-hidden />
          <motion.div className="curtain-bottom" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: .9, delay: .18, ease: 'easeInOut' }} aria-hidden />

          <InvitationSlide />
          <CalendarSlide />
          <DetailsSlide onMap={openMap} onCopy={copyAddress} copied={copied} />
        </div>
      </section>
    </main>
  );
}

function Home() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="invite-app">
      <AnimatePresence mode="wait">
        {!opened ? <EnvelopeCover key="cover" onOpen={() => setOpened(true)} /> : <InvitationDeck key="deck" />}
      </AnimatePresence>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
