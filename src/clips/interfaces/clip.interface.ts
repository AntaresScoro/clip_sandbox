export interface Clip {
  _id: string;
  title: string;
  description?: string;
  url: string;
  duration: number;
  streamerName: string;
  _createdAt: Date;
}
