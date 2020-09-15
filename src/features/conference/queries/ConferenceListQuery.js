import { gql } from "@apollo/client";
import Fragments from "../Fragments";
import CommonFragments from "features/common/Fragments";

export const CONFERENCE_LIST_QUERY = gql`
    query conferenceList($pager: PagerInput!, $filters: ConferenceFilterInput, $userEmail: String!) {
        conferenceList(pager: $pager, filters: $filters) {
            values {
                ...conference
                type{
                    ...type
                }
                category{
                    ...category
                }
                location {
                    id
                    city {
                        ...city
                    }
                    county{
                        ...county
                    }
                    country{
                        ...country
                    }
                }
                speakers {
                    ...speaker
                }
                status(userEmail: $userEmail){
                    ...status
                }
            }
            pagination(pager: $pager, filters: $filters) {
                totalCount
                currentPage {
                    ...paginationInfo
                }
            }
        }
    }
${CommonFragments.paginationInfo}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
${CommonFragments.type}
${CommonFragments.category}
${Fragments.conference}
${Fragments.speaker}
${Fragments.status}
`