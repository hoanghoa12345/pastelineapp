export interface LoginForm {
  email: string;
  password: string;
}

export interface Note {
  noteId: string;
  title: string;
  content?: string;
  userId: string;
  category: string;
  isPinned: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  photoUrl: string;
  locale: string;
  theme: string;
  isAdmin: boolean;
}

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;
}

export interface GetNoteParams {
  favorite?: boolean;
  pinned?: boolean;
  category?: string;
  deleted?: boolean;
}
