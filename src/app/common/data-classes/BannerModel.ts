export class BannerModel {
  id?: number;
  title?: string;
  image?: string;
  productId?: number;
  createdAt?: string;
  updatedAt?: string;
  categoryId?: number;

  constructor(
    id?: number,
    title?: string,
    image?: string,
    productId?: number,
    createdAt?: string,
    updatedAt?: string,
    categoryId?: number
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.productId = productId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.categoryId = categoryId;
  }

  static fromJson(json: { [key: string]: any }): BannerModel {
    return new BannerModel(
      json['id'],
      json['title'],
      json['image'],
      json['product_id'],
      json['created_at'],
      json['updated_at'],
      json['category_id']
    );
  }
}
