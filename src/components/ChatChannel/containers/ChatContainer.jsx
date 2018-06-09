import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { showTeam } from '../graphql'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import SideBar from '../views/SideBar'
import MessageContainer from '../views/Message'
import MembersBar from '../views/MembersBar'

const ChatContainer = props => {
	return (
		<Grid stackable celled="internally">
			<Grid.Row>
				<Grid.Column width={3}>
					<SideBar {...props} />
					<MembersBar {...props} />
				</Grid.Column>
				<Grid.Column width={13}>
					<MessageContainer {...props} />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default compose(
	withRouter,
	graphql(showTeam, {
		options: props => ({
			variables: {
				teamSlug: props.match.params.team_slug,
				channelSlug: props.match.params.channel_slug
			}
		})
	}),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(ChatContainer)
