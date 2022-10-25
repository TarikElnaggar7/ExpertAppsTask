import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostsService } from 'src/app/services/posts-service.service';
import { postsModel } from 'src/app/models/posts.model';
import { NewPostComponent } from '../new-post/new-post.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.css'],
})
export class HomeTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  dataSource: MatTableDataSource<postsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private postsService: PostsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
    this.getPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPosts() {
    this.postsService.getPosts().subscribe(
      (response) => {
        this.dataSource.data = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openPostFormDialog() {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.postsService.createNewPost(result).subscribe((response) => {
        if (result !== 'closed') {
          this._snackBar.open(`Data Saved , Your id = ${response.id}`, 'Done', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    });
  }
}
