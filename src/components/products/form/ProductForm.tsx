
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { ProductFormValues } from './types';
import { ProductNameField } from './';
import { CategoryBrandFields } from './';
import { UnitStockFields } from './';
import { BarcodeField } from './';
import { ExpiryDateField } from './';
import { ImageUrlField } from './';
import { FormActions } from './';

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  initialData?: Partial<ProductFormValues>;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      brand: initialData?.brand || '',
      barcode: initialData?.barcode || '',
      minStock: initialData?.minStock || 10,
      image: initialData?.image || '',
      expiryDate: initialData?.expiryDate,
      unit: initialData?.unit || 'unidade',
    },
  });
  
  // Update form when initialData changes (e.g., when barcode is scanned)
  useEffect(() => {
    if (initialData?.barcode) {
      form.setValue('barcode', initialData.barcode);
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ProductNameField form={form} />
        <CategoryBrandFields form={form} />
        <UnitStockFields form={form} />
        <BarcodeField form={form} />
        <ExpiryDateField form={form} />
        <ImageUrlField form={form} />
        <FormActions onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default ProductForm;
