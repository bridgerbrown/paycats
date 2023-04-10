import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import UserSelectDropdown from "../sections/user-dropdown/user-select-dropdown";
import UserSelectCard from "../sections/user-dropdown/user-select-card";
import '@testing-library/jest-dom'

// test('should render user select dropdown', () => {
//     const { getByTestId } = render(<UserSelectDropdown />);
//     const userSelectDropdown = screen.getByTestId('user-select-dropdown');
//     const userSelectCard = screen.getByTestId('user-select-card');

//     const setState = jest.fn();
//     jest
//         .spyOn(React, 'useState')
//         .mockImplementation((init) => [init, setState]);
//     render(<UserSelectDropdown />);

//     act(() => 
//         fireEvent.click(userSelectDropdown)
//     );
//     expect(setState).toHaveBeenCalledWith(1);
// })
