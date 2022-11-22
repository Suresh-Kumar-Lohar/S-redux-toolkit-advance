import Card from '../UI/Card'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((each) => (
          <CartItem
            key={each.id}
            item={{
              id: each.id,
              title: each.name,
              quantity: each.quantity,
              total: each.totalPrice,
              price: each.price,
            }}
          />
        ))}
      </ul>
    </Card>
  )
}

export default Cart
