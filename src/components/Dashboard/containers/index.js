import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom'

import { getProfile } from '../graphql'
import DashBoardView from '../views/DashBoardView'

class DashBoardContainer extends Component {
	state = {
		editing: {}
	}

	_edit = e => {
		this.setState({
			editing: { [e.target.name]: !this.state.editing[e.target.name] }
		})
	}

	render() {
		const {
			data: { loading, getProfile }
		} = this.props

		console.log(getProfile)

		return loading ? (
			<div>Loading...</div>
		) : (
			<div>
				{getProfile != undefined ? (
					<DashBoardView
						editing={this.state.editing}
						editMethod={this._edit}
						{...this.props}
					/>
				) : (
					<div>If you see nothing, please refresh</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.loginReducer
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps),
	withFormik({
		mapPropsToValues: props => ({}),
		validate() {},
		async handleSubmit() {}
	}),
	graphql(getProfile, {
		options: props => {
			return {
				variables: { username: props.match.params.username },
				fetchPolicy: 'network-only'
			}
		}
	})
)(DashBoardContainer)
