import { gql } from "@apollo/client";

/**
 * Query to fetch all restaurants. 
 * Note: Ensure the field name matches your NestJS Resolver exactly.
 */
export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      country
    }
  }
`;