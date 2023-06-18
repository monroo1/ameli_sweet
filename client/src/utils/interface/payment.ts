export interface ResponseCreatePayment {
  id: string;
  status: string;
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  created_at: string;
  description: string;
  metadata: any;
  recipient: {
    account_id: string;
    gateway_id: string;
  };
  refundable: boolean;
  test: boolean;
}
