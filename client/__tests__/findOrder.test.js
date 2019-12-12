import React from "react";
import ReactDOM from 'react-dom';
import FindOrder from '../pages/Confirmation/findOrder';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';

function renderComp(){
    const utils = render(<FindOrder></FindOrder>);
    return utils;
}

it('renders without crashing', ()=>{
    renderComp();
})

it("renders correctly", ()=>{
    const {getByPlaceholderText} = renderComp();
    expect(getByPlaceholderText('Order Number')).toHaveTextContent("");
})

it("? label exists", ()=>{
    const {getByTitle, getByAltText} = renderComp();
    expect(getByTitle('Show order info')).toContainElement(getByAltText('help order'));
    expect(getByTitle('Show email info')).toContainElement(getByAltText('help email'))
})

it("info not shown by default", ()=>{
    const {queryByText} = renderComp();
    expect(queryByText(/your order number can be found/i)).not.toBeInTheDocument();
    expect(queryByText(/email or phone/i)).not.toBeInTheDocument();
})

it("show info when label is clicked", ()=>{
    const {getByTitle, getByText} = renderComp();
    fireEvent.click(getByTitle('Show order info'));
    expect(getByText(/your order number can be found/i)).toBeInTheDocument();

    fireEvent.click(getByTitle('Show email info'));
    expect(getByText(/email or phone/i)).toBeInTheDocument();
})

it("call handle search when submit", ()=>{
    const spy = spyOn(FindOrder.prototype, 'handleSearch');

    const{getByText} = renderComp();

    fireEvent.click(getByText(/begin/i));

    expect(spy).toHaveBeenCalled();
})

it("do not call handler if not clicked", ()=>{
    const spy = spyOn(FindOrder.prototype, 'handleSearch');

    renderComp();

    expect(spy).not.toHaveBeenCalled();
})