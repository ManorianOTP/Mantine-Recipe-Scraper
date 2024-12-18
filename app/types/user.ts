import { Recipe } from '../types';

export interface User {
    id: string
    username: string
    email: string
    password_hash: string
    recipes: Recipe[]
    created_at: string
  }