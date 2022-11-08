import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { PostDataService } from 'app/service/post/post-data.service';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { TagDataService } from 'app/service/tag/tag-data-service.service';

export type SortColumn = keyof IPost | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: String | number | Date | Boolean, v2: String | number | Date | Boolean ) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface IPost {
  id: String,
  title: String,
  author: String,
  text: String,
  tag: String,
  isPinned: Boolean,
  isHidden: Boolean,
  publicationDate: Date
}

export interface SortEvent{
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
  },
})
export class SortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}


@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {


  @ViewChildren(SortableHeader) headers?: QueryList<SortableHeader>;
  posts: IPost[] = []
  tags: Tag[] = []
  newTag: Tag = new Tag('-1', '', '');

  constructor(
    private postDataService: PostDataService,
    private tagDataService: TagDataService,
    private router: Router,
    public authService: JwtAuthenticationService
  ) { }

  ngOnInit(): void {
    this.postDataService.retrieveAllPosts().subscribe(
      response => {
        this.posts = response;
      }
    );
    this.tagDataService.getAllTags().subscribe(
      response => {
        this.tags = response;
      }
    );
  }

  onSort({ column, direction } : SortEvent) {
    if(this.headers !== undefined){
      this.headers.forEach((header) => {
        if(header.sortable !== column) {
          header.direction = '';
        }
      });

      if(direction === '' || column === '') {
        this.posts = this.posts;
      } else {
        this.posts = [...this.posts].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }
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
    if(this.newTag.id === '-1') {
      this.tagDataService.createTag(this.newTag).subscribe(
        _ => {
          window.location.reload();
        }
      )
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
    public id: String,
    public name: String,
    public description: String
  ){}
}

export class Post implements IPost {

  preViewTextLength : number = 100

  constructor(
    public id: String,
    public title: String,
    public author: String,
    public text: String,
    public tag: String,
    public isPinned: Boolean,
    public isHidden: Boolean,
    public publicationDate: Date,
  ) {}
}