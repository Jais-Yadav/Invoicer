// src/assets/dummyStyles.js
export const aiInvoiceModalStyles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center p-4",
  backdrop: "absolute inset-0 bg-black opacity-30",
  modal: "relative max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 z-10",
  title: "inline-flex items-center gap-2 py-2 pb-4 text-gray-700  transition-all duration-200 font-medium group",
  description: "text-sm text-gray-500 mt-1",
  closeButton: "text-gray-400 hover:text-gray-600",
  label: "block text-xs font-medium text-gray-600 mb-2",
  textarea: "w-full rounded-md border text-gray-500 border-gray-200 px-3 py-2 text-sm resize-vertical focus:ring-2 focus:ring-indigo-100",
  error: "mt-3 text-sm text-rose-600",
  actions: "mt-4 flex justify-end gap-3",
  cancelButton: "px-4 py-2 rounded-md border text-sm",
  generateButton: "px-4 py-2 rounded-md bg-indigo-600 text-white text-sm disabled:opacity-60"
};

// src/assets/dummyStyles.js
export const businessProfileStyles = {
  // Layout
  pageContainer: "space-y-8 font-[pacifico]",
  
  // Header
  headerContainer: "text-center lg:text-left",
  headerTitle: "text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight",
  headerSubtitle: "mt-2 text-lg text-gray-600 max-w-3xl",
  
  // Cards/Sections
  cardContainer: "bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/60 shadow-sm",
  cardHeaderContainer: "flex items-center gap-3 mb-6",
  cardIconContainer: "p-2 rounded-lg",
  cardTitle: "text-xl whitespace-nowrap font-semibold text-gray-900",
  
  // Grid
  gridCols1: "grid grid-cols-1 gap-6",
  gridCols2: "grid grid-cols-1 md:grid-cols-2 gap-6",
  gridCols2Lg: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8",
  gridColSpan2: "md:col-span-2",
  
  // Form Elements
  label: "block text-sm font-medium text-gray-700 mb-2",
  input: "w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  textarea: "w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  
  // Upload Areas
  uploadArea: "border-4 border-dashed border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-gray-400 group",
  uploadIconContainer: "w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400",
  uploadSmallIconContainer: "w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400",
  uploadTextTitle: "text-sm font-medium text-gray-900",
  uploadTextSubtitle: "text-xs text-gray-500 mt-1",
  
  // Image Previews
  imagePreviewContainer: "text-center space-y-4",
  logoPreview: "w-40 h-32 mx-auto  rounded-xl overflow-hidden flex items-center justify-center bg-white",
  stampPreview: "w-32 h-24 mx-auto  rounded-xl overflow-hidden flex items-center justify-center bg-white",
  signaturePreview: "w-32 h-20 mx-auto rounded-xl overflow-hidden flex items-center justify-center bg-white",
  
  // Buttons
  buttonGroup: "flex flex-wrap gap-2 justify-center sm:gap-3 md:gap-4",
  changeButton: "inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 cursor-pointer font-medium text-sm sm:text-base",

  removeButton: "inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all duration-200 font-medium text-sm sm:text-base",

  
  // Tax Section
  taxContainer: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100",
  taxInput: "w-32 rounded-xl border border-gray-300 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium text-center",
  taxHelpText: "text-xs text-gray-500 mt-3",
  
  // Action Buttons
  actionContainer: "bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 shadow-sm",
  actionInnerContainer: "flex flex-col sm:flex-row items-center justify-between gap-4",
  actionButtonGroup: "flex flex-wrap items-center gap-2 sm:gap-3 justify-center sm:justify-start",
  saveButton:  "inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
  resetButton:  "inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-sm sm:text-base",
  
  // Animation
  hoverScale: "group-hover:scale-105 transition-transform duration-300"
};

// Icon colors for different sections
export const iconColors = {
  business: "bg-blue-100 text-blue-600",
  branding: "bg-indigo-100 text-indigo-600", 
  assets: "bg-purple-100 text-purple-600"
};

// For any custom styles that don't fit the pattern
export const customStyles = {
  inputPlaceholder: "text-gray-500",
  taxPercentage: "text-2xl font-bold text-gray-600"
};

// src/assets/dummyStyles.js (add these to the existing export)
export const aiReminderModalStyles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center p-4",
  backdrop: "absolute inset-0 bg-black opacity-30",
  modal: "relative max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 z-10",
  title: "text-lg font-semibold",
  description: "text-sm text-gray-500 mt-1",
  closeButton: "text-gray-400 hover:text-gray-600",
  label: "block text-sm font-medium text-gray-700",
  textarea: "mt-1 w-full text-gray-500 rounded-md border border-gray-200 px-3 py-2 text-sm",
  error: "mt-3 text-sm text-rose-600",
  previewHeader: "text-sm font-medium",
  previewHelper: "text-xs text-gray-500",
  previewBox: "mt-2 bg-gray-50 rounded-md p-3 min-h-[120px] text-sm whitespace-pre-wrap",
  previewPlaceholder: "text-gray-400",
  previewPlaceholderHighlight: "font-medium",
  actions: "mt-4 flex items-center justify-end gap-3",
  resetButton: "px-3 py-2 rounded-md border text-sm",
  copyButton: "px-3 py-2 rounded-md border text-sm",
  copyButtonEnabled: "bg-white hover:bg-gray-50",
  copyButtonDisabled: "opacity-50 cursor-not-allowed",
  generateButton: "px-4 py-2 rounded-md bg-indigo-600 text-white text-sm"
};

// Add to src/assets/dummyStyles.js (after the existing styles)

export const createInvoiceStyles = {
  // Layout
  pageContainer: "space-y-8 font-[pacifico]",
  mainGrid: "grid lg:grid-cols-3 gap-8",
  leftColumn: "lg:col-span-2 space-y-8",
  rightColumn: "space-y-8",
  
  // Header
  headerContainer: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
  headerTitle: "text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight",
  headerSubtitle: "mt-2 text-lg text-gray-600 max-w-3xl",
  headerButtonContainer: "flex items-center gap-3",
  
  // Cards/Sections
cardContainer: "bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200/60 shadow-sm w-full",

cardSmallContainer: "bg-white/80 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200/60 shadow-sm w-full",

cardHeaderContainer: "flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6",


cardHeaderWithButton: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6",

cardHeaderLeft: "flex items-center gap-2 sm:gap-3",

cardIconContainer: "p-2 rounded-lg w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center",

cardTitle: "text-xl sm:text-2xl font-semibold text-gray-900",

cardSubtitle: "text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4",


  
  // Grid
  gridCols1: "grid grid-cols-1  gap-6",
  gridCols2: "grid grid-cols-1 md:grid-cols-2 gap-6",
  gridCols3: "grid grid-cols-1 md:grid-cols-3 gap-6",
  gridCols2Lg: "grid grid-cols-1 lg:grid-cols-2 gap-8",
  gridColSpan2: "md:col-span-2 ",
  
  // Form Elements
  label: "block text-sm font-medium text-gray-700 mb-2",
  labelWithMargin: "block text-sm font-medium text-gray-700 mb-3",
  input: "w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  inputMedium: "w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium",
  inputCenter: "w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-center font-medium",
  textarea: "w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  inputSmall: "w-full rounded-xl border text-gray-500 border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm",
  
  // Buttons
  previewButton: "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm",
  saveButton: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
  saveProfileButton: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 text-sm font-medium",
  addItemButton: "inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-all duration-200 font-medium w-full justify-center group",
  
  // Currency & Status
  currencyContainer: "flex gap-3",
  currencyButton: "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 flex-1",
  currencyButtonActive1: "border-green-500 bg-green-50 text-green-700 shadow-sm",
  currencyButtonActive2: "border-blue-500 bg-blue-50 text-blue-700 shadow-sm",
  currencyButtonInactive: "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
  statusContainer: "flex flex-wrap gap-2",
  statusButton: "relative overflow-hidden rounded-full transition-all duration-200 ease-out",
  statusButtonActive: "ring-2 ring-offset-2 ring-blue-500 transform scale-105",
  statusButtonInactive: "opacity-80 hover:opacity-100 hover:scale-105",
  statusDropdown: "mt-2 sm:hidden w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  currencyBadge: "text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg",
  
  // Desktop header (lg+)
  itemsTableHeader:
    "hidden lg:grid lg:grid-cols-12 gap-4 mb-4 px-2 text-sm font-medium text-gray-700 items-center min-w-0",

  // Row: mobile-first grid; becomes 12 cols at sm and above
  itemsTableRow:
    "grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-12 gap-4 items-center group hover:bg-gray-50 p-3 rounded-xl transition-all duration-200 min-w-0",

  // Description input: truncate text on lg to avoid overflow
  itemsInput:
    "rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full min-w-0 overflow-hidden truncate text-sm sm:text-base",

  // Numeric inputs baseline styling (we keep them as text with inputMode for numeric keyboard)
  itemsNumberInput:
    "rounded-xl border border-gray-300 px-3 py-3 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-right w-full min-w-0 overflow-x-auto whitespace-nowrap text-sm sm:text-base",

  // Total: allow wrapping at break points (we add zero-width-space after commas to permit wraps)
  itemsTotal:
    "text-center font-medium text-gray-900 flex items-center justify-center min-w-0 max-w-full break-words text-left text-sm sm:text-base",

  // Remove button: visible & tap-friendly
  itemsRemoveButton:
    "flex items-center justify-center p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-all duration-200 focus:outline-none",

  // per-field label: shown below lg (stacked labels)
  itemsFieldLabel: "block text-xs font-medium text-gray-600 mb-1",

  
  itemsListWrapper: "space-y-4",

  itemRow: "min-w-0",

  itemColDescription:
    "col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3 min-w-0",

  itemColQuantity:
    "col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-2 min-w-0",

  itemColUnitPrice:
    "col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-3 min-w-0",

  itemColTotal:
    "col-span-6 sm:col-span-1 md:col-span-1 lg:col-span-3 min-w-0",

  itemColRemove:
    "col-span-6 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-center min-w-0",
  
  // Upload Areas
  uploadArea: "border-4 border-dashed border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-gray-400 group",
  uploadSmallArea: "border-4 border-dashed border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-gray-400 group",
  imagePreviewContainer: "text-center space-y-4",
  logoPreview: "w-32 h-24 lg:w-28 lg:h-20  mx-auto  rounded-xl overflow-hidden flex items-center  justify-center ",
  stampPreview: "w-24 h-20 mx-auto  rounded-xl overflow-hidden flex items-center justify-center bg-white",
  signaturePreview: "w-24 h-16 mx-auto  rounded-xl overflow-hidden flex items-center justify-center bg-white",
  buttonGroup: "flex lg:flex-col xl:flex-row  gap-2 justify-center",
  changeButton: "inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 cursor-pointer text-sm font-medium",
  removeButton: "inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all duration-200 text-sm font-medium",
  uploadIconContainer: "w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400",
  uploadSmallIconContainer: "w-10 h-10 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400",
  uploadTextTitle: "text-sm font-medium text-gray-900",
  uploadTextSubtitle: "text-xs text-gray-500 mt-1",
  
  // Summary & Tax
  summaryRow: "flex items-center justify-between py-3 border-b border-gray-200",
  summaryLabel: "text-sm font-medium text-gray-600",
  summaryValue: "font-semibold text-gray-900",
  taxRow: "flex items-center justify-between py-2",
  totalRow: "flex items-center justify-between py-3 border-t border-gray-200",
  totalLabel: "text-lg font-bold text-gray-900",
  totalValue: "text-lg font-bold text-gray-900",
  
  // Animation
  hoverScale: "group-hover:scale-105 transition-transform duration-300",
  iconHover: "group-hover:scale-110 transition-transform"
};

// Icon colors for different sections
export const createInvoiceIconColors = {
  invoice: "bg-blue-100 text-blue-600",
  billFrom: "bg-emerald-100 text-emerald-600",
  billTo: "bg-purple-100 text-purple-600",
  items: "bg-amber-100 text-amber-600"
};

// For any custom styles that don't fit the pattern
export const createInvoiceCustomStyles = {
  inputPlaceholder: "text-gray-500",
  currencySymbol: "text-lg font-semibold"
};

// src/assets/dummyStyles.js (add these to the existing export)
export const appShellStyles = {
  // Layout
  root: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20",
  layout: "lg:flex",
  
  // Desktop Sidebar
  sidebar: "hidden lg:block bg-white/80 backdrop-blur-xl border-r border-gray-200/60 transition-all duration-500 ease-in-out relative",
  sidebarCollapsed: "w-20",
  sidebarExpanded: "w-80",
  sidebarGradient: "absolute inset-0 bg-gradient-to-b from-blue-50/5 to-transparent pointer-events-none",
  sidebarContainer: "px-6 py-8 h-full flex flex-col justify-between relative z-10",
  
  // Logo Area
  logoContainer: "mb-12 flex items-center",
  logoContainerCollapsed: "justify-center",
  logoLink: "inline-flex items-center group transition-all duration-300",
  logoImage: "h-16 w-16 object-contain drop-shadow-sm",
  logoTextContainer: "",
  logoText: "font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
  logoUnderline: "h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 mt-1",
  collapseButton: "p-2 ml-7 rounded-lg border border-gray-200 bg-white/50 hover:bg-white hover:shadow-md transition-all duration-300 group",
  
  // Navigation
  nav: "space-y-2",
  sidebarLink: "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out",
  sidebarLinkCollapsed: "justify-center",
  sidebarLinkActive: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100",
  sidebarLinkInactive: "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-md",
  sidebarIcon: "transition-all duration-300",
  sidebarIconActive: "text-blue-600 scale-110",
  sidebarIconInactive: "text-gray-400 group-hover:text-gray-600 group-hover:scale-105",
  sidebarText: "flex-1 transition-all duration-300",
  sidebarActiveIndicator: "w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse",
  
  // User Area
  userSection: "mt-auto",
  userDivider: "border-t border-gray-200/60 pt-6",
  userDividerCollapsed: "px-1",
  userDividerExpanded: "px-2",
  logoutButton: "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-300 group",
  logoutIcon: "w-5 h-5 group-hover:scale-110 transition-transform",
  collapseSection: "mt-4 flex justify-center",
  collapseButtonInner: "flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-300 text-xs text-gray-600 hover:text-gray-800",
  collapseButtonCollapsed: "justify-center w-10",
  
  // Mobile Sidebar
  mobileOverlay: "lg:hidden fixed inset-0 z-50",
  mobileBackdrop: "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
  mobileSidebar: "absolute inset-y-0 left-0 w-80 bg-white/90 backdrop-blur-xl border-r border-gray-200/60 p-6 overflow-auto transform transition-transform duration-300",
  mobileHeader: "mb-8 flex items-center justify-between",
  mobileLogoLink: "inline-flex items-center",
  mobileLogoImage: "h-10 w-10 object-contain",
  mobileLogoText: "font-bold text-xl ml-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
  mobileCloseButton: "p-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-300",
  mobileCloseIcon: "w-5 h-5 text-gray-600",
  mobileNav: "space-y-2",
  mobileNavLink: "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300",
  mobileNavLinkActive: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100",
  mobileNavLinkInactive: "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm",
  mobileLogoutSection: "mt-8 border-t border-gray-200/60 pt-6",
  mobileLogoutButton: "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-300",
  
  // Header
  header: "flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-40 transition-all duration-300 min-h-20",
  headerScrolled: "shadow-sm",
  headerNotScrolled: "shadow-none",
  headerTopSection: "flex items-center justify-between sm:justify-start w-full sm:w-auto py-3 sm:py-0",
  headerContent: "flex items-center gap-3 sm:gap-6",
  mobileMenuButton: "lg:hidden inline-flex items-center justify-center p-2 sm:p-3 rounded-xl border border-gray-200 bg-white/50 hover:bg-white hover:shadow-md transition-all duration-300",
  mobileMenuIcon: "w-5 h-5 text-gray-700",
  desktopCollapseButton: "hidden lg:flex items-center justify-center p-2 rounded-xl border border-gray-200 bg-white/50 hover:bg-white hover:shadow-md transition-all duration-300",
  welcomeContainer: "flex flex-col",
  welcomeTitle: "text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight",
  welcomeName: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
  welcomeSubtitle: "text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1",
  mobileUserAvatar: "lg:hidden flex items-center gap-2",
  mobileAvatar: "w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-lg",
  
  // Header Actions
  headerActions: "flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pb-3 sm:pb-0 border-t border-gray-100 sm:border-t-0 pt-3 sm:pt-0",
  ctaButton: "group inline-flex  items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 text-sm sm:text-base flex-1 sm:flex-none justify-center",
  ctaIcon: "w-4 h-4 text-white",
  ctaArrow: "w-0 group-hover:w-2 group-hover:ml-1 transition-all duration-300 overflow-hidden hidden sm:block",
  userSectionDesktop: " lg:flex md:flex items-center gap-4 pl-4 border-l border-gray-200/60",
  userInfo: "hidden sm:block text-right",
  userName: "text-sm font-medium text-gray-900",
  userEmail: "text-xs text-gray-500",
  userAvatarContainer: "relative ",
  userAvatar: "w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group",
  userAvatarBorder: "absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-300",
  userStatus: "absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm",
  
  // Main Content
  main: "p-4 sm:p-6 lg:p-8",
  mainContainer: "max-w-7xl mx-auto"
};

// Add to src/assets/dummyStyles.js (after the existing styles)

export const dashboardStyles = {
  // Layout
  pageContainer: "space-y-8 font-[pacifico]",
  
  // Header
  headerContainer: "text-center lg:text-left",
  headerTitle: "text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight",
  headerSubtitle: "mt-2 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0",
  
  // KPI Grid
  kpiGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
  
  // Main Content Grid
  mainGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 gap-8",
  sidebarColumn: "xl:col-span-1 space-y-6",
  contentColumn: "xl:col-span-3",
  
  // Cards
  cardContainer: "bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-sm",
  cardContainerOverflow: "bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden",
  
  // Quick Stats Card
  quickStatsCard: "bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white",
  quickStatsTitle: "font-semibold text-lg mb-4",
  quickStatsRow: "flex justify-between items-center",
  quickStatsLabel: "text-blue-100",
  quickStatsValue: "font-semibold",
  
  // Quick Actions
  quickActionsContainer: "space-y-3",
  quickActionButton: "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
  quickActionIconContainer: "p-2 rounded-lg group-hover:scale-110 transition-transform",
  quickActionText: "font-medium",
  
  // Quick Action Color Variants
  quickActionBlue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  quickActionGray: "bg-gray-50 text-gray-700 hover:bg-gray-100",
  
  // Table Styles
  tableHeader: "px-6 py-5 border-b border-gray-200/60",
  tableHeaderContent: "flex flex-col sm:flex-row sm:items-center sm:justify-between",
  tableTitle: "text-lg font-semibold text-gray-900",
  tableSubtitle: "text-sm text-gray-600 mt-1",
  tableActionButton: "mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200",
  
  // Table
  tableContainer: "overflow-x-auto",
  table: "w-full",
  tableHead: "bg-gray-50/80 border-b border-gray-200/60",
  tableHeaderCell: "px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
  tableHeaderCellRight: "px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider",
  tableBody: "divide-y divide-gray-200/60",
  tableRow: "hover:bg-gray-50/50 transition-colors duration-150 group cursor-pointer",
  tableCell: "px-6 py-4",
  
  // Client Avatar
  clientAvatar: "w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-medium group-hover:scale-110 transition-transform duration-200",
  clientInfo: "font-medium text-gray-900 group-hover:text-blue-600 transition-colors",
  clientSubInfo: "text-sm text-gray-500",
  
  // Amount Cell
  amountCell: "font-medium text-gray-900",
  
  // Date Cell
  dateCell: "text-sm text-gray-900",
  
  // Action Button
  actionButton: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn",
  
  // Empty State
  emptyState: "px-6 py-12 text-center",
  emptyStateIcon: "w-12 h-12 mx-auto text-gray-300",
  emptyStateText: "text-gray-500 space-y-2",
  emptyStateMessage: "font-medium",
  emptyStateAction: "text-blue-600 hover:text-blue-700 font-medium",
  
  // Color variants for quick action icons
  quickActionIconBlue: "bg-blue-100",
  quickActionIconGray: "bg-gray-100"
};

// src/assets/dummyStyles.js (add these to the existing export)
// Add to src/assets/dummyStyles.js (after the existing styles)

export const invoicesStyles = {
  // Layout
  pageContainer: "space-y-8 font-[pacifico]",
  
  // Header
  headerContainer: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
  headerTitle: "text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight",
  headerSubtitle: "mt-2 text-lg text-gray-600 max-w-3xl",
  headerActions: "flex items-center gap-3",
  aiButton: "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm group",
  createButton: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg",
  
  // Stats Overview
  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-6",
  statCard: "bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 shadow-sm",
  statValue: "text-2xl font-bold text-gray-900",
  statLabel: "text-sm text-gray-600 mt-1",
  
  // Filters Section
  filtersCard: "bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 shadow-sm",
  filtersHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  filtersHeaderLeft: "flex items-center gap-3",
  filtersIconContainer: "p-2 rounded-lg bg-blue-100 text-blue-600",
  filtersTitle: "text-xl font-semibold text-gray-900",
  filtersCount: "text-sm text-gray-600",
  filtersCountNumber: "font-bold text-gray-900",
  
  // Filters Grid
  filtersGrid: "grid grid-cols-1 lg:grid-cols-5 gap-4",
  searchContainer: "lg:col-span-2",
  filterLabel: "block text-sm font-medium text-gray-700 mb-2",
  searchInputContainer: "relative",
  searchIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
  searchInput: "w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  selectInput: "w-full rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  
  // Date Range
  dateRangeContainer: "lg:col-span-2",
  dateRangeFlex: "flex flex-col sm:flex-row sm:items-center gap-3",
  dateInput: "w-full sm:flex-1 min-w-0 rounded-xl border border-gray-300 px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  dateSeparator: "flex items-center justify-center",
  dateSeparatorText: "text-gray-400 text-sm",
  
  // Filters Footer
  filtersFooter: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6 border-t border-gray-200/60",
  perPageContainer: "flex items-center gap-3",
  perPageLabel: "text-sm font-medium text-gray-700",
  perPageSelect: "rounded-xl border border-gray-300 px-4 py-2 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
  resetButton: "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium",
  
  // Table Section
  tableCard: "bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden",
  tableHeader: "px-6 py-5 border-b border-gray-200/60",
  tableHeaderContent: "flex items-center justify-between",
  tableTitle: "text-lg font-semibold text-gray-900",
  tableSubtitle: "text-sm text-gray-600 mt-1",
  tableSubtitleBold: "font-medium text-gray-900",
  
  // Table
  tableContainer: "overflow-x-auto",
  table: "w-full",
  tableHead: "bg-gray-50/80 border-b border-gray-200/60",
  tableHeaderCell: "cursor-pointer px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-100/50 transition-colors duration-150",
  tableHeaderCellRight: "px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider",
  tableHeaderContent: "flex items-center gap-2",
  tableBody: "divide-y divide-gray-200/60",
  tableRow: "hover:bg-gray-50/50 transition-colors duration-150 group",
  
  // Client Cell
  clientCell: "px-6 py-4",
  clientContainer: "flex items-center gap-4",
  clientAvatar: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-medium group-hover:scale-110 transition-transform duration-200",
  clientInfo: "font-medium text-gray-900 group-hover:text-blue-600 transition-colors",
  clientId: "text-sm text-gray-500 mt-1",
  clientEmail: "text-xs text-gray-400 mt-1 hidden md:block",
  
  // Amount Cell
  amountCell: "px-6 py-4 font-medium text-gray-900",
  
  // Status Cell
  statusCell: "px-6 py-4",
  
  // Date Cell
  dateCell: "px-6 py-4 text-sm text-gray-900",
  
  // Actions Cell
  actionsCell: "px-6 py-4 text-right",
  actionsContainer: "flex items-center justify-end gap-2",
  viewButton: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn",
  sendButton: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn",
  buttonIcon: "w-4 h-4 group-hover/btn:scale-110 transition-transform",
  
  // Empty State
  emptyState: "px-6 py-12 text-center",
  emptyStateIconContainer: "w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center",
  emptyStateIcon: "w-8 h-8 text-gray-400",
  emptyStateText: "text-gray-500 space-y-3",
  emptyStateTitle: "font-medium text-lg",
  emptyStateMessage: "text-sm max-w-md mx-auto",
  emptyStateAction: "text-blue-600 hover:text-blue-700 font-medium",
  
  // Pagination
  paginationContainer: "px-6 py-4 bg-gray-50/80 border-t border-gray-200/60",
  
  // Pagination Component
  pagination: "flex items-center justify-between mt-8 pt-6 border-t border-gray-200/60",
  paginationText: "text-sm text-gray-600",
  paginationControls: "flex items-center gap-2",
  paginationButton: "flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
  paginationNumbers: "flex items-center gap-1",
  paginationNumber: "w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200",
  paginationNumberActive: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg",
  paginationNumberInactive: "text-gray-600 hover:bg-gray-100"
};

// Add to src/assets/dummyStyles.js (after the existing styles)

export const featuresStyles = {
  // Section
  section: "relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden",
  
  // Background Elements
  backgroundBlob1: "absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob",
  backgroundBlob2: "absolute top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000",
  backgroundBlob3: "absolute -bottom-8 left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000",
  
  // Container
  container: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  
  // Header
  headerContainer: "text-center max-w-3xl mx-auto mb-20",
  badge: "inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6",
  badgeDot: "w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse",
  badgeText: "text-sm font-medium text-blue-700",
  title: "text-2xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-gray-900 tracking-tight",
  titleGradient: "bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent",
  subtitle: "mt-6 text-md md:text-xl lg:text-xl xl:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto",
  
  // Features Grid
  featuresGrid: "mt-16 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 relative",
  
  // Feature Card
  featureCard: "group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden",
  featureCardGradient: "absolute inset-0 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  featureCardBorder: "absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500",
  featureCardContent: "relative flex items-start gap-6",
  featureCardIconContainer: "flex-shrink-0 w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300",
  featureCardTextContainer: "flex-1",
  featureCardTitle: "text-sm whitespace-nowrap md:text-lg lg:text-sm xl:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300",
  featureCardDescription: "mt-3 text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300",
  featureCardCta: "mt-4 flex items-center text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300",
  featureCardCtaText: "text-sm font-medium",
  featureCardCtaIcon: "w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300",
  
  // Bottom CTA
  bottomCtaContainer: "mt-16 text-center",
  bottomCtaButton: "group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300",
  bottomCtaButtonText: "Explore All Features",
  bottomCtaButtonIcon: "w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
};

// src/assets/dummyStyles.js (add these to the existing export)
export const heroStyles = {
  // Section
  section: "relative min-h-screen pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20",
  
  // Background Elements
  bgElement1: "absolute top-1/4 -left-10 w-72 h-72 rounded-full blur-3xl opacity-60 bg-gradient-to-r from-blue-200/40 to-cyan-300/40 animate-float-slow",
  bgElement2: "absolute bottom-1/4 -right-10 w-96 h-96 rounded-full blur-3xl opacity-50 bg-gradient-to-r from-violet-200/30 to-fuchsia-300/30 animate-float-medium",
  bgElement3: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-emerald-200/20 to-teal-300/20 animate-pulse-slow",
  
  // Grid Pattern
  gridPattern: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]",
  
  // Container
  container: "relative max-w-7xl mx-auto px-6 py-24 lg:py-32",
  grid: "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center",
  
  // Content Column
  content: "space-y-8 lg:space-y-10",
  contentInner: "space-y-6",
  
  // Badge
  badge: "inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/60 shadow-sm",
  badgeDot: "w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 animate-pulse",
  badgeText: "text-sm font-medium text-gray-700",
  
  // Heading
  heading: "text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight",
  headingLine1: "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent",
  headingLine2: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent",
  headingLine3: "text-gray-600",
  
  // Description
  description: "text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl",
  descriptionHighlight: "font-semibold text-gray-700",
  
  // CTA Buttons
  ctaContainer: "flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6",
  primaryButton: "group relative inline-flex items-center justify-center gap-3 px-8 lg:px-10 py-4 lg:py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 overflow-hidden",
  primaryButtonOverlay: "absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  primaryButtonText: "relative",
  primaryButtonIcon: "w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-300",
  secondaryButton: "group inline-flex items-center justify-center gap-2 px-8 lg:px-10 py-4 lg:py-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/60 text-gray-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-gray-300/60",
  secondaryButtonIcon: "w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300",
  
  // Feature Highlights
  featuresGrid: "grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8",
  featureItem: "flex items-center gap-3 group",
  featureIcon: "w-12 h-12 rounded-xl bg-white/80 backdrop-blur-xl border border-gray-200/60 flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300",
  featureText: "",
  featureLabel: "font-semibold text-gray-900",
  featureDesc: "text-sm text-gray-600",
  
   demoColumn: "relative w-full",
  demoFloating1:
    "hidden sm:block absolute -top-6 -left-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 blur-xl opacity-60 animate-float-slow pointer-events-none",
  demoFloating2:
    "hidden sm:block absolute -bottom-8 -right-8 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 blur-xl opacity-40 animate-float-medium pointer-events-none",
  demoContainer: "relative group w-full",

  // Main Demo Card
  demoCard:
    "bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl border border-gray-200/60 p-4 sm:p-6 md:p-8 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl w-full",
  cardHeader:
    "flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-6 border-b border-gray-200/60 gap-3",
  cardLogoContainer: "flex items-center gap-2 sm:gap-3",
  cardLogo:
    "w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm",
  cardClient: "flex flex-col",
  cardClientName: "font-bold text-gray-900 text-base sm:text-lg",
  cardClientGst: "text-xs sm:text-sm text-gray-500",
  cardInvoiceInfo: "text-right mt-3 sm:mt-0",
  cardInvoiceLabel: "text-xs font-semibold text-gray-500 uppercase tracking-wider",
  cardInvoiceNumber: "font-bold text-gray-900 text-base sm:text-lg",
  cardStatus:
    "text-xs sm:text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full mt-1",

  // Invoice Items
  itemsContainer: "py-6 space-y-4",
  itemRow:
    "flex justify-between items-center group/item hover:bg-gray-50/50 p-2 sm:p-3 rounded-lg transition-colors duration-200",
  itemDot:
    "w-2 h-2 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover/item:scale-150 transition-transform duration-300",
  itemDescription: "text-gray-700 font-medium text-sm sm:text-base",
  itemAmount: "font-semibold text-gray-900 text-sm sm:text-base",

  // Calculation Breakdown
  calculationContainer: "space-y-3 pt-4 border-t border-gray-200/60",
  calculationRow: "flex justify-between text-sm sm:text-base",
  calculationLabel: "text-gray-600 text-sm sm:text-base",
  calculationValue: "font-medium text-gray-900 text-sm sm:text-base",
  totalRow:
    "flex justify-between text-lg sm:text-xl font-bold pt-3 border-t border-gray-200/60",
  totalLabel: "text-gray-900",
  totalValue:
    "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-lg sm:text-xl font-bold",

  // Action Buttons
  actionButtons: "flex flex-col sm:flex-row gap-3 pt-6",
  previewButton:
    "flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group/btn text-sm sm:text-base",
  previewButtonText:
    "group-hover/btn:translate-x-1 transition-transform duration-200 inline-block",
  sendButton:
    "flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group/btn text-sm sm:text-base",
  sendButtonText:
    "group-hover/btn:translate-x-1 transition-transform duration-200 inline-block",

  // AI Indicator
  aiIndicator:
    "absolute -bottom-6 left-1/2 -translate-x-1/2 xl:translate-y-8 lg:translate-y-8 md:translate-y-3 translate-y-13 bg-white/90 backdrop-blur-xl rounded-2xl px-4 py-2 sm:px-4 sm:py-3 shadow-lg border border-gray-200/60 text-sm sm:text-base",
  aiIndicatorContent: "flex items-center gap-2 text-sm sm:text-base text-gray-600",
  aiIndicatorDot: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse",
  aiIndicatorText: "font-medium text-gray-900 text-sm sm:text-base",

  // Decorative Accents
  cornerAccent1:
    "hidden sm:block absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-blue-500 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  cornerAccent2:
    "hidden sm:block absolute -bottom-2 -left-2 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",

  // Card Background
  cardBackground:
    "absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/30 to-indigo-100/20 rounded-2xl sm:rounded-3xl blur-xl transform scale-100 sm:scale-105",

  // Scroll Indicator
  scrollIndicator: "absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 translate-y-18 sm:translate-y-20",
  scrollContainer: "flex flex-col items-center pt-10 gap-2 text-gray-400",
  scrollText: "text-sm font-medium",
  scrollBar: "w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-300 rounded-full flex justify-center",
  scrollDot: "w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"
};

// Add to src/assets/dummyStyles.js (after the existing styles)

export const invoicePreviewStyles = {
  // Layout
  pageContainer: "min-h-screen p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20",
  container: "max-w-6xl  mx-auto",
  noPrint: "no-print",

  // Header Actions
  headerContainer: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6",
  headerTitle: "text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight",
  headerSubtitle: "mt-2 text-lg text-gray-600",
  headerInvoiceNumber: "font-semibold text-blue-600",
  headerActions: "flex flex-wrap items-center gap-3",
  sendReminderButton: "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium",
  editInvoiceButton: "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium",
  printButton: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg",

  // Invoice Preview Card
  printArea: "print-preview-container",
  printHeader: "print-preview-header",
  companyInfo: "print-preview-company-info",
  logo: "print-preview-logo",
  invoiceFromLabel: "text-xs font-medium text-gray-500 uppercase tracking-wider mb-1",
  companyName: "text-xl font-bold text-gray-900 mb-2",
  companyAddress: "text-sm text-gray-600 print-preview-address mb-1",
  companyContact: "flex flex-wrap gap-4 text-sm text-gray-600",
  invoiceInfo: "print-preview-invoice-info",
  invoiceTitle: "text-2xl font-bold text-gray-900 mb-2",
  invoiceNumber: "text-lg text-gray-600 mb-4",
  invoiceDetails: "space-y-2 text-sm",
  invoiceDetailRow: "flex justify-between gap-6",
  invoiceDetailLabel: "text-gray-600 font-medium",
  invoiceDetailValue: "font-semibold text-gray-900",

  // Status Colors
  statusPaid: "text-green-600",
  statusUnpaid: "text-amber-600",
  statusOverdue: "text-red-600",
  statusDraft: "text-gray-600",

  // Sections
  section: "print-preview-section",
  flexContainer: "print-preview-flex",
  billToLabel: "text-xs font-medium text-gray-500 uppercase tracking-wider mb-2",
  clientName: "font-semibold text-gray-900 text-lg",
  clientDetails: "space-y-1",
  clientText: "text-sm text-gray-600",
  paymentDetailsLabel: "text-xs font-medium text-gray-500 uppercase tracking-wider mb-2",
  paymentDetails: "space-y-2 text-sm",
  paymentDetailRow: "flex justify-between",
  paymentDetailLabel: "text-gray-600",
  paymentDetailValue: "font-medium text-gray-900",

  // Table
  table: "print-preview-table",
  tableHeader: "text-xs font-medium text-gray-500 uppercase tracking-wider",
  tableCell: "font-medium",
  tableCellRight: "text-right",
  tableCellBold: "font-semibold",

  // Notes
  notesLabel: "text-sm font-medium text-gray-700 mb-2",
  notesContent: "text-sm text-gray-600 bg-gray-50 p-3 rounded border",

  // Signature & Stamp
  signatureLabel: "text-sm font-medium text-gray-700 mb-3",
  signatureContainer: "text-center",
  signatureImage: "print-preview-signature mx-auto",
  signatureName: "font-semibold border-t border-gray-300 pt-1",
  signatureTitle: "text-xs text-gray-500 mt-1",
  stampLabel: "text-sm font-medium text-gray-700 mb-3",
  stampContainer: "text-center",
  stampImage: "print-preview-stamp mx-auto",
  placeholderContainer: "h-16 flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-300 rounded",

  // Totals
  totalsContainer: "print-preview-totals",
  totalsRow: "flex justify-between",
  totalsLabel: "text-sm font-medium text-gray-700",
  totalsValue: "text-sm font-medium text-gray-900",
  totalDivider: "border-t border-gray-300 my-2 pt-2",
  totalAmountLabel: "text-lg font-bold text-gray-900",
  totalAmountValue: "text-lg font-bold text-gray-900",

  // Footer
  footer: "print-preview-section border-t border-gray-300 pt-4",
  footerText: "text-center text-sm text-gray-500",
  footerSubText: "text-center text-xs text-gray-400 mt-2",

  // Empty State
  emptyStateContainer: "max-w-4xl mx-auto",
  emptyStateCard: "bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/60 shadow-sm text-center",
  emptyStateIconContainer: "w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4",
  emptyStateIcon: "w-8 h-8",
  emptyStateTitle: "text-xl font-semibold text-gray-900",
  emptyStateMessage: "text-gray-600 mt-2 max-w-md mx-auto",
  emptyStateButton: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
};
// src/assets/dummyStyles.js (add these to the existing export)
export const pricingStyles = {
  // Section
  section: "relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden",
  
  // Background Elements
  bgElement1: "absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob",
  bgElement2: "absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000",
  bgElement3: "absolute -bottom-8 left-20 w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000",
  
  // Container
  container: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  
  // Header Section
  headerContainer: "text-center max-w-3xl mx-auto mb-16",
  badge: "inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6",
  badgeDot: "w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse",
  badgeText: "text-sm font-medium text-blue-700",
  title: "text-2xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-6",
  titleGradient: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
  description: "text-md md:text-xl lg:text-xl xl:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8",
  
  // Billing Toggle
  billingToggle: "inline-flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/60 shadow-sm",
  billingButton: "px-6 py-3 rounded-xl font-semibold transition-all duration-300",
  billingButtonActive: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg",
  billingButtonInactive: "text-gray-600 hover:text-gray-900",
  billingBadge: "ml-2 text-sm line-clamp-2 md:line-clamp-0 lg:line-clamp-0 xl:line-clamp-0 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full",
  
  // Pricing Grid
  grid: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 lg:gap-6 relative",
  
  // Additional Info
  additionalInfo: "mt-16 text-center",
  featuresCard: "bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60 shadow-sm max-w-2xl mx-auto",
  featuresTitle: "text-2xl font-bold text-gray-900 mb-4",
  featuresGrid: "grid sm:grid-cols-2 gap-4 text-gray-600",
  featureItem: "flex items-center gap-3",
  featureDot: "w-2 h-2 rounded-full bg-blue-500",
  
  // FAQ CTA
  faqCta: "mt-12 text-center",
  faqText: "text-gray-600 mb-6",
  contactLink: "text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
};

export const pricingCardStyles = {
  // Card Container
  card: "group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden",
  cardPopular: "border-blue-300/60 border-4 shadow-2xl scale-105 overflow-visible z-10",
  cardRegular: "border-white/60 border-4 shadow-sm hover:shadow-2xl overflow-hidden",
  
  // Popular Badge
  popularBadge: "absolute -top-4 left-1/2 -translate-x-1/2 z-40",
  popularBadgeContent: "bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg",
  
  // Gradient Overlay
  gradientOverlay: "absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 opacity-60 z-0 pointer-events-none rounded-3xl",
  
  // Animated Border
  animatedBorder: "absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-10",
  
  // Content
  content: "relative z-20",
  
  // Header
  header: "text-center mb-8",
  title: "text-2xl font-bold",
  titlePopular: "text-gray-900",
  titleRegular: "text-gray-800",
  description: "text-gray-600 mt-2",
  
  // Price
  priceContainer: "text-center mb-8",
  priceWrapper: "flex items-baseline justify-center gap-1",
  price: "text-4xl lg:text-5xl font-bold",
  pricePopular: "bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent",
  priceRegular: "text-gray-900",
  period: "text-gray-500 text-lg",
  annualBadge: "text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full mt-2 inline-block",
  
  // Features
  featuresList: "space-y-4 mb-8",
  featureItem: "flex items-center gap-3 text-gray-600",
  featureIcon: "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
  featureIconPopular: "bg-blue-100 text-blue-600",
  featureIconRegular: "bg-gray-100 text-gray-500",
  featureText: "text-sm lg:text-base",
  
  // CTA Button
  ctaButton: "w-full py-4 px-6 rounded-3xl font-semibold transition-all cursor-pointer duration-300 group/btn",
  ctaButtonPopular: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform ",
  ctaButtonRegular: "bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
  ctaButtonText: "inline-block transition-transform duration-300",
  ctaButtonTextPopular: "group-hover/btn:translate-x-1",
  ctaButtonTextRegular: "group-hover/btn:translate-y-0.5",
  
  // Decorative Accents
  cornerAccent1: "absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-blue-500 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30",
  cornerAccent2: "absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
};

// Add to src/assets/dummyStyles.js (after the existing styles)

export const authStyles = {
  // Layout
  pageContainer: "min-h-screen bg-white text-gray-800 antialiased",
  authContainer: "flex items-center justify-center py-24 px-6",
  authCard: "w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8",
  
  // Header
  authTitle: "text-2xl font-semibold mb-1",
  authSubtitle: "text-sm text-gray-500 mb-6",
  
  // Error Message
  errorContainer: "mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded",
  
  // Form
  form: "space-y-4",
  formField: "block text-sm font-medium text-gray-700 mb-2",
  input: "w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200",
  passwordContainer: "relative",
  passwordInput: "w-full rounded-md border border-gray-200 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-200",
  passwordToggle: "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none",
  
  // Button
  submitButton: "w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition",
  submitButtonDisabled: "disabled:opacity-50 disabled:cursor-not-allowed",
  
  // Footer Link
  footerContainer: "mt-6 text-center text-sm text-gray-600",
  footerLink: "text-indigo-600 hover:underline",
  
  // Icons
  eyeIcon: "w-5 h-5",
  eyeOffIcon: "w-5 h-5"
};

// src/assets/dummyStyles.js (add these to the existing export)
export const navbarStyles = {
  // Header
  header: "fixed w-full z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100",
  container: "max-w-7xl mx-auto px-6",
  nav: "flex items-center justify-between h-16",
  
  // Logo Section
  logoSection: "flex items-center gap-4",
  logoLink: "inline-flex items-center",
  logoImage: "h-12 w-12 object-contain",
  logoText: "font-semibold text-lg tracking-tight",
  
  // Desktop Navigation
  desktopNav: "hidden md:flex items-center space-x-6 ml-6",
  navLink: "text-sm hover:text-indigo-600 transition",
  navLinkInactive: "text-gray-600 hover:text-indigo-600 transition",
  
  // Desktop Auth Buttons
  authSection: "hidden md:flex items-center gap-4",
  signInButton: "text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 px-4 py-2 rounded-2xl hover:bg-gray-50/80 backdrop-blur-sm",
  signUpButton: "group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 overflow-hidden",
  signUpOverlay: "absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  signUpText: "relative",
  signUpIcon: "w-4 h-4 relative group-hover:translate-x-1 transition-transform duration-300",
  
  // Mobile Menu Button
  mobileMenuButton: "md:hidden p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105",
  mobileMenuIcon: "relative w-6 h-6",
  mobileMenuLine1: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-300",
  mobileMenuLine1Open: "rotate-45 translate-y-0",
  mobileMenuLine1Closed: "-translate-y-1",
  mobileMenuLine2: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-300",
  mobileMenuLine2Open: "opacity-0",
  mobileMenuLine2Closed: "opacity-100",
  mobileMenuLine3: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-300",
  mobileMenuLine3Open: "-rotate-45 translate-y-0",
  mobileMenuLine3Closed: "translate-y-1",
  
  // Mobile Menu
  mobileMenu: "md:hidden border-t border-gray-100 bg-white/95",
  mobileMenuContainer: "px-6 py-4 space-y-3",
  mobileNavLink: "block text-gray-700",
  mobileAuthSection: "pt-2",
  mobileSignIn: "block text-gray-700 py-2",
  mobileSignUp: "block mt-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-center"
};

// Add to src/assets/dummyStyles.js (after the existing styles)

export const kpiCardStyles = {
  // Card Container
  cardContainer: "group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.02] hover:border-gray-300/60 overflow-hidden",
  
  // Background Effects
  animatedBackground: "absolute inset-0 bg-gradient-to-br from-blue-50/0 via-indigo-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:via-indigo-50/20 group-hover:to-purple-50/10 transition-all duration-500 ease-out",
  cornerAccent: "absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-2xl",
  
  // Content
  content: "relative z-10",
  headerContainer: "flex items-center justify-between",
  mainContent: "flex-1 min-w-0",
  iconTrendContainer: "flex items-center gap-3 mb-3",
  
  // Icon
  iconContainer: "p-3 rounded-xl bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
  icon: "w-5 h-5 text-white",
  
  // Trend Badge
  trendBadge: "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium",
  trendBadgePositive: "text-emerald-600 bg-emerald-50 border-emerald-200",
  trendBadgeNegative: "text-rose-600 bg-rose-50 border-rose-200",
  trendBadgeNeutral: "text-gray-600 bg-gray-50 border-gray-200",
  trendIcon: "w-3 h-3",
  trendIconNegative: "rotate-180",
  
  // Text Content
  textContent: "space-y-2",
  title: "text-sm font-medium text-gray-600 tracking-wide uppercase",
  value: "text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight",
  
  // Hint
  hint: "text-xs text-gray-500 font-medium flex items-center gap-1",
  hintIcon: "w-3 h-3",
  
  // Progress Bar
  progressContainer: "mt-4 space-y-2",
  progressLabels: "flex justify-between text-xs text-gray-500",
  progressBar: "w-full bg-gray-200/60 rounded-full h-1.5 overflow-hidden",
  progressFill: "h-1.5 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
  
  // Icon Color Variants
  iconColors: {
    default: "from-blue-500 to-indigo-600",
    revenue: "from-emerald-500 to-green-600",
    growth: "from-blue-500 to-cyan-600", 
    document: "from-indigo-500 to-purple-600",
    clock: "from-amber-500 to-orange-600"
  },
  
  // Progress Fill Widths
  progressWidths: {
    revenue: "75%",
    growth: "85%",
    default: "65%"
  }
};

// src/assets/dummyStyles.js (add these to the existing export)
export const loginStyles = {
  // Layout
  root: "min-h-screen bg-white text-gray-800 antialiased",
  container: "flex items-center justify-center py-24 px-6",
  
  // Form Container
  formContainer: "w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8",
  title: "text-2xl font-semibold mb-1",
  subtitle: "text-sm text-gray-500 mb-6",
  
  // Error Message
  error: "mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded",
  
  // Form
  form: "space-y-4",
  formGroup: "",
  label: "block text-sm font-medium text-gray-700 mb-2",
  input: "w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200",
  passwordContainer: "relative",
  passwordInput: "w-full rounded-md border border-gray-200 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-200",
  passwordToggle: "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none",
  passwordIcon: "w-5 h-5",
  
  // Remember Me & Forgot Password
  formOptions: "flex items-center justify-between text-sm",
  rememberContainer: "inline-flex items-center gap-2",
  rememberCheckbox: "rounded border-gray-200",
  rememberText: "text-gray-600",
  forgotPassword: "text-indigo-600 hover:underline",
  
  // Submit Button
  submitButton: "w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition",
  
  // Sign Up Link
  signupContainer: "mt-6 text-center text-sm text-gray-600",
  signupLink: "text-indigo-600 hover:underline"
};

// src/assets/dummyStyles.js (add these to the existing export)
export const footerStyles = {
  // Footer Container
  footer: "mt-24 border-t border-gray-100 bg-white",

  // Outer container: mobile = stacked/centered, md+ = row with spaced items; responsive paddings
  container:
    "max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:gap-0",

  // Copyright Text: smaller on very small screens, larger on lg/xl; centered on mobile, left on md+
  copyright:
    "text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 text-center md:text-left",

  // Links Container: stack on mobile, inline on md+; spacing increases with breakpoints
  links:
    "flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6 mt-2 md:mt-0",

  // Individual link: responsive text sizing and smooth color transition
  link:
    "text-sm md:text-sm lg:text-base text-gray-600 hover:text-indigo-600 transition-colors duration-200"
};
