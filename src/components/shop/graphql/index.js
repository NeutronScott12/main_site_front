import gql from 'graphql-tag'

export const deleteOne = gql`
	mutation deleteOne($id: ID!) {
		deleteOne(id: $id) @client
	}
`

export const updateCart = gql`
	mutation updateCart(
		$id: ID!
		$price: Float!
		$name: String!
		$quantity: Int!
		$total: Float!
		$url: String!
	) {
		updateCart(
			id: $id
			price: $price
			name: $name
			quantity: $quantity
			total: $total
			url: $url
		) @client {
			id
			name
			price
			quantity
			total
		}
	}
`

export const removeOne = gql`
	mutation removeOne(
		$id: ID!
		$price: Float!
		$name: String!
		$quantity: Int!
		$total: Float!
		$url: String!
	) {
		removeOne(
			id: $id
			price: $price
			name: $name
			quantity: $quantity
			total: $total
			url: $url
		) @client {
			id
			name
			price
			quantity
			total
		}
	}
`

export const addOne = gql`
	mutation addOne($id: ID!) {
		addOne(id: $id) @client {
			id
			name
			price
			quantity
			total
			url
		}
	}
`

export const queryCart = gql`
	query {
		Cart @client {
			id
			name
			price
			quantity
			total
			url
		}
	}
`

export const addProduct = gql`
	mutation($name: String!, $price: Float!, $picture: Upload!) {
		addProduct(name: $name, price: $price, picture: $picture) {
			id
			name
			price
			category
		}
	}
`

export const showProduct = gql`
	query($slug: String!) {
		showProduct(slug: $slug) {
			id
			name
			picture {
				url
			}
			slug
			createdAt
			updatedAt
			stock
			price
			seller {
				username
				id
			}
		}
	}
`

export const showProducts = gql`
	query {
		showProducts {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					id
					name
					picture {
						url
					}
					slug
					createdAt
					updatedAt
					stock
					price
					seller {
						username
						id
					}
				}
			}
		}
	}
`

export const checkout = gql`
	mutation(
		$email: String!
		$token: String!
		$currency: String!
		$items: [OrderItemInput]!
		$total: String!
		$metadata: Json!
	) {
		checkout(
			email: $email
			token: $token
			currency: $currency
			items: $items
			total: $total
			metadata: $metadata
		) {
			id
		}
	}
`
