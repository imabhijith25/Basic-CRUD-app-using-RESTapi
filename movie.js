
  var express = require('express');
  var mysql = require('mysql');
  var cors  = require('cors');
  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json()

  var app = express();
  app.use(cors())
  var urlencodedParser = bodyParser.urlencoded({ extended: false })

  var con = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'admin',
      database:'test'
   
  });

  con.connect((err)=>{
      if(err){
          throw err;
      }
      else{
          console.log('connected');
      }
  })


  app.get("/movies",(req,res)=>{
      con.query('select * from movies;',(err,result,fields)=>{
         
          if(err) throw err;

         
          
            //all movie display
          return res.json(result)
      });

      
    

  })

  app.get("/movies/:id",(req,res)=>{
      con.query(`select * from movies where id = ${req.params.id}`,(err,result,fields)=>{
            if(err) throw err;
            return res.status(200).json(result)
        
      })

  })

  app.post("/movies",jsonParser,(req,res)=>{
      console.log('invoked')
      console.log(req.body)
      var dir =req.body.director
      var name = req.body.name

        var id = parseInt(req.body.id);
        var year = parseInt(req.body.year);
      con.query(`insert into movies (id,name,director,year) values(${id},'${name}','${dir}',${year});`,(err,results,fields)=>{
          if(err) throw err;
          console.log("done")
      });



  })


  app.delete("/movies/:id",jsonParser,(req,res)=>{
        console.log("received")
        console.log(req.body)

        var id = parseInt(req.body.id);

        con.query(`delete from movies where id=${id}`,(err,result,fields)=>{
            if(err) throw err;
            console.log("done");
        });


  })

  app.put('/movies/:id',jsonParser,(req,res)=>{
        var name = req.body.name;
        var director = req.body.director;
        var year = parseInt(req.body.year);
        var id = parseInt(req.body.id);
        
        con.query(`update movies set name='${name}', director = '${director}',year='${year}' where id=${id};`,(err,result,req)=>{
            if (err) throw err;
            console.log('done');
        })
      console.log(req.body);
  })



  app.listen(3000,()=>{
      console.log("Listening to 3000")
  })