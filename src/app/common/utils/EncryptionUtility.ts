import * as CryptoJS from 'crypto-js';

export function generateSignature(
  merchantPublicKey: string,
  orderAmount: number,
  orderCurrency: string,
  orderMerchantReferenceId: string,
  apiPassword: string,
  timestamp: string
): string {
  // Format amount to 2 decimal places with dot separator
  const amountStr = orderAmount.toFixed(2); // equivalent to number_format in PHP

  const data = `${merchantPublicKey}${amountStr}${orderCurrency}${orderMerchantReferenceId}${timestamp}`;

  const hash = CryptoJS.HmacSHA256(data, apiPassword);
  return CryptoJS.enc.Base64.stringify(hash);
}
