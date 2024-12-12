import { Action } from '@pages/Account/reducer';
import { ProductCheckoutType } from '.';

export enum ShippingMethodType {
  GO_TO_STORE = 'GO_TO_STORE',
  STANDARD_SHIPPING = 'STANDARD_SHIPPING_($12.60)',
  EXPRESS_SHIPPING = 'EXPRESS_SHIPPING_($20.20)',
}

export enum PaymentMethodType {
  GO_TO_STORE = 'GO_TO_STORE',
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export type FormCheckoutValues = {
  address: string;
  name: string;
  phone: string;
  shippingMethod: string;
  date?: Date;
  paymentMethod: string;
  products: ProductCheckoutType[];
  cardNumber?: string;
  cardName?: string;
  cardExpired?: string;
  cardCvv?: string;
};

export interface FormCheckoutError {
  address: string;
  name: string;
  phone: string;
  shippingMethod: string;
  date: string;
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  cardExpired: string;
  cardCvv: string;
  products: string;
}

export interface FormCheckoutState {
  values: FormCheckoutValues;
  errors: FormCheckoutError;
  isValid: boolean;
}

type SetStateAction = {
  type: 'UPDATE_FIELD';
  field: keyof FormCheckoutValues;
  value: any;
};

type ValidateErrorAction = {
  type: 'VALIDATE_FIELD';
  field: keyof FormCheckoutError;
  error: string;
};

type ResetAction = {
  type: 'RESET';
};

type SetIsValidAction = {
  type: 'SET_IS_VALID';
  isValid: boolean;
};

type FormCheckoutAction = SetStateAction | ValidateErrorAction | SetIsValidAction | ResetAction;

export const initialCheckoutState: FormCheckoutState = {
  values: {
    address: '',
    name: '',
    phone: '',
    shippingMethod: ShippingMethodType.GO_TO_STORE,
    paymentMethod: PaymentMethodType.GO_TO_STORE,
    cardName: '',
    cardNumber: '',
    cardExpired: '',
    cardCvv: '',
    products: [],
  },
  errors: {
    address: '',
    name: '',
    phone: '',
    shippingMethod: '',
    date: '',
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    cardExpired: '',
    cardCvv: '',
    products: '',
  },
  isValid: false,
};

export const formCheckoutReducer = (
  state: FormCheckoutState,
  action: FormCheckoutAction,
): FormCheckoutState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case 'VALIDATE_FIELD':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };
    case 'SET_IS_VALID':
      return {
        ...state,
        isValid: action.isValid,
      };
    case 'RESET':
      return initialCheckoutState;
    default:
      return state;
  }
};
