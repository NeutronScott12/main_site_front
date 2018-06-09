import React, { Fragment } from 'react'
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

const columnData = [
	{ id: 'title', numeric: false, disablePadding: true, label: 'Title' },
	{ id: 'topics', numeric: true, disablePadding: true, label: 'Topics' },
	{ id: 'created_at', numeric: true, disablePadding: true, label: 'Created At' }
]

const tableView = ({ handleClick, isSelected, n, link }) => {
	return (
		<Fragment>
			{n.subjects.map(subject => {
				return (
					<TableRow
						hover
						aria-checked={isSelected}
						tabIndex={-1}
						key={subject.id}
						selected={isSelected}
					>
						<TableCell>{subject.title}</TableCell>
						<TableCell>{subject.threads.length}</TableCell>
						<TableCell>
							<Moment format="DD/MM/YYYY">
								{new Date(subject.createdAt).toISOString()}
							</Moment>
						</TableCell>
						<TableCell>
							<Link to={`/forums/${link}/${subject.slug}`}>Read More</Link>
						</TableCell>
					</TableRow>
				)
			})}
		</Fragment>
	)
}

const ForumListView = ({ forums }) => {
	return (
		<div>
			{forums.length == 0 ? (
				<div>Currently No Forums</div>
			) : (
				<div>
					{forums.map(forum => {
						return (
							<MyTable
								key={forum.id}
								checkBox={false}
								link="subject"
								columnData={columnData}
								data={forums}
								tableView={tableView}
								title={`${forum.title}`}
								pagination={false}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default ForumListView
