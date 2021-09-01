import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';

// BOOTSTRAP IMPORTS
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Lounge.css';
import Message from '../Loungemessage/Loungemessage.js';
import api from '../../utils/api';

export default function Lounge({ messages, travellers, creator, handleUserAddition, user, token }) {
    const { id } = useParams();
    // STATE VARIABLES
    // ---------------
    const [viewAll, setViewAll] = useState(true);
    const [tripComments, setTripComments] = useState(messages);
    const [tripComment, setTripComment] = useState(tripComments[0]);
    const [commentId, setCommentId] = useState(0);
    // search bar
    const [allUsers, setAllUsers] = useState([]);
    const [visibleSearchedUsers, setVisibleSearchedUsers] = useState([]);
    const [searchedUser, setSearchedUser] = useState('');
    const [searchedUserId, setSearchedUserId] = useState('');

    // EFFECTS
    // --------------
    useEffect(async () => {
        const userData = await api.getAllUsers();

        // create an object linking user IDs to usernames
        const users = [];
        const usersLowercase = [];
        for (let i=0; i<userData.data.length; i++) {
            users.push({
                username: userData.data[i].username,
                id: userData.data[i].id,
            });
        };
        setAllUsers(users);
    }, []);

    useEffect(() => {
        if (searchedUser === '') {
            setVisibleSearchedUsers([]);
        } else {
            const searchResults = [];
            for (let i=0; i<allUsers.length; i++) {
                if (allUsers[i].username.toLowerCase().includes(searchedUser) || allUsers[i].username.includes(searchedUser)) {
                    searchResults.push(allUsers[i])
                }
            };
            setVisibleSearchedUsers(searchResults);
        }

    }, [searchedUser]);

    // VISUAL CHANGES
    // --------------
    const handleCommentClick = async (e) => {
        e.preventDefault();
        const res = await api.getSingleComment(e.target.getAttribute('data-id'));
        if (res.status = 200) {
            setTripComment(res.data);
            console.log(`viewing comment ${res.data.id}`);
            setCommentId(res.data.id);
            setViewAll(false);
        } else {
            alert('Error fetching comment data. Please try again later.')
        };
    }

    const handleExitCommentViewerClick = (e) => {
        e.preventDefault();
        setViewAll(true);
    }

    // ADD USER TO TRIP
    const userAddHandler = async (e) => {
        e.preventDefault();
        handleUserAddition(id, searchedUserId);
        setSearchedUser('');
    }

    // CREATE NEW COMMENT ON TRIP
    const postSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            UserId: user.id,
            content: e.target.elements[0].value,
            TripId: id,
        }
        const res = await api.createComment(body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newCommentData = await api.getAllTripComments(id);
            setTripComments(newCommentData.data);
            e.target.elements[0].value = '';
        } else {
            alert('Error posting comment...')
        }
    }

    // CREATE NEW COMMENT ON COMMENT
    const commentSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            CommentId: commentId,
            content: e.target.elements[0].value,
            UserId: user.id,
        }
        const res = await api.createComment(body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newCommentData = await api.getAllTripComments(id);
            setTripComments(newCommentData.data);
            for (let i=0; i<newCommentData.data.length; i++) {
                if (newCommentData.data[i].id === commentId) {
                    setTripComment(newCommentData.data[i])
                }
            }
            e.target.elements[0].value = '';
        } else {
            alert('Error posting comment...');
        };
    }

    // DELETE A USER'S COMMENT
    const commentDeleteHandler = async (deletionId) => {
        // delete comment
        const res = await api.deleteComment(deletionId, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            // grab all comments
            const newCommentData = await api.getAllTripComments(id);
            setTripComments(newCommentData.data);
            for (let i=0; i<newCommentData.data.length; i++) {
                console.log(newCommentData.data[i])
                console.log(commentId)
                if (newCommentData.data[i].id === commentId) {
                    setTripComment(newCommentData.data[i])
                }
            };
        } else {
            alert('Error deleting comment...')
        }
    }

    return (
        <Row style={{marginTop: '20px'}}>
            <Col lg={3}>
                <div className="travellers">
                    <h3 style={{alignSelf: 'center', lineHeight: '1.5em'}}>Travellers</h3>
                    <div className="traveller">
                        <FontAwesomeIcon icon={faCrown} size='1x' className='me-2' />
                        {creator.username}
                    </div>
                    {travellers.map((traveller, index) => {
                        return (
                            <div className="traveller" key={index}>
                                <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                                {traveller.username}
                            </div>
                        )
                    })}
                    <div className="search-area">
                        <form onSubmit={userAddHandler}>
                            <Form.Control
                                className="user-search-bar"
                                type="text"
                                placeholder="Search by username"
                                value={searchedUser}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setSearchedUser(e.target.value);

                                    for (let i=0; i<allUsers.length; i++) {
                                        if (e.target.value.toLowerCase() === allUsers[i].username.toLowerCase()) {
                                            setSearchedUserId(allUsers[i].id)
                                        };
                                    };
                                }}
                            />
                            <input type="submit" style={{display: 'none'}} />
                            <div className="search-list">
                                {visibleSearchedUsers.map((user, index) => (
                                    <button
                                        key={index}
                                        className="user-search-result"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSearchedUser(user.username);
                                            setSearchedUserId(user.id);
                                        }}
                                    >
                                        {user.username}
                                    </button>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            </Col>
            <Col lg={9}>
                <div className="message-board">
                    <h3>Message Board</h3>
                    {viewAll === true ? (
                        <div className="messages">
                            {tripComments.map(message => {
                                return (
                                    <button
                                        className="message-button"
                                        onClick={handleCommentClick}
                                        key={message.id}
                                        message={message}
                                        data-id={message.id}
                                    >
                                        <Message
                                            message={message}
                                            data-id={message.id}
                                            user={user}
                                            handleDelete={commentDeleteHandler}
                                        />
                                    </button>
                                )}
                            )}
                        </div>
                    ) : (
                        <div className="messages">
                            <button
                                className="back-to-view-all-btn"
                                onClick={handleExitCommentViewerClick}
                            >
                                <FontAwesomeIcon icon={faChevronCircleLeft} size='1x' className="me-2"/>
                                Back
                            </button>
                            <div className="comment-subject-wrapper">
                                <h6 className="comment-subject-content">{tripComment.content}</h6>
                                <p className="comment-subject-poster">
                                    {tripComment.User.username} - 
                                    <Moment className="comment-subject-date" format="MMM Do YYYY" date = {tripComment.createdAt} />
                                </p>
                            </div>
                            <p>Replies:</p>
                            {tripComment.SubComment ? (tripComment.SubComment.map(message =>
                                (<Message
                                    key={message.id}
                                    message={message}
                                    data-id={message.id}
                                    user={user}
                                    handleDelete={commentDeleteHandler}
                                />)
                            )) : ( null )}
                        </div>
                    )}
                    {viewAll === true ? (
                        <form id="post-submit-form" onSubmit={postSubmitHandler}>
                            <Form.Control type="text" placeholder="Share your thoughts!" />
                        </form>
                    ) : (
                        <form id="comment-submit-form" onSubmit={commentSubmitHandler}>
                            <Form.Control type="text" placeholder="Send a Comment!" />
                        </form>
                    )}
                </div>
            </Col>
        </Row>
    )
}