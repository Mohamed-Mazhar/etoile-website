export class MyFatoorahPaymentMethod {
  paymentMethodId?: number
  paymentMethodAr?: string
  paymentMethodEn?: string
  paymentMethodCode?: string
  serviceCharge?: number
  totalAmount?: number
  currencyIso?: string
  imageUrl?: string
  paymentCurrencyIso?: string

  constructor(
    paymentMethodId?: number,
    paymentMethodAr?: string,
    paymentMethodEn?: string,
    paymentMethodCode?: string,
    serviceCharge?: number,
    totalAmount?: number,
    currencyIso?: string,
    imageUrl?: string,
    paymentCurrencyIso?: string,
  ) {
    this.paymentMethodId = paymentMethodId
    this.paymentMethodAr = paymentMethodAr
    this.paymentMethodEn = paymentMethodEn
    this.paymentMethodCode = paymentMethodCode
    this.serviceCharge = serviceCharge
    this.totalAmount = totalAmount
    this.currencyIso = currencyIso
    this.imageUrl = imageUrl
    this.paymentCurrencyIso = paymentCurrencyIso
  }

  static fromJson(json: { [key: string]: any }): MyFatoorahPaymentMethod {
    return new MyFatoorahPaymentMethod(
      json['PaymentMethodId'],
      json['PaymentMethodAr'],
      json['PaymentMethodEn'],
      json['PaymentMethodCode'],
      json['ServiceCharge'],
      json['TotalAmount'],
      json['CurrencyIso'],
      json['ImageUrl'],
      json['PaymentCurrencyIso']
    )
  }

}
