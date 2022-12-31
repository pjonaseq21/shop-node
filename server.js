const express = require("express")
const mysql = require("mysql")
const app = express()
const session = require('express-session');
const config = require("./db/database")
let connection = mysql.createConnection(config);
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const { json } = require("body-parser");
const multer  = require('multer')
const upload = multer({ dest: '/images' })

app.use(express.static(__dirname+'/images'));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

const sleep = ms => new Promise(r => setTimeout(r, ms));


app.use('/images', express.static(process.cwd() + '/images'))


app.set("view engine", 'ejs')

app.use(express.urlencoded({ extended : false}))
app.get("/",(req,res)=>{
	if (req.session.admin){
		console.log(req.session)

		connection.query("SELECT * FROM produkty",(err,result)=>{
		res.render("homepage",{data:true,name:req.session.username,products:result,admin:true,cart: req.session.shoppingCart.length})
	})

	}
	else if(req.session.logged && req.session.admin ==false){
		console.log(req.session)


		connection.query("SELECT * FROM produkty",(err,result)=>{
			res.render("homepage",{data:true,name:req.session.username,products:result,admin:false,cart:req.session.shoppingCart.length})

		})


	}else{
		console.log(req.session)


		connection.query("SELECT * FROM produkty",(err,result)=>{
		res.render("homepage",{data:false,products:result})
		})
	}
	
})
app.get("/przedtreningowki",(req,res)=>{
	connection.query("SELECT * FROM shop_products",(req,res)=>{

		console.log(res)
	})
})
app.get("/login",(req,res)=>{
	console.log(req.body)
	res.render("login")
})
app.post("/login",(req,res)=>{
	console.log(req.body)
	let login = req.body.login
	let password = req.body.password


	connection.query("SELECT * FROM users_data WHERE login=? AND password=?",[login,password],(err,result)=>{
		if (result.length > 0 && login == "admin"){
			req.session.admin = true;
			req.session.logged = true;
			req.session.shoppingCart = []
			req.session.username = login;

			res.redirect("/")

		}
		else if(result.length > 0 && login != "admin"){
			console.log("udane logowanie")
			req.session.logged = true;
			req.session.username = login;
			req.session.shoppingCart = []

			req.session.admin = false;
			res.redirect("/")
		}
		else{
			res.redirect("/login")
		}

	})

})
app.get("/admin",(req,res)=>{
	if (req.session.admin ==true){
		res.render("admin")
	}
	else(res.redirect("/404"))
})
app.get("/404",(req,res)=>{
	res.render("error404")
})
app.post("/addproducttodb",upload.single('file'),(req,res,err)=>{
	console.log(req.file)
	let data = req.body
	console.log(data)
	if(err){
		console.log(err)
	}
	res.redirect("admin")
})
app.post("/addproduct",(req,res)=>{
	let data = req.body
	// req.session.shoppingCart
	
		req.session.shoppingCart.push(data)

	res.redirect("/")

	
})
app.get("/logout",(req,res)=>{
	req.session.destroy()
	res.redirect("/")
})
app.get("/cart",(req,res)=>{
	if (req.session.logged != true){
		return res.redirect("/")
	}
	let arr = []
	for(i=0;i<req.session.shoppingCart.length;i++){
		arr.push('"' + req.session.shoppingCart[i].product_name + '"')
	}
	connection.query(`SELECT * FROM produkty WHERE name IN (${arr})`,(err,result)=>{
		const productCounts = {};

		let productsArray = result
		for (const info of productsArray){
			info.count = 1
		}
		const products = req.session.shoppingCart
		for (const product of products) {
			if (productCounts[product.product_name]) {
				productCounts[product.product_name]++;
				for (const info of productsArray){
					if (info.name == product.product_name){
						info.count += 1
					}
				}
				
				
				} else {
				productCounts[product.product_name] = 1;
				}
				
				}

				console.log(productsArray)
			

	 
		res.render("cart",{data:true,name:req.session.username,cart_products: result,test: req.session.shoppingCart,count:productCounts})
	}
	)
})
app.listen(8000)