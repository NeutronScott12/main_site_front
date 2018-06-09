import React, { Component } from 'react'
import { Segment, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import SwipeableDrawer from 'material-ui/SwipeableDrawer'

class SideBar extends Component {
	state = {
		left: false,
		open: false
	}

	_toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		})
	}

	_show = size => () => {
		this.setState({ left: false, size, open: true })
	}
	_close = () => this.setState({ open: false })

	_closeConfigShow = (size, closeOnEscape, closeOnRootNodeClick) => () => {
		this.setState({ left: false, size, closeOnEscape, closeOnRootNodeClick, open: true })
	}

	render() {
		const { visible } = this.state
		const { open, size, closeOnEscape, closeOnRootNodeClick } = this.state

		return (
			<div>
				<Button onClick={this._toggleDrawer('left', true)}>Show</Button>
				<SwipeableDrawer
					open={this.state.left}
					onClose={this._toggleDrawer('left', false)}
					onOpen={this._toggleDrawer('left', true)}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={this._toggleDrawer('left', false)}
						onKeyDown={this._toggleDrawer('left', false)}
					/>
					<Segment style={{ width: '200px' }}>
						<List divided relaxed>
							<List.Item>
								<p>Browse</p>
							</List.Item>
							<List.Item>
								<p>Buying</p>
							</List.Item>
							<List.Item>
								<p>Selling</p>
							</List.Item>
							<List.Item>
								<Link to="/shop/add-product">
									<Button>Sell Something</Button>
								</Link>
							</List.Item>
							<List.Item>
								<List.Header>Filter</List.Header>
							</List.Item>
						</List>
					</Segment>
				</SwipeableDrawer>
			</div>
		)
	}
}

export default SideBar
