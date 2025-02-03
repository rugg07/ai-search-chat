'use client';

import { useState, FormEvent } from 'react';
import { Search, Command, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {isLoading ? (
              <div className="animate-spin">
                <Command className="w-5 h-5 text-muted-foreground" />
              </div>
            ) : (
              <Search className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full py-4 pl-12 pr-16 text-lg bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground"
            placeholder="Ask anything..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <Sparkles className="w-5 h-5 text-primary hover:text-primary/80 transition-colors" />
          </button>
        </div>
      </div>
    </form>
  );
} 