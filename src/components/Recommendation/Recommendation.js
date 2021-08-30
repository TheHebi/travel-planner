import React from 'react';

// LOCAL IMPORTS
import globe from '../../images/globe.png';
import './Recommendation.css';

export default function Recommendation() {
    return (
        <div className="recommendation-main" id="recommendation">
            <div className="d-flex flex-column align-items-center">
            <img src={globe} width="80px" height="80px" />
            </div>
            <div className="recommendation-header">
                <h1>Recommendations from our Staff</h1>
                <h5>Here are some of our suggestions!</h5>
            </div>

            <div className="col-12 d-flex flex-column">
                <div className="row d-flex flex-row justify-content-center my-4">
                    <a href="https://english.visitseoul.net/index" target="_blank" className="col-12 img-box">
                        <div className="child img1 d-flex flex-row justify-content-center align-items-center">
                            <h3>Seoul</h3>
                            <h5>Street Food, K-pop</h5>
                        </div>
                    </a>
                    <a href="https://en.parisinfo.com/" target="_blank" className="col-12 img-box">
                        <div className="child img2 d-flex flex-row justify-content-center align-items-center">
                            <h3>Paris</h3>
                            <h5>Eiffel Tower, Wines</h5>
                        </div>
                    </a>
                    <a href="https://www.visitlondon.com/" target="_blank" className="col-12 img-box">
                        <div className="child img3 d-flex flex-row justify-content-center align-items-center">
                            <h3>London</h3>
                            <h5>Soccer, Big Ben</h5>
                        </div>
                    </a>
                    <a href="https://www.australia.com/en-us/places/sydney-and-surrounds/guide-to-sydney.html" target="_blank" className="col-12 img-box">
                        <div className="child img4 d-flex flex-row justify-content-center align-items-center">
                            <h3>Sydney</h3>
                            <h5>Nature, Kangaroo</h5>
                        </div>
                    </a>
                    <a href="http://egypt.travel/" target="_blank" className="col-12 img-box">
                        <div className="child img5 d-flex flex-row justify-content-center align-items-center">
                            <h3>Egypt</h3>
                            <h5>Pyramid, Civilization</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}