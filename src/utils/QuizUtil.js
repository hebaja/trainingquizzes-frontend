export class QuizUtil {

	configureNextButtonLabel(index, isTrial) {
		if(index <= 8) {
			return 'Next question'	
		} else {
			if(isTrial) return 'Finish'
			return 'Save result'
		}
	}

	configureNextButtonLabelReduced(index) {
		if(index <= 8) {
			return 'Next'	
		} else {
			return 'Finish'
		}
	}

	configureNextButtonIcon(index, isTrial) {
		if(index <= 8) {
			return 'fa-solid fa-arrow-right'	
		} else {
			if(isTrial) return 'fa-solid fa-flag'
			return 'fa-solid fa-save'
		}
	}

	correctWarningOption() {
		return {
			label: 'Righ answer',
			labelReduced: 'Right',
			cardClass: 'bg-success',
			icon: 'fa-solid fa-check-circle'
		}
	}

	incorrectWarningOption() {
		return {
			label: 'Wrong answer',
			labelReduced: 'Wrong',
			cardClass: 'bg-danger',
			icon: 'fa-solid fa-times-circle',
		}
	}

}
