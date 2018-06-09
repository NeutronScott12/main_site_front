import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'
import { profileOrderQuery } from '../graphql'

import { OrdersLayout } from '../styles'

class OrderContainer extends Component {
	render() {
		const {
			data: { getProfile }
		} = this.props

		return getProfile.profile.orders.length < 0 ? (
			<div>Currently no orders</div>
		) : (
			<div>
				<h4>Orders</h4>
				{getProfile.profile.orders.length <= 0 ? (
					<div>Currently no orders</div>
				) : (
					<OrdersLayout>
						{getProfile.profile.orders.map(order => {
							return (
								<div key={order.id}>
									<p>Currency: {order.currency}</p>
									{order.payments.map(payment => {
										return (
											<div key={payment.id}>
												<p>Order Reference: {payment.reference}</p>
												<p>Status: {payment.status}</p>
											</div>
										)
									})}
									{order.items.map(item => {
										return (
											<div key={item.id}>
												<p>Amount: {item.amount}</p>
												<p>Description: {item.Description}</p>
												<p>Quantity: {item.quantity}</p>
											</div>
										)
									})}
								</div>
							)
						})}
					</OrdersLayout>
				)}
			</div>
		)
	}
}

export default compose(
	graphql(profileOrderQuery, {
		options: props => ({ variables: { username: props.match.params.username } })
	}),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(OrderContainer)
