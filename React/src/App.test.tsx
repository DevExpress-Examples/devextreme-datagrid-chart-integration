import { render, screen } from '@testing-library/react';
import App from './App.tsx';

describe('App', () => {
  it('should create the app', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should render the DataGrid', () => {
    render(<App />);
    const grid = document.getElementById('grid');
    expect(grid).toBeInTheDocument();
  });

  it('should render the "Generate Chart" button', () => {
    render(<App />);
    const button = screen.getByText('Generate Chart');
    expect(button).toBeInTheDocument();
  });
});
