import gql from 'graphql-tag'

export const messageSubscription = gql`
	subscription {
		messageSubscription {
			mutation
			node {
				id
				body
				url
				parentId
				filetype
				author {
					id
					username
					avatar_url {
						url
					}
				}
				createdAt
				updatedAt
			}
			updatedFields
			previousValues {
				id
				body
				createdAt
				updatedAt
			}
		}
	}
`

export const channelMessageSubscription = gql`
	subscription {
		channelMessage {
			id
		}
	}
`

export const searchTeamUsers = gql`
	query($teamId: ID!) {
		searchTeamUsers(teamId: $teamId) {
			id
			username
			avatar_url {
				url
			}
		}
	}
`

export const createMessage = gql`
	mutation($channelId: ID!, $body: String!, $url: String, $filetype: String) {
		createMessage(channelId: $channelId, body: $body, url: $url, filetype: $filetype) {
			message {
				id
				body
				url
				parentId
				filetype
				author {
					id
					username
				}
				createdAt
				updatedAt
			}
			errors {
				path
				message
			}
		}
	}
`

export const searchUsers = gql`
	query($username: String) {
		searchUsers(username: $username) {
			id
			username
		}
	}
`

export const addTeam = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			id
			name
			slug
			author {
				username
				id
			}
			channels {
				slug
			}
			createdAt
			updatedAt
		}
	}
`

export const addChannelMember = gql`
	mutation($userId: ID!, $teamId: ID!, $channelId: ID!) {
		addChannelMember(userId: $userId, channelId: $channelId, teamId: $teamId) {
			user {
				id
				username
				avatar_url {
					url
				}
			}
			errors {
				path
				message
			}
		}
	}
`

export const addTeamMember = gql`
	mutation($userId: ID!, $teamId: ID!) {
		addTeamMember(userId: $userId, teamId: $teamId) {
			user {
				id
				username
				avatar_url {
					url
				}
			}
			errors {
				path
				message
			}
		}
	}
`

export const showTeams = gql`
	query {
		showTeams {
			id
			name
			slug
			members {
				id
				username
			}
			author {
				username
				id
			}
			channels {
				id
				slug
				name
				author {
					username
					id
				}
			}
			createdAt
			updatedAt
		}
	}
`

export const showTeam = gql`
	query($teamSlug: String!, $channelSlug: String!) {
		showTeam(teamSlug: $teamSlug, channelSlug: $channelSlug) {
			id
			name
			slug
			members {
				id
				username
			}
			author {
				username
				id
				avatar_url {
					url
				}
			}
			channels {
				id
				slug
				name
				author {
					username
					id
					avatar_url {
						url
					}
				}
				members {
					id
					username
					avatar_url {
						url
					}
				}
			}
			createdAt
			updatedAt
		}
	}
`

export const createChannel = gql`
	mutation($teamId: ID!, $name: String!) {
		createChannel(teamId: $teamId, name: $name) {
			id
			slug
			name
			author {
				username
				id
				avatar_url {
					url
				}
			}
			members {
				id
				username
				avatar_url {
					url
				}
			}
		}
	}
`

export const showChannel = gql`
	query($channelSlug: String!, $skip: Int!, $limit: Int!) {
		showChannel(channelSlug: $channelSlug, skip: $skip, limit: $limit) {
			id
			slug
			name
			author {
				username
				id
				avatar_url {
					url
				}
			}
			members {
				id
				username
				avatar_url {
					url
				}
			}
			messages {
				id
				body
				url
				parentId
				filetype
				author {
					username
					id
					avatar_url {
						url
					}
				}
				createdAt
				updatedAt
			}
		}
	}
`
