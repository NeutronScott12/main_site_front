import React, { Component } from 'react'
import { withFormik } from 'formik'
import { graphql, compose } from 'react-apollo'
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

class ForgotPassword extends Component {
	state = {}
	render() {
		const { handleSubmit, handleBlur, handleChange, errors, touched, classes } = this.props
		return (
			<div className={classes.container}>
				<form className={classes.form} onSubmit={handleSubmit}>
					{errors.formError && <div>{errors.formError}</div>}
					{errors.response && <div>{errors.response}</div>}
					{errors.email && touched.email && <div>{errors.email}</div>}
					<TextField
						error={errors.email}
						type="text"
						name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						label="Email"
					/>
					<Button type="submit">Submit</Button>
				</form>
			</div>
		)
	}
}

const ForgotPasswordMutation = gql`
	mutation($email: String!) {
		forgotPassword(email: $email) {
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
	graphql(ForgotPasswordMutation),
	withFormik({
		mapPropsToValues: props => ({ email: '' }),
		validate(values) {
			const errors = {}

			if (!values.email) {
				errors.email = 'Email Required'
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email adress'
			}

			return errors
		},
		async handleSubmit({ email }, { props, setErrors, setSubmitting }) {
			const {
				data: {
					forgotPassword: { errors, ok, result }
				}
			} = await props.mutate({
				variables: {
					email
				}
			})

			if (ok) {
				setErrors({
					response: result
				})
			} else {
				setErrors({
					formError: result
				})
			}
		}
	})
)(ForgotPassword)
