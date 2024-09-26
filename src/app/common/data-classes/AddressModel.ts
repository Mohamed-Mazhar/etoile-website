export class AddressModel {
  id?: number;
  addressType?: string;
  contactPersonNumber?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
  method?: string;
  contactPersonName?: string;
  streetNumber?: string;
  floorNumber?: string;
  houseNumber?: string;
  isDefault?: boolean;

  constructor(
    id?: number,
    addressType?: string,
    contactPersonNumber?: string,
    address?: string,
    latitude?: string,
    longitude?: string,
    createdAt?: string,
    updatedAt?: string,
    userId?: number,
    method?: string,
    contactPersonName?: string,
    streetNumber?: string,
    floorNumber?: string,
    houseNumber?: string,
    isDefault?: boolean,
  ) {
    this.id = id;
    this.addressType = addressType;
    this.contactPersonNumber = contactPersonNumber;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.method = method;
    this.contactPersonName = contactPersonName;
    this.streetNumber = streetNumber;
    this.floorNumber = floorNumber;
    this.houseNumber = houseNumber;
    this.isDefault = isDefault;
  }

  static fromJson(json: any): AddressModel {
    return new AddressModel(
      json['id'],
      json['address_type'],
      json['contact_person_number'],
      json['address'],
      json['latitude'],
      json['longitude'],
      json['created_at'],
      json['updated_at'],
      json['user_id'],
      json['_method'],
      json['contact_person_name'],
      json['road'],
      json['floor'],
      json['house'],
      `${json['is_default']}`.includes('1'),
    );
  }

  toJson(): any {
    return {
      id: this.id,
      address_type: this.addressType,
      contact_person_number: this.contactPersonNumber,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      user_id: this.userId,
      _method: this.method,
      contact_person_name: this.contactPersonName,
      road: this.streetNumber,
      floor: this.floorNumber,
      house: this.houseNumber,
      is_default: this.isDefault ? 1 : 0,
    };
  }
}
