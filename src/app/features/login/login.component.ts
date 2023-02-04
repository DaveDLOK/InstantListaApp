import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice.component';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form:FormGroup;
  session;

  constructor(private fb:FormBuilder, 
                private authService: AuthService,
                private stateService: ApplicationStateService, 
               private router: Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  login() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(()=>{
                if(!this.stateService.getIsMobileResolution())
                      this.router.navigateByUrl('/menu');
                else  
                      this.router.navigateByUrl('/myFeed');
              });
      }
  }

  signUp(){
      
  }
}

