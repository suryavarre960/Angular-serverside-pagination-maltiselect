import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../Components/iusers';

@Component({
  selector: 'view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})


export class ViewUserComponent implements OnInit {
  viewData:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.viewData =this.data
  }

}
