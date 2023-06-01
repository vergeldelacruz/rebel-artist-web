import { gql } from "@apollo/client";

export const CREATE_ARTIST = gql`
  mutation createArtist(
    $name: String!
    $rate: Float!
    $streamCount: Long!
    $paidStatus: Boolean!
  ) {
    createArtist(
      artistInput: {
        name: $name
        rate: $rate
        streamCount: $streamCount
        paidStatus: $paidStatus
      }
    ) {
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

export const UPDATE_ARTIST = gql`
  mutation updateArtist(
    $id: UUID!
    $name: String!
    $rate: Float!
    $streamCount: Long!
    $paidStatus: Boolean!
  ) {
    updateArtist(
      artistInput: {
        id: $id
        name: $name
        rate: $rate
        streamCount: $streamCount
        paidStatus: $paidStatus
      }
    ) {
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

export const DELETE_ARTIST = gql`
  mutation deleteArtist($artistId: UUID!) {
    deleteArtist(artistId: $artistId) {
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
