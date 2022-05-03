import "./scss/globals.scss";

import React from "react";
import ReactDOM, { render }  from "react-dom";

const root = document.querySelector("#root");

const numbers = [1,2,3,4,5,6];

const LiItems = numbers.map((number)=>(
                                        <li key={number.toString()}>{number}</li>
                                    ));

ReactDOM.render(
    <ul>{LiItems}</ul>,
    root
)
