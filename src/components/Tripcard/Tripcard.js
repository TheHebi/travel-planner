import React, { useState, useEffect, createRef } from 'react';
import { useParams } from 'react-router-dom';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Tripcard.css';
import Budget from '../Budget/Budget.js';
import Lounge from '../Lounge/Lounge.js';
import Tripoverview from '../Tripoverview/Tripoverview.js';
import Plantab from '../Plans/Plans.js';
import api from '../../utils/api.js';

export default function Tripcard({ user, token }) {
    // TRIP ID
    const { id } = useParams();

    // INITIAL CALLS TO API TO GET TRIPDATA. BUDGET DATA
    // (budget data api call located in budget data section)
    // -------------------------------------------------
    const [tripData, setTripData] = useState(null);

    useEffect(() => {
        // ON LOAD - TRIP DATA
        api.getSingleTrip(id).then(res => {setTripData(res.data)});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // SET REFERENCE, STATES FOR TAB SWITCHING
    // ---------------------------------------
    const [activeTab, setActiveTab] = useState('Overview')
    const overviewRef=createRef();
    const plansRef=createRef();
    const budgetRef=createRef();
    const loungeRef=createRef();




    // STATES, EFFECTS, METHODS FOR PLANNING TAB
    // ----------------------------------------------------------
    const [planData, setPlanData] = useState(null);

    useEffect(() => {
        // update plan data on every trip data update
        setPlanData(tripData ? tripData.Plans : null)
    }, [tripData])

    // HANDLE CREATING A PLAN
    const planAddHandler = async (body) => {
        // create new plan
        const res = await api.createPlan(body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        // on success, retrieve new trip data for re-render
        if (res.status === 200) {
            const allPlanData = await api.getAllTripPlans(id);
            setPlanData(allPlanData.data);
            return res.data.id
        } else {
            alert('Error creating new plan...');
            return null
        }
    };

    // HANDLE DELETING A PLAN
    const planDeleteHandler = async (planId) => {
        // delete plan
        const res = await api.deletePlan(planId, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        // on success, retrieve new trip data for re-render
        if (res.status === 200) {
            const allPlanData = await api.getAllTripPlans(id);
            setPlanData(allPlanData.data);
            return true
        } else {
            alert('Error deleting plan...')
            return false
        }
    }

    // HANDLE UPDATING A PLAN
    const planUpdateHandler = async (planId, body) => {
        // update plan
        const res = await api.updatePlan(planId, body, {
            headers: {
                authorization: `Bearer: ${token}`,
            }
        });

        // on success, retrieve new trip data for re-render
        if (res.status === 200) {
            const allPlanData = await api.getAllTripPlans(id);
            setPlanData(allPlanData.data);
        };
    }

    // HANDLE COMMENTING ON A PLAN
    const planCommentCreateHandler = async (body) => {
        // create new comment
        const res = await api.createComment(body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const allPlanData = await api.getAllTripPlans(id);
            setPlanData(allPlanData.data);
        } else {
            alert('Error commenting on plan...');
        }
    }

    // HANDLE DELETING A COMMENT
    const planCommentDeleteHandler = async (commentId) => {
        // delete comment
        const res = await api.deleteComment(commentId, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const allPlanData = await api.getAllTripPlans(id);
            setPlanData(allPlanData.data)
        } else {
            alert('Error deleting comment...')
        }
    }

    // OPT INTO A PLAN
    const optInHandler = async (planId) => {
        // opt into plan
        const res = await api.addUserToPlan({
            UserId: user.id,
            PlanId: planId,
        });

        if (res.status === 200) {
            const allPlanData = await api.getAllTripPlans(id);
            setPlanData(allPlanData.data);
        } else {
            alert('Error joining plan...');
        }
    }

    // OPT OUT OF PLAN
    const optOutHandler = async (planId) => {
        // opt out of plan
        const res = await api.removeUserFromPlan({
            UserId: user.id,
            PlanId: planId,
        });

        if (res.status === 200) {
            const allPlanData = await api.getAllTripPlans(id);
            setPlanData(allPlanData.data);
        } else {
            alert('Error opting out of plan...');
        }
    }

    // ----------------------------------------------------------
    




    // STATES, EFFECTS, METHODS FOR BUDGET TAB
    // ----------------------------------------------------------
    const [budgetData, setBudgetData] = useState(null);

    useEffect(() => {
        // ON LOAD WITH USER - BUDGET DATA
        if (user.id) {
            api.getSingleBudget(id, user.id).then(res => {
                if (res.data) {
                    setBudgetData(res.data[0]);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // HANDLE CHANGING BUDGET SIZE
    const changeBudgetTotal = async (budgetId, newTotal) => {
        // axios put request
        const res = await api.updateBudget(budgetId, {
            total: newTotal
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // set on success
            const budgetRes = await api.getSingleBudget(id, user.id);
            setBudgetData(budgetRes.data[0]);
        } else {
            alert('Error connecting to server... please try again later.')
        }
    };

    // ----- BUDGET CATEGORIES -----

    // HANDLE CREATING BUDGET CATEGORY
    const budgetCategoryCreateHandler = async (body) => {
        // create new category
        const res = await api.createBudgetCategory(body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetData(newBudgetData.data[0]);
            return true
        } else {
            alert('Error creating budget category');
            return false
        }
    };

    // HANDLE EDITING A BUDGET CATEGORY
    const budgetCategoryUpdateHandler = async (categoryId, body) => {
        const res = await api.updateBudgetCategory(categoryId, body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetData(newBudgetData.data[0]);
        } else {
            alert('Error editing budget category...')
        }
    }

    // HANDLE DELETING A BUDGET CATEGORY
    const budgetCategoryDeleteHandler = async (categoryId) => {
        const res = await api.deleteBudgetCategory(categoryId, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetData(newBudgetData.data[0]);
        } else {
            alert('Error deleting budget category...')
        };
    }

    // ----- BUDGET ITEMS -----

    // HANDLE CREATING A BUDGET ITEM
    const budgetItemCreateHandler = async (body) => {
        const res = await api.createBudgetItem(body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetData(newBudgetData.data[0]);
        } else {
            alert('Error creating budget item...');
        }
    };

    // HANDLE EDITING A BUDGET ITEM
    const budgetItemUpdateHandler = async (itemId, body) => {
        const res = await api.updateBudgetItem(itemId, body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetData(newBudgetData.data[0]);
        } else {
            alert('Error updating budget item...');
        }
    };

    // HANDLE DELETING A BUDGET ITEM
    const budgetItemDeleteHandler = async (itemId) => {
        const res = await api.deleteBudgetItem(itemId, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetData(newBudgetData.data[0]);
        } else {
            alert('Error deleting item from category...');
        };
    };

    // ----------------------------------------------------------


    
    
   

    // STATES, EFFECTS, METHODS FOR TRAVEL LOUNGE TAB
    // ----------------------------------------------------------
    const [messageData, setMessageData] = useState(null);
    const [travellerData, setTravellerData] = useState(null);

    useEffect(() => {
        // update plan data on every trip data update
        setMessageData(tripData ? tripData.Comments : null);
        setTravellerData(tripData ? tripData.SavedUser : null);
    }, [tripData])

    // HANDLE ADDING USER TO TRIP
    const userAddHandler = async (tripId, userId) => {
        const res = await api.addUserToTrip({
            TripId: tripId,
            UserId: userId
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        // create unique budget for new travelelr
        const budgetRes = await api.createBudget({
            TripId: tripId,
            UserId: userId
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200 && budgetRes.status === 200) {
            api.getSingleTrip(id).then(res => {setTripData(res.data)});
        } else {
            alert('Error adding user to trip...');
        };
    };

    // HANDLE CREATING A TRIP COMMENT
    const postCreateHandler = async (body) => {
        const res = await api.createComment(body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newCommentData = await api.getAllTripComments(id);
            setMessageData(newCommentData.data);
        } else {
            alert('Error posting comment...')
        }
    };

    // HANDLE DELETING A TRIP COMMENT
    const postDeleteHandler = async (postId) => {
        const res = await api.deleteComment(postId, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newCommentData = await api.getAllTripComments(id);
            setMessageData(newCommentData.data);
            return true
        } else {
            alert('Error deleting comment');
            return false
        };
    };

    // ----------------------------------------------------------




    
    // RENDER APPROPRIATE CONTENT
    // --------------------------

    // HANDLE TAB SWITCHING
    const handleTabSwitch = (e) => {
        e.preventDefault();
        
        // set all classlists to just tab
        overviewRef.current.className = "trip-nav-item";
        plansRef.current.className = "trip-nav-item";
        budgetRef.current.className = "trip-nav-item";
        loungeRef.current.className = "trip-nav-item";

        // set target to active
        e.target.classList.add('trip-nav-active');
        setActiveTab(e.target.id)
    };

    // HANDLE TAB RENDERING
    const renderTab = () => {
        if (!activeTab) {
            return <Tripoverview
                        trip={tripData}
                        plans={planData}
                    />
        } else if (activeTab === 'Overview') {
            return <Tripoverview
                        trip={tripData}
                        plans={planData}
                    />
        } else if (activeTab === 'Plans') {
            return (
                <div>
                    <h1>Plans</h1>
                    <Plantab
                        planData={planData}
                        user={user}
                        token={token}
                        handlePlanCreate={planAddHandler}
                        handlePlanDelete={planDeleteHandler}
                        handlePlanUpdate={planUpdateHandler}
                        handleCommentCreate={planCommentCreateHandler}
                        handleCommentDelete={planCommentDeleteHandler}
                        handleOptIn={optInHandler}
                        handleOptOut={optOutHandler}
                    />
                </div>
            )
        } else if (activeTab === 'Budget') {
            return (
                <div>
                    <h1>Budget</h1>
                    <Budget
                        user={user}
                        token={token}
                        budgetData={budgetData}
                        changeTotal={changeBudgetTotal}
                        handleAddBudgetCategory={budgetCategoryCreateHandler}
                        handleUpdateBudgetCategory={budgetCategoryUpdateHandler}
                        handleDeleteBudgetCategory={budgetCategoryDeleteHandler}
                        
                        handleCreateBudgetItem={budgetItemCreateHandler}
                        handleUpdateBudgetItem={budgetItemUpdateHandler}
                        handleDeleteBudgetItem={budgetItemDeleteHandler}
                    />
                </div>
            )
        } else if (activeTab === 'Lounge') {
            return (
                <div>
                    <h1>Travel Lounge</h1>
                    <Lounge
                        user={user}
                        token={token}

                        messages={messageData}
                        travellers={travellerData}
                        creator={tripData.User}

                        handleUserAddition={userAddHandler}
                        handlePostCreate={postCreateHandler}
                        handlePostDelete={postDeleteHandler}
                    />
                </div>
            )
        }
    };

    return (
        <Container fluid className="trips-main">
            <Container>
                <div className="trip-nav">
                    <button className="trip-nav-item trip-nav-active" id="Overview" onClick={handleTabSwitch} ref={overviewRef}>Overview</button>
                    <button className="trip-nav-item" id="Plans" onClick={handleTabSwitch} ref={plansRef}>Plans</button>
                    <button className="trip-nav-item" id="Budget" onClick={handleTabSwitch} ref={budgetRef}>Budget</button>
                    <button className="trip-nav-item" id="Lounge" onClick={handleTabSwitch} ref={loungeRef}>Lounge</button>
                </div>
                <div className="trip-content">
                    {renderTab()}
                </div>
            </Container>
        </Container>
    )
}