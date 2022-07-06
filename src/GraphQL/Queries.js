import { gql } from "@apollo/client";

export const LOAD_SKITS = gql`
  query Feeds {
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

export const LOAD_LOGIN_USER = gql`
  query LOGIN_USER {
    myProfile{
      username
      image
      firstName
      lastName
      email
      bio
      updated
      timestamp
      followers{
        username
        isFollowing
        firstName
        lastName
        location
        image
      }
      isUser
      website
    }
  }
`;