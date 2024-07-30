import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipost } from '../../models/post.interface';
import { PostsService } from '../../services/posts.service';
import { LoaderService } from '../../services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDalogComponent } from '../mat-dalog/mat-dalog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId !: string;
  postObj ! : Ipost;
  private _MatDialog= inject(MatDialog)
  private _postsService = inject(PostsService)
  private _loaderService =inject (LoaderService)
  constructor(
    private _routes : ActivatedRoute,
    private _router : Router,
    private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this._routes.params
        .subscribe(res =>{
          this.postId = res['postId'];

          if(this.postId){
            this._postsService.fetchPost(this.postId)
                .subscribe(res =>{ 
                  this.postObj=res;
                  //hide loader
                 // this._loaderService.loadingState$.next(false)
                })
          }
        })
  }

  onRemove(){
    const dialogConf = this._matDialog.open(MatDalogComponent);

    dialogConf.afterClosed()
       .subscribe(flag =>{
        console.log(flag);
        
        if(flag){
          this._postsService.removePost({...this.postObj, id:this.postId})
              .subscribe(res =>{
                console.log(res);
                //this.postObj=null;
                this._router.navigate(['/post'])
              })
        }
       })
  }
}
