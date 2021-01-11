import React from 'react';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.product;
    const removeProduct = props.removeProduct;
    const reviewStyle = {
        borderBottom : '1px solid lightgrey',
        marginBottom : '5px',
        paddingBottom : '5px',
        marginLeft : '200px',
    }
    return (
        <div style={reviewStyle} className="review-item">
            <p className="product-name">{name}</p>
           <p>Quantity : {quantity}</p>
            <p><small> ${price}</small></p>
           <br/>
           <button onClick={ () => removeProduct(key)} className="cart-btn">Remove</button>
        </div>
    );
};

export default ReviewItems;