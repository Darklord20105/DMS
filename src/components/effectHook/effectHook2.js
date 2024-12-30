import { useState, useEffect } from 'react';

const products = [
    'Death Star',
    'CR90 corvette',
    'Millennium Falcon',
    'X-wing fighter',
    'TIE fighter'
];

export function UseCaseAnimation(props) {
    const [cart, setCart] = useState([]);
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    // Add item to the cart (array)
    const clickHandler = e => {
        e.preventDefault();
        setCart(prevCart => {
            const newCart = [...prevCart];
            newCart.push(e.target.value);
            return newCart;
        });
    };

    // Clear the cart (array)
    const clearHandler = e => {
        e.preventDefault();
        setCart([]);
    };

    // Trigger cart animation
    useEffect(() => {
        setTriggerAnimation(true);

        const timer = setTimeout(() => {
            setTriggerAnimation(false);
        }, 900); // The duration of the animation defined in the CSS file

        // Clear the timer before setting a new one
        return () => {
            clearTimeout(timer);
        };
    }, [cart]);


    const itemsOnSale = products.map(itemOnSale => {
        return <li><form><span>{itemOnSale}  <button onClick={clickHandler} value={`"${itemOnSale}"`}>Add to cart</button></span></form></li >;
    });

    const cartItems = cart.map(item => {
        return <li>{item}</li>;
    });

    return (
        <>
            <hr />
            <h2>useEffect use case</h2>
            <h3>Running on state change: trigger animation on new array value</h3>
            <h4 style={{ color: 'blue' }}>Starship Marketplace</h4>
            <ul>
                {itemsOnSale}
            </ul>
            <div><span>Cart</span></div>
            <div>
                <p>Elements in cart:</p>
                <ul>
                    {cartItems}
                </ul>
            </div>
            <form><button onClick={clearHandler} value="clear">Clear cart</button></form>
        </>
    );
};

