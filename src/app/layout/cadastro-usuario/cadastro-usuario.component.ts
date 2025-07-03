import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Usuario } from '../../Usuario';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioServiceService } from '../../service/usuario-service.service';


@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {

  hide = true;
  hideConfirmar = true;
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UsuarioServiceService,
    private snackbar: MatSnackBar,
    private location: Location,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      confirmarSenha: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    }, { validators: senhasIguaisValidator });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const usuario: Usuario = window.history.state?.usu;

      if (usuario) {
        this.form.setValue({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          confirmarSenha: usuario.senha,
        });
      }

      window.history.replaceState({}, '', window.location.href);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (result) => this.onSuccess(),
        (error) => this.onError()
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

  private onSuccess() {
    this.snackbar.open('Salvo com sucesso!', '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.router.navigate(['/cad/list']);
  }

  private onError() {
    this.snackbar.open('Erro ao salvar grupo!', '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return 'Tamanho mínimo de ' + requiredLength + ' caracteres';
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 50;
      return 'Tamanho máximo de ' + requiredLength + ' caracteres.';
    }

    return 'Campo inválido';
  }

}

export const senhasIguaisValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const senha = control.get('senha')?.value;
  const confirmar = control.get('confirmarSenha')?.value;
  return senha === confirmar ? null : { senhasDiferentes: true };
};

