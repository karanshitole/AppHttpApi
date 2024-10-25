import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDashboardComponent } from './shared/components/post-dashboard/post-dashboard.component';
import { PostformComponent } from './shared/components/postform/postform.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { PostComponent } from './shared/components/post/post.component';

const routes: Routes = [
  {
    path : '',
    component:PostDashboardComponent
  },
  {
    path : 'posts',
    component:PostDashboardComponent
  },
  {
    path : 'addpost',
    component:PostformComponent
  },
  {
    path : 'posts/:postId',
    component:PostComponent
  },
  {
    path : 'posts/:postId/edit',
    component:PostformComponent
  },
  { path: 'home', loadChildren: () => import('./shared/components/home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
