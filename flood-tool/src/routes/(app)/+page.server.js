
// import AIRTABLE_APIKEY from .env using new 
import { PUBLIC_AIRTABLE_APIKEY, PUBLIC_MYCOAST_APIURL } from "$env/static/public"

export async function load({ fetch }) {

    // AIR TABLE - Preparedness
    let at_url = 'https://api.airtable.com/v0/appvTkmJJRpz8x95D/Preparedness'
    let Bearer = 'Bearer ' + PUBLIC_AIRTABLE_APIKEY
    const at_res = await fetch( at_url , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer
        }  
    });

    const at_data = await at_res.json();
    console.log("Data Received from Air table - Prep");

    // MY COAST API
    let myCoastURL = PUBLIC_MYCOAST_APIURL;
    const res = fetch(myCoastURL);
    const mycoastPromise = res.then(
        response => response.json()
    ).then(my_coast_data => {
        let lonmin = -74.3600;
        let lonmax = -73.6750;
        let latmin = 40.4878;
        let latmax = 40.9446;

        let my_coast_data_filtered = my_coast_data.features;
        // from data.features, extract top 5 rows
        my_coast_data_filtered = my_coast_data_filtered.filter(function (item) {
            let lat = item.geometry.coordinates[1];
            let lon = item.geometry.coordinates[0];

            if (lat > latmin && lat < latmax && lon > lonmin && lon < lonmax && item.properties.comment != '') {
                return true;
            }
        });

        my_coast_data_filtered = my_coast_data_filtered.slice(0, 20);
        my_coast_data_filtered = my_coast_data_filtered.sort(() => Math.random() - Math.random()).slice(0, 4);

        return my_coast_data_filtered;
    });

    return {
        props: { 
            preparedness : at_data.records,
            mycoast : mycoastPromise,
        }
    };
}