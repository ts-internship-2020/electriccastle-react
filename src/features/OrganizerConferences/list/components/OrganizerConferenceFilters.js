import React, { useState, useCallback } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import DateTime from 'components/common/inputs/DateTime';
import Button from 'components/common/buttons/Button';
import IconCard from 'components/common/cards/IconCard';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { generateDefaultFilters } from 'utils/functions';

const OrganizerConferenceFilters = (props) => {
    const { filters, onApplyFilter } = props
    const [ startDate, setStartDate ] = useState(filters.startDate)
    const [ endDate, setEndDate ] = useState(filters.endDate)
    const { t } = useTranslation()

    const handleFilterClick = useCallback(() => onApplyFilter({startDate, endDate}), [onApplyFilter, startDate, endDate])
    const handleResetFiltersClick = useCallback(() => {
        const defaultFilters = generateDefaultFilters()
        setStartDate(defaultFilters.startDate)
        setEndDate(defaultFilters.endDate)
    }, [setStartDate, setEndDate])
    const handleKeyPressed = useCallback(({ keyCode }) => (keyCode === 13 && handleFilterClick()), [handleFilterClick])


    return <>
        <IconCard   
            icon={SearchIcon}
            iconColor="theme"
            content={(
                <Grid container spacing={2} onKeyDown={handleKeyPressed}> 
                    <Grid item xs={12} lg={3}>
                        <DateTime
                            label={t('Conferences.Filters.StartDate')}
                            clearable
                            value={startDate}
                            onChange={setStartDate}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <DateTime
                            label={t('Conferences.Filters.EndDate')}
                            clearable
                            value={endDate}
                            onChange={setEndDate}
                        />
                    </Grid>
                </Grid>
            )}
        />
        <Button size={"sm"} color={"primary"} right={true} onClick={handleResetFiltersClick}>
            {t("General.Buttons.ResetFilters")}
        </Button>
        <Button size={"sm"} color={"primary"} right={true} onClick={handleFilterClick}>
            {t("General.Buttons.ApplyFilters")}
        </Button>
    </>
}

OrganizerConferenceFilters.propTypes = {
    filters: PropTypes.shape({
        startDate: PropTypes.any.isRequired, 
        endDate: PropTypes.any.isRequired
    }).isRequired,
    onApplyFilter: PropTypes.func.isRequired
}

export default OrganizerConferenceFilters
