import React, { Component } from 'react'
import { Item, Divider } from 'semantic-ui-react'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import AddMemberModal from './modals/AddChannelMember'

class MembersBar extends Component {
	render() {
		const {
			data: { showTeam },
			match,
			user
		} = this.props

		const admin = showTeam.channels.find(channel => channel.slug == match.params.channel_slug)
			.author

		return (
			<div>
				<Divider />
				{showTeam.author.id == user.id ? <AddMemberModal team={showTeam} /> : null}
				<Divider horizontal>CHANNEL Members</Divider>
				<Item.Group divided>
					{/* <Item.Image src={admin.avatar_url} size="tiny" /> */}
					<Item.Content>
						ADMIN <Link to={`/profile/${admin.username}`}>{admin.username}</Link>
					</Item.Content>
					{showTeam.channels
						.find(channel => channel.slug == match.params.channel_slug)
						.members.filter(member => member.username != admin.username)
						.map(member => {
							return (
								<div key={member.id}>
									<Item.Image size="tiny" />
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

export default connect(mapStateToProps)(MembersBar)
