import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagDataService } from 'app/service/tag/tag-data-service.service';
import { FileWrapper, Post } from '../post-editor/post-editor.component';
import { JwtAuthenticationService } from '../service/authentication.service';
import { PostDataService, PostRequest } from '../service/post/post-data.service';
import { Tag } from '../post-editor/post-editor.component';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { Editor, Validators, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {

  post: Post = new Post('', '', '', '', '', false, false, new Date());

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

    if(this.id != '') {
      this.isNew = false;
      this.postService.retrivePostById(this.id).subscribe(
        data => {
          this.post = new Post(data.id, data.title, data.author, data.text, data.tag, Boolean(data.isPinned), Boolean(data.isHidden), data.publicationDate);
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

    console.log(this.html);

    if(this.id == '-1'){
      this.post.publicationDate = new Date();
      this.post.author = this.authService.getAuthenticatedUser();
      const request: PostRequest = new PostRequest(this.post.id, this.post.title, this.post.author, this.post.text, this.post.tag, this.post.isPinned.toString(), this.post.isHidden.toString(), this.post.publicationDate);
      this.postService.createPost(request).subscribe(
        data => { 
          this.router.navigate(['post-editor']);
        }
      )
    }else {
      const request: PostRequest = new PostRequest(this.post.id, this.post.title, this.post.author, this.post.text, this.post.tag, this.post.isPinned.toString(), this.post.isHidden.toString(), this.post.publicationDate);
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

  onFileSelected(event : any) {
    const file: File = event.target.files[0];

    if(file) {
      this.fileName = file.name;
      const formData: FormData = new FormData();
      formData.append('file', file);
      const fileWrapper = new FileWrapper('', formData);
      this.fileDataService.uploadFile(fileWrapper).subscribe();
    }
  }
}