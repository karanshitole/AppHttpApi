import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../models/post.interface';
import { LoaderService } from './loader.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDalogComponent } from '../components/mat-dalog/mat-dalog.component';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private _http =inject(HttpClient);
  private _loaderServices = inject(LoaderService);
  postUrl : string = `${environment.baseUrl}/posts.json`
  constructor(
    
  ) { }

  fetchAllPosts():Observable<Array<Ipost>>{
    // start loader
   // this._loaderServices.loadingState$.next(true)
    return this._http.get<any>(this.postUrl)
               .pipe(
                map(data =>{
                  let postArr : Array <Ipost> =[];
                  for (const key in data) {
                 postArr.push({...data[key],id : key})
                  }
                  return postArr.reverse()
                })
               )
  }
  fetchPost(id : string):Observable<Ipost>{
    //start Loader
    //this._loaderServices.loadingState$.next(true)
    let fetchPostUrl = `${environment.baseUrl}/posts/${id}.json`;
    return this._http.get<Ipost>(fetchPostUrl)
               .pipe(
                catchError(err =>{
                  alert(err)
                  return of(err)
                })
               )
                
  }

  creatPost(newPost : Ipost): Observable<any>{
    
    return this._http.post(this.postUrl, newPost,{
     
       })
  }

  updatePost(updatedObj : Ipost):Observable<Ipost>{
    //this._loaderServices.loadingState$.next(true);
    let updateUrl = `${environment.baseUrl}/posts/${updatedObj.id}.json`;
    return this._http.patch<Ipost>(updateUrl, updatedObj)
  }
 removePost(post : Ipost):Observable<any>{
  let removePost = `${environment.baseUrl}/posts/${post.id}.json`;
  return this._http.delete(removePost)
 }
}
