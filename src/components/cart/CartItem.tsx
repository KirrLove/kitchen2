
import { X, Plus, Minus } from "lucide-react";

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  material?: string;
  style?: string;
}

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-grow">
        <h3 className="font-medium mb-1">Кухня «{item.name}»</h3>
        <div className="space-y-1 text-sm text-muted-foreground mb-2">
          {item.material && <p>Материал: {item.material}</p>}
          {item.style && <p>Стиль: {item.style}</p>}
        </div>
        <p className="text-primary font-medium mb-2">
          {item.price.toLocaleString()} ₽/м.п.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="w-8 h-8 flex items-center justify-center bg-background hover:bg-accent rounded-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-background hover:bg-accent rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 hover:text-destructive"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItem;
