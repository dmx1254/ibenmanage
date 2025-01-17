export interface CUR {
  _id: string;
  [string]: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  productId: string;
  category: string;
  server: string;
  qty: number;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  type: string;
  currency: string;
  valCurrency: number;
  character: string;
}

export interface CUR {
  _id: string;
  [string]: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface USERLOGINRESPONSE {
  _id: string;
  address: string;
  city: string;
  country: string;
  clientIp: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  moderator: boolean;
  online: boolean;
  isEmailVerified?: boolean;
  departement?: string;
  password: string | undefined;
  phone: string;
  profil: string;
  isBan: boolean;
}

export interface UserRegister {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  code: string;
  password: string;
}

export interface ValidToken {
  userId: string;
  iat: number;
  exp: number;
}

export interface OrderLength {
  lastOrder: OrderSell[];
  ordersBuysLength: number;
  ordersSellLength: number;
  exchangeLength: number;
}

export interface ExchangeKamas {
  _id: string;
  userId: string;
  serverOut: string;
  qtyToPay: number;
  characterToPay: string;
  serverIn: string;
  qtyToReceive: number;
  characterToReceive: string;
  codeToExchange: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Orderbuy {
  _id: string;
  userId: string;
  numBuy: string;
  lastname?: string;
  firstname?: string;
  pu: number;
  qte: number;
  totalPrice: number;
  paymentMethod: string;
  gameName: string;
  jeu: string;
  server: string;
  paymentInfoDetails: string;
  currencymethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  productId: string;
  category: string;
  server: string;
  qty: number;
  amount: number;
  price: number;
  character: string;
  totalPrice: number;
}

export interface OrderSell {
  _id: string;
  userId: string;
  orderNum: string;
  products: Product[];
  totalPrice: number;
  paymentMethod: string;
  orderIdPaid: string;
  billing?: any;
  detailUser?: any;
  cur: string;
  valCurency: number;
  status: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  lastname: string;
  firstname: string;
  email: string;
  isAdmin: boolean;
  moderator: boolean;
  phone: string;
  address: string;
  country: string;
  city: string;
  departement?: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCard {
  code: string;
  expirationDate: string;
}

export interface UserPaymentMethodResponse {
  _id: string;
  UserId: string;
  method: string;
  rib?: string;
  email?: string;
  trc20Address?: string;
  cardInfo?: Card;
}

export type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
