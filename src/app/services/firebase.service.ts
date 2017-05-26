import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

//firebase/app according to documentation, however upload does not work with the /app extension
import * as firebase from 'firebase';
 
@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;
  listing: FirebaseObjectObservable<any>;
  folder: any;
   constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.folder='listingimages'
    this.listings=this.db.list('/listings/listings') as FirebaseListObservable<Listing[]>;
  };

  getListings(){
    
    return this.listings;
  }

  getListingDetails(id) {
    this.listing=this.db.object('/listings/listings/'+id) as FirebaseObjectObservable<Listing>;
    return this.listing
  }

  addListing(listing){
    
    // Create root reference 
    let storageRef=firebase.storage().ref();
    console.log(listing);
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image=selectedFile.name;
        listing.path=path;
        console.log(path);
        //return this.listings.push(listing);
        return this.db.list('/listings/listings').push(listing);
        
      });
    }
  }

  updateListing(id, listing){
    return this.db.list('/listings/listings').update(id,listing);
  }

  deleteListing(id){
    return this.db.list('listings/listings').remove(id);
  }


}


interface Listing{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;
}