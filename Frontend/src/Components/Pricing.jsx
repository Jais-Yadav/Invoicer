import React, { useState } from "react";
import { pricingStyles, pricingCardStyles } from "../assets/dummyStyles";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
const PricingCard = ({
  title,
  price,
  period,
  description,
  features = [],
  isPopular = false,
  isAnnual = false,
  delay = 0,
  onCtaClick,
}) => (
  <div
    className={`${pricingCardStyles.card} ${
      isPopular ? pricingCardStyles.cardPopular : pricingCardStyles.cardRegular
    } `}
    style={{ transitionDelay: `${delay}` }}
  >
    {isPopular && (
      <div className={pricingCardStyles.popularBadge}>
        <div className={pricingCardStyles.popularBadgeContent}>
          Most Popular
        </div>
      </div>
    )}
    {isPopular && <div className={pricingCardStyles.gradientOverlay} />}
    <div className={pricingCardStyles.animatedBorder}></div>
    <div className={pricingCardStyles.content}>
      <div className={pricingCardStyles.header}>
        <h3
          className={`${pricingCardStyles.title} ${
            isPopular
              ? pricingCardStyles.titlePopular
              : pricingCardStyles.titleRegular
          }`}
        >
          {title}
        </h3>
        <p className={pricingCardStyles.description}>{description}</p>
      </div>
      <div className={pricingCardStyles.priceContainer}>
        <div className={pricingCardStyles.priceWrapper}>
          <span
            className={`${pricingCardStyles.price} ${
              isPopular
                ? pricingCardStyles.pricePopular
                : pricingCardStyles.priceRegular
            }`}
          >
            {price}
          </span>
          {period && <span className={pricingCardStyles.period}>{period}</span>}
        </div>
        {isAnnual && (
          <div className={pricingCardStyles.annualBadge}>Save 20% annually</div>
        )}
      </div>
      <ul className={pricingCardStyles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={pricingCardStyles.featureItem}>
            <div
              className={`
                ${pricingCardStyles.featureIcon}
                ${
                  isPopular
                    ? pricingCardStyles.featureIconPopular
                    : pricingCardStyles.featureIconRegular
                }
              `}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className={pricingCardStyles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <SignedIn>
          <button
            type="button"
            onClick={() =>
              onCtaClick && onCtaClick({ title, isPopular, isAnnual })
            }
            className={`
              ${pricingCardStyles.ctaButton}
              ${
                isPopular
                  ? pricingCardStyles.ctaButtonPopular
                  : pricingCardStyles.ctaButtonRegular
              }
            `}
          >
            <span
              className={`
                ${pricingCardStyles.ctaButtonText}
                ${
                  isPopular
                    ? pricingCardStyles.ctaButtonTextPopular
                    : pricingCardStyles.ctaButtonTextRegular
                }
              `}
            >
              {isPopular ? "Get Started" : "Choose Plan"}
            </span>
          </button>
        </SignedIn>

        <SignedOut>
          <button
            type="button"
            onClick={() =>
              onCtaClick &&
              onCtaClick(
                { title, isPopular, isAnnual },
                { openSignInFallback: true }
              )
            }
            className={`
              ${pricingCardStyles.ctaButton}
              ${pricingCardStyles.ctaButtonRegular}
            `}
          >
            <span className={pricingCardStyles.ctaButtonText}>
              Sign in to get started
            </span>
          </button>
        </SignedOut>
      </div>
    </div>
    {isPopular && (
      <>
        <div className={pricingCardStyles.cornerAccent1}></div>
        <div className={pricingCardStyles.cornerAccent2}></div>
      </>
    )}
  </div>
);
const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const navigate = useNavigate();
  const plans = {
    monthly: [
      {
        title: "Starter",
        price: "₹0",
        period: "month",
        description: "Perfect for freelancers and small projects",
        features: [
          "5 invoices per month",
          "Basic AI parsing",
          "Standard templates",
          "Email support",
          "PDF export",
        ],
        isPopular: false,
      },
      {
        title: "Professional",
        price: "₹499",
        period: "month",
        description: "For growing businesses and agencies",
        features: [
          "Unlimited invoices",
          "Advanced AI parsing",
          "Custom branding",
          "Priority support",
          "Advanced analytics",
          "Team collaboration (3 members)",
          "API access",
        ],
        isPopular: true,
      },
      {
        title: "Enterprise",
        price: "₹1,499",
        period: "month",
        description: "For large organizations with custom needs",
        features: [
          "Everything in Professional",
          "Unlimited team members",
          "Custom workflows",
          "Dedicated account manager",
          "SLA guarantee",
          "White-label solutions",
          "Advanced security",
        ],
        isPopular: false,
      },
    ],
    annual: [
      {
        title: "Starter",
        price: "₹0",
        period: "month",
        description: "Perfect for freelancers and small projects",
        features: [
          "5 invoices per month",
          "Basic AI parsing",
          "Standard templates",
          "Email support",
          "PDF export",
        ],
        isPopular: false,
        isAnnual: false,
      },
      {
        title: "Professional",
        price: "₹399",
        period: "month",
        description: "For growing businesses and agencies",
        features: [
          "Unlimited invoices",
          "Advanced AI parsing",
          "Custom branding",
          "Priority support",
          "Advanced analytics",
          "Team collaboration (3 members)",
          "API access",
        ],
        isPopular: true,
        isAnnual: true,
      },
      {
        title: "Enterprise",
        price: "₹1,199",
        period: "month",
        description: "For large organizations with custom needs",
        features: [
          "Everything in Professional",
          "Unlimited team members",
          "Custom workflows",
          "Dedicated account manager",
          "SLA guarantee",
          "White-label solutions",
          "Advanced security",
        ],
        isPopular: false,
        isAnnual: true,
      },
    ],
  };

  const currentPlans = plans[billingPeriod];
  const handleCtaClick = (planMeta, flag) => {
    if (flag.openSignInFallback || !isSignedIn) {
      if (clerk && typeof clerk.openSignIn === "function") {
        clerk.openSignIn({ redirectUrl: "/app/create-invoice" });
      } else {
        navigate("/sign-in");
      }
      return;
    }
    navigate("/app/create-invoice", {
      state: { fromPlan: planMeta?.title || null },
    });
  };
  return (
    <section id="pricing" className={pricingStyles.section}>
      <div className={pricingStyles.bgElement1}></div>
      <div className={pricingStyles.bgElement2}></div>
      <div className={pricingStyles.bgElement3}></div>

      <div className={pricingStyles.container}>
        <div className={pricingStyles.headerContainer}>
          <div className={pricingStyles.badge}>
            <span className={pricingStyles.badgeDot}></span>
            <span className={pricingStyles.badgeText}>Transparent Pricing</span>
          </div>
          <h2 className={pricingStyles.title}>
            Simple,{" "}
            <span className={pricingStyles.titleGradient}>Fair Pricing</span>
          </h2>
          <p className={pricingStyles.description}>
            Start for free, scale as you grow. No hidden fees, just
            straightforward pricing that fits your business needs.
          </p>

          <div className={`${pricingStyles.billingToggle} mt-12`}>
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`${pricingStyles.billingButton} ${
                billingPeriod === "monthly"
                  ? pricingStyles.billingButtonActive
                  : pricingStyles.billingButtonInactive
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("anual")}
              className={`${pricingStyles.billingButton} ${
                billingPeriod === "anual"
                  ? pricingStyles.billingButtonActive
                  : pricingStyles.billingButtonInactive
              }`}
            >
              Anual
              <span className={pricingStyles.billingBadge}>Save 20%</span>
            </button>
          </div>
        </div>
        <div className={pricingStyles.grid}>
          {currentPlans.map((plan, index) => (
            <PricingCard
              key={plan.title}
              {...plan}
              delay={index * 100}
              onCtaClick={handleCtaClick}
            />
          ))}
        </div>
        <div className={pricingStyles.additionalInfo}>
          <div className={pricingStyles.featuresCard}>
            <h3 className={pricingStyles.featuresTitle}>All Plans Included</h3>
            <div className={pricingStyles.featuresGrid}>
              {[
                "Secure cloud storage",
                "Mobile-friendly interface",
                "Automatic backups",
                "Real-time notifications",
                "Multi-currency support",
                "Tax calculation",
              ].map((feature, index) => (
                <div key={index} className={pricingStyles.featureItem}>
                  <div className={pricingStyles.featureDot}></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={pricingStyles.faqCta}>
            <p className={pricingStyles.faqText}>Have questions about pricing?{ " "}
                <button className={pricingStyles.contactLink}>Contanct our sales team →</button>
            </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
