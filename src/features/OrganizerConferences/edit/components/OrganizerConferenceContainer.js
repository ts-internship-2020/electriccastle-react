import React, { useEffect, useReducer, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider';
import OrganizerConferenceHeader from 'features/OrganizerConferences/list/components/OrganizerConferenceHeader';
import SaveButton from 'components/common/buttons/SaveButton';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import OrganizerConference from './OrganizerConference';
//import { types, categories, countries, counties, cities } from 'utils/mocks/organizerConference';
import { reducer, initialConference } from '../OrganizerReducer';
//import { conference as serverConference } from 'utils/mocks/organizerConference';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { CONFERENCE_QUERY } from '../ConferenceQuery';
import { useQuery, useMutation } from '@apollo/client';
import { useToast } from 'hooks/toasts';
import { UPDATE_CONFERENCE } from '../UpdateConference';
import { useEmail } from 'hooks/useEmail';

const OrganizerConferenceContainer = () => {
    const addToast = useToast()
    const { t } = useTranslation()
    const match = useRouteMatch()
    const [ email ] = useEmail()
    const [, setHeader] = useHeader()
    const history = useHistory();
    const [conference, dispatch] = useReducer(reducer, initialConference)

    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE,
        {
            onCompleted: result => {
                addToast(t('MyConferences.SavingSucceeded'), 'success')
        
                if (isNew) {
                    history.push(`/myConferences/${result?.saveConference?.id}`);
                    return;
                }
        
                result?.saveConference && dispatch({ type: 'resetData', payload: result?.saveConference })
            }
        })

    const handleSave = useCallback(() => {
        const { id, name, startDate, endDate, deletedSpeakers, type, category, location, speakers } = conference;
        const { city, county, country, ...locationData } = location
        const input = {
            id, name, startDate, endDate, deletedSpeakers, type, category,
            location: {
                ...locationData,
                cityId: city.id,
                countyId: county.id,
                countryId: country.id
            },
            speakers,
            organizerEmail: email
        }
        updateConference({ variables: { input } })
    }, [conference, email, updateConference])

    useEffect(() => () => setHeader(null), [setHeader])

    useEffect(() => {
        setHeader(<OrganizerConferenceHeader title={conference.name} actions={<SaveButton onClick={handleSave} title={t("General.Buttons.Save")} />} />)
    }, [conference.name, setHeader, t, handleSave])

    const { loading, data } = useQuery(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: data => data?.conference && dispatch({ type: 'resetData', payload: data?.conference }),
        onError: error => addToast(error, 'error', false)
    });

    if (loading || saving) {
        return <LoadingFakeText lines={10} />
    }

    return <OrganizerConference
        conference={conference}
        dispatch={dispatch}
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
    />
}

export default OrganizerConferenceContainer
