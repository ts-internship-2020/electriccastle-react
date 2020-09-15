import React from 'react';
import { MY_FIRST_QUERY } from "./queries/MyFirstQuery";
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import { useQuery } from '@apollo/client';

function HelloWorld() {
    const { loading, data } = useQuery(MY_FIRST_QUERY);

    if(loading){
        return <LoadingFakeText lines={10} />
    }
    
    return data?.myFirstEndpoint
}

export default HelloWorld;