export class MaintenanceMode {
  maintenanceStatus?: number;
  selectedMaintenanceSystem?: SelectedMaintenanceSystem;
  maintenanceMessages?: MaintenanceMessages;
  maintenanceTypeAndDuration?: MaintenanceTypeAndDuration;

  constructor(
    {
      maintenanceStatus,
      selectedMaintenanceSystem,
      maintenanceMessages,
      maintenanceTypeAndDuration,
    }: {
      maintenanceStatus?: number;
      selectedMaintenanceSystem?: SelectedMaintenanceSystem;
      maintenanceMessages?: MaintenanceMessages;
      maintenanceTypeAndDuration?: MaintenanceTypeAndDuration;
    }) {
    this.maintenanceStatus = maintenanceStatus;
    this.selectedMaintenanceSystem = selectedMaintenanceSystem;
    this.maintenanceMessages = maintenanceMessages;
    this.maintenanceTypeAndDuration = maintenanceTypeAndDuration;
  }

  static fromJson(json: any): MaintenanceMode {
    return new MaintenanceMode({
      maintenanceStatus: json['maintenance_status'],
      selectedMaintenanceSystem: json['selected_maintenance_system']
        ? SelectedMaintenanceSystem.fromJson(json['selected_maintenance_system'])
        : undefined,
      maintenanceMessages: json['maintenance_messages']
        ? MaintenanceMessages.fromJson(json['maintenance_messages'])
        : undefined,
      maintenanceTypeAndDuration: json['maintenance_type_and_duration']
        ? MaintenanceTypeAndDuration.fromJson(json['maintenance_type_and_duration'])
        : undefined,
    });
  }

  toJson(): any {
    const data: any = {};
    data['maintenance_status'] = this.maintenanceStatus;
    if (this.selectedMaintenanceSystem) {
      data['selected_maintenance_system'] = this.selectedMaintenanceSystem.toJson();
    }
    if (this.maintenanceMessages) {
      data['maintenance_messages'] = this.maintenanceMessages.toJson();
    }
    if (this.maintenanceTypeAndDuration) {
      data['maintenance_type_and_duration'] = this.maintenanceTypeAndDuration.toJson();
    }
    return data;
  }
}


export class SelectedMaintenanceSystem {
  branchPanel?: number;
  customerApp?: number;
  webApp?: number;
  deliverymanApp?: number;

  constructor(
    {
      branchPanel,
      customerApp,
      webApp,
      deliverymanApp,
    }: {
      branchPanel?: number;
      customerApp?: number;
      webApp?: number;
      deliverymanApp?: number;
    }) {
    this.branchPanel = branchPanel;
    this.customerApp = customerApp;
    this.webApp = webApp;
    this.deliverymanApp = deliverymanApp;
  }

  static fromJson(json: any): SelectedMaintenanceSystem {
    return new SelectedMaintenanceSystem({
      branchPanel: json['branch_panel'],
      customerApp: json['customer_app'],
      webApp: json['web_app'],
      deliverymanApp: json['deliveryman_app'],
    });
  }

  toJson(): any {
    const data: any = {};
    data['branch_panel'] = this.branchPanel;
    data['customer_app'] = this.customerApp;
    data['web_app'] = this.webApp;
    data['deliveryman_app'] = this.deliverymanApp;
    return data;
  }
}

export class MaintenanceMessages {
  businessNumber?: number;
  businessEmail?: number;
  maintenanceMessage?: string;
  messageBody?: string;

  constructor({
                businessNumber,
                businessEmail,
                maintenanceMessage,
                messageBody,
              }: {
    businessNumber?: number;
    businessEmail?: number;
    maintenanceMessage?: string;
    messageBody?: string;
  }) {
    this.businessNumber = businessNumber;
    this.businessEmail = businessEmail;
    this.maintenanceMessage = maintenanceMessage;
    this.messageBody = messageBody;
  }

  static fromJson(json: any): MaintenanceMessages {
    return new MaintenanceMessages({
      businessNumber: json['business_number'],
      businessEmail: json['business_email'],
      maintenanceMessage: json['maintenance_message'],
      messageBody: json['message_body'],
    });
  }

  toJson(): any {
    const data: any = {};
    data['business_number'] = this.businessNumber;
    data['business_email'] = this.businessEmail;
    data['maintenance_message'] = this.maintenanceMessage;
    data['message_body'] = this.messageBody;
    return data;
  }
}

export class MaintenanceTypeAndDuration {
  maintenanceDuration?: string;
  startDate?: string;
  endDate?: string;

  constructor(
    {
      maintenanceDuration,
      startDate,
      endDate,
    }: {
      maintenanceDuration?: string;
      startDate?: string;
      endDate?: string;
    }) {
    this.maintenanceDuration = maintenanceDuration;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  static fromJson(json: any): MaintenanceTypeAndDuration {
    return new MaintenanceTypeAndDuration({
      maintenanceDuration: json['maintenance_duration'],
      startDate: json['start_date'],
      endDate: json['end_date'],
    });
  }

  toJson(): any {
    const data: any = {};
    data['maintenance_duration'] = this.maintenanceDuration;
    data['start_date'] = this.startDate;
    data['end_date'] = this.endDate;
    return data;
  }
}
