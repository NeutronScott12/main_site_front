import React, { Component } from 'react'
import { graphql, compose, Query } from 'react-apollo'
import { Formik } from 'formik'
import { Link, withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { delay } from 'lodash'
import { fromPromise } from 'rxjs/observable/fromPromise'
import Rx from 'rxjs/Rx'
import 'rxjs/add/operator/debounce'
import Yup from 'yup'

const Input = styled.input`
	width: 100%;
	border-radius: 0.5px;
	padding: 0.5rem;
	outline: none;
	border: none;
	box-shadow: 3px 4px 5px -2px rgba(0, 0, 0, 0.75);
`
import { addTeamMember, showTeam, searchUsers } from '../../graphql'

import FormBuilder from '../../../utils/Formbuilder'

class AddMemberComponent extends Component {
	_addTeamMember = async id => {
		const channelId = this.props.team.channels.find(
			channel => channel.slug == this.props.match.params.channel_slug
		).id
		const teamId = this.props.team.id
		const channelSlug = this.props.match.params.channel_slug
		const teamSlug = this.props.match.params.team_slug

		const response = await this.props.mutate({
			variables: {
				userId: this.props.user.id,
				teamId
			},
			update(
				store,
				{
					data: { addTeamMember }
				}
			) {
				const data = store.readQuery({
					query: showTeam,
					variables: {
						channelSlug,
						teamSlug
					}
				})

				data.showTeam.members.push(addTeamMember.user)

				store.writeQuery({
					query: showTeam,
					variables: {
						channelSlug,
						teamSlug
					},
					data
				})
			}
		})

		this.props.close()
	}

	render() {
		const { user } = this.props
		return (
			<div>
				<p>{user.username}</p>
				<Button onClick={this._addTeamMember}>Add Team Member</Button>
			</div>
		)
	}
}

class AddMemberModal extends Component {
	state = { open: false, searchUsers: [] }

	_show = () => this.setState({ open: true })
	_close = () => this.setState({ open: false })

	_onChange = selectedItem => {
		this.setState({ selectedItem })
	}

	render() {
		return (
			<div>
				<Button onClick={this._show}>Add Team Member</Button>

				<Modal
					style={{ position: 'absolute', top: '50%', left: '10%' }}
					size="large"
					open={this.state.open}
					onClose={this._close}
				>
					<Modal.Content>
						<div>
							<Formik
								initialValues={{
									username: ''
								}}
								validationSchema={Yup.object().shape({
									username: Yup.string()
										.required()
										.max(255)
								})}
								onSubmit={async (
									values,
									{ setSubmitting, setErrors, resetForm }
								) => {
									try {
										const response = await this.props.client.query({
											query: searchUsers,
											variables: { username: values.search }
										})

										this.setState({ searchUsers: response.data.searchUsers })
										resetForm()
										setSubmitting(false)
									} catch (error) {
										console.log(error)
									}
								}}
								render={props => {
									return (
										<FormBuilder
											{...props}
											formInputs={[
												{
													type: 'text',
													placeholder: 'Search Users',
													name: 'username',
													id: 'search'
												}
											]}
										/>
									)
								}}
							/>
							{this.state.searchUsers.map(user => {
								if (this.props.team.members.find(member => member.id == user.id)) {
									return null
								}

								if (user.id == this.props.team.author.id) {
									return null
								} else {
									return (
										<div key={user.id}>
											<AddMemberComponent
												close={this._close}
												{...this.props}
												user={user}
											/>
										</div>
									)
								}
							})}
						</div>
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default compose(withRouter, withApollo, graphql(addTeamMember))(AddMemberModal)
