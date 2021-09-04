import React, { useState } from 'react';

// LOCAL IMPORTS
import './Budgetcard.css';
import Budgetcarditem from '../Budgetcarditem/Budgetcarditem';

export default function Budgetcard(props) {
    // SET STATES
    // ---------------
    const [addItem, setAddItem] = useState(false);
    const [title, setTitle] = useState(props.budgetDetails.description)
    const [newItemValue, setNewItemValue] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');

    // HELPER FUNCTIONS
    // ----------------
    const findCardTotal = (data) => {
        let budgetItemSum = 0;
        for (let i=0; i<data.BudgetItems.length; i++) {
            budgetItemSum += data.BudgetItems[i].price;
        }
        return budgetItemSum
    }

    // VISUAL TOGGLERS
    //------------------
    const toggleAddBudgetItem = (e) => {
        e.preventDefault();
        setAddItem(!addItem);
    }

    // BUDGET ITEM METHODS
    // ---------------------------

    // handle adding a budget item
    const handleAddBudgetItem = (e) => {
        e.preventDefault();

        const body = {
            BudgetCategoryId: props.budgetDetails.id,
            description: newItemValue,
            price: newItemPrice,
        }

        props.itemCreateHandler(body);

        setNewItemValue('');
        setNewItemPrice('');
    }

    // BUDGET CATEGORY METHODS
    // ---------------------------

    // handle deleting a budget category
    const handleDeleteBudgetCategory = (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you'd like to delete this category?`)) {
            props.deleteCategoryHandler(props.budgetDetails.id);
        } else {
        }
    }

    // handle editing a budget category
    const handleEditBudgetCategory = (e) => {
        e.preventDefault();

        // build body
        const body = {
            description: title,
        }

        // push to parent
        props.editCategoryHandler(props.budgetDetails.id, body);
        setAddItem(false);
    }

    return (
        <div>
            <div className="budgetcard">
                <div className="header-wrapper">
                    {addItem === false ? (
                        <h3>{props.budgetDetails.description}</h3>
                    ) : (
                        <form
                            onSubmit={handleEditBudgetCategory}
                        >
                            <input
                                className="budget-input-title"
                                type="text"
                                required
                                value={title}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setTitle(e.target.value);
                                }}
                            />
                            <input type="submit" style={{display: 'none'}} />
                        </form>
                    )}
                    <div style={{display: 'flex', alignSelf: 'flex-start'}}>
                        <button className="icon-btn" onClick={toggleAddBudgetItem}>
                            📝
                        </button>
                        <button className="icon-btn" onClick={handleDeleteBudgetCategory}>
                            ✖️
                        </button>
                    </div>
                </div>
                <div className="budgettable">
                    {props.budgetDetails.BudgetItems.map((budgetItem, i) => {
                        return (
                            <Budgetcarditem 
                                key={i} 
                                isEditing={addItem}
                                
                                description={budgetItem.description} 
                                price={budgetItem.price} 
                                itemId={budgetItem.id}

                                deleteHandler={props.itemDeleteHandler}
                                editHandler={props.itemUpdateHandler}
                            />
                        )
                    })}
                    <form 
                        style={{display: addItem === true ? 'flex' : 'none'}} 
                        onSubmit={handleAddBudgetItem}
                        className="budgettable-item"
                    >
                        <div className="budgettable-item-left">
                            <input
                                type="text"
                                placeholder="Enter item..."
                                value={newItemValue}
                                required
                                onChange={(e) => {
                                    e.preventDefault();
                                    setNewItemValue(e.target.value);
                                }}
                        />
                        </div>
                        <div className="budgettable-item-right">
                            <input
                                type="number"
                                placeholder="Enter price..."
                                step="0.01"
                                value={newItemPrice}
                                required
                                onChange={(e) => {
                                    e.preventDefault();
                                    setNewItemPrice(e.target.value);
                                }}
                            />
                            <input type="submit" style={{display: 'none'}} />
                            <button className="icon-btn" onClick={toggleAddBudgetItem}>
                                ✖️
                            </button>
                        </div>
                    </form>
                    <div className="budgettable-item-total">
                        <strong>{findCardTotal(props.budgetDetails)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}