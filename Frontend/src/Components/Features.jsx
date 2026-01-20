import React from "react";
import { featuresStyles } from "../assets/dummyStyles";

const FeatureCard = ({ title, desc, icon, delay = 0 }) => (
  <div
    className={featuresStyles.featureCard}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className={featuresStyles.featureCardGradient}></div>
    <div className={featuresStyles.featureCardBorder}></div>
    <div className={featuresStyles.featureCardContent}>
      <div className={featuresStyles.featureCardIconContainer}>{icon}</div>
      <div className={featuresStyles.featureCardTitle}>{title}</div>
    </div>
    <p className={featuresStyles.featureCardDescription}>{desc}</p>
    <div className={featuresStyles.featureCardCta}>
      <span className={featuresStyles.featureCardCtaText}>Learn more</span>
      <svg
        className={featuresStyles.featureCardCtaIcon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  </div>
);
const Features = () => {
  const features = [
    {
      title: "AI Invoice Parsing",
      desc: "Paste freeform text and let our advanced AI extract client details, line items, and totals into a perfectly formatted draft invoice in seconds.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
    },
    {
      title: "Smart Email Reminders",
      desc: "Generate professional, context-aware reminder emails with one click — complete with intelligent tone selection and personalized messaging.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      title: "Professional PDF Export",
      desc: "Generate high-quality, brand-consistent PDF invoices with reliable email delivery and comprehensive tracking of all sent communications.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
    },
  ];
  return (
    <section id="features" className={featuresStyles.section}>
      <div className={featuresStyles.backgroundBlob1}></div>
      <div className={featuresStyles.backgroundBlob2}></div>
      <div className={featuresStyles.backgroundBlob3}></div>
      <div className={featuresStyles.container}>
        <div className={featuresStyles.headerContainer}>
          <div className={featuresStyles.badge}>
            <span className={featuresStyles.badgeDot}></span>
            <span className={featuresStyles.badgeText}>Powerful Features</span>
          </div>
          <h2 className={featuresStyles.title}>
            Built for{" "}
            <span className={featuresStyles.titleGradient}>
              Speed & Clarity
            </span>
          </h2>
          <p className={featuresStyles.subtitle}>
            Streamline your invoicing process with our intuitive and efficient
            features designed to save you time and effort.
          </p>
        </div>

        <div className={featuresStyles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
              delay={index * 100}
            />
          ))}
        </div>

        <div className={featuresStyles.bottomCtaContainer}>
          <button className={featuresStyles.bottomCtaButton}>
            Explore All Features
            <span className={featuresStyles.bottomCtaButtonText}>
              
              <svg
              className={featuresStyles.bottomCtaButtonIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            </span>
            
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
