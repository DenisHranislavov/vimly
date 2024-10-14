import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-[1240px] mx-auto py-12 px-6 text-left">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Privacy Policy
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-4">
        Last updated: October 13, 2024
      </p>

      <div className="space-y-8">
        <section>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            <strong>Note:</strong> This is not a real Privacy Policy. It serves
            only to make the site look complete and professional. For actual
            legal information, consult a legal expert.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Introduction
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Vimly is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and share your personal information
            when you use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Information We Collect
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            We collect information that you provide directly to us, such as when
            you create an account, submit content, or communicate with us. This
            may include your name, email address, and other contact information.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            We use your information to provide, maintain, and improve the Vimly
            platform, as well as to communicate with you about updates, security
            notices, and promotional offers.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Sharing of Information
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            We do not share your personal information with third parties except
            as required by law or with your explicit consent. We may share
            anonymized data with partners to improve the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Your Privacy Choices
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            You have the right to access, update, or delete your personal
            information at any time. If you have any questions or concerns about
            your privacy, you can contact us at support@vimly.com.
          </p>
        </section>
      </div>
    </div>
  );
}
