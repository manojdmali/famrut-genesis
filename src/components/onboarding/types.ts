export type OrgType = "FPO" | "Agri Startup" | "Government" | "Cooperative" | "Bank/NBFC" | "Enterprise";

export interface OnboardingState {
  company: {
    name: string;
    type: OrgType | "";
    contact: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    address: string;
  };
  brand: {
    primary: string;
    accent: string;
    font: string;
    mode: "light" | "dark";
    logoName: string;
  };
  modules: string[];
}

export const initialState: OnboardingState = {
  company: { name: "", type: "", contact: "", email: "", phone: "", country: "India", state: "", address: "" },
  brand: { primary: "#2E7D32", accent: "#4CAF50", font: "Inter", mode: "light", logoName: "" },
  modules: ["farmer-management", "crop-advisory", "ai-chatbot", "mandi-prices"],
};

export interface ModuleDef {
  id: string;
  name: string;
  description: string;
  price: number;
  recommended?: boolean;
}

export interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  modules: ModuleDef[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: "farmer",
    name: "Farmer Services",
    icon: "🌾",
    modules: [
      { id: "farmer-management", name: "Farmer Management", description: "Onboard, segment & track farmers at scale.", price: 49, recommended: true },
      { id: "crop-advisory", name: "Crop Advisory", description: "Personalized agronomic guidance by season.", price: 39, recommended: true },
      { id: "ai-chatbot", name: "AI Chatbot", description: "Multilingual voice & text assistant.", price: 59, recommended: true },
      { id: "disease-detection", name: "Disease Detection", description: "Computer-vision pest & disease scans.", price: 79 },
      { id: "weather-alerts", name: "Weather Alerts", description: "Hyperlocal forecasts & advisories.", price: 29 },
      { id: "farm-diary", name: "Farm Diary", description: "Daily activity & cost tracking.", price: 19 },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    icon: "🛒",
    modules: [
      { id: "buyer-seller", name: "Buyer-Seller Marketplace", description: "B2B & B2C produce trading.", price: 99 },
      { id: "mandi-prices", name: "Mandi Prices", description: "Live commodity price feeds.", price: 25, recommended: true },
      { id: "inventory", name: "Inventory", description: "Warehouse & stock management.", price: 45 },
      { id: "logistics", name: "Logistics", description: "Fleet & cold-chain tracking.", price: 69 },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    icon: "💳",
    modules: [
      { id: "loan-management", name: "Loan Management", description: "Origination to collection workflows.", price: 119 },
      { id: "credit-scoring", name: "AI Credit Scoring", description: "Alt-data scoring for thin-file farmers.", price: 149 },
      { id: "insurance", name: "Insurance", description: "Parametric & traditional crop cover.", price: 89 },
      { id: "subsidy", name: "Subsidy Tracking", description: "DBT & scheme disbursement tracking.", price: 59 },
    ],
  },
  {
    id: "gov",
    name: "Government & FPO",
    icon: "🏛️",
    modules: [
      { id: "scheme-mgmt", name: "Scheme Management", description: "Configure & roll-out gov schemes.", price: 99 },
      { id: "farmer-registry", name: "Farmer Registry", description: "Aadhaar-grade identity registry.", price: 79 },
      { id: "fpo-dashboard", name: "FPO Dashboard", description: "Member, share & business analytics.", price: 49 },
      { id: "compliance", name: "Compliance", description: "Audit logs & regulatory reports.", price: 69 },
    ],
  },
  {
    id: "ai",
    name: "AI & Analytics",
    icon: "🧠",
    modules: [
      { id: "predictive", name: "Predictive Analytics", description: "Demand, supply & price forecasts.", price: 129, recommended: true },
      { id: "ai-planning", name: "AI Crop Planning", description: "Optimal sowing & rotation plans.", price: 109 },
      { id: "yield-prediction", name: "Yield Prediction", description: "Satellite + ground-truth yield models.", price: 139 },
      { id: "smart-reports", name: "Smart Reports", description: "Auto-generated BI dashboards.", price: 49 },
    ],
  },
];

export const ALL_MODULES = CATEGORIES.flatMap(c => c.modules);
