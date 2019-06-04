export interface Course {
  guid: string;
  image: string;
  rating: Rating[];
  title: string;
  description: string;
  dateCreated: string;
  joinedUsers: string[];
}

export interface Rating {
  userId: string;
  rating: number;
}
