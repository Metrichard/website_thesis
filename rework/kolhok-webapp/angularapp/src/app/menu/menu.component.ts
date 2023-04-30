import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'app/service/language/language.service';
import { JwtAuthenticationService } from '../service/authentication.service';
import { TextPiece } from '../language-editor/TextPiece';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  opened = false;
  languageMode: String = 'eng';
  languageModel!: TextPiece;

  constructor(
    public authenticationService: JwtAuthenticationService,
    private router: Router,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.getTextPieceByTarget(this.languageMode).subscribe(
      data => {
        this.languageModel = data;
      }
    )
  }

  getComponentPiece(key: String){
    return this.languageModel.textLanguageMap.get(key);
  }

  setLanguage(language: String) {
    this.languageMode = language;
    window.location.reload();
  }

  editApplicationPages(){
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['application-editing']);
    }
  }
  
  toggleMenu(){
    this.opened = !this.opened;
  }
}
