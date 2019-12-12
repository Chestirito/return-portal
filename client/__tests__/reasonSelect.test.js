import React from "react";
import ConfirmOrder from '../pages/Confirmation/reasonSelect';
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
    newEmail: "",
    shop:"RandomShopDomainName",
    items:[{
        productID:"3986722488395",
        variantID:"29915527020619",
        name: "Classic Leather Jacket - Get it Today - medium",
        title: "Classic Leather Jacket - Get it Today",
        variantTitle: "medium",
        price: 59.99,
        reason: "---",
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
        reason: "---",
        quantity: 2,
        status: "submitted",
        flag: "0",
    }],
    updatehandleChange: jest.fn(),
    setReason: jest.fn(),
    updateforward: jest.fn(),
    updateEmail: jest.fn(),
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

it("render without crashing", ()=>{
    const div = document.createElement("div");

    render(<ConfirmOrder 
                {...fullProps}
            />, div);
})

describe("Reasons and emails validity after submit", ()=>{
    function renderComp(){
        const utils = render(<ConfirmOrder 
            {...fullProps}
        />);
        return {...utils};
    }

    it("submit shows error if there is no valid reason", ()=>{
        const {queryByText,getByText} = renderComp();
        fireEvent.click(getByText(/continue/i));
        expect(queryByText("Please select a reason for return for all items.")).toBeInTheDocument();
    })

    it("no submit without all reasons", ()=>{
        const spyForward = jest.spyOn(fullProps, "updateforward");
        const {getByText, queryByText} = renderComp()
        
        const baseElement = document.querySelectorAll(".container3");

        fireEvent.focus(baseElement[0].querySelector(".reasonSelect input"));
        fireEvent.mouseDown(baseElement[0].querySelector(".reasonSelect__control"));
        fireEvent.click(getByText(/Multiple/i));
            
        fireEvent.click(getByText(/continue/i));
        expect(spyForward).not.toHaveBeenCalled();
        expect(queryByText("Please select a reason for return for all items.")).toBeInTheDocument();
    })

    it("submitted only reasons", ()=>{
        const spyForward = jest.spyOn(fullProps, "updateforward");
        const {getAllByText,getByText} = renderComp()
        
        const baseElement = document.querySelectorAll(".container3");
        
        // COMMENTS ARE WAYS TO QUERY REACT-SELECT
        // for loop doesnt trigger overlapping act() error
        for(let i = 0; i < baseElement.length; i++){
            //await selectEvent.select(baseElement[i].querySelector(".reasonSelect"), [/Multiple./i]);
            fireEvent.focus(baseElement[i].querySelector(".reasonSelect input"));
            fireEvent.mouseDown(baseElement[i].querySelector(".reasonSelect__control"));
            fireEvent.click(getAllByText(/Multiple/i)[i]);
            //await selectEvent.select(getAllByText(/Reason for return:/)[i], [/Multiple./i]);
            // await fireEvent.focus(baseElement[i].querySelector(".reasonSelect input"));
            // await fireEvent.keyDown(baseElement[i].querySelector(".reasonSelect input"), { key: 'ArrowDown', code: 40 });
            // await fireEvent.keyDown(baseElement[i].querySelector(".reasonSelect input"), { key: 'Enter', code: 13 });
            //fireEvent.change(baseElement[i].querySelector(".reasonSelect"), {target:{value: 'broken'}})
            //fireEvent.click(getAllByText(/Multiple/i)[i]);
        }

        fireEvent.click(getByText(/continue/i));
        expect(spyForward).toHaveBeenCalled();
    })

    describe("submitted with new email", ()=>{
        const renderPrepareReasons = ()=>{
            const utils = renderComp();

            const baseElement = document.querySelectorAll(".container3");

            for(let i = 0; i < baseElement.length; i++){
                fireEvent.focus(baseElement[i].querySelector(".reasonSelect input"));
                fireEvent.mouseDown(baseElement[i].querySelector(".reasonSelect__control"));
                fireEvent.click(utils.getAllByText(/Multiple/i)[i]);
            }

            return {...utils};
        }

        const test = (email, confirmEmail, expected)=>{
            it("Check for email validity", ()=>{
                const{getByPlaceholderText, getByText} = renderPrepareReasons();

                const emailSection = document.querySelector(".getEmail");
                fireEvent.click(getByPlaceholderText("Email"));
                fireEvent.change(getByPlaceholderText("Email"), {target:{value:email}});
                fireEvent.click(getByPlaceholderText("Re-Enter Email"));
                fireEvent.change(getByPlaceholderText("Re-Enter Email"), {target:{value:confirmEmail}});
                fireEvent.click(getByText(/continue/i));
                expect(emailSection.querySelector(".errorMessage")).toHaveTextContent(expected);
            })
        }
        test("kjsdnfkjsndfj", "", "*Please enter a valid email to continue*");
        test("akf@lqwe qwek", "lkqw@dadfasdf", "*Please enter a valid email to continue*");
        test("akf@lqweqwek", "lkqw@dadfasdf", "The emails you entered do not match.");
        test("akf@lqweqwek", "", "The emails you entered do not match.");

        it("Valid reasons and valid emails", ()=>{
            const spyForward = jest.spyOn(fullProps, "updateforward");
            const spyUpdateEmail = jest.spyOn(fullProps, "updateEmail");
            const{getByPlaceholderText, getByText} = renderPrepareReasons();
            fireEvent.click(getByPlaceholderText("Email"));
            fireEvent.change(getByPlaceholderText("Email"), {target:{value:"fake@email.com"}});
            fireEvent.click(getByPlaceholderText("Re-Enter Email"));
            fireEvent.change(getByPlaceholderText("Re-Enter Email"), {target:{value:"fake@email.com"}});
            fireEvent.click(getByText(/continue/i));

            expect(spyForward).toHaveBeenCalled();
            expect(spyUpdateEmail).toHaveBeenCalled();
        })
    })
})

