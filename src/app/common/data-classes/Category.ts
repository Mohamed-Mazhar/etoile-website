export class Category {
  id?: number
  name?: string
  parentId?: number
  position?: number
  status?: number
  createdAt?: string
  updatedAt?: string
  image?: string
  bannerImage?: string
  subCategories?: Category[]

  constructor(
    id?: number,
    name?: string,
    parentId?: number,
    position?: number,
    status?: number,
    createdAt?: string,
    updatedAt?: string,
    image?: string,
    bannerImage?: string,
    subCategories?: Category[]
  ) {
    this.id = id
    this.name = name
    this.parentId = parentId
    this.position = position
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.image = image
    this.bannerImage = bannerImage
    this.subCategories = subCategories
  }

  static fromJson(json: { [key: string]: any }): Category {
    return new Category(
      json['id'] ?? 0,
      json['name'] ?? '',
      json['parent_id'] ?? 0,
      json['position'] ?? 0,
      json['status'] ?? 0,
      json['created_at'],
      json['updated_at'],
      json['image'] ?? '',
      json['banner_image'] ?? '',
      []
    )
  }

  toJson(): { [key: string]: any } {
    return {
      id: this.id,
      name: this.name,
      parent_id: this.parentId,
      position: this.position,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      image: this.image,
      banner_image: this.bannerImage
    }
  }
}
