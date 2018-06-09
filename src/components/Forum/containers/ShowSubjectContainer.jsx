import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import Moment from 'react-moment'

import MyTable from '../../utils/TableWithPagination'

import { ShowSubject } from '../graphql'

const styles = {
	button: {
		left: '3rem',
		top: '6rem'
	}
}

const tableView = ({ handleClick, isSelected, n, link }) => {
	return (
		<Fragment>
			<TableRow
				hover
				aria-checked={isSelected}
				tabIndex={-1}
				key={n.id}
				selected={isSelected}
			>
				<TableCell>{n.title}</TableCell>
				<TableCell>{n.author.username}</TableCell>
				<TableCell>
					<Moment format="DD/MM/YYYY">{new Date(n.createdAt).toISOString()}</Moment>
				</TableCell>
				<TableCell>
					<Link to={`/forums/${n.slug}`}>Read More</Link>
				</TableCell>
			</TableRow>
		</Fragment>
	)
}

const columnData = [
	{ id: 'title', numeric: false, disablePadding: true, label: 'Title' },
	{ id: 'author', numeric: false, disablePadding: true, label: 'Author' },
	{ id: 'created_at', numeric: true, disablePadding: true, label: 'Created At' }
]

class ShowSubjectContainer extends Component {
	_addRoute = _ => {
		this.props.history.push(`/forums/${this.props.data.showSubject.slug}/add_thread`)
	}

	render() {
		const {
			data: { loading, showSubject },
			classes
		} = this.props

		return loading ? (
			<div>Loading...</div>
		) : (
			<div>
				<Button
					style={{
						position: 'absolute'
					}}
					onClick={this._addRoute}
					variant="fab"
					color="primary"
					aria-label="add"
					className={classes.button}
				>
					<Icon>add_icon</Icon>
				</Button>
				<MyTable
					key={showSubject.id}
					checkBox={false}
					link={`${showSubject.slug}`}
					columnData={columnData}
					data={showSubject.threads}
					tableView={tableView}
					title={`${showSubject.title}`}
				/>
			</div>
		)
	}
}

export default compose(
	graphql(ShowSubject, {
		options: props => ({
			variables: {
				slug: props.match.params.subject
			}
		})
	}),
	withStyles(styles)
)(ShowSubjectContainer)
