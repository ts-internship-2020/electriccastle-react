import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Info, LocationOn, Face } from '@material-ui/icons'
import IconCard from 'components/common/cards/IconCard'
import CardTitle from 'components/common/cards/CardTitle'
import AddButton from 'components/common/buttons/AddButton'
import OrganizerConferenceInfo from './OrganizerConferenceInfo';
import OrganizerConferenceLocation from './OrganizerConferenceLocation';
import OrganizerConferenceSpeakers from './OrganizerConferenceSpeakers';

const OrganizerConference = (props) => {
    const { types, categories, countries, counties, cities, conference, dispatch } = props
    const { location, speakers } = conference
    const { t } = useTranslation()

    const handleAddButton = useCallback(() => dispatch({ type: 'addSpeaker' }), [dispatch])

    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <OrganizerConferenceInfo
                    types={types}
                    categories={categories}
                    conference={conference}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={LocationOn}
            title={t("Conference.Location")}
            content={
                <OrganizerConferenceLocation
                    countries={countries}
                    counties={counties}
                    cities={cities}
                    location={location}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={Face}
            title={
                <CardTitle
                    title={t("Conference.Speakers")}
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick={handleAddButton} />]}
                />
            }
            content={
                <OrganizerConferenceSpeakers
                    speakers={speakers}
                    dispatch={dispatch}
                />
            }
        />
    </>
}

OrganizerConference.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array,
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default OrganizerConference