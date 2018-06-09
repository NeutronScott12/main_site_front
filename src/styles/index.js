import styled from 'styled-components'

const opacity = '75'

export const Header = styled.div`
	text-decoration: none;
	display: grid;
	background: #000;
	grid-gap: 10px;
	margin-bottom: 2rem;
	padding: 0;
	grid-auto-rows: minmax(100px, auto);
	grid-template-columns: 1fr 1fr;
`

export const BrandHeader = styled.div`
	font-size: 1.8rem;
	padding-left: 1rem;
	display: flex;
	align-items: center;
	> a {
		text-decoration: none;
		color: #fff;
		text-transform: uppercase;
	}
	/* background: #000; */
	/* grid-row-start: 1;
	grid-row-end: 2; */
`

export const HeaderGroup = styled.div`
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

export const HeaderItem = styled.div`
	> a {
		text-decoration: none;
		color: #fff;
	}
	text-decoration: none;
	font-size: 1.5rem;
	margin: 0 1rem;
`

export const Container = styled.div`
	width: 80%;
	margin: 1.2rem auto;
`

export const MainTheme = styled.div`
	font-size: 1.2rem;
	> a {
		text-decoration: none;
		color: #2391ff;
	}
`

export const Button = styled.button`
	padding: 0.5rem 0.8rem;
	border-radius: 0.5rem;
	background: #fff;
	outline: none;
	font-size: 1.1rem;
	cursor: pointer;
	box-shadow: 2px 3px 5px -3px rgba(0, 0, 0, ${opacity});
	border: 0.18rem solid #2391ff;
	color: #2391ff;
	transition: background 400ms ease-in-out;
	&:hover {
		background: #000;
	}

	> a {
		text-decoration: none;
		color: #2391ff;
	}
`

export const Table = styled.table`
	width: 100%;
	/* display: grid; */
	> thead {
		font-size: 2rem;
	}

	> tbody {
		font-size: 1.2rem;

		> tr {
			&:nth-child(odd) {
				/* background: black; */
				color: white;
			}
			&:nth-child(even) {
				background: white;
				color: black;
			}
			> td {
				> a {
					text-decoration: none;
					color: lightblue;
				}
				.buttonGroup {
					display: flex;
					> button {
						flex: auto;
					}
				}
			}
		}
	}
`

export const Form = styled.form`
	text-align: center;
	display: grid;
	grid-gap: 1;
	width: ${props => (props.width ? props.width : '100%')};
	grid-gap: 1rem;
	margin: 0 auto;
`

export const Input = styled.input`
	outline: none;
	padding: 0.5rem;
	font-size: 1.2rem;
	border-radius: 0.2rem;
	height: ${props => (props.height ? props.height : '')};
	border-color: ${props => {
		if (props.error && props.touched) {
			return 'red'
		} else if (props.valid) {
			return 'green'
		}
	}};
`

export const TextArea = styled.textarea`
	padding: 0.5rem;
	font-size: 1.2rem;
	border-radius: 0.2rem;
	min-height: 5rem;
	max-height: 20rem;
	height: ${props => (props.height ? props.height : '')};
	resize: vertical;
	border-color: ${props => {
		if (props.error && props.touched) {
			return 'red'
		} else if (props.valid) {
			return 'green'
		}
	}};
`

export const Alert = styled.div`
	border: 1px solid red;
	padding: 1rem;
	margin: 1rem;
	color: ${props => (props.colour ? props.colour : 'red')};
	border-radius: 0.2rem;
	font-size: 1.5rem;
`
