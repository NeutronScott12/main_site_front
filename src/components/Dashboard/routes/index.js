import Loadable from 'react-loadable'

const loading = _ => 'Loading...'

const DashBoardLoadable = Loadable({
	loader: () => import('../layouts'),
	loading
})

export const routes = [
	{
		path: '/dashboard/:username',
		component: DashBoardLoadable,
		guest: false,
		auth: true
	}
]
