import axios from 'axios';

import { Order } from '../models/order';

export async function verifyPayment(order: Order): Promise<{ status: string }> {
  const res = await axios.post(
    'http://setelpaymentservice:3001/api/v1/payments/verify',
    order,
  );

  return res.data;
}
