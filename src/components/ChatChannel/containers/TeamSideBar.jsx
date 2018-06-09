import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import SwipeableDrawer from 'material-ui/SwipeableDrawer'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { Segment, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import AddTeamModal from '../views/modals/AddTeam'

import { showTeams } from '../graphql'

const styles = {
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
}

class TeamSideBar extends React.Component {
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
		const {
			classes,
			data: { showTeams }
		} = this.props

		const { open, size, closeOnEscape, closeOnRootNodeClick } = this.state

		return (
			<div>
				<Button onClick={this._toggleDrawer('left', true)}>Chat Teams</Button>
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
							{showTeams.map(team => {
								return (
									<List.Item key={team.id}>
										<List.Header>
											<Link
												to={`/chat-channels/${team.slug}/${
													team.channels[0].slug
												}`}
											>
												{team.name}
											</Link>
										</List.Header>
									</List.Item>
								)
							})}
						</List>
					</Segment>
				</SwipeableDrawer>
			</div>
		)
	}
}

TeamSideBar.propTypes = {
	classes: PropTypes.object.isRequired
}

export default compose(
	graphql(showTeams),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(withStyles(styles)(TeamSideBar))
