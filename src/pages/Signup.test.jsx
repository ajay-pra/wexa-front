import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store/store';
import Signup from './Signup';
import { expect, test } from 'vitest';

test('renders Signup component with all inputs and button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  expect(
    screen.getByRole('heading', { name: /sign up/i })
  ).toBeInTheDocument();

  const textInputs = screen.getAllByRole('textbox');
  expect(textInputs.length).toBe(2); // Organisation + Email

  expect(
    document.querySelector('input[type="password"]')
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /sign up/i })
  ).toBeInTheDocument();
});