
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Kitchen {
  id: number;
  name: string;
  description: string | null;
  price: number;
  style: string | null;
  material: string | null;
  features: string[] | null;
  created_at: string;
  specifications: Record<string, any> | null;
  sink_options: Record<string, any> | null;
  hardware_options: Record<string, any> | null;
}

interface KitchenImage {
  id: number;
  product_id: number;
  image_url: string;
}

const KitchensAdmin = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: kitchens, refetch } = useQuery({
    queryKey: ['kitchens'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Kitchen[];
    }
  });

  const { data: images } = useQuery({
    queryKey: ['kitchen_images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_images')
        .select('*');

      if (error) throw error;
      return data as KitchenImage[];
    }
  });

  const getKitchenImages = (kitchenId: number) => {
    return images?.filter(img => img.product_id === kitchenId) || [];
  };

  const handleImageUpload = async (kitchenId: number, file: File) => {
    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `kitchens/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('materials')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('product_images')
        .insert([
          {
            product_id: kitchenId,
            image_url: publicUrl
          }
        ]);

      if (dbError) throw dbError;

      toast({
        title: "Изображение загружено",
        description: "Изображение успешно добавлено к кухне"
      });

      refetch();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteKitchen = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Кухня удалена",
        description: "Кухня успешно удалена из базы данных"
      });

      refetch();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить кухню",
        variant: "destructive"
      });
    }
  };

  const handleDeleteImage = async (imageId: number, imageUrl: string) => {
    try {
      const { error: dbError } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      const filePathMatch = imageUrl.match(/materials\/(.*)/);
      if (filePathMatch) {
        const filePath = filePathMatch[1];
        
        const { error: storageError } = await supabase.storage
          .from('materials')
          .remove([filePath]);

        if (storageError) throw storageError;
      }

      toast({
        title: "Изображение удалено",
        description: "Изображение успешно удалено"
      });

      refetch();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить изображение",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление готовыми кухнями</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Добавить кухню
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kitchens?.map((kitchen) => (
          <div key={kitchen.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium">Кухня «{kitchen.name}»</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedKitchen(kitchen);
                    setIsEditDialogOpen(true);
                  }}
                  className="p-2 hover:bg-accent rounded-lg"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteKitchen(kitchen.id)}
                  className="p-2 hover:bg-accent rounded-lg text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{kitchen.description}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Стиль</span>
                <span className="font-medium">{kitchen.style}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Материал</span>
                <span className="font-medium">{kitchen.material}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Цена</span>
                <span className="font-medium">{kitchen.price.toLocaleString()} ₽/м.п.</span>
              </div>
            </div>

            {kitchen.features && kitchen.features.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Особенности:</h4>
                <ul className="list-disc list-inside">
                  {kitchen.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-medium">Изображения:</h4>
              <div className="grid grid-cols-3 gap-2">
                {getKitchenImages(kitchen.id).map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt={kitchen.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDeleteImage(image.id, image.image_url)}
                      className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(kitchen.id, file);
                      }
                    }}
                  />
                  <div className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          setSelectedKitchen(null);
        }
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? 'Редактировать' : 'Добавить'} кухню
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[80vh]">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);

              const kitchenData = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                price: parseFloat(formData.get('price') as string),
                style: formData.get('style') as string,
                material: formData.get('material') as string,
                features: formData.get('features') ? (formData.get('features') as string).split('\n').filter(f => f.trim()) : [],
                specifications: formData.get('specifications') ? 
                  JSON.parse((formData.get('specifications') as string) || '{}') : {},
                sink_options: formData.get('sink_options') ? 
                  JSON.parse((formData.get('sink_options') as string) || '{}') : {},
                hardware_options: formData.get('hardware_options') ? 
                  JSON.parse((formData.get('hardware_options') as string) || '{}') : {}
              };

              try {
                let kitchenId;
                
                if (isEditDialogOpen && selectedKitchen) {
                  const { error } = await supabase
                    .from('products')
                    .update(kitchenData)
                    .eq('id', selectedKitchen.id);

                  if (error) throw error;
                  kitchenId = selectedKitchen.id;

                  toast({
                    title: "Успешно",
                    description: "Кухня обновлена"
                  });
                } else {
                  const { data, error } = await supabase
                    .from('products')
                    .insert([kitchenData])
                    .select();

                  if (error) throw error;
                  kitchenId = data[0].id;

                  toast({
                    title: "Успешно",
                    description: "Кухня добавлена"
                  });
                }

                // Загружаем изображения, если они были выбраны
                const imageFiles = (form.querySelector('input[type="file"]') as HTMLInputElement).files;
                if (imageFiles && imageFiles.length > 0) {
                  const file = imageFiles[0];
                  const fileExt = file.name.split('.').pop();
                  const fileName = `${crypto.randomUUID()}.${fileExt}`;
                  const filePath = `kitchens/${fileName}`;

                  const { error: uploadError } = await supabase.storage
                    .from('materials')
                    .upload(filePath, file);

                  if (uploadError) throw uploadError;

                  const { data: { publicUrl } } = supabase.storage
                    .from('materials')
                    .getPublicUrl(filePath);

                  const { error: imageError } = await supabase
                    .from('product_images')
                    .insert([{
                      product_id: kitchenId,
                      image_url: publicUrl
                    }]);

                  if (imageError) throw imageError;
                }

                refetch();
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
                setSelectedKitchen(null);
              } catch (error) {
                console.error('Error:', error);
                toast({
                  title: "Ошибка",
                  description: "Не удалось сохранить кухню",
                  variant: "destructive"
                });
              }
            }} className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Название</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={selectedKitchen?.name}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Цена за метр погонный</label>
                  <input
                    type="number"
                    name="price"
                    required
                    defaultValue={selectedKitchen?.price}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Стиль</label>
                  <select
                    name="style"
                    required
                    defaultValue={selectedKitchen?.style || ''}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Выберите стиль</option>
                    <option value="современный">Современный</option>
                    <option value="классический">Классический</option>
                    <option value="лофт">Лофт</option>
                    <option value="скандинавский">Скандинавский</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Материал</label>
                  <input
                    type="text"
                    name="material"
                    required
                    defaultValue={selectedKitchen?.material}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Описание</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={selectedKitchen?.description || ''}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Особенности (каждая с новой строки)</label>
                <textarea
                  name="features"
                  rows={4}
                  defaultValue={selectedKitchen?.features?.join('\n') || ''}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Характеристики (JSON)</label>
                <textarea
                  name="specifications"
                  rows={4}
                  defaultValue={selectedKitchen?.specifications ? JSON.stringify(selectedKitchen.specifications, null, 2) : '{}'}
                  className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Опции моек и смесителей (JSON)</label>
                <textarea
                  name="sink_options"
                  rows={4}
                  defaultValue={selectedKitchen?.sink_options ? JSON.stringify(selectedKitchen.sink_options, null, 2) : '{}'}
                  className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Опции фурнитуры (JSON)</label>
                <textarea
                  name="hardware_options"
                  rows={4}
                  defaultValue={selectedKitchen?.hardware_options ? JSON.stringify(selectedKitchen.hardware_options, null, 2) : '{}'}
                  className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Изображение</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setIsEditDialogOpen(false);
                    setSelectedKitchen(null);
                  }}
                >
                  Отмена
                </Button>
                <Button type="submit">
                  {isEditDialogOpen ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KitchensAdmin;
