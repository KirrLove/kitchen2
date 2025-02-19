
import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import CartItem, { CartItemType } from "./CartItem";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

interface OrderFormData {
  customerName: string;
  phone: string;
  address: string;
  comment: string;
}

const Cart = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }: CartProps) => {
  const { toast } = useToast();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: "",
    phone: "",
    address: "",
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order for each item
      for (const item of items) {
        const { error } = await supabase
          .from('orders')
          .insert({
            customer_name: formData.customerName,
            phone: formData.phone,
            address: formData.address,
            comment: formData.comment,
            total_amount: item.price * item.quantity,
            product_name: item.name,
            product_id: parseInt(item.id),
            quantity: item.quantity,
            material: item.material,
            style: item.style
          });

        if (error) throw error;
      }

      toast({
        title: "Заказ успешно оформлен",
        description: "Мы свяжемся с вами в ближайшее время для подтверждения заказа"
      });

      // Reset form and close cart
      setFormData({
        customerName: "",
        phone: "",
        address: "",
        comment: ""
      });
      setShowOrderForm(false);
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-xl font-medium">Корзина</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:text-destructive">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              Ваша корзина пуста
            </p>
          </div>
        ) : showOrderForm ? (
          <div className="h-[calc(100vh-100px)] overflow-y-auto">
            <button
              onClick={() => setShowOrderForm(false)}
              className="mb-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              <X className="w-4 h-4" /> Вернуться к корзине
            </button>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className="input-standard"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Номер телефона"
                  className="input-standard"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Адрес доставки"
                  className="input-standard"
                  required
                />
              </div>
              <div>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Комментарий к заказу"
                  className="input-standard min-h-[100px]"
                />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Итого:</span>
                  <span className="font-bold text-xl">
                    {totalPrice.toLocaleString()} ₽
                  </span>
                </div>
                <button
                  type="submit"
                  className="button-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Оформление..." : "Подтвердить заказ"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={onRemoveItem}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>

            <div className="border-t pt-4 bg-background sticky bottom-0">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Итого:</span>
                <span className="font-bold text-xl">
                  {totalPrice.toLocaleString()} ₽
                </span>
              </div>
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
