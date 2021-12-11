export class Cart {
  items!: CartItem[];
}

export class CartItem {
  productId!: string | any;
  quantity!: number
}

export class CartItemDetailed {
  product?: any;
  quantity?: number | any;
}