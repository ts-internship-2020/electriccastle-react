import React, { useState, useCallback, useEffect } from 'react';
//import conferences from 'utils/mocks/conferences';
import OrganizerConferenceFilters from './OrganizerConferenceFilters';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import OrganizerConferenceList from './OrganizerConferenceList';
import { generateDefaultFilters } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import { useHeader, useFooter } from 'providers/AreasProvider';
import OrganizerConferenceHeader from './OrganizerConferenceHeader';
import AddButton from 'components/common/buttons/AddButton';
import { useHistory } from 'react-router-dom';
import { useEmail } from 'hooks/useEmail';
import { useQuery } from '@apollo/client';
import { CONFERENCE_LIST_QUERY } from 'features/conference/queries/ConferenceListQuery';
import { useToast } from 'hooks/toasts';
import Pagination from 'components/common/pagination/Pagination';

const defaultPager = {
    totalCount: 0,
    pageSize: 3,
    page: 0
}

const OrganizerConferenceListContainer = () => {
    const addToast = useToast()
    const [ userEmail ] = useEmail();
    const history = useHistory()
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [ filters, setFilters ] = useState(generateDefaultFilters())
    const [, setFooter] = useFooter();
    const [pager, setPager] = useState(defaultPager);
    const { data, loading, refetch } = useQuery(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: {
                page: pager.page,
                pageSize: pager.pageSize
            },
            filters: {
                ...filters,
                organizerEmail: userEmail
            },
            userEmail
        },
        onError: error => addToast(error, 'error', false)
    });

    const handleApplyFilter = useCallback((value) => setFilters(value), [setFilters])

    const handleAddClick = useCallback(() => {
        history.push("organizerConferences/new")
    }, [history])

    const handleChangePage = useCallback((page) =>
        setPager(currentPager => ({ ...currentPager, page }))
        , [setPager]);

    const handleChangeRowsPerPage = useCallback((pageSize) =>
        setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) })
        , [setPager]);

    const handleRefresh = useCallback(() =>{
        refetch({
            pager : {
                page: pager.page,
                pageSize: pager.pageSize
            },
            filters,
            userEmail
        })
    }, [userEmail, filters, pager.page, pager.pageSize, refetch])
    
    useEffect(() => () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        setHeader(
            <OrganizerConferenceHeader
                title={t('NavBar.OrganizerConferences')}
                actions={<AddButton key='addButton' title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
            />
        )
    }, [handleAddClick, setHeader, t])

    useEffect(() => {
        if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
            setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }));
        }
    }, [data, pager.totalCount, setPager]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setFooter(null), []);
    useEffect(() => {
        setFooter(
            <Pagination
                totalCount={pager.totalCount}
                pageSize={pager.pageSize}
                page={pager.page}
                rowsPerPageOptions={[3, 6, 9, 12, 21]}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                onRefresh={handleRefresh}
            />
        )
    }, [setFooter, handleChangeRowsPerPage, handleChangePage, pager.totalCount, pager.pageSize, pager.page, handleRefresh])

    if (loading) {
        return <LoadingFakeText lines = {10}/>
    }

    return <>
        <OrganizerConferenceFilters filters = {filters} onApplyFilter={handleApplyFilter}/>
        <OrganizerConferenceList conferences = {data?.conferenceList?.values}/>
    </>
}

export default OrganizerConferenceListContainer;