import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'
import UserRoute from '../../../utils/UserRoute'

const loading = _ => '...loading'

const FormContainerLoadable = Loadable({
	loader: () => import('../containers/FormContainer'),
	loading
})

const showSubjectLoadable = Loadable({
	loader: () => import('../containers/ShowSubjectContainer'),
	loading
})

const showThreadLoadable = Loadable({
	loader: () => import('../containers/ShowThread'),
	loading
})

const ForumLoadable = Loadable({
	loader: () => import('../containers'),
	loading
})

const ForumLayout = props => (
	<div>
		<Route exact path={`${props.match.path}/`} component={ForumLoadable} />
		<UserRoute
			exact
			path={`${props.match.path}/:subject/add_thread`}
			component={FormContainerLoadable}
		/>
		<Route
			exact
			path={`${props.match.path}/subject/:subject`}
			component={showSubjectLoadable}
		/>
		<Route exact path={`${props.match.path}/:thread`} component={showThreadLoadable} />
	</div>
)

export default ForumLayout
