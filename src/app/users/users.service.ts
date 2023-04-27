import {Injectable} from "@angular/core";

export interface User {
  id: number;
  imagePath: string;
  imageAlt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selected: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private users: User[] = [
{ id: 1, imagePath: '/assets/cup.jpg', imageAlt:'cup', firstName: 'Alice', lastName: 'Jackson', email: 'alice.jackson@example.com', phone:'0699231421', selected: false },
{ id: 2, imagePath: '/assets/lamp.jpg', imageAlt:'lamp', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone:'0699231421', selected: false },
{ id: 3, imagePath: '/assets/phone.jpg', imageAlt:'phone', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', phone:'0699231421', selected: false },
{ id: 4, imagePath: '/assets/sock.jpg', imageAlt:'sock', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phone:'0699231421', selected: false },
  ];

  constructor() {}
    getUser():User[] {
      return this.users;
  }
}
