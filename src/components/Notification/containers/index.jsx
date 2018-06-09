import React, { Component, Fragment } from 'react'
import { compose, graphql, Subscription } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'

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
		// const {
		// 	data: { getProfile }
		// } = this.props

		return (
			<ToastContainer>
				<Subscription subscription={friendRequestNotification}>
					{({ data, loading }) => {
						return toast(<ToastNotification />)
					}}
				</Subscription>
			</ToastContainer>
		)
	}
}

export default compose(
	withRouter
	// graphql(notification, {
	// 	options: props => ({
	// 		variables: {
	// 			username: props.username
	// 		}
	// 	})
	// }),
	// LoadingComponent(props => props.data.loading, CircularSpinner)
)(NotificationContainer)
