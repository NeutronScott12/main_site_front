import React, { Component, Fragment } from 'react'
import BlogIndexView from '../views/BlogIndexView'
import { compose, graphql, withApollo, Query } from 'react-apollo'
import { withFormik, Formik } from 'formik'
import { connect } from 'react-redux'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'
import { ADD_BLOG } from '../routes/constants'

import { queryBlogs, searchBlogQuery, pinnedBlog } from '../graphql'
import { BlogLayout, BlogSection } from '../styles'
import LatestBlogView from '../views/LatestBlogView'

const TopLayout = styled.div`
	@media (min-width: 1000px) {
		display: grid;
		grid-template-columns: 100px 1fr;
	}
`

const styles = {
	button: {
		left: '3rem',
		top: '6rem'
	},
	formContainer: {
		width: '100%',
		margin: '1rem'
	},
	form: {
		width: '80%',
		margin: 'auto'
	}
}

class BlogContainer extends Component {
	state = {
		isScrolling: false,
		blogs: [],
		searchResult: null
	}

	_addRoute = _ => {
		this.props.history.push(ADD_BLOG)
	}

	// _onMouseMove = e => {
	// 	if (window.scrollY > 1) {
	// 		this.setState({
	// 			isScrolling: true
	// 		})
	// 	} else {
	// 		this.setState({
	// 			isScrolling: false
	// 		})
	// 	}
	// }

	render() {
		const {
			data: { loading, fetchBlogs },
			classes
		} = this.props
		const { isScrolling } = this.state
		const searchResult = localStorage.getItem('searchResult')
		const posts = [...fetchBlogs.blogs]
		const main = fetchBlogs.blogs[0]

		return (
			<Fragment>
				<TopLayout>
					<Button variant="fab" color="primary" aria-label="add" onClick={this._addRoute}>
						<Icon>add_icon</Icon>
					</Button>
					<Formik
						initialValues={{
							searchInput: searchResult
						}}
						validate={values => {
							const errors = {}

							return errors
						}}
						onSubmit={async ({ searchInput }, { setSubmitting, setErrors }) => {
							localStorage.setItem('searchResult', searchInput)
							const response = await this.props.client.query({
								query: searchBlogQuery,
								variables: { searchInput },
								fetchPolicy: 'network-only'
							})

							if (response.data.searchBlog.length > 0) {
								this.setState({
									blogs: [...response.data.searchBlog],
									searchResult: true
								})
							} else {
								this.setState({
									searchResult: false
								})
							}
						}}
						render={({
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
							values
						}) => (
							<form onSubmit={handleSubmit} className={classes.formContainer}>
								<TextField
									className={classes.form}
									defaultValue={values.searchInput}
									type="text"
									name="searchInput"
									placeholder="Search"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Button type="submit">Submit</Button>
							</form>
						)}
					/>
				</TopLayout>

				<BlogLayout>
					<BlogSection columnStart="1" columnEnd="3">
						{this.state.searchResult ? (
							<BlogIndexView posts={this.state.blogs} />
						) : (
							<div>
								<Query query={pinnedBlog}>
									{({ loading, error, data }) => {
										if (loading) return 'Loading...'
										if (error) return `Error! ${error.message}`

										return data.queryPinnedBlogs.length > 0 ? (
											<BlogIndexView
												post={data.queryPinnedBlogs[0].blogs[0]}
												{...this.props.data}
											/>
										) : null
									}}
								</Query>
							</div>
						)}
					</BlogSection>
					<BlogSection columnStart="3" columnEnd="4">
						{fetchBlogs.blogs.length > 0 ? <LatestBlogView posts={posts} /> : null}
					</BlogSection>
				</BlogLayout>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	currentUser: state.loginReducer
})

export default compose(
	withRouter,
	withApollo,
	// connect(),
	graphql(queryBlogs, {
		options: { variables: { limit: 5, offset: 0 } }
	}),
	// graphql(pinnedBlog),
	withStyles(styles),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(BlogContainer)
