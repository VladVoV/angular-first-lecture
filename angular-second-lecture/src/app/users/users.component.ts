import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  selected?: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  cardCount: number = 0;
  searchTerm: string = '';
  @ViewChild('cardContainer') cardContainer!: ElementRef;
  users: User[] = [];
  selectedSortOption: 'id' | 'name' = 'id';
  addUserForm: FormGroup;

  constructor(private http: HttpClient) {
    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
    });
  }

  ngOnInit() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((response) => {
        this.users = response;
      });
  }
  async addUser(event: Event) {
    event.preventDefault();
    if (this.addUserForm.valid) {
      const name = this.addUserForm.value.firstName + " " + this.addUserForm.value.lastName;
      const email = this.addUserForm.value.email;
      const phone = this.addUserForm.value.phone;
      const newUser = {name, email, phone } as User;
      try {
        const response = await this.http.post<User>('https://jsonplaceholder.typicode.com/users', newUser).toPromise();
        if (response) {
          const maxId = Math.max(...this.users.map(user => user.id));
          response.id = maxId + 1;
          this.users.push(response);
          console.log(this.users);
        }
        this.addUserForm.reset();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  selectAll() {
    if (this.users) {
      this.users.forEach(user => user.selected = true);
    }
  }

  deleteSelectedUsers() {
    if (this.users) {
      this.users = this.users.filter(user => !user.selected);
    }
  }

  sortUsers() {
    if (this.users) {
      this.users.sort((a, b) => {
        if (this.selectedSortOption === 'id') {
          return a.id - b.id;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    }
  }
  searchUsers() {
    if (this.searchTerm === '') {
      this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .subscribe((response) => {
          this.users = response;
        });
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.users = this.users.filter((user) => {
        return user.name.toLowerCase().includes(searchTermLower) || user.email.toLowerCase().includes(searchTermLower);
      });
    }
  }
}
