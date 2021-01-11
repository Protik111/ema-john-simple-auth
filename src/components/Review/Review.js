import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([])
    const [placedOrder, setPlacedOrder] = useState(false)

    const history  = useHistory();
    const handleProceedCheckout = () =>{
        history.push('/shipment');
    }
    const removeProduct = (productKey) => {
        // console.log("removed", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
    
        

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    let thankYou;
    if(placedOrder) {
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
            <div className="products-container">
                {/* <h1>{cart.length} orders available</h1> */}
                {
                    cart.map(pd => <ReviewItems removeProduct={removeProduct} product={pd}></ReviewItems>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="cart-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;