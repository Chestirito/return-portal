import React from "react";
import ReactDOM from 'react-dom';
import NB from '../pages/Confirmation/navbar';
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from '@testing-library/react';

let fullProps = {
    shopName: "RandomShopName",
    shopDomain: "RandomDomain",
}

it("renders final confirmation navbar without info", ()=>{
    render(<NB
            {...fullProps}
        />)
})

it("first navbar with instruction, no progress bar", ()=>{
    const {queryByText} = render(<NB
                            {...fullProps}
                            step1={"active"}
                            step2={""}
                            step3={""}
                            show={false}
                            findOrderPage={true}
                        />)
    expect(document.querySelector(".progressBar")).not.toBeInTheDocument();
    expect(queryByText(/enter your order details/i)).toBeInTheDocument();
})

describe("middle steps", ()=>{
    it("first step live, no active", ()=>{
        const {queryByText} = render(<NB
            {...fullProps}
            step1={"live"}
            step2={""}
            step3={""}
            show={true}
        />)
        let elements = document.querySelectorAll(".progressbar li");
        expect(elements[0]).toHaveClass("live");
        elements.forEach((element, i)=>{
            if(i !== 0){
                expect(element).not.toHaveClass("live");
                expect(element).not.toHaveClass("active");
            }
        })
    })
    describe("second step", ()=>{
        function renderSecond(callback){
            const utils = render(<NB
                {...fullProps}
                step1={"active"}
                step2={"live"}
                step3={""}
                show={true}
                viewPage2={callback}
            />)
            return utils;
        }

        it("second step live, first active", ()=>{
            const viewPage2 = jest.fn();
            const {getByText} = renderSecond(viewPage2);
            let elements = document.querySelectorAll(".progressbar li");
            expect(elements[0]).toHaveClass("active");
            expect(elements[1]).toHaveClass("live");
            
            elements.forEach((element, i)=>{
                if(i !== 0 && i !== 1){
                    expect(element).not.toHaveClass("live");
                    expect(element).not.toHaveClass("active");
                }
            })
        })

        it("first step is clickable", ()=>{
            const viewPage2 = jest.fn();
            const {getByText} = renderSecond(viewPage2);
            fireEvent.click(getByText(/Select/i));
            expect(viewPage2).toHaveBeenCalled();
        })
    })

    describe("third step", ()=>{
        function renderThird(view2, view3){
            const utils = render(<NB
                {...fullProps}
                step1={"active"}
                step2={"active"}
                step3={"live"}
                show={true}
                viewPage2={view2}
                viewPage3={view3}
            />)
            return utils
        }

        it("third live, 1 and 2 active", ()=>{
            const viewP2 = jest.fn();
            const viewP3 = jest.fn();
            const {getByText} = renderThird(viewP2, viewP3);
            let elements = document.querySelectorAll(".progressbar li");
            expect(elements[0]).toHaveClass("active");
            expect(elements[1]).toHaveClass("active");
            expect(elements[2]).toHaveClass("live");
        })

        it("First and second step are clickable", ()=>{
            const viewP2 = jest.fn();
            const viewP3 = jest.fn();
            const {getByText} = renderThird(viewP2, viewP3);
            fireEvent.click(getByText(/Select/i));
            fireEvent.click(getByText(/Review/i));
            expect(viewP2).toHaveBeenCalled();
            expect(viewP3).toHaveBeenCalled();
        })
    })
})