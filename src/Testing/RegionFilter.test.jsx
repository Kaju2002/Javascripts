// src/Testing/RegionFilter.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Preferred for interactions
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import RegionFilter from '../components/RegionFilter'; // Adjust path
import { AppContext } from '../Context/AppContext'; // Adjust path

describe('RegionFilter Component', () => {
  let mockSetRegion; // Mock function to track calls

  // Helper function to render with context
  const renderWithContext = (initialRegion = 'All') => {
    mockSetRegion = vi.fn(); // Reset mock function for each test
    const contextValue = {
      region: initialRegion,
      setRegion: mockSetRegion,
      // Add other AppContext values if RegionFilter ever uses them (currently doesn't)
    };
    return render(
      <AppContext.Provider value={contextValue}>
        <RegionFilter />
      </AppContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Clear any previous mock calls
  });

  it('renders the select dropdown with options', () => {
    renderWithContext();

    // Check if the select element exists (using role 'combobox' for select)
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    // Check if options are present
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Africa' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Americas' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Asia' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Europe' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Oceania' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Antarctic' })).toBeInTheDocument();
  });

  it('displays the correct initial region passed from context', () => {
    const initialRegion = 'Asia';
    renderWithContext(initialRegion);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue(initialRegion); // Check if the select value matches
  });

  it('calls setRegion from context when a new region is selected', async () => {
    const user = userEvent.setup(); // Setup userEvent
    renderWithContext('All'); // Start with 'All' selected

    const selectElement = screen.getByRole('combobox');

    // Act: Simulate user selecting 'Europe'
    await user.selectOptions(selectElement, 'Europe');

    // Assert: Check if setRegion was called with the correct value
    expect(mockSetRegion).toHaveBeenCalledTimes(1);
    expect(mockSetRegion).toHaveBeenCalledWith('Europe');
  });

  it('updates the displayed value when the context region changes (simulated)', () => {
     const initialRegion = 'Africa';
     // Render initially with Africa
     const { rerender } = render(
        <AppContext.Provider value={{ region: initialRegion, setRegion: vi.fn() }}>
          <RegionFilter />
        </AppContext.Provider>
      );

     const selectElement = screen.getByRole('combobox');
     expect(selectElement).toHaveValue(initialRegion);

     // Simulate context update by re-rendering with a new value
     const newRegion = 'Americas';
     rerender(
        <AppContext.Provider value={{ region: newRegion, setRegion: vi.fn() }}>
            <RegionFilter />
        </AppContext.Provider>
     );

     // Assert: Check if the select value updated
     expect(selectElement).toHaveValue(newRegion);
  });
});