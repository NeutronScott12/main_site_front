import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { withFormik, Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import Yup from 'yup'
import Dropzone from 'react-dropzone'

import FormBuilder from '../../utils/Formbuilder'
import { addProduct } from '../graphql'

class FormContainer extends Component {
	state = { file: '' }

	render() {
		return (
			<div>
				<Formik
					initialValues={{ name: '', price: '', files: [] }}
					validationSchema={Yup.object().shape({
						name: Yup.string()
							.required()
							.trim(),
						price: Yup.number().positive()
					})}
					onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
						const response = await this.props.mutate({
							variables: {
								name: values.name,
								price: values.price,
								picture: values.files[0]
							}
						})
						setSubmitting(false)
						resetForm()
					}}
					render={props => (
						<FormBuilder
							{...props}
							dropZone={true}
							formInputs={[
								{
									type: 'text',
									name: 'name',
									placeholder: 'Name of the product'
								},
								{
									type: 'number',
									name: 'price',
									placeholder: "Product's price"
								}
							]}
						/>
					)}
				/>

				{/* <Dropzone onDrop={([file]) => this.setState({ file })} /> */}
			</div>
		)
	}
}

export default compose(
	withRouter,
	graphql(addProduct),
	withFormik({
		mapPropsToValues: props => ({ name: '', price: '', files: [] }),
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.required()
				.trim(),
			price: Yup.number().positive()
		}),
		async handleSubmit(
			values,
			{
				props: { mutate, history },
				setSubmitting,
				setErrors,
				resetForm
			}
		) {}
	})
)(FormContainer)
