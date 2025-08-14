import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChoreCard } from './chore-card';
import type { Chore, User } from '@/types';

const mockChore: Chore = {
  id: '1',
  title: 'Take out trash',
  description: 'Empty all trash cans and take to curb',
  frequency: 'daily',
  honeyValue: 5,
  assigneeId: 'user1',
  status: 'open',
  createdAt: new Date('2024-01-01'),
};

const mockUser: User = {
  id: 'user1',
  name: 'Alex',
  role: 'child',
  uiMode: 'kid',
  honeyBalance: 10,
  createdAt: new Date('2024-01-01'),
};

describe('ChoreCard', () => {
  it('renders chore information correctly', () => {
    render(<ChoreCard chore={mockChore} user={mockUser} />);
    
    expect(screen.getByText('Take out trash')).toBeInTheDocument();
    expect(screen.getByText('Empty all trash cans and take to curb')).toBeInTheDocument();
    expect(screen.getByText('🍯 5')).toBeInTheDocument();
    expect(screen.getByText('daily')).toBeInTheDocument();
  });

  it('shows complete button for open chores', () => {
    render(<ChoreCard chore={mockChore} user={mockUser} />);
    
    const completeButton = screen.getByText('Complete Chore');
    expect(completeButton).toBeInTheDocument();
    expect(completeButton).not.toBeDisabled();
  });

  it('shows completed state for done chores', () => {
    const completedChore = { ...mockChore, status: 'done' as const };
    render(<ChoreCard chore={completedChore} user={mockUser} />);
    
    expect(screen.getByText('Completed!')).toBeInTheDocument();
    expect(screen.queryByText('Complete Chore')).not.toBeInTheDocument();
  });

  it('shows photo proof when available', () => {
    const choreWithPhoto = { 
      ...mockChore, 
      proofPhotoURL: 'https://example.com/photo.jpg',
      status: 'done' as const 
    };
    render(<ChoreCard chore={choreWithPhoto} user={mockUser} />);
    
    const image = screen.getByRole('img', { name: /proof photo/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('calls onComplete when complete button is clicked', () => {
    const onComplete = vi.fn();
    render(<ChoreCard chore={mockChore} user={mockUser} onComplete={onComplete} />);
    
    const completeButton = screen.getByText('Complete Chore');
    fireEvent.click(completeButton);
    
    expect(onComplete).toHaveBeenCalledWith(mockChore.id);
  });

  it('adapts styling for kid mode', () => {
    render(<ChoreCard chore={mockChore} user={mockUser} />);
    
    // Should have kid-friendly styling
    const card = screen.getByRole('article');
    expect(card).toHaveClass('kid-mode');
  });

  it('shows different styling for parent view', () => {
    const parentUser = { ...mockUser, role: 'manager' as const, uiMode: 'adult' as const };
    render(<ChoreCard chore={mockChore} user={parentUser} />);
    
    const card = screen.getByRole('article');
    expect(card).not.toHaveClass('kid-mode');
  });

  it('displays frequency badge correctly', () => {
    const { rerender } = render(<ChoreCard chore={mockChore} user={mockUser} />);
    expect(screen.getByText('daily')).toBeInTheDocument();

    const weeklyChore = { ...mockChore, frequency: 'weekly' as const };
    rerender(<ChoreCard chore={weeklyChore} user={mockUser} />);
    expect(screen.getByText('weekly')).toBeInTheDocument();

    const onceChore = { ...mockChore, frequency: 'once' as const };
    rerender(<ChoreCard chore={onceChore} user={mockUser} />);
    expect(screen.getByText('once')).toBeInTheDocument();
  });
}); 