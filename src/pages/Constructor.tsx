import { useState } from "react";
import { ChevronRight, Grid, Settings, Package, Palette, Ruler, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { HexColorPicker } from "react-colorful";
import Cart from "@/components/cart/Cart";
import type { CartItemType } from "@/components/cart/CartItem";

interface Option {
  id: string;
  name: string;
  image: string;
  description: string;
  price?: number;
  features?: string[];
}

const steps = [
  {
    id: "layout",
    title: "Форма кухни",
    icon: Grid,
    options: [
      {
        id: "straight",
        name: "Прямая",
        image: "https://itacom.ru/wp-content/uploads/2021/10/kuhnya_snaidero-first_3.jpg",
        description: "Классическое решение для небольших помещений"
      },
      {
        id: "l-shaped",
        name: "Г-образная",
        image: "https://i.pinimg.com/originals/91/89/ad/9189ad1859b6b6d033536442b124debb.jpg",
        description: "Функциональное решение для средних кухонь"
      },
      {
        id: "u-shaped",
        name: "П-образная",
        image: "https://i.pinimg.com/originals/af/7d/91/af7d9139191205add2dd8b6bf2801620.jpg",
        description: "Максимум рабочего пространства"
      },
      {
        id: "island",
        name: "С островом",
        image: "https://ekbkupe.ru/images/stories/virtuemart/product/k-0029.jpg",
        description: "Современное решение для просторных помещений"
      }
    ]
  },
  {
    id: "size",
    title: "Размеры",
    icon: Ruler,
    fields: [
      { id: "length", name: "Длина", unit: "м" },
      { id: "width", name: "Ширина", unit: "м" },
      { id: "height", name: "Высота", unit: "м" }
    ]
  },
  {
    id: "material",
    title: "Фасады",
    icon: Package,
    options: [
      {
        id: "mdf",
        name: "МДФ в плёнке",
        image: "https://vsekuhni.ru/upload/iblock/3af/ip4sqy0ju665atequ5xhkgl6k09tw6gf.jpeg",
        description: "Практичный и доступный материал",
        price: 35000
      },
      {
        id: "plastic",
        name: "Пластик",
        image: "https://vsekuhni.ru/upload/iblock/0ce/56aih70a5nrg9970viurwz53reoty0m6.jpg",
        description: "Влагостойкий и простой в уходе",
        price: 45000
      },
      {
        id: "wood",
        name: "Массив дерева",
        image: "https://utwood.ru/upload/iblock/49d/6qzdv9q4la4ziili4j0w1c5kfr5vbub2/Mebelnyy-shchit-sosna3.png",
        description: "Натуральный и долговечный материал",
        features: ["Дуб", "Бук", "Ясень"],
        price: 85000
      },
      {
        id: "egger",
        name: "Egger",
        image: "https://static.insales-cdn.com/images/products/1/1243/878085339/ldsp.jpg",
        description: "Австрийское качество",
        price: 55000
      },
      {
        id: "acrylic",
        name: "Акрил",
        image: "https://static.tildacdn.com/tild3031-3537-4730-a664-633263386230/hgpanel1.jpg",
        description: "Глянцевое покрытие премиум-класса",
        price: 75000
      },
      {
        id: "emal",
        name: "Эмаль",
        image: "https://mastroi.ru/upload/iblock/cfe/o27tcd6tb8q30z27nzv1t834xh37mx7y.jpg",
        description: "Изысканный внешний вид",
        features: ["Матовая", "Глянцевая", "Металлик"],
        price: 95000
      }
    ]
  },
  {
    id: "countertop",
    title: "Столешница",
    icon: Package,
    options: [
      {
        id: "laminate",
        name: "Ламинат",
        image: "https://cdn.vamdodoma.ru/images/ikea-pl/25/6f/6f7a63bde3acc3e6b97e108303d954cc218a.jpg?w=900",
        description: "Бюджетное решение",
        price: 3000
      },
      {
        id: "stone",
        name: "Искусственный камень",
        image: "https://mebeldavinci.ru/img/blog/%D0%A1%D1%82%D0%BE%D0%BB%D0%B5%D1%88%D0%BD%D0%B8%D1%86%D0%B0%20%D0%B8%D0%B7%20%D0%B0%D0%BA%D1%80%D0%B8%D0%BB%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE%20%D0%BA%D0%B0%D0%BC%D0%BD%D1%8F%20%D0%9C%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C%20%D0%94%D0%B0%20%D0%92%D0%B8%D0%BD%D1%87%D0%B8-1.jpg",
        description: "Практичный материал",
        features: ["Akrilika", "Corian", "LG Hi-Macs"],
        price: 12000
      },
      {
        id: "granite",
        name: "Гранит",
        image: "https://avatars.mds.yandex.net/i?id=e2a40d647330d96d93917287125f488f_l-5236332-images-thumbs&n=13",
        description: "Премиальное решение",
        price: 18000
      },
      {
        id: "marble",
        name: "Мрамор",
        image: "https://sun9-10.userapi.com/impg/sMooH7BqQbUO_MjtvL4B6HrxwbNLK0JQxffVkQ/O5ouSjGcxJ8.jpg?size=1200x902&quality=96&sign=c32482462726d2acc2e0028243b4d8e3&c_uniq_tag=WznSIEWFtIBi-b6lM3TUZ5coVCWwY4C6NQ-8eAn_IH4&type=album",
        description: "Элитный материал",
        price: 25000
      },
      {
        id: "wood-massive",
        name: "Массив дерева",
        image: "https://msk-door.ru/assets/images/products/242769/05728265.jpg",
        description: "Натуральный материал",
        features: ["Дуб", "Орех", "Карагач"],
        price: 15000
      }
    ]
  },
  {
    id: "hardware",
    title: "Фурнитура",
    icon: Settings,
    options: [
      {
        id: "basic",
        name: "Базовая",
        image: "https://hoff.ru/upload/iblock/44b/n88j8age6eucre19lpgin4agjqfiyynh.jpg",
        description: "Надежная фурнитура",
        features: [
          "Петли с доводчиками",
          "Подъемные механизмы",
          "Выдвижные ящики с доводчиками"
        ],
        price: 15000
      },
      {
        id: "blum",
        name: "Blum",
        image: "https://uglich-mebel.ru/i/kitchen-hardware/blum.jpg",
        description: "Премиальная австрийская фурнитура",
        features: [
          "Электрические доводчики",
          "Умные системы хранения",
          "Механизм Tip-On",
          "Servo-Drive"
        ],
        price: 45000
      },
      {
        id: "grass",
        name: "Grass",
        image: "https://avtoemali96.ru/wa-data/public/shop/brands/77/77.jpeg",
        description: "Немецкое качество",
        features: [
          "Nova Pro Scala",
          "Tiomos",
          "Sensomatic"
        ],
        price: 35000
      },
      {
        id: "hettich",
        name: "Hettich",
        image: "https://region116.com/wp-content/uploads/2022/08/hettich-vb-35-d-spojkovanie-s-excentromotvor-o20-hrplat-19-ponikl-768x768.jpg",
        description: "Инновационные решения",
        features: [
          "AvanTech YOU",
          "Push to open Silent",
          "WingLine"
        ],
        price: 40000
      }
    ]
  },
  {
    id: "appliances",
    title: "Техника",
    icon: Settings,
    options: [
      {
        id: "basic-set",
        name: "Базовый комплект",
        image: "https://i.postimg.cc/qqRPPKLt/image.jpg",
        description: "Необходимый минимум",
        features: [
          "Встраиваемая плита",
          "Вытяжка",
          "Посудомоечная машина"
        ],
        price: 85000
      },
      {
        id: "comfort-set",
        name: "Комфорт",
        image: "https://i.postimg.cc/ZnMG4q7w/3d-rendering-modern-kitchen-counter-with-white-biege-design.jpg",
        description: "Расширенная комплектация",
        features: [
          "Индукционная варочная панель",
          "Встраиваемая духовка с функцией пара",
          "Встраиваемая микроволновка",
          "Премиум вытяжка",
          "Посудомоечная машина 60 см"
        ],
        price: 180000
      },
      {
        id: "premium-set",
        name: "Премиум",
        image: "https://s.iimg.su/s/18/MDiSAbSAiXLjE7gUXmQpRTzWUe6b5xQhx9Vg4g4M.jpg",
        description: "Максимальная комплектация",
        features: [
          "Индукционная варочная панель с зоной флекс",
          "Мультифункциональная духовка",
          "Встраиваемая микроволновка с грилем",
          "Встраиваемая кофемашина",
          "Винный шкаф",
          "Посудомоечная машина с третьим уровнем загрузки",
          "Компактный духовой шкаф-пароварка",
          "Подогреватель посуды"
        ],
        price: 450000
      },
      {
        id: "custom",
        name: "Индивидуальный набор",
        image: "https://s.iimg.su/s/18/UKNXXjX8duMRiH9hifYJNzOmMg6F2iJMcRKPEkso.jpg",
        description: "Выберите нужную технику",
        features: [
          "Возможность подбора любой комбинации техники",
          "Учёт размеров и особенностей помещения",
          "Консультация специалиста"
        ],
        price: 150000
      }
    ]
  },
  {
    id: "colors",
    title: "Цвет и текстура",
    icon: Palette,
    isColorPicker: true,
    materialOptions: [
      {
        id: "solid",
        name: "Однотонный",
        type: "color"
      },
      {
        id: "wood",
        name: "Текстура дерева",
        options: [
          { id: "oak", name: "Дуб", color: "#D4BC8B" },
          { id: "walnut", name: "Орех", color: "#703D2A" },
          { id: "wenge", name: "Венге", color: "#3A2820" }
        ]
      },
      {
        id: "marble",
        name: "Текстура мрамора",
        options: [
          { id: "white-marble", name: "Белый мрамор", color: "#F5F5F5" },
          { id: "black-marble", name: "Чёрный мрамор", color: "#232323" },
          { id: "beige-marble", name: "Бежевый мрамор", color: "#E8DCC4" }
        ]
      }
    ]
  }
];

const Constructor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [customColor, setCustomColor] = useState("#ffffff");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const handleOptionSelect = (stepId: string, optionId: string) => {
    setSelectedOptions({ ...selectedOptions, [stepId]: optionId });
  };

  const handleColorSelect = (color: string) => {
    setCustomColor(color);
    setSelectedOptions({ ...selectedOptions, color });
    setIsColorPickerOpen(false);
  };

  const calculateTotalPrice = (): number => {
    let total = 0;
    Object.entries(selectedOptions).forEach(([stepId, optionId]) => {
      const step = steps.find(s => s.id === stepId);
      if (step?.options) {
        const option = step.options.find(o => o.id === optionId) as Option | undefined;
        if (option?.price) {
          total += option.price;
        }
      }
    });
    return total;
  };

  const handleAddToCart = () => {
    const newItem: CartItemType = {
      id: Date.now().toString(),
      name: "Кухня по индивидуальному проекту",
      price: calculateTotalPrice(),
      image: "/placeholder.svg",
      quantity: 1
    };

    setCartItems([...cartItems, newItem]);
    toast({
      title: "Товар добавлен в корзину",
      description: "Перейдите в корзину для оформления заказа"
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    if (step.isColorPicker) {
      return (
        <div className="space-y-6">
          {step.materialOptions.map((materialOption) => (
            <div key={materialOption.id} className="glass-panel p-6">
              <h3 className="font-medium text-lg mb-4">{materialOption.name}</h3>
              
              {materialOption.type === "color" ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                    className="w-full p-4 border rounded-lg flex items-center justify-between hover:border-primary transition-colors"
                  >
                    <span>Выбрать цвет</span>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border shadow-sm" 
                        style={{ backgroundColor: customColor }} 
                      />
                      <span className="text-sm text-muted-foreground uppercase">
                        {customColor}
                      </span>
                    </div>
                  </button>
                  
                  {isColorPickerOpen && (
                    <div className="p-4 border rounded-lg">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Рекомендуемые цвета</h4>
                        <div className="grid grid-cols-6 gap-2">
                          {[
                            "#FFFFFF", "#F8F9FA", "#E9ECEF", 
                            "#DEE2E6", "#CED4DA", "#ADB5BD",
                            "#F8F0E5", "#EADBC8", "#DAC0A3", 
                            "#0F2C59", "#454545", "#000000"
                          ].map(color => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(color)}
                              className="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <HexColorPicker 
                        color={customColor} 
                        onChange={handleColorSelect}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {materialOption.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleColorSelect(option.color)}
                      className={`p-4 border rounded-lg text-left transition-all hover:border-primary ${
                        customColor === option.color ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div 
                        className="w-full aspect-square rounded-lg mb-2 shadow-sm" 
                        style={{ backgroundColor: option.color }} 
                      />
                      <span className="text-sm font-medium block">{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (step.fields) {
      return (
        <div className="grid grid-cols-1 gap-4">
          {step.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="text-sm font-medium">
                {field.name} ({field.unit})
              </label>
              <input
                type="number"
                id={field.id}
                className="w-full p-3 border rounded-lg"
                placeholder={`Введите ${field.name.toLowerCase()}`}
                min="0"
                step="0.1"
              />
            </div>
          ))}
        </div>
      );
    }

    if (step.options) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {step.options.map((option) => (
            <button
              key={option.id}
              className={`p-6 border rounded-lg text-left transition-all ${
                selectedOptions[step.id] === option.id
                  ? "ring-2 ring-primary"
                  : "hover:border-primary"
              }`}
              onClick={() => handleOptionSelect(step.id, option.id)}
            >
              <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                <img 
                  src={option.image} 
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg mb-2">{option.name}</h3>
              <p className="text-muted-foreground mb-4">{option.description}</p>
              {"price" in option && (
                <p className="text-primary font-medium">
                  от {option.price.toLocaleString()} ₽
                </p>
              )}
              {"features" in option && (
                <ul className="mt-2 space-y-1">
                  {option.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Конструктор Кухни</h1>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 hover:bg-accent rounded-full"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-4">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(index)}
            className={`flex items-center space-x-2 whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
              index === currentStep
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            <step.icon className="w-5 h-5" />
            <span>{step.title}</span>
          </button>
        ))}
      </div>

      <div className="mb-8">{renderStepContent()}</div>

      <div className="flex justify-between items-center">
        <button
          className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Назад
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          >
            Далее
          </button>
        )}
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default Constructor;
