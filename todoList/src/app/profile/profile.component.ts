import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  private formBuilder: FormBuilder,
  ngOnInit() {
    this.initTaskForm();

  }

}
initTaskForm() {
  this.taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', Validators.required]
  });
}
