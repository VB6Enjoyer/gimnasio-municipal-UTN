import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  title = 'Gimnasio Municipal';
  isNavbarOpen = false;

  constructor(private router: Router) { }

  navItems = [
    { path: '/home', label: 'Inicio' },
    { path: '/categorias', label: 'Categorías' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/ejercicios', label: 'Ejercicios' },
    { path: '/elementos', label: 'Elementos' },
    { path: '/rutinas', label: 'Rutinas' }
  ];

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}