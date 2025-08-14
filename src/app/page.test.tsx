import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders welcome message and bee icon', () => {
    render(<HomePage />);
    
    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Beehave');
    
    // Check for description
    expect(screen.getByText('Family chore management with honey rewards')).toBeInTheDocument();
    
    // Check for bee emoji
    expect(screen.getByText('🐝')).toBeInTheDocument();
    
    // Check for getting started section
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Getting Started');
    
    // Check for loading message
    expect(screen.getByText('Loading authentication...')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<HomePage />);
    
    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Check for proper heading hierarchy
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Welcome to Beehave');
    expect(headings[1]).toHaveTextContent('Getting Started');
  });

  it('applies the correct CSS classes for styling', () => {
    render(<HomePage />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen', 'bg-gradient-to-br');
  });
}); 