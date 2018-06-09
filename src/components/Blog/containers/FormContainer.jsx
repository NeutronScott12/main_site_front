import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { withFormik, Formik } from 'formik'
import { EditorState } from 'draft-js'
import Yup from 'yup'

import RichTextEditor from '../../utils/RichTextEditor'

import BlogForm from '../views/BlogForm'
import { addBlog, updateBlog, queryBlogs } from '../graphql'

class FormContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			publish: false
		}
	}

	componentDidMount() {
		if (this.props.location.state != undefined) {
			this.setState({
				text: this.props.location.state.post.body
			})
		}
	}

	_handleCheckChange = event => {
		this.setState({ [event.target.name]: event.target.checked })
	}

	_handleChange = value => {
		this.setState({ text: value })
	}

	render() {
		// const { location: { state: { post } } } = this.props

		let post = null
		if (this.props.location.state != undefined) {
			post = this.props.location.state.post
			// this.setState({ text: post.body })
		}

		return (
			<div>
				<Formik
					initialValues={{
						title: '',
						short_description: '',
						body: '',
						category: '',
						publish: false,
						files: []
					}}
					validationSchema={Yup.object().shape({
						title: Yup.string()
							.required()
							.trim(),
						category: Yup.string()
							.required()
							.trim(),
						short_description: Yup.string()
							.required()
							.max(255),
						publish: Yup.boolean()
					})}
					onSubmit={async (values, { setSubmitting, setErrors }) => {
						let response
						if (location.pathname == '/blogs/add-blog') {
							try {
								const info = {
									title: String(values.title).trim(),
									short_description: values.short_description,
									body: this.state.text,
									category: values.category,
									published: Boolean(this.state.publish),
									banner_image: values.files[0]
								}

								const response = await this.props.addBlog({
									variables: info
								})

								if (response.data.createBlog) {
									this.props.history.push({
										pathname: `/blogs/blog/${response.data.createBlog.slug}`,
										state: {
											blogId: response.data.createBlog.id
										}
									})
								} else {
									setSubmitting(false)
								}
							} catch (err) {
								console.log(err)
								setSubmitting(false)
							}
						} else {
							const { state } = this.props.location

							const title = values.title == '' ? state.post.title : values.title
							const category =
								values.category == '' ? state.post.category : values.category
							const short_description =
								values.short_description == ''
									? state.post.short_description
									: values.short_description
							const published =
								values.published == '' ? this.state.publish : values.published

							response = await this.props.updateBlog({
								variables: {
									id: state.post.id,
									slug: this.props.match.params.slug,
									title: title == null ? state.post.title : title,
									body: this.state.text || state.post.body,
									category: category == null ? state.post.category : category,
									short_description:
										short_description == null
											? state.post.short_description
											: short_description,
									published
								}
							})

							if (response.data.updatePost) {
								this.props.history.push(`/blog/${response.data.updatePost.slug}`)
							} else {
								setSubmitting(false)
							}
						}
					}}
					render={props => {
						return (
							<div>
								<BlogForm
									richTextValue={this.state.text}
									value={post != null ? post : ''}
									richTextValue={this.state.text}
									checkedValue={this.state.publish}
									richTextHandleChange={this._handleChange}
									handleCheckChange={this._handleCheckChange}
									{...props}
									{...this.props}
									richTextEditor={true}
									dropZone={true}
								/>
							</div>
						)
					}}
				/>
			</div>
		)
	}
}

export default compose(
	withRouter,
	graphql(addBlog, { name: 'addBlog' }),
	graphql(updateBlog, { name: 'updateBlog' })
)(FormContainer)
