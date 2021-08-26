import React from 'react';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Budget.css';
import Budgetbar from '../Budgetbar/Budgetbar.js';
import Budgetcard from '../Budgetcard/Budgetcard.js';

export default function Budget({budget}) {
    let budgetTotal = 0;
    for (let i=0; i<budget.budgetCategories.length; i++) {
        for (let j=0; j<budget.budgetCategories[i].items.length; j++) {
            budgetTotal += budget.budgetCategories[i].items[j].price
        };
    };

    const budgetBarWrapperClasses = (budgetTotal>budget.budget) ? 'budgetbar-wrapper overbudget' : 'budgetbar-wrapper'

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={budgetBarWrapperClasses}>
                <h3>$ {budgetTotal} / {budget.budget}</h3>
                <Budgetbar budget={budget}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginLeft: '5em', marginRight: '5em', borderBottom: '1px solid black'}}>
                <button style={{display: 'flex', alignItems: 'center', border: 'none', background: 'none', marginBottom: '10px'}}>
                    <FontAwesomeIcon icon={faPlusSquare} size='1x' className="me-2" />
                    Add an item
                </button>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {budget.budgetCategories.map((budgetDetails, i) => <Budgetcard key={i} budgetDetails={budgetDetails}/>)}
            </div>
        </div>
    )
}