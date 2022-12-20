const express = require("express")
const mysql = require("mysql")
const app = express()
const session = require('express-session');
const config = require("./db/database")
let connection = mysql.createConnection(config);


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/images', express.static(process.cwd() + '/images'))


app.set("view engine", 'ejs')

app.use(express.urlencoded({ extended : false}))

app.get("/",(req,res)=>{
	if (req.session.admin){
		console.log("admin zalogowany")
		connection.query("SELECT * FROM produkty",(err,result)=>{
			console.log(result)
		res.render("homepage",{data:true,name:req.session.username,products:result,admin:true})
	})

	}
	if(req.session.logged && req.session.admin ==false){
		console.log("uzytkownik zweryfikowany")
		connection.query("SELECT * FROM produkty",(err,result)=>{
			console.log(result)
			res.render("homepage",{data:true,name:req.session.username,products:result,admin:false})

		})


	}else{
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
	let login = req.body.login
	let password = req.body.password
	console.log(login)
	console.log(password)

	connection.query("SELECT * FROM users_data WHERE login=? AND password=?",[login,password],(err,result)=>{
		if (result.length > 0 && login == "admin"){
			req.session.admin = true;
			req.session.logged = true;
			req.session.username = login;
			res.redirect("/")

		}
		else if(result.length > 0 && login != "admin"){
			console.log("udane logowanie")
			req.session.logged = true;
			req.session.username = login;
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
app.listen(8000)