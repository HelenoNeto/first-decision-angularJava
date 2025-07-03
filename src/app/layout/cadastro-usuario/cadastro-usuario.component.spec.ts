import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUsuarioComponent } from './cadastro-usuario.component';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CadastroUsuarioComponent', () => {
  let component: CadastroUsuarioComponent;
  let fixture: ComponentFixture<CadastroUsuarioComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroUsuarioComponent],
      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('deve criar o formulário com campos nome e email', () => {
    expect(component.form.contains('nome')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
  });

  it('deve tornar o botão de envio desabilitado quando formulário for inválido', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    component.form.setValue({ nome: '', email: '' });
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();
  });

  it('deve habilitar o botão de envio quando o formulário for válido', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    component.form.setValue({ nome: 'Heleno', email: 'heleno@email.com' });
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('deve impedir submissão se o formulário for inválido', () => {
    spyOn(console, 'log');
    component.form.setValue({ nome: '', email: '' });
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('deve permitir submissão se o formulário for válido', () => {
    spyOn(console, 'log');
    component.form.setValue({ nome: 'Heleno', email: 'heleno@email.com' });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Formulário enviado', {
      nome: 'Heleno',
      email: 'heleno@email.com'
    });
  });
});
