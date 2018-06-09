import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
// import { ConnectedRouter } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'

// const history = createHistory()

import MainPage from '../components/MainPage'

import Header from '../partials/Header'
import GuestRoute from '../utils/GuestRoute'
import UserRoute from '../utils/UserRoute'

import { routes as authRoutes } from '../components/Authentication/routes'
import { routes as blogRoutes } from '../components/Blog/routes'
import { routes as chatChannelRoutes } from '../components/ChatChannel/routes'
import { routes as DashboardRoutes } from '../components/Dashboard/routes'
import { routes as ForumRoutes } from '../components/Forum/routes'
import { routes as ProfileRoutes } from '../components/Profile/routes'
import { routes as ShopRoutes } from '../components/shop/routes'

const allRoutes = [
	...ProfileRoutes,
	...authRoutes,
	...blogRoutes,
	...DashboardRoutes,
	...chatChannelRoutes,
	...ForumRoutes,
	...ShopRoutes
]

export default () => {
	const routes = allRoutes.map((route, i) => {
		if (route.guest) {
			return (
				<GuestRoute
					key={i}
					exact={route.exact}
					path={route.path}
					component={route.component}
				/>
			)
		} else {
			return (
				<Route key={i} exact={route.exact} path={route.path} component={route.component} />
			)
		}
	})

	return (
		<Switch>
			{routes}
			<Route path="/" component={MainPage} />
			<Redirect from="*" to="/" />
		</Switch>
	)
}
