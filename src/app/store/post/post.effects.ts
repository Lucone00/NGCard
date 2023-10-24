import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as fromPosts from './index';
import { PostService } from '../post/services/post.service';
@Injectable()
export class PostsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly postService: PostService
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.getPosts),
      switchMap(() => {
        return this.postService.getPost().pipe(
          map((posts) => {
            return fromPosts.getPostSuccess({ posts });
          })
        );
      })
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.deletePost),
      switchMap(({ postId }) => this.postService.deletePost(postId))
    )
  );

  updatePostList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.updatePostList),
      switchMap(() =>
        this.postService
          .getPost()
          .pipe(map((posts) => fromPosts.getPostSuccess({ posts })))
      )
    )
  );
}
