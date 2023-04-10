import { render, screen, cleanup } from "@testing-library/react";
import UserSelectDropdown from "../sections/user-dropdown/user-select-dropdown";
import '@testing-library/jest-dom'

test('should render user select dropdown', () => {
    render(<UserSelectDropdown />);
    const userSelectDropdown = screen.getByTestId('user-select-dropdown');
    expect(userSelectDropdown).toBeInTheDocument();
    expect(userSelectDropdown).this.state.toBeDefined();
})
