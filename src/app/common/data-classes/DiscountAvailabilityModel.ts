export class DiscountAvailabilityModel {
  type?: string;
  value?: number;
  discountId?: number;
  applicableAmount?: number;
  status?: string;

  constructor({
                type,
                value,
                discountId,
                applicableAmount,
                status,
              }: {
    type?: string;
    value?: number;
    discountId?: number;
    applicableAmount?: number;
    status?: string;
  }) {
    this.type = type;
    this.value = value;
    this.discountId = discountId;
    this.applicableAmount = applicableAmount;
    this.status = status;
  }

  static fromJson(json: { [key: string]: any }): DiscountAvailabilityModel {
    return new DiscountAvailabilityModel({
      type: json['type'],
      value: typeof json['value'] === 'number' ? json['value'] : parseFloat(json['value']),
      discountId: typeof json['discount_id'] === 'number' ? json['discount_id'] : parseFloat(json['discount_id']),
      applicableAmount: typeof json['applicable_amount'] === 'number' ? json['applicable_amount'] : parseFloat(json['applicable_amount']),
      status: json['status']
    });
  }
}
