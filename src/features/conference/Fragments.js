import { gql } from "@apollo/client";

const Fragments = {
    conference: gql`
      fragment conference on Conference {
        id
        name
        startDate
        endDate
      }
    `,
    location: gql`
      fragment location on Location {
        id
      }
    `,
    speaker: gql`
      fragment speaker on Speaker {
          id
          name
          isMainSpeaker
      }
    `,
    status: gql`
      fragment status on Status {
        id
        name
    }
    `
    
}

export default Fragments;