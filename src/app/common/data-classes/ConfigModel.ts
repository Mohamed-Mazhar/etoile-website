import {MaintenanceMode} from "./MaintenanceMode";
import {RestaurantLocationCoverage} from "./RestaurantLocationCoverage";
import {BaseUrls} from "./BaseUrls";

export class ConfigModel {
  public restaurantName?: string;
  public restaurantLogo?: string;
  public restaurantAddress?: string;
  public restaurantPhone?: string;
  public restaurantEmail?: string;
  public baseUrls?: BaseUrls;
  public currencySymbol?: string;
  public deliveryCharge?: number;
  public cashOnDelivery?: boolean;
  public digitalPayment?: boolean;
  public termsAndConditions?: string;
  public privacyPolicy?: string;
  public aboutUs?: string;
  public emailVerification?: boolean;
  public phoneVerification?: boolean;
  public currencySymbolPosition?: string;
  public maintenanceMode?: MaintenanceMode;
  public countryCode?: string;
  public selfPickup?: boolean;
  public homeDelivery?: boolean;
  public restaurantLocationCoverage?: RestaurantLocationCoverage;
  public minimumOrderValue?: number;
  public branches?: Branch[] | null;
  public deliveryManagement?: DeliveryManagement;
  public playStoreConfig?: PlayStoreConfig;
  public appStoreConfig?: AppStoreConfig;
  public socialMediaLink?: SocialMediaLink[];
  public softwareVersion?: string;
  public footerCopyright?: string;
  public timeZone?: string;
  public decimalPointSettings?: number;
  public restaurantScheduleTime?: RestaurantScheduleTime[];
  public scheduleOrderSlotDuration?: number;
  public timeFormat?: string;
  public socialLoginStatus?: SocialStatus;
  public loyaltyPointItemPurchasePoint?: number;
  public loyaltyPointStatus?: boolean;
  public loyaltyPointMinimumPoint?: number;
  public loyaltyPointExchangeRate?: number;
  public referEarningStatus?: boolean;
  public walletStatus?: boolean;
  public whatsapp?: Whatsapp;
  public cookiesManagement?: CookiesManagement;
  public otpResendTime?: number;
  public isVegNonVegActive?: boolean;
  public activePaymentMethodList?: PaymentMethod[];
  public isOfflinePayment?: boolean;
  public isGuestCheckout?: boolean;
  public isPartialPayment?: boolean;
  public isAddFundToWallet?: boolean;
  public partialPaymentCombineWith?: string;
  public digitalPaymentInfo?: DigitalPaymentInfo;
  public appleLogin?: AppleLogin;
  public isFirebaseOTPVerification?: boolean;
  public customerVerification?: CustomerVerification;
  public footerDescription?: string;
  public cutleryStatus?: boolean;

  constructor(
    restaurantName?: string,
    restaurantLogo?: string,
    restaurantAddress?: string,
    restaurantPhone?: string,
    restaurantEmail?: string,
    baseUrls?: BaseUrls,
    currencySymbol?: string,
    deliveryCharge?: number,
    cashOnDelivery?: boolean,
    digitalPayment?: boolean,
    termsAndConditions?: string,
    privacyPolicy?: string,
    aboutUs?: string,
    emailVerification?: boolean,
    phoneVerification?: boolean,
    currencySymbolPosition?: string,
    maintenanceMode?: MaintenanceMode,
    countryCode?: string,
    selfPickup?: boolean,
    homeDelivery?: boolean,
    restaurantLocationCoverage?: RestaurantLocationCoverage,
    minimumOrderValue?: number,
    branches?: Branch[] | null,
    deliveryManagement?: DeliveryManagement,
    playStoreConfig?: PlayStoreConfig,
    appStoreConfig?: AppStoreConfig,
    socialMediaLink?: SocialMediaLink[],
    softwareVersion?: string,
    footerCopyright?: string,
    timeZone?: string,
    decimalPointSettings?: number,
    restaurantScheduleTime?: RestaurantScheduleTime[],
    scheduleOrderSlotDuration?: number,
    timeFormat?: string,
    socialLoginStatus?: SocialStatus,
    loyaltyPointItemPurchasePoint?: number,
    loyaltyPointStatus?: boolean,
    loyaltyPointMinimumPoint?: number,
    loyaltyPointExchangeRate?: number,
    referEarningStatus?: boolean,
    walletStatus?: boolean,
    whatsapp?: Whatsapp,
    cookiesManagement?: CookiesManagement,
    otpResendTime?: number,
    isVegNonVegActive?: boolean,
    activePaymentMethodList?: PaymentMethod[],
    isOfflinePayment?: boolean,
    isGuestCheckout?: boolean,
    isPartialPayment?: boolean,
    isAddFundToWallet?: boolean,
    partialPaymentCombineWith?: string,
    digitalPaymentInfo?: DigitalPaymentInfo,
    appleLogin?: AppleLogin,
    isFirebaseOTPVerification?: boolean,
    customerVerification?: CustomerVerification,
    footerDescription?: string,
    cutleryStatus?: boolean
  ) {
    this.restaurantName = restaurantName;
    this.restaurantLogo = restaurantLogo;
    this.restaurantAddress = restaurantAddress;
    this.restaurantPhone = restaurantPhone;
    this.restaurantEmail = restaurantEmail;
    this.baseUrls = baseUrls;
    this.currencySymbol = currencySymbol;
    this.deliveryCharge = deliveryCharge;
    this.cashOnDelivery = cashOnDelivery;
    this.digitalPayment = digitalPayment;
    this.termsAndConditions = termsAndConditions;
    this.privacyPolicy = privacyPolicy;
    this.aboutUs = aboutUs;
    this.emailVerification = emailVerification;
    this.phoneVerification = phoneVerification;
    this.currencySymbolPosition = currencySymbolPosition;
    this.maintenanceMode = maintenanceMode;
    this.countryCode = countryCode;
    this.selfPickup = selfPickup;
    this.homeDelivery = homeDelivery;
    this.restaurantLocationCoverage = restaurantLocationCoverage;
    this.minimumOrderValue = minimumOrderValue;
    this.branches = branches;
    this.deliveryManagement = deliveryManagement;
    this.playStoreConfig = playStoreConfig;
    this.appStoreConfig = appStoreConfig;
    this.socialMediaLink = socialMediaLink;
    this.softwareVersion = softwareVersion;
    this.footerCopyright = footerCopyright;
    this.timeZone = timeZone;
    this.decimalPointSettings = decimalPointSettings;
    this.restaurantScheduleTime = restaurantScheduleTime;
    this.scheduleOrderSlotDuration = scheduleOrderSlotDuration;
    this.timeFormat = timeFormat;
    this.socialLoginStatus = socialLoginStatus;
    this.loyaltyPointItemPurchasePoint = loyaltyPointItemPurchasePoint;
    this.loyaltyPointStatus = loyaltyPointStatus;
    this.loyaltyPointMinimumPoint = loyaltyPointMinimumPoint;
    this.loyaltyPointExchangeRate = loyaltyPointExchangeRate;
    this.referEarningStatus = referEarningStatus;
    this.walletStatus = walletStatus;
    this.whatsapp = whatsapp;
    this.cookiesManagement = cookiesManagement;
    this.otpResendTime = otpResendTime;
    this.isVegNonVegActive = isVegNonVegActive;
    this.activePaymentMethodList = activePaymentMethodList;
    this.isOfflinePayment = isOfflinePayment;
    this.isGuestCheckout = isGuestCheckout;
    this.isPartialPayment = isPartialPayment;
    this.isAddFundToWallet = isAddFundToWallet;
    this.partialPaymentCombineWith = partialPaymentCombineWith;
    this.digitalPaymentInfo = digitalPaymentInfo;
    this.appleLogin = appleLogin;
    this.isFirebaseOTPVerification = isFirebaseOTPVerification;
    this.customerVerification = customerVerification;
    this.footerDescription = footerDescription;
    this.cutleryStatus = cutleryStatus;
  }

  static fromJson(json: { [key: string]: any }): ConfigModel {
    return new ConfigModel(
      json['restaurant_name'],
      json['restaurant_logo'],
      json['restaurant_address'],
      json['restaurant_phone'],
      json['restaurant_email'],
      json['base_urls'] ? BaseUrls.fromJson(json['base_urls']) : undefined,
      json['currency_symbol'],
      json['delivery_charge'],
      json['cash_on_delivery'],
      json['digital_payment'],
      json['terms_and_conditions'],
      json['privacy_policy'],
      json['about_us'],
      json['email_verification'],
      json['phone_verification'],
      json['currency_symbol_position'],
      json['maintenance_mode'] ? MaintenanceMode.fromJson(json['maintenance_mode']) : undefined,
      json['country_code'],
      json['self_pickup'],
      json['home_delivery'],
      json['restaurant_location_coverage']
        ? RestaurantLocationCoverage.fromJson(json['restaurant_location_coverage'])
        : undefined,
      json['minimum_order_value'],
      json['branches'] ? json['branches'].map((branch: any) => branch ? Branch.fromJson(branch) : null) : undefined,
      json['delivery_management'] ? DeliveryManagement.fromJson(json['delivery_management']) : undefined,
      json['play_store_config'] ? PlayStoreConfig.fromJson(json['play_store_config']) : undefined,
      json['app_store_config'] ? AppStoreConfig.fromJson(json['app_store_config']) : undefined,
      json['social_media_link'] ? json['social_media_link'].map((link: any) => SocialMediaLink.fromJson(link)) : undefined,
      json['software_version'],
      json['footer_copyright'],
      json['time_zone'],
      json['decimal_point_settings'],
      json['restaurant_schedule_time']
        ? json['restaurant_schedule_time'].map((time: any) => RestaurantScheduleTime.fromJson(time))
        : undefined,
      json['schedule_order_slot_duration'],
      json['time_format'],
      json['social_login_status'] ? SocialStatus.fromJson(json['social_login_status']) : undefined,
      json['loyalty_point_item_purchase_point'],
      json['loyalty_point_status'],
      json['loyalty_point_minimum_point'],
      json['loyalty_point_exchange_rate'],
      json['refer_earning_status'],
      json['wallet_status'],
      json['whatsapp'] ? Whatsapp.fromJson(json['whatsapp']) : undefined,
      json['cookies_management'] ? CookiesManagement.fromJson(json['cookies_management']) : undefined,
      json['otp_resend_time'],
      json['is_veg_non_veg_active'],
      json['active_payment_method_list']
        ? json['active_payment_method_list'].map((method: any) => PaymentMethod.fromJson(method))
        : undefined,
      json['is_offline_payment'],
      json['is_guest_checkout'],
      json['is_partial_payment'],
      json['is_add_fund_to_wallet'],
      json['partial_payment_combine_with'],
      json['digital_payment_info'] ? DigitalPaymentInfo.fromJson(json['digital_payment_info']) : undefined,
      json['apple_login'] ? AppleLogin.fromJson(json['apple_login']) : undefined,
      json['is_firebase_otp_verification'],
      json['customer_verification'] ? CustomerVerification.fromJson(json['customer_verification']) : undefined,
      json['footer_description'],
      json['cutlery_status']
    );
  }

}


export class Branch {
  id?: number;
  name?: string;
  email?: string;
  longitude?: string;
  latitude?: string;
  address?: string;
  coverage?: number;
  coverImage?: string;
  image?: string;
  status?: boolean;
  preparationTime?: number;

  constructor(
    id?: number,
    name?: string,
    email?: string,
    longitude?: string,
    latitude?: string,
    address?: string,
    coverage?: number,
    coverImage?: string,
    image?: string,
    status?: boolean,
    preparationTime?: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.longitude = longitude;
    this.latitude = latitude;
    this.address = address;
    this.coverage = coverage;
    this.coverImage = coverImage;
    this.image = image;
    this.status = status;
    this.preparationTime = preparationTime;
  }

  static fromJson(json: { [key: string]: any }): Branch {
    return new Branch(
      json['id'],
      json['name'],
      json['email'],
      json['longitude'],
      json['latitude'],
      json['address'],
      parseFloat(json['coverage']),
      json['cover_image'],
      json['image'],
      json['status'] === '1',
      json['preparation_time']
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      longitude: this.longitude,
      latitude: this.latitude,
      address: this.address,
      coverage: this.coverage,
      cover_image: this.coverImage,
      image: this.image,
      status: this.status,
      preparation_time: this.preparationTime
    };
  }
}

export class DeliveryManagement {
  status?: number;
  minShippingCharge?: number;
  shippingPerKm?: number;

  constructor(data: Partial<DeliveryManagement> = {}) {
    this.status = data.status;
    this.minShippingCharge = data.minShippingCharge;
    this.shippingPerKm = data.shippingPerKm;
  }

  static fromJson(json: { [key: string]: any }): DeliveryManagement {
    return new DeliveryManagement({
        status: json['status'],
        minShippingCharge: parseFloat(json['min_shipping_charge']),
        shippingPerKm: parseFloat(json['shipping_per_km'])
      }
    )
  }

  toJson(): any {
    return {
      status: this.status,
      min_shipping_charge: this.minShippingCharge,
      shipping_per_km: this.shippingPerKm
    };
  }
}

export class PlayStoreConfig {
  status?: boolean;
  link?: string;
  minVersion?: number;

  constructor(status?: boolean, link?: string, minVersion?: number) {
    this.status = status;
    this.link = link;
    this.minVersion = minVersion;
  }

  static fromJson(json: { [key: string]: any }): PlayStoreConfig {
    return new PlayStoreConfig(
      json['status'],
      json['link'],
      json['min_version'] ? parseFloat(json['min_version']) : undefined
    );
  }

  toJson(): any {
    return {
      status: this.status,
      link: this.link,
      min_version: this.minVersion
    };
  }
}

export class AppStoreConfig {
  status?: boolean;
  link?: string;
  minVersion?: number;

  constructor(status?: boolean, link?: string, minVersion?: number) {
    this.status = status;
    this.link = link;
    this.minVersion = minVersion;
  }

  static fromJson(json: { [key: string]: any }): AppStoreConfig {
    return new AppStoreConfig(
      json['status'],
      json['link'],
      json['min_version'] ? parseFloat(json['min_version']) : undefined
    );
  }

  toJson(): any {
    return {
      status: this.status,
      link: this.link,
      min_version: this.minVersion
    };
  }
}

export class SocialMediaLink {
  id?: number;
  name?: string;
  link?: string;
  status?: number;
  updatedAt?: string;

  constructor(id?: number, name?: string, link?: string, status?: number, updatedAt?: string) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.status = status;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: { [key: string]: any }): SocialMediaLink {
    return new SocialMediaLink(
      json['id'],
      json['name'],
      json['link'],
      json['status'],
      json['updated_at']
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      link: this.link,
      status: this.status,
      updated_at: this.updatedAt
    };
  }
}

export class RestaurantScheduleTime {
  day?: string;
  openingTime?: string;
  closingTime?: string;

  constructor(day?: string, openingTime?: string, closingTime?: string) {
    this.day = day;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
  }

  static fromJson(json: { [key: string]: any }): RestaurantScheduleTime {
    return new RestaurantScheduleTime(
      json['day'].toString(),
      json['opening_time'].toString(),
      json['closing_time'].toString()
    );
  }

  toJson(): any {
    return {
      day: this.day,
      opening_time: this.openingTime,
      closing_time: this.closingTime
    };
  }
}

export class SocialStatus {
  isGoogle?: boolean;
  isFacebook?: boolean;

  constructor(isGoogle?: boolean, isFacebook?: boolean) {
    this.isGoogle = isGoogle;
    this.isFacebook = isFacebook;
  }

  static fromJson(json: { [key: string]: any }): SocialStatus {
    return new SocialStatus(
      json['google'] === '1',
      json['facebook'] === '1'
    );
  }

  toJson(): any {
    return {
      google: this.isGoogle,
      facebook: this.isFacebook
    };
  }
}

export class Whatsapp {
  status?: boolean;
  number?: string;

  constructor(status?: boolean, number?: string) {
    this.status = status;
    this.number = number;
  }

  static fromJson(json: { [key: string]: any }): Whatsapp {
    return new Whatsapp(
      json['status'] === '1',
      json['number']
    );
  }

  toJson(): any {
    return {
      status: this.status,
      number: this.number
    };
  }
}

export class AppleLogin {
  status?: boolean;
  medium?: string;
  clientId?: string;

  constructor(status?: boolean, medium?: string, clientId?: string) {
    this.status = status;
    this.medium = medium;
    this.clientId = clientId;
  }

  static fromJson(json: { [key: string]: any }): AppleLogin {
    return new AppleLogin(
      json['status'] === '1',
      json['login_medium'],
      json['client_id']
    );
  }

  toJson(): any {
    return {
      status: this.status,
      login_medium: this.medium,
      client_id: this.clientId
    };
  }
}

export class CookiesManagement {
  status?: boolean;
  content?: string;

  constructor(status?: boolean, content?: string) {
    this.status = status;
    this.content = content;
  }

  static fromJson(json: { [key: string]: any }): CookiesManagement {
    return new CookiesManagement(
      `${json['status']}`.includes('1'),
      json['text']
    );
  }

  toJson(): any {
    return {
      status: this.status,
      text: this.content
    };
  }
}

export class PaymentMethod {
  getWay?: string;
  getWayTitle?: string;
  getWayImage?: string;
  type?: string;

  constructor(getWay?: string, getWayTitle?: string, getWayImage?: string, type?: string) {
    this.getWay = getWay;
    this.getWayTitle = getWayTitle;
    this.getWayImage = getWayImage;
    this.type = type;
  }

  copyWith(type: string): PaymentMethod {
    this.type = type;
    return this;
  }

  static fromJson(json: { [key: string]: any }): PaymentMethod {
    return new PaymentMethod(
      json['gateway'],
      json['gateway_title'],
      json['gateway_image']
    );
  }

  toJson(): any {
    return {
      gateway: this.getWay,
      gateway_title: this.getWayTitle,
      gateway_image: this.getWayImage
    };
  }
}

export class DigitalPaymentInfo {
  digitalPayment?: boolean;
  pluginPaymentGateways?: boolean;
  defaultPaymentGateways?: boolean;

  constructor(digitalPayment?: boolean, pluginPaymentGateways?: boolean, defaultPaymentGateways?: boolean) {
    this.digitalPayment = digitalPayment;
    this.pluginPaymentGateways = pluginPaymentGateways;
    this.defaultPaymentGateways = defaultPaymentGateways;
  }

  static fromJson(json: { [key: string]: any }): DigitalPaymentInfo {
    return new DigitalPaymentInfo(
      `${json['digital_payment']}`.includes('true'),
      `${json['plugin_payment_gateways']}`.includes('true'),
      `${json['default_payment_gateways']}`.includes('true')
    );
  }

  toJson(): any {
    return {
      digital_payment: this.digitalPayment,
      plugin_payment_gateways: this.pluginPaymentGateways,
      default_payment_gateways: this.defaultPaymentGateways
    };
  }
}

export class CustomerVerification {
  status?: boolean;
  type?: string;

  constructor(status?: boolean, type?: string) {
    this.status = status;
    this.type = type;
  }

  static fromJson(json: { [key: string]: any }): CustomerVerification {
    return new CustomerVerification(
      `${json['status']}` === '1',
      json['type']
    );
  }

  toJson(): any {
    return {
      status: this.status,
      type: this.type
    };
  }
}
