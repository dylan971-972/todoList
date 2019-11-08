import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  tache = [];

  tasksSubject = new Subject<any>();
  constructor() { }

  emitTasks() {
    this.tasksSubject.next(this.tache);
  }

  saveTasks(userId: string) {
    firebase.database().ref('/users/' + userId + '/list/').set(this.tache);

  }
  getTasks(userId: string) {
    firebase.database().ref('/users/' + userId + '/list/').on('value', (data: any) =>{
      this.tache = data.val() ? data.val() : [];
      this.emitTasks();
      });

  //   return new Observable((observer) => {
  //     if (this.tache && this.tache.length > 0) {
  //       observer.next(this.tache);
  //       observer.complete();
  //     } else {
  //       const error = new Error('Tasks is not defined or is empty');
  //       observer.error(error);

  //     }
  //   });
   }

  createTask(newTask: any, userId: string) {
    this.tache.push(newTask);
    this.saveTasks(userId);
  }

  updateTask(task: any, index: number, userId: string) {
    this.tache[index] = task;
    this.saveTasks(userId);

  }
  deleteTask(index: number, userId: string) {
    this.tache.splice(index, 1);
    this.saveTasks(userId);
  }

}

