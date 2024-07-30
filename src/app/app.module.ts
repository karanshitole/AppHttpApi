import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PostDashboardComponent } from './shared/components/post-dashboard/post-dashboard.component';
import { PostformComponent } from './shared/components/postform/postform.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PostComponent } from './shared/components/post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDalogComponent } from './shared/components/mat-dalog/mat-dalog.component';
import { PostHttpInterceptorService } from './shared/services/post.http.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostDashboardComponent,
    PostformComponent,
    PostCardComponent,
    PostComponent,
    MatDalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : PostHttpInterceptorService,
      multi :true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
