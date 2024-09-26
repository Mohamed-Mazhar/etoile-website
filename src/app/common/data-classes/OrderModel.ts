import {Branch} from "./ConfigModel";

export class OrderModel {
  id?: number
  userId?: number
  orderAmount?: number
  couponDiscountAmount?: number
  couponDiscountTitle?: string
  paymentStatus?: string
  orderStatus?: string
  totalTaxAmount?: number
  paymentMethod?: string
  transactionReference?: string
  deliveryAddressId?: number
  createdAt?: string
  updatedAt?: string
  deliveryManId?: number
  deliveryCharge?: number
  orderNote?: string
  addOnIds?: number[]
  details?: Details[]
  detailsCount?: number
  orderType?: string
  deliveryTime?: string
  deliveryDate?: string
  extraDiscount?: number
  deliveryAddress?: DeliveryAddress
  preparationTime?: string
  isProductAvailable?: boolean
  orderPartialPayments?: OrderPartialPayment[]
  isGuest?: boolean
  isCutlery?: boolean
  productImageList?: string[]
  branches?: Branch
  offlinePaymentInformation?: OfflinePaymentInformation

  constructor(data: {
    id?: number
    userId?: number
    orderAmount?: number
    couponDiscountAmount?: number
    couponDiscountTitle?: string
    paymentStatus?: string
    orderStatus?: string
    totalTaxAmount?: number
    paymentMethod?: string
    transactionReference?: string
    deliveryAddressId?: number
    createdAt?: string
    updatedAt?: string
    deliveryManId?: number
    deliveryCharge?: number
    orderNote?: string
    addOnIds?: number[]
    details?: Details[]
    detailsCount?: number
    orderType?: string
    deliveryTime?: string
    deliveryDate?: string
    extraDiscount?: number
    deliveryAddress?: DeliveryAddress
    preparationTime?: string
    isProductAvailable?: boolean
    orderPartialPayments?: OrderPartialPayment[]
    isGuest?: boolean
    isCutlery?: boolean
    productImageList?: string[]
    branches?: Branch
    offlinePaymentInformation?: OfflinePaymentInformation
  }) {
    Object.assign(this, data, {deliveryAddress: data.deliveryAddress})
  }

  static fromJson(json: any): OrderModel {
    return new OrderModel({
      id: json['id'],
      userId: json['user_id'],
      orderAmount: parseFloat(json['order_amount']),
      couponDiscountAmount: parseFloat(json['coupon_discount_amount']),
      couponDiscountTitle: json['coupon_discount_title'],
      paymentStatus: json['payment_status'],
      orderStatus: json['order_status'] === 'cooking' || json['order_status'] === 'done' ? 'processing' : json['order_status'],
      totalTaxAmount: parseFloat(json['total_tax_amount']),
      paymentMethod: json['payment_method'],
      transactionReference: json['transaction_reference'],
      deliveryAddressId: json['delivery_address_id'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      deliveryManId: json['delivery_man_id'],
      deliveryCharge: parseFloat(json['delivery_charge']),
      orderNote: json['order_note'],
      addOnIds: json['add_on_ids'] ? json['add_on_ids'] : [],
      details: json['details'] ? json['details'].map((v: any) => Details.fromJson(v)) : [],
      orderType: json['order_type'],
      deliveryTime: json['delivery_time'],
      deliveryDate: json['delivery_date'],
      extraDiscount: json['extra_discount'] ? parseFloat(json['extra_discount']) : undefined,
      deliveryAddress: json['delivery_address'] ? DeliveryAddress.fromJson(json['delivery_address']) : undefined,
      preparationTime: json['preparation_time'] ? json['preparation_time'].toString() : undefined,
      isProductAvailable: parseInt(json['is_product_available'], 10) === 1,
      orderPartialPayments: json["order_partial_payments"] ? json["order_partial_payments"].map((x: any) => OrderPartialPayment.fromJson(x)) : [],
      isGuest: json["is_guest"] === '1',
      isCutlery: json["is_cutlery_required"] === '1',
      productImageList: json['product_images'] ? json['product_images'] : [],
      branches: json['branch'] ? Branch.fromJson(json['branch']) : undefined,
      offlinePaymentInformation: json["offline_payment_information"] ? OfflinePaymentInformation.fromJson(json["offline_payment_information"]) : undefined
    })
  }
}

export class DeliveryAddress {
  id?: number;
  addressType?: string;
  contactPersonNumber?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
  contactPersonName?: string;

  constructor(data: {
    id?: number;
    addressType?: string;
    contactPersonNumber?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: number;
    contactPersonName?: string;
  }) {
    Object.assign(this, data);
  }

  static fromJson(json: any): DeliveryAddress {
    return new DeliveryAddress({
      id: json['id'],
      addressType: json['address_type'],
      contactPersonNumber: json['contact_person_number'],
      address: json['address'],
      latitude: json['latitude'],
      longitude: json['longitude'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      userId: json['user_id'],
      contactPersonName: json['contact_person_name']
    });
  }
}

export class Details {
  id?: number;
  productId?: number;
  orderId?: number;
  price?: number;
  discountOnProduct?: number;
  discountType?: string;
  quantity?: number;
  taxAmount?: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: {
    id?: number;
    productId?: number;
    orderId?: number;
    price?: number;
    discountOnProduct?: number;
    discountType?: string;
    quantity?: number;
    taxAmount?: number;
    createdAt?: string;
    updatedAt?: string;
  }) {
    Object.assign(this, data);
  }

  static fromJson(json: any): Details {
    return new Details({
      id: json['id'],
      productId: json['product_id'],
      orderId: json['order_id'],
      price: parseFloat(json['price']),
      discountOnProduct: parseFloat(json['discount_on_product']),
      discountType: json['discount_type'],
      quantity: json['quantity'],
      taxAmount: parseFloat(json['tax_amount']),
      createdAt: json['created_at'],
      updatedAt: json['updated_at']
    });
  }
}

export class OrderPartialPayment {
  id?: number;
  orderId?: number;
  paidWith?: string;
  paidAmount?: number;
  dueAmount?: number;

  constructor(data: {
    id?: number;
    orderId?: number;
    paidWith?: string;
    paidAmount?: number;
    dueAmount?: number;
  }) {
    Object.assign(this, data);
  }

  static fromJson(str: string): OrderPartialPayment {
    const json = JSON.parse(str);
    return OrderPartialPayment.fromMap(json);
  }

  toJson(): string {
    return JSON.stringify(this.toMap());
  }

  static fromMap(json: any): OrderPartialPayment {
    return new OrderPartialPayment({
      id: json["id"],
      orderId: json["order_id"],
      paidWith: json["paid_with"],
      paidAmount: parseFloat(json["paid_amount"]),
      dueAmount: parseFloat(json["due_amount"]),
    });
  }

  toMap(): any {
    return {
      "id": this.id,
      "order_id": this.orderId,
      "paid_with": this.paidWith,
      "paid_amount": this.paidAmount,
      "due_amount": this.dueAmount,
    };
  }
}

export class OfflinePaymentInformation {
  paymentName?: string;
  paymentNote?: string;
  methodInformation?: MethodValue[];

  constructor(data: {
    paymentName?: string;
    paymentNote?: string;
    methodInformation?: MethodValue[];
  }) {
    Object.assign(this, data);
  }

  static fromJson(str: string): OfflinePaymentInformation {
    const json = JSON.parse(str);
    return OfflinePaymentInformation.fromMap(json);
  }

  static fromMap(json: any): OfflinePaymentInformation {
    return new OfflinePaymentInformation({
      paymentName: json["payment_name"],
      paymentNote: json["payment_note"],
      methodInformation: json["method_information"]
        ? json["method_information"].map((x: any) => MethodValue.fromMap(x))
        : [],
    });
  }
}

export class MethodValue {
  key?: string;
  value?: string;

  constructor(data: { key?: string; value?: string }) {
    Object.assign(this, data);
  }

  static fromMap(json: any): MethodValue {
    const firstKey = Object.keys(json)[0];
    return new MethodValue({
      key: firstKey,
      value: json[firstKey],
    });
  }
}

