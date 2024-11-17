import { Action } from '@pages/Account/reducer';
import { ProductCheckoutType } from '.';

export enum ShippingMethodType {
  GO_TO_STORE = 'GO_TO_STORE',
  STANDARD_SHIPPING = 'STANDARD_SHIPPING_($12.00)',
  EXPRESS_SHIPPING = 'EXPRESS_SHIPPING_($50.00)',
}

export enum PaymentMethodType {
  GO_TO_STORE = 'GO_TO_STORE',
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export interface FormCheckoutState {
  address: string;
  name: string;
  phone: string;
  shippingMethod: ShippingMethodType;
  date?: Date;
  paymentMethod: {
    method: PaymentMethodType;
    values: string;
  };
  products: ProductCheckoutType[];
}

export const initialCheckoutState: FormCheckoutState = {
  address: '',
  name: '',
  phone: '',
  shippingMethod: ShippingMethodType.GO_TO_STORE,
  date: new Date(),
  paymentMethod: {
    method: PaymentMethodType.GO_TO_STORE,
    values: JSON.stringify({}),
  },
  products: [],
};

export const formCheckoutReducer = (
  state: FormCheckoutState,
  action: Action,
): FormCheckoutState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialCheckoutState;
    default:
      return state;
  }
};
