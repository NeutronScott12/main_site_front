import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import ForumListView from '../views/ForumListView'
import { showAllForums } from '../graphql'

class ForumContainer extends Component {
	render() {
		const { data: { loading, showAllForums } } = this.props

		return loading ? (
			<div>Loading...</div>
		) : (
			<div>
				<ForumListView forums={showAllForums} />
			</div>
		)
	}
}

export default graphql(showAllForums, { options: { variables: { limit: 5, offset: 0 } } })(
	ForumContainer
)
