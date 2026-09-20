import { X } from "lucide-react";
import { useProductStore } from "../../stores/useProductStore";

type TypeProductItem = {
    id: string;
    name: string;
    price: number;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;

    onEdit: () => void;
}

const ProductItem = ({ name, price, calories, proteins, fats, carbs, id, onEdit }: TypeProductItem) => {

    const {removeProduct} = useProductStore()

    const characteristics = [
        { label: 'calories', value: calories },
        { label: 'proteins', value: proteins },
        { label: 'fats', value: fats },
        { label: 'carbs', value: carbs },
    ];

    return (
    <div
    onClick={onEdit} 
    title={name}
    className="relative grid grid-cols-[1fr_auto] items-center gap-y-2 bg-secondary cursor-pointer
    border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all my-2 sm:flex sm:justify-between">
      
      <span className="absolute font-light text-[10px] text-chart-3 -top-2.5 left-4 bg-secondary rounded-full px-2 border border-border shadow select-none">
        {price} <span className="not-italic">₽</span> / g
      </span>

      <h3 className="font-mono text-sm font-semibold truncate pr-2 min-w-20 max-w-20 sm:max-w-20">
        {name}
      </h3>

      <ul className="col-span-2 flex items-center justify-between bg-background/40 rounded-xl p-2 sm:col-span-1 sm:flex-1 sm:bg-transparent sm:p-0 sm:justify-end">
        {characteristics.map((c, index) => (
          <li 
            key={index} 
            className="flex-1 text-center border-r border-border last:border-r-0 px-1 sm:flex-none sm:min-w-16 sm:px-2"
          >
            <span className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{c.label}</span>
              <span className="font-mono text-xs font-bold whitespace-nowrap">{c.value}</span>
            </span>
          </li>
        ))}
      </ul>

      <button 
        type="button" 
        onClick={(e) => {
            e.stopPropagation();
            removeProduct(id)
        }}
        className="row-start-1 col-start-2 justify-self-end flex justify-center items-center cursor-pointer group rounded-xl w-8 h-8 min-w-8 border border-border hover:text-black hover:bg-red-500 hover:border-destructive transition-colors sm:static"
        aria-label={`delete ${name}`}
      >
        <X className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
      </button>
    </div>
  );
}

export default ProductItem