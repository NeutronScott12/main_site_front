import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

class AuthConfirmation extends Component {
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
				AuthConfirmation: { ok, result }
			}
		} = await this.props.mutate({
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
		const { result, ok } = this.state
		return (
			<div>
				{result ? (
					<h4>
						{ok ? (
							<div>
								{result}, you are now are able to log in{' '}
								<Link to="/login">Login</Link>{' '}
							</div>
						) : (
							<div>{result}, please check your email, or send a new token</div>
						)}
					</h4>
				) : (
					<div>Processing...</div>
				)}
			</div>
		)
	}
}

const ConfirmationMutation = gql`
	mutation($token: String!) {
		AuthConfirmation(token: $token) {
			ok
			result
			errors {
				path
				message
			}
		}
	}
`

export default graphql(ConfirmationMutation)(AuthConfirmation)
