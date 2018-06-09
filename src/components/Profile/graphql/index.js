import gql from 'graphql-tag'

export const friendReject = gql`
	mutation($id: ID!) {
		friendReject(id: $id, friendRequestId: $friendRequestId)
	}
`

export const profileOrderQuery = gql`
	query($username: String!) {
		getProfile(username: $username) {
			ok
			errors {
				path
				message
			}
			profile {
				orders {
					id
					items {
						id
						amount
						description
						quantity
					}
					email
					currency
					payments {
						id
						status
						reference
					}
				}
				id
				username
				confirmed
			}
		}
	}
`

export const profileQuery = gql`
	query($username: String!, $email: String) {
		getProfile(username: $username, email: $email) {
			ok
			profile {
				orders {
					id
					items {
						id
						amount
					}
					email
					currency
					payments {
						id
						status
						reference
					}
				}
				id
				username
				confirmed
				avatar_url {
					url
				}
				online
				products {
					id
				}
				friends {
					id
					username
					avatar_url {
						url
					}
				}
				friend_requests {
					edges {
						cursor
						node {
							id
							userId
							friend_request {
								username
								id
							}
						}
					}
				}
				createdAt
				updatedAt
				blogs {
					id
					title
					published
					slug
					short_description
					body
					createdAt
					updatedAt
					author {
						id
						username
					}
				}
			}
			errors {
				path
				message
			}
		}
	}
`

export const personalBlogs = gql`
	query($id: ID!, $limit: Int!, $skip: Int!) {
		personalBlogs(id: $id, limit: $limit, skip: $skip) {
			blogs {
				id
				title
				published
				slug
				short_description
				author {
					id
					username
				}
				category
				updatedAt
				createdAt
			}
		}
	}
`

export const friendRequestMutation = gql`
	mutation($requester: ID!, $requested: ID!) {
		friendRequest(requester: $requester, requested: $requested) {
			ok
			errors {
				path
				message
			}
		}
	}
`

export const friendResponseMutation = gql`
	mutation($id: ID!) {
		friendResponse(id: $id) {
			ok
			errors {
				path
				message
			}
		}
	}
`
