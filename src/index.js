import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store as originalStore } from 'redux'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import axios from 'axios'
import { StripeProvider } from 'react-stripe-elements'

import Endpoints from './config/constants'

import 'semantic-ui-css/semantic.min.css'
import 'react-quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css'

import registerServiceWorker from './registerServiceWorker'

import { fetchUserSuccess } from './components/Authentication/Login/actions'
import setAuthorizationHeader from './utils/setAuthorizationHeader'

import MainLayout from './mainLayout/mainLayout'
import store from './redux/store.jsx'
import { client } from './apollo'

// 'http://localhost:4567/v1/api/auth/current_user'

if (localStorage.token) {
	setAuthorizationHeader(localStorage.token, localStorage.refreshToken)
	axios
		.get(
			`${
				process.env.NODE_ENV == 'production'
					? Endpoints.GRAPHQLENDPOINTLIVE
					: Endpoints.GRAPHQLENDPOINTDEV
			}/current_user`
		)
		.then(({ data: { result } }) => {
			if (result.email != undefined) {
				store.dispatch(fetchUserSuccess(result))
			}
		})
		.catch(console.log)
}

render(
	<StripeProvider apiKey="pk_test_3YdcQR16ACBUKpQRP5ieV0nV">
		<ThemeProvider theme={{}}>
			<Router>
				<Provider store={store}>
					<ApolloProvider client={client}>
						<MainLayout />
					</ApolloProvider>
				</Provider>
			</Router>
		</ThemeProvider>
	</StripeProvider>,
	document.querySelector('#root')
)
registerServiceWorker()
