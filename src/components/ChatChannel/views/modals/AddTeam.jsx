import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withFormik } from 'formik'
import { Link, withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import { Modal } from 'semantic-ui-react'
import Yup from 'yup'

import { addTeam, showTeams } from '../../graphql'

import FormBuilder from '../../../utils/Formbuilder'

const sluggify = title => {
	return String(title)
		.replace(/ /g, '-')
		.toLowerCase()
}

class AddTeamContainer extends Component {
	state = { open: false }

	_show = () => {
		this.setState({ left: false, open: true })
	}
	_close = () => this.setState({ open: false })

	render() {
		return (
			<div>
				<Button onClick={this._show}>Add Team</Button>

				<Modal
					style={{ position: 'absolute', top: '50%', left: '10%' }}
					size="large"
					open={this.state.open}
					onClose={this._close}
				>
					<Modal.Content>
						<FormBuilder
							{...this.props}
							formInputs={[
								{
									type: 'text',
									name: 'name',
									label: 'Name'
								}
							]}
						/>
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default compose(
	withRouter,
	graphql(addTeam),
	withFormik({
		mapValuesToProps: props => ({ name: '' }),
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.required()
				.max(255)
		}),
		async handleSubmit(
			values,
			{
				props: { mutate, history },
				setSubmitting,
				setErrors,
				resetForm
			}
		) {
			try {
				const response = await mutate({
					variables: {
						name: values.name
					},
					update(
						store,
						{
							data: { addTeam }
						}
					) {
						const data = store.readQuery({ query: showTeams })

						data.showTeams.push(addTeam)

						store.writeQuery({ query: showTeams, data })
					}
				})

				if (response) {
					history.push(
						`/chat-channels/${response.data.createTeam.slug}/${sluggify(
							values.name
						)}-general`
					)
				}
			} catch (e) {
				console.log(e)
			}
		}
	})
)(AddTeamContainer)
