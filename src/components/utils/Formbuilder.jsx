import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Form from 'material-ui/Form'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Switch from 'material-ui/Switch'
import { FormControlLabel, FormHelperText } from 'material-ui/Form'
import Moment from 'react-moment'
import { Message, Grid, Image } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

import ReactQuill from 'react-quill'

import RichTextEditor from './RichTextEditor'

const styles = theme => ({
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
	},
	commentRoot: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3
	}),
	avatar: {
		display: 'grid',
		gridAutoRows: 'auto',
		gridTemplateColumns: 'repeat(2, 1fr)'
	},
	formInput: {
		marginTop: '.3rem'
	}
})

class Thumb extends React.Component {
	state = {
		loading: false,
		thumb: undefined
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.file) {
			return
		}

		this.setState({ loading: true }, () => {
			let reader = new FileReader()

			reader.onloadend = () => {
				this.setState({ loading: false, thumb: reader.result })
			}

			reader.readAsDataURL(nextProps.file)
		})
	}

	render() {
		const { file } = this.props
		const { loading, thumb } = this.state

		if (!file) {
			return null
		}

		if (loading) {
			return <p>loading...</p>
		}

		return (
			<img
				src={thumb}
				alt={file.name}
				className="img-thumbnail mt-2"
				height={200}
				width={200}
			/>
		)
	}
}

class FormBuilder extends Component {
	state = { showPicture: [] }

	_handleChange = name => event => {
		this.setState({ [name]: event.target.checked })
	}

	render() {
		const {
			handleSubmit,
			handleChange,
			handleBlur,
			isSubmitting,
			formInputs = [],
			classes,
			values,
			errors,
			rows,
			rowsMax,
			multiline,
			selectInputs = [],
			radioInputs = [],
			children,
			touched,
			setFieldValue,
			richTextEditor,
			hiddenInputs = [],
			richTextValue,
			richTextHandleChange,
			handleCheckChange,
			dropZone,
			checkedValue
		} = this.props

		return (
			<div className={classes.container}>
				<form className={classes.form} onSubmit={handleSubmit || ''}>
					{formInputs.map((form, i) => {
						return (
							<div key={i} className={classes.form}>
								<TextField
									rows={0 || rows}
									rowsMax={rowsMax || ''}
									mutliline={false || multiline}
									placeholder={form.placeholder || ''}
									onChange={handleChange || ''}
									onBlur={handleBlur || ''}
									type={form.type || 'text'}
									name={form.name || ''}
									id={form.id || form.name}
									className={form.className || classes.formInput}
									error={
										touched[form.name] == true
											? errors[form.name]
												? true
												: false
											: null
									}
									defaultValue={form.defaultValue || ''}
									label={form.label}
								/>
								{touched[form.name] == true ? (
									<div>
										{touched[form.name] && errors[form.name] ? (
											<FormHelperText style={{ fontSize: '1rem' }}>
												{errors[form.name]}
											</FormHelperText>
										) : null}
									</div>
								) : null}
							</div>
						)
					})}

					{hiddenInputs.map((hidden, i) => {
						return (
							<input
								key={i}
								type="hidden"
								onChange={handleChange}
								name={hidden.name}
								defaultValue={hidden.defaultValue}
							/>
						)
					})}

					{radioInputs.map((radio, i) => {
						return (
							<FormControlLabel
								key={i}
								control={
									<Switch
										name={radio.name}
										checked={checkedValue}
										value={String(checkedValue)}
										onChange={handleCheckChange}
									/>
								}
								label="Publish"
							/>
						)
					})}

					{/* {selectInputs.map((select, i) => {
					return (
						<SelectFields
							floatingLabelText={`${select.placeholder}` || ''}
							onChange={handleChange || ''}
						>
							<MenuItem value={true} primaryText="true" />
							<MenuItem value={false} primaryText="false" />
						</SelectFields>
					)
				})} */}

					{dropZone ? (
						<Grid>
							<Grid.Column>
								<h5>Upload Files</h5>
							</Grid.Column>
							<Grid.Column>
								<Dropzone
									accept="image/*"
									onDrop={acceptedFiles => {
										if (acceptedFiles.length == 0) return

										this.setState({
											showFile: acceptedFiles[0]
										})

										setFieldValue('files', values.files.concat(acceptedFiles))
									}}
								>
									{({ isDragActive, isDragReject, acceptedFiles }) => {
										if (isDragActive) {
											return 'this file is authorised'
										}

										if (isDragReject) {
											return 'this file is not authorised'
										}

										if (values.files.length === 0) {
											return <p>Try dragging a file here!</p>
										}

										return values.files.map((file, i) => (
											<Thumb key={i} file={file} />
										))
									}}
								</Dropzone>
							</Grid.Column>
						</Grid>
					) : null}

					{richTextEditor == true ? (
						<div>
							<br />
							<ReactQuill
								theme="snow"
								value={richTextValue}
								onChange={richTextHandleChange}
								onBlur={handleBlur}
								formats={[
									'header',
									'font',
									'size',
									'bold',
									'italic',
									'underline',
									'strike',
									'blockquote',
									'list',
									'bullet',
									'indent',
									'link',
									'image',
									'video',
									'color'
								]}
								modules={{
									toolbar: [
										[{ header: '1' }, { header: '2' }, { font: [] }],
										[{ size: [] }],
										['bold', 'italic', 'underline', 'strike', 'blockquote'],
										[
											{ list: 'ordered' },
											{ list: 'bullet' },
											{ indent: '-1' },
											{ indent: '+1' }
										],
										['link', 'image', 'video'],
										['clean']
									],
									clipboard: {
										// toggle to add extra line breaks when pasting HTML:
										matchVisual: false
									}
								}}
							/>
						</div>
					) : null}

					<Button type="submit" disabled={isSubmitting || false}>
						Submit
					</Button>
				</form>

				{children}
			</div>
		)
	}
}

export default withStyles(styles)(FormBuilder)
