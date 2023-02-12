import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Person } from 'app/organization/organization.component';
import { PersonComponent } from 'app/organization/person/person.component';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { PersonDataService } from 'app/service/organization/person-data.service';
import { PresidencyDataService } from 'app/service/organization/presidency-data.service';

@Component({
  selector: 'app-presidency',
  templateUrl: './presidency.component.html',
  styleUrls: ['./presidency.component.css']
})
export class PresidencyComponent implements OnInit {

  @ViewChild('personContainer', {read: ViewContainerRef}) entry!: ViewContainerRef;

  newPerson: Person = new Person('-1', '', '', '', '');
  constructor(
    public authService: JwtAuthenticationService,
    private presidencyDataService: PresidencyDataService
  ) { }

  ngOnInit(): void {
    this.presidencyDataService.getAllPeople().subscribe(
      response => {
        response.forEach(person => {
          const componentRef = this.entry.createComponent(PersonComponent);
          componentRef.instance.person = person;
          componentRef.instance.splitEmails = person.emails.split(';');
        })
      }
    )
  }

  addNewPerson() {
    if(this.newPerson.id === '-1') {
      this.presidencyDataService.createPerson(this.newPerson).subscribe(
        response => {
          window.location.reload();
        }
      )
    }
  }

}
