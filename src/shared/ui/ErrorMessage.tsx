import { TriangleAlert } from "lucide-react";

type TypeErrorMessage = {
    text?: string;
    isDisplaying: boolean;
}

const ErrorMessage = ({text, isDisplaying}:TypeErrorMessage) => {
    
    return (
        <>
            {isDisplaying ? (
                <div className='flex flex-row transition-all'>
                    <p className='mx-1 font-mono text-xs flex items-center gap-1 text-red-400 animate-pulse'>
                        <TriangleAlert size={12} />
                        {text}
                    </p>
                </div>
            ) : ''}
        </>
    )
}

export default ErrorMessage