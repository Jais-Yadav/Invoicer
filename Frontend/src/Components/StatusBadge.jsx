import React from 'react'

const StatusIcons = {
  paid: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  unpaid: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  overdue: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  draft: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};


const StatusBadge = ({
  status=" ",
  size="default",
  showIcon=true
}) => {
  const s=(status || "").toLowerCase();
  const statusConfig = {
    paid: {
      bg: "bg-emerald-50/80 backdrop-blur-sm",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: "paid",
      gradient: "from-emerald-400 to-green-500",
    },
    unpaid: {
      bg: "bg-amber-50/80 backdrop-blur-sm",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: "unpaid",
      gradient: "from-amber-400 to-orange-500",
    },
    overdue: {
      bg: "bg-rose-50/80 backdrop-blur-sm",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: "overdue",
      gradient: "from-rose-400 to-red-500",
    },
    draft: {
      bg: "bg-gray-50/80 backdrop-blur-sm",
      text: "text-gray-700",
      border: "border-gray-200",
      icon: "draft",
      gradient: "from-gray-400 to-gray-500",
    },
    default: {
      bg: "bg-gray-50/80 backdrop-blur-sm",
      text: "text-gray-700",
      border: "border-gray-200",
      icon: "draft",
      gradient: "from-gray-400 to-gray-500",
    },
  };
  const config=statusConfig[s]|| statusConfig.default;
  const sizeClasses={
    small:" px-2 py-1 text-xs gap-1.5",
    default:" px-3 py-1.5 text-sm gap-2",
    large:" px-4 py-2 text-base gap-2.5",
  }
  return (
    <div className={`inline-flex items-center ${sizeClasses[size]} rounded-full font-medium ${config.bg} ${config.text} border ${config.border} transition-all duration-300 ease-out hover:scale-105 hover:shadow-sm group relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-linear-to-r ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}>
  </div>
      {showIcon &&(
        <div className='relative z-10 flex items-center'>
          {StatusIcons[config.icon]({ className: "w-3 h-3" })}
        </div>
      )}
      <span className='relative z-10 font-semibold tracking-wide first-letter:uppercase'>
        {s==="default"?status:s}
      </span>
      {(s==="unpaid" || s==="overdue") &&(
        <div className='relative z-10'>
          <div className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`}>

          </div>
        </div>
      )}
    </div>
  )
}

export function StatusWithCount({statu,count,size="default"}){
  return (
    <div className='inline-flex items-center gap-2 group'>
      <StatusBadge status={statu} size={size} />
      {count!=undefined &&(
        <span className='text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full group-hover:bg-gray-200 transition-colors duration-200'>{count}</span>
      ) }

    </div>
  )
}

export default StatusBadge