'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

export interface SignaturesData {
  signature: File | null;
  secondSignature?: File | null;
  authSignatoryName?: string;
  designation?: string;
  incorporationNumber?: string;
  corporateSeal?: File | null;
  isCorporate?: boolean;
}

interface SignaturesSectionProps {
  onChange?: (data: SignaturesData) => void;
  isCorporate?: boolean;
  initialData?: SignaturesData;
}

export function SignaturesSection({
  onChange,
  isCorporate = false,
  initialData,
}: SignaturesSectionProps) {
  const [formData, setFormData] = useState<SignaturesData>(
    initialData || {
      signature: null,
      secondSignature: null,
      authSignatoryName: '',
      designation: '',
      incorporationNumber: '',
      corporateSeal: null,
      isCorporate,
    }
  );

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleFileChange = (field: keyof SignaturesData, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleTextChange = (field: keyof SignaturesData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const FileUploadBox = ({
    label,
    id,
    file,
    onChange: onFileChange,
    required = false,
  }: {
    label: string;
    id: string;
    file: File | null;
    onChange: (file: File | null) => void;
    required?: boolean;
  }) => (
    <div>
      <Label className="text-sm font-semibold mb-2 block">
        {label} {required ? '(**)' : '(*)'}
      </Label>
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
        <input
          type="file"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="hidden"
          id={id}
          accept=".jpg,.jpeg,.png,.pdf"
          aria-label={label}
        />
        <label htmlFor={id} className="cursor-pointer block">
          <Upload size={20} className="mx-auto mb-2 text-muted-foreground" />
          <p className="font-semibold text-foreground text-sm mb-0.5">
            {file ? file.name : 'Click to upload or drag & drop'}
          </p>
          <p className="text-xs text-muted-foreground">
            JPG, PNG or PDF (Max 2MB)
          </p>
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          Signatures & Authorization
        </h2>
        <p className="text-muted-foreground">
          Sign this form to authorize your application
        </p>
      </div>

      {/* Individual/Joint Signatures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploadBox
          label="Signature"
          id="signature-upload"
          file={formData.signature}
          onChange={(file) => handleFileChange('signature', file)}
          required
        />

        <FileUploadBox
          label="2nd Signature (Joint only)"
          id="second-signature-upload"
          file={formData.secondSignature}
          onChange={(file) => handleFileChange('secondSignature', file)}
          required={false}
        />
      </div>

      {/* Corporate Only Section */}
      {isCorporate && (
        <div className="border-l-4 border-secondary p-6 bg-secondary/5 rounded-r-lg space-y-6">
          <h3 className="text-lg font-bold text-primary">
            Corporate Signatories Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Authorized Signatory Name */}
            <div>
              <Label htmlFor="auth-signatory" className="text-sm font-semibold mb-2 block">
                Name of Authorised Signatory (*)
              </Label>
              <Input
                id="auth-signatory"
                type="text"
                placeholder="Full name"
                value={formData.authSignatoryName || ''}
                onChange={(e) => handleTextChange('authSignatoryName', e.target.value)}
                aria-label="Authorized signatory name"
              />
            </div>

            {/* Designation */}
            <div>
              <Label htmlFor="designation" className="text-sm font-semibold mb-2 block">
                Designation (*)
              </Label>
              <Input
                id="designation"
                type="text"
                placeholder="e.g., Director, Company Secretary"
                value={formData.designation || ''}
                onChange={(e) => handleTextChange('designation', e.target.value)}
                aria-label="Designation"
              />
            </div>

            {/* Incorporation Number */}
            <div>
              <Label htmlFor="inc-number" className="text-sm font-semibold mb-2 block">
                Incorporation Number (*)
              </Label>
              <Input
                id="inc-number"
                type="text"
                placeholder="RC/ABC/123456"
                value={formData.incorporationNumber || ''}
                onChange={(e) => handleTextChange('incorporationNumber', e.target.value)}
                aria-label="Incorporation number"
              />
            </div>
          </div>

          {/* Corporate Seal */}
          <FileUploadBox
            label="Incorporation Number and Seal"
            id="seal-upload"
            file={formData.corporateSeal}
            onChange={(file) => handleFileChange('corporateSeal', file)}
            required={false}
          />
        </div>
      )}

      {/* Info box */}
      <div className="p-4 bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-semibold">📝 Signature Requirements:</span> Upload a clear, legible image or PDF of your signature. For corporate entities, ensure proper authorization stamps are included.
        </p>
      </div>
    </div>
  );
}
