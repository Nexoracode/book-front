export enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  COMPLETED = "Completed",
  FAIL_PAYMENT = "FailPayment",
  FAIL_VERIFY = "FailVerify",
  CANCELED = "Canceled",
}

export type Paginate<T> = {
  data: Array<T>;
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [[string, string]];
    filter: {
      status: "$eq:Completed";
      createdAt: "$gte:2025-02-22T17:37:27.297Z";
    };
  };
};

export type Media = {
  id: number;
  productId: number;
  url: string;
  createdAt: string;
  displayOrder: number | null;
};

export type Order = {
  id: 1;
  status: OrderStatus;
  totalAmount: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  invoice: Invoice;
  product: Product;
  user: User;
  address: Address;
};

export type Invoice = {
  id: number;
  transactionId: number;
  cardPan: string;
  amount: string;
  paymentMethod: string;
  createdAt: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  description2: string;
  price: number;
  postage: number;
  stock: number;
  discount: number | null;
  weight: number;
  isbn: string;
  pages: number;
  author: string;
  publisher: string;
  ageGroup: string;
  template: string;
  coverType: string;
  media: Array<Media>;
  urlVideo: string | null;
  thumbnail: string | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  password: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  id: number;
  province: string;
  city: string;
  street: string;
  plaque: string;
  postalCode: string;
};

export type Filter = {
  "filter.status"?: string;
  "filter.product_id"?: string;
  "filter.createdAt[0]"?: string;
  "filter.createdAt[1]"?: string;
  search?: string;
};

export type DiscountType = "fixed" | "percentage";
export type Discount = {
  id: number;
  code: string;
  type: DiscountType;
  value: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
