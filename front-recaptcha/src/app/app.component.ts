import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecaptchaComponent } from 'ng-recaptcha';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm: FormGroup;
  porcentagem: number = 0;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      campo1: ['', Validators.required],
      campo2: ['', Validators.required],
      campo3: ['', Validators.required],
    });

    this.myForm.valueChanges.subscribe(() => {
      const totalCampos = Object.keys(this.myForm.controls).length;
      const camposPreenchidos = Object.keys(this.myForm.controls).filter(controlName => this.myForm.get(controlName)?.valid).length;
      
      if (camposPreenchidos === totalCampos) {
        this.porcentagem = 100;
      } else {
        this.porcentagem = (camposPreenchidos / totalCampos) * 100;
      }
    });
    
  }

  resetvalidator(){
    this.myForm.get('campo3')?.reset();
    this.myForm.updateValueAndValidity();

  }
}
