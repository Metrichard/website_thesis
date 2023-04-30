import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TextPiece } from 'app/language-editor/TextPiece';
import { API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private http: HttpClient
  ) { }

  getTextPieceByTarget(targetLanguage: String) {
    return this.http.get<TextPiece>(`${API_URL}/api/language-get/${targetLanguage}`);
  }

  createNewTextPiece(piece: TextPiece){
    return this.http.post<TextPiece>(`${API_URL}/api/language-create}`, piece);
  }

  updateTextPiece(piece: TextPiece) {
    return this.http.patch<TextPiece>(`${API_URL}/api/language-update`, piece);
  }

  deleteTextPiece(id: String) {
    return this.http.delete(`${API_URL}/api/language-delete/${id}`);
  }

  getEveryTextPiece() {
    return this.http.get<TextPiece[]>(`${API_URL}/api/languages`);
  }
}
