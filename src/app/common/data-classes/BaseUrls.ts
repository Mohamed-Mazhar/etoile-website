export class BaseUrls {
  productImageUrl?: string;
  customerImageUrl?: string;
  bannerImageUrl?: string;
  categoryImageUrl?: string;
  categoryBannerImageUrl?: string;
  reviewImageUrl?: string;
  notificationImageUrl?: string;
  restaurantImageUrl?: string;
  deliveryManImageUrl?: string;
  chatImageUrl?: string;
  branchImageUrl?: string;
  getWayImageUrl?: string;
  cardImageUrl?: string;

  constructor(
    {
      productImageUrl,
      customerImageUrl,
      bannerImageUrl,
      categoryImageUrl,
      categoryBannerImageUrl,
      reviewImageUrl,
      notificationImageUrl,
      restaurantImageUrl,
      deliveryManImageUrl,
      chatImageUrl,
      branchImageUrl,
      getWayImageUrl,
      cardImageUrl,
    }: {
      productImageUrl?: string;
      customerImageUrl?: string;
      bannerImageUrl?: string;
      categoryImageUrl?: string;
      categoryBannerImageUrl?: string;
      reviewImageUrl?: string;
      notificationImageUrl?: string;
      restaurantImageUrl?: string;
      deliveryManImageUrl?: string;
      chatImageUrl?: string;
      branchImageUrl?: string;
      getWayImageUrl?: string;
      cardImageUrl?: string;
    }) {
    this.productImageUrl = productImageUrl;
    this.customerImageUrl = customerImageUrl;
    this.bannerImageUrl = bannerImageUrl;
    this.categoryImageUrl = categoryImageUrl;
    this.categoryBannerImageUrl = categoryBannerImageUrl;
    this.reviewImageUrl = reviewImageUrl;
    this.notificationImageUrl = notificationImageUrl;
    this.restaurantImageUrl = restaurantImageUrl;
    this.deliveryManImageUrl = deliveryManImageUrl;
    this.chatImageUrl = chatImageUrl;
    this.branchImageUrl = branchImageUrl;
    this.getWayImageUrl = getWayImageUrl;
    this.cardImageUrl = cardImageUrl;
  }

  static fromJson(json: { [key: string]: any }): BaseUrls {
    return new BaseUrls({
      productImageUrl: json['product_image_url'] || '',
      customerImageUrl: json['customer_image_url'] || '',
      bannerImageUrl: json['banner_image_url'] || '',
      categoryImageUrl: json['category_image_url'] || '',
      categoryBannerImageUrl: json['category_banner_image_url'],
      reviewImageUrl: json['review_image_url'] || '',
      notificationImageUrl: json['notification_image_url'],
      restaurantImageUrl: json['restaurant_image_url'] || '',
      deliveryManImageUrl: json['delivery_man_image_url'] || '',
      chatImageUrl: json['chat_image_url'] || '',
      branchImageUrl: json['branch_image_url'] || '',
      getWayImageUrl: json['gateway_image_url'] || '',
      cardImageUrl: json['card_image_url'] || '',
    });
  }

  toJson(): { [key: string]: any } {
    return {
      product_image_url: this.productImageUrl,
      customer_image_url: this.customerImageUrl,
      banner_image_url: this.bannerImageUrl,
      category_image_url: this.categoryImageUrl,
      category_banner_image_url: this.categoryBannerImageUrl,
      review_image_url: this.reviewImageUrl,
      notification_image_url: this.notificationImageUrl,
      restaurant_image_url: this.restaurantImageUrl,
      delivery_man_image_url: this.deliveryManImageUrl,
      chat_image_url: this.chatImageUrl,
      branch_image_url: this.branchImageUrl,
      gateway_image_url: this.getWayImageUrl,
      card_image_url: this.cardImageUrl,
    };
  }
}
