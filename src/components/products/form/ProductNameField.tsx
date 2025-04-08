
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';

interface ProductNameFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductNameField: React.FC<ProductNameFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome do produto</FormLabel>
          <FormControl>
            <Input placeholder="Nome do produto" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductNameField;
