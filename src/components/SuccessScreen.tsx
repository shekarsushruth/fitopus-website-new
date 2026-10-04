import { motion } from 'motion/react';

interface SuccessScreenProps {
  onBackHome: () => void;
}

export default function SuccessScreen({ onBackHome }: SuccessScreenProps) {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen relative flex flex-col p-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-primary rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-tertiary rounded-full blur-[100px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <nav className="w-full top-0 sticky z-50 glass-header border-b border-outline-variant/10 rounded-full mt-4 max-w-7xl mx-auto shadow-sm">
        <div className="flex justify-between items-center px-10 py-4">
          <div className="text-2xl font-black text-on-surface tracking-tighter italic font-headline">Fitopus</div>
          <button 
            onClick={onBackHome}
            className="font-headline font-bold text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Go back to Home
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-6 relative">
        <div className="max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/50 -z-10 rounded-full blur-2xl"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQipJmYVKndt-jIS8wTMhZHTGwGWBmcFheKovavM3sFq3QbZNlqwLewNUhcHLqZnpDeNMxfhh5udBe3iSZql0mINi95DYPIjAbQH-wAlvbrNpAl_xOqubIb57e2mwqkdDFFLSu2XXR24EtdpQ5AL2tZ9YiK2EuBq2WWYDYP2xunSJ9E03LqWxExlvk2WSzYsM60Fdju9HhXEH4rZ9qRTlpgLg5ipDheCkkeSUXJLbAPcjtpe5LUJiSbLqYuY9MCOYskN4HuVz7tq2w" 
              className="w-full rounded-[3rem] shadow-2xl rotate-3 transform-gpu border-8 border-white"
              alt="Elite Athlete"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 bg-black text-white p-6 rounded-2xl shadow-xl -rotate-6">
              <span className="material-symbols-outlined text-4xl block mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <p className="font-headline font-black text-xl tracking-widest uppercase">Welcome to the Fitopus Club</p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-extrabold text-on-surface leading-[0.8] mb-6 tracking-tight">
                WE'LL BE <br/> IN TOUCH <br/> <span className="text-secondary opacity-80 italic">SOON.</span>
              </h1>
              <p className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-sm">
                Your order is in — and we're already on it. Our team will reach out to you personally within 24 hours to confirm your plan, sort your preferences, and get your first delivery rolling. Good food is coming your way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4"
            >
              <button 
                onClick={onBackHome}
                className="bg-on-surface text-surface py-6 px-12 rounded-full font-headline font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest"
              >
                Go back to Home
              </button>
              <button className="bg-surface-container-high text-on-surface py-5 px-12 rounded-full font-headline font-bold text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                Join Community <span className="material-symbols-outlined">groups</span>
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-12 flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface/40">share</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface/40">qr_code_2</span>
          </div>
        </div>
        <p className="font-label uppercase tracking-[0.3em] font-black text-[10px] opacity-40">FITOPUS — GOOD FOOD, COMING YOUR WAY</p>
      </footer>
    </div>
  );
}
