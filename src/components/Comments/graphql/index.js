import gql from 'graphql-tag'

class CommentFragmentClass {
	static fragments = {
		comment: gql`
			fragment BlogCommentFragment on Comment {
				id
				parentId
				body
				repliedTo
				createdAt
				pageId
				updatedAt
				ratings {
					vote
					id
				}
				replies {
					id
					parentId
					ratings {
						vote
						id
					}
					body
					pageId
					repliedTo
					createdAt
					updatedAt
					author {
						id
						username
					}
				}
				author {
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
		`
	}
}

export const likeComment = gql`
	mutation($commentId: ID!) {
		likeComment(commentId: $commentId) {
			...BlogCommentFragment
		}
	}
	${CommentFragmentClass.fragments.comment}
`

export const createComment = gql`
	mutation($parentId: String!, $comment: String!, $pageId: ID!) {
		createComment(parentId: $parentId, body: $comment, pageId: $pageId) {
			...BlogCommentFragment
		}
	}
	${CommentFragmentClass.fragments.comment}
`

export const queryComments = gql`
	query($parentId: ID!) {
		queryComment(parentId: $parentId) {
			...BlogCommentFragment
		}
	}
	${CommentFragmentClass.fragments.comment}
`

export const createReply = gql`
	mutation($parentId: ID!, $comment: String!, $repliedTo: String, $pageId: ID!) {
		createReply(parentId: $parentId, body: $comment, repliedTo: $repliedTo, pageId: $pageId) {
			...BlogCommentFragment
		}
	}
	${CommentFragmentClass.fragments.comment}
`
