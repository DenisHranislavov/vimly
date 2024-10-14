import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-[1240px] mx-auto py-12 px-6 text-left">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Terms of Service
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-4">
        Last updated: October 13, 2024
      </p>

      <div className="space-y-8">
        <section>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            <strong>Note:</strong> This is not a real Terms of Service. It is
            for display purposes only to ensure the site looks filled and
            professional. Please consult a lawyer for legitimate terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Acceptance of Terms
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            By accessing or using the Vimly platform, you agree to comply with
            and be bound by the following terms and conditions. If you disagree
            with any part of these terms, you may not access the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            User Responsibilities
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            As a user, you agree to use the Vimly platform for lawful purposes
            only. You are responsible for ensuring the security of your account
            information, including passwords and any actions taken under your
            account.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Content Ownership
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            All content published on Vimly is either owned by us or used with
            permission from third parties. You agree not to reproduce,
            distribute, or otherwise use the content for commercial purposes
            without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Termination of Access
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            We reserve the right to terminate or suspend your access to Vimly at
            any time, without notice, if you violate these terms or for any
            other reason deemed necessary.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Changes to Terms
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Vimly reserves the right to modify or update these terms at any
            time. Your continued use of the platform constitutes your acceptance
            of any changes.
          </p>
        </section>
      </div>
    </div>
  );
}
