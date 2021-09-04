import React, { useState } from 'react';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Budget.css';
import Budgetbar from '../Budgetbar/Budgetbar.js';
import Budgetcard from '../Budgetcard/Budgetcard.js';

export default function Budget(props) {
    // STATE VARIABLES
    // ---------------
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [budgetTotal, setBudgetTotal] = useState(props.budgetData ? props.budgetData.total : 0);
    const [addCategory, setAddCategory] = useState(false);
    const [categoryDescription, setCategoryDescription] = useState('');

    // HELPER FUNCTIONS
    // -------------------
    const findBudgetTotal = (data) => {
        // simple sum function
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

    // VISUAL TOGGLERS
    // -----------------
    const toggleBudgetEditor = (e) => {
        e.preventDefault();
        setIsEditingBudget(!isEditingBudget);
    };

    const toggleBudgetCategoryCreator = (e) => {
        e.preventDefault();
        setAddCategory(!addCategory);
    };


    // BUDGET CATEGORY METHODS
    //-------------------------
    const handleAddBudgetCategory = async (e) => {
        e.preventDefault();
        
        const body = {
            BudgetId: props.budgetData.id,
            description: categoryDescription,
        }

        const addCat = props.handleAddBudgetCategory(body);

        if (addCat) {
            setAddCategory(false);
            setCategoryDescription('');
        };
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={(findBudgetTotal(props.budgetData)>budgetTotal) ? 'budgetbar-wrapper overbudget' : 'budgetbar-wrapper'}>
                <div className="budget-overview-wrapper">
                    <h3 className="budget-overview-text">{props.budgetData ? findBudgetTotal(props.budgetData) : 0}</h3>
                    <h3 className="budget-overview-divider"> / </h3>
                    {isEditingBudget ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                props.changeTotal(props.budgetData.id, budgetTotal);
                                setIsEditingBudget(false);
                            }}
                            className="budget-editor-input-wrapper"
                        >
                            <input
                                placeholder="0"
                                type="number"
                                step="0.01"
                                className="budget-editor-input"
                                value={budgetTotal}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setBudgetTotal(e.target.value);
                                }}
                            />
                            <input type="submit" style={{display: 'none'}} />
                        </form>
                    ) : (
                        <h3 className="budget-overview-text">{budgetTotal}</h3>
                    )}
                    <button className="budget-overview-editor" onClick={toggleBudgetEditor}>
                        📝
                    </button>
                </div>
                <Budgetbar budgetTotal={budgetTotal} budgetDetails={props.budgetData}/>
            </div>
            <div className="add-budget-wrapper">
                <button className="add-budget-button" onClick={toggleBudgetCategoryCreator}>
                    <FontAwesomeIcon icon={faPlusSquare} size='1x' className="me-2" />
                    Add an item
                </button>
            </div>
            <Container>
                <form style={{display: (addCategory === true ? 'block' : 'none')}} onSubmit={handleAddBudgetCategory}>
                    <div className="budgetcard">
                        <div className="header-wrapper mb-2">
                            <input
                                className="budget-input-title"
                                placeholder="Category Title"
                                value={categoryDescription}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setCategoryDescription(e.target.value);
                                }}
                            />
                            <input type="submit" style={{display: 'none'}} />
                            <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                                <button style={{border: 'none', background: 'none'}} onClick={toggleBudgetCategoryCreator}>
                                    ✖️
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                {props.budgetData ? props.budgetData.BudgetCategories.map((budgetDetails, i) => 
                <Budgetcard 
                    key={i} 
                    budgetDetails={budgetDetails} 
                    deleteCategoryHandler={props.handleDeleteBudgetCategory} 
                    editCategoryHandler={props.handleUpdateBudgetCategory}

                    itemCreateHandler={props.handleCreateBudgetItem}
                    itemUpdateHandler={props.handleUpdateBudgetItem}
                    itemDeleteHandler={props.handleDeleteBudgetItem}
                />
                ) : null}
            </Container>
        </div>
    )
}