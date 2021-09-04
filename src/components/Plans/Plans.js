import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Plans.css';
import Plancard from '../Plancard/Plancard.js';
import Plandetails from '../Plandetails/Plandetails.js';

export default function Plantab(props) {
    const { id } = useParams();
    // STATE VARIABLES
    // -----------------
    const [viewAllPlans, setViewAllPlans] = useState(true);
    const [isAddingPlan, setIsAddingPlan] = useState(false);
    const [targetPlanIndex, setTargetPlanIndex] = useState(0);
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanDate, setNewPlanDate] = useState(null);
    const [dateFocus, setDateFocus] = useState(false);


    // HELPER METHODS
    // --------------------
    const updatePlanTarget = (planId) => {
        // find index of planData in which planId is found
        for (let i=0; i<props.planData.length; i++) {
            if (props.planData[i].id === planId) {
                setTargetPlanIndex(i)
                setViewAllPlans(false);
            };
        };
    };

    const toggleIsAddingPlan = (e) => {
        e.preventDefault();
        setIsAddingPlan(!isAddingPlan);
    }

    // DATA HANDLING METHODS
    // ---------------------
    const handlePlanCreate = async (e) => {
        e.preventDefault();

        const body = {
            TripId: id,
            name: newPlanName,
            budget: 0,
            content: '',
            UserId: props.user.id,
            date: moment(newPlanDate._d).format("MM/DD/YYYY"),
        };

        const newPlanId = props.handlePlanCreate(body);

        if (newPlanId) {
            // view new plan
            setTargetPlanIndex(updatePlanTarget(newPlanId))
            setIsAddingPlan(false);
            setNewPlanName('');
            setNewPlanDate(null);
        };
    };

    const handlePlanDelete = async (planId) => {
        const deletePlan = props.handlePlanDelete(planId);

        if (deletePlan) {
            setViewAllPlans(true);
        };
    };

    const handlePlanUpdate = async (planId, body) => {
        props.handlePlanUpdate(planId, body);
    };

    const handleCommentOnPlan = async (planId, message) => {
        const body = {
            UserId: props.user.id,
            PlanId: planId,
            content: message
        };

        props.handleCommentCreate(body);
    };

    const handleCommentDelete = async (commentId) => {
        props.handleCommentDelete(commentId);
    }

    return (
        <>
        {!props.planData ? (null) : (
            <>
            {viewAllPlans ? (
                <div className="plan-wrapper-super">
                    <button
                        className="add-plan-button"
                        onClick={toggleIsAddingPlan}
                    >
                        Add an Item
                    </button>
                    <div className="plan-cards-wrapper">
                        <>
                        {isAddingPlan ? (
                            <form className="plan-card" onSubmit={handlePlanCreate}>
                                <input
                                    type="text"
                                    placeholder="What's the plan?"
                                    value={newPlanName}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setNewPlanName(e.target.value);
                                    }}
                                />
                                <div className="single-date-input">
                                    <SingleDatePicker
                                        date={newPlanDate}
                                        onDateChange={date => {
                                            setNewPlanDate(date)
                                        }}
                                        focused={dateFocus}
                                        onFocusChange={({focused}) => setDateFocus(focused)}
                                        id="create-plan-date-picker"
                                        required={true}
                                    />
                                </div>
                                <input type="submit" value="Create plan!" className="submit-add-plan" />
                            </form>
                        ) : ( null )}
                        {props.planData.map((plan, i) => 
                            <Plancard
                                key={i}
                                planData={plan}
                                handleDetailTarget={updatePlanTarget}
                                handleOptIn={props.handleOptIn}
                                handleOptOut={props.handleOptOut}
                                user={props.user}
                            />)
                        }
                        </>
                    </div>
                </div>
            ) : (
                <div>
                    <button
                        className="view-all-plans-button"
                        onClick={(e) => {
                            e.preventDefault();
                            setViewAllPlans(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronCircleLeft} size='1x' className="me-2"/>
                        Back
                    </button>
                    <Plandetails
                        planData={props.planData[targetPlanIndex]}
                        user={props.user}
                        planDeleteHandler={handlePlanDelete}
                        planUpdateHandler={handlePlanUpdate}
                        commentHandler={handleCommentOnPlan}
                        commentDeleteHandler={handleCommentDelete}
                    />
                </div>
            )}
            </>
        )}
        </>
        
    )
}