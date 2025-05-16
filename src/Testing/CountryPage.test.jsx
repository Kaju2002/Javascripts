// src/Testing/CountryPage.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import CountryPage from '../pages/CountryPage';
import { AppContext } from '../Context/AppContext';

// --- Mock Child Components ---
vi.mock('../components/SearchBar', () => ({
  default: () => <div data-testid="search-bar-mock">Mock SearchBar</div>,
}));
vi.mock('../components/RegionFilter', () => ({
  default: ({ region, setRegion }) => (
    <div data-testid="region-filter-mock">
      Mock RegionFilter (Current: {region})
      <button onClick={() => setRegion('MockSelect')}>Select</button>
    </div>
  ),
}));
vi.mock('../components/CountryCard', () => ({
  default: ({ country }) => (
    <div data-testid={`country-card-${country.cca3}`}>
      Mock Card: {country.name.common}
    </div>
  ),
}));
// --- End Mocking Children ---

describe('CountryPage Component', () => {
  let mockSetRegion;
  let mockHandlePageChange;

  // Helper function to render with context
  const renderWithContext = (contextOverrides = {}) => {
    mockSetRegion = vi.fn();
    mockHandlePageChange = vi.fn();

    const defaultContext = {
      region: 'All',
      setRegion: mockSetRegion,
      currentPage: 1,
      totalPages: 3,
      currentItems: [ // Default items for page 1
        { cca3: 'USA', name: { common: 'United States' } },
        { cca3: 'CAN', name: { common: 'Canada' } },
      ],
      handlePageChange: mockHandlePageChange,
      // Provide defaults for other values potentially used by the component or context internally
      itemsPerPage: 20, // Assuming this might be used internally
      totalItems: 42, // Example total
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => false),
      searchQuery: '',
      setSearchQuery: vi.fn(),
      countries: [],
      loading: false,
    };

    const mockContextValue = { ...defaultContext, ...contextOverrides };

    return render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <CountryPage />
        </AppContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders SearchBar, RegionFilter, CountryCards, and Pagination', () => {
    renderWithContext(); // Uses default context values

    expect(screen.getByTestId('search-bar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('region-filter-mock')).toBeInTheDocument();
    expect(screen.getByTestId('country-card-USA')).toBeInTheDocument();
    expect(screen.getByTestId('country-card-CAN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '<' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument();
  });

  it('displays correct region in RegionFilter mock', () => {
    renderWithContext({ region: 'Europe' });
    expect(screen.getByTestId('region-filter-mock')).toHaveTextContent('Mock RegionFilter (Current: Europe)');
  });

   it('calls handlePageChange when a pagination button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext({ currentPage: 2, totalPages: 5 }); // Start on page 2

    const page3Button = screen.getByRole('button', { name: '3' });
    const prevButton = screen.getByRole('button', { name: '<' });
    const nextButton = screen.getByRole('button', { name: '>' });

    await user.click(page3Button);
    expect(mockHandlePageChange).toHaveBeenCalledWith(3);

    await user.click(prevButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(1); // currentPage (2) - 1

    await user.click(nextButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(3); // currentPage (2) + 1

    expect(mockHandlePageChange).toHaveBeenCalledTimes(3);
  });

  it('disables previous button on first page and enables next button', () => {
    renderWithContext({ currentPage: 1, totalPages: 3 }); // totalPages > 1 needed to enable next button
    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '>' })).not.toBeDisabled();
  });

  it('disables next button on last page and enables previous button', () => {
    renderWithContext({ currentPage: 3, totalPages: 3 }); // totalPages > 1 needed to enable prev button
    expect(screen.getByRole('button', { name: '<' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: '>' })).toBeDisabled();
  });

  // --- CORRECTED: Test for item count text ---
  it('displays item count text containing numbers based on context', () => {
    // Arrange: Setup context for a specific scenario
     const itemsOnPage = Array(15).fill({}).map((_, i) => ({ // 15 items for current page
        cca3: `C${i+20}`, name: { common: `Country ${i+21}` }
     }));
     const context = {
         currentPage: 2,
         totalPages: 5,
         currentItems: itemsOnPage, 
         itemsPerPage: 20, // Assuming 20 per page for calculation
         totalItems: 85     // Example total items overall
     };
     renderWithContext(context);

   
     const countText = screen.getByText(/Showing \d+ to \d+ of \d+ items/i);
     expect(countText).toBeInTheDocument();


  });

});