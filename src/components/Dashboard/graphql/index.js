import gql from 'graphql-tag'

export const getProfile = gql`
	query($username: String!) {
		getProfile(username: $username) {
			ok
			errors {
				path
				message
			}
			profile {
				email
				username
				createdAt
				updatedAt
				role
				avatar_url {
					url
				}
			}
		}
	}
`
