import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { deepClone } from 'lodash'
import Button from 'material-ui/Button'
import { withFormik } from 'formik'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import { showThread, addThreadComment } from '../graphql'
import FormBuilder from '../../utils/Formbuilder'
import CommentContainer from '../../Comments/containers'

const style = theme => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3
	})
})

class ShowThread extends Component {
	_back = () => this.props.history.goBack()

	render() {
		const {
			data: { loading, showThread },
			classes
		} = this.props

		return loading ? (
			<div>Loading..</div>
		) : (
			<div>
				<Button onClick={this._back}>Back</Button>
				<Paper className={classes.root}>
					<Typography variant="headline" component="h2">
						{showThread.title}
					</Typography>
					<Typography
						component="p"
						dangerouslySetInnerHTML={{ __html: showThread.body }}
					/>
					<Typography component="h4">{showThread.author.username}</Typography>
				</Paper>

				<CommentContainer parentId={showThread.id} />
			</div>
		)
	}
}

export default compose(
	withRouter,
	graphql(showThread, {
		options: props => ({
			variables: {
				slug: props.match.params.thread
			}
		})
	}),
	withStyles(style)
)(ShowThread)
