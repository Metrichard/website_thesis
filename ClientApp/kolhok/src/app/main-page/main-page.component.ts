import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService } from '../service/post/post-data.service';
import { Post } from '../post-editor/post-editor.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  posts: Post[] = []

  constructor(
    private router: Router,
    public authService: JwtAuthenticationService,
    private postDataService: PostDataService
    ) { }

  ngOnInit(): void {
    this.refreshPosts();
  }

  navigateToCurrentPost(id: String) {
    this.router.navigate(['post', id]);
  }
  
  refreshPosts() {
    this.postDataService.retrieveAllPosts().subscribe(
      response => {
        this.posts = response
      }
    )
  }

}