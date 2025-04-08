
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ListNameInputProps {
  listName: string;
  onListNameChange: (name: string) => void;
  onClear: () => void;
}

const ListNameInput: React.FC<ListNameInputProps> = ({ listName, onListNameChange, onClear }) => {
  return (
    <div className="flex items-center gap-4">
      <Input 
        value={listName}
        onChange={(e) => onListNameChange(e.target.value)}
        placeholder="Nome da lista de reposição"
        className="flex-1"
      />
      <Button 
        variant="outline" 
        size="sm"
        onClick={onClear}
      >
        <Trash2 className="h-4 w-4 mr-1" /> Limpar
      </Button>
    </div>
  );
};

export default ListNameInput;
