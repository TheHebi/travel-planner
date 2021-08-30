import React from 'react';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Budgetcard.css';

export default function Budgetcard({ budgetDetails }) {
    const findCardTotal = (data) => {
        let budgetItemSum = 0;
        for (let i=0; i<data.BudgetItems.length; i++) {
            budgetItemSum += data.BudgetItems[i].price;
        }
        return budgetItemSum
    }

    const handleAddBudgetItem = (e) => {
        e.preventDefault();
    }

    const handleDeleteBudgetCategory = (e) => {
        e.preventDefault();

        if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.parentElement.parentElement.parentElement.classList.add('hidden-item')
        } else {
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('hidden-item')
        }
    }

    return (
        <div>
            <div className="budgetcard">
                <div className="header-wrapper">
                    <h3>{budgetDetails.description}</h3>
                    <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                        <button style={{border: 'none', background: 'none'}} onClick={handleAddBudgetItem}>
                            <FontAwesomeIcon icon={faEdit} size='1x' style={{color: 'green'}} />
                        </button>
                        <button style={{border: 'none', background: 'none'}} onClick={handleDeleteBudgetCategory}>
                            <FontAwesomeIcon icon={faTrashAlt} size='1x' style={{color: 'red'}} />
                        </button>
                    </div>
                </div>
                <div className="budgettable">
                {budgetDetails.BudgetItems.map((budgetItem, i) => {
                    return (
                        <div key={i} className="budgettable-item">
                            <p>{budgetItem.description}</p>
                            <p>{budgetItem.price}</p>
                        </div>
                    )
                })}
                    <div className="budgettable-item-total">
                        <strong>{findCardTotal(budgetDetails)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}