import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  constructor(private authService: AuthService,
              private router: Router) {
  }
  error : string | null = null;
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/\S/)]],
    password: ['', [Validators.required, Validators.pattern(/\S/)]],
    name: ['', [Validators.required, Validators.pattern(/\S/)]]
  });

  register() {
    this.authService.register({
      email: this.registerForm.value.email ||"",
      password: this.registerForm.value.password ||"",
      name: this.registerForm.value.name ||"",
    }).subscribe({
      next: response => {
          console.log("register response:", response)
          this.router.navigate(['/login'])
      },
      error: () => {
        this.error = "Failed to register"
      }
    });
  }
}
