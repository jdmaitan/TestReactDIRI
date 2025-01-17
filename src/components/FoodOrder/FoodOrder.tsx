import React, { MouseEventHandler, useContext, useState } from 'react';
import { MenuItem } from '../../entities/entities';
import "./FoodOrder.css";
import { foodItemsContext } from '../../App';

interface FoodOrderProps
{
    food: MenuItem;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps)
{
    const [quantity, setQuantity] = useState(1);
    const [orderSent, setOrderSent] = useState(false);

    const menuItems: MenuItem[] = useContext(foodItemsContext);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity);
    };

    const handleSubmitOrder = () =>
    {
        menuItems.map((item: MenuItem) =>
        {
            if(item.id === props.food.id)
            {
                item.quantity = item.quantity - quantity;
            }
        });

        setOrderSent(true);
    };

    return (
        <div className="food-order-container">

            <div className="food-details">
                <h4>{props.food.name}</h4>
                <div className="food-image-container">
                    <img src={`/images/${props.food.image}`}
                        alt={props.food.name}
                        className="food-image" />
                </div>
                <p>{props.food.desc}</p>
                <p className="food-price">{(props.food.price * quantity).toFixed(2)}€</p>
                <div className="quantity-controls">
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                    />
                </div>

                <div className="buttons-container">
                    <button className="order-button"
                        onClick={handleSubmitOrder}
                        disabled={orderSent}>
                        {orderSent ? "Pedido enviado" : "Enviar pedido"}
                    </button>

                    <button onClick={props.onReturnToMenu}
                        className="return-button">
                        Volver al menú
                    </button>
                </div>

                {orderSent && <p className="order-confirmation">Pedido enviado. Recibirá un SMS una vez esté listo para recoger.</p>}
            </div>
        </div>
    );
}

export default FoodOrder;