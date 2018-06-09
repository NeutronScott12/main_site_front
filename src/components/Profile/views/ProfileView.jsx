import React from 'react'
import Moment from 'react-moment'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import { capitaliseFirstword } from '../../../utils/stringfunctions'
import styled from 'styled-components'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

import AddTeamModal from '../../ChatChannel/views/modals/AddTeam'
import TeamSideBar from '../../ChatChannel/containers/TeamSideBar'

const styles = theme => ({
	profileTitle: {
		fontSize: 1.2
	},
	bio: {
		marginTop: '0.2rem',
		fontSize: '1rem'
	}
})

import BlogsView from './BlogsView.jsx'

import { ProfileSection } from '../styles'

import { ImageProfile } from '../styles'

const ProfileView = ({
	username,
	avatarUrl,
	friends,
	joinDate,
	currentUser,
	friendRequestFunc,
	blogs,
	id,
	classes
}) => {
	const inFriendList = friends => {
		return friends.find(friend => friend.id == currentUser.id)
	}

	return (
		<div>
			<Card>
				<Image size="medium" src={avatarUrl} />
				<Card.Content>
					<Card.Header>{capitaliseFirstword(username)}</Card.Header>
					<Card.Meta>
						Joined <Moment format="DD/MM/YYYY" date={new Date(joinDate)} />
					</Card.Meta>
					<Card.Description className={classes.bio}>
						{username} write something about yourself
					</Card.Description>
					<Card.Description className={classes.bio}>
						{currentUser.username == username ? (
							<div>
								<Link to={`/profile/${currentUser.username}/orders`}>Orders</Link>
								<AddTeamModal />
								<TeamSideBar />
							</div>
						) : null}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Card.Meta />
					{currentUser.username !== username && !!inFriendList(friends) == false ? (
						friends.find(friend => currentUser.username == friend.username) == null ? (
							<Button onClick={() => friendRequestFunc(id, currentUser)}>
								Add User
							</Button>
						) : null
					) : null}
				</Card.Content>
			</Card>
			<br />
			<div>
				<BlogsView blogs={blogs} />
			</div>
		</div>
	)
}

export default withStyles(styles)(ProfileView)
