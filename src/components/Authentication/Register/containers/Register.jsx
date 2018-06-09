import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import Yup from 'yup'

import RegisterForm from '../views/RegisterForm'
import { registerMutation } from '../graphql'

class RegisterContainer extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return <RegisterForm {...this.props} />
	}
}

export default compose(
	withRouter,
	graphql(registerMutation),
	withFormik({
		mapPropsToValues: () => ({ email: '', username: '', password: '' }),
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required()
				.email()
				.trim(),
			username: Yup.string()
				.required()
				.trim(),
			password: Yup.string()
				.required()
				.trim()
		}),
		async handleSubmit(
			values,
			{
				props: { history, mutate },
				setSubmitting,
				setErrors,
				resetForm
			}
		) {
			const response = await mutate({
				variables: {
					email: values.email,
					username: values.username,
					password: values.password
				}
			})
			const {
				data: {
					register: { ok, errors }
				}
			} = response

			if (ok) {
				history.push({
					pathname: '/login',
					state: {
						message: `Registration was successful, confirmation has been sent to your email - ${
							values.email
						}`
					}
				})
			} else {
				setSubmitting(false)
				setErrors({
					email: /email/.test(errors[0].message) ? errors[0].message : '',
					username: /username/.test(errors[0].message) ? errors[0].message : '',
					password: ''
				})
			}
		}
	})
)(RegisterContainer)
