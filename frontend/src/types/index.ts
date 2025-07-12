export interface User {
  _id: string;
  name: string;
  email: string;
  points: number;
  isAdmin: boolean;
  avatar?: {
    public_id: string;
    url: string;
  };
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  tags: string[];
  images: {
    public_id: string;
    url: string;
  }[];
  uploader: string;
  status: 'available' | 'pending' | 'swapped' | 'redeemed';
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface ItemsResponse {
  success: boolean;
  items: Item[];
}