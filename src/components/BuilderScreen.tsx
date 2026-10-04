import { motion } from 'motion/react';
import { Subscription, MealType } from '../types';
import { PLAN_DURATIONS, PRIMARY_GOALS } from '../constants';

interface BuilderScreenProps {
  subscription: Subscription;
  onUpdate: (sub: Partial<Subscription>) => void;
  onSubscribe: () => void;
  onViewMenu: () => void;
}

export default function BuilderScreen({ subscription, onUpdate, onSubscribe, onViewMenu }: BuilderScreenProps) {
  const toggleMeal = (meal: MealType) => {
    const next = subscription.mealsPerDay.includes(meal)
      ? subscription.mealsPerDay.filter(m => m !== meal)
      : [...subscription.mealsPerDay, meal];
    if (next.length > 0) onUpdate({ mealsPerDay: next });
  };

  const currentDuration = PLAN_DURATIONS.find(d => d.id === subscription.durationId);
  const currentGoal = PRIMARY_GOALS.find(g => g.id === subscription.primaryGoalId);

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass-header border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-10 py-6 max-w-screen-2xl mx-auto">
          <div className="text-3xl font-black text-primary tracking-tighter font-headline italic">Fitopus</div>
          <div className="hidden md:flex gap-12 items-center">
            <a className="font-headline font-bold tracking-tight text-primary border-b-4 border-primary pb-1" href="#">Plans</a>
            <button 
              onClick={onViewMenu}
              className="font-headline font-bold tracking-tight text-on-surface opacity-60 hover:opacity-100 transition-opacity"
            >
              Menu
            </button>
            <a className="font-headline font-bold tracking-tight text-on-surface opacity-60 hover:opacity-100 transition-opacity" href="#">Our Story</a>
            <button className="bg-primary-container text-on-primary-container px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/10">Get started</button>
          </div>
        </div>
      </nav>

      {/* Sticky mobile price bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a] border-t border-white/10 px-5 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Your Plan</p>
          <p className="text-white text-sm font-bold truncate">{currentGoal?.name} · {currentDuration?.name ?? '—'}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Total</p>
            <p className="text-primary-fixed font-black text-xl font-headline">₹{subscription.totalInvestment}</p>
          </div>
          <button
            onClick={onSubscribe}
            className="bg-primary-container text-on-primary-container py-3 px-5 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Subscribe →
          </button>
        </div>
      </div>

      <main className="pt-32 pb-28 lg:pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16 text-center md:text-left relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-on-surface leading-tight max-w-3xl font-headline"
          >
            Elevate your plate. <br/>
            <span className="text-primary italic">Elevate your life.</span>
          </motion.h1>
          <div className="absolute -top-10 -right-4 hidden lg:block rotate-6 bg-tertiary-container text-tertiary px-6 py-2 rounded-full font-bold shadow-xl font-headline text-sm tracking-widest">
            NEW MENU OUT!
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-16">
            {/* Step 1: Primary Goal */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                <h2 className="text-2xl font-extrabold uppercase tracking-widest font-headline">Your Primary Goal</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRIMARY_GOALS.map((goal) => {
                  const selected = subscription.primaryGoalId === goal.id;
                  return (
                    <button 
                      key={goal.id}
                      onClick={() => onUpdate({ primaryGoalId: goal.id })}
                      className={`relative rounded-xl overflow-hidden group p-2 text-left transition-all ${selected ? 'bg-primary-container shadow-xl ring-2 ring-primary scale-[1.02]' : 'bg-surface-container-low hover:bg-surface-container'}`}
                    >
                      <div className="h-48 rounded-lg overflow-hidden mb-4 relative">
                        <img 
                          src={goal.imageUrl} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={goal.name}
                          referrerPolicy="no-referrer"
                        />
                        {selected && (
                          <div className="absolute top-2 right-2 bg-primary text-surface w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined font-black" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-xl font-extrabold font-headline leading-tight">{goal.name}</h3>
                        <p className={`font-bold text-sm tracking-widest uppercase mt-1 ${selected ? 'text-on-primary-container' : 'text-secondary'}`}>{goal.kcal} kcal</p>
                        <div className="mt-1.5 pt-1.5 border-t border-outline-variant/30 flex items-baseline gap-1">
                          <span className="text-base font-black font-headline text-on-surface">₹250</span>
                          <span className="text-sm font-semibold text-on-surface-variant">/meal</span>
                          <span className="text-xs font-medium text-on-surface-variant/60 italic">onwards</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Duration */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                <h2 className="text-2xl font-extrabold uppercase tracking-widest font-headline">Select Duration</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLAN_DURATIONS.map((plan) => {
                  const days = plan.id === '3day' ? 3 : plan.id === '1week' ? 5 : 10;
                  const price = subscription.mealsPerDay.length * 250 * days;
                  const selected = subscription.durationId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => onUpdate({ durationId: plan.id })}
                      className={`group rounded-xl text-left transition-all duration-300 transform px-4 py-6 relative ${
                        selected
                          ? 'bg-primary-container scale-105 ring-4 ring-primary shadow-2xl'
                          : 'bg-surface-container-low hover:bg-primary-container/20 border-2 border-transparent'
                      }`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-3 py-1 rounded-full font-black tracking-widest uppercase z-10">
                          {plan.badge}
                        </span>
                      )}
                      <span className="block text-sm font-label font-bold uppercase tracking-widest text-secondary mb-1">{plan.subtitle}</span>
                      <span className="block text-xl font-headline font-extrabold mb-3">{plan.name}</span>
                      <span className={`block text-2xl font-black font-headline ${selected ? 'text-on-primary-container' : 'text-on-surface'}`}>
                        ₹{price}
                      </span>
                      <span className="block text-xs text-on-surface-variant/60 font-medium mt-0.5">
                        ₹250 × {subscription.mealsPerDay.length} meal{subscription.mealsPerDay.length > 1 ? 's' : ''} × {days} days
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 3: Meals Per Day */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                <h2 className="text-2xl font-extrabold uppercase tracking-widest font-headline">Meals per day</h2>
              </div>
              <div className="space-y-4">
                {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map((meal) => {
                  const selected = subscription.mealsPerDay.includes(meal);
                  return (
                    <button 
                      key={meal}
                      onClick={() => toggleMeal(meal)}
                      className={`w-full flex items-center justify-between p-6 rounded-full group hover:scale-[1.01] transition-all ${
                        selected 
                          ? 'bg-primary-container text-on-primary-container shadow-md' 
                          : 'bg-surface-container opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <span className="material-symbols-outlined text-3xl">
                          {meal === 'Breakfast' ? 'breakfast_dining' : meal === 'Lunch' ? 'lunch_dining' : 'dinner_dining'}
                        </span>
                        <span className="text-2xl font-extrabold font-headline">{meal}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${selected ? 'border-on-secondary-container bg-on-primary-container' : 'border-outline-variant'}`}>
                        {selected && <span className="material-symbols-outlined text-lg text-primary-container font-black" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 4: Dietary Preference */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                <h2 className="text-2xl font-extrabold uppercase tracking-widest font-headline">Dietary Preference</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {['Vegetarian', 'Non-Vegetarian'].map(pref => (
                  <button 
                    key={pref}
                    onClick={() => onUpdate({ dietaryPreference: pref as any })}
                    className={`px-8 py-4 rounded-full font-bold border-2 transition-all whitespace-nowrap ${
                      subscription.dietaryPreference === pref 
                        ? 'border-primary bg-primary-container text-on-primary-container shadow-lg' 
                        : 'border-outline hover:border-primary opacity-60'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="bg-[#0f172a] text-surface rounded-xl p-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100%]"></div>
              <h2 className="text-3xl font-black font-headline tracking-tighter mb-8 border-b border-surface/10 pb-4 text-white italic">Plan Summary</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-3">
                  <span className="text-xs font-label font-bold uppercase tracking-widest text-slate-400">Primary Goal</span>
                  <span className="font-bold text-primary-fixed">{currentGoal?.name}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-3">
                  <span className="text-xs font-label font-bold uppercase tracking-widest text-slate-400">Daily Energy</span>
                  <span className="font-bold text-slate-100">{currentGoal?.kcal} kcal</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-3">
                  <span className="text-xs font-label font-bold uppercase tracking-widest text-slate-400">Preference</span>
                  <span className="font-bold text-slate-100">{subscription.dietaryPreference}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-3">
                  <span className="text-xs font-label font-bold uppercase tracking-widest text-slate-400">Weekly Meals</span>
                  <span className="font-bold text-slate-100">{subscription.mealsPerDay.length * 5} Meals</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-3">
                  <span className="text-xs font-label font-bold uppercase tracking-widest text-slate-400">Duration</span>
                  <span className="font-bold text-slate-100">{currentDuration?.name}</span>
                </div>

                <div className="pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold uppercase tracking-tighter text-slate-300">Total Investment</span>
                    <span className="text-4xl font-black text-primary-fixed font-headline drop-shadow-sm italic">₹{subscription.totalInvestment}</span>
                  </div>
                  <button 
                    onClick={onSubscribe}
                    className="w-full bg-primary-container text-on-primary-container py-6 rounded-full font-black text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 group"
                  >
                    Subscribe Now
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold">Inclusive of taxes & delivery</p>
                </div>
              </div>
            </div>

            <section className="bg-tertiary-container p-8 rounded-xl relative overflow-hidden group border border-tertiary/10">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-9xl">support_agent</span>
              </div>
              <p className="text-lg font-bold text-tertiary leading-tight pr-10">Customization available with free consultation</p>
              <button className="mt-4 text-tertiary underline font-extrabold flex items-center gap-2 group">
                Talk to Nutritionist <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </section>
          </aside>
        </div>
      </main>

      <footer className="bg-primary-container rounded-t-[3rem] mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-screen-2xl mx-auto">
          <div className="text-4xl font-black text-on-surface mb-8 md:mb-0 font-headline italic">Fitopus</div>
          <div className="flex flex-wrap justify-center gap-10 mb-8 md:mb-0">
            {['Community', 'Manifesto', 'Support', 'Privacy'].map(item => (
              <a key={item} className="font-headline font-extrabold uppercase tracking-widest text-on-surface opacity-80 hover:opacity-100 transition-opacity" href="#">{item}</a>
            ))}
          </div>
          <div className="font-headline font-extrabold uppercase tracking-widest text-on-surface text-xs opacity-60">
            © 2026 Fitopus. Radical Optimism in Every Bite.
          </div>
        </div>
      </footer>
    </div>
  );
}
