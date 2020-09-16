import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';
import attendeeStatus from 'constants/attendeeStatus.js';

const ConferenceContent = (props) => {
    const { conference, onAttend } = props
    const { status, startDate, endDate, type, category } = conference

    const { t } = useTranslation()
    const noStatusSet = t('Conferences.StatusNotSet')

    const showJoin = status?.id === attendeeStatus.Attended
    const showWithdraw = status?.id === attendeeStatus.Attended || attendeeStatus.Joined
    const showAttend = !status?.id || status.id === attendeeStatus.Withdrawn

    const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
    const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="subtitle1" color="error">{status?.name || noStatusSet}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${type?.name}, ${category?.name}`}</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {showJoin && <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>}
                    {showWithdraw && <Button right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>}
                    {showAttend && <Button onClick={onAttend(conference?.id)} right color="info" size={"sm"}>{t('Conferences.Attend')}</Button>}
                </Grid>
            </Grid>
        </Grid>
    )
}

ConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func
}

export default ConferenceContent;