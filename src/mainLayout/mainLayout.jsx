import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route, Link } from 'react-router-dom'
// import createHistory from 'history/createBrowserHistory'
import { Helmet } from 'react-helmet'
import CssBaseline from 'material-ui/CssBaseline'

import Routes from '../routes'
import TopNav from '../partials/Header'
import NotifcationContainer from '../components/Notification/containers'

import { MainTheme, Container } from '../styles'

class MainLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		// const history = createHistory()
		return (
			<MainTheme>
				<div>
					<CssBaseline />
					<Helmet>
						<meta charSet="utf-8" />
						<title>MainLayout</title>
						<meta
							name="universal app"
							content="This application will try to service most needs"
						/>
						{<noscript>{`Turn on Javascript`}</noscript>}
					</Helmet>
					<TopNav />
					<NotifcationContainer />
					<Container text>
						<Routes />
					</Container>
				</div>
			</MainTheme>
		)
	}
}

MainLayout.propTypes = {}

export default MainLayout
