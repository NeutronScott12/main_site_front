import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import AddTeamModal from '../views/modals/AddTeam'

import { showTeams } from '../graphql'
import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

class TeamContainer extends Component {
	render() {
		const {
			data: { showTeams }
		} = this.props

		return (
			<div>
				<AddTeamModal />
				{showTeams.map(team => {
					return (
						<div key={team.id}>
							<Link to={`/chat-channels/${team.slug}/${team.channels[0].slug}`}>
								{team.name}
							</Link>
						</div>
					)
				})}
			</div>
		)
	}
}

export default compose(
	graphql(showTeams),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(TeamContainer)
