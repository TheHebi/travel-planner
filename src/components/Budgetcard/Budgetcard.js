import React, { useState } from 'react';

// LOCAL IMPORTS
import './Budgetcard.css';
import Budgetcarditem from '../Budgetcarditem/Budgetcarditem';

export default function Budgetcard({ budgetDetails, deleteHandler, addHandler, editHandler, deleteItemHandler, editItemHandler }) {
    // SET STATES
    // ---------------
    const [addItem, setAddItem] = useState(false);
    const [title, setTitle] = useState(budgetDetails.description)
    const [newItemValue, setNewItemValue] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');

    const findCardTotal = (data) => {
        let budgetItemSum = 0;
        for (let i=0; i<data.BudgetItems.length; i++) {
            budgetItemSum += data.BudgetItems[i].price;
        }
        return budgetItemSum
    }

    // toggle add budget item form
    const toggleAddBudgetItem = (e) => {
        e.preventDefault();
        setAddItem(!addItem);
    }

    // BUDGET ITEM METHODS
    // ---------------------------

    // handle adding a budget item
    const handleAddBudgetItem = (e) => {
        e.preventDefault();
        
        addHandler({
            BudgetCategoryId: e.target.getAttribute('data-id'),
            description: newItemValue,
            price: newItemPrice,
        });
        setNewItemValue('');
        setNewItemPrice('');
    }

    // handle deleting a budget item
    const handleDeleteItem = (itemId) => {
        deleteItemHandler(itemId);
    }

    // handle editing a budget item
    const handleEditItem = (itemId, body) => {
        editItemHandler(itemId, body);
        setAddItem(false);
    }

    // BUDGET CATEGORY METHODS
    // ---------------------------

    // handle deleting a budget category
    const handleDeleteBudgetCategory = (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you'd like to delete this category?`)) {
            deleteHandler(e.target.getAttribute('data-id'));
        } else {
        }
    }

    const handleEditBudgetCategory = (e) => {
        e.preventDefault();

        // build body
        const body = {
            description: e.target.children[0].value,
        }
        // push to parent
        editHandler(budgetDetails.id, body);
        setAddItem(false);
    }

    return (
        <div>
            <div className="budgetcard">
                <div className="header-wrapper">
                    {addItem === false ? (
                        <h3>{title}</h3>
                    ) : (
                        <form
                            onSubmit={handleEditBudgetCategory}
                        >
                            <input
                                className="budget-input-title"
                                type="text"
                                required
                                defaultValue={budgetDetails.description}
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
                        <button className="icon-btn" data-id={budgetDetails.id} onClick={handleDeleteBudgetCategory}>
                            ✖️
                        </button>
                    </div>
                </div>
                <div className="budgettable">
                    {budgetDetails.BudgetItems.map((budgetItem, i) => {
                        return (
                            <Budgetcarditem 
                                key={i} 
                                isEditing={addItem} 
                                description={budgetItem.description} 
                                price={budgetItem.price} 
                                itemId={budgetItem.id}
                                deleteHandler={handleDeleteItem}
                                editHandler={handleEditItem}
                            />
                        )
                    })}
                    <form 
                        style={{display: addItem === true ? 'flex' : 'none'}} 
                        data-id={budgetDetails.id} 
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
                        <strong>{findCardTotal(budgetDetails)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}