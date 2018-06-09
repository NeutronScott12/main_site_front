import React from 'react'
import { Form, Header, Comment, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import Button from 'material-ui/Button'
import Moment from 'react-moment'
import { withApollo } from 'react-apollo'
import { Formik } from 'formik'
import Yup from 'yup'
import styled from 'styled-components'

import { createReply, queryComments, createComment } from '../graphql'

import FormBuilder from '../../utils/Formbuilder'

const validation = Yup.object().shape({
	message: Yup.string()
		.required()
		.trim()
		.max(255)
})

const LikeButton = styled.div`
	cursor: pointer;
	:hover {
		color: #ff3535;
	}
`

const CommentView = props => (
	<Comment.Group size="large">
		{props.data.queryComment.map(comment => {
			return (
				<Comment as="span" key={comment.id}>
					{/* <Image size="mini" src={comment.author.avatar_url} /> */}
					<Comment.Content style={{ marginTop: '1rem' }}>
						<Comment.Author as="span">
							<Link to={`/profile/${comment.author.username}`}>
								{comment.author.username}
							</Link>
						</Comment.Author>
						<Comment.Metadata>
							<div>
								<Moment fromNow date={new Date(comment.createdAt)} />
							</div>
							<LikeButton onClick={() => props.likeComment(comment.id)}>
								<Icon name="thumbs up" /> {comment.ratings.vote}
							</LikeButton>
						</Comment.Metadata>
						<Comment.Text>{comment.body}</Comment.Text>
						<Comment.Actions>
							<Comment.Action onClick={e => props.toggleReply(e, comment.id)}>
								Reply
							</Comment.Action>
							<div
								id={`comment-${comment.id}`}
								style={{
									display: props.replyState ? 'block' : 'none'
								}}
							>
								<Formik
									initialValues={{ message: '' }}
									validationSchema={validation}
									onSubmit={async (
										{ message },
										{ setSubmitting, setErrors, resetForm }
									) => {
										const response = await props.mutate({
											variables: {
												comment: message,
												parentId: comment.id,
												pageId: comment.parentId,
												repliedTo: comment.author.username
											},
											update(
												proxy,
												{
													data: { createReply }
												}
											) {
												const data = proxy.readQuery({
													query: queryComments,
													variables: {
														parentId: props.parentId
													}
												})

												data.queryComment
													.find(
														comment =>
															comment.id == createReply.parentId
													)
													.replies.unshift(createReply)

												proxy.writeQuery({
													query: queryComments,
													varibles: {
														parentId: props.parentId
													},
													data
												})
											}
										})
										props.toggleReply(_, comment.id)

										resetForm()
									}}
									render={props => (
										<FormBuilder
											{...props}
											formInputs={[
												{
													name: 'message',
													type: 'text',
													placeholder: 'reply'
												}
											]}
										/>
									)}
								/>
							</div>
						</Comment.Actions>
					</Comment.Content>
					<Comment.Group size="large">
						{comment.replies.map(reply => {
							const show =
								reply.repliedTo != undefined
									? `@${reply.repliedTo}: ${reply.body}`
									: `${reply.body}`
							return (
								<Comment as="span" key={reply.id}>
									{/* <Image size="mini" src={comment.author.avatar_url} /> */}
									<Comment.Content style={{ marginTop: '1rem' }}>
										<Comment.Author as="span">
											<Link to={`/profile/${reply.author.username}`}>
												{reply.author.username}
											</Link>
										</Comment.Author>
										<Comment.Metadata>
											<div>
												<Moment fromNow date={new Date(reply.createdAt)} />
											</div>
											<LikeButton onClick={() => props.likeComment(reply.id)}>
												<Icon name="thumbs up" /> {reply.ratings.vote}
											</LikeButton>
										</Comment.Metadata>
										<Comment.Text>{show}</Comment.Text>
										<Comment.Actions>
											<Comment.Action
												onClick={e => props.toggleReply(e, reply.id)}
											>
												Reply
											</Comment.Action>
											<div
												id={`comment-${reply.id}`}
												style={{
													display: props.replyState ? 'block' : 'none'
												}}
											>
												<Formik
													initialValues={{ message: '' }}
													validationSchema={validation}
													onSubmit={async (
														values,
														{ setSubmitting, setErrors, resetForm }
													) => {
														const response = await props.client.mutate({
															mutation: createReply,
															variables: {
																comment: values.message,
																parentId: comment.id,
																pageId: reply.pageId,
																repliedTo: reply.author.username
															},
															update: (
																store,
																{ data: { createReply } }
															) => {
																const data = store.readQuery({
																	query: queryComments,
																	variables: {
																		parentId: comment.parentId
																	}
																})

																data.queryComment
																	.find(
																		comment =>
																			comment.id ==
																			reply.parentId
																	)
																	.replies.push(createReply)

																store.writeQuery({
																	query: queryComments,
																	variables: {
																		parentId: comment.parentId
																	},
																	data
																})
															}
														})
														props.toggleReply(_, reply.id)

														resetForm()
													}}
													render={replyProps => (
														<FormBuilder
															{...replyProps}
															formInputs={[
																{
																	name: 'message',
																	type: 'text',
																	placeholder: 'reply'
																}
															]}
														/>
													)}
												/>
											</div>
										</Comment.Actions>
									</Comment.Content>
								</Comment>
							)
						})}
					</Comment.Group>
				</Comment>
			)
		})}
	</Comment.Group>
)

export default withApollo(CommentView)
