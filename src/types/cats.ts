// types/cat.ts
export interface Breed {
  id: number;
  name: string;
  deletedAt: Date | null;
}

export interface Cat {
  id: number;
  name: string;
  age: number;
  deletedAt: Date | null;
  breed: Breed;
  userEmail: string;
}
