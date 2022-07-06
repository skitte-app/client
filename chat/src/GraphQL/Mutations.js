import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      profile {
        updated
        image
        user {
          username
        }
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        firstName
        lastName
        username
        isActive
        isVerified
      }
      profile {
        image
        updated
        location
      }
    }
  }
`;
