import React from 'react';

// LOCAL IMPORTS
import './Budgetbar.css';

export default function Budgetbar({ budget }) {
    return (
        <div className="budgetbar">
            {budget.budgetCategories.map((budgetCategory, index) => {
                let categoryTotal = 0;
                for (let i=0; i<budgetCategory.items.length; i++) {
                    categoryTotal += budgetCategory.items[i].price
                };
                const percentage = Math.floor(categoryTotal/budget.budget*100) + '%';

                if (index === 0) {
                    return <div className="budgetbar-item" style={{background: 'green', width: percentage, borderRadius: '3px 0 0 3px'}} key={index}/>
                } else if (index === budget.budgetCategories.length-1) {
                    return <div className="budgetbar-item" style={{background: 'blue', width: percentage, borderRadius: '0 3px 3px 0'}} key={index} />
                } else {
                    return <div className="budgetbar-item" style={{background: 'orange', width: percentage}} key={index} />
                }
            })}
        </div>
    )
}