import React, { useState } from 'react';

// LOCAL IMPORTS
import './Budgetcarditem.css';

export default function Budgetcarditem(props) {
    // STATE VARIABLES
    // --------------------
    const [item, setItem] = useState(props.description);
    const [amount, setAmount] = useState(props.price);

    const handleEditSubmit = (e) => {
        e.preventDefault();

        // only submit in editor mode
        if (props.isEditing) {
            // build body
            const body = {
                description: item,
                price: amount,
            }
    
            // send body to parent element for backend submission
            props.editHandler(props.itemId, body);
        };
    }

    return (
        <form
            className="budgettable-item"
            onSubmit={handleEditSubmit}
        >
            <div className="budgettable-item-left">
                {props.isEditing === false ? (
                    <p>{props.description}</p>
                ) : (
                    <input
                        type="text"
                        required
                        value={item}
                        onChange={(e) => {
                            e.preventDefault();
                            setItem(e.target.value);
                        }}
                    />
                )}
            </div>
            <div className="budgettable-item-right">
                {props.isEditing === false ? (
                    <p>{props.price}</p>
                ) : (
                    <input
                        type="number"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => {
                            e.preventDefault();
                            setAmount(e.target.value);
                        }}
                    />
                )}
                <input type="submit" style={{display: 'none'}} />
                <button 
                    style={{display: props.isEditing === true ? 'block' : 'none'}} 
                    className="icon-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        // pass data-id up to parent
                        props.deleteHandler(props.itemId);
                    }}
                >
                    ✖️
                </button>
            </div>
        </form>
    );
}