import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import ProfileContainer from '../container'
import UserRoute from '../../../utils/UserRoute'

const loading = _ => 'Loading...'

const ProfileLoadable = Loadable({
	loader: () => import('../container'),
	loading
})

const PersonalBlogs = Loadable({
	loader: () => import('../container/PersonalBlogs'),
	loading
})

const OrderLoadable = Loadable({
	loader: () => import('../container/OrderContainer'),
	loading
})

class ProfileLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div>
				<UserRoute
					path={`${this.props.match.path}/:username`}
					exact
					component={ProfileLoadable}
				/>
				<UserRoute
					path={`${this.props.match.path}/:username/orders`}
					exact
					component={OrderLoadable}
				/>
				<UserRoute
					exact
					path={`${this.props.match.path}/:user/blogs`}
					component={PersonalBlogs}
				/>
			</div>
		)
	}
}

export default ProfileLayout
