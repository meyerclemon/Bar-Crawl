import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public query: string;
    public start: string;
    public range: string;

    public constructor() {
      this.query = "bar";
      this.start = "Seattle WA";
      this.range = "300";
    }

    public ngOnInit() { }

}
