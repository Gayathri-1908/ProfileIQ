import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const features = [
    "AI Resume Analysis",
    "LinkedIn Profile Analysis",
    "ATS Score",
    "Specific Resume Improvements",
    "Missing Keyword Detection",
    "Grammar & Formatting Checks",
    "AI Rewritten Resume Sections",
    "LinkedIn Assistant",
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10">

        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F7FA] border border-[#D9E0EA] text-sm font-medium text-[#182C61] mb-5">
            <Sparkles className="w-4 h-4 text-[#182C61]" />
            Simple & Transparent Pricing
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#182C61]">
            Choose the plan that works{" "}
            <span className="text-[#2563EB]">
              for you
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-lg text-[#60708A] max-w-2xl mx-auto leading-relaxed">
            ProfileIQ is currently free while we continue building
            and improving the platform for job seekers.
          </p>

        </div>
      </div>


      {/* Pricing Card */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="relative bg-white border-2 border-[#182C61] rounded-3xl shadow-xl overflow-hidden">

          {/* Popular Badge */}
          <div className="bg-[#182C61] text-white text-center py-2.5 text-sm font-semibold">
            Current Plan
          </div>

          <div className="p-7 sm:p-9">

            {/* Plan Name */}
            <div className="text-center">

              <h2 className="text-2xl font-bold text-[#182C61]">
                Free
              </h2>

              <p className="mt-2 text-sm text-[#60708A]">
                Everything you need to improve your resume and LinkedIn profile.
              </p>

              {/* Price */}
              <div className="mt-6 flex items-end justify-center gap-1">

                <span className="text-5xl font-bold text-[#182C61]">
                  ₹0
                </span>

                <span className="text-[#60708A] mb-2">
                  / forever
                </span>

              </div>

            </div>


            {/* Divider */}
            <div className="my-7 border-t border-[#D9E0EA]" />


            {/* Features */}
            <div>

              <h3 className="text-sm font-semibold text-[#182C61] mb-4">
                What's included
              </h3>

              <div className="space-y-3.5">

                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >

                    <div className="w-5 h-5 rounded-full bg-[#182C61]/10 flex items-center justify-center shrink-0 mt-0.5">

                      <Check className="w-3.5 h-3.5 text-[#182C61]" />

                    </div>

                    <span className="text-sm text-[#334155]">
                      {feature}
                    </span>

                  </div>
                ))}

              </div>

            </div>


            {/* CTA */}
            <Link
              to="/analyzer"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#182C61] text-white font-semibold shadow-lg hover:bg-[#00072D] transition-all duration-200"
            >
              Start Analyzing
              <ArrowRight className="w-4 h-4" />
            </Link>


            {/* Trust Text */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#60708A]">

              <ShieldCheck className="w-4 h-4 text-[#182C61]" />

              No payment required

            </div>

          </div>

        </div>

      </div>


      {/* Bottom Section */}
      <div className="bg-[#F5F7FA] border-t border-[#D9E0EA]">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-[#182C61]">
              Why is ProfileIQ free?
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-[#60708A] leading-relaxed">
              We are currently focused on making ProfileIQ useful,
              accurate, and easy to use. You can use the available
              analysis features without paying for a subscription.
            </p>

          </div>


          {/* Three Highlights */}
          <div className="grid sm:grid-cols-3 gap-5 mt-8">

            <div className="bg-white border border-[#D9E0EA] rounded-2xl p-5 text-center">

              <Check className="w-6 h-6 text-[#182C61] mx-auto mb-3" />

              <h3 className="font-semibold text-[#182C61]">
                No Subscription
              </h3>

              <p className="mt-1.5 text-xs text-[#60708A]">
                No recurring payment is required.
              </p>

            </div>


            <div className="bg-white border border-[#D9E0EA] rounded-2xl p-5 text-center">

              <Sparkles className="w-6 h-6 text-[#182C61] mx-auto mb-3" />

              <h3 className="font-semibold text-[#182C61]">
                AI Powered
              </h3>

              <p className="mt-1.5 text-xs text-[#60708A]">
                Get structured feedback from your profile.
              </p>

            </div>


            <div className="bg-white border border-[#D9E0EA] rounded-2xl p-5 text-center">

              <ShieldCheck className="w-6 h-6 text-[#182C61] mx-auto mb-3" />

              <h3 className="font-semibold text-[#182C61]">
                Honest Feedback
              </h3>

              <p className="mt-1.5 text-xs text-[#60708A]">
                No invented achievements or information.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}