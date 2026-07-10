import { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Shield,
  Zap,
  AlertTriangle,
  Clock,
  Target,
  Phone,
  FileText,
  CheckCircle2,
  BarChart3,
  DollarSign,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const formatMoney = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

const formatTime = (s: number) => {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const CAROUSEL_STEPS = [
  {
    Icon: Target,
    title: 'We Run the Ads',
    body: "We build and manage your entire Facebook & Instagram campaign. Every ad, every audience, every dollar of your $25,000 spend — managed by us across your full 16-week pre-launch period.",
  },
  {
    Icon: Phone,
    title: 'We Work the Leads',
    body: "Every lead gets contacted immediately via text, email, and phone call. Multiple touchpoints, persistent follow-up, no lead left sitting. We don't hand off leads — we close them.",
  },
  {
    Icon: Zap,
    title: 'One Team. One Goal.',
    body: "Every person on our team is aligned around one objective — memberships sold. That means our ads are built to convert, our follow-up is built to close, and every part of the process is constantly sharpened. One goal, one team, one outcome: your studio full.",
  },
  {
    Icon: Shield,
    title: '250 Members or Prorated Refund',
    body: "Provide 250 community leads and complete your $25,000 Meta ad spend — if we deliver fewer than 250 members, we refund you dollar-for-dollar for every member short. No fine print. Just accountability.",
  },
];

/* BRAND FONT NOTE: Anton substitutes for licensed Kessel 105 Heavy.
 * Montserrat is an approved STRONG secondary font.
 * Sky blue accent #97CAEA — use sparingly on active states and key markers only.
 * Production: swap Anton/Montserrat for licensed Kessel 105 Heavy/Medium/Book. */
const SKY = '#97CAEA';

type TimelineBlock = {
  id: number;
  label: string;
  weeks: string;
  tierLabel: string;
  markerLabel: string;
  title: string;
  tagline: string;
  studio: string[];
  revryze: string[];
  mechanics: { label: string; text: string }[];
};

const TIMELINE_BLOCKS: TimelineBlock[] = [
  {
    id: 1,
    label: 'BLOCK 1',
    weeks: 'Weeks 1–4',
    tierLabel: 'TIER 1 FOUNDING',
    markerLabel: 'FOUNDING OPENS',
    title: 'Tier 1 Founding',
    tagline: 'Lowest rate, locked for life.',
    studio: [
      'Supply all creative assets to Revryze',
      'Run pop-up events, group workouts, and community outreach',
      'Capture and submit community-driven leads',
    ],
    revryze: [
      'Launch and manage all Meta campaigns',
      'Contact every incoming lead via text, email, and phone',
      'Close on 4-session and unlimited founding offers',
    ],
    mechanics: [
      { label: 'TIER CAP', text: 'Tiers are driven by count, not dates. Tier 1 fills around end of Week 4. When the cap fills, pricing steps to Tier 2.' },
      { label: 'GRACE WEEK', text: 'Anyone booking in Week 5 still gets Tier 1 pricing — a scoop-up window for late movers who just missed the cap.' },
    ],
  },
  {
    id: 2,
    label: 'BLOCK 2',
    weeks: 'Weeks 5–8',
    tierLabel: 'TIER 2 FOUNDING',
    markerLabel: 'TIER STEP',
    title: 'Tier 2 Founding',
    tagline: 'Grace window smooths the pricing step.',
    studio: [
      'Continue pop-up events and B2B partnerships',
      'Keep submitting community-driven leads',
    ],
    revryze: [
      'Honor Tier 1 for all bookings in Week 5 (grace week)',
      'Shift all ad messaging to Tier 2 offers',
      'Work every lead until the Tier 2 cap fills',
    ],
    mechanics: [
      { label: 'TIER CAP', text: 'Tier 2 fills around end of Week 8. When it fills, pricing steps to Tier 3. Block dates reflect where caps typically land — actual timing is driven by sales volume.' },
      { label: 'REFERRAL', text: 'Referral program runs the full campaign: refer a friend, both get $25 credit, roughly two touches per week.' },
    ],
  },
  {
    id: 3,
    label: 'BLOCK 3',
    weeks: 'Weeks 9–12',
    tierLabel: 'TIER 3 FOUNDING',
    markerLabel: 'FINAL FOUNDING TIER',
    title: 'Tier 3 Founding',
    tagline: 'Final founding tier. 8-session scoop-up for fence-sitters.',
    studio: [
      'Activate the founders friends-free perk',
      'Push hard on community lead submissions into the final stretch',
    ],
    revryze: [
      'Honor Tier 2 for all bookings in Week 9 (grace week)',
      'Drop the 8-session offer as a scoop-up for undecided leads',
      "Activate founders friends-free: founding member's friends come free for the first couple weeks once they set up a trial",
    ],
    mechanics: [
      { label: 'SCOOP-UP', text: 'The 8-session offer is a lower-friction entry for fence-sitters. Never call it an "8-pack" — it is a scoop-up, not a package.' },
      { label: 'FRIENDS-FREE', text: "A founding member's friends get free access for the first couple weeks post-open, once the friend sets up a free trial." },
    ],
  },
  {
    id: 4,
    label: 'BLOCK 4',
    weeks: 'Weeks 13–16',
    tierLabel: 'FOUNDING CLOSE + TRIAL LAUNCH',
    markerLabel: 'TRIAL W15 / OPEN W16',
    title: 'Founding Close + Trial Launch',
    tagline: 'Founding pricing closes out. Trials launch two weeks before open.',
    studio: [
      'Final community lead push',
      'Begin pre-open operations and team preparation',
    ],
    revryze: [
      'Weeks 13–14: close all remaining founding memberships',
      'Week 15: launch first trial drop, two weeks before open',
      'Run countdown campaign through opening week',
      'Trial buyers from Block 4 can roll over to Tier 3 founding post-open',
    ],
    mechanics: [
      { label: 'TRIAL FLIP', text: 'Trial drop goes live at Week 15. Any trial buyer from Block 4 can roll into a Tier 3 founding membership after open.' },
      { label: 'DOORS OPEN', text: 'Studio opens at end of Week 16. Founding pricing locks. Any new member after open goes to standard rate.' },
    ],
  },
  {
    id: 5,
    label: 'BLOCK 5',
    weeks: 'Post-Open (4 weeks)',
    tierLabel: 'POST-OPEN CONVERSION',
    markerLabel: 'DOORS OPEN',
    title: 'Post-Open Conversion',
    tagline: 'Convert every trial. Close the founding window for good.',
    studio: [
      'Run the studio and build the community',
      'Post-open group workouts drive new trial bookings',
    ],
    revryze: [
      'Open-studio trial offer runs for 4 weeks',
      'Trial-upgrade scoop-up targets every unconverted trial holder',
      'Founding roll-over honored at Tier 3 for eligible trial buyers',
      'After 4 weeks, rate reverts to standard permanently',
    ],
    mechanics: [
      { label: 'TRIAL UPGRADE', text: 'Every trial buyer and free-trial holder gets a push to upgrade to Tier 3 founding before the window closes.' },
      { label: 'FOUNDING CLOSE', text: 'After the 4 post-open weeks, founding pricing is gone. Anyone who did not convert goes to standard rate.' },
    ],
  },
];

function StepCarousel() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      setVisible(true);
    }, 200);
  };

  const handleNav = (dir: 'prev' | 'next') => {
    const next = dir === 'next'
      ? (step + 1) % CAROUSEL_STEPS.length
      : (step - 1 + CAROUSEL_STEPS.length) % CAROUSEL_STEPS.length;
    goTo(next);
  };

  const { Icon, title, body } = CAROUSEL_STEPS[step];
  const progressPct = ((step + 1) / CAROUSEL_STEPS.length) * 100;

  return (
    <div className="flex flex-col items-center" data-testid="step-carousel">
      {/* Row: arrow + card + arrow */}
      <div className="flex items-center gap-4 w-full max-w-[760px]">
        {/* Left arrow */}
        <button
          onClick={() => handleNav('prev')}
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 group"
          style={{ background: '#171717', border: '1px solid #262626' }}
          data-testid="carousel-prev"
        >
          <ChevronLeft size={18} className="text-[#6b7280] group-hover:text-[#A8CFEA] transition-colors duration-150" />
        </button>

        {/* Card */}
        <div
          className="flex-1 rounded-2xl"
          style={{ background: '#171717', border: '1px solid #262626', minHeight: 280 }}
        >
          <div
            className="flex flex-col p-10 transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
            data-testid="carousel-card-content"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#262626' }}
            >
              <Icon size={32} color="#A8CFEA" />
            </div>
            <h3 className="text-white font-bold mt-5" style={{ fontSize: 28 }} data-testid="carousel-title">
              {title}
            </h3>
            <p className="text-[#9ca3af] mt-3" style={{ fontSize: 16, lineHeight: 1.75 }} data-testid="carousel-body">
              {body}
            </p>
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => handleNav('next')}
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 group"
          style={{ background: '#171717', border: '1px solid #262626' }}
          data-testid="carousel-next"
        >
          <ChevronRight size={18} className="text-[#6b7280] group-hover:text-[#A8CFEA] transition-colors duration-150" />
        </button>
      </div>

      {/* Dots + static progress bar */}
      <div className="flex flex-col items-center gap-3 mt-6 w-full max-w-[680px]">
        <div className="flex items-center gap-3">
          {CAROUSEL_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-2 h-2 rounded-full transition-all duration-150 cursor-pointer"
              style={{ background: i === step ? '#A8CFEA' : '#262626' }}
              data-testid={`carousel-dot-${i}`}
            />
          ))}
        </div>
        <div className="w-full h-[2px] rounded-full" style={{ background: '#262626' }}>
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{ width: `${progressPct}%`, background: '#A8CFEA' }}
          />
        </div>
      </div>
    </div>
  );
}

// Inline audio player card
function AudioCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!expanded && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [expanded]);

  const toggle = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) setCurrent(audioRef.current.currentTime);
  };
  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };
  const onEnded = () => setPlaying(false);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    if (audioRef.current) {
      audioRef.current.currentTime = ratio * duration;
    }
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className="group cursor-pointer"
      onClick={toggle}
      data-testid="card-audio-call"
    >
      <Card className={`h-full bg-[#171717] border-[#262626] transition-all ${expanded ? 'border-[#A8CFEA]/40' : 'group-hover:bg-neutral-800 hover:-translate-y-1 group-hover:border-[#A8CFEA]/30'}`}>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform ${expanded ? 'bg-[#A8CFEA]/20 text-[#A8CFEA]' : 'bg-neutral-800 text-[#A8CFEA] group-hover:scale-110'}`}>
            <Phone size={32} />
          </div>
          <h4 className="text-xl font-bold mb-2 text-white" data-testid="text-audio-title">Live Sales Call</h4>
          <p className="text-gray-400 text-sm mb-4" data-testid="text-audio-desc">Hear real-time lead conversion.</p>

          {expanded && (
            <div
              className="w-full bg-[#0a0a0a] rounded-xl p-4 mt-2 border border-[#262626]"
              onClick={(e) => e.stopPropagation()}
            >
              <audio
                ref={audioRef}
                src="/swet-call-to-share.wav"
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={onEnded}
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-[#A8CFEA] text-black flex items-center justify-center shrink-0 hover:opacity-90 transition"
                  data-testid="button-audio-play"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <div className="flex-1">
                  <div
                    className="w-full h-2 bg-neutral-800 rounded-full cursor-pointer relative"
                    onClick={seek}
                    data-testid="audio-scrubber"
                  >
                    <div
                      className="h-2 rounded-full bg-[#A8CFEA] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(current)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignTimeline() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  const select = (i: number) => {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 150);
  };

  const block = TIMELINE_BLOCKS[active];

  return (
    <div data-testid="campaign-timeline">
      {/* Block navigation tabs */}
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex min-w-[540px] border border-[#262626] rounded-xl overflow-hidden">
          {TIMELINE_BLOCKS.map((b, i) => {
            const isActive = i === active;
            return (
              <button
                key={b.id}
                onClick={() => select(i)}
                className="relative flex-1 flex flex-col items-start px-3 md:px-5 py-4 transition-colors duration-150 border-r last:border-r-0 border-[#262626]"
                style={{ background: isActive ? '#0f0f0f' : 'transparent' }}
                data-testid={`timeline-tab-${b.id}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-150"
                  style={{ background: isActive ? SKY : 'transparent' }}
                />
                <span
                  className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: isActive ? SKY : '#4b5563' }}
                >
                  {b.label}
                </span>
                <span
                  className="text-xs font-semibold leading-tight"
                  style={{ color: isActive ? '#ffffff' : '#6b7280' }}
                >
                  {b.weeks}
                </span>
                <span
                  className="mt-2 text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border leading-tight"
                  style={{
                    borderColor: isActive ? `${SKY}44` : '#262626',
                    color: isActive ? `${SKY}bb` : '#374151',
                    background: isActive ? `${SKY}0d` : 'transparent',
                  }}
                >
                  {b.markerLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div
        className="mt-6 transition-opacity duration-150"
        style={{ opacity: visible ? 1 : 0 }}
        data-testid="timeline-detail"
      >
        {/* Heading */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: SKY }}>
            {block.tierLabel}
          </p>
          <h3
            className="text-white font-display text-2xl md:text-3xl uppercase tracking-wide leading-none mb-2"
            data-testid="timeline-block-title"
          >
            {block.title}
          </h3>
          <p className="text-gray-500 text-sm">{block.tagline}</p>
        </div>

        {/* Two-lane split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-5 rounded-xl border" style={{ background: '#0f0f0f', borderColor: '#262626' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">STUDIO</p>
            <ul className="space-y-2.5">
              {block.studio.map((line, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300 leading-snug" data-testid={`studio-line-${idx}`}>
                  <span className="text-gray-700 shrink-0 mt-0.5">—</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl border" style={{ background: '#0f0f0f', borderColor: `${SKY}30` }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: SKY }}>REVRYZE</p>
            <ul className="space-y-2.5">
              {block.revryze.map((line, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300 leading-snug" data-testid={`revryze-line-${idx}`}>
                  <span className="shrink-0 mt-0.5" style={{ color: `${SKY}60` }}>—</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mechanics callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {block.mechanics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-lg border" style={{ borderColor: '#1c1c1c' }} data-testid={`mechanic-${idx}`}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-700 mb-1.5">{m.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FranchiseePage() {
  const [studios, setStudios] = useState(1);
  const [members, setMembers] = useState(250);
  const [monthlyValue, setMonthlyValue] = useState(150);
  const [lifetimeMonths, setLifetimeMonths] = useState(14);

  const MEMBER_GUARANTEE = 250;
  const REVRYZE_FEE = 40000;
  const META_SPEND = 25000;
  const COST_PER_MEMBER = REVRYZE_FEE / MEMBER_GUARANTEE; // 160

  const refund = members < MEMBER_GUARANTEE ? (MEMBER_GUARANTEE - members) * COST_PER_MEMBER : 0;
  const netRevryze = REVRYZE_FEE - refund;
  const totalPerStudio = netRevryze + META_SPEND;
  const totalAllStudios = totalPerStudio * studios;

  const monthlyRevenue = members * monthlyValue;
  const lifetimeRevenue = monthlyRevenue * lifetimeMonths;
  const lifetimeAllStudios = lifetimeRevenue * studios;

  const breakEven = monthlyRevenue > 0 ? totalPerStudio / monthlyRevenue : 0;
  const roi = totalPerStudio > 0 ? lifetimeRevenue / totalPerStudio : 0;

  return (
    <div className="min-h-screen pb-24 bg-[#0a0a0a] text-white font-sans selection:bg-[#A8CFEA] selection:text-black">

      {/* ── SECTION 1: HERO ── */}
      <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto" data-testid="section-hero">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#262626] bg-[#171717] text-sm font-semibold mb-8" data-testid="badge-brand">
            <span className="text-[#A8CFEA] tracking-wide">STRONG PILATES x REVRYZE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display uppercase mb-6 tracking-wide leading-[0.9]" data-testid="text-hero-title">
            250 MEMBERS.<br />
            <span className="text-[#A8CFEA]">OR YOU GET REFUNDED.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed" data-testid="text-hero-subtitle">
            Dedicated US-based sales team. Guaranteed member acquisition. Prorated refund if we miss.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Problem card */}
          <Card className="relative bg-[#171717] border-[#262626] group hover:border-red-500/30" data-testid="card-problem">
            <div className="absolute top-4 right-4 opacity-20">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
            <CardContent className="p-6">
              <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4" data-testid="text-problem-label">THE PROBLEM</h3>
              <p className="text-2xl font-bold mb-6" data-testid="text-problem-headline">Slow Ramp. Missed Revenue.</p>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3" data-testid="text-problem-item-0">
                  <Clock size={16} className="text-red-500 shrink-0 mt-0.5" />
                  You're busy with build-out, hiring, and operations.
                </li>
                <li className="flex gap-3" data-testid="text-problem-item-1">
                  <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  Every empty slot is lost monthly revenue — forever.
                </li>
                <li className="flex gap-3" data-testid="text-problem-item-2">
                  <Target size={16} className="text-red-500 shrink-0 mt-0.5" />
                  Without a dedicated sales team, momentum stalls fast.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Solution card */}
          <Card className="relative bg-[#171717]/50 border-[#A8CFEA]/30 group" data-testid="card-solution">
            <div className="absolute top-4 right-4 opacity-20">
              <Zap className="text-[#A8CFEA]" size={40} />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#A8CFEA] font-bold uppercase tracking-widest text-xs mb-4" data-testid="text-solution-label">THE SOLUTION</h3>
              <p className="text-2xl font-bold mb-6" data-testid="text-solution-headline">Full. Fast. Profitable.</p>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3" data-testid="text-solution-item-0">
                  <Zap size={16} className="text-[#00E87C] shrink-0 mt-0.5" />
                  Dedicated US-based sales team fills your studio before you open.
                </li>
                <li className="flex gap-3" data-testid="text-solution-item-1">
                  <CheckCircle2 size={16} className="text-[#00E87C] shrink-0 mt-0.5" />
                  250-member guarantee. Prorated refund if we fall short.
                </li>
                <li className="flex gap-3" data-testid="text-solution-item-2">
                  <ShieldCheck size={16} className="text-[#00E87C] shrink-0 mt-0.5" />
                  You focus on running the studio. We fill it.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── SECTION 2: HOW REVRYZE WORKS ── */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-t border-[#262626]" data-testid="section-how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide mb-4" data-testid="text-how-title">How Revryze Works.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-how-subtitle">One team. One feedback loop. No excuses.</p>
          </div>

          <StepCarousel />
        </div>
      </section>

      {/* ── SECTION 3: CAMPAIGN TIMELINE ── */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-t border-[#262626]" data-testid="section-campaign-timeline">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide mb-4" data-testid="text-timeline-title">
              THE 20-WEEK PLAN.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-timeline-subtitle">
              Four founding tiers, a trial window, and a post-open conversion push. Here is exactly what happens across every week of your pre-launch.
            </p>
          </div>
          <CampaignTimeline />
        </div>
      </section>

      {/* ── SECTION 4: PRICING ── */}
      <section className="py-20 px-6 border-t border-[#262626]" data-testid="section-pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide mb-4" data-testid="text-pricing-title">250 Members. Guaranteed.</h2>
            <p className="text-gray-400 text-lg" data-testid="text-pricing-subtitle">One fee. One team. One number to hit.</p>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-6 items-stretch">

            {/* LEFT: info boxes (mobile: second) */}
            <div className="flex flex-col gap-4 md:w-[45%] order-2 md:order-1">

              {/* Refund explainer */}
              <div className="p-4 rounded-2xl bg-[#171717] border border-[#A8CFEA]/25 flex-1" data-testid="card-refund-explainer">
                <h4 className="text-[#A8CFEA] font-bold uppercase tracking-widest text-xs mb-2">HOW THE REFUND WORKS</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  At $40,000 for 250 members, each member = $160. If Revryze delivers 200 of 250 members → refund = 50 × $160 = $8,000. You only pay for what you get.
                </p>
              </div>

              {/* Qualification box */}
              <div className="p-4 rounded-2xl bg-neutral-900/40 border border-[#262626] flex-1" data-testid="card-qualification">
                <h4 className="text-gray-300 font-bold uppercase tracking-widest text-xs mb-2">REFUND QUALIFICATION REQUIREMENTS</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex gap-2">
                    <CheckCircle2 size={15} className="text-[#00E87C] shrink-0 mt-0.5" />
                    Provide 250 community-driven leads to the Revryze sales team
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 size={15} className="text-[#00E87C] shrink-0 mt-0.5" />
                    Complete $25,000 in Meta ad spend over the 16-week pre-launch period (paid directly to Meta, managed by Revryze)
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">Both conditions must be met. When they are, any shortfall is fully refunded.</p>
              </div>
            </div>

            {/* RIGHT: pricing card (mobile: first) */}
            <div className="md:w-[55%] order-1 md:order-2">
              <Card className="bg-[#171717] border-[#A8CFEA]/30 h-full" data-testid="card-pricing">
                <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                  <span className="bg-[#A8CFEA]/10 text-[#A8CFEA] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest" data-testid="badge-standard">STANDARD</span>
                  <div className="text-6xl font-black mt-6 mb-2" data-testid="text-price">$40,000</div>
                  <p className="text-gray-500 text-sm font-semibold mb-8" data-testid="text-price-desc">Per Studio (You Pay Once)</p>
                  <div className="space-y-3 text-sm text-gray-300 text-left max-w-sm mx-auto">
                    {[
                      '250-member guarantee',
                      'Full Meta ad management included',
                      'Lead nurture via text, email, and phone',
                      'Prorated refund protection',
                      'Dedicated US-based sales team',
                      '16-week pre-launch campaign',
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-2" data-testid={`text-feature-${i}`}>
                        <CheckCircle2 size={16} className="text-[#00E87C] shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Note below full layout */}
          <p className="text-xs text-gray-600 text-center mt-6" data-testid="text-meta-note">
            The $25,000 Meta ad spend is paid directly to the ad platform — separate from the Revryze service fee and required to activate the guarantee.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: CALCULATOR ── */}
      <section className="py-20 px-6 bg-neutral-950 border-t border-[#262626]" data-testid="section-calculator">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide mb-4" data-testid="text-calc-title">See Your Numbers.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-calc-subtitle">Adjust the sliders. See your investment, your revenue, and your path to break-even.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* LEFT: Sliders */}
            <div className="flex flex-col gap-5">

              {/* Slider 1: Studio Openings */}
              <Card className="bg-[#171717] border-[#262626] border-l-4 border-l-[#A8CFEA]" data-testid="card-slider-studios">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Users size={14} className="text-[#A8CFEA]" />
                      YOUR STUDIO OPENINGS
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-studios-value">{studios}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={studios}
                    onChange={(e) => setStudios(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#A8CFEA]"
                    data-testid="slider-studios"
                  />
                  <p className="text-xs text-gray-600 mt-2">Each studio uses the same economics.</p>
                </CardContent>
              </Card>

              {/* Slider 2: Members Delivered */}
              <Card className="bg-[#171717] border-[#262626]" data-testid="card-slider-members">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      MEMBERS DELIVERED
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-members-value">{members}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="5"
                    value={members}
                    onChange={(e) => setMembers(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#A8CFEA]"
                    data-testid="slider-members"
                  />
                  {members === 250 && (
                    <p className="text-xs text-gray-500 mt-2" data-testid="text-members-helper-at">At guarantee — no refund needed.</p>
                  )}
                  {members < 250 && (
                    <p className="text-xs text-[#A8CFEA] mt-2 font-semibold" data-testid="text-members-helper-below">
                      Refund = {250 - members} × $160 = {formatMoney(refund)}
                    </p>
                  )}
                  {members > 250 && (
                    <p className="text-xs text-[#00E87C] mt-2 font-semibold" data-testid="text-members-helper-above">
                      Above guarantee — {members - 250} bonus members!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Slider 3: Monthly Value */}
              <Card className="bg-[#171717] border-[#262626]" data-testid="card-slider-monthly">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <DollarSign size={14} className="text-gray-400" />
                      AVG MONTHLY MEMBERSHIP VALUE
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-monthly-value">${monthlyValue}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="5"
                    value={monthlyValue}
                    onChange={(e) => setMonthlyValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#A8CFEA]"
                    data-testid="slider-monthly"
                  />
                  <p className="text-xs text-gray-600 mt-2">Monthly revenue per active member</p>
                </CardContent>
              </Card>

              {/* Slider 4: Lifetime */}
              <Card className="bg-[#171717] border-[#262626]" data-testid="card-slider-lifetime">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">AVG MEMBER LIFETIME</label>
                    <span className="text-2xl font-black text-white" data-testid="text-lifetime-value">
                      {lifetimeMonths} <span className="text-sm font-normal text-gray-600">mo</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="36"
                    step="1"
                    value={lifetimeMonths}
                    onChange={(e) => setLifetimeMonths(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#A8CFEA]"
                    data-testid="slider-lifetime"
                  />
                  <p className="text-xs text-gray-600 mt-2">Average months a member stays active</p>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: Output cards */}
            <div className="flex flex-col gap-4 h-full">

              {/* Card 1: YOUR REVENUE — hero (includes ROI Multiple) */}
              <Card className="flex-1 bg-[#171717] border-[#262626] border-l-4 border-l-[#A8CFEA]" data-testid="card-revenue">
                <CardContent className="p-8">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6">YOUR REVENUE</h3>

                  {/* Two hero numbers side by side */}
                  <div className="flex items-start gap-0">
                    {/* Left: Lifetime Revenue */}
                    <div className="flex-1">
                      <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px] mb-2">LIFETIME REVENUE</p>
                      <div className="text-4xl font-bold text-white leading-none" data-testid="text-lifetime-revenue">
                        {formatMoney(lifetimeRevenue)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">over member lifetime</p>
                    </div>

                    {/* Vertical divider */}
                    <div className="w-px bg-[#262626] self-stretch mx-6" />

                    {/* Right: ROI Multiple */}
                    <div className="flex-1">
                      <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px] mb-2">ROI MULTIPLE</p>
                      <div className="text-4xl font-bold text-[#A8CFEA] leading-none" data-testid="text-roi">
                        {roi.toFixed(1)}x
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">return on investment</p>
                    </div>
                  </div>

                  {/* Detail rows */}
                  <div className="border-t border-[#262626] mt-6 pt-5 space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Members</span>
                      <span data-testid="text-revenue-members">{members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Revenue</span>
                      <span data-testid="text-monthly-revenue">{formatMoney(monthlyRevenue)}/month</span>
                    </div>
                  </div>

                  {studios > 1 && (
                    <div className="mt-4 pt-4 border-t border-[#262626] flex justify-between text-[#A8CFEA] font-semibold text-sm" data-testid="text-all-studios-revenue">
                      <span>× {studios} studios</span>
                      <span>= {formatMoney(lifetimeAllStudios)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Card 2: YOUR INVESTMENT */}
              <Card className="bg-[#171717] border-[#262626]" data-testid="card-investment">
                <CardContent className="p-6">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-5">YOUR INVESTMENT</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Revryze Fee (gross)</span>
                      <span>{formatMoney(REVRYZE_FEE)}</span>
                    </div>
                    {members < 250 && (
                      <div className="flex justify-between text-[#00E87C] font-semibold" data-testid="text-refund-line">
                        <span>Prorated Refund</span>
                        <span>-{formatMoney(refund)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-400">
                      <span>Net Paid to Revryze</span>
                      <span data-testid="text-net-revryze">{formatMoney(netRevryze)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>
                        Meta Ad Spend
                        <span className="block text-xs text-gray-600">Paid directly to Meta. Not on Revryze invoice.</span>
                      </span>
                      <span>{formatMoney(META_SPEND)}</span>
                    </div>
                    <div className="border-t border-[#262626] my-2" />
                    <div className="flex justify-between text-white font-bold text-base">
                      <span>TOTAL INVESTMENT</span>
                      <span data-testid="text-total-investment">{formatMoney(totalPerStudio)}</span>
                    </div>
                    <p className="text-xs text-gray-600">Your total all-in cost per studio</p>
                    {studios > 1 && (
                      <div className="mt-3 pt-3 border-t border-[#262626] flex justify-between text-[#A8CFEA] font-semibold" data-testid="text-all-studios-investment">
                        <span>× {studios} studios</span>
                        <span>= {formatMoney(totalAllStudios)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: REAL RESULTS ── */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-t border-[#262626]" data-testid="section-proof">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide mb-4" data-testid="text-proof-title">Real Results. Real Calls.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-proof-subtitle">Listen to live sales. See the case studies.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Audio */}
            <AudioCard />

            {/* Card 2: Franchise Growth Study */}
            <a href="/Case-Study-Building-Predictable-Franchise-Growth-copy.pdf" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-franchise-study">
              <Card className="h-full bg-[#171717] border-[#262626] group-hover:bg-neutral-800 transition-all hover:-translate-y-1 group-hover:border-[#A8CFEA]/30">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-[#A8CFEA] group-hover:scale-110 transition-transform">
                    <FileText size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white" data-testid="text-study-title">Franchise Growth Study</h4>
                  <p className="text-gray-400 text-sm" data-testid="text-study-desc">Predictable multi-location growth.</p>
                </CardContent>
              </Card>
            </a>

            {/* Card 3: Studio Relaunch */}
            <a href="/attached_assets/Swet-Studio-Recovery-Relaunch-2025.pdf" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-relaunch-study">
              <Card className="h-full bg-[#171717] border-[#262626] group-hover:bg-neutral-800 transition-all hover:-translate-y-1 group-hover:border-[#A8CFEA]/30">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-[#A8CFEA] group-hover:scale-110 transition-transform">
                    <BarChart3 size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white" data-testid="text-relaunch-title">Studio Relaunch</h4>
                  <p className="text-gray-400 text-sm" data-testid="text-relaunch-desc">From 40 to 170+ members in 60 days.</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: NEXT STEPS ── */}
      <section className="py-20 px-6 border-t border-[#262626]" data-testid="section-next-steps">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide mb-4" data-testid="text-steps-title">Let's Fill Your Studio.</h2>
            <p className="text-gray-400 text-lg" data-testid="text-steps-subtitle">Here's exactly what happens when you move forward.</p>
          </div>

          <div className="space-y-8">
            {[
              {
                n: 1,
                title: 'SIGN WITH REVRYZE',
                body: 'One agreement, one fee, one goal. We get to work the day you sign.',
              },
              {
                n: 2,
                title: 'KICK OFF YOUR 16-WEEK CAMPAIGN',
                body: 'We build your Meta campaigns and launch them 16 weeks out from opening. Your $25,000 ad spend goes straight to Meta — we manage everything from targeting to budget.',
              },
              {
                n: 3,
                title: 'LEADS COME IN. WE WORK THEM.',
                body: 'Every lead gets hit with texts, emails, and calls. We follow up relentlessly until they sign or they tell us no. Nothing sits.',
              },
              {
                n: 4,
                title: 'COMMUNITY LEADS FROM YOU',
                body: 'We need 250 leads from you. Pop-up events, B2B partnerships, local networking — this is your first chance to plant your flag in the community and start building the culture of your studio before the doors even open. It also activates the guarantee.',
              },
              {
                n: 5,
                title: '250 MEMBERS OR YOUR MONEY BACK',
                body: 'Hit both requirements and we\'re fully accountable. If we come up short of 250 members, you get back $160 for every one we missed. No negotiation, no excuses.',
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-6" data-testid={`step-${step.n}`}>
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#A8CFEA]/10 border border-[#A8CFEA]/30 flex items-center justify-center text-[#A8CFEA] font-black text-sm">
                  {step.n}
                </div>
                <div className="pt-1">
                  <h4 className="text-[#A8CFEA] font-bold uppercase tracking-widest text-xs mb-2">{step.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-2xl md:text-3xl font-black text-white text-center mt-20 leading-tight" data-testid="text-closing">
            Set the tone from day one. 250 members waiting when the doors open.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#262626] text-center px-4" data-testid="section-footer">
        <p className="text-gray-600 text-sm font-bold uppercase tracking-widest mb-2">Growth Point Solutions LLC dba Revryze</p>
        <p className="text-gray-700 text-xs">Proprietary and Confidential. STRONG Pilates Franchisee Use Only.</p>
      </footer>
    </div>
  );
}
