import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
  query GetUser($userId: String!) {
    users(where: { id: $userId }) {
      id
      tier1TotalEarned
      tier2TotalEarned
      tier1TotalStaked
      tier2TotalStaked
      tier3TotalEarned
      tier3TotalStaked
    }
  }
`;

export const GET_USERS_ALL_STAKES = gql`
  query GetUser($userId: String!, $tier: Int!) {
    users(where: { id: $userId }) {
      stakes(where: { tier: $tier, isUstaked: false }) {
        id
        isUstaked
        tier
      }
    }
  }
`;

export const GET_USERS_ALL_UNCLAIMED_DATA = gql`
  query GetUser($userId: String!) {
    users(where: { id: $userId }) {
      stakes(where: { isRewardPaid: false }) {
        isRewardPaid
        endTime
        stakeAmount
        startTime
        tier
      }
    }
  }
`;

export const GET_USERS_ALL_LOCKED_DATA = gql`
  query GetUser($userId: String!) {
    users(where: { id: $userId }) {
      stakes(where: { isUstaked: false }) {
        stakeAmount
        tier
        isUstaked
      }
    }
  }
`;

export const GET_USERS_ALL_STAKEAMOUNT = gql`
  query GetUser {
    stakes {
      stakeAmount
      tier
      isUstaked
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetUser {
    users {
      id
    }
  }
`;
