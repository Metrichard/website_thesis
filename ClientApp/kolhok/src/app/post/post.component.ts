import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../main-page/main-page.component';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService } from '../service/data/post-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  id: String = '';
  post: Post = new Post('', '', '', new Date(), '');
  isNew: boolean = false;

  constructor(
    private postService: PostDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: JwtAuthenticationService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    if(this.id != '') {
      this.isNew = false;
      this.postService.retrivePostById(this.id).subscribe(
        data => {
          this.post = data
        }
      )
    }else {
      this.isNew = true;
      this.post.author = this.authService.getAuthenticatedUser() ?? '';
    }
  }

  saveOrUpdate() {
    if(this.id == ''){
      this.post.publicationDate = new Date();
      this.postService.createPost(this.post).subscribe(
        data => { 
          this.router.navigate(['main-page']);
        }
      )
    }else {
      this.postService.updatePost(this.id, this.post).subscribe(
        data => { 
          this.router.navigate(['main-page']);
        }
      )
    }
  }
}
