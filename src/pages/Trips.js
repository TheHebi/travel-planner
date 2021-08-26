import React from 'react';

// LOCAL IMPORTS
import Tripcard from '../components/Tripcard/Tripcard.js';
import { getTrips } from '../utils/api.js';

const trips = getTrips('/api/users');
console.log(trips)

export default function Trips() {
    return (
        <Tripcard />
    )
}