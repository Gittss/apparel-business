export interface Apparel {
  code: string;
  size: string;
  quantity: number;
  price: number;
}

export interface ApparelData {
  [key: string]: Apparel[];
}
