import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MaterialOption {
  id: number;
  type: string;
  name: string;
  description: string | null;
  price: number;
  features: string[];
  specifications: any;
  created_at: string;
}

interface MaterialImage {
  id: number;
  material_id: number;
  image_url: string;
  is_primary: boolean;
}

const MaterialsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = useState("layout");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: materials, refetch } = useQuery({
    queryKey: ['materials', selectedType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('material_options')
        .select('*')
        .eq('type', selectedType)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as MaterialOption[];
    }
  });

  const { data: images } = useQuery({
    queryKey: ['material_images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('material_images')
        .select('*');

      if (error) throw error;
      return data as MaterialImage[];
    }
  });

  const getMaterialImages = (materialId: number) => {
    return images?.filter(img => img.material_id === materialId) || [];
  };

  const handleImageUpload = async (materialId: number, file: File) => {
    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${selectedType}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('materials')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('material_images')
        .insert([
          {
            material_id: materialId,
            image_url: publicUrl,
            is_primary: false
          }
        ]);

      if (dbError) throw dbError;

      toast({
        title: "Изображение загружено",
        description: "Изображение успешно добавлено к материалу"
      });

      await queryClient.invalidateQueries({ queryKey: ['material_images'] });
      await refetch();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось загрузить изображение",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    try {
      const materialImages = getMaterialImages(id);
      for (const image of materialImages) {
        await handleDeleteImage(image.id, image.image_url);
      }

      const { error } = await supabase
        .from('material_options')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Материал удален",
        description: "Материал успешно удален из базы данных"
      });

      await queryClient.invalidateQueries({ queryKey: ['materials'] });
      await refetch();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить материал",
        variant: "destructive"
      });
    }
  };

  const handleDeleteImage = async (imageId: number, imageUrl: string) => {
    try {
      const { error: dbError } = await supabase
        .from('material_images')
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

      await queryClient.invalidateQueries({ queryKey: ['material_images'] });
      await refetch();
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
      <h1 className="text-3xl font-bold mb-8">Управление материалами и опциями</h1>

      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="mb-8">
          <TabsTrigger value="layout">Формы кухни</TabsTrigger>
          <TabsTrigger value="facade">Фасады</TabsTrigger>
          <TabsTrigger value="countertop">Столешницы</TabsTrigger>
          <TabsTrigger value="hardware">Фурнитура</TabsTrigger>
          <TabsTrigger value="appliance">Техника</TabsTrigger>
          <TabsTrigger value="sink">Мойки</TabsTrigger>
          <TabsTrigger value="faucet">Смесители</TabsTrigger>
        </TabsList>

        <div className="mb-6">
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Добавить {selectedType === 'layout' ? 'форму' : 'материал'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials?.map((material) => (
            <div key={material.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium">{material.name}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedMaterial(material);
                      setIsEditDialogOpen(true);
                    }}
                    className="p-2 hover:bg-accent rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMaterial(material.id)}
                    className="p-2 hover:bg-accent rounded-lg text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{material.description}</p>
              
              <div className="mb-4">
                <p className="font-medium">Цена: {material.price.toLocaleString()} ₽</p>
              </div>

              {material.features && material.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Особенности:</h4>
                  <ul className="list-disc list-inside">
                    {material.features.map((feature, index) => (
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
                  {getMaterialImages(material.id).map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.image_url}
                        alt={material.name}
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
                          handleImageUpload(material.id, file);
                        }
                      }}
                      disabled={uploadingImage}
                    />
                    <div className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      {uploadingImage ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400" />
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Tabs>

      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          setSelectedMaterial(null);
        }
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? 'Редактировать' : 'Добавить'} {selectedType === 'layout' ? 'форму' : 'материал'}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[80vh]">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);

              const materialData = {
                type: selectedType,
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                price: parseFloat(formData.get('price') as string),
                features: formData.get('features') ? (formData.get('features') as string).split('\n').filter(f => f.trim()) : [],
                specifications: formData.get('specifications') ? 
                  JSON.parse((formData.get('specifications') as string) || '{}') : {}
              };

              try {
                let materialId;
                
                if (isEditDialogOpen && selectedMaterial) {
                  const { error } = await supabase
                    .from('material_options')
                    .update(materialData)
                    .eq('id', selectedMaterial.id);

                  if (error) throw error;
                  materialId = selectedMaterial.id;

                  toast({
                    title: "Успешно",
                    description: "Материал обновлен"
                  });
                } else {
                  const { data, error } = await supabase
                    .from('material_options')
                    .insert([materialData])
                    .select();

                  if (error) throw error;
                  materialId = data[0].id;

                  toast({
                    title: "Успешно",
                    description: "Материал добавлен"
                  });
                }

                const imageFiles = (form.querySelector('input[type="file"]') as HTMLInputElement).files;
                if (imageFiles && imageFiles.length > 0) {
                  const file = imageFiles[0];
                  await handleImageUpload(materialId, file);
                }

                await queryClient.invalidateQueries({ queryKey: ['materials'] });
                await refetch();
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
                setSelectedMaterial(null);
              } catch (error: any) {
                console.error('Error:', error);
                toast({
                  title: "Ошибка",
                  description: error.message || "Не удалось сохранить материал",
                  variant: "destructive"
                });
              }
            }} className="space-y-4 p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={selectedMaterial?.name}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Описание</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={selectedMaterial?.description || ''}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Цена</label>
                <input
                  type="number"
                  name="price"
                  required
                  defaultValue={selectedMaterial?.price}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Особенности (каждая с новой строки)</label>
                <textarea
                  name="features"
                  rows={4}
                  defaultValue={selectedMaterial?.features?.join('\n') || ''}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Характеристики (JSON)</label>
                <textarea
                  name="specifications"
                  rows={4}
                  defaultValue={selectedMaterial?.specifications ? JSON.stringify(selectedMaterial.specifications, null, 2) : '{}'}
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
                    setSelectedMaterial(null);
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

export default MaterialsAdmin;
