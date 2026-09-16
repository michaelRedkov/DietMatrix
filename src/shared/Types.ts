export type UserStats = {
    gender: string;
    age: number;
    height: number;
    weight: number;
    activity: '1.2' | '1.375' | '1.55' | '1.725' | '1.9';
    goal: 'deficit' | 'balance' | 'surplus';
}