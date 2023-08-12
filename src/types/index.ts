export interface Pizza {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface CartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface CreateOrderFormData {
  customer: string;
  phone: string;
  address: string;
  priority: string;
  cart: string;
}

export interface CreateOrderFormDataParsed
  extends Omit<CreateOrderFormData, "priority" | "cart"> {
  priority: boolean;
  cart: CartItem[];
}

export interface Order extends CreateOrderFormDataParsed {
  id: string;
  status: "preparing";
  estimatedDelivery: string;
  position: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface ReverseGeocodeResponse {
  latitude: number;
  longitude: number;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  localityInfo: {
    administrative: Array<{
      name: string;
      description: string;
      order: number;
      adminLevel: number;
      isoCode?: string;
      wikidataId: string;
      geonameId: number;
    }>;
    informative: Array<{
      name: string;
      description: string;
      order: number;
      isoCode?: string;
      wikidataId?: string;
    }>;
  };
}
