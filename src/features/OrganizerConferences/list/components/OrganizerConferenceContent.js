import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from 'components/common/inputs/Typography';
import Button from 'components/common/buttons/Button';
import { useHistory } from 'react-router-dom';

const OrganizerConferenceContent = (props) => {
    const history = useHistory()
    const { conference } = props
    const { id, startDate, endDate, type, category } = conference

    const { t } = useTranslation()

    const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
    const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })

    const handleEditClick = useCallback(() => history.push(`/myConferences/${id}`), [history, id])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${type?.name}, ${category?.name}`}</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button right color="danger" size="sm">{t("Conferences.Delete")}</Button>
                    <Button right color="info" size="sm" onClick={handleEditClick}>{t("Conferences.Edit")}</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

OrganizerConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired,
}

export default OrganizerConferenceContent;