import React from 'react'
import Loadable from 'react-loadable'
import { Route, Link } from 'react-router-dom'
import UserRoute from '../../../utils/UserRoute'

const loading = _ => '...loading'

const ShopContainer = Loadable({
	loader: () => import('../containers'),
	loading
})

const AddProductLoadable = Loadable({
	loader: () => import('../containers/FormContainer'),
	loading
})

const ShowProductLoadable = Loadable({
	loader: () => import('../containers/ShowProduct'),
	loading
})

const CartLoadable = Loadable({
	loader: () => import('../containers/Cart'),
	loading
})

const ShopLayout = props => (
	<div>
		<Route path={`${props.match.path}/`} exact component={ShopContainer} />
		<UserRoute path={`${props.match.path}/cart`} exact component={CartLoadable} />
		<Route path={`${props.match.path}/add-product`} exact component={AddProductLoadable} />
		<UserRoute
			path={`${props.match.path}/product/:slug`}
			exact
			component={ShowProductLoadable}
		/>
	</div>
)

export default ShopLayout
