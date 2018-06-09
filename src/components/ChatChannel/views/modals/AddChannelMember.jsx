import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Downshift from 'downshift'
import Button from 'material-ui/Button'
import { Modal } from 'semantic-ui-react'

import { searchTeamUsers, addChannelMember, showChannel } from '../../graphql'

class AddChannelMember extends Component {
	state = { open: false, selectedUser: undefined }

	_show = () => this.setState({ open: true })
	_close = () => this.setState({ open: false })

	_onChange = item => this.setState({ selectedUser: item })

	_submit = async _ => {
		const {
			team,
			match,
			data: { searchTeamUsers }
		} = this.props
		const channelId = team.channels.find(channel => channel.slug == match.params.channel_slug)
			.id
		const userId = searchTeamUsers.find(user => user.username == this.state.selectedUser).id
		const channelSlug = this.props.match.params.channel_slug
		const response = await this.props.mutate({
			variables: {
				userId,
				channelId,
				teamId: team.id
			},
			update(
				store,
				{
					data: { addChannelMember }
				}
			) {
				const data = store.readQuery({
					query: showChannel,
					variables: {
						channelSlug
					}
				})

				data.showChannel.members.push(addChannelMember.user)

				store.writeQuery({
					query: showChannel,
					variables: {
						channelSlug
					},
					data
				})
			}
		})
	}

	render() {
		const {
			data: { loading, searchTeamUsers }
		} = this.props

		return loading ? null : (
			<div>
				<Button onClick={this._show}>Add Channel Member</Button>

				<Modal
					style={{ position: 'absolute', top: '50%', left: '10%' }}
					size="large"
					open={this.state.open}
					onClose={this._close}
				>
					<Modal.Content>
						<div>
							<Downshift
								onChange={this._onChange}
								render={({
									getInputProps,
									getItemProps,
									isOpen,
									inputValue,
									selectedItem,
									highlightedIndex
								}) => (
									<div>
										<input
											{...getInputProps({
												placeholder: 'Search Users'
											})}
										/>
										{isOpen ? (
											<div style={{ border: '1px solid #ccc' }}>
												{searchTeamUsers
													.filter(
														i =>
															!inputValue ||
															i.username
																.toLowerCase()
																.includes(inputValue.toLowerCase())
													)
													.map(({ username }, index) => (
														<div
															{...getItemProps({ item: username })}
															key={username}
															style={{
																backgroundColor:
																	highlightedIndex === index
																		? 'gray'
																		: 'white',
																fontWeight:
																	selectedItem === username
																		? 'bold'
																		: 'normal'
															}}
														>
															{username}
														</div>
													))}
											</div>
										) : null}
									</div>
								)}
							/>
						</div>

						{this.state.selectedUser ? (
							<Button onClick={this._submit}>Submit</Button>
						) : null}
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default compose(
	withRouter,
	graphql(searchTeamUsers, {
		options: props => {
			return {
				variables: {
					teamId: props.team.id
				}
			}
		}
	}),
	graphql(addChannelMember)
)(AddChannelMember)
