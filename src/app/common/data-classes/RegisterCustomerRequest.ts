export interface RegisterCustomerRequest {
  userName: string
  email: string
  password: string
  phoneNumber: string
  referralCode: string | null
}
