import React, { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const PaymentEsewa = forwardRef(({ amount = 0 }, ref) => {
  // Calculate fixed fields
  const transaction_uuid = uuidv4();
  const tax_amount = 10;
  const service_charge = 0;
  const delivery_charge = 0;
  
  // Calculate total
  const total_amount = parseFloat(amount) + tax_amount + service_charge + delivery_charge;
  const product_code = "EPAYTEST";

  // Message to hash
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  // Secret Key (should be kept safe)
  const secretKey = "8gBm/:&EnhH.1/q";
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return (
    <form
      className="hidden"
      ref={ref}
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input type="hidden" name="amount" value={amount} required />
      <input type="hidden" name="tax_amount" value={tax_amount} required />
      <input type="hidden" name="total_amount" value={total_amount} required />
      <input type="hidden" name="transaction_uuid" value={transaction_uuid} required />
      <input type="hidden" name="product_code" value={product_code} required />
      <input type="hidden" name="product_service_charge" value={service_charge} required />
      <input type="hidden" name="product_delivery_charge" value={delivery_charge} required />
      <input type="hidden" name="success_url" value="https://developer.esewa.com.np/success" required />
      <input type="hidden" name="failure_url" value="http://localhost:3000/orders/" required />
      <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
      <input type="hidden" name="signature" value={hashInBase64} required />
    </form>
  );
});

PaymentEsewa.displayName = "PaymentEsewa";

export default PaymentEsewa;
