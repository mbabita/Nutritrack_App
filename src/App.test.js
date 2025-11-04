import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import App from './App';

test('renders app without crashing', () => {
  render(
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  );
  // Check if the app renders without throwing an error
  expect(screen.getByText(/NutriTrack/i)).toBeInTheDocument();
});

test('renders sidebar component', () => {
  render(
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  );
  // Check if sidebar is rendered
  expect(screen.getByText('Home')).toBeInTheDocument();
});

test('renders main content area', () => {
  render(
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  );
  // Check if main content area is rendered
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
