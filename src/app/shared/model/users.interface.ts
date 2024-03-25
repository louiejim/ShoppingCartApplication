export interface Users {
  id: number;
  username: string;
  password: string;
  email: string;
  mobile: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: Date;
  interest: string[];
  isAdming: boolean;
}
