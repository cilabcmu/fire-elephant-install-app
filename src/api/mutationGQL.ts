import { gql } from "@apollo/client";

const UPDATE_LOCATION = gql`
  mutation updateLocationCheckSD($lat: Float!, $lng: Float!, $dn_v: Int!) {
    updateLocationCheckSD(lat: $lat, lng: $lng, dn_v: $dn_v) {
      status
      statusMessage
      latlngStatus
      latlngMessage
    }
  }
`;

export { UPDATE_LOCATION };
