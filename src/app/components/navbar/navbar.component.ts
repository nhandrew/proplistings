import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  loggedIn: boolean;
  authStatus: any;

constructor(private afAuth: AngularFireAuth, public flashMessage:FlashMessagesService) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  if (this.afAuth.auth.currentUser==null){
    this.loggedIn==false;
  } else {
    this.loggedIn==true;
  }
  }
  
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.loggedIn=true;
      this.afAuth.authState.subscribe(auth => this.authStatus=auth) 
  }


  logout() {
     this.afAuth.auth.signOut();
     this.loggedIn=false;
     this.flashMessage.show('You are Logged Out', {cssClass: 'alert-success', timeout: 3000});
     this.afAuth.authState.subscribe(auth => this.authStatus=auth);
  }


}
