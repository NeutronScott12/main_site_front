import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ViewContainer = styled.div`
	border: 1px solid #e2e0e0;
	border-top: 20px solid #e2e0e0;
	display: flex;
	flex-direction: column;
	border-radius: 2px 2px 0 0;
`

const PostView = styled.div`
	width: 100%;
	margin: 0.2rem 0;
	border-bottom: 1px solid #e2e0e0;
	:last-child {
		border: none;
	}
`

const PostDetails = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const PostContent = styled.div`
	display: flex;
`

const PostTitle = styled.div`
	text-align: center;
	width: 100%;
	padding-top: 0.3rem;
`

const PostImage = styled.img`
	background-size: cover;
	width: 50%;
	height: 50%;
`

const PostDescription = styled.div`
	padding-top: 0.2rem;
	text-align: center;
	flex-grow: 2;
`

const PostComment = styled.div`
	align-content: flex-end;
`

export const LatestBlogView = ({ posts }) => {
	return (
		<ViewContainer>
			{posts.map(post => {
				return (
					<PostView key={post.id}>
						<PostContent>
							<PostImage src={post.banner_image.url} />
							<PostDetails>
								<PostTitle>
									<Link to={`/blogs/blog/${post.slug}`}>{post.title}</Link>
								</PostTitle>
								<PostDescription>{post.short_description}</PostDescription>
								<PostComment>Comments: {post.comments.aggregate.count}</PostComment>
							</PostDetails>
						</PostContent>
					</PostView>
				)
			})}
		</ViewContainer>
	)
}

export default LatestBlogView
