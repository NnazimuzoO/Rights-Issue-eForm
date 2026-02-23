/**
 * Form Utilities for Rights Issue e-Form
 * Handles calculations, validation, and state management
 */

import { AcceptanceData } from '@/components/rights-form/AcceptanceSection';
import { PersonalInfoData } from '@/components/rights-form/PersonalInfoSection';
import { BankDetailsData } from '@/components/rights-form/BankDetailsSection';
import { SignaturesData } from '@/components/rights-form/SignaturesSection';
import { RegistrarData } from '@/components/rights-form/RegistrarSection';

// Calculation utilities
export const calculateAmountPayable = (shares: number, pricePerShare: number): number => {
  return Math.round(shares * pricePerShare * 100) / 100;
};

export const calculateTotalDue = (
  baseAmount: number,
  additionalShares: number,
  pricePerShare: number
): number => {
  const additionalAmount = calculateAmountPayable(additionalShares, pricePerShare);
  return baseAmount + additionalAmount;
};

export const calculateRefundAmount = (totalPayable: number, totalPaid: number): number => {
  const difference = totalPayable - totalPaid;
  return difference > 0 ? 0 : Math.abs(difference);
};

export const calculateTotalAllotted = (accepted: number, additional: number): number => {
  return accepted + additional;
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Nigerian phone number validation
  const phoneRegex = /^(\+?234|0)[789]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

export const validateBVN = (bvn: string): boolean => {
  return bvn.length === 11 && /^\d+$/.test(bvn);
};

export const validateAccountNumber = (accountNumber: string): boolean => {
  return accountNumber.length === 10 && /^\d+$/.test(accountNumber);
};

export const validateChequeNumber = (chequeNumber: string): boolean => {
  return chequeNumber.length > 0;
};

// Form validation
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export const validatePersonalInfo = (data: PersonalInfoData): FormValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.shareholderName?.trim()) {
    errors.shareholderName = ['Shareholder name is required'];
  }

  if (!data.nextOfKin?.trim()) {
    errors.nextOfKin = ['Next of kin is required'];
  }

  if (!data.daytimePhone?.trim()) {
    errors.daytimePhone = ['Daytime phone is required'];
  } else if (!validatePhone(data.daytimePhone)) {
    errors.daytimePhone = ['Invalid phone number format'];
  }

  if (!data.mobilePhone?.trim()) {
    errors.mobilePhone = ['Mobile phone is required'];
  } else if (!validatePhone(data.mobilePhone)) {
    errors.mobilePhone = ['Invalid phone number format'];
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = ['Invalid email format'];
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateBankDetails = (data: BankDetailsData): FormValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.bankName?.trim()) {
    errors.bankName = ['Bank name is required'];
  }

  if (!data.accountNumber?.trim()) {
    errors.accountNumber = ['Account number is required'];
  } else if (!validateAccountNumber(data.accountNumber)) {
    errors.accountNumber = ['Account number must be 10 digits'];
  }

  if (!data.bvn?.trim()) {
    errors.bvn = ['BVN is required'];
  } else if (!validateBVN(data.bvn)) {
    errors.bvn = ['BVN must be 11 digits'];
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateAcceptanceData = (data: AcceptanceData): FormValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.paymentMethod) {
    errors.paymentMethod = ['Payment method is required'];
  }

  if (!data.paymentEvidence) {
    errors.paymentEvidence = ['Payment evidence is required'];
  }

  if (data.acceptanceType === 'additional') {
    if (!data.additionalSharesApplied || data.additionalSharesApplied <= 0) {
      errors.additionalShares = ['Number of additional shares must be greater than 0'];
    }
    if (!data.additionalConfirmation) {
      errors.additionalConfirmation = [
        'You must confirm acceptance of scaled-down shares',
      ];
    }
  }

  if (data.acceptanceType === 'partial') {
    if (!data.sharesAccepted || data.sharesAccepted < 0) {
      errors.sharesAccepted = ['Invalid number of shares accepted'];
    }
    if (!data.sharesRenounced || data.sharesRenounced < 0) {
      errors.sharesRenounced = ['Invalid number of shares renounced'];
    }
  }

  if (
    (data.paymentMethod === 'cheque' || data.paymentMethod === 'draft') &&
    !data.bankName?.trim()
  ) {
    errors.bankName = ['Bank name is required for cheque/draft'];
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignatures = (data: SignaturesData): FormValidationResult => {
  const errors: Record<string, string[]> = {};

  if (!data.signature) {
    errors.signature = ['Signature is required'];
  }

  if (data.isCorporate) {
    if (!data.authSignatoryName?.trim()) {
      errors.authSignatoryName = ['Authorized signatory name is required'];
    }
    if (!data.designation?.trim()) {
      errors.designation = ['Designation is required'];
    }
    if (!data.incorporationNumber?.trim()) {
      errors.incorporationNumber = ['Incorporation number is required'];
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Draft management
export interface FormDraft {
  acceptanceData?: AcceptanceData;
  personalData?: PersonalInfoData;
  bankData?: BankDetailsData;
  signatureData?: SignaturesData;
  currentStep: number;
  timestamp: string;
}

export const saveDraftToStorage = (draft: FormDraft, key: string = 'rightsFormDraft'): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(draft));
  }
};

export const loadDraftFromStorage = (key: string = 'rightsFormDraft'): FormDraft | null => {
  if (typeof window !== 'undefined') {
    const draft = sessionStorage.getItem(key);
    return draft ? JSON.parse(draft) : null;
  }
  return null;
};

export const clearDraftFromStorage = (key: string = 'rightsFormDraft'): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
};

// Format utilities
export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+234 (0)${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

// Submission payload
export interface FormSubmissionPayload {
  shareholder: PersonalInfoData;
  acceptance: AcceptanceData;
  bankDetails: BankDetailsData;
  signatures: SignaturesData;
  metadata: {
    submittedAt: string;
    ipAddress?: string;
    userAgent?: string;
  };
}

export const prepareSubmissionPayload = (
  personal: PersonalInfoData,
  acceptance: AcceptanceData,
  bank: BankDetailsData,
  signature: SignaturesData
): FormSubmissionPayload => {
  return {
    shareholder: personal,
    acceptance,
    bankDetails: bank,
    signatures: signature,
    metadata: {
      submittedAt: new Date().toISOString(),
      userAgent:
        typeof window !== 'undefined'
          ? navigator.userAgent
          : undefined,
    },
  };
};

// Registrar submission payload
export interface RegistrarSubmissionPayload {
  registrarData: RegistrarData;
  shareholder: PersonalInfoData;
  bankDetails: BankDetailsData;
  metadata: {
    processedAt: string;
    registrarId?: string;
  };
}

export const prepareRegistrarSubmissionPayload = (
  registrar: RegistrarData,
  personal: PersonalInfoData,
  bank: BankDetailsData
): RegistrarSubmissionPayload => {
  return {
    registrarData: registrar,
    shareholder: personal,
    bankDetails: bank,
    metadata: {
      processedAt: new Date().toISOString(),
    },
  };
};
