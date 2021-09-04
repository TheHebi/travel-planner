import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';

// BOOTSTRAP IMPORTS
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Lounge.css';
import Message from '../Loungemessage/Loungemessage.js';
import api from '../../utils/api';

export default function Lounge(props) {
    const { id } = useParams();
    // STATE VARIABLES
    // ---------------
    // toggle all comments vs one comment
    const [viewAll, setViewAll] = useState(true);
    // state for new main comment
    const [postContent, setPostContent] = useState('');
    // state for new sub comment
    const [commentContent, setCommentContent] = useState('');
    // index to find individual comment data in messageData
    const [targetCommentIndex, setTargetCommentIndex] = useState(0);

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


    // HELPER FUNCTIONS 
    // ----------------
    const updateCommentTarget = (commentId) => {
        // find index of comment in which commentId is found
        for (let i=0; i<props.messages.length; i++) {
            if (props.messages[i].id === commentId) {
                setTargetCommentIndex(i);
                setViewAll(false);
            }
        }
    };

    // VISUAL TOGGLERS
    // ---------------

    const handleExitCommentViewerClick = (e) => {
        e.preventDefault();
        setViewAll(true);
    };

    // ADD USER TO TRIP
    const handleAddUser = async (e) => {
        e.preventDefault();
        props.handleUserAddition(id, searchedUserId);
        setSearchedUser('');
    };

    // CREATE NEW COMMENT ON TRIP
    const postSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            UserId: props.user.id,
            content: postContent,
            TripId: id,
        };
        props.handlePostCreate(body);
        setPostContent('');
    };

    // CREATE NEW COMMENT ON COMMENT
    const commentSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            CommentId: props.messages[targetCommentIndex].id,
            content: e.target.elements[0].value,
            UserId: props.user.id,
        };
        props.handlePostCreate(body);
        setCommentContent('');
    }

    return (
        <Row style={{marginTop: '20px'}}>
            <Col lg={3}>
                <div className="travellers">
                    <h3 style={{alignSelf: 'center', lineHeight: '1.5em'}}>Travellers</h3>
                    <div className="traveller">
                        <FontAwesomeIcon icon={faCrown} size='1x' className='me-2' />
                        {props.creator.username}
                    </div>
                    {props.travellers ? (props.travellers.map((traveller, index) => {
                        return (
                            <div className="traveller" key={index}>
                                <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                                {traveller.username}
                            </div>
                        )
                    })) : (null)}
                    <div className="search-area">
                        <form onSubmit={handleAddUser}>
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
                            {props.messages.map(message => {
                                return (
                                    <button
                                        className="message-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateCommentTarget(message.id)
                                        }}
                                        key={message.id}
                                        message={message}
                                        data-id={message.id}
                                    >
                                        <Message
                                            message={message}
                                            data-id={message.id}
                                            user={props.user}
                                            handleDelete={props.handlePostDelete}
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
                                <h6 className="comment-subject-content">{props.messages[targetCommentIndex].content}</h6>
                                <p className="comment-subject-poster">
                                    {props.messages[targetCommentIndex].User.username} - 
                                    <Moment className="comment-subject-date" format="MMM Do YYYY" date = {props.messages[targetCommentIndex].createdAt} />
                                </p>
                            </div>
                            <p>Replies:</p>
                            {props.messages[targetCommentIndex].SubComment ? (props.messages[targetCommentIndex].SubComment.map(message =>
                                (<Message
                                    key={message.id}
                                    message={message}
                                    data-id={message.id}
                                    user={props.user}
                                    handleDelete={props.handlePostDelete}
                                />)
                            )) : ( null )}
                        </div>
                    )}
                    {viewAll === true ? (
                        <form id="post-submit-form" onSubmit={postSubmitHandler}>
                            <Form.Control
                                type="text"
                                placeholder="Share your thoughts!"
                                value={postContent}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setPostContent(e.target.value)
                                }}
                            />
                        </form>
                    ) : (
                        <form id="comment-submit-form" onSubmit={commentSubmitHandler}>
                            <Form.Control
                                type="text"
                                placeholder="Send a Comment!"
                                value={commentContent}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setCommentContent(e.target.value);
                                }}
                            />
                        </form>
                    )}
                </div>
            </Col>
        </Row>
    )
}