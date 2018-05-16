import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    ) {}
  
  title = 'Pitaya';

  navigation = [
    { link: 'cases', label: 'Cases' },
    { link: 'courts', label: 'Courts' },
    { link: 'contacts', label: 'Contacts' },
    { link: 'user', label: 'User' }
  ];

  sidenav = [
    { value: 'First Item' },
    { value: 'Second Item' },
    { value: 'Third Item' }
  ];

  navigateTo(url: any){
    this.router.navigate(['/' + url]);
  }
}
