import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [FirebaseService]
})
export class ListingComponent implements OnInit {

listings:any;

  constructor(private firebaseService:FirebaseService) { }
  

  ngOnInit() {
    this.firebaseService.getListings().subscribe(listings => {
      this.listings = listings;     
    })
  }
}
