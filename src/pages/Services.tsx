import { 
  Ruler, 
  PenTool, 
  Truck, 
  Wrench, 
  Paintbrush, 
  Package, 
  Clock, 
  ShieldCheck,
  Palette,
  Settings,
  WrenchIcon,
  Home
} from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";

const mainServices = [
  {
    icon: Ruler,
    title: "Замер помещения",
    description: "Профессиональный замер с учетом всех особенностей помещения",
    price: "Бесплатно",
    features: [
      "Выезд в удобное время",
      "Точные обмеры",
      "Консультация на месте",
      "Предварительный расчет"
    ]
  },
  {
    icon: PenTool,
    title: "Проектирование",
    description: "Создание индивидуального дизайн-проекта кухни",
    price: "от 5 000 ₽",
    features: [
      "3D-визуализация",
      "Подбор материалов",
      "Расчет стоимости",
      "Несколько вариантов"
    ]
  },
  {
    icon: Package,
    title: "Производство",
    description: "Изготовление кухонной мебели на собственном производстве",
    price: "от 35 000 ₽/м.п.",
    features: [
      "Современное оборудование",
      "Качественные материалы",
      "Строгий контроль",
      "Гарантия качества"
    ]
  },
  {
    icon: Truck,
    title: "Доставка",
    description: "Бережная доставка готовой мебели до вашего дома",
    price: "от 3 000 ₽",
    features: [
      "Собственный автопарк",
      "Профессиональные грузчики",
      "Страховка груза",
      "Точно в срок"
    ]
  },
  {
    icon: Wrench,
    title: "Сборка и установка",
    description: "Профессиональный монтаж кухонной мебели",
    price: "от 10% стоимости",
    features: [
      "Опытные сборщики",
      "Профессиональный инструмент",
      "Уборка после монтажа",
      "Проверка работы"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Гарантийное обслуживание",
    description: "Поддержка и обслуживание после установки",
    price: "Бесплатно",
    features: [
      "Гарантия 2 года",
      "Быстрый выезд мастера",
      "Замена комплектующих",
      "Регулировка и настройка"
    ]
  }
];

const additionalServices = [
  {
    icon: Paintbrush,
    title: "Реставрация фасадов",
    description: "Обновление и восстановление кухонных фасадов",
    price: "от 2 500 ₽/фасад"
  },
  {
    icon: Settings,
    title: "Регулировка фурнитуры",
    description: "Настройка и регулировка петель, доводчиков",
    price: "от 1 500 ₽"
  },
  {
    icon: WrenchIcon,
    title: "Замена столешницы",
    description: "Установка новой столешницы с подгонкой",
    price: "от 8 000 ₽"
  },
  {
    icon: Palette,
    title: "Перекраска фасадов",
    description: "Изменение цвета фасадов",
    price: "от 3 500 ₽/фасад"
  }
];

const designStyles = [
  {
    title: "Современный стиль",
    description: "Минималистичный дизайн с акцентом на функциональность",
    image: "/placeholder.svg"
  },
  {
    title: "Классический стиль",
    description: "Элегантные решения с традиционными элементами",
    image: "/placeholder.svg"
  },
  {
    title: "Скандинавский стиль",
    description: "Светлые тона и натуральные материалы",
    image: "/placeholder.svg"
  },
  {
    title: "Лофт",
    description: "Индустриальный шик с современными акцентами",
    image: "/placeholder.svg"
  }
];

const Services = () => {
  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-center mb-12">
            Наши услуги
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div 
                key={index}
                className="glass-panel p-8 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="text-lg font-medium mb-4">{service.price}</div>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Дополнительные услуги
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="text-primary font-medium">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Стили дизайна
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designStyles.map((style, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-xl"
              >
                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display text-lg mb-2">{style.title}</h3>
                  <p className="text-muted-foreground">{style.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Как мы работаем
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  1
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2">Консультация и замер</h3>
                  <p className="text-muted-foreground">
                    Бесплатная консультация и выезд специалиста для замеров помещения
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  2
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2">Проектирование</h3>
                  <p className="text-muted-foreground">
                    Разработка дизайн-проекта с учетом всех пожеланий
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  3
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2">Производство</h3>
                  <p className="text-muted-foreground">
                    Изготовление мебели на собственном производстве
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  4
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2">Доставка и установка</h3>
                  <p className="text-muted-foreground">
                    Бережная доставка и профессиональный монтаж
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Наши гарантии
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">Точные сроки</h3>
              <p className="text-muted-foreground">
                Гарантируем соблюдение сроков или вернем деньги
              </p>
            </div>
            
            <div className="text-center">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">
                2 года гарантии на всю продукцию
              </p>
            </div>
            
            <div className="text-center">
              <WrenchIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">Сервисное обслуживание</h3>
              <p className="text-muted-foreground">
                Бесплатное обслуживание в течение гарантийного срока
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary/5">
        <div className="container mx-auto max-w-4xl">
          <ContactForm 
            title="Записаться на консультацию"
            subtitle="Оставьте заявку, и наш дизайнер свяжется с вами для обсуждения проекта"
          />
        </div>
      </section>
    </div>
  );
};

export default Services;
