import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/core/model/person';
import { PeopleService } from 'src/app/core/services/people/people.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formPerson: FormGroup;
  formTypeLabel: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formPerson = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.min(18), Validators.max(80)]],
      email: '',
      phone: '',
    });

    const hasId = Boolean(this.activatedRoute.snapshot.params.id);

    this.formTypeLabel = hasId ? 'Atualizar' : 'Cadastrar';
  }

  submit(event: Person): void {
    this.peopleService.upsert(event).subscribe(() => {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    });
  }
}
