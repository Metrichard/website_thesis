import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post-editor/post-editor.component';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService } from '../service/post/post-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  shouldShow: boolean = true;
  isEditing: boolean = false;
  id: String = '';
  post: Post = new Post('', '', '', '', '', false, false, new Date());
  isNew: boolean = false;

  constructor(
    private postService: PostDataService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: JwtAuthenticationService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    if(this.id === '-1'){
      this.isEditing = true;
      this.shouldShow = false;
    }

    if(this.id != '') {
      this.isNew = false;
      this.postService.retrivePostById(this.id).subscribe(
        data => {
          this.post = data
        }
      )
    }else {
      this.isNew = true;
    }
  }

  saveOrUpdate() {
    if(this.id == '-1'){
      this.post.publicationDate = new Date();
      this.post.author = this.authService.getAuthenticatedUser();
      this.postService.createPost(this.post).subscribe(
        data => { 
          this.router.navigate(['post-editor']);
        }
      )
    }else {
      this.postService.updatePost(this.id, this.post).subscribe(
        data => { 
          this.router.navigate(['post-editor']);
        }
      )
    }
  }

  deletePost(id: String) {
    this.postService.deletePost(id).subscribe(
      result => {}
    );
    this.router.navigate(['post-editor']);
  }

  editPost(){
    this.isEditing = !this.isEditing;
    this.shouldShow = !this.shouldShow;
  }
}
