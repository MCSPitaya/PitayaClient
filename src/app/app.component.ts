import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pitaya';

  navigation = [
    { link: 'cases', label: 'Cases' },
    { link: 'courts', label: 'Courts' },
    { link: 'contacts', label: 'Contacts' }
  ];

  sidenav = [
    { value: 'First Item' },
    { value: 'Second Item' },
    { value: 'Third Item' }
  ];
}
