import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import TextField from 'material-ui/TextField'
// import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import styled from 'styled-components'

const Button = styled.button`
	padding: 0.8rem 0;
	min-width: 88px;
	min-height: 36px;
	text-transform: uppercase;
	line-height: 1.4em;
	height: 100%;
	border: none;
	outline: none;
	background: #fff;
	cursor: pointer;
	transition: background 0.2s ease-in;
	position: relative;
	border-radius: 2px;
	&:hover {
		background: #e0e0e0;
	}
`

const styles = _ => ({
	container: {
		margin: 'auto',
		display: 'grid',
		gridGap: '2rem',
		width: '80%',
		alignItems: 'center'
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	title: { margin: '0 1rem', marginTop: '3rem', padding: '1rem' }
})

const DashBoardView = ({
	data: { getProfile },
	handleSubmit,
	handleBlur,
	handleChange,
	editMethod,
	editing,
	classes
}) => {
	return (
		<div>
			<Paper elevation={4}>
				<Typography className={classes.title} variant="headline" component="h2">
					Settings
				</Typography>
				<Card>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<div>
								{editing.email ? (
									<div
										className={classes.container}
										style={{
											display: 'flex',
											flexDirection: 'row',
											// border: '1px solid black'
											width: '100%'
										}}
									>
										<Button onClick={editMethod} name="email">
											Cancel
										</Button>
										<TextField
											onChange={handleChange}
											onBlur={handleBlur}
											style={{
												lineHeight: '2.3',
												marginLeft: '1rem',
												fontSize: 'bold'
											}}
											defaultValue={getProfile.profile.email}
											type="text"
										/>
									</div>
								) : (
									<div
										className={classes.container}
										style={{
											display: 'flex',
											flexDirection: 'row',
											// border: '1px solid black',
											width: '100%'
										}}
									>
										<Button
											className={classes.button}
											onClick={editMethod}
											name="email"
										>
											Edit
										</Button>

										<div
											style={{ lineHeight: '2.3', marginLeft: '1rem' }}
										>{`Email: ${getProfile.profile.email}`}</div>
									</div>
								)}
								{editing.avatarUrl ? (
									<div
										className={classes.container}
										style={{
											display: 'flex',
											flexDirection: 'row',
											// border: '1px solid black'
											width: '100%'
										}}
									>
										<Button onClick={editMethod} name="avatarUrl">
											Cancel
										</Button>
										<TextField
											onChange={handleChange}
											onBlur={handleBlur}
											style={{
												lineHeight: '2.3',
												fontSize: 'bold'
											}}
											defaultValue={getProfile.profile.avatar_url.url}
											type="text"
										/>
									</div>
								) : (
									<div>
										<Button
											className={classes.button}
											onClick={editMethod}
											name="avatarUrl"
										>
											Edit
										</Button>
										<div
											style={{ lineHeight: '2.3', marginLeft: '1rem' }}
										>{`Avatar: ${getProfile.profile.avatar_url.url}`}</div>
									</div>
								)}
							</div>
						</form>
					</CardContent>
				</Card>
			</Paper>
		</div>
	)
}

export default withStyles(styles)(DashBoardView)
