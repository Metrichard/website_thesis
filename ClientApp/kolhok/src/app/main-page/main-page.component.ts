import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService } from '../service/data/post-data.service';

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

  navigateToAddTodo() {
    this.router.navigate(['post', -1]);
  }

  refreshPosts() {
    this.postDataService.retrieveAllPosts().subscribe(
      response => {
        this.posts = response
      }
    )
  }

}

export class Post {

  preViewTextLength : number = 100

  constructor(
    public id: String,
    public title: String,
    public text: String,
    public publicationDate: Date,
    public author: String
  ) {}

  getPreviewText() : String {
    return this.text.length < this.preViewTextLength ? this.text+'...' : this.text.substring(0,this.preViewTextLength)+'...';
  }
}