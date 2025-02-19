import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Check, ChevronRight } from "lucide-react";

const layouts = [
  { 
    id: "straight", 
    name: "Прямая", 
    multiplier: 1,
    image: "https://itacom.ru/wp-content/uploads/2021/10/kuhnya_snaidero-first_3.jpg",
    description: "Классическое решение для небольших помещений"
  },
  { 
    id: "l-shaped", 
    name: "Г-образная", 
    multiplier: 1.2,
    image: "https://i.pinimg.com/originals/91/89/ad/9189ad1859b6b6d033536442b124debb.jpg",
    description: "Функциональное решение для средних кухонь"
  },
  { 
    id: "u-shaped", 
    name: "П-образная", 
    multiplier: 1.4,
    image: "https://i.pinimg.com/originals/af/7d/91/af7d9139191205add2dd8b6bf2801620.jpg",
    description: "Максимум рабочего пространства"
  },
  { 
    id: "island", 
    name: "С островом", 
    multiplier: 1.6,
    image: "https://ekbkupe.ru/images/stories/virtuemart/product/k-0029.jpg",
    description: "Современное решение для просторных помещений"
  }
];

const materials = [
  { 
    id: "economy", 
    name: "Эконом", 
    price: 35000,
    image: "https://valles.ru/upload/iblock/e57/e5737971f598c9d345f5cbdedfce0402.jpg",
    features: ["ЛДСП", "Пластиковая кромка", "Базовая фурнитура"]
  },
  { 
    id: "standard", 
    name: "Стандарт", 
    price: 45000,
    image: "https://www.teremshop.ru/upload/iblock/4d8/4d8ac8c19530a84bdbbdae5965b0693d.jpg",
    features: ["МДФ", "ПВХ-пленка", "Фурнитура Blum"]
  },
  { 
    id: "premium", 
    name: "Премиум", 
    price: 65000,
    image: "https://utwood.ru/upload/iblock/49d/6qzdv9q4la4ziili4j0w1c5kfr5vbub2/Mebelnyy-shchit-sosna3.png",
    features: ["Массив дерева", "Эмаль", "Премиальная фурнитура"]
  }
];

const hardware = [
  {
    id: "blum",
    name: "Blum",
    price: 45000,
    features: [
      "Австрийское качество",
      "Пожизненная гарантия",
      "Плавное закрывание",
      "Электрические доводчики"
    ],
    image: "https://uglich-mebel.ru/i/kitchen-hardware/blum.jpg"
  },
  {
    id: "hettich",
    name: "Hettich",
    price: 35000,
    features: [
      "Немецкая надежность",
      "25 лет гарантии",
      "Механические доводчики",
      "Система защиты от хлопка"
    ],
    image: "https://region116.com/wp-content/uploads/2022/08/hettich-vb-35-d-spojkovanie-s-excentromotvor-o20-hrplat-19-ponikl-768x768.jpg"
  },
  {
    id: "gtv",
    name: "GTV",
    price: 25000,
    features: [
      "Доступная цена",
      "10 лет гарантии",
      "Базовые доводчики",
      "Простота установки"
    ],
    image: "https://klimbit.ru/wa-data/public/shop/categories/1083/749.jpg"
  }
];

const sinks = [
  {
    id: "blanco",
    name: "Blanco",
    price: 35000,
    materials: ["Искусственный гранит", "Нержавеющая сталь"],
    colors: ["Черный", "Белый", "Серый"],
    features: [
      "Устойчивость к царапинам",
      "Антибактериальное покрытие"
    ],
    image: "https://cdn1.ozone.ru/s3/multimedia-9/6890640453.jpg"
  },
  {
    id: "franke",
    name: "Franke",
    price: 45000,
    materials: ["Нержавеющая сталь", "Тегранит"],
    colors: ["Стальной", "Черный", "Бежевый"],
    features: [
      "Швейцарское качество",
      "Защита от грязи"
    ],
    image: "https://krasnodar.hausdorf.ru/upload/iblock/c61/moyka-franke-mrg-611s-oniks-2.jpg"
  },
  {
    id: "omoikiri",
    name: "Omoikiri",
    price: 28000,
    materials: ["Искусственный гранит"],
    colors: ["Черный", "Белый", "Песочный"],
    features: [
      "Японские технологии",
      "Легкость очистки"
    ],
    image: "https://tehnikapremium.ru/upload/iblock/514/3wod2kwefgpjdy4qr3gtb9fub5b9rm2g.jpg"
  }
];

const faucets = [
  {
    id: "blanco",
    name: "Blanco",
    price: 15000,
    materials: ["Нержавеющая сталь", "Латунь с покрытием"],
    features: [
      "Керамический картридж",
      "Поворотный излив"
    ],
    image: "https://technomixshop.ru/upload/iblock/67f/f5moxaqrh4ess6cqyr98lxujpuecijs5.jpg"
  },
  {
    id: "omoikiri",
    name: "Omoikiri",
    price: 12000,
    materials: ["Латунь с покрытием"],
    features: [
      "Система защиты от протечек",
      "Аэратор против брызг"
    ],
    image: "https://static.tildacdn.com/tild3831-3030-4362-a335-653832303062/omoikiri-logo_.png"
  },
  {
    id: "grohe",
    name: "Grohe",
    price: 20000,
    materials: ["Хромированная латунь"],
    features: [
      "Немецкие технологии",
      "Экономия воды"
    ],
    image: "https://www.ediltuttoalcamo.it/userfiles/settori/termoidraulica/ediltutto-alcamo-trapani-partners-grohe.jpg"
  }
];

const Calculator = () => {
  const { toast } = useToast();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [layout, setLayout] = useState("straight");
  const [material, setMaterial] = useState("standard");
  const [selectedSink, setSelectedSink] = useState("blanco");
  const [selectedFaucet, setSelectedFaucet] = useState("blanco");
  const [hardwareClass, setHardwareClass] = useState("blum");
  const [selectedSinkMaterial, setSelectedSinkMaterial] = useState("");
  const [selectedSinkColor, setSelectedSinkColor] = useState("");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedLayout = layouts.find(l => l.id === layout);
    const selectedMaterial = materials.find(m => m.id === material);
    const selectedHardware = hardware.find(h => h.id === hardwareClass);
    const selectedSinkItem = sinks.find(s => s.id === selectedSink);
    const selectedFaucetItem = faucets.find(f => f.id === selectedFaucet);
    
    const area = Number(length) * Number(width);
    const basePrice = area * (selectedMaterial?.price || 0);
    const layoutMultiplier = selectedLayout?.multiplier || 1;
    
    const total = (basePrice * layoutMultiplier) + 
                 (selectedHardware?.price || 0) +
                 (selectedSinkItem?.price || 0) +
                 (selectedFaucetItem?.price || 0);

    toast({
      title: "Предварительный расчет",
      description: `Примерная стоимость кухни: ${total.toLocaleString()} ₽`,
    });
  };

  const currentSink = sinks.find(s => s.id === selectedSink);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-center mb-12">
            Рассчитать стоимость кухни
          </h1>
          
          <form onSubmit={handleCalculate} className="space-y-12">
            {/* Размеры кухни */}
            <div className="glass-panel p-8">
              <h2 className="font-display text-2xl mb-6">Размеры кухни</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Длина (в метрах)
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                    min="1"
                    max="20"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ширина (в метрах)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                    min="1"
                    max="20"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Форма кухни */}
            <div className="glass-panel p-8">
              <h2 className="font-display text-2xl mb-6">Форма кухни</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {layouts.map(l => (
                  <label 
                    key={l.id}
                    className={`relative cursor-pointer rounded-xl overflow-hidden group ${
                      layout === l.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="layout"
                      value={l.id}
                      checked={layout === l.id}
                      onChange={(e) => setLayout(e.target.value)}
                      className="sr-only"
                    />
                    <img
                      src={l.image}
                      alt={l.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                      <h3 className="text-white font-medium mb-1">{l.name}</h3>
                      <p className="text-white/80 text-sm">{l.description}</p>
                    </div>
                    {layout === l.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Материал фасадов */}
            <div className="glass-panel p-8">
              <h2 className="font-display text-2xl mb-6">Материал фасадов</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {materials.map(m => (
                  <label 
                    key={m.id}
                    className={`relative cursor-pointer rounded-xl overflow-hidden ${
                      material === m.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="material"
                      value={m.id}
                      checked={material === m.id}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="sr-only"
                    />
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{m.name}</h3>
                        <span className="text-primary">от {m.price.toLocaleString()} ₽/м²</span>
                      </div>
                      <ul className="space-y-1">
                        {m.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Мойка и смеситель */}
            <div className="glass-panel p-8">
              <h2 className="font-display text-2xl mb-6">Мойка и смеситель</h2>
              
              {/* Выбор мойки */}
              <div className="space-y-6 mb-8">
                <h3 className="font-medium text-lg">Выберите мойку</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sinks.map(sink => (
                    <label 
                      key={sink.id}
                      className={`relative cursor-pointer rounded-xl overflow-hidden ${
                        selectedSink === sink.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sink"
                        value={sink.id}
                        checked={selectedSink === sink.id}
                        onChange={(e) => {
                          setSelectedSink(e.target.value);
                          setSelectedSinkMaterial(sink.materials[0] || "");
                          setSelectedSinkColor(sink.colors?.[0] || "");
                        }}
                        className="sr-only"
                      />
                      <img
                        src={sink.image}
                        alt={sink.name}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{sink.name}</h3>
                          <span className="text-primary">{sink.price.toLocaleString()} ₽</span>
                        </div>
                        <ul className="space-y-1">
                          {sink.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Материал и цвет мойки */}
                {currentSink && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Материал мойки
                      </label>
                      <select
                        value={selectedSinkMaterial}
                        onChange={(e) => setSelectedSinkMaterial(e.target.value)}
                        className="w-full p-3 border rounded-lg bg-background"
                      >
                        {currentSink.materials.map(material => (
                          <option key={material} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>
                    </div>
                    {currentSink.colors && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Цвет мойки
                        </label>
                        <select
                          value={selectedSinkColor}
                          onChange={(e) => setSelectedSinkColor(e.target.value)}
                          className="w-full p-3 border rounded-lg bg-background"
                        >
                          {currentSink.colors.map(color => (
                            <option key={color} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Выбор смесителя */}
              <div className="space-y-6">
                <h3 className="font-medium text-lg">Выберите смеситель</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {faucets.map(faucet => (
                    <label 
                      key={faucet.id}
                      className={`relative cursor-pointer rounded-xl overflow-hidden ${
                        selectedFaucet === faucet.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="faucet"
                        value={faucet.id}
                        checked={selectedFaucet === faucet.id}
                        onChange={(e) => setSelectedFaucet(e.target.value)}
                        className="sr-only"
                      />
                      <img
                        src={faucet.image}
                        alt={faucet.name}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{faucet.name}</h3>
                          <span className="text-primary">{faucet.price.toLocaleString()} ₽</span>
                        </div>
                        <ul className="space-y-1">
                          {faucet.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Фурнитура */}
            <div className="glass-panel p-8">
              <h2 className="font-display text-2xl mb-6">Фурнитура</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hardware.map(h => (
                  <label 
                    key={h.id}
                    className={`relative cursor-pointer rounded-xl overflow-hidden ${
                      hardwareClass === h.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="hardware"
                      value={h.id}
                      checked={hardwareClass === h.id}
                      onChange={(e) => setHardwareClass(e.target.value)}
                      className="sr-only"
                    />
                    <img
                      src={h.image}
                      alt={h.name}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{h.name}</h3>
                        <span className="text-primary">{h.price.toLocaleString()} ₽</span>
                      </div>
                      <ul className="space-y-1">
                        {h.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="button-primary w-full flex items-center justify-center gap-2 py-4"
            >
              Рассчитать стоимость
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
