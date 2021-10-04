const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const firebase = require("./firebase");
const db = firebase.firestore();

app.set('view_engine', 'ejs')

app.get('/', async (req, res) => {

    const allData = await new Promise(async (resolve, reject) => {
        resolve(await db.listCollections().then(async collections => {
            return await Promise.all(collections.map(async collection => {
                let marker = await collection.get().then(async querySnapshot => {
                    return querySnapshot.docs.map(doc => {
                        return ([doc.data(), doc.id]);
                    })
                })
                return [await marker, collection.id];
            }));
        }));
    }).then(async resolve => {
        return resolve;
    })
    res.render('index.ejs', { data: await allData })
    console.log(await allData)
});


app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.