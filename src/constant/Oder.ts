export enum OderType {
  ALL = 'ALL',
  NEED_CONFIRM = 'CONFIRMING',
  PREPAIRING = 'PREPARING',
  SHIPPING = 'SHIPPING',
  SUCCESSFULLY = 'SUCCESSFULLY',
}

export const StatusColorMap: Record<OderType, string> = {
  [OderType.NEED_CONFIRM]: '#DEFFA1',
  [OderType.PREPAIRING]: '#F2CFF0',
  [OderType.SHIPPING]: '#1B352A',
  [OderType.SUCCESSFULLY]: '#A2EECD',
  [OderType.ALL]: '#ffffff',
};

interface OrderItemProps {
  id: string;
  name: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

export interface CustomerInfoProps {
  name: string;
  address: string;
  phone: string;
}

export type Order = {
  id: string;
  customer: CustomerInfoProps;
  date: string;
  total: number;
  status: Exclude<OderType, OderType.ALL>;
  details?: OrderItemProps[];
};
