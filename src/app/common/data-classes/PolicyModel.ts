// To parse this JSON data, do:
//
//     const policyModel = PolicyModel.fromJson(jsonString);

export class PolicyModel {
  returnPage?: Pages;
  refundPage?: Pages;
  cancellationPage?: Pages;
  termsAndCondition?: string;
  privacyPolicy?: string;
  aboutUs?: string;

  constructor(data?: Partial<PolicyModel>) {
    if (data) {
      this.returnPage = data.returnPage ? Pages.fromJson(data.returnPage) : undefined;
      this.refundPage = data.refundPage ? Pages.fromJson(data.refundPage) : undefined;
      this.cancellationPage = data.cancellationPage ? Pages.fromJson(data.cancellationPage) : undefined;
      this.termsAndCondition = data.termsAndCondition;
      this.privacyPolicy = data.privacyPolicy;
      this.aboutUs = data.aboutUs;
    }
  }

  static fromJson(json: any): PolicyModel {
    return new PolicyModel({
      returnPage: json["return_page"] ? Pages.fromJson(json["return_page"]) : undefined,
      refundPage: json["refund_page"] ? Pages.fromJson(json["refund_page"]) : undefined,
      cancellationPage: json["cancellation_page"] ? Pages.fromJson(json["cancellation_page"]) : undefined,
      termsAndCondition: json["terms_and_conditions"],
      privacyPolicy: json["privacy_policy"],
      aboutUs: json["about_us"],
    });
  }

  toJson(): any {
    return {
      "return_page": this.returnPage ? this.returnPage.toJson() : undefined,
      "refund_page": this.refundPage ? this.refundPage.toJson() : undefined,
      "cancellation_page": this.cancellationPage ? this.cancellationPage.toJson() : undefined,
      "terms_and_conditions": this.termsAndCondition,
      "privacy_policy": this.privacyPolicy,
      "about_us": this.aboutUs,
    };
  }
}

export class Pages {
  status?: boolean;
  content?: string;

  constructor(data?: Partial<Pages>) {
    if (data) {
      this.status = data.status;
      this.content = data.content;
    }
  }

  static fromJson(json: any): Pages {
    let status: boolean | undefined;
    try {
      status = parseInt(json["status"], 10) === 1;
    } catch (e) {
      status = undefined;
    }

    return new Pages({
      status,
      content: json["content"],
    });
  }

  toJson(): any {
    return {
      "status": this.status,
      "content": this.content,
    };
  }
}
