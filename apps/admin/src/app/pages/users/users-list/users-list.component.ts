import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, User } from '@meerev/users'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users: User[] = []

  constructor(
              private usersService: UsersService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  updateUser(id: string) {
    this.router.navigateByUrl(`users/form/${id}`)
  }

  private getUsers() {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users
    })
  }

  deleteUser(id: string) {
    // Confirm deletion
    this.confirmationService.confirm({
      message: "Are You sure?",
      header: "Delete a User",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.usersService.deleteUser(id).subscribe(response => {
          this.getUsers()
    
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted' })
    
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not deleted' })
        })
      },
      reject: () => {}
    })
  }

}
