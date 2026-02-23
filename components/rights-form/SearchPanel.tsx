'use client';

import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SearchPanelProps {
  onSearch: (type: string, value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  hasResult?: boolean;
  error?: string;
}

type SearchType = 'shareholder-name' | 'account-number' | 'bank-account' | 'chn';

export function SearchPanel({
  onSearch,
  onClear,
  isLoading = false,
  hasResult = false,
  error,
}: SearchPanelProps) {
  const [searchType, setSearchType] = useState<SearchType>('shareholder-name');
  const [searchValue, setSearchValue] = useState('');

  const searchOptions: { value: SearchType; label: string; placeholder: string }[] = [
    {
      value: 'shareholder-name',
      label: 'Shareholder Name',
      placeholder: 'Enter full name',
    },
    {
      value: 'account-number',
      label: 'iX-Trac Account Number',
      placeholder: 'Enter account number',
    },
    {
      value: 'bank-account',
      label: 'Bank Account Number',
      placeholder: 'Enter bank account number',
    },
    {
      value: 'chn',
      label: 'CHN (Clearing House Number)',
      placeholder: 'Enter CHN',
    },
  ];

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchType, searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchType('shareholder-name');
    onClear();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const currentOption = searchOptions.find(opt => opt.value === searchType);

  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Find My Account in iX-Trac
        </h2>
        <p className="text-muted-foreground mb-6">
          Search using any one of the following details
        </p>

        <div className="space-y-6">
          {/* Search type selector */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Search by:
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {searchOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSearchType(option.value);
                    setSearchValue('');
                  }}
                  className={cn(
                    'p-3 rounded-lg border-2 font-medium text-sm transition-all text-left',
                    searchType === option.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background text-foreground hover:border-primary/50'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search input */}
          <div>
            <Label htmlFor="search-value" className="text-base font-semibold mb-2 block">
              {currentOption?.label}
            </Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  id="search-value"
                  type="text"
                  placeholder={currentOption?.placeholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="text-base"
                  aria-label={`Search by ${currentOption?.label}`}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!searchValue.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={18} className="mr-2" />
                    Search
                  </>
                )}
              </Button>
              {(hasResult || searchValue) && (
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="border-border"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">Search Error</p>
                <p className="text-sm text-destructive/90 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Success message */}
          {hasResult && !error && (
            <div className="p-4 bg-green-100/50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  Account Found
                </p>
                <p className="text-sm text-green-600/90 dark:text-green-400/90 mt-1">
                  Your account details are ready to review
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
