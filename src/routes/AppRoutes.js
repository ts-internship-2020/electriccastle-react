/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Settings from 'features/settings/Settings';
import NotFound from 'components/common/NotFound';
import Forbidden from 'components/common/Forbidden';
//import HelloWorld from 'features/helloWorld/HelloWorld';
import Welcome from 'features/welcome/Welcome';
import { useEmail } from 'hooks/useEmail';
import ConferenceListContainer from 'features/conference/components/ConferenceListContainer';
import OrganizerConferenceListContainer from 'features/OrganizerConferences/list/components/OrganizerConferenceListContainer';
import OrganizerConferenceContainer from 'features/OrganizerConferences/edit/components/OrganizerConferenceContainer';

export default function AppRoutes() {
    const [email] = useEmail()
    if (!email) {
        return (
            <Switch>
                <Route exact path="/welcome" component={Welcome}/>
                <Redirect to="/welcome" />
            </Switch>)
    }
    return (
        <Switch>
            <Route exact path="/welcome" component={Welcome}/>
            <Route exact path="/settings" component={Settings}/>
            <Route exact path="/conferences" component={ConferenceListContainer} />
            <Route exact path="/organizerConferences" component={OrganizerConferenceListContainer} />
            <Route exact path="/organizerConferences/:id(new)" component={OrganizerConferenceContainer} />
            <Route exact path="/myConferences/:id(\d+)" component={OrganizerConferenceContainer} />
            <Redirect exact from="/" to="/welcome" />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
        </Switch>
    )
}