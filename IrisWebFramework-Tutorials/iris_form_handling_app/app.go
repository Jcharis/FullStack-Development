package main 
import(
"github.com/kataras/iris"
)

func main() {

// initialize app
app := iris.New()

app.RegisterView(iris.HTML("./templates",".html"))

app.Get("/",func(ctx iris.Context){
	ctx.View("index.html")	
	})

app.Post("/process",func(ctx iris.Context){
	firstname := ctx.PostValue("firstname")
	// lastname := ctx.PostValue("lastname")
	ctx.ViewData("fname",firstname)
	ctx.View("index.html")	
	})


// Run App or Listen on localhost:5000
app.Run(iris.Addr(":5000"))
	
}