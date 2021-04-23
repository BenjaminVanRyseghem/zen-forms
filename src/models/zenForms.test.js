import { Dropdown } from "../models/index";

describe("formBuilder", () => {
	it("creates an chain of inputs", () => {
		let input = new Dropdown("typeOfContract")
				.value("boc", "Bon de commande")
				.value("contract", "Contrat")
				.value("quote", "devis");
		debugger;
	});
});
