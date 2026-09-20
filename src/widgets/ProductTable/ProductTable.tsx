import { Plus, Trash } from "lucide-react";
import ProductItem from "../../shared/ui/ProductItem";
import { useProductStore, type Product } from "../../stores/useProductStore";
import { useRef, useState } from "react";
import ProductModalForm from "../ProductModalForm/ProductModalForm";
import { useUserStore } from "../../stores/useUserStore";

type MacroStrategy = {
    cost: number;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    volume: number;
};

const ProductTable = () => {

    const tableRef = useRef<HTMLDivElement>(null);

    const { products, addProduct, clearProducts, updateProduct } = useProductStore();

    const { hasData, tdee } = useUserStore();

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddProduct = () => {
        //
        const draftProduct: Product = {
            id: "NEW_PRODUCT",
            name: "Новый продукт",
            price: 0,
            calories: 0,
            proteins: 0,
            fats: 0,
            carbs: 0,
        };
        setEditingProduct(draftProduct);
    };

    const handleCalculate = () => {
        // CHECK
        if (!hasData || !tdee) {
            setError("No data for calculation. Please calculate your TDEE first");
            setShowResults(false);
            return;
        }

        // CHECK
        if (products.length === 0) {
            setError("Please add at least one product to the table");
            setShowResults(false);
            return;
        }

        tableRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });

        setError(null);
        setShowResults(true);
    };

    //REWRITE

    const calculateStrategy = (targetCalories: number): MacroStrategy => {
        // Суммируем БЖУК и цену всей текущей корзины (база на 100г каждого продукта)
        const basketTotal = products.reduce((acc, p) => ({
            cost: acc.cost + p.price,
            calories: acc.calories + p.calories,
            proteins: acc.proteins + p.proteins,
            fats: acc.fats + p.fats,
            carbs: acc.carbs + p.carbs,
        }), { cost: 0, calories: 0, proteins: 0, fats: 0, carbs: 0 });

        if (basketTotal.calories === 0) {
            return { cost: 0, calories: 0, proteins: 0, fats: 0, carbs: 0, volume: 0 };
        }

        // Вычисляем необходимый суммарный вес (Volume) в граммах для достижения целевых калорий
        const totalVolumeGrams = Math.round((targetCalories / basketTotal.calories) * 100);

        // Коэффициент масштабирования остальных макросов под этот вес
        const scaleFactor = totalVolumeGrams / 100;

        return {
            cost: Math.round(basketTotal.cost * scaleFactor),
            calories: Math.round(targetCalories),
            proteins: Math.round(basketTotal.proteins * scaleFactor * 10) / 10,
            fats: Math.round(basketTotal.fats * scaleFactor * 10) / 10,
            carbs: Math.round(basketTotal.carbs * scaleFactor * 10) / 10,
            volume: totalVolumeGrams
        };
    };

    // Дефицит (-500 ккал), Поддержка (базовый TDEE), Профицит (+300 ккал) в соответствии с логикой вашей формы
    const results = {
        deficit: calculateStrategy((tdee || 2000) - 500),
        maintenance: calculateStrategy(tdee || 2000),
        surplus: calculateStrategy((tdee || 2000) + 300),
    };

    // const handleCancelEdit = (product: Product) => {
    //     if (product.name === 'Новый продукт') {
    //         removeProduct(product.id);
    //     }
    //     setEditingProduct(null);
    // };

    //-------------------------

    return (
        <div className="blockContainer flex flex-col justify-center items-center">
            {products.length > 0 && (
                <div className="flex justify-center gap-1 w-50" >
                    <button type="button" className="flex items-center gap-1 border border-border rounded-2xl px-2 hover:shadow-sm cursor-pointer" onClick={clearProducts}>
                        <Trash size={16} /> Clear table
                    </button>
                </div>
            )}

            {
                products.map((product) => (
                    <ProductItem
                        key={product.id}

                        id={product.id}

                        name={product.name}
                        price={product.price}
                        calories={product.calories}
                        proteins={product.proteins}
                        fats={product.fats}
                        carbs={product.carbs}

                        onEdit={() => setEditingProduct(product)}
                    />
                ))
            }

            {products.length <= 0 && (
                <span className="select-none text-[14px] font-mono py-2 text-foreground-muted">add your first product</span>
            )}

            <button
                onClick={handleAddProduct}
                type="button"
                className="productTableBtn">
                <Plus /> ADD
            </button>

            <hr className=' text-primary w-full' />

            <button
                onClick={handleCalculate}
                type="button"
                className="productTableBtn">
                Calculate
            </button>


            {error && (
                <div className="max-w-85 p-3 border border-destructive bg-destructive/10 text-destructive text-sm rounded-xl font-mono text-center my-2">
                    {error}
                </div>
            )}

            {/* РЕЗУЛЬТИРУЮЩАЯ ТАБЛИЦА */}
            {showResults && (
                <div
                    ref={tableRef}
                    className="w-full mt-4 overflow-x-auto border border-border rounded-2xl bg-secondary p-1 shadow-inner">
                    <table className="w-full text-left border-collapse font-mono text-sm">
                        <thead>
                            <tr className="border-b border-border text-muted-foreground text-xs uppercase rounded-4xl">
                                <th className="p-3 font-semibold">Metric</th>
                                <th className="p-3 font-semibold text-center">Deficit</th>
                                <th className="p-3 font-semibold text-center">Balance</th>
                                <th className="p-3 font-semibold text-center">Surplus</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            <tr>
                                <td className="p-3 font-medium">Cost, ₽</td>
                                <td className="p-3 text-center">{results.deficit.cost}</td>
                                <td className="p-3 text-center">{results.maintenance.cost}</td>
                                <td className="p-3 text-center">{results.surplus.cost}</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium text-chart-2">Calories</td>
                                <td className="p-3 text-center text-primary font-bold">{results.deficit.calories}</td>
                                <td className="p-3 text-center text-primary font-bold">{results.maintenance.calories}</td>
                                <td className="p-3 text-center text-primary font-bold">{results.surplus.calories}</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Proteins, g</td>
                                <td className="p-3 text-center">{results.deficit.proteins}</td>
                                <td className="p-3 text-center">{results.maintenance.proteins}</td>
                                <td className="p-3 text-center">{results.surplus.proteins}</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Fats, g</td>
                                <td className="p-3 text-center">{results.deficit.fats}</td>
                                <td className="p-3 text-center">{results.maintenance.fats}</td>
                                <td className="p-3 text-center">{results.surplus.fats}</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Carbs, g</td>
                                <td className="p-3 text-center">{results.deficit.carbs}</td>
                                <td className="p-3 text-center">{results.maintenance.carbs}</td>
                                <td className="p-3 text-center">{results.surplus.carbs}</td>
                            </tr>
                            <tr className="bg-background/30 font-semibold">
                                <td className="p-3 rounded-bl-2xl">Volume, g</td>
                                <td className="p-3 text-center">{results.deficit.volume}</td>
                                <td className="p-3 text-center">{results.maintenance.volume}</td>
                                <td className="p-3 text-center rounded-br-2xl">{results.surplus.volume}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {editingProduct && (
                <ProductModalForm
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={(id, updatedData) => {
                        if (id === "NEW_PRODUCT") {
                            addProduct(updatedData);
                        } else {
                            updateProduct(id, updatedData);
                        }
                        setEditingProduct(null);
                    }}
                />
            )}

        </div>
    )
}

export default ProductTable