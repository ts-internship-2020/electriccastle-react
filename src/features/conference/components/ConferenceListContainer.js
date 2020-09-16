import React, { useState, useCallback, useEffect } from 'react';
//import conferences from 'utils/mocks/conferences';
import ConferenceFilters from './ConferenceFilters';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import ConferenceList from './ConferenceList';
//import { generateDefaultFilters } from 'utils/functions';
import { useToast } from 'hooks/toasts';
import { CONFERENCE_LIST_QUERY } from '../queries/ConferenceListQuery';
import { useMutation, useQuery } from '@apollo/client';
import { useEmail } from 'hooks/useEmail';
import { useFooter } from 'providers/AreasProvider';
import Pagination from 'components/common/pagination/Pagination';
import { ATTEND_CONFERENCE_MUTATION } from '../mutations/AttendConference';
import { useTranslation } from 'react-i18next';
import DialogDisplay from 'components/common/dialogBox/DialogDisplay';
import ConferenceCodeModal from './ConferenceCodeModal';

const defaultPager = {
    totalCount: 0,
    pageSize: 3,
    page: 0
}

const ConferenceListContainer = () => {
    const { t } = useTranslation();
    const addToast = useToast()
    const [code, setCode] = useState("")
    const [open, setOpenDialog] = useState(false)
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
    
    const [attend] = useMutation(ATTEND_CONFERENCE_MUTATION, {
        onCompleted: (data) => {
            if (!data) {
                return
            }
            setCode(data.attend)
            setOpenDialog(true)
            addToast(t("Conferences.SuccessfullyAttended"), 'success')
        },
        onError: error => addToast(error, 'error', false)
    })

    const handleApplyFilters = useCallback((value) => setFilters(value), [setFilters])

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

    const handleAttend = useCallback((conferenceId) => () => {
        const input = {
            attendeeEmail: email,
            conferenceId,
            //statusId: 3 // Attended
        }
        attend({ variables: { input } })
    }, [attend, email]);

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
    <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
    <ConferenceList
        conferences={data?.conferenceList?.values}
        onAttend={handleAttend}
        //onWithdraw={handleWithdraw}
    />
    <DialogDisplay
        id="showQRCode"
        open={open}
        title={t("General.Congratulations")}
        content={<ConferenceCodeModal code={code} />}
        onClose={() => { setOpenDialog(false); setCode(""); refetch() }} // eslint-disable-line react/jsx-no-bind
    />
</>
}

export default ConferenceListContainer;