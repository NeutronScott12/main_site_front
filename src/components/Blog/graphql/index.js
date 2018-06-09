import gql from 'graphql-tag'

class PostFragmentClass {
	static fragments = {
		BlogPost: gql`
			fragment BlogPost on BlogPost {
				id
				title
				body
				slug
				published
				short_description
				banner_image {
					url
				}
				category
				ratings {
					id
					vote
				}
				comments {
					aggregate {
						count
					}
				}
				# downvotes {
				# 	id
				# 	username
				# }
				# upvotes {
				# 	id
				# 	username
				# }
				author {
					id
					username
				}
				updatedAt
				createdAt
			}
		`
	}
}

export const pinnedBlog = gql`
	query {
		queryPinnedBlogs {
			id
			blogs {
				...BlogPost
			}
		}
	}
	${PostFragmentClass.fragments.BlogPost}
`

export const queryBlogs = gql`
	query($limit: Int!, $offset: Int!) {
		fetchBlogs(limit: $limit, offset: $offset) {
			blogs {
				...BlogPost
			}
			errors {
				path
				message
			}
		}
	}
	${PostFragmentClass.fragments.BlogPost}
`

export const updateBlog = gql`
	mutation(
		$id: ID!
		$slug: String!
		$title: String!
		$body: String
		$short_description: String!
		$category: String!
	) {
		updatePost(
			id: $id
			slug: $slug
			title: $title
			body: $body
			short_description: $short_description
			category: $category
		) {
			...BlogPost
		}
	}
	${PostFragmentClass.fragments.BlogPost}
`

export const addBlog = gql`
	mutation(
		$title: String!
		$body: String!
		$short_description: String!
		$category: String!
		$banner_image: Upload!
		$published: Boolean!
	) {
		createBlog(
			title: $title
			body: $body
			short_description: $short_description
			category: $category
			banner_image: $banner_image
			published: $published
		) {
			...BlogPost
		}
	}
	${PostFragmentClass.fragments.BlogPost}
`

export const showBlog = gql`
	query($slug: String!, $blogId: ID) {
		fetchBlog(slug: $slug, blogId: $blogId) {
			blog {
				...BlogPost
			}
		}
	}
	${PostFragmentClass.fragments.BlogPost}
`

export const searchBlogQuery = gql`
	query($searchInput: String!) {
		searchBlog(searchInput: $searchInput) {
			...BlogPost
		}
	}
	${PostFragmentClass.fragments.BlogPost}
`

export const likeBlog = gql`
	mutation($blogId: ID!) {
		likeBlog(blogId: $blogId) {
			...BlogPost
		}
	}
	${PostFragmentClass.fragments.BlogPost}
`

export const deleteBlog = gql`
	mutation($id: ID!) {
		deleteBlog(id: $id) {
			ok
			errors {
				path
				message
			}
		}
	}
`

export const toggleRating = gql`
	mutation($id: ID!, $rating: Boolean!) {
		toggleRating(id: $id, rating: $rating) {
			upvotes {
				id
				username
			}
			downvotes {
				id
				username
			}
		}
	}
`
