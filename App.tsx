import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Membership', href: '#membership' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Contact', href: '#contact' },
];

const programs = [
  { title: 'Strength Training', detail: 'Build a base that moves with you. Compound lifts, coached form, measurable progress.', icon: Dumbbell },
  { title: 'Weight Loss', detail: 'A clear plan for a leaner, more capable body — without crash diets or empty promises.', icon: Target },
  { title: 'Muscle Building', detail: 'Structured volume, smart nutrition and the consistency that makes change visible.', icon: Zap },
  { title: 'Personal Training', detail: 'One-to-one coaching for your goal, your schedule and the work you are ready to own.', icon: Users },
  { title: 'Cardio', detail: 'Condition your engine with focused sessions that make stamina feel like a superpower.', icon: Trophy },
];

const plans = [
  { name: '1 Month', price: '₹999', note: 'Best for starting the habit', featured: false },
  { name: '3 Months', price: '₹2,499', note: 'Our most chosen commitment', featured: true },
  { name: '1 Year', price: '₹7,999', note: 'The long game, priced right', featured: false },
];

const trainers = [
  { name: 'Rhea Malhotra', role: 'Strength & Conditioning', image: '/trainer-rhea.jpg', initials: 'RM' },
  { name: 'Arjun Mehta', role: 'Performance Coach', image: '/ironfit-hero.jpg', initials: 'AM', position: '72% center' },
  { name: 'Kabir Shah', role: 'Mobility & Nutrition', image: '/gallery-conditioning.jpg', initials: 'KS', position: 'center' },
];

const testimonials = [
  { quote: 'I stopped looking for motivation and started following a plan. The difference is bigger than the mirror.', name: 'Neha Kulkarni', detail: 'Member since 2022', initials: 'NK' },
  { quote: 'The coaches notice the details. I came in wanting to get stronger and left with a completely different standard.', name: 'Vikram Rao', detail: '3 month member', initials: 'VR' },
  { quote: 'It feels serious without feeling intimidating. Every session has a purpose and the people here show up.', name: 'Ananya Iyer', detail: 'Member since 2024', initials: 'AI' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [activeSection, setActiveSection] = useState('about');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href)).filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    }), { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const openJoin = (plan = '') => {
    setSelectedPlan(plan);
    setSubmitted(false);
    setJoinOpen(true);
    closeMenu();
  };
  const submitJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  const whatsappUrl = 'https://wa.me/919876543210?text=Hi%20IRONFIT%20GYM%2C%20I%27d%20like%20to%20ask%20about%20gym%20membership.';

  return (
    <main className="min-h-[100dvh] overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[hsl(var(--foreground)/.12)] bg-[hsl(var(--background)/.82)] backdrop-blur-xl">
        <div className="header-shell relative flex h-[78px] items-center justify-between">
          <button type="button" className="brand-lockup flex items-center gap-3 text-left" onClick={() => scrollToId('top')} data-testid="button-brand-home">
            <span className="brand-mark grid h-10 w-10 place-items-center bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><Dumbbell size={20} strokeWidth={2.5} /></span>
            <span className="display text-[25px] font-extrabold leading-none tracking-[-.03em]">IRON<span className="text-[hsl(var(--primary))]">FIT</span><span className="mt-1 block font-sans text-[8px] font-bold tracking-[.24em] text-[hsl(var(--muted-foreground))]">MUMBAI / TRAINING FLOOR</span></span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a href="tel:+919876543210" className="flex items-center gap-2 text-[10px] font-bold tracking-[.09em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-header-phone"><Phone size={14} /> +91 98765 43210</a>
            <button type="button" className="button-main min-h-[42px] px-4" onClick={() => openJoin()} data-testid="button-header-join">Join the floor <ArrowUpRight size={15} /></button>
          </div>

          <button type="button" className="grid h-10 w-10 place-items-center border border-[hsl(var(--foreground)/.25)] text-[hsl(var(--foreground))] md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {menuOpen && (
            <div className="mobile-menu md:hidden">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  <a key={item.href} href={item.href} className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.1)] py-4 text-[12px] font-bold uppercase tracking-[.15em]" onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                    <span><span className="mr-3 text-[hsl(var(--primary))]">0{index + 1}</span>{item.label}</span><ChevronRight size={16} className="text-[hsl(var(--primary))]" />
                  </a>
                ))}
              </nav>
              <button type="button" className="button-main mt-6 w-full" onClick={() => openJoin()} data-testid="button-mobile-join">Start your journey <ArrowUpRight size={16} /></button>
            </div>
          )}
        </div>
      </header>

      <section id="top" className="hero-v2 relative flex items-end pt-[78px]">
        <div className="hero-image" />
        <div className="hero-grid" />
        <div className="shell relative z-10 grid w-full gap-10 lg:grid-cols-[1fr_310px]">
          <div className="hero-copy">
            <div className="reveal section-kicker">Mumbai / Est. 2018 / No shortcuts</div>
            <h1 className="hero-title reveal delay-1 mt-8">BUILD <span>YOUR</span> BODY</h1>
            <p className="reveal delay-2 mt-8 max-w-[430px] text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">A focused training floor for people who want to get stronger, move better and make the work part of their life.</p>
            <div className="reveal delay-3 mt-9 flex flex-wrap gap-3">
              <button type="button" className="button-main" onClick={() => scrollToId('membership')} data-testid="button-hero-start">START YOUR JOURNEY <ArrowUpRight size={16} /></button>
              <button type="button" className="button-line" onClick={() => scrollToId('membership')} data-testid="button-hero-membership">VIEW MEMBERSHIP <ArrowDownRight size={16} /></button>
            </div>
            <div className="reveal delay-3 mt-14 flex flex-wrap items-center gap-7">
              <div className="fine-print flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-[hsl(var(--primary))]" /> Floor open now</div>
              <div className="h-4 w-px bg-[hsl(var(--foreground)/.22)]" />
              <span className="fine-print">06:00 — 23:00 / All week</span>
            </div>
          </div>
          <div className="reveal delay-3 hidden items-end pb-16 lg:flex">
            <div className="hero-side-note max-w-[190px] pl-4">
              <p className="fine-print">Not a resort.<br />Not a photoshoot.</p>
              <p className="mt-4 text-[12px] leading-5 text-[hsl(var(--foreground)/.74)]">Just the right place to get stronger.</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))] md:flex">Scroll to enter <span className="h-px w-16 bg-[hsl(var(--muted-foreground)/.5)]" /></div>
      </section>

      <div className="ticker" aria-label="Ironfit training promise">
        <div className="ticker-track">
          {[0, 1].map((group) => <div key={group}>{['Strength is earned', 'Show up', 'Do the work', 'Progress over perfection', 'Mumbai trains here'].map((item) => <span className="ticker-item" key={`${group}-${item}`}>{item}</span>)}</div>)}
        </div>
      </div>

      <section id="about" className="section-pad">
        <div className="shell grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
          <div className="reveal">
            <span className="section-kicker">01 / The place</span>
            <h2 className="section-heading mt-7 max-w-[380px]">More than a <em>gym.</em></h2>
          </div>
          <div className="lg:pt-16">
            <p className="reveal max-w-[760px] text-[clamp(24px,3.3vw,47px)] font-medium leading-[1.1] tracking-[-.045em] text-[hsl(var(--foreground)/.9)]">IRONFIT GYM is where ordinary days turn into stronger ones. We built a serious, welcoming space for Mumbai people who are ready to put in the work.</p>
            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[hsl(var(--foreground)/.17)] pt-7 sm:grid-cols-4">
              {[['500+', 'Members'], ['10+', 'Expert Trainers'], ['8+', 'Years Experience'], ['24/7', 'Support']].map(([value, label], index) => (
                <div className={`stat-block reveal delay-${(index % 3) + 1}`} key={label} data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}>
                  <div className="stat-number">{value}</div><div className="mt-3 text-[10px] font-bold uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="section-pad section-rule bg-[hsl(var(--card)/.45)]">
        <div className="shell">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="reveal"><span className="section-kicker">02 / Your work</span><h2 className="section-heading mt-7">Find your<br /><em>method.</em></h2></div>
            <p className="reveal max-w-[270px] text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">Different goals. Same floor. Start with the kind of work that makes you want to come back.</p>
          </div>
          <div className="program-grid mt-14">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return <article className={`program-v2 reveal delay-${(index % 3) + 1}`} key={program.title} data-testid={`card-program-${index}`}>
                <div className="flex items-start justify-between"><span className="program-icon"><Icon size={21} /></span><span className="program-index">0{index + 1}</span></div>
                <div><h3>{program.title}</h3><p className="mt-4">{program.detail}</p><button type="button" className="program-link" onClick={() => openJoin(program.title)} data-testid={`button-program-${index}`}>Ask about this <ChevronRight size={15} /></button></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="section-rule relative overflow-hidden">
        <div className="split-photo absolute inset-y-0 left-0 hidden w-[42%] lg:block" />
        <div className="shell grid min-h-[560px] items-center lg:grid-cols-[.8fr_1.2fr]">
          <div />
          <div className="reveal py-20 lg:pl-12">
            <Quote size={34} className="mb-7 text-[hsl(var(--primary))]" />
            <blockquote className="display max-w-[720px] text-[clamp(43px,5.7vw,84px)] font-bold uppercase leading-[.87] tracking-[-.04em]">The hardest rep is the one you almost talked yourself out of.</blockquote>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))]">— The Ironfit standard</p>
          </div>
        </div>
      </section>

      <section id="membership" className="section-pad">
        <div className="shell">
          <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><span className="section-kicker">03 / Pick your commitment</span><h2 className="section-heading mt-7">Pay less.<br /><em>Train more.</em></h2></div><p className="max-w-[290px] text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">No joining theatre. No confusing tiers. Pick a plan, send an enquiry and start today.</p></div>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => <article className={`plan-v2 reveal delay-${index + 1} ${plan.featured ? 'featured' : ''}`} key={plan.name} data-testid={`card-plan-${plan.name.replace(' ', '-').toLowerCase()}`}>
              {plan.featured ? <div className="mb-7 text-[10px] font-bold uppercase tracking-[.18em]">Most chosen / Save more</div> : <div className="plan-muted mb-7 text-[10px] font-bold uppercase tracking-[.18em]">Membership</div>}
              <h3 className="display text-[38px] font-bold uppercase">{plan.name}</h3>
              <div className="mt-8 flex items-end gap-2"><span className="plan-price">{plan.price}</span><span className="plan-muted pb-2 text-[10px] font-bold uppercase">total</span></div>
              <p className="plan-muted mt-5 min-h-[22px]">{plan.note}</p>
              <ul className="check-list"><li><Check size={15} /> Full floor access</li><li><Check size={15} /> Equipment orientation</li><li><Check size={15} /> No hidden fees</li></ul>
              <button type="button" className={`${plan.featured ? 'button-main' : 'button-line'} mt-8 w-full`} onClick={() => openJoin(plan.name)} data-testid={`button-plan-${plan.name.replace(' ', '-').toLowerCase()}`}>Join Now <ArrowUpRight size={16} /></button>
            </article>)}
          </div>
          <p className="mt-7 text-center text-[10px] font-bold uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">Membership enquiries are handled by our team — no online payment required.</p>
        </div>
      </section>

      <section id="trainers" className="section-pad section-rule bg-[hsl(var(--card)/.42)]">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div className="reveal"><span className="section-kicker">04 / People who know the work</span><h2 className="section-heading mt-7">Meet the<br /><em>coaches.</em></h2></div><p className="reveal max-w-[280px] text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">Ten expert trainers. Three of the people you will see setting the standard every day.</p></div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {trainers.map((trainer, index) => <article className={`trainer-card reveal delay-${index + 1}`} key={trainer.name} data-testid={`card-trainer-${index}`}>
              <div className="trainer-image" style={{ backgroundImage: `url('${trainer.image}')`, backgroundPosition: trainer.position ?? 'center' }} role="img" aria-label={`${trainer.name}, ${trainer.role}`}><span className="absolute -left-[9999px]">{trainer.initials}</span></div>
              <div className="trainer-meta"><h3 className="display text-[31px] font-bold uppercase leading-none">{trainer.name}</h3><p className="mt-3 text-[10px] font-bold uppercase tracking-[.16em] text-[hsl(var(--primary))]">{trainer.role}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-pad section-rule">
        <div className="shell">
          <div className="mb-12 flex items-end justify-between gap-7"><div className="reveal"><span className="section-kicker">05 / On the floor</span><h2 className="section-heading mt-7">The work<br /><em>looks good.</em></h2></div><span className="fine-print hidden md:block">No filters. Just focus.</span></div>
          <div className="gallery-grid reveal">
            <div className="gallery-image" style={{ backgroundImage: "url('/gallery-lift.jpg')" }}><span className="gallery-label">Strength floor / 06:30</span></div>
            <div className="gallery-image" style={{ backgroundImage: "url('/gallery-conditioning.jpg')" }}><span className="gallery-label">Conditioning / 18:10</span></div>
            <div className="gallery-image" style={{ backgroundImage: "url('/gallery-cable.jpg')" }}><span className="gallery-label">Focus / Form</span></div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-pad section-rule bg-[hsl(var(--card)/.42)]">
        <div className="shell">
          <div className="reveal flex items-end justify-between gap-7"><div><span className="section-kicker">06 / Member notes</span><h2 className="section-heading mt-7">They put in<br /><em>the work.</em></h2></div><Quote className="hidden text-[hsl(var(--primary))] md:block" size={46} /></div>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => <article className={`quote-card reveal delay-${index + 1}`} key={testimonial.name} data-testid={`card-testimonial-${index}`}>
              <div className="stars" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((star) => <span key={star}>★</span>)}</div>
              <p className="mt-7 min-h-[118px] text-[18px] leading-[1.35] tracking-[-.02em] text-[hsl(var(--foreground)/.9)]">“{testimonial.quote}”</p>
              <div className="mt-7 flex items-center gap-3 border-t border-[hsl(var(--foreground)/.14)] pt-5"><span className="grid h-9 w-9 place-items-center bg-[hsl(var(--primary))] text-[11px] font-black text-[hsl(var(--primary-foreground))]">{testimonial.initials}</span><div><div className="text-[11px] font-bold uppercase tracking-[.1em]">{testimonial.name}</div><div className="mt-1 text-[10px] uppercase tracking-[.11em] text-[hsl(var(--muted-foreground))]">{testimonial.detail}</div></div></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad section-rule">
        <div className="shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div className="reveal"><span className="section-kicker">07 / Find us</span><h2 className="section-heading mt-7">Your next<br /><em>rep starts</em><br />here.</h2><div className="mt-10 flex flex-col gap-5"><a href="tel:+919876543210" className="flex items-center gap-3 text-[13px] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-contact-phone"><Phone size={17} className="text-[hsl(var(--primary))]" /> +91 98765 43210</a><a href="mailto:hello@ironfitgym.in" className="flex items-center gap-3 text-[13px] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-contact-email"><Mail size={17} className="text-[hsl(var(--primary))]" /> hello@ironfitgym.in</a><div className="flex items-start gap-3 text-[13px] text-[hsl(var(--muted-foreground))]"><MapPin size={17} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" /> 24 Forge Road, Andheri East,<br />Mumbai, Maharashtra 400069</div><div className="flex items-start gap-3 text-[13px] text-[hsl(var(--muted-foreground))]"><Clock3 size={17} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" /> Monday — Sunday<br />06:00 AM — 11:00 PM</div></div></div>
          <div className="reveal delay-2 contact-panel p-4 sm:p-6"><div className="map-placeholder"><div className="map-pin"><MapPin size={23} /></div><span className="map-label">Google Maps / IRONFIT GYM</span></div><div className="mt-6 flex flex-wrap items-center justify-between gap-5"><span className="fine-print">Come see the floor before you decide.</span><button type="button" className="button-main" onClick={() => openJoin()} data-testid="button-contact-visit">Plan a visit <ArrowUpRight size={16} /></button></div></div>
        </div>
      </section>

      <footer className="section-rule">
        <div className="shell grid gap-10 py-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <button type="button" className="brand-lockup flex items-center gap-3 text-left" onClick={() => scrollToId('top')} data-testid="button-footer-brand"><span className="brand-mark grid h-9 w-9 place-items-center bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><Dumbbell size={17} /></span><span className="display text-[22px] font-bold">IRON<span className="text-[hsl(var(--primary))]">FIT</span></span></button>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">© 2026 IRONFIT GYM · Mumbai, Maharashtra</p>
          <div className="flex gap-2 md:justify-end"><a className="footer-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="link-footer-instagram"><Instagram size={16} /></a><a className="footer-social" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" data-testid="link-footer-facebook"><Facebook size={16} /></a><a className="footer-social" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" data-testid="link-footer-whatsapp"><MessageCircle size={16} /></a></div>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Ask about gym membership on WhatsApp" data-testid="link-floating-whatsapp"><MessageCircle size={24} /></a>

      {joinOpen && <div className="modal-backdrop fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-labelledby="join-title">
        <div className="modal-card relative w-full max-w-[540px] p-7 sm:p-10">
          <button type="button" className="absolute right-5 top-5 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]" onClick={() => setJoinOpen(false)} aria-label="Close join form" data-testid="button-close-join"><X size={21} /></button>
          {submitted ? <div className="py-10 text-center"><span className="mx-auto grid h-14 w-14 place-items-center bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><Check size={27} /></span><h2 className="section-heading mt-7 text-[65px]">You’re<br /><em>in.</em></h2><p className="mx-auto mt-6 max-w-[340px] text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">Thanks, {formName || 'champion'}. Our team will call you at {formPhone || 'your number'} shortly{selectedPlan ? ` about the ${selectedPlan} plan` : ''}.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-main mt-8" data-testid="link-confirmation-whatsapp"><MessageCircle size={16} /> Message on WhatsApp</a></div> : <><span className="section-kicker">Start here</span><h2 id="join-title" className="section-heading mt-7 max-w-[390px] text-[65px]">Ready to<br /><em>work?</em></h2><p className="mt-5 max-w-[410px] text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">Leave your details. We will help you pick the right plan and get you onto the floor.</p><form className="mt-8" onSubmit={submitJoin}><label className="sr-only" htmlFor="join-name">Your name</label><input id="join-name" className="input-line" placeholder="Your name" value={formName} onChange={(event) => setFormName(event.target.value)} required data-testid="input-join-name" /><label className="sr-only" htmlFor="join-phone">Phone number</label><input id="join-phone" className="input-line mt-3" placeholder="Phone number" type="tel" value={formPhone} onChange={(event) => setFormPhone(event.target.value)} required data-testid="input-join-phone" /><button type="submit" className="button-main mt-8 w-full" data-testid="button-submit-join">I’m ready — contact me <ArrowUpRight size={16} /></button></form><p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">Or call us directly: +91 98765 43210</p></>}
        </div>
      </div>}
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;