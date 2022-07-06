import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`

    mutation createUser($firstName: String! $lastName: String! $email: String! $username: String! $password: String!) {
        createUser()
    }

`;
