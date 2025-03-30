import { render, screen, fireEvent } from '@testing-library/react';
import AllTasks from '@/components/admin/dashboard/AllTasks';
import {describe} from "@jest/globals";
import TaskItem from "../components/TaskItem";

test("renders task name", () => {
    render(<TaskItem task={{ id: "1", taskName: "Test Task", description: "Sample", priority: "High", deadline: "2025-03-30", status: "open" }} />);

    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
})


describe('AllTasks Component', () => {
    it('renders the All Tasks header', () => {
        render(<AllTasks />);
        const headerElement = screen.getByText(/All Tasks/i);
        expect(headerElement).toBeInTheDocument();
    });

    it('opens the Create Task dialog when the button is clicked', () => {
        render(<AllTasks />);
        const buttonElement = screen.getByText(/Create Task/i);
        fireEvent.click(buttonElement);
        const dialogElement = screen.getByText(/Create Task Dialog/i);
        expect(dialogElement).toBeInTheDocument();
    });
})