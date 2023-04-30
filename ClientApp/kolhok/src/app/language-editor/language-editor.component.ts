import { Text } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { TextPiece } from 'app/language-editor/TextPiece';
import { LanguageService } from 'app/service/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-language-editor',
  templateUrl: './language-editor.component.html',
  styleUrls: ['./language-editor.component.css']
})
export class LanguageEditorComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  @Input() newText: TextPiece = new TextPiece('', '', new Map<String, String>);

  languages: TextPiece[] = [];

  constructor(
    private languageService : LanguageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      field: [null, [Validators.required], null]
    });

    this.languageService.getEveryTextPiece().subscribe(
      data => {
        this.languages = data;
      }
    );
  }

  createTextPiece() {
    if(this.newText.toString() !== '' && this.newText.textLanguageMap.size !== 0) {
      this.languageService.createNewTextPiece(this.newText).subscribe(
        reponse => {
          alert('New language pack created successfully.');
        },
        error => {
          alert('Language pack creation failed.');
        }
      );
    } 
  }

  mapToArray(map: Map<String, String>) {
    return Array.from(map.keys());
  }

}
