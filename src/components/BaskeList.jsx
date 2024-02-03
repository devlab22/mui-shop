import BasketItem from './BasketItem';

const BasketList = (props) => {
    const { order, setOrder } = props;

    if (!order.length) {
        return (
            <ul className='basket list-group col-md-4'>
                <li className='list-group-item active'>Warenkorb</li>
                <li className='list-group-item'>keine Waren</li>
            </ul>
        );
    }

    return (
        <ul className='basket list-group col-md-4'>
            <li className='list-group-item active'>Корзина</li>
            {order.map((item, index) => (
                <BasketItem key={index} setOrder={setOrder} {...item} />
            ))}
            <li className='list-group-item active'>
                Gesamtpreis:{' '}
                {order.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                }, 0)}{' '}
                EUR.
            </li>
        </ul>
    );
};

export default BasketList;
