import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { PersonDataService } from 'app/service/organization/person-data.service';
import { PersonComponent } from './person/person.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  @ViewChild('personContainer', {read: ViewContainerRef}) entry!: ViewContainerRef;

  newPerson: Person = new Person('-1', '', '', '', '');

  constructor(
    public authService: JwtAuthenticationService,
    private personDataService: PersonDataService
  ) { }

  ngOnInit(): void {
    this.personDataService.getAllPeople().subscribe(
      response => {
        response.forEach(person => {
          const componentRef = this.entry.createComponent(PersonComponent);
          componentRef.instance.person = person;
          componentRef.instance.splitEmails = person.emails.split(';');
          componentRef.instance.download(person.fileName.toString());
        })
      }
    )
  }

  addNewPerson() {
    if(this.newPerson.id === '-1') {
      this.personDataService.createNewPerson(this.newPerson).subscribe(
        response => {
          window.location.reload();
        }
      )
    }
  }
}

export class Person {
  constructor(
    public id: String,
    public name: String,
    public title: String,
    public emails: String,
    public fileName: String
  ) {}
}