import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostlistRoutingModule } from './postlist-routing.module';
import { PostStoreModule } from 'src/app/store/post/post-store.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostlistRoutingModule,
    PostStoreModule
  ]
})
export class PostlistModule { }
