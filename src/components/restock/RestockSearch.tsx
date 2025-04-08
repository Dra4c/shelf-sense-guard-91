
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Product } from "@/types";

interface RestockSearchProps {
  products: Product[];
  onSearchResults: (results: Product[]) => void;
  placeholder?: string;
}

const RestockSearch: React.FC<RestockSearchProps> = ({
  products,
  onSearchResults,
  placeholder = "Buscar produtos por nome, categoria ou marca...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter products based on search term
    if (searchTerm.trim() === "") {
      onSearchResults(products);
      return;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.barcode.includes(normalizedSearch)
    );

    onSearchResults(results);
  }, [searchTerm, products, onSearchResults]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default RestockSearch;
