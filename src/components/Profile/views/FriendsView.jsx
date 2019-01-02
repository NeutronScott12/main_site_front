import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { Card, Feed, List, Image, Header, Divider } from 'semantic-ui-react'
import { FriendsSection } from '../styles'

import SearchUserModal from './modals/searchUserModal'

const FriendsView = ({
	friends,
	friendRequests,
	friendResponse,
	history,
	currentUser,
	profileUsername
}) => {
	return (
		<div>
			{friends.length > 0 ||
			friendRequests.edges.length ||
			currentUser.username == profileUsername.username ? (
				<Card>
					<Card.Content>
						{currentUser.username == profileUsername.username && <SearchUserModal />}
						<Divider />
						{friends.length > 0 ? <Card.Header>Friends</Card.Header> : null}
						{friendRequests.edges.length > 0 &&
							currentUser.username == profileUsername.username && (
								<div>
									<Card.Header>Friend Requests</Card.Header>
									<List>
										{friendRequests.edges.map(request => {
											return (
												<List.Item key={request.node.friend_request.id}>
													{/* <Image avatar src={request.avatar_url} /> */}
													<List.Content>
														<List.Header>
															<Link
																to={`/profile/${
																	request.node.friend_request
																		.username
																}`}
															>
																{
																	request.node.friend_request
																		.username
																}
															</Link>
														</List.Header>
														<List.Description>
															<button
																onClick={() =>
																	friendResponse(
																		request.node.friend_request
																			.id,
																		true
																	)
																}
															>
																Accept
															</button>{' '}
															<button
																onClick={() =>
																	friendResponse(
																		request.node.id,
																		false
																	)
																}
															>
																Reject
															</button>
														</List.Description>
													</List.Content>
												</List.Item>
											)
										})}
									</List>
								</div>
							)}
						<List>
							{friends.map(friend => {
								return (
									<List.Item key={friend.id}>
										<List.Content>
											<Link to={`/profile/${friend.username}`}>
												<Header as="h2">
													<Image src={friend.avatar_url.url} />{' '}
													{friend.username}
												</Header>
											</Link>
										</List.Content>
									</List.Item>
								)
							})}
						</List>
					</Card.Content>
				</Card>
			) : null}
		</div>
	)
}

export default withRouter(FriendsView)
