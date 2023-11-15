import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { AuthService } from '@lib/services';

import { RouterModule } from '@angular/router';
import { storage } from '@lib/utils';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule ],        
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    password: any = '';
    step: any = 1;
    typePassword: any = 'password';
    typeRecovery: any = 'A';
    title: any = 'app';
    elementType: any = 'url';
    value: any = 'Techiediaries';

    @Input() returnUrl!: string;
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);
    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: new FormControl('email1@gmail.com', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    login() {        
        for (var i in this.loginForm.controls) { 
            console.log(i);                                 
            this.loginForm.controls[i].markAsTouched();
            this.loginForm.controls[i].markAsDirty();
        }        
        if (this.loginForm.valid){
            let data = {
                email: this.loginForm.controls["email"].value,
                password: this.loginForm.controls["password"].value
            };
            console.log(data);     
            const formData = new FormData();
            for (let key in this.loginForm.controls) {
                formData.append(key, this.loginForm.controls[key].value);
            }     
            this._authService.login(data).subscribe((data: any) => {
                console.log(data);                
                if(data.token){
                    storage.setItem('appSession', data);
                    this._authService.autoLogin();
                    this._router.navigate(['/projects']);
                }
            });            
        }
    }

    changeView(state: any) {}

    seePassword() {
        this.typePassword = (this.typePassword == "password") ? "text" : "password";
    }

    register() {                
        this._router.navigate(['/register'])
    }    
}


