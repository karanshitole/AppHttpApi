import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ipost } from '../../models/post.interface';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {
  isInEditMode : boolean =false;
  postForm !:FormGroup;
  postId !: string;
  editpostObj !: Ipost;

  private _postService = inject(PostsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _loaderServices = inject(LoaderService);

  constructor() { }

  ngOnInit(): void {
    this.createPostForm();
    this._route.params
        .subscribe((params: Params)=>{
          console.log(params);
          this.postId = params['postId'];
          if(this.postId){
            this.isInEditMode = true;
            this._postService.fetchPost(this.postId)
                .subscribe(data =>{
                  this.editpostObj=data
                  this.postForm.patchValue(this.editpostObj);
                  this._loaderServices.loadingState$.next(false)
                })
          }
        })
  }
  createPostForm(){
    this.postForm=new FormGroup({
      userId : new FormControl(null,Validators.required),
      title : new FormControl(null,Validators.required),
      content : new FormControl(null,Validators.required),

    })
  }

  onpostCreat(){
    if(this.postForm.valid){
      let newPost = this.postForm.value;
      this._postService.creatPost(newPost)
          .subscribe(res =>{
            console.log(res);
            this.postForm.reset();
            this._router.navigate(['/posts'])
          })
    }
  }
  onPostUpdate(){
    if(this.postForm.valid){
      let updatedObj:Ipost = {...this.postForm.value, id:this.postId};
      console.log(updatedObj);
      this._postService.updatePost(updatedObj)
          .subscribe((res)=>{
            console.log(res);
            //this._loaderServices.loadingState$.next(false);
            this.postForm.reset();
            this._router.navigate(['.posts'])
          })
    }
  }
  
}
