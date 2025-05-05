// src/Testing/SearchBar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';  // Path to your SearchBar component
import { AppProvider } from '../Context/AppContext';  // Your AppProvider
import React from 'react';
// Test to verify that SearchBar input updates the search value
test('SearchBar input updates search value', () => {
  render(
    <AppProvider>  {/* Wrap the component with the existing AppProvider */}
      <SearchBar />
    </AppProvider>
  );
  
  const input = screen.getByPlaceholderText(/search for a country/i);
  
  // Simulate typing into the search bar
  fireEvent.change(input, { target: { value: 'India' } });

  // Assert that the input value has been updated
  expect(input.value).toBe('India');
});
