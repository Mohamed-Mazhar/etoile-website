export class UserInfo {
  id: number | null
  fName: string | null
  lName: string | null
  email: string | null
  image: string | null
  isPhoneVerified: number | null
  emailVerifiedAt: string | null
  createdAt: string | null
  updatedAt: string | null
  emailVerificationToken: string | null
  phone: string | null
  cmFirebaseToken: string | null
  point: number | null
  loginMedium: string | null
  referCode: string | null
  walletBalance: number | null
  ordersCount: number | null
  wishListCount: number | null

  constructor(data: Partial<UserInfo> = {}) {
    this.id = data.id ?? null
    this.fName = data.fName ?? null
    this.lName = data.lName ?? null
    this.email = data.email ?? null
    this.image = data.image ?? null
    this.isPhoneVerified = data.isPhoneVerified ?? null
    this.emailVerifiedAt = data.emailVerifiedAt ?? null
    this.createdAt = data.createdAt ?? null
    this.updatedAt = data.updatedAt ?? null
    this.emailVerificationToken = data.emailVerificationToken ?? null
    this.phone = data.phone ?? null
    this.cmFirebaseToken = data.cmFirebaseToken ?? null
    this.point = data.point ?? null
    this.loginMedium = data.loginMedium ?? null
    this.referCode = data.referCode ?? null
    this.walletBalance = data.walletBalance ?? null
    this.ordersCount = data.ordersCount ?? null
    this.wishListCount = data.wishListCount ?? null
  }

  static fromJson(json: { [key: string]: any }): UserInfo {
    return new UserInfo({
      id: json['id'] ?? null,
      fName: json['f_name'] ?? null,
      lName: json['l_name'] ?? null,
      email: json['email'] ?? null,
      image: json['image'] ?? null,
      isPhoneVerified: json['is_phone_verified'] ?? null,
      emailVerifiedAt: json['email_verified_at'] ?? null,
      createdAt: json['created_at'] ?? null,
      updatedAt: json['updated_at'] ?? null,
      emailVerificationToken: json['email_verification_token'] ?? null,
      phone: json['phone'] ?? null,
      cmFirebaseToken: json['cm_firebase_token'] ?? null,
      point: json['point'] ? parseFloat(json['point']) : null,
      loginMedium: json['login_medium'] ? `${json['login_medium']}` : null,
      referCode: json['refer_code'] ?? null,
      walletBalance: json['wallet_balance'] ? parseFloat(json['wallet_balance']) : null,
      ordersCount: json['orders_count'] ?? null,
      wishListCount: json['wishlist_count'] ?? null,
    })
  }

  toJson(): { [key: string]: any } {
    return {
      id: this.id,
      f_name: this.fName,
      l_name: this.lName,
      email: this.email,
      image: this.image,
      is_phone_verified: this.isPhoneVerified,
      email_verified_at: this.emailVerifiedAt,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      email_verification_token: this.emailVerificationToken,
      phone: this.phone,
      cm_firebase_token: this.cmFirebaseToken,
      point: this.point,
      login_medium: this.loginMedium,
      refer_code: this.referCode,
      wallet_balance: this.walletBalance,
      orders_count: this.ordersCount,
      wishlist_count: this.wishListCount,
    }
  }
}
