export interface MyFatoorahPaymentStatus {
  InvoiceId: number
  InvoiceStatus: string
  InvoiceReference: string
  InvoiceTransactions: InvoiceTransactions[]
}

export interface InvoiceTransactions {
  PaymentId: number
  TransactionStatus: string
}

export interface MyFatoorahPaymentStatusResponse {
  Data: MyFatoorahPaymentStatus
}
