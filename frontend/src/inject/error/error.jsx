"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./buttonCard.css");
var ErrorType;
(function (ErrorType) {
    ErrorType["error_500"] = "We are sorry, an unexpected error has occurred. Please try again";
    ErrorType["account_already_in_use"] = "Sorry, this e-mail is already in use. Would you like to log in?";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
function Error(props) {
    var label = props.errorType;
    return (<div id="error">
            <h5>
                {label}
            </h5>
        </div>);
}
exports.Error = Error;
