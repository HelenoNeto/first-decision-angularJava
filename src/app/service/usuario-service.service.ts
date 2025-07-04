import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { first, Observable, tap } from 'rxjs';
import { Usuario } from '../Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}` + '/v1/usuarios').pipe(first(), tap());
  }

  save(record: Usuario) {
    if (record.id) {
      return this.edit(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Usuario) {
    return this.http.post<Usuario>(this.apiUrl.concat('/v1/usuarios'), record).pipe(first());
  }

  private edit(record: Usuario) {
    return this.http
      .put<Usuario>(this.apiUrl.concat('/v1/usuarios/' + record.id), record)
      .pipe(first());
  }

  delete(record: Usuario) {
    return this.http.delete(this.apiUrl.concat('/v1/usuarios/' + record.id)).pipe(first());
  }

  deleteById(id: Number) {
    return this.http.delete(this.apiUrl.concat('/v1/usuarios/' + id)).pipe(first());
  }

  loadbyId(id: Number) {
    return this.http.get<Usuario>(this.apiUrl.concat('/v1/usuarios/' + id.toString()));
  }

  private onSuccess() {
    this.snackbar.open('Excluído com sucesso!', '', { duration: 5000 });
  }

  private onError() {
    this.snackbar.open('Erro ao excluir usuário!', '', { duration: 5000 });
  }

}
