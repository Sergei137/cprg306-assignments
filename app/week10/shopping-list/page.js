// week10 page 

"use client";
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import {getItems, addItem } from "./_services/shopping-list-service"
import { useState, useEffect } from 'react';
import { useUserAuth } from "../_utils/auth-context";

// display shopping list page
function Page() {
    const { user } = useUserAuth();

    if (!user) {
        return <p>Please log in to view the shopping list.</p>;
    }

    const [items, setItems] = useState(itemsData); // set items to itemsData
    const [selectedItemName, setSelectedItemName] = useState(''); // set selectedItemName to empty string
    
    const handleAddItem = (newItem) => { 
        setItems(prevItems => [...prevItems, newItem]); // add new item to items
    };

    const handleItemSelect = (item) => {
        let itemName;
        let cleanName;
    
        if (item.name.includes(",")) {
            itemName = item.name.split(",");
            cleanName = itemName[0].trim();
        } else {
            itemName = item.name.split(" ");
            cleanName = itemName[0].trim();
        }
        let noEmoji = cleanName.replace(/[\u{1F600}-\u{1F6FF}]/gu, "");
        setSelectedItemName(noEmoji);
    };

    return(
        <main className="bg-red-300 p-10">
            <h2 className="text-center text-4xl font-bold border border-black bg-white rounded-md p-4 mb-4">Meal Ideas</h2>
            <br></br>
            <div>
                <NewItem onAddItem={handleAddItem} />
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <ItemList items={items} onItemSelect={handleItemSelect} />
                </div>
                {selectedItemName && (
                    <div className="w-1/2 mt-18 ml-4">
                        <MealIdeas ingredient={selectedItemName} />
                    </div>
                )} 
            </div>

        </main>
    );
}
export default Page;

