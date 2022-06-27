const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
let firstTime = true;
const mymap = L.map('map').setView([0, 0], 1);

//Making marker with Custom Icon
const  issIcon = L.icon({
    iconUrl: '../iss.png',
    iconSize: [55, 40],
    iconAnchor: [22, 94] 
});

const marker =   L.marker([0,0],{ icon:issIcon }).addTo(mymap);





const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles= L.tileLayer(tileUrl,{attribution})
tiles.addTo(mymap);




async function getISS(){
    const response = await fetch(api_url);
    const data = await response.json()
    const {latitude,longitude,visibility,altitude} = data;
    
    const aspect = 1.5625;
    const w = (altitude * aspect) / 10;
    const h = altitude / 10;
    issIcon.iconSize = [w, h];
    issIcon.iconAnchor = [w / 2, h / 2];

   

    
 
    
    marker.setLatLng([latitude,longitude])

    if (firstTime) {
        mymap.setView([latitude, longitude], 2);
        firstTime = false;
      }
   
        
    

   document.getElementById('lat').textContent = latitude.toFixed(2);
   document.getElementById('lon').textContent=longitude.toFixed(2);
   document.getElementById('visibility').textContent = visibility

  
    


}

getISS()


setInterval(getISS,1000)