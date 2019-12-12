import React from "react";
import ReactDOM from 'react-dom';
import RestartPop from '../pages/Confirmation/restartPop';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';
import 'core-js';

const props = {
    handleDelete: jest.fn(),
    closePopup: jest.fn()
}

function renderComp(){
    const utils = render(<RestartPop 
        {...props}
    />);
    return utils
}

it("render without crashing", ()=>{
    renderComp();
})

it("closepopup is called when No is clicked", ()=>{
    const spy = jest.spyOn(props, 'closePopup');
    const {getByText} = renderComp();

    fireEvent.click(getByText(/no/i));
    
    expect(spy).toHaveBeenCalled();

})

it("handledelete is called when yes is clicked", ()=>{
    const {getByText} = renderComp();
    
    const spy = jest.spyOn(props, 'handleDelete')

    fireEvent.click(getByText(/yes/i));
    
    expect(spy).toHaveBeenCalled();

})