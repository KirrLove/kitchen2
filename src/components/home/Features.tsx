
import { ShieldCheck, Truck, Clock, Wrench } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Без предоплаты",
    description: "Оплата после полной установки кухни"
  },
  {
    icon: Clock,
    title: "Сроки изготовления",
    description: "14 дней от замера до монтажа"
  },
  {
    icon: Wrench,
    title: "Любые размеры",
    description: "Изготовим кухню с точностью до 5 мм"
  },
  {
    icon: Truck,
    title: "Своё производство",
    description: "Мы не посредники, всё делаем сами"
  }
];

const Features = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 hover:bg-accent transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-display text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
