import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { Hermes } from 'apollo-cache-hermes'
import { setContext } from 'apollo-link-context'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { createUploadLink } from 'apollo-upload-client'
import { withClientState } from 'apollo-link-state'

import constants from '../config/constants'
import { defaultState, resolvers } from './state'

const cache = new InMemoryCache()

const stateLink = withClientState({
	cache,
	defaults: defaultState,
	resolvers: {
		...resolvers
	}
})

const httpLink = createUploadLink({
	uri:
		process.env.NODE_ENV == 'production'
			? constants.GRAPHQLENDPOINTLIVE
			: constants.GRAPHQLENDPOINTDEV,
	credentials: 'include'
})

const middlewareLink = setContext(() => ({
	headers: {
		'x-token': localStorage.getItem('token'),
		'x-refresh-token': localStorage.getItem('refreshToken')
	}
}))

const afterwareLink = new ApolloLink((operation, forward) => {
	return forward(operation).map(response => {
		const {
			response: { headers }
		} = operation.getContext()
		if (response.errors) {
			if (response.errors[0].message == 'Not Authenticated') {
				window.location.assign('http://localhost:4000/login')
			}
		}
		if (headers) {
			const token = headers.get('x-token')
			const refreshToken = headers.get('x-refresh-token')
			if (token) {
				localStorage.setItem('token', token)
			}
			if (refreshToken) {
				localStorage.setItem('refreshToken', refreshToken)
			}
		}
		return response
	})
})

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink))

const wsLink = new WebSocketLink({
	uri:
		process.env.NODE_ENV == 'production'
			? constants.GRAPHQLSUBSCRIPTIONLIVE
			: constants.GRAPHQLSUBSCRIPTIONDEV,
	options: {
		reconnect: true,
		connectionsParms: {}
	}
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLinkWithMiddleware
)

export const client = new ApolloClient({
	link: ApolloLink.from([stateLink, link]),
	cache
})
