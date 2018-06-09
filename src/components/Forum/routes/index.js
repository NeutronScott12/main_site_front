import Loadable from 'react-loadable'

const loading = _ => 'Loading...'

const ForumLayoutLoadable = Loadable({
	loader: () => import('../layouts'),
	loading
})

export const routes = [
	{
		path: '/forums',
		component: ForumLayoutLoadable,
		guest: false,
		auth: false
	}
]
