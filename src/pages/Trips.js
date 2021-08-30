import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// LOCAL IMPORTS
import Tripcard from '../components/Tripcard/Tripcard.js';
import api from '../utils/api.js';

export default function Trips() {  
    const { id } = useParams();
    // STATE VARIABLES
    // ---------------
    const [tripData, setTripData] = useState('');
    const [budgetData, setBudgetData] = useState('');

    // GRAB TRIP DATA FROM API
    // ------------------
    useEffect(() => {
        api.getSingleTrip(id).then(res => {setTripData(res.data)});
    }, [])

    // GRAB DATA FROM API
    // ------------------
    useEffect(() => {
        api.getSingleBudget(id).then(res => {
            if (res.data) {
                setBudgetData(res.data[0]);
            }
        });
    }, [])

    return (
        <Tripcard tripData={tripData} budgetData={budgetData} />
    )
}