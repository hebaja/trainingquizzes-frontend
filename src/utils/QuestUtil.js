export class QuestUtil {

	trialsDone(trials) {
		let trialsDone = []
		if(trials != null) {
			trials.forEach(trial => {
				if(trial.score != null) {
					trialsDone.push({
						trialId: trial.id,
						userId: trial.user.id,
						username: trial.user.username,
						email: trial.user.email,
						pictureUrl: trial.user.pictureUrl,
						trialNumber: trial.trialNumber,
						score: trial.score
					})
				}
			})
		}
		return trialsDone
	}

	trialsFinishedQuest(trials) {
		let finishedTrials = []
		if(trials != null) {
			trials.forEach(trial => {
				finishedTrials.push({
					trialId: trial.id,
					userId: trial.user.id,
					username: trial.user.username,
					email: trial.user.email,
					pictureUrl: trial.user.pictureUrl,
					trialNumber: trial.trialNumber,
					score: trial.score
				})
			})
		}
		return finishedTrials
	}

	calculateUserScores(scores, property) {
		let filteredScores = scores.reduce((accumulator, scoreObject) => {
			let key = scoreObject[property];
			if (!accumulator[key]) {
				accumulator[key] = [];
			}
			accumulator[key].push(scoreObject);
			return accumulator;
		}, {});
		const userScores = Object.values(filteredScores)
		let reducedUserScores = []
		userScores.forEach((score) => {
			reducedUserScores.push(score.reduce((previousValue, nextValue) => {
				return {
					userId: previousValue.userId,
					username: previousValue.username,
					email: previousValue.email,
					pictureUrl: previousValue.pictureUrl,
					score: (previousValue.score + nextValue.score) / userScores.length 
				}
			}))
		})
		return reducedUserScores.sort((scoreA, scoreB) => scoreB.score - scoreA.score)
	}

}