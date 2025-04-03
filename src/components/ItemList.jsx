import React, { useState, useEffect } from "react";
import Item from "./Item";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const API_URI = `https://${import.meta.env.VITE_API_URI}/doors`;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URI);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchItems();
    }, [API_URI]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URI}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the item');
            }
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            {error && <p>{error}</p>}
            {items.map((item) => (
                <Item key={item.id} item={item} onDelete={handleDelete} />
            ))}
        </>
    );
};

export default ItemList;
