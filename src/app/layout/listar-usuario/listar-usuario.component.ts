import { Component } from '@angular/core';
import { Usuario } from '../../Usuario';
import { UsuarioServiceService } from '../../service/usuario-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.scss'
})
export class ListarUsuarioComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioServiceService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  editar(usuario: Usuario): void {
    this.router.navigate(['/cad'], { state: { usu: usuario } });
  }


  excluir(id: number): void {
    const confirmado = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmado) {
      this.usuarioService.deleteById(id).subscribe(() => {
        console.log('Usuário excluído');
      });
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

}
