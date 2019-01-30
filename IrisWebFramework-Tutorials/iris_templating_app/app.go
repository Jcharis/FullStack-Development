package main 
import(
"github.com/kataras/iris"
)

func main() {

// initialize app
app := iris.New()

// Using ServeFile
app.Get("/",func(ctx iris.Context){
	ctx.ServeFile("index.html",false)
	})

app.Get("/home",func(ctx iris.Context){
	ctx.ServeFile("views/home.html",false)
	})

// Using Template Engines
// Register the Type of Templating Engine to use
app.RegisterView(iris.HTML("./views",".html"))

app.Get("/homes",func(ctx iris.Context){
	ctx.ViewData("firstname","Jesse")
	ctx.View("home.html")
	})


// Run App or Listen on localhost:5000
app.Run(iris.Addr(":5000"))
	
}