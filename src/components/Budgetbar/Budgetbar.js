import React from 'react';

// LOCAL IMPORTS
import './Budgetbar.css';

export default function Budgetbar() {
    return (
        <div className="budgetbar">
            <div className="budgetbar-item" style={{background: 'green', width: '34%', borderRadius: '3px 0 0 3px'}} />
            <div className="budgetbar-item" style={{background: 'orange', width: '12%'}} />
            <div className="budgetbar-item" style={{background: 'blue', width: '24%', borderRadius: '0 3px 3px 0'}} />
        </div>
    )
}