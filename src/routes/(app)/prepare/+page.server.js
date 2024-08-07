// import AIRTABLE_APIKEY from .env using new 
import { PUBLIC_AIRTABLE_APIKEY, PUBLIC_MYCOAST_APIURL } from "$env/static/public"

export async function load({ fetch }) {

    // AIR TABLE - Preparedness
    let public_key = "patfoFHZpi11znkas.afefdf9daa13bb452cbd559575156e67e6d2c880da7f2c69d10ff820586dd84b";
    let at_url = 'https://api.airtable.com/v0/appvTkmJJRpz8x95D/Preparedness'
    let Bearer = 'Bearer ' + public_key;
    const at_res = await fetch( at_url , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer
        }  
    });

    const at_data = await at_res.json();
    console.log("Data Received from Air table - Prep");

    return {
        props: { 
            prep : at_data.records,
        }
    };
}
