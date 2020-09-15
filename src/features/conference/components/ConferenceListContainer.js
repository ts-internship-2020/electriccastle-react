import React, { useState, useCallback, useEffect } from 'react';
//import conferences from 'utils/mocks/conferences';
import ConferenceFilters from './ConferenceFilters';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import ConferenceList from './ConferenceList';
//import { generateDefaultFilters } from 'utils/functions';
import { useToast } from 'hooks/toasts';
import { CONFERENCE_LIST_QUERY } from '../queries/ConferenceListQuery';
import { useQuery } from '@apollo/client';
import { useEmail } from 'hooks/useEmail';
import { useFooter } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';

const defaultPager = {
    totalCount: 0,
    pageSize: 3,
    page: 0
}

const ConferenceListContainer = () => {
    const addToast = useToast()
    const [ email ] = useEmail()
    const [ filters, setFilters ] = useState() //generateDefaultFilters()
    const [, setFooter] = useFooter()
    const [ pager, setPager] = useState(defaultPager)
    const { data, loading, refetch } = useQuery(CONFERENCE_LIST_QUERY, {
        variables: {
            pager : {
                page: pager.page,
                pageSize: pager.pageSize
            },
            filters,
            userEmail: email
        },
        onError: error => addToast(error, 'error', false)
    });

    const handleApplyFilter = useCallback((value) => setFilters(value), [setFilters])

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
            userEmail: email
        })
    }, [email, filters, pager.page, pager.pageSize, refetch])

    useEffect(() => () => setFooter(null), []); // eslint-disable-line react-hooks/exhaustive-deps

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
    }, [setFooter, refetch, handleChangeRowsPerPage, handleChangePage, pager.totalCount, pager.pageSize, pager.page, handleRefresh])

    useEffect(() => {
        if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
            setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }));
        }
    }, [data, pager.totalCount, setPager]);

    if (loading) {
        return <LoadingFakeText lines = {10}/>
    }

    return <>
        <ConferenceFilters filters = {filters} onApplyFilter={handleApplyFilter}/>
        <ConferenceList conferences = {data?.conferenceList?.values}/>
    </>
}

export default ConferenceListContainer;