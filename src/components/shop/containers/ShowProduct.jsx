import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { Segment, Image, Button } from 'semantic-ui-react'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import PurchaseContainer from './PurchaseContainer'

import { showProduct } from '../graphql'

class ShowProduct extends Component {
	render() {
		const {
			data: { showProduct }
		} = this.props
		return (
			<Segment.Group>
				<Segment>{showProduct.name}</Segment>
				<Segment>
					<PurchaseContainer {...this.props} />
				</Segment>
				<Segment>
					<Image src={showProduct.picture.url} fluid />
				</Segment>
				<Segment.Group horizontal>
					<Segment>Price: £{showProduct.price / 100}</Segment>
					<Segment>Stock: {showProduct.stock}</Segment>
					{/* <Segment>Seller: {showProduct.seller.username}</Segment> */}
				</Segment.Group>
			</Segment.Group>
		)
	}
}

export default compose(
	withRouter,
	graphql(showProduct, { options: props => ({ variables: { slug: props.match.params.slug } }) }),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(ShowProduct)
