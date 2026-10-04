import React, { useState } from 'react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile, Subscription } from '../types';

interface AuthScreenProps {
  subscription: Subscription;
  onProfileSubmit: (profile: UserProfile) => void;
  onViewMenu: () => void;
}

export default function AuthScreen({ subscription, onProfileSubmit, onViewMenu }: AuthScreenProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;
    
    setIsSubmitting(true);
    try {
      // Save lead (profile + subscription)
      await addDoc(collection(db, 'leads'), {
        profile: {
          fullName,
          phoneNumber: phone,
          email,
        },
        subscription: {
          ...subscription,
          status: 'active',
          updatedAt: serverTimestamp()
        },
        submittedAt: serverTimestamp()
      });

      onProfileSubmit({ fullName, phoneNumber: phone, email });
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
      <header className="w-full top-0 sticky z-50 glass-header border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl italic text-on-surface tracking-tighter font-headline font-bold">Fitopus</div>
          <div className="hidden md:flex gap-8 items-center">
            <button 
              onClick={onViewMenu}
              className="text-on-surface/60 font-medium hover:opacity-100 transition-opacity"
            >
              Menu
            </button>
            <a className="text-on-surface/60 font-medium hover:opacity-100 transition-opacity" href="#">Philosophy</a>
            <a className="text-on-surface/60 font-medium hover:opacity-100 transition-opacity" href="#">Athletes</a>
            <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold scale-105 shadow-sm">Get started</button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[100px] -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full relative"
        >
          <div className="p-8 md:p-12 rounded-3xl border border-outline-variant/10 relative z-20 bg-[#FFFBF0] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-display font-extrabold tracking-tight uppercase text-on-surface">Enter your details</h2>
              <p className="text-on-surface-variant mt-3 text-lg font-medium">Enter your credentials to begin the journey.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-4">Full Name</label>
                <input 
                  className="w-full px-6 py-4 rounded-full border-2 border-transparent bg-white focus:border-primary focus:ring-0 transition-all placeholder:text-on-surface/30 shadow-sm"
                  placeholder="Alexander Vance"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-4">Phone Number</label>
                <input 
                  className="w-full px-6 py-4 rounded-full border-2 border-transparent bg-white focus:border-primary focus:ring-0 transition-all placeholder:text-on-surface/30 shadow-sm"
                  placeholder="+91 98765 43210"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-4">Email Address</label>
                <input
                  className="w-full px-6 py-4 rounded-full border-2 border-transparent bg-white focus:border-primary focus:ring-0 transition-all placeholder:text-on-surface/30 shadow-sm"
                  placeholder="elite@fitopus.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>

              <div className="pt-6">
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-primary-container text-on-primary-container py-5 rounded-full font-black text-xl tracking-widest shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 uppercase disabled:opacity-50"
                  type="submit"
                >
                  {isSubmitting ? 'Processing...' : "Let's Go →"}
                </button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-center gap-4 text-on-surface-variant">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-primary/20"></div>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-wide">Joined by 12,000+ elite athletes</span>
            </div>
          </div>

          <div className="absolute -top-6 -right-6 w-20 h-20 bg-tertiary-container rounded-full flex items-center justify-center -rotate-12 z-30 shadow-lg hidden md:flex">
            <span className="material-symbols-outlined text-3xl text-on-tertiary-container font-black" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </motion.div>
      </main>

      <footer className="w-full py-12 bg-primary-container text-on-surface-container">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-6 max-w-7xl mx-auto">
          <div className="font-black italic text-on-surface text-xl font-headline tracking-tighter">Fitopus</div>
          <div className="flex gap-8 font-label text-sm tracking-wide uppercase font-bold">
            <a className="hover:text-secondary transition-colors" href="#">Privacy</a>
            <a className="hover:text-secondary transition-colors" href="#">Terms</a>
            <a className="hover:text-secondary transition-colors" href="#">Contact</a>
          </div>
          <p className="font-label text-sm tracking-wide uppercase opacity-70 font-medium">
            © 2026 Fitopus. Define Your Elite.
          </p>
        </div>
      </footer>
    </div>
  );
}
