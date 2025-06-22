export type Drink = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  dataAiHint: string;
};

export type LoyaltyTier = 'Coffee Guest' | 'SVO Participant' | 'ANO Partner' | 'KUPNO Projects';

export type User = {
  id: string;
  name: string;
  phone: string;
  role: 'customer' | 'admin' | 'owner';
  loyaltyTier?: LoyaltyTier;
  loyaltyPercentage?: number;
  bonusBalance?: number;
  ordersCompleted?: number;
};

export type OrderItem = {
  drink: Drink;
  quantity: number;
};
