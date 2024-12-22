import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your privacy is important to us
          </p>
        </div>

        <div className="space-y-12">
          {/* Data Collection */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Data Collection
              </h2>
            </div>
            <div className="prose dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300">
                We collect information that you provide directly to us, including
                when you create an account, send messages, or interact with other
                users.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Data Security
              </h2>
            </div>
            <div className="prose dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300">
                We implement appropriate technical and organizational measures to
                protect your personal data against unauthorized access,
                modification, disclosure, or destruction.
              </p>
            </div>
          </section>

          {/* Data Usage */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Data Usage
              </h2>
            </div>
            <div className="prose dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300">
                We use your data to provide and improve our services, communicate
                with you, and ensure platform security.
              </p>
            </div>
          </section>
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-300">
          <p>Last updated: March 1, 2024</p>
        </div>
      </div>
    </div>
  );
};