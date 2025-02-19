
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  onSubmit?: () => void;
  type?: 'measurement' | 'consultation' | 'order';
  additionalFields?: Record<string, any>;
}

const formTypeConfig = {
  measurement: {
    defaultTitle: "Заказать замер",
    defaultSubtitle: "Для максимально точного расчета рекомендуем вызвать нашего специалиста.",
    buttonText: "Заказать замер",
    commentPlaceholder: "Укажите примерные размеры помещения и особенности планировки"
  },
  consultation: {
    defaultTitle: "Записаться на консультацию",
    defaultSubtitle: "Наши специалисты помогут подобрать идеальное решение для вашей кухни.",
    buttonText: "Записаться на консультацию",
    commentPlaceholder: "Опишите ваши пожелания к будущей кухне"
  },
  order: {
    defaultTitle: "Оформить заказ",
    defaultSubtitle: "Оставьте заявку, и мы свяжемся с вами для оформления заказа.",
    buttonText: "Оформить заказ",
    commentPlaceholder: "Дополнительная информация по заказу"
  }
};

const ContactForm = ({ 
  title,
  subtitle,
  onSubmit,
  type = 'measurement',
  additionalFields = {}
}: ContactFormProps) => {
  const config = formTypeConfig[type];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    time: "",
    city: "Москва",
    comment: "",
    address: type === 'order' ? "" : undefined
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (type === 'order') {
        // Для заказов используем таблицу orders
        const { error } = await supabase
          .from('orders')
          .insert([
            {
              customer_name: formData.name,
              phone: formData.phone,
              address: formData.address,
              comment: formData.comment,
              product_name: additionalFields.product_name,
              product_id: additionalFields.product_id,
              quantity: 1,
              material: additionalFields.material,
              style: additionalFields.style,
              total_amount: 0 // Здесь можно добавить расчет суммы заказа
            }
          ]);

        if (error) throw error;
      } else {
        // Для остальных типов используем contact_requests
        const { error } = await supabase
          .from('contact_requests')
          .insert([
            {
              ...formData,
              type,
              ...additionalFields
            }
          ]);

        if (error) throw error;
      }

      toast({
        title: type === 'order' ? "Заказ оформлен" : "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        time: "",
        city: "Москва",
        comment: "",
        address: type === 'order' ? "" : undefined
      });

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="glass-panel p-6 md:p-8">
      <h3 className="font-display text-2xl mb-2">{title || config.defaultTitle}</h3>
      <p className="text-muted-foreground mb-6">{subtitle || config.defaultSubtitle}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            placeholder="+7 (___) ___-__-__"
            className="input-standard"
            required
          />
        </div>
        
        {type === 'order' && (
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
        )}

        <div>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Удобное время для звонка"
            className="input-standard"
          />
        </div>
        
        {type !== 'order' && (
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Москва"
              className="input-standard"
            />
          </div>
        )}
        
        <div>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder={config.commentPlaceholder}
            className="input-standard min-h-[100px]"
          />
        </div>
        
        <button
          type="submit"
          className="button-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : config.buttonText}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
