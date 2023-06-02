import { gql } from "@apollo/client";

export const GET_ARTISTS = gql`
  query getArtists {
    artists(skip: 0, take: 10000) {
      items {
        id
        name
        rate
        streamCount
        paidStatus
        payoutAmount
        averageMonthlyPayoutAmount
      }
    }
  }
`;

export const GET_ARTIST = gql`
  query getArtistById($artistId: UUID!) {
    artists(skip: 0, take: 1, where: { id: { eq: $artistId } }) {
      items {
        id
        name
        rate
        streamCount
        paidStatus
      }
    }
  }
`;

export const GET_TOP_ARTISTS = gql`
  query getTopArtists {
    artists(skip: 0, take: 10, order: [{ payoutAmount: DESC }]) {
      items {
        name
        Payout:averageMonthlyPayoutAmount
      }
    }
  }
`;
