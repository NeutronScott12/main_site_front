import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { withFormik } from 'formik'
import Yup from 'yup'

import { createReply, queryComments, createComment, likeComment } from '../graphql'
import CommentView from '../views/CommentView'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

class CommentContainer extends Component {
	state = {
		repliedTo: ''
	}

	_likeComment = async id => {
		const { likeCommentMutation } = this.props

		await likeCommentMutation({
			variables: {
				commentId: id
			}
		})
	}

	_toggleReply = (e, id, repliedTo) => {
		this.setState({ repliedTo })
		let target = document.querySelector(`#comment-${id}`)

		target.style.display = target.style.display == 'none' ? 'block' : 'none'
	}

	render() {
		return (
			<div>
				<CommentView
					likeComment={this._likeComment}
					repliedTo={this.state.repliedTo}
					toggleReply={this._toggleReply}
					{...this.props}
				/>
			</div>
		)
	}
}

export default compose(
	graphql(queryComments, {
		options: props => ({
			variables: {
				parentId: props.parentId
			}
		})
	}),
	graphql(createComment, {
		name: 'createComment'
	}),
	graphql(likeComment, { name: 'likeCommentMutation' }),
	graphql(createReply, { name: 'createReply' }),
	withFormik({
		mapValuesToProps: props => ({ comment: '' }),
		validationSchema: Yup.object().shape({
			comment: Yup.string()
				.required()
				.trim()
				.max(255)
		}),
		async handleSubmit(
			values,
			{
				props: { createComment, parentId },
				setSubmitting,
				setErrors,
				resetForm
			}
		) {
			try {
				const response = await createComment({
					variables: {
						parentId: String(parentId),
						pageId: parentId,
						comment: values.comment
					},
					update(
						store,
						{
							data: { createComment }
						}
					) {
						const data = store.readQuery({
							query: queryComments,
							variables: {
								parentId
							}
						})

						data.queryComment.unshift(createComment)

						store.writeQuery({
							query: queryComments,
							variables: {
								parentId
							},
							data
						})
					}
				})
				resetForm({})
			} catch (e) {
				setSubmitting(false)
				console.log(e)
			}
		}
	}),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(CommentContainer)
