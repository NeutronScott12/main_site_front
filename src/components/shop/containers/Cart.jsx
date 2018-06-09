import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Elements } from 'react-stripe-elements'
import { Segment, Button } from 'semantic-ui-react'

import CheckoutForm from '../views/CheckOutForm'
import { queryCart, addOne, removeOne, deleteOne } from '../graphql'

class CartContainer extends Component {
	state = {
		total: ''
	}

	_deleteOne = id => {
		const { deleteOne } = this.props

		deleteOne({
			variables: {
				id
			}
		})
	}

	_removeOne = id => {
		const { removeOne } = this.props

		removeOne({
			variables: {
				id
			}
		})
	}

	_addOne = id => {
		const { addOne } = this.props

		addOne({
			variables: {
				id
			}
		})
	}

	render() {
		const {
			data: { Cart }
		} = this.props

		const total = Cart.reduce((acc, value) => acc + parseInt(value.total), 0)

		return (
			<Segment>
				{Cart.length > 0 ? (
					<Segment.Group>
						{Cart.map(cart => {
							return (
								<Segment key={cart.id}>
									<p>{cart.name}</p>
									<p>Price: £{cart.total / 100}</p>
									<p>Quantity: {cart.quantity}</p>
									<Button onClick={() => this._addOne(cart.id)}>+</Button>
									<Button onClick={() => this._removeOne(cart.id)}>-</Button>
									<Button onClick={() => this._deleteOne(cart.id)}>Remove</Button>
								</Segment>
							)
						})}
					</Segment.Group>
				) : null}

				<div>
					<h5>Total: £{total / 100}</h5>
				</div>
				{total != 0 ? (
					<Elements>
						<CheckoutForm total={total} cart={Cart} />
					</Elements>
				) : null}
			</Segment>
		)
	}
}

export default compose(
	graphql(addOne, { name: 'addOne' }),
	graphql(deleteOne, { name: 'deleteOne' }),
	graphql(removeOne, { name: 'removeOne' }),
	graphql(queryCart)
)(CartContainer)
