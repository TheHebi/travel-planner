import React from 'react';

// LOCAL IMPORTS
import CreateTripCard from '../components/CreateTripCard/CreateTripCard';

export default function CreateTrip(props) {
    return (
        <CreateTripCard userState={props.userState} user={props.user} token={props.token}/>
    )
}