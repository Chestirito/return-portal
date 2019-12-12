import React from "react";
import ReactDOM from 'react-dom';
import FinalPage from '../pages/Confirmation/finalConfirmation';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent, queryByText} from '@testing-library/react';
import 'core-js';
require("regenerator-runtime/runtime");
global.fetch = require('jest-fetch-mock')

let fullProps={
    serveoname:"localhost:9000",
    // step:1,
    review:true,
    // index:0,
    shop:"RandomShopDomainName",
    items:[{
        productID:"3986722488395",
        variantID:"29915527020619",
        name: "Classic Leather Jacket - Get it Today - medium",
        title: "Classic Leather Jacket - Get it Today",
        variantTitle: "medium",
        price: 59.99,
        reason: "Broken",
        quantity: 1,
        status: "submitted",
        flag: "0",
    },
    {
        productID:"3986774839395",
        variantID:"299110293850619",
        name: "Warm Wool Gloves - Get it Today - small",
        title: "Warm Wool Gloves - Get it Today",
        variantTitle: "small",
        price: 20.99,
        reason: "Broken",
        quantity: 2,
        status: "submitted",
        flag: "0",
    }],
    finishOrder: jest.fn()
}

beforeEach(()=>{
    window.scrollTo = jest.fn();

    fetch.mockResponse(JSON.stringify({
        product:{
            image:{
                src: "imageSourceURL"
            }
        }
    }))
})

afterEach(()=>{
    jest.clearAllMocks();
})

function renderComp(){
    const utils = render(<FinalPage 
        {...fullProps}
    />);
    return utils
}

it("render without crashing", ()=>{
    renderComp();
})

it("do not show submit button when reviewing", ()=>{
    const {queryByText} = renderComp()
    expect(queryByText(/Submit/i)).not.toBeInTheDocument();
})

it("show submit button when not reviewing", ()=>{
    const div = document.createElement("div");

    const {queryByText} = render(<FinalPage 
                {...fullProps}
                review={false}
            />, div);
    expect(queryByText(/Submit/i)).toBeInTheDocument();
})

