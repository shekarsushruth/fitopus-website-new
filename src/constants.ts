import { PlanDuration, PrimaryGoal } from './types';

export const PLAN_DURATIONS: PlanDuration[] = [
  { id: '3day', name: '3 Day Trial', subtitle: 'Short Term' },
  { id: '1week', name: '1 Week (MON-FRI)', subtitle: 'Kickstart', badge: 'MOST POPULAR' },
  { id: '2week', name: '2 Weeks (MON-FRI)', subtitle: 'Transformation' },
];

export const PRIMARY_GOALS: PrimaryGoal[] = [
  { 
    id: 'loss', 
    name: 'Weight Loss', 
    kcal: 1200, 
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQipJmYVKndt-jIS8wTMhZHTGwGWBmcFheKovavM3sFq3QbZNlqwLewNUhcHLqZnpDeNMxfhh5udBe3iSZql0mINi95DYPIjAbQH-wAlvbrNpAl_xOqubIb57e2mwqkdDFFLSu2XXR24EtdpQ5AL2tZ9YiK2EuBq2WWYDYP2xunSJ9E03LqWxExlvk2WSzYsM60Fdju9HhXEH4rZ9qRTlpgLg5ipDheCkkeSUXJLbAPcjtpe5LUJiSbLqYuY9MCOYskN4HuVz7tq2w',
    description: 'Calorie-conscious, nutrient-dense meals.'
  },
  { 
    id: 'gain', 
    name: 'Muscle Gain', 
    kcal: 2500, 
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnwbOUKWNRqXKbiDzM6m_ffMKTdakLS42czXxbHrbB8QFTuS_eCAC5afUyDzwny2Cn5HUth_z055VLwYYn94ubK7vZYbdy4vdemElah4EbEt4i4d2s_kcnM6aEP9yaV8laWSg4UA7kdetubk-EisGKZ-UjaCymxL7ac8TZnECgHVr1-ijbM33qd8VGD_HN4vIxyWdB4v8bWexPivn2HAZM_fNsKxgXERiiKynt2l3y0_nv1CpH1IB3MfHpi2jLToiUeQhGhufrK_DS',
    description: 'Protein-heavy fuel for the grinders.'
  },
  { 
    id: 'balanced', 
    name: 'Balanced Diet', 
    kcal: 1800, 
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbuT-LZ4rQ54GJYXduSMVOvxaLEbu-xZk3mD-uYLl2NagMVCCqlxJdilBAd4KTGtWiQ6xWpv9Lr_dLEPaledlTK_Uust6WXFQLaIqxaUowUqvP5mARAcwePo4dWVKgfkZ0cQSLPdRGjx2Nx8hFDdmrLw6nUQcte-GS8NngJfwjsK9RRAJ_JZMeu68c1tMP5EGpGFzc7dV0oUpH-E5yQkIn3KR-OO_7lbjzjOZ3ceCdu_wG0Y-TydMNNADgwQ0fHATIKRxJQ7FOhKB2',
    description: 'Sustainable eating for everyday life.'
  },
];
