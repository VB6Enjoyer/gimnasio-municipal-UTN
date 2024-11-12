import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RutinasService } from '../../services/rutinas/rutinas.service';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { RutinaDto } from '../../services/rutinas/rutina.dto';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.css'
})

export class RutinasComponent implements OnInit {
  rutinas: any[] = [];
  categorias: any[] = [];

  busqueda: string = ''; // Parámetro de busqueda

  rutinaSeleccionada: RutinaDto | null = null; // Rutina seleccionada para editar
  rutinaDto: RutinaDto = new RutinaDto(); // Dto para el form de crear y editar

  isModalOpen = false; // Determina si el modal con el form para crear y editar está abierto
  editing = false; // Determina si se está editando una rutina

  sortColumn: string = ''; // Columna siendo ordenada
  sortDirection: boolean = true; // Ascendente si es verdadero, descendente si es falso

  constructor(private rutinasService: RutinasService, private categoriasService: CategoriasService) { }

  // Función de inicialización
  ngOnInit(): void {
    this.loadCategorias();
    this.loadRutinas();
  }

  // Cargar y mostrar las rutinas
  loadRutinas(): void {
    this.rutinasService.obtenerRutinas().subscribe(
      (data) => {
        this.rutinas = data; // Assign the response data to the rutinas array
        this.emparejarRutinaConCategoria();
      },
      (error) => {
        console.error('Hubo un error al cargar las rutinas:', error);
        alert(error.error.message);
      }
    );
  }

  // Cargar las categorías para mostrarlas junto a las rutinas
  loadCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Hubo un error al cargar las categorías:', error);
        alert(error.error.message);
      }
    );
  }

  // Asocia cada rutina con su categoría correspondiente
  emparejarRutinaConCategoria(): void {
    if (this.rutinas.length && this.categorias.length) {
      this.rutinas.forEach((rutina) => {
        const categoria = this.categorias.find((cat) => cat.idCategoria === rutina.idCategoria); // Por cada rutina busca por la categoría correspondiente, comparando las IDs
        if (categoria) {
          rutina.categoriaTipo = categoria.tipo; // Asigna la categoria a la rutina
        }
      });
    }
  }

  // Filtra las rutinas al buscar con la barra de búsqueda
  get filteredRutinas(): any[] {
    if (!this.busqueda) {
      return this.rutinas;  // Retorna todas las rutinas si no hay ningún término de busqueda
    }

    return this.rutinas.filter(rutina =>
      rutina.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  eliminarRutina(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta rutina?')) {
      this.rutinasService.eliminarRutina(id).subscribe(
        () => {
          this.loadRutinas();  // Recarga la lista tras eliminar la rutina
        },
        error => {
          console.error('Error al eliminar la rutina:', error);
          alert(error.error.message);
        }
      );
    }
  }

  crearRutina() {
    this.editing = false // Confirma que no se está editando una rutina (en caso de que se haya editado una previamente)
    this.isModalOpen = true; // Abre el modal con el form para crear la rutina
  }

  modificarRutina(id: number) {
    this.rutinasService.obtenerRutinaPorId(id).subscribe(
      (rutina: RutinaDto) => {
        this.rutinaSeleccionada = rutina;
        this.rutinaDto = { ...rutina }; // Llena el form con los datos de la rutina siendo editada
        this.editing = true; // Confirma que se está editando una rutina (para evitar crear una nueva)
        this.isModalOpen = true; // Abre el modal con el form para editar la rutina
      },
      (error) => {
        console.error('Hubo un error tratando de obtener la rutina a editar:', error);
        alert(error.error.message);
      }
    );
  }

  onSubmit() {
    if (this.rutinaDto.horario && this.rutinaDto.horario.length === 5) {
      this.rutinaDto.horario += ':00';  // *Convierte 'HH:MM' a 'HH:MM:SS' para evitar un error 400, ya que la base de datos espera esta clase de valor*
    }

    if (this.rutinaDto.idCategoria) {
      this.rutinaDto.idCategoria = Number(this.rutinaDto.idCategoria) // Se asegura de tomar el ID de la categoria para enviarlo
    }

    if (this.editing && this.rutinaSeleccionada) { // Chequéa si hay una rutina seleccionada y si la misma se está editando
      this.rutinasService.modificarRutina(Number(this.rutinaSeleccionada.idRutina), this.rutinaDto).subscribe(
        response => {
          this.rutinaDto = new RutinaDto(); // Reinicia los valores del form
          this.isModalOpen = false; // Cierra el modal
          this.loadRutinas(); // Vuelve a cargar las rutinas
        },
        error => {
          console.error('Error al modificar la rutina:', error);
          alert(error.error.message);
        }
      );
    } else { // Implica que se está creando una rutina
      this.rutinasService.crearRutina(this.rutinaDto).subscribe(
        response => {
          this.loadRutinas(); // Vuelve a cargar las rutinas
          this.isModalOpen = false; // Cierra el modal
          this.rutinaDto = new RutinaDto(); // Reinicia los valores del form
          alert("Rutina creada con exito!");
        },
        error => {
          console.error('Error al crear la rutina:', error);
          alert(error.error.message);
        }
      );
    }
  }

  // Guarda el ID de la categoría seleccionada al crear o modificar una rutina
  onCategoriaChange(event: any) {
    const idCategoria: number = event.target.value;
    this.rutinaDto.idCategoria = Number(idCategoria);
  }

  ordenarRutinas(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true; // Cambia la dirección al clickear la columna
    this.sortColumn = column; // Cambia la columna siendo ordenada

    this.filteredRutinas.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection ? -1 : 1; // Cambia el orden entre ascendiente y descendente
      } else if (aValue > bValue) {
        return this.sortDirection ? 1 : -1;
      }
      return 0; // Iguala los valores
    });
  }
}