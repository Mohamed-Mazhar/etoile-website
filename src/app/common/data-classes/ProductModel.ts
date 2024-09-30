export class ProductModel {
  totalSize?: number;
  limit?: number;
  offset?: number;
  productMaxPrice?: number;
  products?: Product[];

  constructor(totalSize?: number, limit?: number, offset?: number, products?: Product[], productMaxPrice?: number) {
    this.totalSize = totalSize;
    this.limit = limit;
    this.offset = offset;
    this.products = products;
    this.productMaxPrice = productMaxPrice;
  }

  static fromJson(json: { [key: string]: any }): ProductModel {
    const productModel = new ProductModel();
    productModel.totalSize = Number(json['total_size']);
    productModel.limit = Number(json['limit']);
    productModel.offset = Number(json['offset']);
    productModel.productMaxPrice = json['product_max_price'] ? parseFloat(json['product_max_price']) : undefined;

    if (json['products']) {
      productModel.products = json['products'].map((v: any) => Product.fromJson(v));
    }

    return productModel;
  }

  toJson(): any {
    const data: any = {};
    data['total_size'] = this.totalSize;
    data['limit'] = this.limit;
    data['offset'] = this.offset;
    data['product_max_price'] = this.productMaxPrice;
    if (this.products) {
      data['products'] = this.products.map(product => product.toJson());
    }
    return data;
  }
}

export class Product {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  variations?: Variation[];
  addOns?: AddOns[];
  tax?: number;
  availableTimeStarts?: string;
  availableTimeEnds?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  attributes?: string[];
  categoryIds?: CategoryId[];
  choiceOptions?: ChoiceOption[];
  discount?: number;
  discountType?: string;
  taxType?: string;
  setMenu?: number;
  rating?: Rating[];
  branchProduct?: BranchProduct;
  mainPrice?: number;
  isChanged?: boolean;
  changeReason?: string;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    image?: string,
    price?: number,
    variations?: Variation[],
    addOns?: AddOns[],
    tax?: number,
    availableTimeStarts?: string,
    availableTimeEnds?: string,
    branchProduct?: BranchProduct,
    rating?: Rating[],
    status?: number,
    createdAt?: string,
    updatedAt?: string,
    attributes?: string[],
    categoryIds?: CategoryId[],
    choiceOptions?: ChoiceOption[],
    discount?: number,
    discountType?: string,
    taxType?: string,
    setMenu?: number,
    mainPrice?: number,
    isChanged?: boolean,
    changeReason?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.variations = variations;
    this.addOns = addOns;
    this.tax = tax;
    this.availableTimeStarts = availableTimeStarts;
    this.availableTimeEnds = availableTimeEnds;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.attributes = attributes;
    this.categoryIds = categoryIds;
    this.choiceOptions = choiceOptions;
    this.discount = discount;
    this.discountType = discountType;
    this.taxType = taxType;
    this.setMenu = setMenu;
    this.rating = rating;
    this.branchProduct = branchProduct;
    this.mainPrice = mainPrice;
    this.isChanged = isChanged;
    this.changeReason = changeReason;
  }

  static fromJson(json: { [key: string]: any }): Product {
    const product = new Product();
    product.id = json['id'];
    product.name = json['name'];
    product.description = json['description'];
    product.image = json['image'];
    product.price = parseFloat(json['price']);
    product.tax = parseFloat(json['tax']);
    product.availableTimeStarts = json['available_time_starts'] || '';
    product.availableTimeEnds = json['available_time_ends'] || '';
    product.status = json['status'] || 0;
    product.createdAt = json['created_at'];
    product.updatedAt = json['updated_at'];
    product.attributes = json['attributes']?.map((attr: any) => String(attr));
    // if (json['variations']) {
    //   product.variations = json['variations'].map((v: any) => Variation.fromJson(v));
    // }
    if (json['add_ons']) {
      product.addOns = json['add_ons'].map((v: any) => AddOns.fromJson(v));
    }
    if (json['category_ids']) {
      product.categoryIds = json['category_ids'].map((v: any) => CategoryId.fromJson(v));
    }
    if (json['choice_options']) {
      product.choiceOptions = json['choice_options'].map((v: any) => ChoiceOption.fromJson(v));
    }
    product.discount = parseFloat(json['discount']);
    product.discountType = json['discount_type'];
    product.taxType = json['tax_type'];
    product.setMenu = json['set_menu'];
    if (json['rating']) {
      product.rating = json['rating'].map((v: any) => Rating.fromJson(v));
    }
    product.mainPrice = parseFloat(json['price']);
    product.branchProduct = json['branch_product'] ? BranchProduct.fromJson(json['branch_product']) : undefined;
    product.isChanged = json['is_changed'] === '1';
    product.changeReason = json['change_reason'];

    return product;
  }

  toJson(): any {
    const data: any = {};
    data['id'] = this.id;
    data['name'] = this.name;
    data['description'] = this.description;
    data['image'] = this.image;
    data['price'] = this.price;
    data['tax'] = this.tax;
    data['available_time_starts'] = this.availableTimeStarts;
    data['available_time_ends'] = this.availableTimeEnds;
    data['status'] = this.status;
    data['created_at'] = this.createdAt;
    data['updated_at'] = this.updatedAt;
    data['attributes'] = this.attributes;
    // if (this.variations) {
    //   data['variations'] = this.variations.map(v => v.toJson());
    // }
    if (this.addOns) {
      data['add_ons'] = this.addOns.map(v => v.toJson());
    }
    if (this.categoryIds) {
      data['category_ids'] = this.categoryIds.map(v => v.toJson());
    }
    if (this.choiceOptions) {
      data['choice_options'] = this.choiceOptions.map(v => v.toJson());
    }
    data['discount'] = this.discount;
    data['discount_type'] = this.discountType;
    data['tax_type'] = this.taxType;
    data['set_menu'] = this.setMenu;
    data['main_price'] = this.mainPrice;
    if (this.rating) {
      data['rating'] = this.rating.map(v => v.toJson());
    }
    data['branch_product'] = this.branchProduct ? this.branchProduct.toJson() : undefined;
    return data;
  }
}

interface Variation {
  // Define the properties of Variation here
}

export class BranchProduct {
  id?: number;
  productId?: number;
  branchId?: number;
  price?: number;
  isAvailable?: boolean;
  // variations?: Variation[];
  discount?: number;
  discountType?: string;
  stock?: number;
  soldQuantity?: number;
  stockType?: string;

  constructor(data?: Partial<BranchProduct>) {
    this.id = data?.id;
    this.productId = data?.productId;
    this.branchId = data?.branchId;
    this.price = data?.price;
    this.isAvailable = data?.isAvailable;
    // this.variations = data?.variations;
    this.discount = data?.discount;
    this.discountType = data?.discountType;
    this.stock = data?.stock;
    this.soldQuantity = data?.soldQuantity;
    this.stockType = data?.stockType;
  }

  static fromJson(json: any): BranchProduct {
    return new BranchProduct({
      id: json['id'],
      productId: json['product_id'],
      branchId: json['branch_id'],
      price: parseFloat(json['price']),
      isAvailable: json['is_available'] === '1' || json['is_available'] === 'true',
      // variations: json['variations']?.map((v: any) => {
      //   if (!v.hasOwnProperty('price')) {
      //     return Variation.fromJson(v); // Assuming Variation has a similar fromJson method
      //   }
      //   return null;
      // }).filter((v: any) => v !== null), // Filter out null values if variations don't have price
      discount: parseFloat(json['discount']),
      discountType: json['discount_type'],
      stock: json['stock'],
      soldQuantity: json['sold_quantity'],
      stockType: json['stock_type']
    });
  }

  toJson(): any {
    return {
      id: this.id,
      product_id: this.productId,
      branch_id: this.branchId,
      price: this.price,
      is_available: this.isAvailable,
      // variations: this.variations?.map(v => v.toJson()), // Assuming Variation has a toJson method
      discount: this.discount,
      discount_type: this.discountType,
      stock: this.stock,
      sold_quantity: this.soldQuantity,
      stock_type: this.stockType
    };
  }
}

export class AddOns {
  id?: number;
  name?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
  tax?: number; // percentage

  constructor(data?: Partial<AddOns>) {
    this.id = data?.id;
    this.name = data?.name;
    this.price = data?.price;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
    this.tax = data?.tax;
  }

  static fromJson(json: { [key: string]: any }): AddOns {
    return new AddOns({
      id: json['id'],
      name: json['name'],
      price: parseFloat(json['price']),
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      tax: parseFloat(json['tax']),
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      tax: this.tax,
    };
  }
}

export class CategoryId {
  id?: string;

  constructor(data?: Partial<CategoryId>) {
    this.id = data?.id;
  }

  static fromJson(json: { [key: string]: any }): CategoryId {
    return new CategoryId({
      id: json['id'].toString(),
    });
  }

  toJson(): any {
    return {
      id: this.id,
    };
  }
}


export class ChoiceOption {
  name?: string;
  title?: string;
  options?: string[];

  constructor(data?: Partial<ChoiceOption>) {
    this.name = data?.name;
    this.title = data?.title;
    this.options = data?.options;
  }

  static fromJson(json: any): ChoiceOption {
    return new ChoiceOption({
      name: json['name'],
      title: json['title'],
      options: json['options'] as string[],
    });
  }

  toJson(): any {
    return {
      name: this.name,
      title: this.title,
      options: this.options,
    };
  }
}

export class Rating {
  average?: number;
  productId?: number;

  constructor(data?: Partial<Rating>) {
    this.average = data?.average;
    this.productId = data?.productId;
  }

  static fromJson(json: any): Rating {
    return new Rating({
      average: parseFloat(json['average']),
      productId: json['product_id'],
    });
  }

  toJson(): any {
    return {
      average: this.average,
      product_id: this.productId,
    };
  }
}
