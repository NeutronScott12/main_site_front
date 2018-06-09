import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import RichTextEditor from '../../utils/RichTextEditor'
import FormBuilder from '../../utils/Formbuilder'

const styles = _ => ({
	container: {
		margin: 'auto',
		display: 'grid',
		gridGap: '1rem',
		width: '80%',
		alignItems: 'center'
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	}
})

const BlogForm = props => {
	return (
		<div>
			<FormBuilder
				{...props}
				// richTextEditor={{
				// 	on: true,
				// 	value: {
				// 		text: props.richTextValue,
				// 		body: props.value.body,
				// 		match: props.match,
				// 		slug: props.value.slug
				// 	}
				// }}
				formInputs={[
					{
						type: 'text',
						name: 'title',
						label: 'Title',
						defaultValue:
							props.match.url == `/blogs/edit-blog/${props.value.slug}`
								? props.value.title
								: ''
					},
					{
						type: 'text',
						name: 'category',
						label: 'Category',
						defaultValue:
							props.match.url == `/blogs/edit-blog/${props.value.slug}`
								? props.value.category
								: ''
					},
					{
						type: 'textarea',
						name: 'short_description',
						label: 'Short Description',
						defaultValue:
							props.match.url == `/blogs/edit-blog/${props.value.slug}`
								? props.value.short_description
								: ''
					}
				]}
				radioInputs={[
					{
						label: 'Publish',
						checked: false,
						name: 'publish'
					}
				]}
			/>
		</div>
	)
}

export default withStyles(styles)(BlogForm)
