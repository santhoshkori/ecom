// Write your code here

import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

class CartSummary extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          console.log(cartList)
          const amount = cartList.reduce(
            (total, valuer) => total + valuer.price * valuer.quantity,
            0,
          )

          return (
            <div className="cartsummcont">
              <h1>{`Order Total:${amount}`}</h1>
              <p>{`${cartList.length} items in cart`}</p>
              <button type="button" className="checkoutbutton">
                Checkout
              </button>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartSummary
