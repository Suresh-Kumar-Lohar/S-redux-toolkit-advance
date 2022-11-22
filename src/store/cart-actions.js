import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch('https://money-f2b15.firebaseio.com/cart.json')
      if (!res.ok) {
        throw new Error('could not fetch cart data !')
      }
      const data = await res.json()

      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(cartActions.replaceCart(cartData))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Sending cart data failed!',
        })
      )
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    )

    const sendRequest = async () => {
      const res = await fetch('https://money-f2b15.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      })

      if (!res.ok) {
        throw new Error('Sending cart data failed.')
      }
    }
    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success...',
          message: 'Set cart data successfully!',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Sending cart data failed!',
        })
      )
    }
  }
}
