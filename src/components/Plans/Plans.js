import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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
    // const [isAddingPlan, setIsAddingPlan] = useState(false);
    const [targetPlanIndex, setTargetPlanIndex] = useState(0);


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

    // DATA HANDLING METHODS
    // ---------------------
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
            setPlanObject(allPlanData.data);
            setViewAllPlans(true);
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
            console.log(allPlanData.data)
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
                    <button className="add-plan-button">
                        Add an Item
                    </button>
                    <div className="plan-cards-wrapper">
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