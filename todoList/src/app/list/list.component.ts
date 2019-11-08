import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from '../services/list.service';
import { Subscription } from 'rxjs';
import { emit } from 'cluster';
import * as firebase from 'firebase';
@Component({
 selector: 'app-list',
 templateUrl: './list.component.html',
 styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  taskForm: FormGroup;
  tache = [];
editMode: boolean;
editIndex: number;
tasksSubscription: Subscription;

userId: string;

 constructor(
  private formBuilder: FormBuilder,
  private listService: ListService
 ) {}

  ngOnInit() {
     this.initTaskForm();

     firebase.auth().onAuthStateChanged(
       (user) => {
         if (user) {
           this.userId = user.uid;
           console.log(user.uid);
           this.tasksSubscription = this.listService.tasksSubject.subscribe(
            (data: any) => {
              this.tache = data ? data : [];
            }
          );
           this.listService.getTasks(user.uid);
         }
       }
     );

    // this.listService.getTasks().subscribe(
    //   (data: any) => {
    //     this.tache = data;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

    // this.listService.getTasks()
    //   (data: any) => {
    //     this.tache = data;
    //   }
    // ).catch(
    //   (error) => {
    //     console.error(error);
    //   }
    //   );
  }

  initTaskForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required]
    });
  }

  onCheckTask(index) {
   if (this.tache[index].done) {
    this.tache[index].done = false;
   } else {
    this.tache[index].done = true;
   }
   this.listService.updateTask(this.tache[index], index, this.userId);
  }

  onDisplayModal() {
    $('#newTasksModalCenter').modal('show');
    this.taskForm.reset();
    this.editMode = false;
  }

  onSubmitTaskForm() {
  const newTask = {
    title: this.taskForm.get('title').value,
    description: this.taskForm.get('description').value,
    done: false
  };
  $('#newTasksModalCenter').modal('hide');
 if(this.editMode){
   newTask.done = this.tache[this.editIndex].done;
   this.listService.updateTask(newTask, this.editIndex, this.userId);
  }else{
    this.listService.createTask(newTask, this.userId);
  }
  }
onDeleteTask(index) {
  this.listService.deleteTask(index, this.userId);

}
onEditTask(index){
  $('#newTasksModalCenter').modal('show');
  this.taskForm.get('title').setValue(this.tache[index].title);
  this.taskForm.get('description').setValue(this.tache[index].description);
  this.editMode = true;
  this.editIndex = index;
}
ngOnDestroy(){
this.tasksSubscription.unsubscribe();

}
createTask(newTask: any){
  this.tache.push(newTask);
}

deleteTask(index: number) {
  this.tache.splice(index, 1);
}

}

