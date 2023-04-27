import {Component, OnInit} from '@angular/core';
import {User, UsersService} from "./users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users?: User[];
  selectedSortOption: 'id' | 'firstName' = 'id';
  searchText: string = '';
  autoCompleteList: string[] = ['alice.jackson@example.com'];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.getUser();
  }

  selectAll() {
    if(this.users){
      this.users.forEach(user => user.selected = true);
    }
  }
  deleteSelectedUsers() {
    if(this.users){
      this.users = this.users.filter(user => !user.selected);
    }
  }
  sortUsers() {
    if (this.users) {
      this.users.sort((a, b) => {
        if (this.selectedSortOption === 'id') {
          return a.id - b.id;
        } else {
          return a.firstName.localeCompare(b.firstName);
        }
      });
    }
  }
  autoComplete(event: any) {
    const searchText = event.target.value;

    const filteredUsers = this.usersService.getUser().filter(user =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase())
    );

    this.users = filteredUsers;

    const nameList = filteredUsers.map(user => user.firstName + ' ' + user.lastName);
    const autoCompleteList = Array.from(new Set(nameList));

    const autoCompleteElement = document.getElementById('autoComplete');
    if (autoCompleteElement) {
      autoCompleteElement.innerHTML = '';

      autoCompleteList.forEach(name => {
        const optionElement = document.createElement('option');
        optionElement.value = name;
        autoCompleteElement.appendChild(optionElement);
      });
    }
  }
}
