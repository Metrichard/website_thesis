import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ELECTION_PAGE } from 'app/app.constants';
import { Post, Tag } from 'app/post-editor/post-editor.component';
import { PostComponent } from 'app/post/post.component';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { FilterData } from 'app/service/filters/filter-data';
import { FilterDataService } from 'app/service/filters/filter-data.service';
import { PostDataService } from 'app/service/post/post-data.service';
import { TagDataService } from 'app/service/tag/tag-data-service.service';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {

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
    this.filterDataService.getFilterDataForPage(ELECTION_PAGE).subscribe(
      data => {
        this.filter = data ?? new FilterData('','','');
        this.selectedTag = data === null ? '' : data.tag;
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
    let newFilter = new FilterData('', ELECTION_PAGE, this.selectedTag)
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
          let postsArr = response.map(post => new Post(post.id, post.title, post.author, post.text, post.tags, Boolean(post.isPinned), Boolean(post.isHidden), post.publicationDate, post.files));
          postsArr.forEach( post => {
            const componentRef = this.entry.createComponent(PostComponent);
            componentRef.instance.post = post;
          });
        }
      )
    }
  }

}
