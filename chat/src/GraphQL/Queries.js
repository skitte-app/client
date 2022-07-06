import { gql } from "@apollo/client";

export const LOAD_SKITS = gql`
  query {
    feed {
      slug
      image
      content
      caption
      timestamp
      likes
      date
      didlike
      reposts
      parent {
        slug
        image
        content
        caption
        timestamp
        likes
        date
        didlike
        reposts
      }
      user {
        username
        firstName
        lastName
        isUser
        image
        email
      }
    }
  }
`;