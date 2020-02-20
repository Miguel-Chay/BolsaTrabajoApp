
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

export interface Candidate{
user_id : string;
firstname : string;
lastname : string;
sex : string;
birth_date : Date;
marital_status: string;
curp : string;
phone : string;
cellphone : string;
city_id : string;
student_id_number : string;
organization_unit_id : string;
photo : string;
work_status : boolean;
work_status_date : Date;
token: string;
}

export interface City{
  id : string;
  name : string;
  state_id : string;
}


export interface Country{
   id: string;
   name: string;
   }