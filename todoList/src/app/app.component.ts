import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoList';

  constructor(){
    const firebaseConfig = {
      apiKey: 'AIzaSyBvPsd_o6UBOUQNjz8ciPoiQphWSil75Ig',
      authDomain: 'todolist-21ea5.firebaseapp.com',
      databaseURL: 'https://todolist-21ea5.firebaseio.com',
      projectId: 'todolist-21ea5',
      storageBucket: 'todolist-21ea5.appspot.com',
      messagingSenderId: '42958647181',
      appId: '1:42958647181:web:683f32758bbb38188597c4'
    };
    firebase.initializeApp(firebaseConfig);
  }

}
