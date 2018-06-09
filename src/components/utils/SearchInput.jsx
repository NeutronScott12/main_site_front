import React, { Component } from 'react'
import { Formik } from 'formik'

const SearchInput = ({initialValues, validateFunc, onSubmitFunc, render}) => (
	<Formik
        initialValues={initialValues}
		validate={validateFunc}
		onSubmit={onSubmitFunc}
		render={render}
	/>
)

export const SearchInput