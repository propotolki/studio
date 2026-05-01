export type RentalMode = "hourly" | "daily" | "mixed";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface PricingRule {
  venueId: string;
  rentalMode: RentalMode;
  currency: "RUB";
  baseHourlyRate: number;
  baseDailyRate: number;
  minimumHours: number;
  weekendMultiplier: number;
  nightMultiplier: number;
  cleaningFee: number;
}

export interface InventoryItem {
  id: string;
  venueId: string;
  name: string;
  included: boolean;
  unitPrice: number;
}

export interface BookingSlot {
  startAt: Date;
  endAt: Date;
}

export interface BookingCostInput {
  slot: BookingSlot;
  rentalMode: RentalMode;
  pricingRule: PricingRule;
  inventoryTotal?: number;
  isWeekend?: boolean;
  hasNightHours?: boolean;
}

export interface BookingCostBreakdown {
  durationHours: number;
  durationDays: number;
  baseAmount: number;
  inventoryAmount: number;
  cleaningFee: number;
  totalAmount: number;
  currency: "RUB";
}
