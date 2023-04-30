import { Component, OnInit } from '@angular/core';
import { User } from './User';
import * as bcrypt from 'bcryptjs';
import { UserDataService } from 'app/service/users/user-data.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  user: User = new User('','','');

  users: User[] = [];

  constructor(
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {

    this.userDataService.getAllUsers().subscribe(
      data => {
        this.users = data;
      });
  }

  registerNewUser() {
    console.log(this.user.username);
    console.log(this.user.password);
    bcrypt.hash(this.user.password.toString(), 10).then((hash: String) => {
      this.userDataService.register(new User('', this.user.username, hash)).subscribe(
        response => {
          alert("User added");
          window.location.reload();
        }
      )
    });
  }

  deleteUser(id: String) {
    this.userDataService.deleteUser(id).subscribe(
      response => {
        window.location.reload();
      }
    )
  }
}
