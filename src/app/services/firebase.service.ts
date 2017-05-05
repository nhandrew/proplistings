import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;

   constructor(afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.listings = db.list('/listings');
  }

  getListings(){
    return this.listings;
  }

}
