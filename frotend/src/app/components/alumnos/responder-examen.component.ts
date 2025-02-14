import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { Examen } from 'src/app/models/examen';
import { Respuesta } from 'src/app/models/respuesta';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/cursos.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import Swal from 'sweetalert2';
import { ResponderExamenModalComponent } from './responder-examen-modal.component';
import { VerExamenModalComponent } from './ver-examen-modal.component';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styleUrls: ['./responder-examen.component.css']
})
export class ResponderExamenComponent implements OnInit {

  alumno!: Alumno;
  curso!: Curso;
  examenes: Examen[] = [];

  mostrarColumnasExamenes = ['id', 'nombre', 'asignaturas', 'preguntas', 'responder', 'ver'];
  
  dataSource!: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  pageSizeOptions = [3, 5, 10, 20, 50]



  constructor(private route: ActivatedRoute,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private respuestaService: RespuestaService,
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.alumnoService.ver(id).subscribe(alumno => {
        this.alumno = alumno;
        this.cursoService.obtenerCursoPorAlumnoId(this.alumno)
        .subscribe(
          curso => {
            this.curso = curso;
            this.examenes = (curso && curso.examenes)? curso.examenes: [];
            this.dataSource = new MatTableDataSource<Examen>(this.examenes);
            this.iniciarPaginador();
          }
        )
      });
    });

  }

  responderExamen(examen: Examen): void{
    const modalRef = this.dialog.open(ResponderExamenModalComponent, {
      width: '750px',
      data: {curso: this.curso, alumno: this.alumno, examen: examen}
    });

    modalRef.afterClosed().subscribe((respuestasMap: Map<number, Respuesta>)  => {
      if (respuestasMap) {
        const respuestas = Array.from(respuestasMap.values());
        this.respuestaService.crear(respuestas).subscribe(resp => {
          examen.respondido = true;
          Swal.fire(
            'Enviadas: ',
            'Preguntas enviadas con exito',
            'success'
          )
        });
      }
    });
  }

  verExamen(examen: Examen): void {
    this.respuestaService.obtenerRespuestasPorAlumnoPorExamen(this.alumno, examen)
    .subscribe(resp => {
      const modalRef = this.dialog.open(VerExamenModalComponent, {
        width: '750px',
        data: {curso: this.curso, examen: examen, respuestas: resp}
      });
      modalRef.afterClosed().subscribe(() => {
        console.log('modal ver examen cerrado');
      })
    });
  }


  private iniciarPaginador(){
    this.dataSource = new MatTableDataSource<Examen>(this.examenes);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por página'
    this.paginator._intl.firstPageLabel = 'Primera página'
    this.paginator._intl.lastPageLabel = 'Ultima página'
    this.paginator._intl.nextPageLabel = 'Siguiente página'
    this.paginator._intl.previousPageLabel = 'Página anterior'
  }

}
