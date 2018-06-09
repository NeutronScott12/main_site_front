import React, { Component } from 'react'
import { withFormik, Formik } from 'formik'
import { compose, graphql } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'

import FormBuilder from '../../utils/Formbuilder'
import { createThread } from '../graphql'

class FormContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: ''
		}
	}

	_handleChange = value => {
		this.setState({ text: value })
	}

	render() {
		return (
			<div>
				<Link to={`/forums/subject/${this.props.match.params.subject}`}>Back</Link>
				<h1>Create Thread</h1>
				<Formik
					intialValues={{ title: '' }}
					validate={values => {
						const errors = {}

						if (!values.title) {
							errors.title = 'Title is required'
						}

						return errors
					}}
					onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
						const { mutate, match, history } = this.props
						const response = await mutate({
							variables: {
								subjectSlug: match.params.subject,
								title: values.title,
								body: this.state.text
							}
						})

						if (response.createThread.ok) {
							history.push(`subject/${subjectSlug}`)
						}
					}}
					render={props => (
						<FormBuilder
							richTextValue={this.state.text}
							richTextHandleChange={this._handleChange}
							{...props}
							formInputs={[
								{
									name: 'title',
									type: 'text',
									placeholder: 'Title',
									label: 'Title'
								}
							]}
							selectInputs={[
								{
									placeholder: 'Publish'
								}
							]}
							richTextEditor={true}
						/>
					)}
				/>
			</div>
		)
	}
}

export default compose(withRouter, graphql(createThread))(FormContainer)
