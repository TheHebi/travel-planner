import React, { useState } from 'react';

export default function Budgetcarditem({ isEditing, description, price, itemId, deleteHandler, editHandler}) {
    // STATE VARIABLES
    // --------------------
    const [item, setItem] = useState(description);
    const [amount, setAmount] = useState(price);

    const handleEditSubmit = (e) => {
        e.preventDefault();

        // only submit in editor mode
        if (isEditing) {
            // build body
            const body = {
                description: item,
                price: amount,
            }
    
            // send body to parent element for backend submission
            editHandler(itemId, body);
        };
    }

    return (
        <form
            className="budgettable-item"
            onSubmit={handleEditSubmit}
        >
            {isEditing === false ? (
                <p>{description}</p>
            ) : (
                <input
                    type="text"
                    required
                    defaultValue={description}
                    onChange={(e) => {
                        e.preventDefault();
                        setItem(e.target.value);
                    }}
                />
            )}
            <div className="budgettable-item-right">
                {isEditing === false ? (
                    <p>{price}</p>
                ) : (
                    <input
                        type="number"
                        step="0.01"
                        required
                        defaultValue={price}
                        onChange={(e) => {
                            e.preventDefault();
                            setAmount(e.target.value);
                        }}
                    />
                )}
                <input type="submit" style={{display: 'none'}} />
                <button 
                    style={{display: isEditing === true ? 'block' : 'none'}} 
                    className="icon-btn"
                    data-id={itemId}
                    onClick={(e) => {
                        e.preventDefault();
                        // pass data-id up to parent
                        deleteHandler(e.target.getAttribute('data-id'));
                    }}
                >
                    ✖️
                </button>
            </div>
        </form>
    );
}