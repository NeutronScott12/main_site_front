import React from 'react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'
import { Card, Feed, List, Image } from 'semantic-ui-react'
import { capitaliseFirstword } from '../../../utils/stringfunctions'

const seeBlogs = (history, blogs) => {
	return history.push({
		pathname: `/${blogs[0].author.username}/blogs`,
		state: {
			author: blogs[0].author.id
		}
	})
}

const BlogsView = ({ blogs, history }) => {
	return blogs.length == 0 ? null : (
		<Card>
			<Card.Content>
				<Card.Header>
					<Button
						onClick={() => {
							history.push({
								pathname: `/profile/${blogs[0].author.username}/blogs`,
								state: {
									author: blogs[0].author.id
								}
							})
						}}
					>{`${capitaliseFirstword(blogs[0].author.username)}'s Blogs`}</Button>
				</Card.Header>
				<List>
					{blogs.map(blog => {
						return (
							<List.Item key={blog.id}>
								<List.Content>
									<Button
										onClick={() => {
											history.push({
												pathname: `/blogs/blog/${blog.slug}`,
												state: {
													blogId: blog.id
												}
											})
										}}
									>
										{blog.title}
									</Button>
								</List.Content>
							</List.Item>
						)
					})}
				</List>
			</Card.Content>
		</Card>
	)
}

export default withRouter(BlogsView)
