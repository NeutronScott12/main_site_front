import styled from 'styled-components'

export const ProfileLayout = styled.div`
	display: grid;
	grid-gap: 1rem;

	@media (min-width: 1028px) {
		grid-auto-columns: max-content;
		grid-template-columns: 1fr 2fr 1fr;
	}

	@media (max-width: 600px) {
		grid-template-rows: auto;
	}
`

export const ProfileSection = styled.div`
	border: 1px solid #000;
	padding: 1rem;
	@media (max-width: 600px) {
		width: 100%;
	}
`

export const CommentsSection = styled.div`
	border: 1px solid #000;
	@media (max-width: 600px) {
		width: 100%;
	}
`
export const FriendsSection = styled.div`
	border: 1px solid #000;
	@media (max-width: 600px) {
		width: 100%;
	}
`

export const ImageProfile = styled.img`
	border-radius: 50%;
	background-size: cover;
	width: 50%;
	height: 50%;
	text-align: 'center';
	border: 1px solid #000;
`

export const OrdersLayout = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.3);
	border-radius: 0.25rem;
	box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.7);
	padding: 0.5rem;
	display: grid;
`

export const OrderItem = styled.div``
