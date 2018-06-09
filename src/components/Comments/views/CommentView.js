import React from 'react'
import Button from 'material-ui/Button'
import Moment from 'react-moment'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import { createReply, queryComments, createComment } from '../graphql'
import Typography from 'material-ui/Typography'
import { Formik } from 'formik'
import { compose, graphql } from 'react-apollo'
import Avatar from 'material-ui/Avatar'
import { withRouter, Link } from 'react-router-dom'
import { Form, Header, Comment, Image } from 'semantic-ui-react'
import CommentShow from './Comment'

import FormBuilder from '../../utils/Formbuilder'

const styles = theme => ({
	commentRoot: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3
	}),
	container: {
		margin: 'auto',
		display: 'grid',
		gridGap: '1rem',
		width: '80%',
		alignItems: 'center'
	},
	avatar: {
		display: 'grid',
		gridAutoRows: 'auto',
		gridTemplateColumns: 'repeat(2, 1fr)'
	}
})

const CommentView = props => {
	return (
		<div>
			<FormBuilder
				{...props}
				formInputs={[
					{
						type: 'text',
						placeholder: 'Add a comment',
						name: 'comment',
						label: 'Comment'
					}
				]}
			/>
			<div className={props.classes.container}>
				<CommentShow {...props} />
			</div>
		</div>
	)
}

// {comment.replies.map(reply => {
// 	const show =
// 		reply.repliedTo != undefined
// 			? `@${reply.repliedTo}: ${reply.body}`
// 			: `${reply.body}`
// 	return (
// 		<Comment as="span" key={reply.id}>
// 			{/* <Image size="mini" src={comment.author.avatar_url} /> */}
// 			<Comment.Content style={{ marginTop: '1rem' }}>
// 				<Comment.Author as="span">
// 					<Link to={`/profile/${reply.author.username}`}>
// 						{reply.author.username}
// 					</Link>
// 				</Comment.Author>
// 				<Comment.Metadata>
// 					<div>
// 						<Moment
// 							fromNow
// 							date={new Date(reply.createdAt)}
// 						/>
// 					</div>
// 				</Comment.Metadata>
// 				<Comment.Text>{reply.body}</Comment.Text>
// 				<Comment.Actions>
// 					<Button
// 						onClick={e =>
// 							props.toggleReply(e, reply.id)
// 						}
// 					>
// 						Reply
// 					</Button>
// 				</Comment.Actions>
// 			</Comment.Content>
// 		</Comment>
// 	)
// })}

export default compose(withRouter, graphql(createReply))(withStyles(styles)(CommentView))
