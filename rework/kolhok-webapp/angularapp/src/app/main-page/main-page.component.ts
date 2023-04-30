import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService } from '../service/post/post-data.service';
import { Post, Tag } from '../post-editor/post-editor.component';
import { TagDataService } from 'app/service/tag/tag-data-service.service';
import { FilterDataService } from 'app/service/filters/filter-data.service';
import { MAIN_PAGE } from 'app/app.constants';
import { FilterData } from 'app/service/filters/filter-data';
import { PostComponent } from 'app/post/post.component';
import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild('postContainer', { read: ViewContainerRef }) entry!: ViewContainerRef;

  pinnedPost: Post = new Post('', '', '', '', [], false, false, new Date(), new Date(), []);
  pinnedExists: boolean = true;

  tags: Tag[] = [];
  selectedTag: String = '';
  filter: FilterData = new FilterData('','','');

  editor: Editor = new Editor();  

  constructor(
    public authService: JwtAuthenticationService,
    private postDataService: PostDataService,
    public tagDataService: TagDataService,
    public filterDataService: FilterDataService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.postDataService.getPinnedPost().subscribe(
      pinned => {
        if(pinned.title !== '') {
          this.pinnedPost = new Post(pinned.id, pinned.title, pinned.author, pinned.text, pinned.tags, Boolean(pinned.isPinned), Boolean(pinned.isHidden), pinned.publicationDate, pinned.lastEditDate, pinned.files);
          this.pinnedExists = true;
        }
        else {
          this.pinnedExists = false;
        }
      }
    );
    this.filterDataService.getFilterDataForPage(MAIN_PAGE).subscribe(
      data => {
        this.selectedTag = data.tag;
        this.filter = data;
        this.refreshPosts();
      }
    );
    if(this.authService.isUserLoggedIn()) {
      this.tagDataService.getAllTags().subscribe(
        data => {
          this.tags = data;
        }
      );
    }
  }

  navigateToPinned(id: String) {
    this.router.navigate(['post', id]);
  }

  saveFilter() {
    let newFilter = new FilterData('', MAIN_PAGE, this.selectedTag)
    if(this.filter.id === '') {
      this.filterDataService.createFilterDataForPage(newFilter).subscribe(
        data => {
          window.location.reload();
        }
      );
    }else {
      newFilter.id = this.filter.id;
      this.filterDataService.updateFilterDataForPage(newFilter).subscribe(
        data => {
          window.location.reload();
        }
      );
    } 
  }

  
  refreshPosts() {
    if(this.filter.tag !== undefined) {
      this.postDataService.retrieveAllPostsWithTag(this.filter.tag).subscribe(
        response => {
          let postsArr = response.map(post => new Post(post.id, post.title, post.author, post.text, post.tags, Boolean(post.isPinned), Boolean(post.isHidden), post.publicationDate, post.lastEditDate, post.files));
          postsArr.forEach( post => {
            const componentRef = this.entry.createComponent(PostComponent);
            componentRef.instance.post = post;
          });
        }
      )
    }
  }

}