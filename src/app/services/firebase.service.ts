import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;

   constructor(db: AngularFireDatabase) {
    this.listings = db.list('/listings');
  }

  getListings(){
    return this.listings;
  }

}
