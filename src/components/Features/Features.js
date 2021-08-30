import React from 'react';

// LOCAL IMPORTS
import featuresLogo from '../../images/features.png';
import './Features.css';

export default function Features() {
    return (
        <div className="features-main" id="features">
            <div className="d-flex flex-column align-items-center">
            <img src={featuresLogo} width="100px" height="100px" />
            </div>
            <div className="features-header">
                <h1>Features</h1>
                <h5>What we provide...</h5>
            </div>
            <div className="features-content">
                <div className="features-card">
                    <div className="features-card-img">
                        <img src="https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2552&q=80" width="500px" height="400px" />
                    </div>
                    <div className="features-card-main" id="main1">
                        <div className="features-card-number d-flex flex-column">
                            <span className="spanCircle mb-2" id="span1"><strong>1</strong></span>
                            <h4>Choose anywhere you want to go!</h4>
                        </div>
                        <div className="features-card-list">
                            <ul>
                                <li>Choose the destination</li>
                                <li>Choose the trip duration</li>
                                <li>Invite your co-travelers</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="features-card">
                    <div className="features-card-main">
                        <div className="features-card-number d-flex flex-column">
                            <span className="spanCircle mb-2" id="span2"><strong>2</strong></span>
                            <h4 id="main2Subtitle">Manage expenses live!</h4>
                        </div>
                        <div className="features-card-list" id="main2List">
                            <ul id="rtlList">
                                <li>Track your budget as you travel</li>
                                <li>Share comments with your co-travelers </li>
                            </ul>
                        </div>
                    </div>
                    <div className="features-card-img">
                        <img src="https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1525&q=80" width="500px" height="400px" />
                    </div>
                </div>
            </div>
        </div>
    )
}