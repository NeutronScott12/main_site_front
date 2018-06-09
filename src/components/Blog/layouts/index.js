import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import UserRoute from '../../../utils/UserRoute'

import BlogContainer from '../containers'

const loading = _ => 'Loading...'

const formLoadable = Loadable({
	loader: () => import('../containers/FormContainer'),
	loading
})

const ShowLoadable = Loadable({
	loader: () => import('../containers/ShowContainer'),
	loading
})

const BlogsLoadable = Loadable({
	loader: () => import('../containers'),
	loading
})

class BlogLayout extends Component {
	render() {
		const { match } = this.props

		return (
			<div>
				<Route exact path={`/blogs`} component={BlogsLoadable} />
				<UserRoute exact path={`${match.path}/add-blog`} component={formLoadable} />
				<Route exact path={`${match.path}/blog/:slug`} component={ShowLoadable} />
				<UserRoute exact path={`${match.path}/edit-blog/:slug`} component={formLoadable} />
			</div>
		)
	}
}

export default BlogLayout
