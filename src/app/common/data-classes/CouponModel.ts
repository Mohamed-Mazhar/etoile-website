export class CouponModel {
  id?: number;
  title?: string;
  code?: string;
  startDate?: string;
  expireDate?: string;
  minPurchase?: number;
  maxDiscount?: number;
  discount?: number;
  discountType?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    id?: number,
    title?: string,
    code?: string,
    startDate?: string,
    expireDate?: string,
    minPurchase?: number,
    maxDiscount?: number,
    discount?: number,
    discountType?: string,
    status?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.startDate = startDate;
    this.expireDate = expireDate;
    this.minPurchase = minPurchase;
    this.maxDiscount = maxDiscount;
    this.discount = discount;
    this.discountType = discountType;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: { [key: string]: any }): CouponModel {
    return new CouponModel(
      json['id'],
      json['title'],
      json['code'],
      json['start_date'],
      json['expire_date'],
      json['min_purchase'] ? parseFloat(json['min_purchase']) : undefined,
      json['max_discount'] ? parseFloat(json['max_discount']) : undefined,
      json['discount'] ? parseFloat(json['discount']) : undefined,
      json['discount_type'],
      json['status'],
      json['created_at'],
      json['updated_at']
    );
  }
}
