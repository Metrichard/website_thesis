import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name= ''
  welcomeMessage: String = ''
  errorMessage: String = ''

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccesfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithVariable() {
    this.service.executeHelloWorldBeanServiceWithVariable(this.name).subscribe(
      response => this.handleSuccesfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccesfulResponse(response: HelloWorldBean) {
    this.welcomeMessage = response.message;
    this.errorMessage = ''
  }

  handleErrorResponse(error: ErrorEvent) {
    this.errorMessage = error.error.message;
    this.welcomeMessage = ''
  }
}
