import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {
  private baseUrl = environment.host + '/api/v1/reclamations';

  constructor(private http:HttpClient) { }

  addReclamation(reclamation: any){
    return this.http.post(this.baseUrl, reclamation)
  }
}
