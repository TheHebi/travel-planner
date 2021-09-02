import React from 'react';

// LOCAL IMPORTS
import './Budgetbar.css';

export default function Budgetbar({ budgetTotal, budgetDetails }) {
    const colorArr = ['blue', 'yellow', 'red', 'green', 'orange', 'lightblue'];
    return (
        <div className="budgetbar">
            {budgetDetails ? (
                budgetDetails.BudgetCategories.map((budgetCategory, index) => {
                    let categoryTotal = 0;
                    for (let i=0; i<budgetCategory.BudgetItems.length; i++) {
                        categoryTotal += budgetCategory.BudgetItems[i].price
                    };
                    const percentage = (categoryTotal/budgetTotal*100) + '%';

                    return (
                        <div 
                        className="budgetbar-item" 
                        style={{
                            background: colorArr[(index % colorArr.length)], 
                            width: [percentage],
                            borderRadius: index === 0 ? '3px 0 0 3px' : (index === (budgetCategory.length - 1)) ? '0 3px 3px 0' : '0 0 0 0',
                        }} 
                        key={index}>
                            {budgetDetails.BudgetCategories[index].description}
                        </div>
                    )
                })
            ) : null}
        </div>
    )
}