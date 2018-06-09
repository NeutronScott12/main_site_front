import React from 'react'
import Loadable from 'react-loadable'

const loading = _ => 'Loading...'

const BlogLayout = Loadable({
	loader: () => import('../layouts'),
	loading
})

export const routes = [
	{
		path: '/blogs',
		component: BlogLayout,
		auth: false,
		guest: false
	}
]

// <Route path="/edit-blog/:slug" component={FormContainer} />
// 			<Route path="/blog/:slug" component={ShowBlog} />

// <Fragment>
// 	<Route exact path="/add-blog" component={FormContainer} />
// 	<Route exact path="/blogs" component={BlogLayout} />
// </Fragment>
