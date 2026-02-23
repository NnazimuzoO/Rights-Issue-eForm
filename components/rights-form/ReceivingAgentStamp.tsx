'use client';

import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, File } from 'lucide-react';
import { Card } from '@/components/ui/card';

export interface ReceivingAgentStampData {
  stampFile: File | null;
  stampApplied: boolean;
  stampFileName?: string;
}

interface ReceivingAgentStampProps {
  onChange?: (data: ReceivingAgentStampData) => void;
  initialData?: ReceivingAgentStampData;
  title?: string;
  description?: string;
}

export function ReceivingAgentStamp({
  onChange,
  initialData,
  title = 'Receiving Agent Stamp',
  description = 'Upload receiving agent stamp or mark as applied',
}: ReceivingAgentStampProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stampFile, setStampFile] = React.useState<File | null>(initialData?.stampFile || null);
  const [stampApplied, setStampApplied] = React.useState(initialData?.stampApplied || false);
  const [stampFileName, setStampFileName] = React.useState(
    initialData?.stampFileName || ''
  );

  React.useEffect(() => {
    onChange?.({
      stampFile,
      stampApplied,
      stampFileName,
    });
  }, [stampFile, stampApplied, stampFileName, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setStampFile(file);
      setStampFileName(file.name);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setStampApplied(checked);
  };

  const handleRemoveFile = () => {
    setStampFile(null);
    setStampFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6 border border-border bg-card">
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-bold text-primary mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          {/* File Upload */}
          <div className="space-y-3">
            <Label htmlFor="stamp-upload" className="text-sm font-medium text-foreground">
              Upload Stamp Image or PDF
            </Label>
            <div className="relative">
              <Input
                ref={fileInputRef}
                id="stamp-upload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, or PDF (up to 5MB)
                </p>
              </div>
            </div>

            {/* File Preview */}
            {stampFile && (
              <div className="mt-4 p-4 bg-muted/30 border border-border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File size={18} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{stampFileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {(stampFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-destructive hover:text-destructive/80 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/30">
            <Checkbox
              id="stamp-applied"
              checked={stampApplied}
              onCheckedChange={handleCheckboxChange}
            />
            <Label
              htmlFor="stamp-applied"
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              Stamp has been physically applied (no digital copy)
            </Label>
          </div>
        </div>

        {/* Status Message */}
        {!stampFile && !stampApplied && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              ⚠ Receiving agent stamp information is required before final submission.
            </p>
          </div>
        )}

        {stampApplied && !stampFile && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              ✓ Stamp marked as physically applied. No digital upload needed.
            </p>
          </div>
        )}

        {stampFile && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Stamp document uploaded successfully.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
