import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home/home.component';
import { CadastroUsuarioComponent } from './layout/cadastro-usuario/cadastro-usuario.component';
import { ListarUsuarioComponent } from './layout/listar-usuario/listar-usuario.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cad', component: CadastroUsuarioComponent },
    { path: 'cad/list', component: ListarUsuarioComponent },    
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
