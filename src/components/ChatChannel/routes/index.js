import Loadable from 'react-loadable'

const loading = _ => 'Loading...'

const ChatChannelLoadable = Loadable({
	loader: () => import('../layouts/ChatChannelLayout'),
	loading
})

export const routes = [
	{
		path: '/chat-channels',
		component: ChatChannelLoadable,
		auth: true,
		guest: false
	}
]
