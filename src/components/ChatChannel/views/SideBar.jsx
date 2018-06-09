import React, { Component, Fragment } from 'react'
import { Item, Divider } from 'semantic-ui-react'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import TeamContainer from '../containers/TeamSideBar'
import AddChannelModal from './modals/AddChannel'
import AddTeamModal from './modals/AddTeam'
import AddMemberModal from './modals/AddTeamMember'

// import Teams from './views/Teams'
// import AddChannelModal from './views/AddChannelModal'
// import InvitePeopleModal from './views/InvitePeopleModal'
// import DirectMessageModal from './views/DirectMessageModal'

class SideBar extends Component {
	render() {
		const {
			data: { showTeam, loading },
			match,
			history,
			user
		} = this.props

		return loading ? (
			'loading...'
		) : (
			<div>
				<TeamContainer />
				<AddTeamModal />
				{showTeam.author.id === user.id ? <AddMemberModal team={showTeam} /> : null}
				<AddChannelModal showTeam={showTeam} />
				<Divider horizontal>Channels</Divider>
				<Item.Group divided>
					{showTeam.channels.map(channel => {
						return (
							<div key={channel.id}>
								<Item.Content verticalAlign="middle">
									<Link
										to={`/chat-channels/${match.params.team_slug}/${
											channel.slug
										}`}
									>
										{channel.name}
									</Link>
								</Item.Content>
							</div>
						)
					})}
				</Item.Group>
				<Divider horizontal>Team Members</Divider>

				<Item.Group divided>
					<Item.Content>
						ADMIN{' '}
						<Link to={`/profile/${showTeam.author.username}`}>
							{showTeam.author.username}
						</Link>
					</Item.Content>
					{showTeam.members.map(member => {
						return (
							<div key={member.id}>
								<Item.Content verticalAlign="middle">
									<Link to={`/profile/${member.username}`}>
										{member.username}
									</Link>
								</Item.Content>
							</div>
						)
					})}
				</Item.Group>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.loginReducer
	}
}

export default connect(mapStateToProps)(SideBar)
