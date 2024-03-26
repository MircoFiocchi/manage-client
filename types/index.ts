
export interface CustomerData {
  id?: string;
  name: string;
  lastName: string;
  age: number;
  birthdayDate: any;
}


export interface CustomizedCustomer {
  id: string;
  fullName: string;
  age: number;
  birthdayDate: any;
  probabilityOfDeath: number;
}