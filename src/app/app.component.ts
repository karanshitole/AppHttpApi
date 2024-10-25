import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AppHttpApi';

  isLoading !: boolean ;
  private _loaderService = inject(LoaderService)
  // showsideBar(sidebar: any){
  //   sidebar.open()
  // }

  ngOnInit(): void {
   this._loaderService.loadingState$
       .subscribe(res =>{
        this.isLoading = res
       }) 
  }
}
