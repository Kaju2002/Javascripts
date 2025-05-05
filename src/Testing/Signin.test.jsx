import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Matchers work with Vitest
import Signin from '../components/Signin'; // Adjust path if needed
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../Context/UserContext'; // Adjust path if needed
import { vi } from 'vitest';

// --- Minimal Mocking (to prevent crashes) ---

// Mock axios to prevent actual network calls if form was submitted (though we won't submit in these simple tests)
vi.mock('axios');

// Mock toast so calls to it don't cause errors
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useNavigate so the component doesn't crash when calling it
vi.mock('react-router-dom', () => ({
  ...require('react-router-dom'), // Or use spread syntax if preferred/configured
  useNavigate: () => vi.fn(), // Provide a dummy navigate function
}));

const localStorageMock = (() => {
  let store = {}; 
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }), 
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true 
});


// --- Simplified Test Suite ---

describe('Simplified Signin Component Tests', () => {

  const renderComponent = () => {
    // Provide dummy context values
    const contextValue = {
        setIsLoggedIn: vi.fn(),
        getUserData: vi.fn(),
    };
   

    render(
      <BrowserRouter>
        <UserContext.Provider value={contextValue}>
          <Signin />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  // Clear mocks before each test run in this suite
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear(); // Also clear the localStorage store
  });


  // Test 1: Basic Rendering Check
  it('renders email, password fields and submit button', () => {
    renderComponent();

    // Check for a few key elements
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    // You could add more basic rendering checks here if desired
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  // Test 2: Basic Input Check
  it('allows typing into email and password fields', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    // Simulate typing
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    // Check if the values were updated
    expect(emailInput).toHaveValue('user@test.com');
    expect(passwordInput).toHaveValue('testpass');
  });


});