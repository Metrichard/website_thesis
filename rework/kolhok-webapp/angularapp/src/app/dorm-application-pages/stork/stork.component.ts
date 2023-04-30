import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { STORK } from 'app/app.constants';
import { Post, Tag } from 'app/post-editor/post-editor.component';
import { PostComponent } from 'app/post/post.component';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { PageDataService } from 'app/service/dormApplication/page-data.service';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { FilterData } from 'app/service/filters/filter-data';
import { FilterDataService } from 'app/service/filters/filter-data.service';
import { PostDataService } from 'app/service/post/post-data.service';
import { TagDataService } from 'app/service/tag/tag-data-service.service';
import { PageData } from '../PageData';

@Component({
  selector: 'app-stork',
  templateUrl: './stork.component.html',
  styleUrls: ['./stork.component.css']
})
export class StorkComponent implements OnInit {

  pageData: PageData = new PageData('', '', '', '', []);

  // Post system intergration
  @ViewChild('postContainer', { read: ViewContainerRef }) entry!: ViewContainerRef;

  tags: Tag[] = [];
  selectedTag: String = '';
  filter: FilterData = new FilterData('','','');

  constructor(
    public authService: JwtAuthenticationService,
    private postDataService: PostDataService,
    public tagDataService: TagDataService,
    public filterDataService: FilterDataService,
    private pageDataService: PageDataService,
    private fileDataService: FileUploaderService
  ) { }

  ngOnInit(): void {

    this.filterDataService.getFilterDataForPage(STORK).subscribe(
      data => {
        this.filter = data ?? new FilterData('','','');
        this.selectedTag = this.filter.tag ?? '';
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
    this.pageDataService.getPageData(STORK).subscribe(
      data => {
        this.pageData = data ?? new PageData('', '', '', '', []);
      }
    )
  }

  savePageData() {
    if(this.pageData.id === '') {
      this.pageData.pageName = STORK;
      this.pageDataService.createPageData(this.pageData).subscribe(
        (response: PageData) => {
          alert("Data saved");
        }
      );
    }else {
      this.pageDataService.updatePageData(this.pageData).subscribe(
        response => {
          alert("Data saved");
        }
      )
    }
  }

  saveFilter() {
    let newFilter = new FilterData('', STORK, this.selectedTag)
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

  //all of the file stuff
  progress: { percentage: number } = { percentage: 0 };
  selectedFile?: File;
  changeImage = false;
  fileName: String = '';

  uploadFile() {
    
    if(this.selectedFile !== undefined) {
      this.progress.percentage = 0;
      this.fileDataService.uploadFile(this.selectedFile).subscribe( event => {
        if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('File Successfully Uploaded');
          if(this.fileName !== '') {
            this.pageData.fileNames.push(this.fileName);
          }
        }
        this.selectedFile = undefined;
      });
    }
  }

  onFileSelected(event : any) {
    this.selectedFile = event.target.files[0];

    if(this.selectedFile) {
      this.fileName = this.selectedFile.name;  
    }
    this.uploadFile();
  }

  deleteFile(name: String) {
    this.fileDataService.deleteFile(name).subscribe(
      data => {
        alert(`${name} successfully deleted.`);
      }
    );
    this.pageData.fileNames = this.pageData.fileNames.filter(x => x !== name);
  }

  download(name: string) {
    this.fileDataService.getFile(name).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
      }
    );
  }

}
