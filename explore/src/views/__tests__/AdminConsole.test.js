import React from "react";
import AdminConsole from "../AdminConsole";
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import AdminDestinationList from "../../components/adminconsole/AdminDestinationList";


test('name, country, description and url form should all be in the document ', () => {
  const component = render(<AdminConsole/>)
  const name = component.getByPlaceholderText("Destination Name");
  const country = component.getByPlaceholderText("Country name");
  const description = component.getByPlaceholderText("Destination Description");
  const url = component.getByPlaceholderText("Image URL");

  expect(name).toBeInTheDocument();
  expect(country).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(url).toBeInTheDocument();
});

test('Createbutton should be called on click', () => {
    render(<AdminConsole />);
    const clickSpy = jest.fn();
    const CreateButton = screen.getByRole('button', {name: 'Create'});
    CreateButton.addEventListener('click', clickSpy);
    fireEvent.click(CreateButton);
    expect(clickSpy).toHaveBeenCalledTimes(1);
});






