import { gql } from "@apollo/client";

// 1. Create a new empty order (First Step)
export const CREATE_ORDER = gql`
  mutation CreateOrder {
    createOrder {
      id
      status
      country
    }
  }
`;

// 2. Add Item to Order (Requires orderId from step 1)
export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($orderId: String!, $menuItemId: String!, $quantity: Float!) {
    addItemToOrder(orderId: $orderId, menuItemId: $menuItemId, quantity: $quantity)
  }
`;

// 3. Checkout Order (ADMIN/MANAGER Only)
export const CHECKOUT_ORDER = gql`
  mutation CheckoutOrder($orderId: String!) {
    checkoutOrder(orderId: $orderId) {
      id
      status
    }
  }
`;

// 4. Add Payment Method (ADMIN Only)
export const ADD_PAYMENT_METHOD = gql`
  mutation AddPaymentMethod($cardNumber: String!, $expiry: String!) {
    addPaymentMethod(cardNumber: $cardNumber, expiry: $expiry) {
      id
      cardNumber
    }
  }
`;