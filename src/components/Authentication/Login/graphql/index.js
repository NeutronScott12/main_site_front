import gql from 'graphql-tag'

export const LoginMutation = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			user {
				online
				id
				username
				email
				online
				createdAt
				role
			}
			token
			refreshToken
			errors {
				path
				message
			}
		}
	}
`
