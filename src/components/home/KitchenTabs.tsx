import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Grid, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const calculatorContent = [
  {
    title: "Стоимость от длины",
    description: "Цена за погонный метр зависит от материалов и комплектации:",
    items: [
      "Эконом - от 35 000 ₽/м.п.",
      "Стандарт - от 45 000 ₽/м.п.",
      "Премиум - от 65 000 ₽/м.п."
    ]
  },
  {
    title: "Материалы фасадов",
    description: "Различные варианты материалов на выбор:",
    items: [
      "МДФ в пленке ПВХ",
      "Пластик HPL",
      "Эмаль",
      "Массив дерева"
    ]
  },
  {
    title: "Фурнитура",
    description: "Выбор фурнитуры для кухни:",
    items: [
      "Петли с доводчиком",
      "Выдвижные ящики",
      "Системы хранения"
    ]
  },
  {
    title: "Цветовые решения",
    description: "Выбор цвета для фасадов:",
    items: [
      "Белый",
      "Черный",
      "Дерево",
      "Яркие цвета"
    ]
  },
  {
    title: "Дополнительные опции",
    description: "Опции, которые можно добавить:",
    items: [
      "Подсветка",
      "Стеклянные фасады",
      "Кухонные острова"
    ]
  },
  {
    title: "Сроки изготовления",
    description: "Сроки выполнения заказа:",
    items: [
      "Стандартный - 14 дней",
      "Экспресс - 7 дней"
    ]
  },
  {
    title: "Доставка и установка",
    description: "Условия доставки и установки:",
    items: [
      "Доставка по городу - бесплатно",
      "Установка - 5 000 ₽"
    ]
  },
  {
    title: "Гарантия",
    description: "Гарантия на продукцию:",
    items: [
      "Гарантия 2 года на мебель",
      "Гарантия 5 лет на фурнитуру"
    ]
  },
  {
    title: "Консультация",
    description: "Получите бесплатную консультацию:",
    items: [
      "Онлайн консультация",
      "Выезд специалиста"
    ]
  },
  {
    title: "Скидки и акции",
    description: "Текущие акции и скидки:",
    items: [
      "Скидка 10% на первый заказ",
      "Акция на кухонные острова"
    ]
  },
  {
    title: "Отзывы клиентов",
    description: "Что говорят наши клиенты:",
    items: [
      "Отличное качество!",
      "Быстрая доставка!"
    ]
  },
  {
    title: "Портфолио",
    description: "Примеры выполненных работ:",
    items: [
      "Кухня в стиле лофт",
      "Классическая кухня"
    ]
  },
  {
    title: "Часто задаваемые вопросы",
    description: "Ответы на популярные вопросы:",
    items: [
      "Как выбрать кухню?",
      "Как сделать замеры?"
    ]
  },
  {
    title: "Контакты",
    description: "Свяжитесь с нами:",
    items: [
      "Телефон: +7 (999) 999-99-99",
      "Email: info@kitchen.com"
    ]
  },
  {
    title: "Социальные сети",
    description: "Следите за нами в соцсетях:",
    items: [
      "Instagram",
      "Facebook"
    ]
  }
];

const readyKitchens = [
  {
    title: "Классические кухни",
    description: "Элегантные решения в традиционном стиле",
    price: "от 45 000 ₽/м.п.",
    image: "https://ital-moscow.ru/files/variants_resized/1565710312italyanskaya-kuhnya-duca-d-este-19-fabriki-megaros.2010x1340w.jpg"
  },
  {
    title: "Современные кухни",
    description: "Минималистичный дизайн и функциональность",
    price: "от 50 000 ₽/м.п.",
    image: "https://avatars.mds.yandex.net/get-mpic/1901647/img_id4178310756771978348.jpeg/orig"
  },
  {
    title: "Кухни в стиле лофт",
    description: "Стильные и практичные решения",
    price: "от 55 000 ₽/м.п.",
    image: "https://oneandhome.ru/sites/default/files/blog2022/interer-kuhni-v-stile-loft-02.jpg"
  },
  {
    title: "Кухни с островом",
    description: "Идеально для больших пространств",
    price: "от 60 000 ₽/м.п.",
    image: "https://ekbkupe.ru/images/stories/virtuemart/product/k-0029.jpg"
  },
  {
    title: "Кухни для маленьких пространств",
    description: "Компактные и функциональные решения",
    price: "от 40 000 ₽/м.п.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/White_kitchen_with_cabinet_doors_and_drawers_opened_or_removed_so_that_real-life_stuff_can_be_seen_in_cabinets.jpg/1200px-White_kitchen_with_cabinet_doors_and_drawers_opened_or_removed_so_that_real-life_stuff_can_be_seen_in_cabinets.jpg"
  },
  {
    title: "Кухни с барной стойкой",
    description: "Современные решения для вашего дома",
    price: "от 50 000 ₽/м.п.",
    image: "https://spb.master-bobr.ru/images/kuxny/kuxnya_s_barnoj_stojkoj.jpg"
  },
  {
    title: "Кухни с открытыми полками",
    description: "Стильные и удобные решения",
    price: "от 45 000 ₽/м.п.",
    image: "https://i.pinimg.com/originals/6e/8d/ca/6e8dcae7750931bbccaa75746f2e8aa6.jpg"
  },
  {
    title: "Кухни с встроенной техникой",
    description: "Все необходимое в одном месте",
    price: "от 70 000 ₽/м.п.",
    image: "https://dknmebel.ru/d/kuhnya_sirius.jpg"
  },
  {
    title: "Кухни с угловой планировкой",
    description: "Идеально для небольших помещений",
    price: "от 50 000 ₽/м.п.",
    image: "https://betonpogreb.ru/wp-content/uploads/8/e/4/8e4347e9a394adb0418a05f64b17e8a0.jpeg"
  },
  {
    title: "Кухни с высокими фасадами",
    description: "Создайте эффект высоты",
    price: "от 55 000 ₽/м.п.",
    image: "https://evo-kuhni.ru/local/templates/bas/img/shkafy_kuh_15.jpg"
  },
  {
    title: "Кухни с подсветкой",
    description: "Создайте уютную атмосферу",
    price: "от 50 000 ₽/м.п.",
    image: "https://www.furnishhome.ru/articles/4261/4261_11.jpg"
  },
  {
    title: "Кухни с натуральными материалами",
    description: "Экологичные и стильные решения",
    price: "от 60 000 ₽/м.п.",
    image: "https://mzalex.ru/media-temp/img/uploads/images/sovremennye-kuhni-iz-shpona-1.jpg"
  }
];

const constructorSteps = [
  {
    title: "Выбор планировки",
    description: "Прямая, угловая, П-образная или с островом",
    icon: Grid
  },
  {
    title: "Материалы фасадов",
    description: "Широкий выбор материалов и расцветок",
    icon: Settings
  },
  {
    title: "Выбор фурнитуры",
    description: "Опции для удобства использования",
    icon: Settings
  },
  {
    title: "Цветовая палитра",
    description: "Выбор цвета для вашей кухни",
    icon: Settings
  },
  {
    title: "Дополнительные опции",
    description: "Выбор дополнительных функций",
    icon: Settings
  },
  {
    title: "Замеры",
    description: "Как правильно сделать замеры",
    icon: Settings
  },
  {
    title: "Доставка и установка",
    description: "Условия и сроки доставки",
    icon: Settings
  },
  {
    title: "Гарантия",
    description: "Гарантия на продукцию и услуги",
    icon: Settings
  },
  {
    title: "Консультация",
    description: "Получите бесплатную консультацию",
    icon: Settings
  },
  {
    title: "Скидки и акции",
    description: "Текущие предложения и акции",
    icon: Settings
  },
  {
    title: "Отзывы клиентов",
    description: "Что говорят наши клиенты",
    icon: Settings
  },
  {
    title: "Портфолио",
    description: "Примеры выполненных работ",
    icon: Settings
  },
  {
    title: "Часто задаваемые вопросы",
    description: "Ответы на популярные вопросы",
    icon: Settings
  },
  {
    title: "Контакты",
    description: "Свяжитесь с нами",
    icon: Settings
  },
  {
    title: "Социальные сети",
    description: "Следите за нами в соцсетях",
    icon: Settings
  }
];

const KitchenTabs = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
          Создайте кухню своей мечты
        </h2>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Расчет кухни
            </TabsTrigger>
            <TabsTrigger value="ready" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Готовые кухни
            </TabsTrigger>
            <TabsTrigger value="constructor" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Конструктор
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculatorContent.map((block, index) => (
                <div 
                  key={index}
                  className="glass-panel p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-display text-xl mb-4">{block.title}</h3>
                  <p className="text-muted-foreground mb-4">{block.description}</p>
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/calculator" className="button-primary">
                Рассчитать стоимость кухни
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="ready" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {readyKitchens.map((kitchen, index) => (
                <div 
                  key={index}
                  className="glass-panel overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={kitchen.image} 
                    alt={kitchen.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-xl mb-2">{kitchen.title}</h3>
                    <p className="text-muted-foreground mb-4">{kitchen.description}</p>
                    <p className="font-medium text-lg mb-4">{kitchen.price}</p>
                    <Link to={`/kitchen/${index}`} className="button-primary w-full">
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="constructor" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {constructorSteps.map((step, index) => (
                <div 
                  key={index}
                  className="glass-panel p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <step.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-display text-xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/constructor" className="button-primary">
                Начать проектирование
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default KitchenTabs;
