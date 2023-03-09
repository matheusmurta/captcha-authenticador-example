import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  recaptchaResponse: string ="";
  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/authenticate', { recaptcha: this.recaptchaResponse }).subscribe({
      next: (data)=>{console.log(data)
    },
      error: (err)=>console.log(err),
    });
  }

  resolved(captchaResponse: string) {
    this.recaptchaResponse = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
