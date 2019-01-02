import React, { Component, Fragment } from 'react'
import { compose, graphql, Subscription } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import { notification, batchSubscriptions, friendRequestNotification } from '../graphql'

const ToastNotification = () => (
	<div>
		<p>Notification</p>
	</div>
)

class NotificationContainer extends Component {
	render() {
		const {
			// data: { getProfile }
			user
		} = this.props

		console.log('NOTIFICATION RUNNING')

		return (
			<ToastContainer>
				<Subscription
					variables={{ userId: user.id }}
					subscription={friendRequestNotification}
				>
					{({ data, loading }) => {
						console.log('DATA', data)
						return toast(<ToastNotification />)
					}}
				</Subscription>
			</ToastContainer>
		)
	}
}

const mapStateToProps = state => ({
	user: state.loginReducer
})

export default compose(
	withRouter,
	connect(mapStateToProps)
	// graphql(notification, {
	// 	options: props => ({
	// 		variables: {
	// 			username: props.username
	// 		}
	// 	})
	// }),
	// LoadingComponent(props => props.data.loading, CircularSpinner)
)(NotificationContainer)
