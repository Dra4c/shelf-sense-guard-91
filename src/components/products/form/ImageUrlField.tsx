
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';

interface ImageUrlFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

const ImageUrlField: React.FC<ImageUrlFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>URL da imagem</FormLabel>
          <FormControl>
            <Input placeholder="URL da imagem (opcional)" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUrlField;
