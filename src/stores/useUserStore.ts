import { create } from 'zustand';

export type UserStatsData = {
    gender: 'male' | 'female';
    age: number;
    height: number;
    weight: number;
    activity: string;
    goal: 'deficit' | 'balance' | 'surplus';
};

type UserState = {
    bmr: number | null;
    tdee: number | null;
    targetCalories: number | null; 
    hasData: boolean;
    calculateMetrics: (data: UserStatsData) => void;
    clearMetrics: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    bmr: null,
    tdee: null,
    targetCalories: null,
    hasData: false,

    calculateMetrics: (data) => {
        const weight = Number(data.weight);
        const height = Number(data.height);
        const age = Number(data.age);
        const activityMultiplier = Number(data.activity);

        //BMR here!!!
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        if (data.gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        //BASE
        const tdee = bmr * activityMultiplier;

        //CORRECT
        let targetCalories = tdee;
        if (data.goal === 'deficit') {
            targetCalories -= 500;
        } else if (data.goal === 'surplus') {
            targetCalories += 300;
        }

        set({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories: Math.round(targetCalories),
            hasData: true,
        });
    },

    clearMetrics: () => set({ bmr: null, tdee: null, targetCalories: null, hasData: false }),
}));
