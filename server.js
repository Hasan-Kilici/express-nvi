const express = require("express");
const soap = require("soap");
 
const app = express();

const bodyParser = require("body-parser");
const ejs = require("ejs");

app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
 
app.use(bodyParser.json()).use(
    bodyParser.urlencoded({
      extended: true,
   })
);

app.get("/",(req,res)=> {
    res.render(`${__dirname}/src/index.ejs`)
})

app.post("/tcKimlikIleAra",(req,res)=>{
    let url="https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL";
    let ad, soyad, tc, yil;

    ad = req.body.ad;
    soyad = req.body.soyad;
    tc = Number(req.body.tc);
    yil = Number(req.body.dogumyili);

    let args={
        "TCKimlikNo":req.body.tc,
        "Ad":ad.toUpperCase(),
        "Soyad":soyad.toUpperCase(),
        "DogumYili":req.body.dogumyili
    }
      soap.createClient(url, (err, client)=> {
          client.TCKimlikNoDogrula(args, (err, result)=> {
              res.render(`${__dirname}/src/result.ejs`,{
                    sonuc: result,
              });
          });
      });
})


app.listen(3000);