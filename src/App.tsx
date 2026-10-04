/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { db, testFirestoreConnection } from './lib/firebase';
import { AppState, Subscription, UserProfile } from './types';
import LandingScreen from './components/LandingScreen';
import BuilderScreen from './components/BuilderScreen';
import AuthScreen from './components/AuthScreen';
import SuccessScreen from './components/SuccessScreen';
import MenuScreen from './components/MenuScreen';

const DURATION_DAYS: Record<string, number> = { '3day': 3, '1week': 5, '2week': 10 };

const calcInvestment = (durationId: string, mealsPerDay: string[]) =>
  250 * mealsPerDay.length * (DURATION_DAYS[durationId] ?? 5);

const INITIAL_SUBSCRIPTION: Subscription = {
  durationId: '1week',
  mealsPerDay: ['Breakfast', 'Dinner'],
  dietaryPreference: 'Vegetarian',
  primaryGoalId: 'loss',
  totalInvestment: calcInvestment('1week', ['Breakfast', 'Dinner']),
  status: 'draft'
};

export default function App() {
  const [state, setState] = useState<AppState>({
    step: 'landing',
    userProfile: null,
    subscription: INITIAL_SUBSCRIPTION
  });

  useEffect(() => {
    testFirestoreConnection();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.step]);

  const navigate = (step: AppState['step']) => setState(prev => ({ ...prev, step }));
  
  const updateSubscription = (sub: Partial<Subscription>) => {
    setState(prev => {
      const updated = { ...prev.subscription, ...sub };
      updated.totalInvestment = calcInvestment(updated.durationId, updated.mealsPerDay);
      return { ...prev, subscription: updated };
    });
  };

  const updateProfile = (profile: UserProfile) => {
    setState(prev => ({ ...prev, userProfile: profile }));
  };

  return (
    <div className="min-h-screen">
      {state.step === 'landing' && (
        <LandingScreen 
          onGetStarted={(goalId) => {
            if (goalId) {
              updateSubscription({ primaryGoalId: goalId });
            }
            navigate('builder');
          }} 
          onViewMenu={() => navigate('menu')}
        />
      )}
      {state.step === 'builder' && (
        <BuilderScreen 
          subscription={state.subscription}
          onUpdate={updateSubscription}
          onSubscribe={() => navigate('auth')}
          onViewMenu={() => navigate('menu')}
        />
      )}
      {state.step === 'menu' && (
        <MenuScreen
          onBack={() => navigate('landing')}
          onSelectPlan={() => navigate('builder')}
        />
      )}
      {state.step === 'auth' && (
        <AuthScreen 
          subscription={state.subscription}
          onProfileSubmit={(profile) => {
            updateProfile(profile);
            navigate('success');
          }}
          onViewMenu={() => navigate('menu')}
        />
      )}
      {state.step === 'success' && (
        <SuccessScreen 
          onBackHome={() => navigate('landing')}
        />
      )}
    </div>
  );
}
