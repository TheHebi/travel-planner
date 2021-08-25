import React from 'react';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Budget.css';
import Budgetbar from '../Budgetbar/Budgetbar.js';

export default function Budget() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className="budgetbar-wrapper">
                <h3>$ 3,500 / 5,000</h3>
                <Budgetbar />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginLeft: '5em', marginRight: '5em', borderBottom: '1px solid black'}}>
                <button style={{display: 'flex', alignItems: 'center', border: 'none', background: 'none', marginBottom: '10px'}}>
                    <FontAwesomeIcon icon={faPlusSquare} size='1x' className="me-2" />
                    Add an item
                </button>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <div className="budgetcard">
                    <h3>Travel</h3>
                    <table className="budgettable">
                        <tr>
                            <td>Plane Ticket:</td>
                            <td>$845</td>
                        </tr>
                        <tr>
                            <td>Eurorail Pass:</td>
                            <td>$120</td>
                        </tr>
                    </table>
                </div>
                <div className="budgetcard">
                    <h3>Food</h3>
                    <table className="budgettable">
                        <tr>
                            <td>All Food:</td>
                            <td>$1000</td>
                        </tr>
                    </table>
                </div>
                <div className="budgetcard">
                    <h3>Lodging</h3>
                    <table className="budgettable">
                        <tr>
                            <td>AirBnB:</td>
                            <td>$2,055</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}