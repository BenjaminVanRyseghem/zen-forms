import AbstractPlugin from "../models/abstractPlugin";
import Dropdown from "./reactstrap/dropdownReactstrapPlugin";

/**
 * TODO: Write jsdoc
 * @class
 */
export default class ReactstrapPlugin extends AbstractPlugin {
	register(_this) {
		super.register(_this);

		new Dropdown().register(_this);
	}
}
