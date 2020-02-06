
export interface Login {
  user: User;
  login: boolean;
}

export interface User {
  id: string;
  username: string;
  password_hash: string;
  auth_key: string;
  access_token: string;
  email: string;
  type: string;
  send_info_courses: number;
  registration_date: string;
  last_login: string;
}
