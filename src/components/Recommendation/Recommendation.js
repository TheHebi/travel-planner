import React from 'react';

// LOCAL IMPORTS
import globe from '../../images/globe.png';
import './Recommendation.css';

export default function Recommendation() {
    return (
        <div className="recommendation-main" id="recommendation">
            <div className="d-flex flex-column align-items-center">
            <img className="globeLogo" src={globe}/>
            </div>
            <div className="recommendation-header mb-4">
                <h1 className="recommendation-header-main">Recommendations from our Staff</h1>
                <h1 className="recommendation-header-mobile">Recommendations</h1>
                <h5>Here are some of our suggestions!</h5>
            </div>

            <div className="col-12 d-flex flex-column">
                <div className="row d-flex flex-row justify-content-center my-4">
                    <a href="https://english.visitseoul.net/index" target="_blank" className="col-12 img-box">
                        <div className="child img1 d-flex flex-row justify-content-center align-items-center">
                            <h3 className="recCityName">Seoul</h3>
                            <h5 className="recCityFamous">Street Food, K-pop</h5>
                        </div>
                    </a>
                    <a href="https://en.parisinfo.com/" target="_blank" className="col-12 img-box">
                        <div className="child img2 d-flex flex-row justify-content-center align-items-center">
                            <h3 className="recCityName">Paris</h3>
                            <h5 className="recCityFamous">Eiffel Tower, Wines</h5>
                        </div>
                    </a>
                    <a href="https://www.visitlondon.com/" target="_blank" className="col-12 img-box">
                        <div className="child img3 d-flex flex-row justify-content-center align-items-center">
                            <h3 className="recCityName">London</h3>
                            <h5 className="recCityFamous">Soccer, Big Ben</h5>
                        </div>
                    </a>
                    <a href="https://www.australia.com/en-us/places/sydney-and-surrounds/guide-to-sydney.html" target="_blank" className="col-12 img-box">
                        <div className="child img4 d-flex flex-row justify-content-center align-items-center">
                            <h3 className="recCityName">Sydney</h3>
                            <h5 className="recCityFamous">Nature, Kangaroo</h5>
                        </div>
                    </a>
                    <a href="http://egypt.travel/" target="_blank" className="col-12 img-box">
                        <div className="child img5 d-flex flex-row justify-content-center align-items-center">
                            <h3 className="recCityName">Egypt</h3>
                            <h5 className="recCityFamous">Pyramid, Civilization</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}