import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponentComponent } from './components/card/card-component.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PostformComponent } from './components/postform/postform.component';

const routes: Routes = [
  { path: 'postlist',component: CardComponentComponent },
  { path: 'create-post',component: PostformComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
