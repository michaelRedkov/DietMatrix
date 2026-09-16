import { useForm } from 'react-hook-form';
import { Salad } from 'lucide-react';
import ErrorMessage from '../../shared/ui/ErrorMessage';
import ToggleThemeBtn from '../../shared/ui/ToggleThemeBtn';
import { useUserStore, type UserStatsData } from '../../stores/useUserStore';


const UserStatsComp = () => {

    const bmr = useUserStore((state) => state.bmr);
    const targetCalories = useUserStore((state) => state.targetCalories);
    const calculateMetrics = useUserStore((state) => state.calculateMetrics);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserStatsData>({
        mode: "all"
    })
    //!!!
    const onSubmit = (data: UserStatsData) => {
        calculateMetrics(data)
        //Calculate!!
    }

    return (
        <div className="blockContainer">

            <ToggleThemeBtn />

            <p className="my-4 max-w-90"><span className='text-chart-3 font-bold'>TDEE</span> ー total number of calories your body burns in 24 hours, including all your daily activities, workouts, and basic bodily functions.</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col border-t border-border '>

                <label
                    className='formField'>
                    Gender:
                    <select {...register('gender')} className='inputField'>
                        <option value="male">
                            Male
                        </option>
                        <option value="female">
                            Female
                        </option>
                    </select>
                </label>

                <label
                    className='formField'>
                    Age:
                    <input {...register('age', {
                        required: 'Age is required',
                    })}
                        type="number" className='inputField' />
                    <ErrorMessage
                        isDisplaying={!!errors?.age}
                        text={errors?.age?.message}
                    />
                </label>


                <label
                    className='formField'>
                    Height:
                    <input {...register('height', {
                        required: 'Height is required',
                        min: { value: 75, message: 'Too short' } // Для чисел лучше использовать min вместо minLength
                    })}
                        placeholder='cm'
                        type="number" className='inputField' />
                    <ErrorMessage
                        isDisplaying={!!errors?.height}
                        text={errors?.height?.message}
                    />
                </label>


                <label
                    className='formField'>
                    Weight:
                    <input {...register('weight', {
                        required: 'Weight is required',
                        min: { value: 25, message: 'Too light' }
                    })}
                        placeholder='kg'
                        type="number" className='inputField' />
                    <ErrorMessage
                        isDisplaying={!!errors?.weight}
                        text={errors?.weight?.message}
                    />
                </label>


                <label
                    className='formField'>
                    Activity:
                    <select {...register('activity')}
                        className='inputField'>
                        <option value="1.2">Sedentary</option>
                        <option value="1.375">Light</option>
                        <option value="1.55">Moderate</option>
                        <option value="1.725">High</option>
                        <option value="1.9">Extreme</option>
                    </select>
                    <ErrorMessage
                        isDisplaying={!!errors?.activity}
                        text={errors?.activity?.message}
                    />
                </label>

                <label
                    className='formField'>
                    Goal:
                    <select {...register('goal')}
                        className='inputField'>
                        <option value="deficit">Deficit</option>
                        <option value="balance">Balance</option>
                        <option value="surplus">Surplus</option>
                    </select>
                </label>

                <button type="submit" disabled={isSubmitting} className='submitBtn group'>
                    Calculate
                </button>
            </form>

            <hr className=' text-primary px-2' />

            {targetCalories !== null && (

                <div className=" m-2 p-3 bg-secondary text-muted-foreground rounded-md border border-border">
                    <p className="text-sm uppercase tracking-wider">Your Target Daily Calories: </p>
                    <p className="flex justify-center w-fit px-2 items-center bg-primary rounded-4xl text-muted font-extrabold mt-1 shadow-md">
                        <Salad size={20} className='-rotate-15' />
                        {targetCalories} kcal
                    </p>
                    <p className='text-xs font-light lowercase'>Basal Metabolic Rate: {bmr} kcal</p>
                </div>
            )}
        </div>
    )
}

export default UserStatsComp

