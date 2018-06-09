import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import { Formik } from 'formik'
import { showBlog } from '../graphql'
import Moment from 'react-moment'
import { graphql, compose } from 'react-apollo'
import Button from 'material-ui/Button'
import { Image } from 'semantic-ui-react'

import FormBuilder from '../../utils/Formbuilder'

const styles = _ => ({
	container: {
		margin: 'auto',
		display: 'grid',
		gridGap: '1rem',
		width: '80%',
		alignItems: 'center'
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	}
})

const ShowView = ({
	data: { fetchBlog },
	likeBlog,
	handleSubmit,
	handleChange,
	handleBlur,
	touched,
	isSubmitting,
	errors,
	classes,
	editMethod,
	deleteMethod,
	replyState,
	currentUser,
	toggleVote,
	toggle,
	mutate,
	open
}) => {
	const {
		title,
		body,
		author,
		createdAt,
		comments,
		upvotes,
		downvotes,
		ratings,
		banner_image
	} = Object.assign({}, fetchBlog.blog)
	let creator

	if (author != null) {
		creator = author.username
	}

	const datePosted = new Date(createdAt)

	return (
		<Card>
			<CardContent>
				<Image src={banner_image.url} style={{ marginBottom: '1rem', margin: 'auto' }} />
				<div
					dangerouslySetInnerHTML={{ __html: body }}
					style={{ textAlign: 'center', margin: 'auto' }}
				/>
				<p>Written by: {creator}</p>
				<p>Likes {ratings.vote}</p>
				<p>
					Created at: <Moment date={new Date(datePosted)} format="DD/MM/YYYY" />
				</p>

				{/* <p>
							<Button id="plus" onClick={e => toggleVote(e, true)}>
								{upvotes.length} +
							</Button>
							<Button id="negative" onClick={e => toggleVote(e, false)}>
								{downvotes.length} -
							</Button>
						</p> */}

				{currentUser.username == creator || currentUser.role == 'ADMIN' ? (
					<div>
						<Button onClick={likeBlog}>Like</Button>
						<Button onClick={editMethod}>Edit</Button>
						<Button onClick={open}> Delete</Button>
					</div>
				) : null}
			</CardContent>
		</Card>
	)
}

export default withStyles(styles)(ShowView)
