import React from 'react';
import PropTypes from 'prop-types';
import RegularCard from 'components/common/cards/RegularCard';
import OrganizerConferenceSubtitle from './OrganizerConferenceSubtitle';
import OrganizerConferenceContent from './OrganizerConferenceContent';

const OrganizerConferenceItem = (props) => {
    const { conference } = props
    const { name, speakers, location } = conference
    const speaker = speakers.find(speaker => speaker.isMainSpeaker)

    return (
        <RegularCard
            cardTitle={name}
            cardSubtitle={
                <OrganizerConferenceSubtitle
                    speaker={speaker}
                    location={location}
                />}
            content={
                <OrganizerConferenceContent
                    conference={conference}
                />}
        />
    )
}

OrganizerConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired
}

export default OrganizerConferenceItem;