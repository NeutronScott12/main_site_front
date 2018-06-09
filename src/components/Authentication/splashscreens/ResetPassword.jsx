import React, { Component } from 'react'
import { Formik } from 'formik'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = _ => ({
	container: {
		margin: 'auto',
		display: 'grid',
		gridGap: '100px',
		width: '60%',
		gridAutoFlow: 'column',
		alignItems: 'center'
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	}
})

class ResetPassword extends Component {
	state = {
		result: '',
		ok: false
	}

	async componentDidMount() {
		const token = this.props.location.search
			.split('')
			.slice(3, -1)
			.join('')

		const {
			data: {
				checkResetToken: { ok, result }
			}
		} = await this.props.checkToken({
			variables: {
				token: token
			}
		})

		if (ok) {
			this.setState({
				result,
				ok: true
			})
		} else {
			this.setState({
				result,
				ok: false
			})
		}
	}

	render() {
		const { handleSubmit, handleChange, handleBlur, errors, touched, classes } = this.props

		console.log(errors)

		return this.state.ok ? (
			<Formik
				initialValues={{
					password: '',
					passwordConfirmation: ''
				}}
				validate={values => {
					const errors = {}
					if (!values.password) {
						errors.password = 'Password is required'
					}
					if (!values.passwordConfirmation) {
						errors.passwordConfirmation = 'Confirmation Password is required'
					}

					if (values.password !== values.passwordConfirmation) {
						errors.passwordMatch = 'Both passwords much match'
					}

					return errors
				}}
				onSubmit={async ({ password }, { setSubmitting, setErrors }) => {
					const response = await this.props.resetPassword({
						variables: {
							email: this.state.result,
							password
						}
					})
				}}
				render={({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting
				}) => (
					<div className={classes.container}>
						<form className={classes.form} onSubmit={handleSubmit}>
							{errors.passwordMatch &&
								touched.password &&
								touched.passwordConfirmation && <div>{errors.passwordMatch}</div>}
							{touched.password && errors.password && <div>{errors.email}</div>}
							<TextField
								label="Password"
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							{touched.passwordConfirmation &&
								errors.passwordConfirmation && (
									<div>{errors.passwordConfirmation}</div>
								)}
							<TextField
								label="Password Confirmation"
								type="password"
								name="passwordConfirmation"
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							<Button type="submit" disabled={isSubmitting}>
								Submit
							</Button>
						</form>
					</div>
				)}
			/>
		) : (
			<div>Processing...</div>
		)
	}
}

const checkTokenResetMutation = gql`
	mutation($token: String!) {
		checkResetToken(token: $token) {
			ok
			result
			errors {
				path
				message
			}
		}
	}
`

const resetPasswordMutation = gql`
	mutation($email: String!, $password: String!) {
		resetPassword(email: $email, password: $password) {
			ok
			result
			errors {
				path
				message
			}
		}
	}
`

export default compose(
	withStyles(styles),
	graphql(checkTokenResetMutation, { name: 'checkToken' }),
	graphql(resetPasswordMutation, { name: 'resetPassword' })
)(ResetPassword)
