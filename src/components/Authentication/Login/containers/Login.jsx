import React, { Component } from 'react'
import { withFormik } from 'formik'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Yup from 'yup'
import { Message } from 'semantic-ui-react'

import LoginForm from '../views/LoginForm'
import { LoginMutation } from '../graphql'
import { fetchUserRequest, fetchUserFailure, fetchUserSuccess } from '../actions'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { errors, location } = this.props
		return (
			<div>
				{location.state != undefined ? (
					<Message>
						<p>{location.state.message}</p>
					</Message>
				) : null}
				<LoginForm {...this.props} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	state
})

const mapDispatchToProps = dispatch => ({
	fetchUser: () => dispatch(fetchUserRequest()),
	fetchFailure: () => dispatch(fetchUserFailure()),
	fetchSuccess: user => dispatch(fetchUserSuccess(user))
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter,
	graphql(LoginMutation),
	withFormik({
		mapPropsToValues: () => ({ email: '', password: '' }),
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required()
				.email()
				.trim(),
			password: Yup.string()
				.required()
				.trim()
		}),
		handleSubmit: async (
			values,
			{
				props: { mutate, history, fetchUser, fetchFailure, fetchSuccess },
				setSubmitting,
				setErrors,
				resetForm
			}
		) => {
			// fetchUser()
			const response = await mutate({
				variables: {
					email: values.email,
					password: values.password
				}
			})

			const {
				data: {
					login: { ok, token, refreshToken, errors, user }
				}
			} = response

			if (ok) {
				fetchSuccess({
					...user
				})
				localStorage.setItem('token', token)
				localStorage.setItem('refreshToken', refreshToken)
				history.push(`/profile/${user.username}`)
			} else {
				fetchFailure()
				setSubmitting(false)
				setErrors({
					email: /email/.test(errors[0].message) ? errors[0].message : '',
					password: /Password/.test(errors[0].message) ? errors[0].message : ''
				})
				// resetForm()
			}
			// setSubmitting(false)
			// history.push('/')
		}
	})
)(Login)
