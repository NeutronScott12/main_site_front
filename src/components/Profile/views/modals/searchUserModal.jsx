import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Downshift from 'downshift'
import Button from 'material-ui/Button'
import { Modal, Form, List, Container, Image } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import Yup from 'yup'

import FormBuilder from '../../../utils/Formbuilder'

export const searchUsers = gql`
	query($username: String) {
		searchUsers(username: $username) {
			id
			avatar_url {
				url
			}
			username
		}
	}
`

class SearchUserModal extends Component {
	state = { open: false, selectedUser: undefined, users: [] }

	_show = () => this.setState({ open: true })
	_close = () => this.setState({ open: false })

	_onChange = item => this.setState({ selectedUser: item })

	render() {
		const { open } = this.state

		return (
			<div>
				<Button onClick={this._show}>Search Users</Button>
				<Modal
					style={{ position: 'absolute', top: '50%', left: '10%' }}
					size="large"
					open={open}
					onClose={this._close}
				>
					<Modal.Content>
						<Formik
							initialValues={{ searchItem: '' }}
							validationSchema={Yup.object().shape({
								searchItem: Yup.string()
									.required()
									.trim()
							})}
							onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
								const response = await this.props.client.query({
									query: searchUsers,
									variables: { username: values.searchItem },
									fetchPolicy: 'network-only'
								})

								this.setState({
									users: response.data.searchUsers
								})
								resetForm()
							}}
							render={props => (
								<FormBuilder
									{...props}
									formInputs={[
										{
											name: 'searchItem',
											type: 'text',
											placeholder: 'Search Users'
										}
									]}
								/>
							)}
						/>
						<Container>
							{this.state.users.map(user => {
								console.log('USER', user)
								return (
									<List style={{}} divided relaxed key={user.id}>
										<List.Item>
											<Image avatar src={user.avatar_url.url} />
											<List.Content>
												<Link to={`/profile/${user.username}`}>
													<h4>{user.username}</h4>
												</Link>
											</List.Content>
										</List.Item>
									</List>
								)
							})}
						</Container>
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default withApollo(SearchUserModal)
