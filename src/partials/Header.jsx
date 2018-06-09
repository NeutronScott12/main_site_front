import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import AccountCircle from 'material-ui-icons/AccountCircle'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { Menu, Segment, Dropdown, Icon } from 'semantic-ui-react'

import { capitaliseFirstword } from '../utils/stringfunctions'

import { logoutAction } from './action'

import NotificationContainer from '../components/Notification/containers'

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	links: {
		textDecoration: 'none',
		color: '#000'
	},
	title: {
		marginLeft: 25
	}
}

// import { TopNav, NavBrand } from '../styles'

class TopNav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			anchorEl: null
		}
	}

	_handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget })
	}

	_handleClose = event => {
		this.setState({ anchorEl: null })
	}

	render() {
		const {
			user: { logged_in, username, email },
			logout,
			history,
			classes
		} = this.props

		const { anchorEl } = this.state
		const open = Boolean(anchorEl)

		let authentication

		if (logged_in == false) {
			authentication = (
				<Fragment>
					<Menu.Item position="right">
						<Link to="/login">
							<h3>Login</h3>
						</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/register">
							<h3>Register</h3>
						</Link>
					</Menu.Item>
				</Fragment>
			)
		} else {
			// text={username}
			authentication = (
				<Fragment>
					<Dropdown
						style={{ color: '#4183c4' }}
						item
						as="span"
						text={capitaliseFirstword(username)}
						simple
					>
						<Dropdown.Menu>
							<Dropdown.Item>
								<Link to={`/profile/${username}`}>Profile</Link>
							</Dropdown.Item>
							<Dropdown.Item>
								<Link to={`/dashboard/${username}`}>Dashboard</Link>
							</Dropdown.Item>
							<Dropdown.Item>
								<Link to="/">
									<h3
										onClick={() => {
											history.push('/')
											logout()
										}}
									>
										Log out
									</h3>
								</Link>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Menu.Item>
						<Link to="/blogs">Blogs</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/forums">Forums</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/shop">Shop</Link>
					</Menu.Item>
					{/* <Menu.Item position="right">
						<Link to="/forums">
							<Icon name="announcement" />
						</Link>
					</Menu.Item> */}
					<Menu.Item position="right">
						<Link to="/shop/cart">
							<Icon name="shop" />
						</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/notifications">
							<Icon name="announcement" />
						</Link>
					</Menu.Item>
				</Fragment>
			)
		}

		return (
			<Menu attached="top" size="massive" stackable>
				<Menu.Item header>
					<Link to="/">
						<h2>
							Main Site |
							<span style={{ fontWeight: 'bold', fontSize: '18px' }}>Beta</span>
						</h2>
					</Link>
				</Menu.Item>
				{authentication}
			</Menu>
		)
	}
}

const mapStatetoProps = state => ({
	user: state.loginReducer
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutAction())
})

const logutMutation = gql`
	mutation($email: String!) {
		logout(email: $email)
	}
`

export default compose(
	withApollo,
	withStyles(styles),
	withRouter,
	graphql(logutMutation),
	connect(mapStatetoProps, mapDispatchToProps)
)(TopNav)
