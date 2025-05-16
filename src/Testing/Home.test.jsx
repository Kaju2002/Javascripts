
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../Context/AppContext'; 
import Home from '../pages/Home'; 

// Mock the Features component
vi.mock('../components/Features', () => ({ 
  default: () => <div data-testid="features-mock">Mocked Features Content</div>,
}));



describe('Home Page Integration Test', () => {
  const mockCountriesData = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      flags: { png: 'https://flagcdn.com/w320/us.png' },
      population: 331002651,
      capital: ['Washington, D.C.'],
      region: 'Americas',
      languages: { eng: 'English' },
    },
    {
      cca3: 'JPN',
      name: { common: 'Japan' },
      flags: { png: 'https://flagcdn.com/w320/jp.png' },
      population: 126476461,
      capital: ['Tokyo'],
      region: 'Asia',
      languages: { jpn: 'Japanese' },
    },
    {
      cca3: 'GER', 
      name: { common: 'Germany' },
      flags: { png: 'https://flagcdn.com/w320/de.png' },
      population: 83783942,
      capital: ['Berlin'],
      region: 'Europe',
      languages: { deu: 'German' },
    },
    {
      cca3: 'CAN',
      name: { common: 'Canada' },
      flags: { png: 'https://flagcdn.com/w320/ca.png' },
      population: 37742154,
      capital: ['Ottawa'],
      region: 'Americas',
      languages: { eng: 'English', fra: 'French' },
    },
  ];

  const mockContextValue = {
    countries: mockCountriesData,
    
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <MemoryRouter> 
          <Home />
        </MemoryRouter>
      </AppContext.Provider>
    );
  });

  test('renders Hero, Features, and ContryMore components', () => {
   
    expect(screen.getByText(/Globalize Urban Insights/i)).toBeInTheDocument(); // Text from your Hero.jsx

    expect(screen.getByTestId('features-mock')).toBeInTheDocument();
    expect(screen.getByText('Mocked Features Content')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Popular Countries/i })).toBeInTheDocument();
  });

  test('ContryMore displays popular countries from context', () => {
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();

   
    expect(screen.getByText('331,002,651')).toBeInTheDocument(); // Specific to USA

 
    expect(screen.queryByText('Germany')).not.toBeInTheDocument();
  });

  test('ContryMore renders "Details" links and "Explore All Countries" link', () => {
    // "Details" links for popular countries (USA, JPN, CAN)
    const detailLinks = screen.getAllByRole('link', { name: /Details/i });
    expect(detailLinks).toHaveLength(3); // USA, JPN, CAN
    expect(detailLinks[0]).toHaveAttribute('href', '/country-details/USA');
    expect(detailLinks[1]).toHaveAttribute('href', '/country-details/JPN');
    expect(detailLinks[2]).toHaveAttribute('href', '/country-details/CAN');


    // "Explore All Countries" link
    const exploreAllLink = screen.getByRole('link', { name: /Explore All Countries/i });
    expect(exploreAllLink).toBeInTheDocument();
    expect(exploreAllLink).toHaveAttribute('href', '/country');
  });
});