import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { cloneDeep } from 'lodash'

import {
	friendResponseMutation,
	friendRequestMutation,
	profileQuery,
	friendReject
} from '../graphql'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import ProfileView from '../views/ProfileView'
import FriendsView from '../views/FriendsView'
import CommentContainer from '../../Comments/containers'

import { ProfileLayout } from '../styles'

class ProfileContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	_friendRequestFunc = async (usernameId, currentUser) => {
		const response = await this.props.friendRequest({
			variables: {
				requester: currentUser.id,
				requested: usernameId
			}
		})
	}

	_friendRequestResponse = async (id, boolean) => {
		const {
			friendResponse,
			friendReject,
			match: { params }
		} = this.props
		console.log('ID', id)
		let response
		if (boolean) {
			await friendResponse({
				variables: {
					id
				}
			})
		} else {
			await friendReject({
				variables: {
					id
				},
				refetchQueries: [{ query: profileQuery, variables: { username: params.username } }]
				// update(
				// 	store,
				// 	{
				// 		data: { friendReject }
				// 	}
				// ) {
				// 	const data = store.readQuery({
				// 		query: profileQuery,
				// 		variables: {
				// 			username: params.username
				// 		}
				// 	})

				// 	const changed = cloneDeep(
				// 		data.getProfile.profile.friend_requests.edges.filter(
				// 			obj => obj.node.id !== id
				// 		)
				// 	)
				// 	console.log(data)

				// 	store.writeQuery({
				// 		query: profileQuery,
				// 		variables: {
				// 			username: params.username
				// 		},
				// 		changed
				// 	})
				// }
			})
		}
	}

	_toggleReply = (e, id) => {
		let target = document.querySelector(`#comment-${id}`)

		target.style.display = target.style.display == 'none' ? 'block' : 'none'
	}

	_favouriteComment = (commentId, parentId) => {}

	render() {
		const {
			user,
			data: { getProfile },
			handleBlur,
			handleChange,
			handleSubmit,
			errors,
			touched
		} = this.props

		return (
			<div>
				<ProfileLayout>
					<ProfileView
						currentUser={this.props.user}
						avatarUrl={getProfile.profile.avatar_url.url}
						friends={getProfile.profile.friends}
						username={getProfile.profile.username}
						joinDate={getProfile.profile.createdAt}
						friendRequestFunc={this._friendRequestFunc}
						blogs={getProfile.profile.blogs}
						id={getProfile.profile.id}
					/>
					<CommentContainer parentId={getProfile.profile.id} />
					<FriendsView
						currentUser={this.props.user}
						friends={getProfile.profile.friends}
						profileUsername={getProfile.profile}
						friendRequests={getProfile.profile.friend_requests}
						friendResponse={this._friendRequestResponse}
					/>
				</ProfileLayout>
			</div>
		)
	}
}

const mapStatetoProps = state => ({
	user: state.loginReducer
})

export default compose(
	withRouter,
	withFormik({
		mapPropsToValues: props => ({ message: '' }),
		validate() {},
		async handleSubmit() {}
	}),
	graphql(friendRequestMutation, { name: 'friendRequest' }),
	graphql(friendResponseMutation, { name: 'friendResponse' }),
	graphql(friendReject, { name: 'friendReject' }),
	graphql(profileQuery, {
		options: props => {
			return {
				variables: {
					username: props.match.params.username
				},
				pollInterval: 300000
			}
		}
	}),
	connect(
		mapStatetoProps,
		null
	),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(ProfileContainer)
