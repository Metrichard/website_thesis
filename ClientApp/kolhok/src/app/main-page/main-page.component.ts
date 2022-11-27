import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService } from '../service/post/post-data.service';
import { Post, Tag } from '../post-editor/post-editor.component';
import { TagDataService } from 'app/service/tag/tag-data-service.service';
import { FilterDataService } from 'app/service/filters/filter-data.service';
import { MAIN_PAGE } from 'app/app.constants';
import { FilterData } from 'app/service/filters/filter-data';
import { PostComponent } from 'app/post/post.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild('postContainer', { read: ViewContainerRef }) entry!: ViewContainerRef;

  tags: Tag[] = [];
  selectedTag: String = '';
  filter: FilterData = new FilterData('','','');

  constructor(
    public authService: JwtAuthenticationService,
    private postDataService: PostDataService,
    public tagDataService: TagDataService,
    public filterDataService: FilterDataService
    ) { }

  ngOnInit(): void {
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
          let postsArr = response.map(post => new Post(post.id, post.title, post.author, post.text, post.tag, Boolean(post.isPinned), Boolean(post.isHidden), post.publicationDate, post.files));
          postsArr.forEach( post => {
            const componentRef = this.entry.createComponent(PostComponent);
            componentRef.instance.post = post;
          });
        }
      )
    }
  }

}