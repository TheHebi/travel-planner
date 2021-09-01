import React from 'react';

// LOCAL IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './AboutTeam.css'

export default function AboutTeam() {
    return (
        <div className="container aboutTeam">
            <div className="row aboutTeamHeader">
                <div className="col-12 text-center">
                    <h2><strong>Meet Our Team</strong></h2>
                    <p>Feel free to contact us via Github or Linkedin!</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="our-team">
                        <div className="picture">
                            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/60636931?v=4" />
                        </div>
                        <div className="team-content">
                            <h4 className="title">CEO</h4>
                            <h3 className="name">Koppi Kolyvek</h3>
                            <h4 className="title">Frontend Developer</h4>
                        </div>
                        <ul className="social">
                            <li>
                                <a href="https://www.linkedin.com/in/koppi-kolyvek-221b0a14a/" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} size='1x' /></a>
                            </li>
                            <li>
                                <a href="https://github.com/kkolyvek" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faGithub} size='1x' /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="our-team">
                        <div className="picture">
                            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/19616161?v=4" />
                        </div>
                        <div className="team-content">
                            <h4 className="title">CFO</h4>
                            <h3 className="name">Kevin Choi</h3>
                            <h4 className="title">Frontend Developer</h4>
                        </div>
                        <ul className="social">
                            <li>
                                <a href="https://linkedin.com/in/kevchoi" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} size='1x' /></a>
                            </li>
                            <li>
                                <a href="https://github.com/rhwlffk1028" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faGithub} size='1x' /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="our-team">
                        <div className="picture">
                            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/84348161?v=4" />
                        </div>
                        <div className="team-content">
                            <h4 className="title">CTO</h4>
                            <h3 className="name">Nate Turcotte</h3>
                            <h4 className="title">Backend Developer</h4>
                        </div>
                        <ul className="social">
                            <li>
                                <a href="https://www.linkedin.com/in/nathanielturcotte/" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} size='1x' /></a>
                            </li>
                            <li>
                                <a href="https://github.com/TheHebi" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faGithub} size='1x' /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="our-team">
                        <div className="picture">
                            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/84879014?v=4" />
                        </div>
                        <div className="team-content">
                            <h4 className="title">COO</h4>
                            <h3 className="name">Kaleb Muse</h3>
                            <h4 className="title">Backend Developer</h4>
                        </div>
                        <ul className="social">
                            <li>
                                <a href="https://www.linkedin.com/in/kcmuse/" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} size='1x' /></a>
                            </li>
                            <li>
                                <a href="https://github.com/kcmuse" target="_blank" aria-hidden="true"><FontAwesomeIcon icon={faGithub} size='1x' /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}