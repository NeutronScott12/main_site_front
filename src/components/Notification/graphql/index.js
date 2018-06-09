import gql from 'graphql-tag'

// export const notification = gql`
// 	query($username: String!) {
// 		getProfile(username: $username) {
// 			ok
// 			profile {
// 				id
// 				username
// 				notifications {
// 					id
// 					comments {
// 						id
// 						body
// 						author {
// 							username
// 							id
// 						}
// 						createdAt
// 					}
// 					createdAt
// 					updatedAt
// 				}
// 			}
// 		}
// 	}
// `

export const batchSubscriptions = gql`
	subscription commentNotification {
		commentNotification {
			node {
				id
				pageId
				parentId
				repliedTo
				author {
					username
				}
			}
		}
	}
`

export const friendRequestNotification = gql`
	subscription {
		friendRequestSubscription {
			mutation
			node {
				id
				userId
				friend_request {
					username
					id
					avatar_url {
						url
					}
				}
			}
		}
	}
`
