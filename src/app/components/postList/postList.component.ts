import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromPosts from '../../store/post';
import { IPost } from '../../interfaces/post.interface';
import { IPostState } from '../../store/post/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './postList.component.html',
  styleUrls: ['./postList.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class PostListComponent implements OnInit {
  posts$: Observable<IPost[]>;
  currentPage$: Observable<number>;
  searchQuery$: Observable<string>;
  filteredPosts$: Observable<IPost[]>;
  pagedPosts$: Observable<IPost[]>;

  isConfirmationModalOpen = false;
  animationState = 'in';
  selectedPostId: string | null = null;

  postId: any;
  currentPage = 1;
  postsPerPage = 12;
  pages: number[] = [];
  searchForm: FormGroup;
  searchResults$: Observable<IPost[]>;
  searchPerformed = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IPostState>,
  ) {
    this.posts$ = this.store.select(fromPosts.selectPosts);
    this.currentPage$ = this.store.select(fromPosts.selectCurrentPage);
    this.searchQuery$ = this.store.select(fromPosts.selectSearchQuery);
    this.filteredPosts$ = this.store.select(fromPosts.selectFilteredPosts);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const pageNumber = params.get('pageNumber');
      if (pageNumber) {
        this.currentPage = +pageNumber;
      } else {
        this.currentPage = 1;
      }
    });

    this.store.dispatch(fromPosts.getPosts());
    this.pagedPosts$ = this.getPagedPosts();

  }

  getPagedPosts(): Observable<IPost[]> {
    return this.posts$.pipe(
      map((posts) => {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return posts.slice(startIndex, endIndex);
      })
    );
  }

  changePage(page: number) {
    this.router.navigate(['/postlist', page]);
  }

  openConfirm(postId: string): void {
    this.posts$?.subscribe((posts) => {
      const post = posts.find((p: any) => p.id === postId);
      if (post) {
        this.selectedPostId = postId;
        this.isConfirmationModalOpen = true;
      }
    });
  }

  closeConfirm(): void {
    this.selectedPostId = null;
    this.isConfirmationModalOpen = false;
  }

  deletePost(postId: any) {
    this.store.dispatch(fromPosts.deletePost({ postId }));
    this.closeConfirm();
    this.store.dispatch(fromPosts.updatePostList());
    alert('Post deleted succesfully');
  }

}
