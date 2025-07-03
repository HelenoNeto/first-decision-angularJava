import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro inesperado.';

        if (error.status === 0) {
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        } else if (error.status >= 400 && error.status < 500) {
          errorMessage = `Erro ${error.status}: ${error.error?.message || 'Falha ao processar a solicitação.'}`;
        } else if (error.status >= 500) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        }

        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        return throwError(() => error);
      })
    );
  }
}
