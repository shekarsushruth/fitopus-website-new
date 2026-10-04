import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MealType } from '../types';

interface MenuItem {
  title: string;
  category: MealType;
  image: string;
  tags: string[];
}

const MENU_DATA: MenuItem[] = [
  // Breakfast
  { title: 'Moong Keema Dosa', category: 'Breakfast', image: 'https://picsum.photos/seed/dosa/800/600', tags: ['High Protein', 'Gluten Free'] },
  { title: 'Chicken/Paneer Tikka Sandwich', category: 'Breakfast', image: 'https://picsum.photos/seed/sandwich/800/600', tags: ['High Protein'] },
  { title: 'Chocolate Oats Pancake', category: 'Breakfast', image: 'https://picsum.photos/seed/pancake/800/600', tags: ['Indulgent'] },
  { title: 'Chocolate Smoothie + Eggs/Paneer', category: 'Breakfast', image: 'https://picsum.photos/seed/smoothie/800/600', tags: ['Refreshing'] },
  { title: 'Chicken/Paneer Cheela', category: 'Breakfast', image: 'https://picsum.photos/seed/cheela/800/600', tags: ['High Protein'] },
  
  // Lunch
  { title: 'Paneer/Chicken Fried Rice', category: 'Lunch', image: 'https://picsum.photos/seed/friedrice/800/600', tags: ['Balanced'] },
  { title: 'Mexican Rice with Mushrooms', category: 'Lunch', image: 'https://picsum.photos/seed/mexican/800/600', tags: ['Spicy'] },
  { title: 'Veg Pulav + Palak Curry', category: 'Lunch', image: 'https://picsum.photos/seed/pulav/800/600', tags: ['Traditional'] },
  { title: 'Spinach Corn Rice with Veggies', category: 'Lunch', image: 'https://picsum.photos/seed/spinach/800/600', tags: ['Fiber Rich'] },
  { title: 'Ghee Rice + Kurma + Stew', category: 'Lunch', image: 'https://picsum.photos/seed/stew/800/600', tags: ['Aromatic'] },
  
  // Dinner
  { title: 'Chicken/Paneer Peri Peri Wrap', category: 'Dinner', image: 'https://picsum.photos/seed/wrap/800/600', tags: ['Zesty'] },
  { title: 'Broccoli Chicken/Tofu Pasta', category: 'Dinner', image: 'https://picsum.photos/seed/pasta/800/600', tags: ['Comfort Food'] },
  { title: 'Ranch Salad Bowl', category: 'Dinner', image: 'https://picsum.photos/seed/salad/800/600', tags: ['Fresh'] },
  { title: 'Loaded Veggies Crepe', category: 'Dinner', image: 'https://picsum.photos/seed/vegcrepe/800/600', tags: ['Veggie Loaded'] },
  { title: 'High Protein Garlic Toast', category: 'Dinner', image: 'https://picsum.photos/seed/toast/800/600', tags: ['Quick Bite'] },
];

interface MenuScreenProps {
  onBack: () => void;
  onSelectPlan: () => void;
}

export default function MenuScreen({ onBack, onSelectPlan }: MenuScreenProps) {
  const [activeTab, setActiveTab] = useState<MealType>('Breakfast');

  const filteredItems = MENU_DATA.filter(item => item.category === activeTab);

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass-header border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 md:px-10 py-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="text-2xl md:text-3xl font-black text-primary tracking-tighter font-headline italic leading-none">Fitopus</div>
          </div>
          <button 
            onClick={onSelectPlan}
            className="bg-primary text-on-primary px-6 md:px-8 py-2 md:py-3 rounded-full font-bold shadow-lg text-sm md:text-base"
          >
            Start Subscription
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-label uppercase tracking-[0.2em] text-secondary font-bold text-sm">Chef's Selection</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-headline mt-2 mb-6">
              Flavor without <span className="text-primary italic">Friction.</span>
            </h1>
          </motion.div>

          <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
            {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-full font-headline font-bold text-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-primary-container text-on-primary-container shadow-md scale-105' 
                    : 'bg-surface-container-low text-on-surface-variant opacity-60 hover:opacity-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-surface-container rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black font-headline leading-tight mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-secondary font-label font-bold text-xs uppercase tracking-widest mt-4">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Nutritionally Optimized
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <section className="mt-32 p-12 bg-[#0f172a] rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <span className="material-symbols-outlined text-[30rem] absolute -top-40 -left-20">restaurant</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-black mb-6">Can't decide?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">Our nutritionists can help pick the perfect plan based on your metabolism and activity level.</p>
            <button className="bg-primary-container text-on-primary-container font-headline font-black py-6 px-12 rounded-full text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              Schedule Free Consultation
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-low pt-20 pb-10 px-8 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-3xl font-black font-headline italic text-primary">Fitopus</div>
          <div className="flex gap-8">
            {['Instagram', 'Twitter', 'Manifesto'].map(social => (
              <a key={social} href="#" className="font-label uppercase tracking-widest text-xs font-bold opacity-60 hover:opacity-100 transition-opacity">{social}</a>
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">© 2026 Fitopus</p>
        </div>
      </footer>
    </div>
  );
}
