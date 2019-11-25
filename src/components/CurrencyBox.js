import React from "react";
import '../css/currencyBox.css'


function CurrencyBox(props) {
    const locale = props.item.locale;
    const rate = props.state[props.item.code].rate_float;

    const convertedAmount = props.state.amount * rate;

    return (
        <div className="currency-box">
            <input placeholder={props.item.code}
                   value={props.state.amount !== ""
                       ? convertedAmount.toLocaleString(locale, {style: 'currency', currency: props.item.code})
                       : ""}
                   readOnly
            />
            <div className="x-sign" onClick={() => {props.handleClick(props.item.id)}}>X</div>
        </div>
    );
}

export default CurrencyBox