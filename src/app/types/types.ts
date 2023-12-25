export interface Post {
  id: string; // Assuming post ID is a number
  userid: string; // Assuming user ID is a number
  content: string;
  title: string;
  imageUrl?: string; // Optional image URL for the post
  createdat: string;
  updatedat: string;
  deletedat: string | null;
  likes: number;

  // Add any other properties your Post might have
}
