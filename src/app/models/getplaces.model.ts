// export class GetPlaces{
//   getLatLong(start) {
//     return new Promise(function(resolve, reject) {
//         let request = new XMLHttpRequest();
//         let latLong = [];
//         let url = `https:geocoder.api.here.com/6.2/geocode.json?app_id=DEd7oRQY19pWOmIZlVd3&app_code=fUHqreQHv4u572-OKbhcHg&searchtext=${start}`;
//         request.onload = function() {
//             if (this.status == 200) {
//                 resolve(request.response);
//             } else {
//                 reject(Error(request.statusText));
//             }
//         };
//         request.open("GET", url, true);
//         request.send();
//
//         console.log("promise");
//     });
//   }
// }
//
//
// notes:
//
// https://geocoder.api.here.com/6.2/geocode.json?app_id=DEd7oRQY19pWOmIZlVd3&app_code=fUHqreQHv4u572-OKbhcHg&searchtext=425+W+Randolph+Chicago
//
// `geocoder.api.here.com/6.2/geocode.json?app_id=DEd7oRQY19pWOmIZlVd3&app_code=fUHqreQHv4u572-OKbhcHg&searchtext=${start}`
