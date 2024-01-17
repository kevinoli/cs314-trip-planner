import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { MultiSelect } from '../../../../src/components/Header/Find/FindSelect';

describe('Find Types', () => {
    const options = [
        { value: 'type1', label: 'Type 1' },
        { value: 'type2', label: 'Type 2' }
    ];

    test('dmorigea: renders without crashing', () => {
        render(
            <MultiSelect
                selectedValues={[]}
                setSelectedValues={jest.fn()}
                options={options}
                placeholder="Types"
            />
        );

        const placeholderElement = screen.getByText("Select Types...");
        expect(placeholderElement).toBeInTheDocument();
    });

    test('dmorigea: renders the correct number of options', () => {
        render(
            <MultiSelect
                selectedValues={[]}
                setSelectedValues={jest.fn()}
                options={options}
                placeholder="Types"
            />
        );

        const selectElement = screen.getByText("Select Types...");
        userEvent.click(selectElement);
        options.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    test('dmorigea: handleChange calls setSelectedTypes with the right arguments', () => {
        const setSelectedValuesMock = jest.fn();
        jest.spyOn(console, 'log').mockImplementation();

        render(<MultiSelect selectedValues={[]} setSelectedValues={setSelectedValuesMock} options={options} placeholder="Types" />);

        const selectElement = screen.getByText("Select Types...");
        userEvent.click(selectElement);

        const optionToSelect = screen.getByText(options[0].label);
        userEvent.click(optionToSelect);

        expect(setSelectedValuesMock).toHaveBeenCalledWith({ label: options[0].label, value: options[0].value });
    });
});

describe('dmorigea: Find Wheres', () => {
    const options = [
        { value: 'where1', label: 'Where 1' },
        { value: 'where2', label: 'Where 2' }
    ];

    test('dmorigea: renders without crashing', () => {
        render(<MultiSelect options={[]} />);
    });

    test('dmorigea: renders without crashing', () => {
        const setSelectedValuesMock = jest.fn();
        render(<MultiSelect selectedValues={[]} setSelectedValues={jest.fn()} options={options} placeholder="Wheres" />);
    });

    test('displays default placeholder', () => {
        render(<MultiSelect selectedValues={[]} setSelectedValues={jest.fn()} options={options} placeholder="Wheres"  />);
        expect(screen.getByText("Select Wheres...")).toBeInTheDocument();
    });

    test('selecting a single option', () => {
        const setSelectedValuesMock = jest.fn();

        render(<MultiSelect selectedValues={[]} setSelectedValues={setSelectedValuesMock} options={options} placeholder="Wheres" />);
        userEvent.click(screen.getByText("Select Wheres..."));
        userEvent.click(screen.getByText(options[0].label));

        expect(setSelectedValuesMock).toHaveBeenCalledWith({ label: options[0].label, value: options[0].value });
    });
});

describe('MultiSelect', () => {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    test('hridayab: Selecting multiple options', () => {
        const setSelectedValuesMock = jest.fn();

        render(
            <MultiSelect selectedValues={[]} setSelectedValues={setSelectedValuesMock}options={options} placeholder="Options" />
        );

        userEvent.click(screen.getByText("Select Options..."));
        userEvent.click(screen.getByText(options[0].label));
        userEvent.click(screen.getByText("Select Options..."));
        userEvent.click(screen.getByText(options[1].label));
        expect(setSelectedValuesMock).toHaveBeenCalledWith({ label: options[0].label, value: options[0].value, label: options[1].label, value: options[1].value });
    });
});