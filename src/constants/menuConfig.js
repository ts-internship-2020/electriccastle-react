import React from 'react';
import Settings from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';

const menuItems = [
    { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome'},
    { icon: <EventIcon/>, text: 'NavBar.Conferences', path: '/conferences', name: 'Conferences'},
    { icon: <EventNoteIcon/>, text: 'NavBar.OrganizerConferences', path: '/organizerConferences', name:'OrganizerConferences'},
    { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings'}
]

export default menuItems