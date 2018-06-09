import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { cloneDeep } from 'lodash'
import { Confirm } from 'semantic-ui-react'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import { showBlog, deleteBlog, toggleRating, likeBlog } from '../graphql'
import ShowView from '../views/ShowView'
import CommentContainer from '../../Comments/containers'
import { EDIT_BLOG, SHOW_BLOGS } from '../routes/constants'

class ShowContainer extends Component {
	state = { open: false }

	_likeBlog = async _ => {
		const {
			data: { fetchBlog },
			likeBlogMutation
		} = this.props

		await likeBlogMutation({
			variables: {
				blogId: fetchBlog.blog.id
			}
		})
	}

	_edit = _ => {
		const { history, match, data } = this.props
		this.props.history.push({
			pathname: `${EDIT_BLOG}/${match.params.slug}`,
			state: {
				post: data.fetchBlog.blog
			}
		})
	}

	_toggleVote = async (e, boolean) => {
		let they = this
		await this.props.mutate({
			variables: {
				rating: boolean,
				id: this.props.data.fetchPost.post.id
			},
			update(store, { data: toggleRating }) {
				const data = store.readQuery({
					query: showBlog,
					variables: { slug: they.props.match.params.slug }
				})
				const result = cloneDeep(data)

				if (boolean) {
					result.post.upvotes.push(toggleRating.toggleRating.upvotes.pop())
				} else {
					result.post.downvotes.push(toggleRating.toggleRating.downvotes.pop())
				}
				store.writeQuery({
					query: showBlog,
					variables: { slug: they.props.match.params.slug },
					result
				})
			}
		})
	}

	_delete = async _ => {
		try {
			const response = await this.props.deleteBlog({
				variables: {
					id: this.props.data.fetchBlog.blog.id
				}
			})

			if (response.data.deleteBlog.ok) {
				this.props.history.push(SHOW_BLOGS)
			}
		} catch (error) {
			console.log(error)
		}
	}

	_toggleReply = (e, id) => {
		let target = document.querySelector(`#comment-${id}`)

		target.style.display = target.style.display == 'none' ? 'block' : 'none'
	}

	_show = () => this.setState({ open: true })

	_handleConfirm = () => {
		this._delete()
	}

	_handleCancel = () => this.setState({ open: false })

	render() {
		const {
			data: { loading },
			user
		} = this.props

		return this.props.data.fetchBlog ? (
			<div>
				<Confirm
					open={this.state.open}
					style={{ position: 'absolute', left: '25%', bottom: '50%' }}
					onCancel={this._handleCancel}
					onConfirm={this._handleConfirm}
				/>
				<ShowView
					open={this._show}
					likeBlog={this._likeBlog}
					toggle={this._toggleReply}
					toggleVote={this._toggleVote}
					replyState={this.state.replyBox}
					currentUser={user}
					deleteMethod={this._delete}
					editMethod={this._edit}
					{...this.props}
				/>
				<CommentContainer parentId={this.props.data.fetchBlog.blog.id} />
			</div>
		) : null
	}
}

const mapStateToProps = state => ({
	user: state.loginReducer
})

export default compose(
	withRouter,
	graphql(showBlog, {
		options: props => ({
			variables: {
				slug: props.match.params.slug,
				blogId: props.location.state
					? props.location.state.blogId
						? props.location.state.blogId
						: ''
					: ''
			}
		})
	}),
	graphql(toggleRating),
	graphql(deleteBlog, { name: 'deleteBlog' }),
	graphql(likeBlog, { name: 'likeBlogMutation' }),
	connect(mapStateToProps),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(ShowContainer)
