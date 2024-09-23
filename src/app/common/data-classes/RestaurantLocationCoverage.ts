export class RestaurantLocationCoverage {
  longitude?: string;
  latitude?: string;
  coverage?: number;

  constructor(
    {
      longitude,
      latitude,
      coverage,
    }: {
      longitude?: string;
      latitude?: string;
      coverage?: number;
    }) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.coverage = coverage;
  }

  static fromJson(json: any): RestaurantLocationCoverage {
    return new RestaurantLocationCoverage({
      longitude: json['longitude'],
      latitude: json['latitude'],
      coverage: json['coverage'] ? parseFloat(json['coverage']) : undefined,
    });
  }

  toJson(): any {
    const data: any = {};
    data['longitude'] = this.longitude;
    data['latitude'] = this.latitude;
    data['coverage'] = this.coverage;
    return data;
  }
}
