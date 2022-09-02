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

	calculateUserScores(quest) {
		let scores = this.trialsDone(quest.trials).slice()
		let filteredScoresMap = scores.reduce((accumulator, scoreObject) => {
			let key = scoreObject['userId'];
			if (!accumulator[key]) {
				accumulator[key] = [];
			}
			accumulator[key].push(scoreObject);
			return accumulator;
		}, {});

		const userScores = Object.values(filteredScoresMap)
		
		let reducedUserScores = []
		userScores.forEach((scoresMap) => {
			reducedUserScores.push(scoresMap.reduce((previousValue, nextValue) => {
				return {
					userId: previousValue.userId,
					username: previousValue.username,
					email: previousValue.email,
					pictureUrl: previousValue.pictureUrl,
					score: (previousValue.score + nextValue.score)
				}
			}))
		})
		reducedUserScores.forEach(scoreObject => scoreObject.score = scoreObject.score / this.getNumberToDivideScores(quest))
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
			trialStartDateTimeAdd += trialTimeAmount
			trialFinishDateTimeAdd += trialTimeAmount
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

	getNumberToDivideScores(quest) {

		const convertedCurrentDate = new Date()
		const convertedStartDate = new Date(quest.startDate)
		const convertedFinishDate = new Date(quest.finishDate)
		
		// const currentDateInMillis = convertedCurrentDate.getTime()
		const totalLenghtOfQuestInMillis = convertedFinishDate.getTime() - convertedStartDate.getTime()
		const trialTimeLimitInMillis = totalLenghtOfQuestInMillis / quest.timeInterval

		let numberScoresDivider = 0
		
		if(quest.finished) {
			numberScoresDivider = quest.timeInterval
		} else {
			while(numberScoresDivider < quest.timeInterval) {
				const trialLimitDate = new Date(convertedStartDate.getTime() + (trialTimeLimitInMillis * (numberScoresDivider + 1)))
				if(trialLimitDate < convertedCurrentDate) {
					numberScoresDivider++
				} else {
					break
				}
			}
		}
		return numberScoresDivider
	}

}