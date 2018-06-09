import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Button } from 'semantic-ui-react'

import PurchaseModal from '../views/modals/PurchaseModal'
import { updateCart } from '../graphql'

class PurchaseContainer extends Component {
	_updateCart = () => {
		const {
			data: { showProduct }
		} = this.props

		this.props.mutate({
			variables: {
				id: showProduct.id,
				name: showProduct.name,
				price: parseInt(showProduct.price),
				url: showProduct.picture.url,
				quantity: 1,
				total: showProduct.price
			}
		})
	}

	render() {
		return (
			<div>
				<Button onClick={this._updateCart}>Add To Cart</Button>
			</div>
		)
	}
}

export default graphql(updateCart)(PurchaseContainer)
