'use client';

import { SearchResult } from '@/types/search';
import { ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-accent/50 rounded-lg animate-pulse space-y-3"
          >
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
      {results.map((result, index) => (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 bg-card border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-medium">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {result.title}
              </a>
            </h3>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-accent rounded"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
          <p className="mt-2 text-muted-foreground">{result.description}</p>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>{result.timestamp}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 