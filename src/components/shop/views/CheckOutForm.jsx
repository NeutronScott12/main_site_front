import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose, graphql } from 'react-apollo'
import Yup from 'yup'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'

import FormBuilder from '../../utils/Formbuilder'

import { checkout } from '../graphql'

const CURRENCY = 'GBP'
const stripeKey = 'pk_test_3YdcQR16ACBUKpQRP5ieV0nV'

class CheckOutForm extends Component {
	_token = (total, description) => token => {
		const itemArray = this.props.cart.map(cart => {
			return {
				description: cart.name,
				amount: cart.price,
				quantity: cart.quantity
			}
		})

		this.props
			.mutate({
				variables: {
					email: token.email,
					token: token.id,
					currency: CURRENCY,
					total,
					items: itemArray,
					metadata: {
						last4: token.card.last4,
						card_id: token.card.id,
						created: token.created,
						address_city: token.card.address_city,
						address_country: token.card.address_country,
						address_state: token.card.address_state,
						address_line1: token.card.address_line1,
						address_line1_check: token.card.address_line1_check,
						address_postcode: token.card.address_zip,
						address_postcode_check: token.card.address_zip_check,
						brand: token.card.brand,
						exp_month: token.card.exp_month,
						exp_year: token.card.exp_year,
						name: token.card.name
					}
				}
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { user, total } = this.props

		return (
			<div>
				<StripeCheckout
					name={user.email}
					description="User Purchase"
					amount={parseInt(total) * 100}
					token={this._token(total, 'bed')}
					currency={CURRENCY}
					billingAddress={true}
					zipCode={true}
					stripeKey={stripeKey}
					shippingAddress
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.loginReducer
})

export default compose(injectStripe, graphql(checkout), connect(mapStateToProps))(CheckOutForm)
