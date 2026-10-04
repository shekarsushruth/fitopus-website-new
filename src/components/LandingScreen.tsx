import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface LandingScreenProps {
  onGetStarted: (goalId?: string) => void;
  onViewMenu: () => void;
}

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary',
  light: 'Lightly Active',
  moderate: 'Moderately Active',
  active: 'Very Active',
};

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

function calcCalories(age: number, weight: number, height: number, gender: Gender, activity: ActivityLevel) {
  // Mifflin-St Jeor BMR
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);
  return {
    maintain: tdee,
    lose: tdee - 500,
    gain: tdee + 300,
  };
}

export default function LandingScreen({ onGetStarted, onViewMenu }: LandingScreenProps) {
  const [calcAge, setCalcAge] = useState('');
  const [calcWeight, setCalcWeight] = useState('');
  const [calcHeight, setCalcHeight] = useState('');
  const [calcGender, setCalcGender] = useState<Gender>('male');
  const [calcActivity, setCalcActivity] = useState<ActivityLevel>('moderate');
  const [calcResult, setCalcResult] = useState<{ maintain: number; lose: number; gain: number } | null>(null);
  const [calcError, setCalcError] = useState('');

  function handleCalc() {
    const age = parseInt(calcAge);
    const weight = parseFloat(calcWeight);
    const height = parseFloat(calcHeight);

    if (!calcAge || !calcWeight || !calcHeight || isNaN(age) || isNaN(weight) || isNaN(height)) {
      setCalcError('Please fill in all fields with valid numbers.');
      return;
    }
    if (age < 10 || age > 100) { setCalcError('Age must be between 10 and 100.'); return; }
    if (weight < 20 || weight > 300) { setCalcError('Enter a valid weight (20–300 kg).'); return; }
    if (height < 100 || height > 250) { setCalcError('Enter a valid height (100–250 cm).'); return; }

    setCalcError('');
    setCalcResult(calcCalories(age, weight, height, calcGender, calcActivity));
  }

  return (
    <div className="bg-surface text-on-surface font-body overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="w-full top-0 sticky z-50 glass-header border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-8 py-6 max-w-[1440px] mx-auto">
          <div className="text-3xl font-black text-on-surface italic font-headline tracking-tight">
            Fitopus
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a className="text-primary border-b-4 border-primary-container pb-1 font-headline font-bold tracking-tight hover:scale-105 transition-transform duration-200" href="#">Home</a>
            <button 
              onClick={onViewMenu}
              className="text-on-surface opacity-80 font-headline font-bold tracking-tight hover:scale-105 hover:text-secondary transition-transform duration-200"
            >
              Menu
            </button>
            <a className="text-on-surface opacity-80 font-headline font-bold tracking-tight hover:scale-105 hover:text-secondary transition-transform duration-200" href="#">Community</a>
            <a className="text-on-surface opacity-80 font-headline font-bold tracking-tight hover:scale-105 hover:text-secondary transition-transform duration-200" href="#">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onGetStarted()}
              className="bg-primary-container text-on-primary-container font-headline font-bold px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary-container pt-16 pb-12 md:pb-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 mb-6 rounded-full bg-tertiary-container text-on-tertiary-container font-label text-xs tracking-widest uppercase font-bold -rotate-2">
                The Future of Fitness
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-extrabold text-on-surface leading-[0.9] tracking-tighter mb-8">
                Healthy Meals, <br/> 
                <span className="text-secondary italic">Delivered Daily</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mb-10 font-medium leading-relaxed">
                Ditch the prep, keep the vibe. Chef-crafted nutrition tailored to your goals, delivered right to your doorstep.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onGetStarted()}
                  className="bg-on-surface text-surface py-5 px-10 rounded-full font-headline font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Get Started
                </button>
                <button
                  onClick={onViewMenu}
                  className="text-on-surface font-headline font-bold text-lg underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
                >
                  View Menu
                </button>
              </div>
              <p className="mt-4 text-sm text-on-surface-variant/80 font-medium">Starting from <span className="font-black text-on-surface">₹250/meal</span> · No lock-in</p>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary rounded-full opacity-30 blur-2xl"></div>
              <div className="relative bg-surface rounded-xl p-4 shadow-2xl rotate-3 transform-gpu">
                <img
                  alt="Healthy Bowl"
                  className="rounded-lg w-full h-[280px] md:h-[500px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxEm-y1dx74wN66Um8aVLNfNNrcuJ-iqRcfqazo8b_sgNHcKI3rZjnJY7TD8pOooWEahlUBvNrz-cXW0Od3X-TXDRfzTAQ7Hi28AxUQD1U-vljPOW95P1h3IFGzqLTebo9uU73zIDnN8r4eu8hR8Ak-Q1KLOPdFQhJiogXBCcNpRl-nvkWqkqEsSuaMItnfghJKSaxDMj-SOud96rJSWaoT6kTzNSCgzgf_9pLWkD-F5DmKyf0ZAE6IJe0X_-A9L9f_fVWt9IXxZYZ"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-headline font-black mb-4">Simple as Pie.</h2>
              <p className="text-on-surface-variant text-lg">But, you know, healthy pie.</p>
            </div>
            <div className="relative grid md:grid-cols-3 gap-6">
              {/* connecting line on desktop */}
              <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-outline-variant/40 z-0" />
              {[
                { icon: 'restaurant', title: 'Pick Your Plan', desc: 'Choose from Weight Loss, Muscle Gain, or Balanced vibes. Whatever fuels your fire.', color: 'bg-secondary-container', iconColor: 'text-secondary' },
                { icon: 'timer', title: 'We Cook & Pack', desc: 'Our chefs whip up fresh, locally sourced ingredients daily. No preservatives, just joy.', color: 'bg-primary-container', iconColor: 'text-primary' },
                { icon: 'local_shipping', title: 'Daily Delivery', desc: 'Fresh meals arrive at your door every morning. Ready to eat when you are.', color: 'bg-tertiary-container', iconColor: 'text-tertiary' }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 p-8 rounded-xl bg-surface-container-low flex flex-col items-center text-center hover:translate-y-[-6px] transition-transform shadow-sm"
                >
                  <span className="text-xs font-headline font-black tracking-widest text-on-surface-variant/50 mb-3">0{i + 1}</span>
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-6`}>
                    <span className={`material-symbols-outlined ${step.iconColor} text-3xl`}>{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-3">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Calorie Calculator */}
        <section className="py-14 px-6 bg-surface">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs tracking-widest uppercase font-bold">
                Free Tool
              </span>
              <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tight">
                What does your <span className="text-secondary italic">body need?</span>
              </h2>
              <p className="mt-3 text-on-surface-variant text-lg max-w-xl mx-auto">
                Find your daily calorie target in seconds — no sign-up needed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface-container-low rounded-2xl p-6 md:p-10 shadow-sm"
            >
              {/* Gender toggle */}
              <div className="mb-6">
                <p className="text-sm font-headline font-bold text-on-surface-variant mb-2 uppercase tracking-widest">I am</p>
                <div className="flex gap-3">
                  {(['male', 'female'] as Gender[]).map(g => (
                    <button
                      key={g}
                      onClick={() => setCalcGender(g)}
                      className={`flex-1 py-3 rounded-xl font-headline font-bold text-sm capitalize transition-all ${
                        calcGender === g
                          ? 'bg-on-surface text-surface shadow-md scale-[1.02]'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      <span className="material-symbols-outlined align-middle mr-1 text-base">
                        {g === 'male' ? 'man' : 'woman'}
                      </span>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Numeric inputs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Age', unit: 'yrs', value: calcAge, set: setCalcAge, placeholder: '25' },
                  { label: 'Weight', unit: 'kg', value: calcWeight, set: setCalcWeight, placeholder: '70' },
                  { label: 'Height', unit: 'cm', value: calcHeight, set: setCalcHeight, placeholder: '170' },
                ].map(({ label, unit, value, set, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">{label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder={placeholder}
                        value={value}
                        onChange={e => set(e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 font-headline font-bold text-lg text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant/50">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity level */}
              <div className="mb-8">
                <p className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-3">Activity Level</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setCalcActivity(lvl)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-headline font-bold transition-all ${
                        calcActivity === lvl
                          ? 'bg-primary-container text-on-primary-container shadow-sm scale-[1.03]'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {ACTIVITY_LABELS[lvl]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {calcError && (
                <p className="text-sm text-red-500 font-medium mb-4 text-center">{calcError}</p>
              )}

              {/* Calculate button */}
              <button
                onClick={handleCalc}
                className="w-full bg-on-surface text-surface font-headline font-black text-lg py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
              >
                Calculate My Calories
              </button>

              {/* Result */}
              <AnimatePresence>
                {calcResult && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 pt-8 border-t border-outline-variant/30"
                  >
                    <p className="text-center text-sm font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-5">
                      Your Daily Calorie Targets
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Lose Weight', kcal: calcResult.lose, color: 'bg-secondary-container', textColor: 'text-secondary', icon: 'trending_down' },
                        { label: 'Maintain', kcal: calcResult.maintain, color: 'bg-primary-container', textColor: 'text-primary', icon: 'balance' },
                        { label: 'Build Muscle', kcal: calcResult.gain, color: 'bg-tertiary-container', textColor: 'text-tertiary', icon: 'trending_up' },
                      ].map(({ label, kcal, color, textColor, icon }) => (
                        <div key={label} className={`${color} rounded-xl p-4 text-center`}>
                          <span className={`material-symbols-outlined ${textColor} text-2xl`}>{icon}</span>
                          <p className="text-2xl font-headline font-black text-on-surface mt-1">{kcal.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">kcal / day</p>
                          <p className="text-xs font-headline font-bold text-on-surface mt-2">{label}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => onGetStarted()}
                      className="w-full bg-primary-container text-on-primary-container font-headline font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm"
                    >
                      Build a plan around this →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-6 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span className="font-label uppercase tracking-widest text-secondary font-bold">Categories</span>
              <h2 className="text-4xl md:text-6xl font-headline font-black mt-2">Pick your <span className="text-primary italic">plan.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'loss', title: 'Weight Loss', desc: 'Calorie-conscious, nutrient-dense meals.', img: '/weight-loss.jpg', badge: 'NEW' },
                { id: 'gain', title: 'Muscle Gain', desc: 'Protein-heavy fuel for the grinders.', img: '/muscle-gain.jpg' },
                { id: 'balanced', title: 'Balanced Diet', desc: 'Sustainable eating for everyday life.', img: 'https://plus.unsplash.com/premium_photo-1701113208728-51959e2d8834?w=800&h=500&fit=crop&q=80' }
              ].map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => onGetStarted(cat.id)}
                  className="group relative overflow-hidden rounded-xl bg-surface-container-highest h-[500px] shadow-lg cursor-pointer"
                >
                  <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-10 flex flex-col items-center text-center px-10 text-white">
                    <h3 className="text-4xl font-headline font-semibold mb-2">{cat.title}</h3>
                    <p className="text-lg opacity-90">{cat.desc}</p>
                  </div>
                  {cat.badge && (
                    <div className="absolute top-8 right-8 rotate-12">
                      <span className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-headline font-bold shadow-lg">{cat.badge}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 px-6 bg-surface overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-4xl md:text-7xl font-headline font-black tracking-tighter uppercase italic drop-shadow-sm">Real Talk.</h2>
              <p className="text-xl text-on-surface-variant">Hear it from the community.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {[
                { 
                  bg: 'bg-primary-container', 
                  text: 'on-surface', 
                  quote: '"Finally, a meal service that doesn\'t taste like cardboard. The flavors are actually insane."', 
                  author: 'Jordan L.', 
                  role: 'Graphic Designer', 
                  rotate: '-rotate-2',
                  img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop'
                },
                { 
                  bg: 'bg-secondary-container', 
                  text: 'on-secondary-container', 
                  quote: '"Muscle gain without the chicken-and-rice burnout. Fitopus is literally a cheat code."', 
                  author: 'Marcus T.', 
                  role: 'Personal Trainer', 
                  rotate: 'rotate-1',
                  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop'
                },
                { 
                  bg: 'bg-surface-variant', 
                  text: 'on-tertiary-container', 
                  quote: '"The convenience is life-changing, but the taste is what keeps me here. Every meal feels like a treat."', 
                  author: 'Sarah K.', 
                  role: 'Yoga Instructor', 
                  rotate: '-rotate-1',
                  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop'
                }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`w-full p-10 ${t.bg} rounded-xl ${t.rotate} shadow-lg flex flex-col h-full`}
                >
                  <div className="flex gap-0.5 mb-6">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-xl text-${t.text}`}>★</span>
                    ))}
                  </div>
                  <p className={`text-2xl font-headline font-bold text-${t.text} mb-8 italic flex-grow leading-tight`}>{t.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface flex-shrink-0 border-2 border-white/20">
                      <img src={t.img} alt={t.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className={`font-bold text-${t.text}`}>{t.author}</p>
                      <p className={`text-sm opacity-70 text-${t.text}`}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto bg-tertiary text-surface rounded-xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none select-none">
              <div className="absolute top-6 left-6 text-[8rem] font-black rotate-[-12deg] font-headline leading-none">YUM</div>
              <div className="absolute bottom-6 right-6 text-[8rem] font-black rotate-[12deg] font-headline leading-none">FRESH</div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-headline font-black mb-8 leading-tight">Ready to fuel <br/> your vibe?</h2>
              <p className="text-xl mb-12 opacity-90 max-w-lg mx-auto font-medium">Join 10k+ people eating better every single day. First week is 20% off.</p>
              <button 
                onClick={() => onGetStarted()}
                className="bg-primary-container text-on-primary-container text-xl font-headline font-black py-6 px-16 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(254,231,5,0.3)]"
              >
                START YOUR SUBSCRIPTION
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="w-full rounded-t-[3rem] mt-8 bg-primary-container text-on-surface">
        <div className="flex flex-col items-center justify-center p-10 w-full text-center">
          <div className="text-4xl font-black mb-4 font-headline italic tracking-tighter">Fitopus</div>
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            {['Manifesto', 'Privacy Policy', 'Terms of Vibes', 'Contact Us'].map(l => (
              <a key={l} className="font-label uppercase tracking-widest text-xs font-bold hover:tracking-[0.15em] transition-all opacity-70 hover:opacity-100" href="#">{l}</a>
            ))}
          </div>
          <p className="font-label uppercase tracking-widest text-[10px] opacity-60">
            © 2026 Fitopus. Stay Kinetic. Stay Joyful.
          </p>
        </div>
      </footer>
    </div>
  );
}
