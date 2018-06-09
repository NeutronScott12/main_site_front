import Loadable from 'react-loadable'

const loading = _ => '...loading'

const ShopLayout = Loadable({
	loader: () => import('../layouts'),
	loading
})

export const routes = [
	{
		path: '/shop',
		component: ShopLayout,
		guest: false,
		auth: false
	}
]

{
	/* <Route exact path="/shop/add-product" component={AddForm} />
			<Route exact path="/shop" component={ShopLoadable} /> */
}
