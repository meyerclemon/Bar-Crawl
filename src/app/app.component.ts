import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private platform: any;

    @ViewChild("map", {static: false})
    public mapElement: ElementRef;

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": "DEd7oRQY19pWOmIZlVd3",
            "app_code": "fUHqreQHv4u572-OKbhcHg"
        });
    }

    public ngOnInit() { }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        let map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 15,
                center: { lat: 47.60188, lng: -122.33402 }
            }
        );
    }

}
