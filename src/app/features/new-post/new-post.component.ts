import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { postsModel } from 'src/app/models/posts.model';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  NewPostObject: postsModel;

  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: postsModel
  ) {
    this.NewPostObject = {};
  }

  onNoClick(): void {
    this.dialogRef.close('closed');
  }
}
