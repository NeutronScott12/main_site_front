import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'
import Moment from 'react-moment'

import MyTable from '../../../utils/TableWithPagination'

const columnData = [
	{ id: 'title', numeric: false, disablePadding: true, label: 'Title' },
	{ id: 'short_description', numeric: true, disablePadding: true, label: 'Short Description' },
	{ id: 'category', numeric: true, disablePadding: true, label: 'Category' },
	{ id: 'published', numeric: true, disablePadding: true, label: 'Published' },
	{ id: 'createdAt', numeric: true, disablePadding: true, label: 'Created At' },
	{ id: 'info', numeric: true, disablePadding: true, label: 'Info' }
]

const tableView = ({ handleClick, isSelected, n, link, history }) => {
	return (
		<TableRow
			hover
			onClick={event => handleClick(event, n.id)}
			role="checkbox"
			aria-checked={isSelected}
			tabIndex={-1}
			key={n.id}
			selected={isSelected}
		>
			<TableCell padding="checkbox">
				<Checkbox checked={isSelected} />
			</TableCell>
			<TableCell>{n.title}</TableCell>
			<TableCell>{n.short_description}</TableCell>
			<TableCell>{n.category}</TableCell>
			<TableCell>{`${n.published}`}</TableCell>
			<TableCell>
				<Moment format="DD/MM/YYYY">{new Date(n.createdAt).toISOString()}</Moment>
			</TableCell>
			<TableCell>
				<Button
					onClick={() =>
						history.push({
							pathname: `/blogs/blog/${n.slug}`,
							state: {
								blogId: n.id
							}
						})
					}
				>
					Read More
				</Button>
			</TableCell>
		</TableRow>
	)
}

class BlogControls extends Component {
	render() {
		return (
			<div>
				<MyTable
					link="blog"
					title={`Blogs`}
					checkBox={true}
					columnData={columnData}
					tableView={tableView}
					data={this.props.data.blogs}
				/>
			</div>
		)
	}
}

export default withRouter(BlogControls)
