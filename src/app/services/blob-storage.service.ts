import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {

  url: any = "https://filesananatural.blob.core.windows.net/";
  urlBlobLocal: any =  "http://localhost:4000/"
  urlBlobDominio: any =  "https://apimsananatural.azure-api.net/"
  constructor() { }
}
