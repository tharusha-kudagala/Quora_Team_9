import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { List, Avatar, Icon, Divider, Tooltip, Skeleton } from "antd";
import { connect } from "react-redux";
import Comments from "../comments/Comments"
import * as actions from "../../actions/profileActions"
import axios from "axios";

export class ProfileAnswers extends Component {

    constructor(props){
        super(props);
        this.state={
            answers: "",
            user_id: "",
        }
    }
	componentDidMount() {
		// if(this.props.match.params.user_id){
		// 	this.props.getQuestionsAnswered(this.props.match.params.user_id);
		// }
		// else{
		// 	this.props.getQuestionsAnswered(cookie.load('cookie').id);
		// }
		this.props.getQuestionsAnswered(this.props.user)
	}	

	handleAnswerUpvote = (answerId) => {
		console.log(`In handleUpvote: answerId - ${answerId}`);

		const body = {
			//TODO: Remove hardcoding
			"userId": "5cc3f69dd23457601476d016"
		}

		axios.defaults.withCredentials = true;
		axios.post(`${process.env.REACT_APP_BACKEND_API_URL}:${process.env.REACT_APP_BACKEND_API_PORT}/answers/${answerId}/upvote`, body)
		.then(response => {
			console.log(`Response: ${response}`);
			if(response.status === 200){
				console.log(`Upvoted answer successfully questionActions->getQuestionsAnswersForFeed(): ${response.data}`);
				// dispatch({
				// 	type: FEED,
				// 	payload: response.data
				// });
			}
		}).catch(error => {
			console.log(`Upvoting answer failed: questionActions->getQuestionsAnswersForFeed() - ${error}`);
		});

	}

	handleAnswerDownvote = (answerId) => {
		console.log(`In handleDownvote: answerId - ${answerId}`);

	}

	handleAnswerComments = (answerId) => {
		console.log(`In handleComments: answerId - ${answerId}`);

	}
	handleAnswerBookmarks = (answerId) => {
		console.log(`In handleBookmarks: answerId - ${answerId}`);

	}

	handleQuestionAnswer = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}
	handleQuestionAnswer = (questionId) => {
		console.log(`In handleQuestionAnswer: questionId - ${questionId}`);

	}

	render() {

		let redirectVar = null;
		if (!cookie.load("cookie")) {
			redirectVar = <Redirect to="/login" />;
		}
		console.log(this.props.answers)
		return (
			<div>
				{redirectVar}
				<List
					itemLayout="vertical"
					size="large"
					
					pagination={{
						onChange: page => {
							console.log(page);
						},
						pageSize: 5
					}}
                    
					dataSource={this.props.answers}
					renderItem={question => (
						<div>
							<List.Item 
								key={question._id}
								actions={[
									<Tooltip title="Answers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="form" style={{ marginRight: 8 }} />{question.answers.length}</Tooltip>,
									<Tooltip title="Followers" onClick={()=>{this.handleQuestionAnswer(question._id)}}><Icon type="wifi" style={{ marginRight: 8 }} />{question.followers.length}</Tooltip>
								]}
							>
								<List.Item.Meta
									title={question.questionText}
								/>
								<List
									itemLayout="vertical"
									dataSource={question.answers}
									renderItem={answer => (
										<div>
											<List.Item 
												split={true}
												key={answer._id}
												actions={[
													<Tooltip title="Upvotes" onClick={()=>{this.handleAnswerUpvote(answer._id)}}><Icon type="like" style={{ marginRight: 8 }} />{answer.upvotes.length}</Tooltip>,
													<Tooltip title="Downvotes" onClick={()=>{this.handleAnswerDownvote(answer._id)}}><Icon type="dislike" style={{ marginRight: 8 }} />{answer.downvotes.length}</Tooltip>,
													<Tooltip title="Comments" onClick={()=>{this.handleAnswerComments(answer._id)}}><Icon type="message" style={{ marginRight: 8 }} />{answer.bookmarks.length}</Tooltip>, 
													<Tooltip title="Bookmarks" onClick={()=>{this.handleAnswerBookmarks(answer._id)}}><Icon type="book" style={{ marginRight: 8 }} />{answer.comments.length}</Tooltip>
												]}
											>
												<List.Item.Meta
													avatar={
														<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
													}
													title={answer.userId ? answer.userId.firstName+" "+answer.userId.firstName : ""	}
												/>
												{answer.answerText}
											</List.Item>
											<Comments />
										</div>
									)}
								/>
							</List.Item>
						</div>
					)}
				/>
			</div>
		);
	}
}

function mapStatetoProps(state) {
    return{
        answers: state.profile.questionsAnswered
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        getQuestionsAnswered: (user_id) => dispatch(actions.getQuestionsAnswered(user_id))
    };
}

export default connect(mapStatetoProps,mapDispatchToProps)(ProfileAnswers);