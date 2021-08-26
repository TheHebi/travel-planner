import React from 'react';

// LOCAL IMPORTS
import './Trending.css';

export default function Trending() {
    return (
        <div className="trending-main" id="trending">
            <div className="d-flex flex-column align-items-center">
                <span className="dot mt-3 mb-2"></span>
                <span className="dot my-2"></span>
                <span className="dot my-2"></span>
            </div>
            <div className="trending-header">
                <h1>Trending Destinations</h1>
                <h5>These cities are where people are going!</h5>
            </div>

            <div className="col-12 d-flex flex-column">
                <div className="row d-flex flex-row justify-content-center my-4">
                    <div className="col-3 img-box">
                        <div className="child img1 d-flex flex-row justify-content-center align-items-center">
                            <h3>Seoul</h3>
                            <h5>Street Food, K-pop</h5>
                        </div>
                    </div>
                    <div className="col-6 img-box">
                        <div className="child img2 d-flex flex-row justify-content-center align-items-center">
                            <h3>Paris</h3>
                            <h5>Eiffel Tower, Wines</h5>
                        </div>
                    </div>
                </div>
                <div className="row d-flex flex-row justify-content-center">
                    <div className="col-3 img-box">
                        <div className="child img3 d-flex flex-row justify-content-center align-items-center">
                            <h3>London</h3>
                            <h5>Soccer, Big Ben</h5>
                        </div>
                    </div>
                    <div className="col-3 img-box">
                        <div className="child img4 d-flex flex-row justify-content-center align-items-center">
                            <h3>Sidney</h3>
                            <h5>Nature, Kangaroo</h5>
                        </div>
                    </div>
                    <div className="col-3 img-box">
                        <div className="child img5 d-flex flex-row justify-content-center align-items-center">
                            <h3>Egypt</h3>
                            <h5>Pyramid, Civilization</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}