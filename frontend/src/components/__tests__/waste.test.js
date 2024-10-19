import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides matchers like `toBeInTheDocument`
import HelloWorld from '../../pages/Waste'; // Make sure this path is correct

describe('HelloWorld Component', () => {
  // Test Case 1: Check if the message "Hello, World!" is rendered on the screen
  test('renders the message correctly', () => {
    render(<HelloWorld />);
    
    const message = screen.getByText(/Hello, World!/i);
    expect(message).toBeInTheDocument();
  });

  // Test Case 2: Check if the message has the correct HTML tag
  test('renders message in an h1 tag', () => {
    render(<HelloWorld />);
    
    const message = screen.getByRole('heading', { level: 1 });
    expect(message).toBeInTheDocument();
  });

  // Test Case 3: Check if the message does not contain "Goodbye, World!"
  test('does not render an incorrect message', () => {
    render(<HelloWorld />);
    
    const message = screen.queryByText(/Goodbye, World!/i);
    expect(message).not.toBeInTheDocument();
  });

  // Failing Test Case: Check if the message "Hello, Everyone!" is rendered (this will fail)
  test('renders a message that does not exist', () => {
    render(<HelloWorld />);
    
    const message = screen.getByText(/Hello, Everyone!/i); // This should fail
    expect(message).toBeInTheDocument();
  });
});
