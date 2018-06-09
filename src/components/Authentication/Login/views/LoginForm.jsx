import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import FormBuilder from '../../../utils/Formbuilder'

const styles = _ => ({
	container: {
		margin: 'auto',
		display: 'grid',
		gridGap: '1rem',
		width: '80%',
		alignItems: 'center'
	}
})

const LoginForm = props => {
	return (
		<div>
			<FormBuilder
				{...props}
				formInputs={[
					{
						name: 'email',
						type: 'text',
						label: 'Email',
						placeholder: 'example@example.com'
					},
					{
						name: 'password',
						type: 'password',
						label: 'Password',
						placeholder: 'example123'
					}
				]}
			/>
			<div className={props.classes.container}>
				<Link to="/forgot_password">Forgotten Password</Link>
			</div>
		</div>
	)
}

LoginForm.propTypes = {
	values: PropTypes.shape({
		email: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired
	}),
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginForm)
