import React from "react";
import ReactDOM from 'react-dom';
import ReviewRestart from '../pages/Confirmation/reviewRestart';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';
import 'core-js';
require("regenerator-runtime/runtime");
global.fetch = require('jest-fetch-mock');

let fullProps={
    serveoname:"localhost:9000",
    orderNum: "948712348734",
    code:"kdfbgk2985",
    email: "fakeemail@flindel.com",
    // step:1,
    // review:true,
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
    restart: jest.fn()
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
    const utils = render(<ReviewRestart 
        {...fullProps}
    />);
    return utils;
}

it("render without crashing", ()=>{
    renderComp();
})

it("restart popup is not in the document if not clicked", ()=>{
    renderComp()

    //fireEvent.click(getByText(/DELETE \+ RESTART/i));
    expect(document.querySelector(".popup")).not.toBeInTheDocument();
})

it("restart popup is toggled when button is clicked", ()=>{
    const {getByText} = renderComp();

    fireEvent.click(getByText(/DELETE \+ RESTART/i));
    expect(document.querySelector(".popup")).toBeInTheDocument();
})

it("return to start when back is cliked", ()=>{
    const {getByText} = renderComp();
    
    const spy = jest.spyOn(fullProps, 'restart');
    fireEvent.click(getByText(/back/i));
    expect(spy).toHaveBeenCalled();
})