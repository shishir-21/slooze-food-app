import { gql } from "@apollo/client";

// Create empty order
export const CREATE_ORDER = gql`
  mutation CreateOrder {
    createOrder {
      id
      status
      country
    }
  }
`;

// Add item
export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder(
    $orderId: String!
    $menuItemId: String!
    $quantity: Float!
  ) {
    addItemToOrder(
      orderId: $orderId
      menuItemId: $menuItemId
      quantity: $quantity
    )
  }
`;

// Checkout
export const CHECKOUT_ORDER = gql`
  mutation CheckoutOrder($orderId: String!) {
    checkoutOrder(orderId: $orderId) {
      id
      status
    }
  }
`;

// Admin only
export const ADD_PAYMENT_METHOD = gql`
  mutation AddPaymentMethod(
    $cardNumber: String!
    $expiry: String!
  ) {
    addPaymentMethod(
      cardNumber: $cardNumber
      expiry: $expiry
    ) {
      id
      cardNumber
    }
  }
`;