import React from "react";
import ReactDOM from 'react-dom';
import ConfirmationPage from '../pages/Confirmation/showConfirmation';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';
import 'core-js';
import renderer from 'react-test-renderer';
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

beforeEach(()=>{
    window.alert = jest.fn();
    
    // fetch.mockResponse(JSON.stringify({
    //     product:{
    //         image:{
    //             src: "imageSourceURL"
    //         }
    //     }
    // }))
})

it("renders without issue",()=>{
    const tree = renderer
                    .create(<ConfirmationPage
                                {...props}
                            />)
                    .toJSON();
    expect(tree).toMatchSnapshot();
})

it("resend email", ()=>{
    const spy = jest.spyOn(ConfirmationPage.prototype, "sendEmail");
    const {getByText} = renderComp();
    fireEvent.click(getByText(/resend email/i));
    expect(spy).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
})

it("do not resend email if succesive click", ()=>{
    const spyAlert = jest.spyOn(window, "alert");
    const {getByText} = renderComp();
    fireEvent.click(getByText(/resend email/i));
    fireEvent.click(getByText(/resend email/i));
    expect(spyAlert).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
})

