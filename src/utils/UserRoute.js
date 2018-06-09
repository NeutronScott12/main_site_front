import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { compose } from 'react-apollo'

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
	/>
)

const mapStateToProps = state => ({
	isAuthenticated: state.loginReducer.logged_in
})

export default compose(withRouter, connect(mapStateToProps))(UserRoute)
