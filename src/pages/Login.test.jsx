import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store/store';
import Login from './Login';
import { expect, test } from 'vitest';

test('renders Login component with all inputs and button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(
    screen.getByRole('heading', { name: /login/i })
  ).toBeInTheDocument();

  const inputs = screen.getAllByRole('textbox');
  expect(inputs.length).toBe(1);

  expect(
    document.querySelector('input[type="password"]')
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /login/i })
  ).toBeInTheDocument();
});