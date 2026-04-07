import { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  Clock, 
  Target,
  TrendingUp,
  PhoneCall, 
  FileText, 
  CheckCircle2,
  BarChart3,
  Dumbbell,
  Building2,
  DollarSign,
  Users,
  Megaphone
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ProposalPage() {
  const [studioOpenings, setStudioOpenings] = useState(40);
  const [membersAcquired, setMembersAcquired] = useState(100);
  const [monthlyValue, setMonthlyValue] = useState(350);
  const [lifetimeMonths, setLifetimeMonths] = useState(12);
  const MEMBER_GUARANTEE = 100;
  const STANDARD_FEE = 40000;
  const VOLUME_FEE = 30000;
  const VOLUME_THRESHOLD = 10;
  const ROYALTY_RATE = 0.07;
  const MARKETING_SPEND = 25000;

  const effectiveFee = studioOpenings >= VOLUME_THRESHOLD ? VOLUME_FEE : STANDARD_FEE;

  const refundPercent = Math.max(0, (MEMBER_GUARANTEE - membersAcquired) / MEMBER_GUARANTEE);
  const refundAmount = refundPercent * effectiveFee;
  const netRevrzeFee = effectiveFee - refundAmount;

  const totalStudioInvestment = netRevrzeFee + MARKETING_SPEND;

  const ltvPerMember = monthlyValue * lifetimeMonths;
  const revenuePerStudio = membersAcquired * ltvPerMember;

  const roiMultiple = totalStudioInvestment > 0 ? revenuePerStudio / totalStudioInvestment : 0;

  const royaltyPerStudio = revenuePerStudio * ROYALTY_RATE;
  const totalSystemRevenue = revenuePerStudio * studioOpenings;
  const totalHQRoyalty = royaltyPerStudio * studioOpenings;

  const isVolumeDiscount = studioOpenings >= VOLUME_THRESHOLD;
  const isGuaranteeActive = membersAcquired < MEMBER_GUARANTEE;

  return (
    <div className="min-h-screen pb-24 bg-[#0a0a0a] text-white font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto" data-testid="section-hero">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-sm font-semibold mb-8" data-testid="badge-executive-briefing">
            <Dumbbell size={16} className="text-[#CCFF00]" />
            <span className="text-gray-300 tracking-wide">ALLOY PERSONAL TRAINING x REVRYZE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]" data-testid="text-hero-title">
            100 MEMBERS.<br />
            <span className="text-[#CCFF00]">OR YOU GET REFUNDED.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed" data-testid="text-hero-subtitle">
            Dedicated US-based sales team. Guaranteed member acquisition. Dollar-for-dollar refund if we miss.
          </p>
        </div>

        {/* OPERATIONAL COMPARISON */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Box 1: Traditional Challenge */}
          <Card className="relative bg-neutral-900 border-neutral-800 group hover:border-red-500/30" data-testid="card-boulder-reality">
            <div className="absolute top-4 right-4 opacity-20">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
            <CardContent className="p-6">
              <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4" data-testid="text-boulder-header">The Problem</h3>
              <p className="text-2xl font-bold mb-6" data-testid="text-boulder-tagline">"Slow Ramp. Missed Revenue."</p>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3" data-testid="text-boulder-item-0">
                  <Clock size={16} className="text-red-500 shrink-0 mt-0.5" />
                  Franchisees distracted by build-out and operations.
                </li>
                <li className="flex gap-3" data-testid="text-boulder-item-1">
                  <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  Slow member acquisition = delayed royalty revenue.
                </li>
                <li className="flex gap-3" data-testid="text-boulder-item-2">
                  <Target size={16} className="text-red-500 shrink-0 mt-0.5" />
                  Result: longer path to profitability.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Box 2: Revryze Solution */}
          <Card className="relative bg-neutral-900/50 border-[#CCFF00]/30 group" data-testid="card-revryze-standard">
            <div className="absolute top-4 right-4 opacity-20">
              <Zap className="text-[#CCFF00]" size={40} />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#CCFF00] font-bold uppercase tracking-widest text-xs mb-4" data-testid="text-revryze-header">The Solution</h3>
              <p className="text-2xl font-bold mb-6" data-testid="text-revryze-tagline">"Revenue First. Fees Second."</p>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3" data-testid="text-revryze-item-0">
                  <Zap size={16} className="text-[#CCFF00] shrink-0 mt-0.5" />
                  100% dedicated US-based sales team per studio.
                </li>
                <li className="flex gap-3" data-testid="text-revryze-item-1">
                  <CheckCircle2 size={16} className="text-[#CCFF00] shrink-0 mt-0.5" />
                  100-member guarantee. Dollar-for-dollar refund.
                </li>
                <li className="flex gap-3" data-testid="text-revryze-item-2">
                  <ShieldCheck size={16} className="text-[#CCFF00] shrink-0 mt-0.5" />
                  <span>Faster royalty revenue for HQ.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section className="py-12 px-6 bg-neutral-950" data-testid="section-calculator">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" data-testid="text-calculator-title">Per-Studio ROI. Proven at Scale.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-calculator-subtitle">Each studio is its own investment. See the numbers.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* INPUTS (Left Side) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Slider 1: Studio Openings */}
              <Card className="bg-neutral-900 border-neutral-800 border-l-4 border-l-[#CCFF00]" data-testid="card-slider-studios">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Building2 size={14} className="text-[#CCFF00]" />
                      Studio Openings
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-studios-value">{studioOpenings}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    step="1" 
                    value={studioOpenings} 
                    onChange={(e) => setStudioOpenings(parseInt(e.target.value))} 
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
                    data-testid="slider-studios"
                  />
                  {isVolumeDiscount && (
                    <p className="text-xs text-[#CCFF00] mt-2 font-semibold">10+ studios: $30,000/studio</p>
                  )}
                </CardContent>
              </Card>

              {/* Slider 2: Members Acquired */}
              <Card className="bg-neutral-900 border-neutral-800" data-testid="card-slider-members">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      Members per Studio
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-members-value">{membersAcquired}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="150" 
                    step="5" 
                    value={membersAcquired} 
                    onChange={(e) => setMembersAcquired(parseInt(e.target.value))} 
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
                    data-testid="slider-members"
                  />
                  <p className="text-xs text-gray-500 mt-2">Guarantee: 100. Refund if under.</p>
                </CardContent>
              </Card>

              {/* Marketing Spend (Fixed) */}
              <div className="p-5 bg-neutral-900/50 rounded-xl border border-neutral-800" data-testid="card-marketing-spend">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Megaphone size={14} className="text-[#CCFF00]" />
                    Marketing Spend (Required)
                  </label>
                  <span className="text-2xl font-black text-white" data-testid="text-marketing-value">{formatMoney(MARKETING_SPEND)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Paid by franchisee. Required for 100-member guarantee.</p>
              </div>

              {/* Slider 4: Monthly Value */}
              <Card className="bg-neutral-900 border-neutral-800" data-testid="card-slider-monthly">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <DollarSign size={14} className="text-gray-400" />
                      Monthly Value / Member
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-monthly-value">${monthlyValue}</span>
                  </div>
                  <input 
                    type="range" 
                    min="200" 
                    max="500" 
                    step="25" 
                    value={monthlyValue} 
                    onChange={(e) => setMonthlyValue(parseInt(e.target.value))} 
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
                    data-testid="slider-monthly"
                  />
                </CardContent>
              </Card>

              {/* Slider 5: Lifetime Months */}
              <Card className="bg-neutral-900 border-neutral-800" data-testid="card-slider-lifetime">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Avg Member Lifetime</label>
                    <span className="text-2xl font-black text-white" data-testid="text-lifetime-value">{lifetimeMonths} <span className="text-sm font-normal text-gray-600">mo</span></span>
                  </div>
                  <input 
                    type="range" 
                    min="6" 
                    max="24" 
                    step="1" 
                    value={lifetimeMonths} 
                    onChange={(e) => setLifetimeMonths(parseInt(e.target.value))} 
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
                    data-testid="slider-lifetime"
                  />
                </CardContent>
              </Card>
            </div>

            {/* OUTPUTS (Right Side) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* PER-STUDIO ROI (Primary) */}
              <Card className="border-[#CCFF00]/30 bg-neutral-900 relative overflow-hidden" data-testid="card-studio-roi">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#CCFF00] opacity-[0.03] blur-[60px] rounded-full pointer-events-none"></div>
                <CardContent className="p-6">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6">Per-Studio Economics</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-gray-500 text-xs font-bold uppercase mb-1">Revenue</div>
                      <div className="text-2xl font-black text-white" data-testid="text-revenue-per-studio">
                        {formatMoney(revenuePerStudio)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs font-bold uppercase mb-1">Investment</div>
                      <div className="text-2xl font-black text-gray-400" data-testid="text-investment-per-studio">
                        {formatMoney(totalStudioInvestment)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs font-bold uppercase mb-1">ROI Multiple</div>
                      <div className="text-2xl font-black text-[#CCFF00]" data-testid="text-roi-multiple">
                        {roiMultiple.toFixed(1)}x
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-800 pt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Revryze Fee</span>
                      <span>{formatMoney(effectiveFee)}</span>
                    </div>
                    {isGuaranteeActive && (
                      <div className="flex justify-between text-[#CCFF00]">
                        <span>Guarantee Refund ({(refundPercent * 100).toFixed(0)}%)</span>
                        <span>-{formatMoney(refundAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Marketing Spend</span>
                      <span>{formatMoney(MARKETING_SPEND)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-2 border-t border-neutral-800">
                      <span>Net Investment</span>
                      <span>{formatMoney(totalStudioInvestment)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CORPORATE ROYALTY (Secondary) */}
              <Card className="flex-1 border-neutral-800 bg-neutral-900/80 relative overflow-hidden" data-testid="card-royalty-output">
                <CardContent className="p-6">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">HQ Royalty Upside</h3>
                  <p className="text-xs text-gray-600 mb-6">Franchisees pay all fees. HQ earns 7% royalty on revenue.</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                      <div className="text-gray-500 text-xs font-bold uppercase mb-2">Royalty per Studio</div>
                      <div className="text-3xl font-black text-[#CCFF00]" data-testid="text-royalty-per-studio">
                        {formatMoney(royaltyPerStudio)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-[#CCFF00]/10 rounded-xl border border-[#CCFF00]/20">
                      <div className="text-gray-500 text-xs font-bold uppercase mb-2">Total HQ Royalty</div>
                      <div className="text-3xl font-black text-[#CCFF00]" data-testid="text-total-royalty">
                        {formatMoney(totalHQRoyalty)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{studioOpenings} studios</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Box */}
              <div 
                className="p-5 rounded-2xl border flex items-center gap-4 transition-all bg-neutral-900 border-neutral-800"
                data-testid="status-box"
              >
                <div className="p-3 rounded-full bg-[#CCFF00]/20 text-[#CCFF00]">
                  {isGuaranteeActive ? <ShieldCheck size={24} /> : <TrendingUp size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white" data-testid="text-status-title">
                    {isGuaranteeActive ? 'Guarantee Active' : 'At or Above Target'}
                  </h4>
                  <p className="text-sm text-gray-500 mt-0.5" data-testid="text-status-desc">
                    {isGuaranteeActive 
                      ? `${membersAcquired} members = ${(refundPercent * 100).toFixed(0)}% refund on Revryze fee.`
                      : `${membersAcquired} members per studio. No refund needed.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF VAULT */}
      <section className="py-20 px-4 bg-neutral-900/30 border-t border-neutral-900" data-testid="section-proof">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" data-testid="text-proof-title">Real Results. Real Calls.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" data-testid="text-proof-subtitle">Listen to live sales. See the case studies.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/swet-call-to-share.wav" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-listen-call">
              <Card className="h-full bg-neutral-900 border-neutral-800 group-hover:bg-neutral-800 transition-all hover:-translate-y-1 hover:border-[#CCFF00]/50">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-[#CCFF00] group-hover:scale-110 transition-transform">
                    <PhoneCall size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2" data-testid="text-listen-title">Live Sales Call</h4>
                  <p className="text-gray-400 text-sm" data-testid="text-listen-desc">Hear real-time lead conversion.</p>
                </CardContent>
              </Card>
            </a>

            <a href="/Case-Study-Building-Predictable-Franchise-Growth-copy.pdf" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-beem-case">
              <Card className="h-full bg-neutral-900 border-neutral-800 group-hover:bg-neutral-800 transition-all hover:-translate-y-1 hover:border-[#CCFF00]/50">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-[#CCFF00] group-hover:scale-110 transition-transform">
                    <FileText size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2" data-testid="text-beem-title">Franchise Growth Study</h4>
                  <p className="text-gray-400 text-sm" data-testid="text-beem-desc">Predictable multi-location growth.</p>
                </CardContent>
              </Card>
            </a>

            <a href="/attached_assets/Swet-Studio-Recovery-Relaunch-2025.pdf" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-swet-case">
              <Card className="h-full bg-neutral-900 border-neutral-800 group-hover:bg-neutral-800 transition-all hover:-translate-y-1 hover:border-[#CCFF00]/50">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-[#CCFF00] group-hover:scale-110 transition-transform">
                    <BarChart3 size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2" data-testid="text-swet-title">Swet Studio Relaunch</h4>
                  <p className="text-gray-400 text-sm" data-testid="text-swet-desc">From 40 to 170+ members in 60 days.</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6 bg-[#CCFF00] text-black" data-testid="section-pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-black" data-testid="text-pricing-title">100 Members. Guaranteed.</h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">Prorated refund if we miss. No risk for HQ.</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Standard Rate */}
            <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col" data-testid="card-standard-pricing">
              <div className="mb-6">
                <span className="bg-neutral-200 text-neutral-600 text-xs font-bold px-3 py-1 rounded-full uppercase" data-testid="badge-standard">Standard</span>
                <h3 className="text-4xl font-black mt-4 mb-1 text-black" data-testid="text-standard-price">$40,000</h3>
                <p className="text-gray-500 text-sm font-bold" data-testid="text-standard-desc">Per Studio (Franchisee Pays)</p>
              </div>
              <div className="mt-auto space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gray-400" />
                  <span>100-member guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gray-400" />
                  <span>Prorated refund protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gray-400" />
                  <span>Dedicated US-based sales team</span>
                </div>
              </div>
            </div>

            {/* Volume Rate */}
            <div className="bg-neutral-900 p-8 rounded-3xl shadow-2xl flex flex-col text-white ring-4 ring-white/20" data-testid="card-volume-pricing">
              <div className="mb-6">
                <span className="bg-[#CCFF00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase" data-testid="badge-volume">10+ Studios</span>
                <h3 className="text-4xl font-black mt-4 mb-1 text-[#CCFF00]" data-testid="text-volume-price">$30,000</h3>
                <p className="text-gray-400 text-sm font-bold" data-testid="text-volume-desc">Per Studio (Franchisee Pays)</p>
              </div>
              <div className="mt-auto space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#CCFF00]" />
                  <span>25% savings per studio</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#CCFF00]" />
                  <span>Same 100-member guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#CCFF00]" />
                  <span>Priority deployment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 bg-black/20 p-8 rounded-3xl backdrop-blur-sm border border-black/10 text-center" data-testid="card-guarantee-explainer">
            <h3 className="text-2xl md:text-3xl font-black text-black mb-4 uppercase tracking-tight">NO RESULTS = NO MONEY KEPT.</h3>
            <p className="text-black/90 text-lg leading-relaxed max-w-xl mx-auto">
              100 members per studio or dollar-for-dollar refund.<br />
              Revenue created. Royalties earned.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-900 text-center px-4" data-testid="section-footer">
        <p className="text-gray-600 text-sm font-bold uppercase tracking-widest mb-2" data-testid="text-footer-company">Growth Point Solutions LLC dba Revryze</p>
        <p className="text-gray-700 text-xs" data-testid="text-footer-confidential">Proprietary and Confidential. Alloy Personal Training HQ Leadership Only.</p>
      </footer>
    </div>
  );
}
