
export async function load({ fetch }) {

    // AIRTABLE - Reports
    let public_key = "patfoFHZpi11znkas.afefdf9daa13bb452cbd559575156e67e6d2c880da7f2c69d10ff820586dd84b";
    let report_boundaries_url = "https://api.airtable.com/v0/appvTkmJJRpz8x95D/Report%20Boundaries?filterByFormula=%7Bhas_report%7D+%3D+'Y'"
    let Bearer = 'Bearer ' + public_key;

    const report_res = await fetch( report_boundaries_url , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer
        }  
    });

    const report_data = await report_res.json();
    console.log("Data Received from Air table - Reports");

    // Get geojson from static folder called report-boundaries.geojson
    const report_geo = await fetch('/assets/report_boundaries.geojson');
    const report_geojson = await report_geo.json();

    return {
        props: { 
            reports : report_data.records,
            report_geojson : report_geojson
        }
    };

}
