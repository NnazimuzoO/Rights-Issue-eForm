'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Lock, ClipboardList, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Rights Issue Acceptance/Renunciation e-Form
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Submit your rights issue application online in a few simple steps. Secure,
              transparent, and efficient.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Info Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Secure & Encrypted</h3>
              <p className="text-muted-foreground">
                Your personal and financial information is protected with industry-standard
                encryption protocols.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">
                Simple & Intuitive
              </h3>
              <p className="text-muted-foreground">
                Our guided form process makes it easy for shareholders to complete their
                acceptance or renunciation application.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">
                Professional Grade
              </h3>
              <p className="text-muted-foreground">
                Registrar-verified interface with audit trails and compliance tracking for
                institutional-grade processing.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Shareholder Button */}
            <Link href="/form/shareholder">
              <Button
                className="w-full h-auto flex flex-col items-start justify-start p-6 bg-primary hover:bg-primary/90 text-primary-foreground group"
                size="lg"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="text-lg font-bold">Shareholder Access</div>
                    <p className="text-sm text-primary-foreground/80 mt-1">
                      Submit your application
                    </p>
                  </div>
                  <ArrowRight
                    size={24}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Button>
            </Link>

            {/* Registrar Button */}
            <Link href="/form/registrar">
              <Button
                className="w-full h-auto flex flex-col items-start justify-start p-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground group"
                size="lg"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="text-lg font-bold">Registrar Access</div>
                    <p className="text-sm text-secondary-foreground/80 mt-1">
                      Process applications
                    </p>
                  </div>
                  <ArrowRight
                    size={24}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Button>
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-16 border-t border-border">
          {/* For Shareholders */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">For Shareholders</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Search your account using your name, account number, or CHN</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  View your provisional allotment details auto-populated from iX-Trac
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Complete your acceptance/renunciation with payment evidence
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Preview and print your form before final submission</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Save drafts and return later to complete your application
                </span>
              </li>
            </ul>
          </div>

          {/* For Registrars */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">For Registrars</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Access submitted shareholder applications with all details
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Complete "For Registrar Use Only" verification section
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>
                  Auto-calculated totals for allotted shares and amounts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Upload receiving agent stamps and verification documents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Submit final application to Issuing House with audit trail</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="bg-muted/50 p-6 rounded-lg border border-border text-center">
            <p className="text-sm text-muted-foreground">
              This is a demonstration of the Rights Issue Acceptance/Renunciation e-Form.
              Mock data is provided for demonstration purposes only.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 NSL Capital Partners Limited. All rights reserved.</p>
          <p className="mt-2">
            For support, please contact: rights@nslcapital.com | +234 (0)1 234 5678
          </p>
        </div>
      </footer>
    </div>
  );
}
