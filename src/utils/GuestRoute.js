import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

const GuestRoute = ({ fetching, isAuthenticated, component: Component, user, ...rest }) =>
	fetching ? null : (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={`/profile/${user.username}`} />
				)
			}
		/>
	)

const mapStateToProps = state => ({
	isAuthenticated: state.loginReducer.logged_in,
	user: state.loginReducer,
	fetching: state.loginReducer.fetching
})

export default compose(withRouter, connect(mapStateToProps))(GuestRoute)
