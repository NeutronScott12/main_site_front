import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Formik } from 'formik'
import { Link, withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import { Modal } from 'semantic-ui-react'
import Yup from 'yup'

import { createChannel, showTeam as Team } from '../../graphql'

import FormBuilder from '../../../utils/Formbuilder'

class AddChannelContainer extends Component {
	state = { open: false }

	show = () => this.setState({ open: true })
	close = () => this.setState({ open: false })
	render() {
		const { open, size } = this.state
		return (
			<div>
				<Button onClick={this.show}>Add Channel</Button>

				<Modal
					style={{ position: 'absolute', top: '50%', left: '10%' }}
					size="large"
					open={open}
					onClose={this.close}
				>
					<Modal.Content>
						<Formik
							initialValues={{ name: '' }}
							validationSchema={Yup.object().shape({
								name: Yup.string()
									.required()
									.max(255)
							})}
							onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
								const { showTeam, match, mutate } = this.props
								try {
									const response = await mutate({
										variables: {
											name: values.name,
											teamId: showTeam.id
										},
										update(
											store,
											{
												data: { createChannel }
											}
										) {
											const data = store.readQuery({
												query: Team,
												variables: {
													teamSlug: match.params.team_slug,
													channelSlug: match.params.channel_slug
												}
											})

											data.showTeam.channels.push(createChannel)
											store.writeQuery({
												query: Team,
												variables: {
													teamSlug: match.params.team_slug,
													channelSlug: match.params.channel_slug
												},
												data
											})
										}
									})

									this.close()
								} catch (e) {
									console.log(e)
								}
							}}
							render={props => (
								<FormBuilder
									{...props}
									formInputs={[
										{
											type: 'text',
											name: 'name',
											label: 'Name'
										}
									]}
								/>
							)}
						/>
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default compose(withRouter, graphql(createChannel))(AddChannelContainer)
