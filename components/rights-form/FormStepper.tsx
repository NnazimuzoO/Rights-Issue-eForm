'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  completedSteps?: number[];
}

export function FormStepper({
  steps,
  currentStep,
  onStepClick,
  completedSteps = [],
}: FormStepperProps) {
  return (
    <div className="w-full py-8 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Mobile version - vertical */}
        <div className="md:hidden">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(index);

            return (
              <div key={step.id} className="mb-4">
                <button
                  onClick={() => onStepClick?.(index)}
                  className={cn(
                    'w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all text-left',
                    isActive
                      ? 'border-primary bg-primary/5'
                      : isCompleted
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border bg-card'
                  )}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm',
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {isCompleted ? <Check size={16} /> : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{step.label}</h3>
                    {step.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Desktop version - horizontal */}
        <div className="hidden md:block">
          <div className="flex items-center">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = completedSteps.includes(index);
              const isNotLast = index < steps.length - 1;

              return (
                <React.Fragment key={step.id}>
                  {/* Step circle and label */}
                  <button
                    onClick={() => onStepClick?.(index)}
                    className={cn(
                      'flex flex-col items-center gap-2 relative z-10 transition-all',
                      'group cursor-pointer'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all',
                        isCompleted
                          ? 'border-primary bg-primary text-primary-foreground'
                          : isActive
                          ? 'border-primary bg-background text-primary ring-2 ring-primary ring-offset-2'
                          : 'border-border bg-card text-foreground'
                      )}
                    >
                      {isCompleted ? <Check size={16} /> : index + 1}
                    </div>
                    <div className="text-center max-w-xs">
                      <h4 className={cn(
                        'text-sm font-semibold transition-colors',
                        isActive ? 'text-primary' : isCompleted ? 'text-primary' : 'text-muted-foreground'
                      )}>
                        {step.label}
                      </h4>
                      {step.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </button>

                  {/* Connector line */}
                  {isNotLast && (
                    <div className="flex-1 mx-2 h-1 rounded-full mb-8 transition-colors"
                      style={{
                        backgroundColor: completedSteps.includes(index) || completedSteps.includes(index + 1) 
                          ? 'var(--primary)' 
                          : 'var(--border)'
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
