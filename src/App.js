import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    if (cartList.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const istrue = cartList.find(c => c.id === product.id)

      if (istrue !== undefined) {
        cartList.map(eachmatch => {
          if (product.id === eachmatch.id) {
            this.setState(prevState => ({
              cartList: prevState.cartList.map(eachcli => {
                if (eachcli.id === product.id) {
                  return {...eachcli, quantity: eachcli.quantity + 1}
                }
                return eachcli
              }),
            }))
          }
          return eachmatch
        })
      } else {
        this.setState(prevState => ({
          cartList: [...prevState.cartList, product],
        }))
      }
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterderlist = cartList.filter(eachdeleted => eachdeleted.id !== id)
    this.setState({cartList: filterderlist})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    cartList.map(eachdec => {
      if (eachdec.id === id) {
        if (eachdec.quantity === 1) {
          const filterderlist = cartList.filter(
            eachdeleted => eachdeleted.id !== id,
          )
          this.setState({cartList: filterderlist})
        } else {
          this.setState(prevState => ({
            cartList: prevState.cartList.map(eachli => {
              if (eachli.id === id && eachli.quantity > 1) {
                return {...eachli, quantity: eachli.quantity - 1}
              }
              return eachli
            }),
          }))
        }
      }
      return eachdec
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    cartList.map(eachdec => {
      if (eachdec.id === id) {
        this.setState(prevState => ({
          cartList: prevState.cartList.map(eachli => {
            if (eachli.id === id && eachli.quantity >= 1) {
              return {...eachli, quantity: eachli.quantity + 1}
            }
            return eachli
          }),
        }))
      }
      return eachdec
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
