import LoginLayout from './Login/layouts'
import RegisterLayout from './Register/layouts/RegisterLayout'
import AuthConfirmation from './splashscreens/AuthConfirmation'
import ForgotPassword from './splashscreens/ForgotPassword'
import ResetPassword from './splashscreens/ResetPassword'

export const routes = [
	{
		exact: true,
		path: '/login',
		component: LoginLayout,
		guest: true
	},
	{
		exact: true,
		path: '/register',
		component: RegisterLayout,
		guest: true
	},
	{
		exact: true,
		path: '/confirmation',
		component: AuthConfirmation,
		guest: true
	},
	{
		exact: true,
		path: '/forgot_password',
		component: ForgotPassword,
		guest: true
	},
	{
		exact: true,
		path: 'reset_password',
		component: ResetPassword,
		guest: true
	}
]
