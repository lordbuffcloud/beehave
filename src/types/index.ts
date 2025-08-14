// Core data models for Beehave app - Supabase schema definitions

export interface User {
  id: string;
  name: string;
  role: 'manager' | 'child';
  uiMode: 'adult' | 'kid';
  honeyBalance: number;
  avatarURL?: string;
  familyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyMember {
  id: string;
  familyId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chore {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'once';
  honeyValue: number;
  assigneeId: string;
  proofPhotoURL?: string;
  status: 'open' | 'done';
  createdAt: Date;
  completedAt?: Date;
  updatedAt: Date;
}

export interface SpendRequest {
  id: string;
  kidId: string;
  description: string;
  costHoney: number;
  status: 'pending' | 'approved' | 'denied';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'deduct' | 'spend';
  amount: number;
  reason: string;
  choreId?: string;
  spendRequestId?: string;
  createdAt: Date;
}

// UI-specific types
export type UserRole = User['role'];
export type UIMode = User['uiMode'];
export type ChoreStatus = Chore['status'];
export type ChoreFrequency = Chore['frequency'];
export type TransactionType = Transaction['type'];
export type SpendRequestStatus = SpendRequest['status'];

// Form types
export interface CreateChoreData {
  title: string;
  description: string;
  frequency: ChoreFrequency;
  honeyValue: number;
  assigneeId: string;
}

export interface CreateSpendRequestData {
  description: string;
  costHoney: number;
}

export interface UpdateUserData {
  name?: string;
  avatarURL?: string;
  honeyBalance?: number;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string | null;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Component prop types
export interface ChildModeProps {
  user: User;
  chores: Chore[];
  spendRequests: SpendRequest[];
}

export interface ParentDashboardProps {
  users: User[];
  chores: Chore[];
  spendRequests: SpendRequest[];
  transactions: Transaction[];
} 