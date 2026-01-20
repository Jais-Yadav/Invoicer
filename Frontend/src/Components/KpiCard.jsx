import React from "react";
import { kpiCardStyles } from "../assets/dummyStyles";

const MetricIcons = {
  default: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-8H3v8z" />
    </svg>
  ),
  revenue: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  growth: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  ),
  document: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  clock: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

const KpiCard = ({
  title,
  value,
  hint,
  iconType = "default",
  trend,
  className = "",
}) => {
  const IconComponent = MetricIcons[iconType] || MetricIcons.default;
  const getTrendColor = (trendValue) => {
    if (trendValue > 0) return kpiCardStyles.trendBadgePositive;
    if (trendValue < 0) return kpiCardStyles.trendBadgeNegative;
    return kpiCardStyles.trendBadgeNeutral;
  };
  const getIconColor = (type) => {
    return kpiCardStyles.iconColors[type] || kpiCardStyles.iconColors.default;
  };
  return (
    <div className={`{kpiCardStyles.card} ${className}`}>
      <div className={kpiCardStyles.animatedBackground}></div>
      <div className={kpiCardStyles.content}>
        <div className={kpiCardStyles.headerContainer}>
          <div className={kpiCardStyles.mainContent}>
            <div className={kpiCardStyles.iconTrendContainer}>
              <div
                className={`${kpiCardStyles.iconContainer} ${getIconColor(
                  iconType
                )}`}
              >
                <IconComponent className={kpiCardStyles.icon} />
              </div>
              {trend !== undefined && (
                <div
                  className={`${kpiCardStyles.trendBadge} ${getTrendColor(
                    trend
                  )}`}
                >
                  <svg
                    className={`${kpiCardStyles.trendIcon} ${
                      trend < 0 ? kpiCardStyles.trendIconNegative : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    <path d="M17 6h6v6" />
                  </svg>
                  {Math.abs(trend)}%
                </div>
              )}
            </div>
            <div className={kpiCardStyles.textContent}>
                <div className={kpiCardStyles.title}>{title}</div>
                <div className={kpiCardStyles.value}>{value}</div>
                {hint && (
                    <div className={kpiCardStyles.hint}>
                        <svg
                    className={kpiCardStyles.hintIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                        {hint}
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className={kpiCardStyles.cornerAccent}></div>
    </div>
  );
};

export default KpiCard;
