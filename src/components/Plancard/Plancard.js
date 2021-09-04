import React from 'react';
import Moment from 'react-moment';

// LOCAL IMPORTS
import './Plancard.css';

export default function Plancard(props) {

    // HELPER FUNCTIONS
    // -----------------
    const isUserPlanOwner = () => {
        // checks if current user is creator of a plan
        if (props.planData.User.id === props.user.id) {
            return true
        } else {
            return false
        };
    };

    const isUserInPlan = () => {
        // checks if current user is a part of a plan
        for (let i=0; i<props.planData.SavedUser.length; i++) {
            if (props.planData.SavedUser[i].id === props.user.id) {
                return true
            }
        };

        return false
    };

    return (
        <>
        {!props.planData ? (null) : (
            <div className="plan-card">
                <div className="plan-card-info-wrapper">
                    <h3>{props.planData.name}</h3>
                    <Moment format="MMM Do YYYY" date = {props.planData.date} />
                </div>
                <div className="plan-card-buttons-wrapper">
                    <button
                        className="card-btn btn-left"
                        onClick={(e) => {
                            e.preventDefault();
                            props.handleDetailTarget(props.planData.id);
                        }}
                    >
                        View Details
                    </button>
                    {isUserPlanOwner() ? ( null ) : ( isUserInPlan() ? (
                        <button
                            className="card-btn opt-out"
                            onClick={(e) => {
                                e.preventDefault();
                                props.handleOptOut(props.planData.id);
                            }}
                        >
                            Opt-out
                        </button>
                    ) : (
                        <button
                            className="card-btn opt-in"
                            onClick={(e) => {
                                e.preventDefault();
                                props.handleOptIn(props.planData.id);
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