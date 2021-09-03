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
import api from '../../utils/api.js';

export default function Plantab({ planData, user, token }) {
    const { id } = useParams();
    // STATE VARIABLES
    // -----------------
    const [planObject, setPlanObject] = useState(planData);
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
        for (let i=0; i<planObject.length; i++) {
            if (planObject[i].id === planId) {
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
            UserId: user.id,
            date: moment(newPlanDate._d).format("MM/DD/YYYY"),
        };

        // create new plan
        const res = await api.createPlan(body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        
        if (res.status === 200) {
            // if successful, reload data
            const allPlanData = await api.getAllTripPlans(id);
            // view new plan
            setTargetPlanIndex(updatePlanTarget(res.data.id));
            setIsAddingPlan(false);
            setNewPlanName('');
            setNewPlanDate(null);
            setPlanObject(allPlanData.data);
        } else {
            alert('Error creating new plan...')
        };
    };

    const handlePlanDelete = async (planId) => {
        // delete plan
        const res = await api.deletePlan(planId, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // if successful, reload data
            const allPlanData = await api.getAllTripPlans(id);
            setViewAllPlans(true);
            setPlanObject(allPlanData.data);
        } else {
            alert('Error deleting plan...')
        }
    };

    const handlePlanUpdate = async (planId, body) => {
        // update plan
        const res = await api.updatePlan(planId, body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // on success, reload data
            const allPlanData = await api.getAllTripPlans(id);
            setPlanObject(allPlanData.data);
        } else {
            alert('Error updating plan...')
        }
    };

    const handleCommentOnPlan = async (planId, message) => {
        // create new comment
        const res = await api.createComment({
            UserId: user.id,
            PlanId: planId,
            content: message
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (res.status === 200) {
            // on success, reload data
            const allPlanData = await api.getAllTripPlans(id);
            setPlanObject(allPlanData.data);
        } else {
            alert('Error adding comment...');
        };
    };

    const handleCommentDelete = async (commentId) => {
        // delete comment
        const res = await api.deleteComment(commentId, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            // on success, reload data
            const allPlanData = await api.getAllTripPlans(id);
            setPlanObject(allPlanData.data);
        } else {
            alert('Error deleting comment...');
        }
    }

    const optInPlan = async (planId) => {
        // opt into plan
        const res = await api.addUserToPlan({
            UserId: user.id,
            PlanId: planId,
        });

        if (res.status === 200) {
            // if successful, reload data
            const allPlanData = await api.getAllTripPlans(id);
            setPlanObject(allPlanData.data);
        } else {
            alert('Error joining plan...')
        };
    };

    const optOutPlan = async (planId) => {
        // opt out of plan
        const res = await api.removeUserFromPlan({
            UserId: user.id,
            PlanId: planId,
        });
        
        if (res.status === 200) {
            // if successful, reload data
            const allPlanData = await api.getAllTripPlans(id);
            setPlanObject(allPlanData.data);
        } else {
            alert('Error joining plan...')
        };
    }

    return (
        <>
        {!planObject ? (null) : (
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
                        {planObject.map((plan, i) => 
                            <Plancard
                                key={i}
                                planData={plan}
                                handleDetailTarget={updatePlanTarget}
                                handleOptIn={optInPlan}
                                handleOptOut={optOutPlan}
                                user={user}
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
                        planData={planObject[targetPlanIndex]}
                        user={user}
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