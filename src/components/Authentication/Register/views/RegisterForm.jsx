import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import FormBuilder from '../../../utils/Formbuilder'

const styles = _ => ({
	container: {
		margin: 'auto',
		display: 'grid',
		gridGap: '100px',
		width: '80%',
		gridAutoFlow: 'column',
		alignItems: 'center'
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	}
})

const RegisterView = props => {
	return (
		<div>
			<FormBuilder
				{...props}
				formInputs={[
					{
						label: 'Username',
						type: 'text',
						name: 'username',
						placeholder: 'abc123'
					},
					{
						label: 'Email',
						type: 'text',
						name: 'email',
						placeholder: 'abc123'
					},
					{
						label: 'Password',
						type: 'password',
						name: 'password',
						placeholder: 'example123'
					}
				]}
			/>
			{/* <form onSubmit={handleSubmit} className={classes.form}>
				{touched.email &&
					touched.username &&
					errors.length > 0 && (
						<div>
							{errors.map((error, i) => {
								return <div key={i}>{error.message}</div>
							})}
						</div>
					)} */}
			{/* {touched.username && errors.username && <div>{errors.username}</div>}
				<TextField
					label="Username"
					type="text"
					name="username"
					placeholder="abc123"
					onChange={handleChange}
					onBlur={handleBlur}
					value={username}
				/>
				{touched.email && errors.email && <div>{errors.email}</div>}
				<TextField
					label="Email"
					type="text"
					name="email"
					error={errors.email ? true : false}
					placeholder="abc123@example.com"
					onChange={handleChange}
					onBlur={handleBlur}
					value={email}
				/>
				{touched.password && errors.password && <div>{errors.password}</div>}
				<TextField
					label="Password"
					type="password"
					name="password"
					placeholder="example123"
					onChange={handleChange}
					onBlur={handleBlur}
					value={password}
				/>
				<Button type="submit" disabled={isSubmitting}>
					Register
				</Button> */}
			{/* </form> */}
		</div>
	)
}

RegisterView.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
	touched: PropTypes.object.isRequired,
	values: PropTypes.shape({
		email: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired
	})
}

export default withStyles(styles)(RegisterView)
