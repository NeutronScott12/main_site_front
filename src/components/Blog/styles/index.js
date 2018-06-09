import styled from 'styled-components'

export const BlogLayout = styled.div`
	@media (min-width: 768px) {
		display: grid;
		grid-gap: 0.8rem;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: auto;
	}

	@media (max-width: 650px) {
		width: 100%;
	}
`

export const BlogSection = styled.div`
	@media (min-width: 768px) {
		grid-column-start: ${props => props.columnStart};
		grid-column-end: ${props => props.columnEnd};
		grid-row-start: ${props => props.rowStart};
		grid-row-end: ${props => props.rowEnd};
	}

	@media (max-width: 650px) {
		width: 100%;
	}
`
