import api from "@/lib/axios";

export interface ISubscription {
  id: string;
  organizationId: string;
  plan: "FREE" | "PRO";
  status: "ACTIVE" | "EXPIRED";
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ISubscriptionResponse {
  success: boolean;
  message: string;
  data: ISubscription;
}

export interface ICreateCheckoutResponse {
  success: boolean;
  message: string;
  data: {
    paymentId: string;
    checkoutUrl: string;
  };
}

export interface IPayment {
  id: string;
  organizationId: string;
  userId: string;
  amount: string;
  currency: string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  provider: "STRIPE";
  transactionId: string | null;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentsResponse {
  success: boolean;
  message: string;
  data: {
    data: IPayment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export const subscriptionService = {
  getSubscription: async (
    organizationId: string,
  ): Promise<ISubscriptionResponse> => {
    const response =
      await api.get<ISubscriptionResponse>(
        `/organizations/${organizationId}/subscription`,
      );

    return response.data;
  },

  createCheckout: async (
  organizationId: string,
): Promise<ICreateCheckoutResponse> => {
  const response =
    await api.post<ICreateCheckoutResponse>(
      `/organizations/${organizationId}/payments`,
    );

  return response.data;
},

verifyPayment: async (
  organizationId: string,
  sessionId: string
): Promise<ISubscriptionResponse> => {
  const response = await api.post<ISubscriptionResponse>(
    `/organizations/verify/${organizationId}`,
    {
      sessionId,
    }
  );

  return response.data;
},

getPayments: async (
  organizationId: string
): Promise<IPaymentsResponse> => {
  const response = await api.get<IPaymentsResponse>(
    `/organizations/${organizationId}/payments`
  );

  return response.data;
},
};