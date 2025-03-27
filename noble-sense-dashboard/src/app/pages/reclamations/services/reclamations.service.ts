import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReclamationsPage } from 'src/app/models/reclamation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {
  
  toggleAnswered(reclamationId: number) {
    return this.http.put(`${this.baseUrl}/toggle-answered/${reclamationId}`, {})
  }

  private baseUrl = environment.host + '/api/v1/reclamations';
  constructor(private http:HttpClient) { }

  getAllReclamations(page:number, size:number){
    const url = `${this.baseUrl}?page=${page}&size=${size}`
    return this.http.get<IReclamationsPage>(url)
  }
  deleteReclamation(reclamationId: number) {
    return this.http.delete(`${this.baseUrl}/${reclamationId}`)
  }
}
