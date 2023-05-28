import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PostDataService } from 'app/service/post/post-data.service';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { TagDataService } from 'app/service/tag/tag-data-service.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit, AfterViewInit {
  
  posts: Post[] = []

  displayedColumns: string[] = ['id', 'title', 'author', 'text', 'tags', 'isPinned', 'isHidden', 'lastEditDate', 'actions'];
  dataSource = new MatTableDataSource(this.posts)
  
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  tags: Tag[] = []
  newTag: Tag = new Tag('', '', '');

  constructor(
    private postDataService: PostDataService,
    private tagDataService: TagDataService,
    private router: Router,
    public authService: JwtAuthenticationService,
    private liveAnnouncer: LiveAnnouncer
  ) { }

  ngAfterViewInit(): void {
      
  }

  announceSortChange(sortState: Sort) {
    if(sortState.direction){
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }else {
      this.liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  ngOnInit(): void {
    this.postDataService.retrieveAllPosts().subscribe(
      response => {
        this.posts = response.map(post => new Post(post.postId
          , post.title
          , post.author
          , post.text
          , post.tags
          , post.isPinned
          , post.isHidden
          , post.publicationDate
          , post.lastEditDate
          , post.attachedFiles))
        this.dataSource = new MatTableDataSource(this.posts)
        this.dataSource.sort = this.sort;
      }
    );
    
    this.tagDataService.getAllTags().subscribe(
      response => {
        this.tags = response;
      }
    );
  }

  navigateToAddTodo(){
    this.router.navigate(['post', -1]);
  }

  navigateToPost(id: String) {
    this.router.navigate(['post', id]);
  }

  deletePostRow(id: String) {
    this.postDataService.deletePost(id).subscribe(_=>{});
    window.location.reload();
  }

  createNewTag() {
    if(this.newTag.tagId === '') {
      if(this.newTag.name !== '') {
        this.tagDataService.createTag(this.newTag).subscribe(
          data => {
            console.log(data);
            window.location.reload();
          }
        )
      }
    }
  }

  deleteTag(id: String) {
    if(id !== '-1') {
      this.tagDataService.deleteTag(id).subscribe(
        _ => {}
      )
      window.location.reload();
    };
  }
}

export class Tag {

  constructor(
    public tagId: String,
    public name: String,
    public description: String
  ){}
}

export class Post{
  constructor(
    public postId: String,
    public title: String,
    public author: String,
    public text: String,
    public tags: String[],
    public isPinned: Boolean,
    public isHidden: Boolean,
    public publicationDate: Date,
    public lastEditDate: Date,
    public attachedFiles: String[]
  ) {}
}

export class FileWrapper {

  constructor(
    id: String,
    file: FormData
  ){}
}