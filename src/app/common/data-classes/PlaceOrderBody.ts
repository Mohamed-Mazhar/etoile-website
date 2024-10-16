import {CartProductItem} from "../../features/cart/data/model/CartProductItem";

export class PlaceOrderBody {
  cart: CartProductItem[] | null;
  couponDiscountAmount: number | null;
  couponDiscountTitle: string | null;
  orderAmount: number | null;
  orderType: string | null;
  deliveryAddressId: number | null;
  paymentMethod: string | null;
  orderNote: string | null;
  couponCode: string | null;
  deliveryTime: string | null;
  deliveryDate: string | null;
  branchId: number | null;
  distance: number | null;
  transactionReference: string | null;
  paymentInfo: OfflinePaymentInfo | null;
  isPartial: string | null;
  isCutleryRequired: string | null;

  constructor(
    cart: CartProductItem[] | null,
    couponDiscountAmount: number | null,
    couponDiscountTitle: string | null,
    couponCode: string | null,
    orderAmount: number,
    deliveryAddressId: number | null,
    orderType: string | null,
    paymentMethod: string,
    branchId: number,
    deliveryTime: string,
    deliveryDate: string,
    orderNote: string,
    distance: number,
    isPartial: string,
    transactionReference?: string | null,
    paymentInfo?: OfflinePaymentInfo | null,
    isCutleryRequired?: string | null
  ) {
    this.cart = cart;
    this.couponDiscountAmount = couponDiscountAmount;
    this.couponDiscountTitle = couponDiscountTitle;
    this.couponCode = couponCode;
    this.orderAmount = orderAmount;
    this.deliveryAddressId = deliveryAddressId;
    this.orderType = orderType;
    this.paymentMethod = paymentMethod;
    this.orderNote = orderNote;
    this.deliveryTime = deliveryTime;
    this.deliveryDate = deliveryDate;
    this.branchId = branchId;
    this.distance = distance;
    this.transactionReference = transactionReference || null;
    this.paymentInfo = paymentInfo || null;
    this.isPartial = isPartial;
    this.isCutleryRequired = isCutleryRequired || null;
  }

  copyWith(paymentMethod?: string, transactionReference?: string | null): PlaceOrderBody {
    if (paymentMethod) {
      this.paymentMethod = paymentMethod;
    }
    if (transactionReference) {
      this.transactionReference = transactionReference;
    }
    return this;
  }

  static fromJson(json: any): PlaceOrderBody {
    const cart = json.cart ? json.cart.map((v: any) => Cart.fromJson(v)) : null;
    return new PlaceOrderBody(
      cart,
      json.coupon_discount_amount,
      json.coupon_discount_title,
      json.coupon_code,
      json.order_amount,
      json.delivery_address_id,
      json.order_type,
      json.payment_method,
      json.branch_id,
      json.delivery_time,
      json.delivery_date,
      json.order_note,
      json.distance,
      json.is_partial,
      json.transaction_reference,
      json.payment_info ? OfflinePaymentInfo.fromJson(json.payment_info) : null,
      json.is_cutlery_required
    );
  }

  toJson(): any {
    let jsonBody: { [key: string]: any } = {}
    jsonBody['cart'] = this.cart!.map(v => {
        return {
          product_id: v.product.id,
          price: v.product.price,
          // discount_amount: this.discountAmount,
          quantity: v.count,
          // tax_amount: this.taxAmount,
          add_on_ids: v.productAddOns.map((addOn) => addOn.id),
          // add_on_qtys: this.addOnQtys,
        }
      }
    )
    jsonBody['delivery_address_id'] = this.deliveryAddressId
    jsonBody['coupon_discount_amount'] = this.couponDiscountAmount ?? 0
    jsonBody['coupon_discount_title'] = this.couponDiscountTitle ?? ''
    jsonBody['order_amount'] = this.orderAmount
    jsonBody['order_type'] = this.orderType
    jsonBody['payment_method'] = this.paymentMethod
    jsonBody['order_note'] = this.orderNote ?? ''
    jsonBody['coupon_code'] = this.couponCode ?? ''
    jsonBody['delivery_time'] = this.deliveryTime
    jsonBody['delivery_date'] = this.deliveryDate
    jsonBody['branch_id'] = this.branchId
    jsonBody['distance'] = this.distance ?? -1
    jsonBody['is_partial'] = 0
    jsonBody['is_cutlery_required'] = false
    if (this.transactionReference !== null) {
      jsonBody['transaction_reference'] = this.transactionReference
    }
    if (this.paymentInfo !== null) {
      jsonBody['payment_info'] = this.paymentInfo
    }
    jsonBody['selected_delivery_area'] = 1 //Todo change it to the right value
    return jsonBody
    // return {
    //   cart: this.cart ? this.cart.map(v => {
    //     return {
    //       product_id: v.product.id,
    //       price: v.product.price,
    //       // discount_amount: this.discountAmount,
    //       quantity: v.count,
    //       // tax_amount: this.taxAmount,
    //       add_on_ids: v.productAddOns.map((addOn) => addOn.id),
    //       // add_on_qtys: this.addOnQtys,
    //     }
    //   }) : null,
    //   coupon_discount_amount: this.couponDiscountAmount,
    //   coupon_discount_title: this.couponDiscountTitle,
    //   order_amount: this.orderAmount,
    //   order_type: this.orderType,
    //   delivery_address_id: this.deliveryAddressId,
    //   payment_method: this.paymentMethod,
    //   order_note: this.orderNote,
    //   coupon_code: this.couponCode,
    //   delivery_time: this.deliveryTime,
    //   delivery_date: this.deliveryDate,
    //   branch_id: this.branchId,
    //   distance: this.distance,
    //   // transaction_reference: this.transactionReference,
    //   // payment_info: this.paymentInfo ? this.paymentInfo.toJson() : null,
    //   is_partial: this.isPartial,
    //   is_cutlery_required: this.isCutleryRequired,
    // };
  }
}

class Cart {
  productId: string | null;
  price: string | null;
  variant: string[] | null;
  variation: OrderVariation[] | null;
  discountAmount: number | null;
  quantity: number | null;
  taxAmount: number | null;
  addOnIds: number[] | null;
  addOnQtys: number[] | null;

  constructor(
    productId: string | null,
    price: string | null,
    variant: string[] | null,
    variation: OrderVariation[] | null,
    discountAmount: number | null,
    quantity: number | null,
    taxAmount: number | null,
    addOnIds: number[] | null,
    addOnQtys: number[] | null
  ) {
    this.productId = productId;
    this.price = price;
    this.variant = variant;
    this.variation = variation;
    this.discountAmount = discountAmount;
    this.quantity = quantity;
    this.taxAmount = taxAmount;
    this.addOnIds = addOnIds;
    this.addOnQtys = addOnQtys;
  }

  static fromJson(json: any): Cart {
    const variation = json.variations
      ? json.variations.map((v: any) => OrderVariation.fromJson(v))
      : null;
    return new Cart(
      json.product_id,
      json.price,
      json.variant,
      variation,
      json.discount_amount,
      json.quantity,
      json.tax_amount,
      json.add_on_ids,
      json.add_on_qtys
    );
  }

  toJson(): any {
    return {
      product_id: this.productId,
      price: this.price,
      variant: this.variant,
      variations: this.variation ? this.variation.map(v => v.toJson()) : null,
      discount_amount: this.discountAmount,
      quantity: this.quantity,
      tax_amount: this.taxAmount,
      add_on_ids: this.addOnIds,
      add_on_qtys: this.addOnQtys,
    };
  }
}

class OrderVariation {
  name: string | null;
  values: OrderVariationValue | null;

  constructor(name: string | null, values: OrderVariationValue | null) {
    this.name = name;
    this.values = values;
  }

  static fromJson(json: any): OrderVariation {
    return new OrderVariation(
      json.name,
      json.values ? OrderVariationValue.fromJson(json.values) : null
    );
  }

  toJson(): any {
    return {
      name: this.name,
      values: this.values ? this.values.toJson() : null,
    };
  }
}

class OrderVariationValue {
  label: string[] | null;

  constructor(label: string[] | null) {
    this.label = label;
  }

  static fromJson(json: any): OrderVariationValue {
    return new OrderVariationValue(json.label);
  }

  toJson(): any {
    return {
      label: this.label,
    };
  }
}

class OfflinePaymentInfo {
  paymentName: string | null;
  paymentNote: string | null;
  methodFields: Array<Map<string, any> | null> | null;
  methodInformation: Array<Map<string, string>> | null;

  constructor(
    paymentName: string | null,
    paymentNote: string | null,
    methodFields: Array<Map<string, any> | null> | null,
    methodInformation: Array<Map<string, string>> | null
  ) {
    this.paymentName = paymentName;
    this.paymentNote = paymentNote;
    this.methodFields = methodFields;
    this.methodInformation = methodInformation;
  }

  static fromJson(json: any): OfflinePaymentInfo {
    return new OfflinePaymentInfo(
      json.payment_name,
      json.payment_note,
      json.method_fields,
      json.method_information
    );
  }

  toJson(): any {
    return {
      payment_name: this.paymentName,
      payment_note: this.paymentNote,
      method_fields: this.methodFields,
      method_information: this.methodInformation,
    };
  }
}
