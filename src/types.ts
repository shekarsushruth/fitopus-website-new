export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export interface PlanDuration {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
}

export interface PrimaryGoal {
  id: string;
  name: string;
  kcal: number;
  imageUrl: string;
  description: string;
}

export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  email?: string;
}

export interface Subscription {
  durationId: string;
  mealsPerDay: MealType[];
  dietaryPreference: 'Vegetarian' | 'Non-Vegetarian';
  primaryGoalId: string;
  totalInvestment: number;
  status: 'draft' | 'active' | 'completed';
}

export interface AppState {
  step: 'landing' | 'builder' | 'auth' | 'success' | 'menu';
  userProfile: UserProfile | null;
  subscription: Subscription;
}
