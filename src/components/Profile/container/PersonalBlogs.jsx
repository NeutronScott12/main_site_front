import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import LoadingComponent from '../../utils/Recompose/LoadingComponent'
import { CircularSpinner } from '../../utils/animations/Spinner'

import BlogsView from '../../Blog/views/BlogIndexView'
import TableView from '../views/table/BlogControls'

import { personalBlogs } from '../graphql'

const PersonalBlogs = ({ data: { personalBlogs }, user }) => (
	<div>
		{personalBlogs.blogs.length == 0 ? (
			<div>No Blogs Currently</div>
		) : (
			<div>
				{user.username == personalBlogs.blogs[0].author.username ? (
					<TableView data={personalBlogs} />
				) : (
					<BlogsView posts={personalBlogs.blogs} />
				)}
			</div>
		)}
	</div>
)

const mapStateToProps = state => ({
	user: state.loginReducer
})

export default compose(
	withRouter,
	connect(mapStateToProps),
	graphql(personalBlogs, {
		options: props => {
			return {
				variables: {
					id: props.location.state.author,
					limit: 5,
					skip: 0
				}
			}
		}
	}),
	LoadingComponent(props => props.data.loading, CircularSpinner)
)(PersonalBlogs)
