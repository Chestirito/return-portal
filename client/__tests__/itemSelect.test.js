import React from "react";
import ReactDOM from 'react-dom';
import ItemList from '../pages/Confirmation/itemSelect';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';
import 'core-js';
require("regenerator-runtime/runtime");
global.fetch = require('jest-fetch-mock')

let fullProps={
    serveoname:"localhost:9000",
    orderNum: "948712348734",
    code:"kdfbgk2985",
    email: "fakeemail@flindel.com",
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
    handleSubmit: jest.fn(),
    setReturnList: jest.fn()
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
    const utils = render(<ItemList 
        {...fullProps}
    />)
    return utils
}
it("render without crashing", ()=>{
    renderComp();
})

it("submit should not be clickable", ()=>{
    const {getByText} = renderComp();
    
    const spy = jest.spyOn(fullProps, "handleSubmit");
    fireEvent.click(getByText(/continue/i));
    expect(spy).not.toHaveBeenCalled();
})

it("submit clickable after changing quantity to greater than 1", ()=>{
    const {getByText} = renderComp();
    
    const spy = jest.spyOn(fullProps, "handleSubmit");

    const baseElement = document.querySelectorAll(".container3");
    fireEvent.focus(baseElement[0].querySelector(".qty input"));
    fireEvent.mouseDown(baseElement[0].querySelector(".qty__control"));
    fireEvent.click(getByText("1"));

    fireEvent.click(getByText(/continue/i));
    expect(spy).toHaveBeenCalled();
})