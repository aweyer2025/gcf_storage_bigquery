
const {BigQuery} =require('@google-cloud/bigquery');

const bq = new BigQuery();
const datasetId = 'weather_etl';
const tableId = 'demo';


//Define an entry point function
const demoCode = () => {
    //Create a fakey object
    fakeObject = {};
    fakeObject.first_name = "Anthony";
    fakeObject.last_name = "Weyer";
    fakeObject.email = "antweyer@iu.edu";
    fakeObject.age = 21;

    writeToBq(fakeObject);
}



//call that entry point function
demoCode();


// Create a helper function that writes to BQ
// Function must be asynchronous
async function writeToBq(obj) {
    //BQ expects an arrary of objects, but this function only receives 1
    var rows = []; //Empty array
    rows.push(obj);

    // Insert the array of objects into the 'demo' table
    await bq
    .dataset(datasetId)
    .table(tableId)
    .insert(rows)
    .then( () => {
        rows.forEach ( (row) => { console.log(`Inseerted: ${row}`)})
    })
    .catch( (err)=> { console.error(`ERROR: ${err}`) } )

}