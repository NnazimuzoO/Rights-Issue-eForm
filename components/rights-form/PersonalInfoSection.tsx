'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface PersonalInfoData {
  shareholderName: string;
  nextOfKin: string;
  daytimePhone: string;
  mobilePhone: string;
  email: string;
}

interface PersonalInfoSectionProps {
  onChange?: (data: PersonalInfoData) => void;
  initialData?: PersonalInfoData;
}

export function PersonalInfoSection({
  onChange,
  initialData,
}: PersonalInfoSectionProps) {
  const [formData, setFormData] = useState<PersonalInfoData>(
    initialData || {
      shareholderName: '',
      nextOfKin: '',
      daytimePhone: '',
      mobilePhone: '',
      email: '',
    }
  );

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleChange = (field: keyof PersonalInfoData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          Personal / Corporate Contact Information
        </h2>
        <p className="text-muted-foreground">
          Complete this section for both acceptance and renunciation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name in block letters */}
        <div className="md:col-span-2">
          <Label htmlFor="shareholder-name" className="text-sm font-semibold mb-2 block">
            Name(s) in block letters (**)
          </Label>
          <Input
            id="shareholder-name"
            type="text"
            placeholder="Enter full name"
            value={formData.shareholderName}
            onChange={(e) => handleChange('shareholderName', e.target.value)}
            required
            aria-label="Shareholder name in block letters"
          />
          <p className="text-xs text-muted-foreground mt-1">
            * This field is required and should match iX-Trac records
          </p>
        </div>

        {/* Next of Kin */}
        <div>
          <Label htmlFor="next-of-kin" className="text-sm font-semibold mb-2 block">
            Next of Kin (**)
          </Label>
          <Input
            id="next-of-kin"
            type="text"
            placeholder="Enter next of kin name"
            value={formData.nextOfKin}
            onChange={(e) => handleChange('nextOfKin', e.target.value)}
            required
            aria-label="Next of kin"
          />
        </div>

        {/* Daytime Phone */}
        <div>
          <Label htmlFor="daytime-phone" className="text-sm font-semibold mb-2 block">
            Daytime Telephone Number (**)
          </Label>
          <Input
            id="daytime-phone"
            type="tel"
            placeholder="+234 (0)1 234 5678"
            value={formData.daytimePhone}
            onChange={(e) => handleChange('daytimePhone', e.target.value)}
            required
            aria-label="Daytime telephone number"
          />
        </div>

        {/* Mobile Phone */}
        <div>
          <Label htmlFor="mobile-phone" className="text-sm font-semibold mb-2 block">
            Mobile (GSM) Telephone Number (**)
          </Label>
          <Input
            id="mobile-phone"
            type="tel"
            placeholder="+234 (0)801 234 5678"
            value={formData.mobilePhone}
            onChange={(e) => handleChange('mobilePhone', e.target.value)}
            required
            aria-label="Mobile telephone number"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm font-semibold mb-2 block">
            Email Address (*)
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-label="Email address"
          />
          <p className="text-xs text-muted-foreground mt-1">
            * Optional - but recommended for future communications
          </p>
        </div>
      </div>
    </div>
  );
}
