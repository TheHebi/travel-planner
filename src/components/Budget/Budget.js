import React, { useState, useEffect } from 'react';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Budget.css';
import Budgetbar from '../Budgetbar/Budgetbar.js';
import Budgetcard from '../Budgetcard/Budgetcard.js';

export default function Budget({ budgetData }) {
    // STATE VARIABLES
    // ---------------
    const [budgetTotal, setBudgetTotal] = useState(budgetData ? budgetData.total : 0);
    const [addCategory, setAddCategory] = useState(false);

    const findBudgetTotal = (data) => {
        if (!data) {
            return 0
        }

        let budgetTotal = 0;
        for (let i=0; i<data.BudgetCategories.length; i++) {
            for (let j=0; j<data.BudgetCategories[i].BudgetItems.length; j++) {
                budgetTotal += data.BudgetCategories[i].BudgetItems[j].price
            };
        };
        return budgetTotal;
    };

    const handleBudgetChange = (e) => {
        e.preventDefault();
        setBudgetTotal(e.target.elements[0].value)
    }

    const handleAddBudgetCategoryCreator = (e) => {
        e.preventDefault();
        setAddCategory(true);
    }

    const handleAddBudgetCategory = (e) => {
        e.preventDefault();
        console.log('submitted')
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <form onSubmit={handleBudgetChange} style={{display: 'flex'}}>
                <input placeholder={budgetData ? "Budget" : "Set a Budget"} type="number" />
                <button className="ms-2" style={{background: 'none', border: 'none'}}>
                    <FontAwesomeIcon icon={faArrowRight} size='1x' className="me-2" />
                </button>
            </form>
            <div className={(findBudgetTotal(budgetData)>budgetTotal) ? 'budgetbar-wrapper overbudget' : 'budgetbar-wrapper'}>
                <h3>$ {budgetData ? findBudgetTotal(budgetData) : 0} / {budgetTotal}</h3>
                <Budgetbar budgetTotal={budgetTotal} budgetDetails={budgetData}/>
            </div>
            <div className="add-budget-wrapper">
                <button className="add-budget-button" onClick={handleAddBudgetCategoryCreator}>
                    <FontAwesomeIcon icon={faPlusSquare} size='1x' className="me-2" />
                    Add an item
                </button>
            </div>
            <Container>
                <form style={{display: (addCategory === true ? 'block' : 'none')}} onSubmit={handleAddBudgetCategory}>
                    <div className="budgetcard">
                        <div className="header-wrapper mb-2">
                            <input placeholder="Category Title" />
                            <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                                <button style={{border: 'none', background: 'none'}}>
                                    <FontAwesomeIcon icon={faSave} size='1x' />
                                </button>
                            </div>
                        </div>
                        <div className="budgettable mb-2">
                            <div className="budgettable-item">
                                <input type="text" placeholder="item" />
                                <input type="number" placeholder="price" />
                            </div>
                        </div>
                    </div>
                </form>
                {budgetData ? budgetData.BudgetCategories.map((budgetDetails, i) => <Budgetcard key={i} budgetDetails={budgetDetails}/>) : null}
            </Container>
        </div>
    )
}