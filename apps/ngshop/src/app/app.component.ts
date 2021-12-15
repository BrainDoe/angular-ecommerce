import { Component, OnInit } from '@angular/core';
import { UsersService } from '@meerev/users';

@Component({
  selector: 'meerev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
