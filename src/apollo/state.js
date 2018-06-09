import gql from 'graphql-tag'

const query = gql`
	query {
		Cart @client {
			id
			name
			price
			url
			quantity
			total
		}
	}
`

export const defaultState = {
	Cart: []
}

export const resolvers = {
	Mutation: {
		updateCart(root, args, { cache }) {
			const data = cache.readQuery({ query })

			const found = data.Cart.find(cart => cart.id == args.id)

			if (found) {
				return
			}

			const object = {
				...args,
				price: Number(args.price),
				__typename: 'Cart'
			}

			data.Cart.push(object)

			cache.writeQuery({ query, data })
		},
		addOne(root, args, { cache }) {
			const data = cache.readQuery({ query })

			const cart = data.Cart.find(cart => cart.id == args.id)

			cart.quantity++
			cart.total = parseInt(cart.total) + parseInt(cart.price)

			const object = {
				Cart: [...data.Cart, cart]
			}

			cache.writeQuery({ query, data })
		},
		removeOne(root, args, { cache }) {
			const read = cache.readQuery({ query })
			const cart = read.Cart.find(cart => cart.id == args.id)

			if (cart.quantity <= 1 || cart.quantity == 0) {
				return
				// read.Cart.filter(item => {
				// 	return item.id == cart.id
				// })

				// const data = {
				// 	Cart: [read]
				// }

				// return cache.writeQuery({ query, data })
			}
			cart.quantity--
			cart.total = cart.total - cart.price

			const data = {
				Cart: [cart]
			}

			cache.writeQuery({ query, data })
		},
		deleteOne(root, args, { cache }) {
			const data = cache.readQuery({ query })

			const newData = data.Cart.filter(cart => cart.id != args.id)

			const object = {
				Cart: newData
			}

			cache.writeQuery({ query, data: object })
		}
	}
}
