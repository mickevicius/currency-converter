import React from "react";

function Option(props) {
    return (
        <option value={props.item.id} >{props.item.code}</option>
    )
}

export default Option