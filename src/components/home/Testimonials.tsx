
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Михаил Александрович Берлев",
    date: "15 декабря 2024 г.",
    rating: 5,
    text: "Рекомендую. Обещания не расходятся с реальностью (в нашем случае именно так и произошло). Очень рекомендую дизайнера Анастасию (специалист, который помог нам с проектом)."
  },
  {
    id: 2,
    name: "Анна Сергеевна",
    date: "10 декабря 2024 г.",
    rating: 5,
    text: "Заказывали кухню в этой компании, очень довольны результатом. Сделали всё в срок, качество отличное, цена порадовала."
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
          Отзывы наших клиентов
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-panel p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-4">
                {testimonial.text}
              </p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{testimonial.name}</span>
                <span className="text-muted-foreground">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
