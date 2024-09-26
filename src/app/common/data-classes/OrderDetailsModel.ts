import {Product} from "./ProductModel"
import {OrderModel} from "./OrderModel"

export class OrderDetailsModel {
  id?: number
  productId?: number
  orderId?: number
  price?: number
  productDetails?: Product
  discountOnProduct?: number
  discountType?: string
  quantity?: number
  taxAmount?: number
  createdAt?: string
  updatedAt?: string
  addOnIds?: number[]
  addOnPrices?: number[]
  addOnQtys?: number[]
  addOnTaxAmount?: number
  orderModel?: OrderModel

  constructor(data: {
    id?: number
    productId?: number
    orderId?: number
    price?: number
    productDetails?: Product
    discountOnProduct?: number
    discountType?: string
    quantity?: number
    taxAmount?: number
    createdAt?: string
    updatedAt?: string
    addOnIds?: number[]
    addOnQtys?: number[]
    addOnTaxAmount?: number
    addOnPrices?: number[]
    orderModel?: OrderModel
  }) {
    Object.assign(this, data)
  }

  static fromJson(json: any): OrderDetailsModel {
    return new OrderDetailsModel({
      id: json['id'],
      productId: json['product_id'],
      orderId: json['order_id'],
      price: Number(json['price']),
      productDetails: Product.fromJson(json['product_details']),
      discountOnProduct: Number(json['discount_on_product']),
      discountType: json['discount_type'],
      quantity: json['quantity'],
      taxAmount: Number(json['tax_amount']),
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      addOnIds: json['add_on_ids'] ? json['add_on_ids'].map((x: any) => Number(x)) : undefined,
      addOnQtys: json['add_on_qtys']
        ? json['add_on_qtys'].map((x: any) => {
          try {
            return Number(x)
          } catch {
            return x
          }
        })
        : undefined,
      addOnPrices: json['add_on_prices']
        ? json['add_on_prices'].map((x: any) => {
          try {
            return Number(x)
          } catch {
            return x
          }
        })
        : undefined,
      addOnTaxAmount: Number(json['add_on_tax_amount']),
      orderModel: OrderModel.fromJson(json['order']),
    })
  }
}
