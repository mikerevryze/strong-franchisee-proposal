import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
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
    body: "Our entire team is compensated on membership sales — not leads, not calls. Marketing and sales are one feedback loop. Bad leads get fixed overnight. Weak scripts get rewritten the same day. No finger-pointing. Only results.",
  },
  {
    Icon: Shield,
    title: '250 Members or Prorated Refund',
    body: "Provide 250 community leads and complete your $25,000 Meta ad spend — if we deliver fewer than 250 members, we refund you dollar-for-dollar for every member short. No fine print. Just accountability.",
  },
];

const STEP_DURATION = 4000;

function StepCarousel() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      setVisible(true);
      setProgressKey((k) => k + 1);
    }, 200);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % CAROUSEL_STEPS.length;
        setVisible(false);
        setTimeout(() => {
          setStep(next);
          setVisible(true);
          setProgressKey((k) => k + 1);
        }, 200);
        return s;
      });
    }, STEP_DURATION);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleNav = (dir: 'prev' | 'next') => {
    const next = dir === 'next'
      ? (step + 1) % CAROUSEL_STEPS.length
      : (step - 1 + CAROUSEL_STEPS.length) % CAROUSEL_STEPS.length;
    goTo(next);
    resetTimer();
  };

  const handleDot = (i: number) => {
    goTo(i);
    resetTimer();
  };

  const { Icon, title, body } = CAROUSEL_STEPS[step];

  return (
    <div className="flex flex-col items-center" data-testid="step-carousel">
      <style>{`
        @keyframes progress-fill { from { width: 0% } to { width: 100% } }
        .progress-fill { animation: progress-fill ${STEP_DURATION}ms linear both; }
      `}</style>

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

      {/* Dots + progress bar */}
      <div className="flex flex-col items-center gap-3 mt-6 w-full max-w-[680px]">
        <div className="flex items-center gap-3">
          {CAROUSEL_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className="w-2 h-2 rounded-full transition-all duration-150 cursor-pointer"
              style={{ background: i === step ? '#A8CFEA' : '#262626' }}
              data-testid={`carousel-dot-${i}`}
            />
          ))}
        </div>
        <div className="w-full h-[2px] rounded-full" style={{ background: '#262626' }}>
          <div
            key={progressKey}
            className="progress-fill h-full rounded-full"
            style={{ background: '#A8CFEA' }}
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
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]" data-testid="text-hero-title">
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
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" data-testid="text-how-title">How Revryze Works.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-how-subtitle">One team. One feedback loop. No excuses.</p>
          </div>

          <StepCarousel />
        </div>
      </section>

      {/* ── SECTION 3: PRICING ── */}
      <section className="py-20 px-6 border-t border-[#262626]" data-testid="section-pricing">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" data-testid="text-pricing-title">250 Members. Guaranteed.</h2>
            <p className="text-gray-400 text-lg" data-testid="text-pricing-subtitle">One fee. One team. One number to hit.</p>
          </div>

          {/* Pricing card */}
          <Card className="bg-[#171717] border-[#A8CFEA]/30 mb-6" data-testid="card-pricing">
            <CardContent className="p-8 text-center">
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

          {/* Refund explainer */}
          <div className="p-6 rounded-2xl bg-[#171717] border border-[#A8CFEA]/25 mb-4" data-testid="card-refund-explainer">
            <h4 className="text-[#A8CFEA] font-bold uppercase tracking-widest text-xs mb-3">HOW THE REFUND WORKS</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              At $40,000 for 250 members, each member = $160. If Revryze delivers 200 of 250 members → refund = 50 × $160 = $8,000. You only pay for what you get.
            </p>
          </div>

          {/* Qualification box */}
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-[#262626] mb-4" data-testid="card-qualification">
            <h4 className="text-gray-300 font-bold uppercase tracking-widest text-xs mb-3">REFUND QUALIFICATION REQUIREMENTS</h4>
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

          <p className="text-xs text-gray-600 text-center" data-testid="text-meta-note">
            The $25,000 Meta ad spend is paid directly to the ad platform — separate from the Revryze service fee and required to activate the guarantee.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: CALCULATOR ── */}
      <section className="py-20 px-6 bg-neutral-950 border-t border-[#262626]" data-testid="section-calculator">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" data-testid="text-calc-title">See Your Numbers.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-calc-subtitle">Adjust the sliders. See your investment, your revenue, and your path to break-even.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* LEFT: Sliders */}
            <div className="space-y-5">

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
            <div className="space-y-5">

              {/* Card A: Investment */}
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

              {/* Card B: Revenue */}
              <Card className="bg-[#171717] border-[#262626]" data-testid="card-revenue">
                <CardContent className="p-6">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-5">YOUR REVENUE</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Members</span>
                      <span data-testid="text-revenue-members">{members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Revenue</span>
                      <span data-testid="text-monthly-revenue">{formatMoney(monthlyRevenue)} /month</span>
                    </div>
                    <div className="flex justify-between font-semibold text-white">
                      <span>Lifetime Revenue</span>
                      <span data-testid="text-lifetime-revenue">{formatMoney(lifetimeRevenue)}</span>
                    </div>
                    {studios > 1 && (
                      <div className="pt-3 border-t border-[#262626] flex justify-between text-[#00E87C] font-semibold" data-testid="text-all-studios-revenue">
                        <span>Total ({studios} studios)</span>
                        <span>{formatMoney(lifetimeAllStudios)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Card C: Break-even */}
              <Card className="bg-[#171717] border-[#A8CFEA]/25 relative overflow-hidden" data-testid="card-breakeven">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#A8CFEA] opacity-[0.04] blur-[50px] rounded-full pointer-events-none" />
                <CardContent className="p-6">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">BREAK-EVEN</h3>
                  <div className="text-5xl font-black text-[#A8CFEA] mb-2" data-testid="text-breakeven">
                    {breakEven.toFixed(1)} <span className="text-lg font-normal text-gray-500">months</span>
                  </div>
                  <p className="text-xs text-gray-600" data-testid="text-breakeven-sub">
                    At {members} members paying {formatMoney(monthlyValue)}/month
                  </p>
                </CardContent>
              </Card>

              {/* ROI stat */}
              <div className="p-5 rounded-2xl border border-[#262626] bg-neutral-900/40 text-center" data-testid="card-roi">
                <span className="text-4xl font-black text-[#00E87C]" data-testid="text-roi">{roi.toFixed(1)}x</span>
                <p className="text-sm text-gray-500 mt-1">return on investment over member lifetime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: REAL RESULTS ── */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-t border-[#262626]" data-testid="section-proof">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" data-testid="text-proof-title">Real Results. Real Calls.</h2>
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
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" data-testid="text-steps-title">Let's Fill Your Studio.</h2>
            <p className="text-gray-400 text-lg" data-testid="text-steps-subtitle">Here's exactly what happens when you move forward.</p>
          </div>

          <div className="space-y-8">
            {[
              {
                n: 1,
                title: 'SIGN WITH REVRYZE',
                body: 'You sign directly with Revryze. One agreement, one fee ($40,000), one goal: 250 members in your studio.',
              },
              {
                n: 2,
                title: 'KICK OFF YOUR 16-WEEK CAMPAIGN',
                body: 'Revryze launches your Meta ad campaign immediately. Your $25,000 ad spend goes directly to Meta — we manage every dollar, every creative, every audience. You approve. We execute.',
              },
              {
                n: 3,
                title: 'LEADS COME IN. WE WORK THEM.',
                body: 'Every lead is contacted immediately via text, email, and phone. Our team nurtures every prospect through to a signed membership. You focus on your studio. We handle sales.',
              },
              {
                n: 4,
                title: 'COMMUNITY LEADS FROM YOU',
                body: 'You provide 250 community-driven leads from your local network — neighbors, gym-goers, local businesses. These warm leads combined with our paid traffic is what makes the guarantee possible.',
              },
              {
                n: 5,
                title: '250 MEMBERS OR YOUR MONEY BACK',
                body: 'When both conditions are met — 250 community leads provided, $25K Meta ad spend completed — if we fall short of 250 members, we refund you dollar-for-dollar for every member we missed. Full accountability. Zero risk.',
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
            Let's build the STRONGest studio opening in Pilates.
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
