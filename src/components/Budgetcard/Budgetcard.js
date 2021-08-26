import React from 'react';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Budgetcard.css';

export default function Budgetcard({ budgetDetails }) {
    let budgetItemSum = 0;
    for (let i=0; i<budgetDetails.items.length; i++) {
        budgetItemSum += budgetDetails.items[i].price;
    }

    return (
        <div>
            <div className="budgetcard">
                <div className="header-wrapper">
                    <h3>{budgetDetails.title}</h3>
                    <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                        <button style={{border: 'none', background: 'none'}}>
                            <FontAwesomeIcon icon={faEdit} size='1x' />
                        </button>
                        <button style={{border: 'none', background: 'none'}}>
                            <FontAwesomeIcon icon={faTrashAlt} size='1x' />
                        </button>
                    </div>
                </div>
                <div className="budggettable">
                {budgetDetails.items.map((budgetItem, i) => {
                    return (
                        <div key={i} className="budgettable-item">
                            <p>{budgetItem.name}</p>
                            <p>{budgetItem.price}</p>
                        </div>
                    )
                })}
                    <div className="budgettable-item-total">
                        <p>{budgetItemSum}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}