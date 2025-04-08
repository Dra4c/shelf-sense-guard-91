
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';

interface UnitStockFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

const UnitStockFields: React.FC<UnitStockFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unidade de medida</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma unidade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="unidade">Unidade</SelectItem>
                <SelectItem value="caixa">Caixa</SelectItem>
                <SelectItem value="fardo">Fardo</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="minStock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estoque mínimo</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Estoque mínimo" 
                {...field} 
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UnitStockFields;
