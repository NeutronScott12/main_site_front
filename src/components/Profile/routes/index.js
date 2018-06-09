import Loadable from 'react-loadable'

const loading = _ => 'Loading...'

const ProfileRoute = Loadable({
	loader: () => import('../layouts'),
	loading
})

export const routes = [
	{
		path: '/profile',
		component: ProfileRoute,
		auth: true,
		guest: false
	}
]

// <Route path="/profile/:username" component={ProfileLoadable} />
// 			<Route path="/:username/blogs" component={PersonalBlogs} />
