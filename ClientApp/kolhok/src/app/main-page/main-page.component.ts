import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService } from '../service/post/post-data.service';
import { Post, Tag } from '../post-editor/post-editor.component';
import { TagDataService } from 'app/service/tag/tag-data-service.service';
import { FilterDataService } from 'app/service/filters/filter-data.service';
import { MAIN_PAGE } from 'app/app.constants';
import { FilterData } from 'app/service/filters/filter-data';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  tags: Tag[] = [];
  posts: Post[] = [];
  selectedTag: String = '';
  filter: FilterData = new FilterData('','','');

  constructor(
    private router: Router,
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
    this.filter = new FilterData('', MAIN_PAGE, this.selectedTag)
    if(this.filter.id === '') {
      this.filterDataService.createFilterDataForPage(this.filter).subscribe(
        data => {
          this.refreshPosts();
        }
      );
    }else {
      this.filterDataService.updateFilterDataForPage(this.filter).subscribe(
        data => {
          this.refreshPosts();
        }
      );
    } 
  }

  navigateToCurrentPost(id: String) {
    this.router.navigate(['post', id]);
  }
  
  refreshPosts() {
    this.postDataService.retrieveAllPostsWithTag(this.filter.tag).subscribe(
      response => {
        this.posts = response.map(post => new Post(post.id, post.title, post.author, post.text, post.tag, Boolean(post.isPinned), Boolean(post.isHidden), post.publicationDate, post.files))
      }
    )
  }

}