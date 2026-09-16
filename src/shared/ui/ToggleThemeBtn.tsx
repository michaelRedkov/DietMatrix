import { Moon } from "lucide-react"
import { useTheme } from "../../app/useTheme"

const ToggleThemeBtn = () => {
    const {toggleTheme, isDark} = useTheme()
    return (
        <button className={`border border-border group transition-all
            hover:shadow hover:bg-border hover:border-muted-foreground cursor-pointer
            rounded-md p-1 
            ${isDark ? 'text-primary' : ''}`} 
        onClick={toggleTheme}>
            <Moon size={32} className="group-hover:fill-secondary"/>
        </button>
    )
}

export default ToggleThemeBtn