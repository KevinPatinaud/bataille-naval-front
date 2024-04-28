import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RestService } from './services/rest/rest.service';


@NgModule({  
    imports: [
        HttpClientModule  
      ],
      providers: [
        RestService  
      ]
})
export class CoreModule { }
