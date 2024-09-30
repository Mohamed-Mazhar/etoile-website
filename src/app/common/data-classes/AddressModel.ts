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
    data:
      {
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
      }
  ) {
    this.id = data.id;
    this.addressType = data.addressType;
    this.contactPersonNumber = data.contactPersonNumber;
    this.address = data.address;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;
    this.method = data.method;
    this.contactPersonName = data.contactPersonName;
    this.streetNumber = data.streetNumber;
    this.floorNumber = data.floorNumber;
    this.houseNumber = data.houseNumber;
    this.isDefault = data.isDefault;
  }

  static fromJson(json: { [key: string]: any }): AddressModel {
    return new AddressModel(
      {
        id: json['id'],
        addressType: json['address_type'],
        contactPersonNumber: json['contact_person_number'],
        address: json['address'],
        latitude: json['latitude'],
        longitude: json['longitude'],
        createdAt: json['created_at'],
        updatedAt: json['updated_at'],
        userId: json['user_id'],
        method: json['method'],
        contactPersonName: json['contact_person_name'],
        streetNumber: json['road'],
        floorNumber: json['floor'],
        houseNumber: json['house'],
        isDefault: `${json['is_default']}`.includes('1')
  },
    );
  }

  toJson(): { [key: string]: any } {
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
