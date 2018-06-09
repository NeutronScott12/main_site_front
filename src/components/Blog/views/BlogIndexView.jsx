import React from 'react'
import { withRouter } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { Image } from 'semantic-ui-react'
import Button from 'material-ui/Button'
import styled from 'styled-components'

import { SHOW_BLOG } from '../routes/constants'

const BannerImage = styled.img`
	width: 100%;
`

const BlogView = ({ post, history }) => {
	if (post == undefined) {
		return <p>Currently no blogs</p>
	} else {
		return (
			<div>
				<Card style={{ marginBottom: '1rem' }} key={post.id}>
					<CardContent>
						<BannerImage src={post.banner_image.url} />
						<h2>{post.title}</h2>
						<h4>{post.short_description}</h4>
						{post.comments.aggregate.count > 0 ? (
							<h4>Comments: {post.comments.aggregate.count}</h4>
						) : null}
						<Button
							onClick={() =>
								history.push({
									pathname: `${SHOW_BLOG}/blog/${post.slug}`,
									state: {
										blogId: post.id
									}
								})
							}
						>
							See More
						</Button>
					</CardContent>
				</Card>
			</div>
		)
	}
}

export default withRouter(BlogView)
