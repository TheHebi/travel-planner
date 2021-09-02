import React, { useState } from 'react';
import Moment from 'react-moment';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser } from '@fortawesome/free-solid-svg-icons';

// BOOTSTRAP IMPORTS
import Form from 'react-bootstrap/Form';
import Message from '../Loungemessage/Loungemessage.js'

// LOCAL IMPORTS
import './Plandetails.css';

export default function Plandetails({ planData, user, planDeleteHandler, planUpdateHandler, commentHandler, commentDeleteHandler }) {
    // STATE VARIABLES
    // ---------------
    const [isEditing, setIsEditing] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    // plan variables
    const [planTitle, setPlanTitle] = useState(planData.name);
    const [planContent, setPlanContent] = useState(planData.content);
    const [planBudget, setPlanBudget] = useState(planData.budget);

    // VISUAL TOGGLING
    const togglePlanEditor = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    }
    
    // ADD COMMENT TO PLAN
    const submitPlanComment = (e) => {
        e.preventDefault();
        commentHandler(planData.id, commentValue);
        setCommentValue('');
    };
    
    // DELETE COMMENT
    const deleteComment = (commentId) => {
        commentDeleteHandler(commentId);
    };

    // UPDATE PLAN
    const updatePlan = (e) => {
        e.preventDefault();
        const body = {
            name: planTitle,
            budget: planBudget,
            content: planContent,
        };
        planUpdateHandler(planData.id, body);
        setIsEditing(false);
    }

    // DELETE PLAN
    const deletePlan = (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you'd like to delete this plan?`)) {
            planDeleteHandler(planData.id);
        } else {
            console.log('plan delete aborted')
        }
    }

    return (
        <>
        {!planData ? ( null ) : (
        <div className="plan-detail-wrapper">
            {user.id === planData.User.id ? (
                <div className="action-button-wrapper">
                    <button className="icon-btn" onClick={togglePlanEditor}>
                        📝
                    </button>
                    <button className="icon-btn" onClick={deletePlan}>
                        ✖️
                    </button>
                </div>
            ) : ( null )}
            {isEditing ? (
                <form onSubmit={updatePlan} className="plan-update-form">
                    <input
                        type="text"
                        value={planTitle}
                        onChange={(e) => {
                            e.preventDefault();
                            setPlanTitle(e.target.value);
                        }}
                        className="plan-title-input"
                    />
                    <Moment className="plan-item-date" format="MMM Do YYYY" date = {planData.date} />
                    <textarea
                        type="text"
                        rows="3"
                        value={planContent}
                        onChange={(e) => {
                            e.preventDefault();
                            setPlanContent(e.target.value);
                        }}
                        className="plan-content-input"
                    />
                    <p className="plan-item-center">
                        Approximate Cost: $
                        <input
                            type="number"
                            step="0.01"
                            value={planBudget}
                            onChange={(e) => {
                                e.preventDefault();
                                setPlanBudget(e.target.value);
                            }}
                            className="plan-budget-input"
                        />
                    </p>
                    <div className="plan-item-center opted-in-travellers">
                    <div className="plan-partaker plan-creator">
                        <FontAwesomeIcon icon={faCrown} size='1x' className='me-2' />
                        {planData.User.username}
                    </div>
                    {planData.SavedUser.map((savedUser, i) => {
                        return (
                            <div key={i} className="plan-partaker">
                                <FontAwesomeIcon icon={faUser} size='1x' className='me-2' />
                                {savedUser.username}
                            </div>
                        )
                    })}
                    </div>
                    <input type="submit" value="Update Plan ➜" className="edit-plan-input" />
                </form>
            ) : (
                <>
                <h3 className="plan-item-center">{planData.name}</h3>
                <Moment className="plan-item-date" format="MMM Do YYYY" date = {planData.date} />
                <p className="plan-item-center">{planData.content}</p>
                <p className="plan-item-center">Approximate Cost: ${planData.budget}</p>
                <div className="plan-item-center opted-in-travellers">
                    <div className="plan-partaker plan-creator">
                        <FontAwesomeIcon icon={faCrown} size='1x' className='me-2' />
                        {planData.User.username}
                    </div>
                    {planData.SavedUser.map((savedUser, i) => {
                        return (
                            <div key={i} className="plan-partaker">
                                <FontAwesomeIcon icon={faUser} size='1x' className='me-2' />
                                {savedUser.username}
                            </div>
                        )
                    })}
                </div>
                </>
            )}
            <div className="plan-item-center plan-comments">
                {planData.Comments.map((comment, i) => {
                    return (
                        <Message 
                            key={i}
                            message={comment}
                            user={user}
                            handleDelete={deleteComment}
                        />
                    )
                })}
                <form onSubmit={submitPlanComment}>
                    <Form.Control
                        type="text"
                        placeholder="Send a Comment!"
                        value={commentValue}
                        onChange={(e) => {
                            e.preventDefault();
                            setCommentValue(e.target.value);
                        }}
                    />
                </form>
            </div>
        </div>
    )}
    </>
    )
}