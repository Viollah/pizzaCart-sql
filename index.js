const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
let Factory = require('./app');
const pizzaCart = Factory();


// import sqlite modules
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// enable the static folder...
app.use(express.static('public'));
//
app.get('/',function(req,res){
	let totals = pizzaCart.getTotals();
	let quantities = pizzaCart.getQuantities();
	let hiddenBtn = pizzaCart.getHiddenBtn();
	
   
	   res.render('index', {
		   totals,
		   quantities,
		   hiddenBtn
	   })
   
   });

// add more middleware to allow for templating support
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// database setup starts here
open({
	filename: './pizzaTable.db',
	driver: sqlite3.Database
}).then(async function (db)  {

	// only setup the routes once the database connection has been established

	await db.migrate();
	app.get('/', async function (req, res) {
		const pizzaTable= await db.all('SELECT * FROM pizzaTable').then(function(pizzaTable){
			// console.log(pizzaTable);
		
			res.render('index',{
				// checkOut
				pizzaTable
				
			});

		})
		
		
	});

	// let counter = 0;

	// app.get('/', async function (req, res) {
        
	// 	  const counter = await db.get('select * from counter');

	// 	res.render('index', {
	// 		counter: counter ? counter.count : 0,
	// 		total:'147'
	// 	});
	// });
	//
	
	app.get('/checkOut/:total',function(req,res){
		
		console.log(req.params);
		res.redirect('/checkOut')
	   });
	   app.get('/checkOut',async function(req,res){
		//    let orders =[];
		   const orderData= await db.all('SELECT * FROM pizzaTable')
		  
            // orders.push(orderData)
		    console.log(orderData)
		    res.render('checkOut', {
			order:orderData,

		   }
		    );
			
		
	   });
	   //

  app.post('/count', async function (req, res) {

		try {
			
			console.log(req.body);

			const action = req.body.action;

			if (action === 'Press button to count') {

				const result = await db.get('select count(*) as count from counter');
				if (result.count === 0) {
					await db.run('insert into counter(count) values (?)', 1)
				} else {
					await db.exec('update counter set count = count + 1');
				}

			} else if (action === 'Reset the counter') {

				await db.exec('delete from counter');

			} 

		} catch (err) {
			console.log(err);
		}

		res.redirect('/')
	});
// 
	app.get('/buy-small', function(req,res){
		pizzaCart.buySmall();
	   
		res.redirect('/');
		 
	   });
	   app.get('/buy-medium', function(req,res){
		   pizzaCart.buyMedium();
		  
		   res.redirect('/');
			
		  });
		  app.get('/buy-large', function(req,res){
		   pizzaCart.buyLarge();
		  
		   res.redirect('/');
			
		  });
		  app.get('/remove-small', function(req,res){
		   pizzaCart.removeSmall();
		  
		   res.redirect('/');
			
		  });
		  app.get('/remove-medium', function(req,res){
		   pizzaCart.removeMedium();
		  
		   res.redirect('/');
			
		  });
		  app.get('/remove-large', function(req,res){
		   pizzaCart.removeLarge();
		  
		   res.redirect('/');
			
		  });
		  //
		  
          app.get('/BtnClicked',function(req,res){
			factoryFunction.BtnClicked(event.target.dataset.size);
			res.redirect('/')
		  })

		 
		   app.get('/pay',function(req,res){
            var paymentAmt = Number(payAmt.value);

			message.innerHTML = "Enjoy your Pizza!";
			checkOut.classList.remove('hidden');
			factoryFunction.resetCart();
			
			message.innerHTML = "Enjoy your Pizza, here's your change R" + factoryFunction.change(paymentAmt);
           factoryFunction.resetCart();
            checkOut.classList.toggle('hidden');
			res.redirect('/')
		   });


    
	// start  the server and start listening for HTTP request on the PORT number specified...
	app.listen(PORT, function () {
		console.log(`App started on port ${PORT}`)
	});

});


