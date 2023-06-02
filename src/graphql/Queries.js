import { gql } from "@apollo/client";

export const GET_ARTISTS = gql`
  query getArtists {
    artists {
      id
      name
      rate
      streamCount
      paidStatus
      payoutAmount
      averageMonthlyPayoutAmount
    }
  }
`;

export const GET_ARTIST = gql`
  query getArtistById($artistId: UUID!) {
    artists(where: { id: { eq: $artistId } }) {
      id
      name
      rate
      streamCount
      paidStatus
      payoutAmount
      averageMonthlyPayoutAmount
    }
  }
`;
