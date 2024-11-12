import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoDto } from './curso.dto';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiUrl = 'http://localhost:3000/api/cursos';

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerCursoPorId(id: number): Observable<CursoDto> {
    return this.http.get<CursoDto>(`${this.apiUrl}/buscarPorId?id=${id}`);
  }

  crearCurso(cursoDto: CursoDto): Observable<CursoDto> {
    return this.http.post<CursoDto>(this.apiUrl, cursoDto);
  }

  modificarCurso(id: number, cursoDto: CursoDto): Observable<CursoDto> {
    return this.http.put<CursoDto>(`${this.apiUrl}/modificarCurso/${id}`, cursoDto);
  }

  eliminarCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarCurso/${id}`)
  }
}