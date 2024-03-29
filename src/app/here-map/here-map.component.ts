import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {

    @ViewChild("map", {static: false})
    public mapElement: ElementRef;

    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    private platform: any;
    private map: any;
    public ui: any;
    private search: any;

    private router: any;
    private geocoder: any;



    public constructor() { }

    public ngOnInit() {
        console.log("oninit")
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.search = new H.places.Search(this.platform.getPlacesService());
        this.router = this.platform.getRoutingService();
        this.geocoder = this.platform.getGeocodingService();
    }

    public ngAfterViewInit() {
        console.log("triggered")
      let defaultLayers = this.platform.createDefaultLayers();
      this.map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.normal.map,
          {
              zoom: 10,
              center: { lat: this.lat, lng: this.lng }
          }
      );
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      // Added
    //   this.addInfoBubble(this.map);
      this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    //   this.map.addEventListener('tap', function(event) {
    //   // Log 'tap' and 'mouse' events:


    // });

  }
  // Create list of locations that apply to search query //
  // public places(query: string) {
  //     this.map.removeObjects(this.map.getObjects());
  //     this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
  //         for(let i = 0; i < data.results.items.length; i++) {
  //             this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);
  //
  //         }
  //     }, error => {
  //         console.error(error);
  //     });
  // }
  ///


  // Place a marker at each location found above //
  private dropMarker(coordinates: any, data: any) {
      let marker = new H.map.Marker(coordinates);
      let tempUI = this.ui;
      marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
      marker.addEventListener('tap', function(event) {
        let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
            content: event.target.getData()
        });
        //learn more about the bubble
        console.log("I clicked a bubble.")
        tempUI.addBubble(bubble);
        bubble.addEventListener('tap', e => e.open());
      }, false);

      this.map.addObject(marker);
  }


  private getCoordinates(query: string) {
    return new Promise((resolve, reject) => {
        this.geocoder.geocode({ searchText: query }, result => {
            if(result.Response.View.length > 0) {
                if(result.Response.View[0].Result.length > 0) {
                    resolve(result.Response.View[0].Result);

                } else {
                    reject({ message: "no results found" });
                }
            } else {
                reject({ message: "no results found" });
            }
        }, error => {
            reject(error);
        });
    });

  }




  public route(start: string, range: number, query: string) {
    let tempUI = this.ui;
    let params = {
        "mode": "fastest;pedestrian;",
        "range": range*=60,
        "rangetype": "time",
        "departure": "now"
    }
    this.map.removeObjects(this.map.getObjects());
    this.getCoordinates(start).then(geocoderResult => {
        params["start"] = geocoderResult[0].Location.DisplayPosition.Latitude + "," + geocoderResult[0].Location.DisplayPosition.Longitude;


        this.router.calculateIsoline(params, data => {
            if(data.response) {
              let  center = new H.geo.Point(data.response.center.latitude, data.response.center.longitude),
                    isolineCoords = data.response.isoline[0].component[0].shape,
                    linestring = new H.geo.LineString(),
                    isolinePolygon,
                    isolineCenter;
                isolineCoords.forEach(coords => {
                    linestring.pushLatLngAlt.apply(linestring, coords.split(','));
                });
                isolinePolygon = new H.map.Polygon(linestring);
                isolineCenter = new H.map.Marker(center);
                this.map.addObjects([isolineCenter, isolinePolygon]);
                this.map.setViewBounds(isolinePolygon.getBounds());
                //InfoBubble for startpoint
                isolineCenter.addEventListener('tap', function(event) {
                  let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
                      content: "You Are Here!"
                  });
                  tempUI.addBubble(bubble);
                  bubble.addEventListener('tap', e => e.open());
                }, false);


                this.search.request({ "q": query, "at": center.lat + "," + center.lng }, {}, data => {
                    for(let i = 0; i < data.results.items.length; i++) {
                        this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);

                    }
                }, error => {
                    console.error(error);
                });

            }
        }, error => {
            console.error(error);
        });
    }, error => {
        console.error(error);
    });


  }


}
