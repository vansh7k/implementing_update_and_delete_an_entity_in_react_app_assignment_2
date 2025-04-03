import React from "react";

const Item = ({ item, onDelete }) => {
    return (
        <div>
            <h3>{item.name}</h3>
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
    );
};

export default Item;
