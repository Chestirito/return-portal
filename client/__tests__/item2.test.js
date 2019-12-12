import React from "react";
import ReactDOM from 'react-dom';
import Item from '../pages/Confirmation/Item2';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';
import 'core-js';
require("regenerator-runtime/runtime");
global.fetch = require('jest-fetch-mock')

let fullProps={
    serveoname:"localhost:9000",
    step:1,
    review:true,
    index:0,
    shop:"RandomShopDomainName",
    item:{
        productID:"3986722488395",
        variantID:"29915527020619",
        name: "Classic Leather Jacket - Get it Today - medium",
        title: "Classic Leather Jacket - Get it Today",
        variantTitle: "medium",
        price: 20.99,
        reason: "Broken",
        quantity: 0,
        status: "submitted",
        flag: "0",
    },
    handleSelect: jest.fn()
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

function renderComp(qty, step){
    const utils = render(
        <Item 
            {...fullProps} 
            {...fullProps.item.quantity=qty}
            step={step}
        />);
    return utils;
}

it("render without crashing", ()=>{
    renderComp(1, 1);
})

describe("renders correct format on step 1", ()=>{
    
    it("display no return message if there is no quantity", ()=>{
        const {queryByText} = renderComp(0, 1);
        expect(queryByText(/can't be returned/i)).toBeInTheDocument();
    })

    it("display normal if there is quantity", ()=>{
        const {queryByText} = renderComp(1,1);
        expect(queryByText(/Quantity for Return/i)).toBeInTheDocument();
    })

    it("active quantity changes when option is selected", ()=>{
        const {getByText} = renderComp(1,1);
        const baseElement = document.querySelector(".container3");
        fireEvent.focus(baseElement.querySelector(".qty input"));
        fireEvent.mouseDown(baseElement.querySelector(".qty__control"));
        fireEvent.click(getByText("1"));
        expect(baseElement.querySelector(".qty__single-value")).toHaveTextContent("1");
    })
})

describe("step 2 behaviors", ()=>{
    it("display SELECT reason", ()=>{
        const {queryByText} = renderComp(1, 2);
        expect(queryByText(/Reason for return/i)).toBeInTheDocument();
    })

    it("active reason changes when option is selected", async()=>{
        const spy = jest.spyOn(Item.prototype, "handleReasonChange")
        const {getByText} = renderComp(1, 2);
        
        const baseElement = document.querySelector(".container3")
        fireEvent.focus(baseElement.querySelector(".reasonSelect input"))
        fireEvent.mouseDown(baseElement.querySelector(".reasonSelect__control"))
        fireEvent.click(getByText(/Multiple/))
        expect(spy).toHaveBeenCalled();
        expect(getByText(/Reason for return/i)).toHaveTextContent(/multiple/i);
    })
})

it("step 3 renders confirmation", ()=>{
    const {queryByText} = renderComp(1, 3);
    expect(queryByText(/Reason:/i)).toBeInTheDocument();
})