import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagDataService } from 'app/service/tag/tag-data-service.service';
import { Post } from '../post-editor/post-editor.component';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService, PostRequest } from '../service/post/post-data.service';
import { Tag } from '../post-editor/post-editor.component';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { Editor, Validators, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {

  post: Post = new Post('', '', '', '', '', false, false, new Date(), []);
  
  editorDoc = this.post.text;
  html = 'Dynamic Data';

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  formm = new FormGroup({
    editorContent: new FormControl(
      { value: this.post.text, disabled: false},
      Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.formm.get('editorContent') as any;
  }

  fileName: String = '';

  shouldShow: boolean = true;
  isEditing: boolean = false;
  id: String = '';
  
  isNew: boolean = false;
  tags: Tag[] = [];
  selectedTag: string = '';
  fileNames: String[] = [];

  constructor(
    private postService: PostDataService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: JwtAuthenticationService,
    private tagDataService: TagDataService,
    private fileDataService: FileUploaderService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    if(this.id === '-1'){
      this.isEditing = true;
      this.shouldShow = false;
    }

    if(this.id != '-1') {
      this.isNew = false;
      this.postService.retrivePostById(this.id).subscribe(
        data => {
          const isPinned = data.isPinned === 'true' ? true : false;
          const isHidden = data.isHidden === 'true' ? true : false;
          this.post = new Post(data.id, data.title, data.author, data.text, data.tag, isPinned, isHidden, data.publicationDate, data.files);
          this.selectedTag = this.post.tag.toString();
          this.fileNames = data.files;
        }
      )
    }else {
      this.isNew = true;
    }

    this.tagDataService.getAllTags().subscribe(
      response => {
        this.tags = response;
        
      }
    )
  }

  ngOnDestroy() {
    this.editor.destroy()
  }

  saveOrUpdate() {
    const isPinned = this.post.isPinned ? 'true' : 'false';
    const isHidden = this.post.isHidden ? 'true' : 'false';
    if(this.id == '-1'){
      this.post.publicationDate = new Date();
      this.post.author = this.authService.getAuthenticatedUser();
      this.post.tag = this.selectedTag;
      this.post.files = this.fileNames;
      const request: PostRequest = new PostRequest(this.post.id, this.post.title, this.post.author, this.post.text, this.post.tag, isPinned, isHidden, this.post.publicationDate, this.post.files);
      this.postService.createPost(request).subscribe(
        data => { 
          this.router.navigate(['post-editor']);
        }
      )
    }else {
      this.post.tag = this.selectedTag;
      this.post.files = this.fileNames;
      const request: PostRequest = new PostRequest(this.post.id, this.post.title, this.post.author, this.post.text, this.post.tag, isPinned, isHidden, this.post.publicationDate, this.post.files);
      this.postService.updatePost(request).subscribe(
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

  selectedTagChanged(tag : string) {
    this.selectedTag = tag;
  }

//all of the file stuff
  progress: { percentage: number } = { percentage: 0 };
  files: String[] = [];
  selectedFile?: File;
  changeImage = false;

  uploadFile() {
    
    if(this.selectedFile !== undefined) {
      this.progress.percentage = 0;
      this.fileDataService.uploadFile(this.selectedFile).subscribe( event => {
        if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('File Successfully Uploaded');
          if(this.fileName !== '') {
            this.files.push(this.fileName);
            this.fileNames.push(this.fileName);
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
    this.fileNames = this.fileNames.filter(x => x !== name);
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