import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Grid, Image, Card, Button, Responsive, Segment } from 'semantic-ui-react'
import Moment from 'react-moment'

import SideBar from '../views/Sidebar'
import AddForm from './FormContainer'
import Cart from './Cart'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import { showProducts, updateCart } from '../graphql'

class ShopFront extends Component {
	_showPage = slug => this.props.history.push(`/shop/product/${slug}`)

	_updateCart = () => {}

	render() {
		const {
			data: { showProducts },
			user
		} = this.props

		return (
			<Segment.Group>
				{user.role === 'ADMIN' ? <SideBar /> : null}
				<Responsive as={Segment} minWidth={1000}>
					<Grid relaxed columns={4}>
						{showProducts.edges.map(edge => {
							return (
								<Grid.Column key={edge.cursor}>
									<Card>
										<Image src={edge.node.picture.url} />
										<Card.Content>
											<Card.Header>{edge.node.name}</Card.Header>
											<Card.Meta>
												Uploaded{' '}
												<Moment
													fromNow
													date={new Date(edge.node.createdAt)}
												/>
											</Card.Meta>
											{/* <Card.Description>
											Seller: {edge.node.seller.username}
										</Card.Description> */}
											<Card.Content>
												<Button>
													<Link to={`/shop/product/${edge.node.slug}`}>
														View
													</Link>
												</Button>
											</Card.Content>
										</Card.Content>
									</Card>
								</Grid.Column>
							)
						})}
					</Grid>
				</Responsive>
				<Responsive as={Segment} maxWidth={600}>
					{showProducts.edges.map(edge => {
						return (
							<Card key={edge.cursor}>
								<Image src={edge.node.picture.url} />
								<Card.Content>
									<Card.Header>{edge.node.name}</Card.Header>
									<Card.Meta>
										Uploaded{' '}
										<Moment fromNow date={new Date(edge.node.createdAt)} />
									</Card.Meta>
									{/* <Card.Description>
											Seller: {edge.node.seller.username}
										</Card.Description> */}
									<Card.Content>
										<Button>
											<Link to={`/shop/product/${edge.node.slug}`}>View</Link>
										</Button>
									</Card.Content>
								</Card.Content>
							</Card>
						)
					})}
				</Responsive>
			</Segment.Group>
		)
	}
}

const mapStateToProps = state => ({
	user: state.loginReducer
})

export default compose(
	connect(mapStateToProps),
	graphql(showProducts),
	graphql(updateCart),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(ShopFront)
