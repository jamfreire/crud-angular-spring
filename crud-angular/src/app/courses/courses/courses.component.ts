import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../models/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['_id', 'name', 'category', 'actions'];
  errorMessage = '';

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        console.log(error);
        this.onError('Não foi possível carregar os dados dos cursos');
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onError(errorMessage: string) {
    this.errorMessage = errorMessage;
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
