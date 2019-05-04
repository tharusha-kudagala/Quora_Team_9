var express = require("express");
var topic = express.Router();
var QuestionModel = require("../model/QuestionSchema");
var UserModel = require("../model/UserSchema");
var kafka = require("../kafka/client");
var client = require("../resources/redis");

//Follow a Topic

topic.post("/topics/follow", async (req, res) => {
	try {
		let { userId, topicId } = req.body;
		let result = await UserModel.update(
			{ _id: userId },
			{
				$push: { topicsFollowed: topicId }
			}
		);
		res.status(200).json({});
	} catch (error) {
		res.send(error);
	}
});

// Search topic
topic.get("/:topicId", (request, response) => {
	console.log(`\n\nInside Get /topics/:topicId`);
	TopicModel.find({}, (error, topicDocument) => {
		if (error) {
			console.log(
				`Error while getting topics ${
					request.params.userId
				}:\n ${error}`
			);
			response.status(500).json({
				error: error,
				message: `Error while getting topics ${request.params.userId}`
			});
		} else if (topicDocument) {
			console.log(
				`Error while getting topics ${
					request.params.userId
				}:\n ${topicDocument}`
			);
			let result = topicDocument;
			response.status(200).json(result);
		} else {
			response.status(404).json({ message: `Topic not found` });
		}
	});
});

//GET QUESTIONS FOR A PARTICULAR TOPIC (FOR FEED)

topic.get("/:topicId/questions/following", async (req, res) => {
	let topicId = req.params.topicId;

	let result = await QuestionModel.find({ topics: topicId })
		.populate("answers")
		.exec();

	console.log("questions: ", result);
	res.end(JSON.stringify(result));
});

//GET ALL QUESTIONS FOR ALL TOPICS FOLLOWED (FOR FEED)

topic.get("/questions/following", async (req, res) => {
	let result = await UserModel.find({}, "topicsFollowed")
		.populate({
			path: "questions"
		})
		.populate({
			path: "answers"
		})
		.exec();

	console.log("questions: ", result);
	res.end(JSON.stringify(result));
});
module.exports = topic;
