import React, { Component } from 'react'
import { compose, graphql, Query, Subscription } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import Button from 'material-ui/Button'
import Yup from 'yup'
import { connect } from 'react-redux'

import { Comment, Form, Header } from 'semantic-ui-react'
import Moment from 'react-moment'
import { withFormik } from 'formik'

import {
	showChannel,
	createMessage,
	channelMessageSubscription,
	messageSubscription
} from '../graphql'
import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'
import FormBuilder from '../../utils/Formbuilder'

const LIMIT = 10

const Message = ({ message: { url, body, filetype } }) => {
	if (url != 'empty') {
		if (filetype.startsWith('image/')) {
			return <img src={url} alt="" />
		} else if (filetype === 'text/plain') {
			return <RenderText url={url} />
		} else if (filetype.startsWith('audio/')) {
			return (
				<div>
					<audio controls>
						<source src={url} type={filetype} />
					</audio>
				</div>
			)
		}
	}
	return <Comment.Text>{body}</Comment.Text>
}

class MessageContainer extends Component {
	state = {
		fetchMore: true
	}

	componentDidMount() {
		this.props.data.subscribeToMore({
			document: messageSubscription,
			// variables: {
			// 	channelId: this.props.data.showChannel.id
			// },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev

				if (
					subscriptionData.data.messageSubscription.node.parentId !==
					this.props.data.showChannel.id
				) {
					return prev
				}

				const newComment = subscriptionData.data.messageSubscription.node
				const deepClone = cloneDeep(prev)

				const change = Object.assign({}, deepClone, {
					showChannel: {
						...deepClone.showChannel,
						messages: [newComment, ...prev.showChannel.messages]
					}
				})

				return change
			}
		})
	}

	_fetchMore = async () => {
		const {
			data: { fetchMore, showChannel }
		} = this.props

		await fetchMore({
			variables: {
				skip: showChannel.messages.length
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (fetchMoreResult.showChannel.messages.length < 10) {
					this.setState({ fetchMore: false })
				}

				if (!fetchMoreResult) return prev

				const changed = Object.assign({}, prev, {
					showChannel: {
						...prev.showChannel,
						messages: [
							...prev.showChannel.messages,
							...fetchMoreResult.showChannel.messages
						]
					}
				})
				return changed
			}
		})
	}

	render() {
		const {
			match,
			data: { showChannel },
			user
		} = this.props

		const member = showChannel.members.find(member => member.id == user.id)

		return (
			<div>
				{showChannel.public == true ||
				member != undefined ||
				user.id == showChannel.author.id ? (
					<FormBuilder
						{...this.props}
						formInputs={[
							{
								type: 'text',
								name: 'body',
								label: 'Place a comment'
							}
						]}
					/>
				) : null}

				<Comment.Group size="large">
					{showChannel.messages.map(message => {
						return (
							<Comment key={message.id}>
								<Comment.Avatar src={message.author.avatar_url.url} />
								<Comment.Content>
									<Comment.Author as="a">
										{message.author.username}
									</Comment.Author>
									<Comment.Metadata>
										<Moment fromNow date={new Date(message.createdAt)} />
									</Comment.Metadata>
									<Message message={message} />
								</Comment.Content>
							</Comment>
						)
					})}
				</Comment.Group>
				{this.state.fetchMore ? (
					<div>
						{showChannel.messages.length < LIMIT ? null : (
							<Button onClick={this._fetchMore}>Show More</Button>
						)}
					</div>
				) : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.loginReducer
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps),
	graphql(showChannel, {
		options: props => ({
			variables: { channelSlug: props.match.params.channel_slug, skip: 0, limit: LIMIT },
			fetchPolicy: 'network-only'
		})
	}),
	graphql(createMessage),
	withFormik({
		mapValuesToProps: props => ({ body: '' }),
		validationSchema: Yup.object().shape({
			body: Yup.string()
				.required()
				.max(255)
		}),
		async handleSubmit(values, { props, setSubmitting, setErrors, resetForm }) {
			const response = await props.mutate({
				variables: {
					channelId: props.data.showChannel.id,
					body: values.body
				}
			})
			resetForm()
		}
	}),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(MessageContainer)
