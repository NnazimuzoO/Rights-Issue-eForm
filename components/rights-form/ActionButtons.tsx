'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  mode: 'shareholder' | 'registrar' | 'stockbroker';
  currentStep?: number;
  step?: number;
  totalSteps: number;
  isValid?: boolean;
  isLoading?: boolean;
  onSaveDraft?: () => void;
  onPreview?: () => void;
  onPreviewPrint?: () => void;
  onSubmit?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  showDraftButton?: boolean;
  showPreviewButton?: boolean;
  showSubmitButton?: boolean;
  submitLabel?: string;
  customButtons?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    icon?: React.ReactNode;
    disabled?: boolean;
  }>;
}

export function ActionButtons({
  mode,
  currentStep,
  step,
  totalSteps,
  isValid = true,
  isLoading = false,
  onSaveDraft,
  onPreview,
  onPreviewPrint,
  onSubmit,
  onPrevious,
  onNext,
  canGoBack = (currentStep ?? step ?? 0) > 0,
  canGoForward = (currentStep ?? step ?? 0) < totalSteps - 1,
  showDraftButton = true,
  showPreviewButton = true,
  showSubmitButton = (currentStep ?? step ?? 0) === totalSteps - 1,
  submitLabel = mode === 'registrar' ? 'Submit to Issuing House' : mode === 'stockbroker' ? 'Submit to Registrar' : 'Submit Application',
  customButtons = [],
}: ActionButtonsProps) {
  const activeStep = currentStep ?? step ?? 0;
  const isLastStep = activeStep === totalSteps - 1;
  const previewCallback = onPreviewPrint || onPreview;

  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between items-center mt-8 pt-8 border-t border-border">
      {/* Navigation buttons - left side */}
      <div className="flex gap-2 order-3 md:order-1 w-full md:w-auto">
        <Button
          onClick={onPrevious}
          disabled={!canGoBack || isLoading}
          variant="outline"
          className="flex-1 md:flex-none"
          aria-label="Go to previous step"
        >
          <ChevronLeft size={18} className="mr-2" />
          Previous
        </Button>

        {canGoForward && (
          <Button
            onClick={onNext}
            disabled={!isValid || isLoading}
            variant="outline"
            className="flex-1 md:flex-none"
            aria-label="Go to next step"
          >
            Next
            <ChevronRight size={18} className="ml-2" />
          </Button>
        )}
      </div>

      {/* Primary action buttons - center/right side */}
      <div className="flex gap-2 flex-wrap justify-end order-1 md:order-2 w-full md:w-auto">
        {/* Custom buttons */}
        {customButtons.map((btn, idx) => (
          <Button
            key={idx}
            onClick={btn.onClick}
            disabled={btn.disabled || isLoading}
            variant={btn.variant}
          >
            {btn.icon}
            {btn.label}
          </Button>
        ))}

        {/* Draft button */}
        {showDraftButton && onSaveDraft && (
          <Button
            onClick={onSaveDraft}
            disabled={isLoading}
            variant="outline"
            aria-label="Save draft"
          >
            <Save size={18} className="mr-2" />
            Save Draft
          </Button>
        )}

        {/* Preview button */}
        {showPreviewButton && previewCallback && (
          <Button
            onClick={previewCallback}
            disabled={!isValid || isLoading}
            variant="outline"
            aria-label="Preview and print"
          >
            <Eye size={18} className="mr-2" />
            {mode === 'stockbroker' ? 'Preview/Print' : 'Preview'}
          </Button>
        )}

        {/* Submit button */}
        {showSubmitButton && onSubmit && (
          <Button
            onClick={onSubmit}
            disabled={!isValid || isLoading}
            className={cn(
              'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold',
              !isValid && 'opacity-50 cursor-not-allowed'
            )}
            aria-label={submitLabel}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                {submitLabel}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
