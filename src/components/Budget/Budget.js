import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Budget.css';
import Budgetbar from '../Budgetbar/Budgetbar.js';
import Budgetcard from '../Budgetcard/Budgetcard.js';
import api from '../../utils/api';

export default function Budget({ budgetData, user, token }) {
    const { id } = useParams();
    // STATE VARIABLES
    // ---------------
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [budgetTotal, setBudgetTotal] = useState(budgetData ? budgetData.total : 0);
    const [addCategory, setAddCategory] = useState(false);
    const [budgetObject, setBudgetObject] = useState(budgetData);

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

    const toggleBudgetEditor = (e) => {
        e.preventDefault();
        setIsEditingBudget(!isEditingBudget);
    }

    const handleBudgetChange = async (e) => {
        e.preventDefault();
        const newTotal = e.target.elements[0].value;

        // axios put request
        const res = await api.updateBudget(budgetData.id, {
            total: newTotal
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // set on success
            setBudgetTotal(newTotal);
            setIsEditingBudget(false);
        } else {
            alert('Error connecting to server... please try again later.')
        }
    }

    // METHODS FOR EDITING BUDGET CATEGORIES
    const toggleBudgetCategoryCreator = (e) => {
        e.preventDefault();
        setAddCategory(!addCategory);
    }

    const handleAddBudgetCategory = async (e) => {
        e.preventDefault();
        
        // create new category
        const res = await api.createBudgetCategory({
            BudgetId: budgetObject.id,
            description: e.target.children[0].children[0].children[0].value,
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // fetch new data and set state to render cards and hide category creator
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetObject(newBudgetData.data[0]);
            setAddCategory(false);
        } else {
            alert('Error creating budget category...')
        };
    }

    const handleEditBudgetCategory = async (categoryId, body) => {
        // edit existing category
        const res = await api.updateBudgetCategory(categoryId, body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // fetch new data and set state to render cards and hide category creator
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetObject(newBudgetData.data[0]);
        } else {
            alert('Error editing budget category...')
        }
    }

    const handleDeleteBudgetCategory = async (budgetCategoryId) => {
        // delete indicated budget category (using data-id attribute)
        const res = await api.deleteBudgetCategory(budgetCategoryId, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // fetch new data and set state
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetObject(newBudgetData.data[0]);
        } else {
            alert('Error deleting budget category...')
        }
    }

    // METHODS FOR EDITING BUDGET ITEMS
    const handleAddItem = async (body) => {
        // create new budget item
        const res = await api.createBudgetItem(body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // fetch new data and set state to render cards and hide category creator
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetObject(newBudgetData.data[0]);
        } else {
            alert('Error creating budget item...')
        };
    }

    const handleDeleteItem = async (budgetItemId) => {
        // delete indicated budget item (using data-id attribute from child)
        const res = await api.deleteBudgetItem(budgetItemId, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // fetch new data and set state
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetObject(newBudgetData.data[0]);
        } else {
            alert('Error deleting item from category...')
        }
    }

    const handleEditItem = async (budgetItemId, body) => {
        // edit existing budget item
        const res = await api.updateBudgetItem(budgetItemId, body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // fetch new data and set state to render cards and hide editor
            const newBudgetData = await api.getSingleBudget(id, user.id);
            setBudgetObject(newBudgetData.data[0]);
        } else {
            alert('Error editing budget item...')
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={(findBudgetTotal(budgetObject)>budgetTotal) ? 'budgetbar-wrapper overbudget' : 'budgetbar-wrapper'}>
                <div className="budget-overview-wrapper">
                    <h3 className="budget-overview-text">{budgetObject ? findBudgetTotal(budgetObject) : 0}</h3>
                    <h3 className="budget-overview-divider"> / </h3>
                    {isEditingBudget ? (
                        <form
                            onSubmit={handleBudgetChange}
                            className="budget-editor-input-wrapper"
                        >
                            <input
                                placeholder={budgetObject ? "Budget" : "Set a Budget"}
                                type="number"
                                step="0.01"
                                className="budget-editor-input"
                                defaultValue={budgetTotal}
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
                <Budgetbar budgetTotal={budgetTotal} budgetDetails={budgetObject}/>
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
                {budgetObject ? budgetObject.BudgetCategories.map((budgetDetails, i) => 
                <Budgetcard 
                    key={i} 
                    budgetDetails={budgetDetails} 
                    deleteHandler={handleDeleteBudgetCategory} 
                    editHandler={handleEditBudgetCategory}
                    addHandler={handleAddItem}
                    deleteItemHandler={handleDeleteItem}
                    editItemHandler={handleEditItem}
                />
                ) : null}
            </Container>
        </div>
    )
}