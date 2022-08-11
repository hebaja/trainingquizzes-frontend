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

	generateTrials(fullSelectedStartDateTime, fullSelectedFinishDateTime, trialsQuantity) {
		let trials = []
		let trialStartDateTimeAdd = 0
		let startDate = new Date(fullSelectedStartDateTime)
		let finishDate = new Date(fullSelectedFinishDateTime)
		let trialTimeAmount = (finishDate.getTime() - startDate.getTime()) / trialsQuantity
		let trialFinishDateTimeAdd = trialTimeAmount

		for (let index = 0; index < trialsQuantity; index++) {
			trials.push({
				id: index,
				startDate: new Date(startDate.getTime() + trialStartDateTimeAdd),
				finishDate: new Date(startDate.getTime() + trialFinishDateTimeAdd)
			})
			trialStartDateTimeAdd =+ trialTimeAmount
			trialFinishDateTimeAdd =+ trialTimeAmount
		}
		return trials
	}

	generateMaximumTrialsQuantity(fullSelectedStartDateTime, fullSelectedFinishDateTime) {
		let possibilitiesStartDate 
		let possibilitiesFinishDate 

		if(fullSelectedStartDateTime && fullSelectedFinishDateTime) {
			possibilitiesStartDate = new Date(fullSelectedStartDateTime)
			possibilitiesFinishDate = new Date(fullSelectedFinishDateTime)
		}

		let max = 0
		while (possibilitiesStartDate < possibilitiesFinishDate) {
			max++
			possibilitiesStartDate.setDate(possibilitiesStartDate.getDate() + 1)
		}
		return max
	}

	assertFinishDateHigherThanOneDay(fullSelectedStartDateTime, fullSelectedFinishDateTime) {
		const startDate = new Date(fullSelectedStartDateTime)
		const finishDate = new Date(fullSelectedFinishDateTime)
		const diffDate = new Date(startDate)
		diffDate.setDate(startDate.getDate() + 1)
		return finishDate.getTime() >= diffDate.getTime()
	}

}