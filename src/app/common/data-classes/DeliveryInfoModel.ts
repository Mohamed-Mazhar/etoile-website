export class DeliveryInfoModel {
  id?: number;
  name?: string;
  status?: number;
  deliveryChargeSetup?: DeliveryChargeSetup;
  deliveryChargeByArea?: DeliveryChargeByArea[];

  constructor(data?: Partial<DeliveryInfoModel>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.deliveryChargeSetup = data.deliveryChargeSetup ? new DeliveryChargeSetup(data.deliveryChargeSetup) : undefined;
      this.deliveryChargeByArea = data.deliveryChargeByArea
        ? data.deliveryChargeByArea.map(area => new DeliveryChargeByArea(area))
        : undefined;
    }
  }

  static fromJson(json: any): DeliveryInfoModel {
    return new DeliveryInfoModel({
      id: json['id'],
      name: json['name'],
      status: json['status'],
      deliveryChargeSetup: json['delivery_charge_setup']
        ? DeliveryChargeSetup.fromJson(json['delivery_charge_setup'])
        : undefined,
      deliveryChargeByArea: json['delivery_charge_by_area']
        ? json['delivery_charge_by_area'].map((area: any) => DeliveryChargeByArea.fromJson(area))
        : undefined,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      delivery_charge_setup: this.deliveryChargeSetup?.toJson(),
      delivery_charge_by_area: this.deliveryChargeByArea?.map(area => area.toJson()),
    };
  }
}

export class DeliveryChargeSetup {
  id?: number;
  branchId?: number;
  deliveryChargeType?: string;
  deliveryChargePerKilometer?: number;
  minimumDeliveryCharge?: number;
  minimumDistanceForFreeDelivery?: number;
  createdAt?: string;
  updatedAt?: string;
  fixedDeliveryCharge?: number;

  constructor(data?: Partial<DeliveryChargeSetup>) {
    if (data) {
      this.id = data.id;
      this.branchId = data.branchId;
      this.deliveryChargeType = data.deliveryChargeType;
      this.deliveryChargePerKilometer = data.deliveryChargePerKilometer;
      this.minimumDeliveryCharge = data.minimumDeliveryCharge;
      this.minimumDistanceForFreeDelivery = data.minimumDistanceForFreeDelivery;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.fixedDeliveryCharge = data.fixedDeliveryCharge;
    }
  }

  static fromJson(json: any): DeliveryChargeSetup {
    return new DeliveryChargeSetup({
      id: json['id'],
      branchId: json['branch_id'],
      deliveryChargeType: json['delivery_charge_type'],
      deliveryChargePerKilometer: parseFloat(json['delivery_charge_per_kilometer']),
      minimumDeliveryCharge: parseFloat(json['minimum_delivery_charge']),
      minimumDistanceForFreeDelivery: parseFloat(json['minimum_distance_for_free_delivery']),
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      fixedDeliveryCharge: parseFloat(json['fixedDeliveryCharge']),
    });
  }

  toJson(): any {
    return {
      id: this.id,
      branch_id: this.branchId,
      delivery_charge_type: this.deliveryChargeType,
      delivery_charge_per_kilometer: this.deliveryChargePerKilometer,
      minimum_delivery_charge: this.minimumDeliveryCharge,
      minimum_distance_for_free_delivery: this.minimumDistanceForFreeDelivery,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      fixedDeliveryCharge: this.fixedDeliveryCharge,
    };
  }
}

export class DeliveryChargeByArea {
  id?: number;
  branchId?: number;
  areaName?: string;
  deliveryCharge?: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(data?: Partial<DeliveryChargeByArea>) {
    if (data) {
      this.id = data.id;
      this.branchId = data.branchId;
      this.areaName = data.areaName;
      this.deliveryCharge = data.deliveryCharge;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }

  static fromJson(json: any): DeliveryChargeByArea {
    return new DeliveryChargeByArea({
      id: json['id'],
      branchId: json['branch_id'],
      areaName: json['area_name'],
      deliveryCharge: json['delivery_charge'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
    });
  }

  toJson(): any {
    return {
      id: this.id,
      branch_id: this.branchId,
      area_name: this.areaName,
      delivery_charge: this.deliveryCharge,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
