export interface ShippingInfo {
  id: string;
  address: string;
  name: string;
  phone: string;
}

export interface ShippingResponse {
  id: string;
  account_id: string;
  info: ShippingInfo;
}