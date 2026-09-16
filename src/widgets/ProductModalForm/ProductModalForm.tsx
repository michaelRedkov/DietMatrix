import { useState } from "react";
import { type Product } from "../../stores/useProductStore";

type Props = {
  product: Product;
  onClose: () => void;
  onSave: (id: string, data: Partial<Product>) => void;
};

const ProductModalForm = ({ product, onClose, onSave }: Props) => {
  // Локальный стейт для полей формы
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    calories: product.calories,
    proteins: product.proteins,
    fats: product.fats,
    carbs: product.carbs,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isString = name === "name";
    setFormData((prev) => ({
      ...prev,
      [name]: isString ? value : Number(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(product.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-secondary border border-border rounded-2xl p-6 shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-lg font-bold font-mono text-primary uppercase">
          {product.name ? "Edit" : "Create"}
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Title</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Price (₽/g)</label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              min="0"
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Calories</label>
            <input
              type="number"
              name="calories"
              value={formData.calories || ""}
              onChange={handleChange}
              min="0"
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground text-center">Proteins</label>
            <input
              type="number"
              name="proteins"
              value={formData.proteins || ""}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full bg-background border border-border rounded-xl px-2 py-1.5 text-sm text-center focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground text-center">Fats</label>
            <input
              type="number"
              name="fats"
              value={formData.fats || ""}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full bg-background border border-border rounded-xl px-2 py-1.5 text-sm text-center focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground text-center">Carbs</label>
            <input
              type="number"
              name="carbs"
              value={formData.carbs || ""}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full bg-background border border-border rounded-xl px-2 py-1.5 text-sm text-center focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-border shadow rounded-xl hover:bg-background cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-primary shadow text-white rounded-xl hover:bg-sidebar-primary 0 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductModalForm;