import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as fasEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as farEnvelope} from '@fortawesome/free-regular-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export class FontAwesomeCreator {

	buildIcons() {
		library.add(
			faCheckCircle, 
			faTimesCircle,
			faXmark,
			faSave, 
			faAt, 
			faLock, 
			faUnlock, 
			faUser,
			faUsers,
			fasEnvelope, 
			farEnvelope, 
			faCaretDown, 
			faPencil, 
			faTrash, 
			faBook,
			faBookOpen,
			faTrashAlt,
			faPlus,
			faArrowLeft, 
			faGoogle,
			faFacebook, 
			faArrowRight,
			faAngleLeft,
			faAngleRight,
			faAnglesLeft,
			faAnglesRight,
			faMagnifyingGlass,
			faChalkboardTeacher,
			faGraduationCap,
			faHourglassStart,
			faHourglassEnd,
			faFlagCheckered,
			faFlag,
			faRectangleList,
			faCalendarDays,
			faStar,
			faList,
			faLink,
			faStarHalfStroke,
			faCheckDouble,
			faGlobe,
			faAndroid,
			faClock)
	}
}

