import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import UserRoute from '../../../utils/UserRoute'

import ChatContainer from '../containers/ChatContainer'

const loading = _ => '...loading'

const ChatLoadable = Loadable({
	loader: () => import('../containers/ChatContainer'),
	loading
})

const Layout = props => {
	return (
		<div>
			<UserRoute
				path={`${props.match.path}/:team_slug/:channel_slug`}
				component={ChatLoadable}
			/>
			{/* <Route
				exact
				path={`${props.match.path}/:team/:channel_slug`}
				component={TeamLoadable}
			/> */}
		</div>
	)
}

export default Layout
