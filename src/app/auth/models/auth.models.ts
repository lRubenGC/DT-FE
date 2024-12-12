export interface UserDTO {
  id: number;
  username: string;
  email: string;
  status: number;
  recoverToken?: string | null;
  recoverTokenDate?: string | null;
  img?: string;
  csvDownloadDate?: Date;
}
