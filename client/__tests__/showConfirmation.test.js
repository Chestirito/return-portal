import React from "react";
import ReactDOM from 'react-dom';
import ConfirmationPage from '../pages/Confirmation/showConfirmation';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';
import 'core-js';
require("regenerator-runtime/runtime");
global.fetch = require('jest-fetch-mock');

let props = {
    serveoname:"localhost:9000",
    code: "kdfbgk2985",
    email: "randomReturn@email.com"
}

function renderComp(){
    const utils = render(<ConfirmationPage
                            {...props}
                        />);
    return utils;
}

it("renders without issue",()=>{
    renderComp();
})