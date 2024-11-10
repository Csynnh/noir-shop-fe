
export interface FormShippingInfoState {
  address: string;
  name: string;
  phone: string;
}

export interface UserInfoState {
  email: string;
  phone: string;
  password: string;
  name: string;
}

export interface EmailState {
  email: string;
}

export interface PasswordState {
  newPassword: string;
  confirmNewPassword: string;
}

type Action = { type: 'SET_FIELD'; field: string; value: any } | { type: 'RESET' };

export const initialShippingInfoState: FormShippingInfoState = {
  address: '',
  name: '',
  phone: '',
};

export const initialEmailState: EmailState = {
  email: '',
}

export const initialUserInfoState: UserInfoState = {
  name: '',
  email: '',
  phone: '',
  password: '',
}

export const initialPasswordState: PasswordState = {
  newPassword: '',
  confirmNewPassword: '',
}

export const formShippingInfoReducer = (state: FormShippingInfoState, action: Action): FormShippingInfoState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialShippingInfoState;
    default:
      return state;
  }
};

export const formUserInfoReducer = (state: UserInfoState, action: Action): UserInfoState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialUserInfoState;
    default:
      return state;
  }
};

export const formPasswordReducer = (state: PasswordState, action: Action): PasswordState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialPasswordState;
    default:
      return state;
  }
};

export const formEmailReducer = (state: EmailState, action: Action): EmailState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialEmailState;
    default:
      return state;
  }
};