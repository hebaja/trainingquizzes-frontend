export class MobileUtil {

	isMobile() {
		if( screen.width <= 760 ) {
			return true;
		}
		else {
			return false;
		}
	}

}