import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import OrganizerConferenceItem from "./OrganizerConferenceItem";

const OrganizerConferenceList = (props) => {
    const { conferences } = props

    return (
        <Grid container spacing={2}>
            {conferences?.map(conference =>
                <Grid item xs={12} lg={4} key={conference.id}>
                    <OrganizerConferenceItem
                        conference={conference}
                    />
                </Grid>
            )}
        </Grid>
    )
}

OrganizerConferenceList.propTypes = {
    conferences: PropTypes.array
}

OrganizerConferenceList.defaultProps = {
    conferences: []
}

export default OrganizerConferenceList;