import React from 'react';
import Moment from 'react-moment';

// LOCAL IMPORTS
import './Plancard.css';

export default function Plancard({ planData, handleDetailTarget, handleOptIn, handleOptOut, user }) {

    // HELPER FUNCTIONS
    // -----------------
    const isUserPlanOwner = () => {
        // checks if current user is creator of a plan
        if (planData.User.id === user.id) {
            return true
        } else {
            return false
        };
    };

    const isUserInPlan = () => {
        // checks if current user is a part of a plan
        for (let i=0; i<planData.SavedUser.length; i++) {
            if (planData.SavedUser[i].id === user.id) {
                return true
            }
        };

        return false
    };

    return (
        <>
        {!planData ? (null) : (
            <div className="plan-card">
                <div className="plan-card-info-wrapper">
                    <h3>{planData.name}</h3>
                    <Moment format="MMM Do YYYY" date = {planData.date} />
                </div>
                <div className="plan-card-buttons-wrapper">
                    <button
                        className="card-btn btn-left"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDetailTarget(planData.id);
                        }}
                    >
                        View Details
                    </button>
                    {isUserPlanOwner() ? ( null ) : ( isUserInPlan() ? (
                        <button
                            className="card-btn opt-out"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOptOut(planData.id);
                            }}
                        >
                            Opt-out
                        </button>
                    ) : (
                        <button
                            className="card-btn opt-in"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOptIn(planData.id);
                            }}
                        >
                            Opt-in
                        </button>
                    ))}
                </div>
            </div>
        )}
            
        </>
    )
}