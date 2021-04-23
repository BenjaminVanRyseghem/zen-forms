import FormikBuilder from "../formikBuilder/formikBuilder";
import ReactstrapPlugin from "../../plugins/reactstrapPlugin";

export default class FormikReactstrapBuilder extends FormikBuilder {}

FormikReactstrapBuilder.register(new ReactstrapPlugin());
