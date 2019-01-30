package main 
import(
"github.com/kataras/iris"
)

func main() {

// initialize app
app := iris.New()

app.Get("/",func(ctx iris.Context){
	ctx.WriteString("Hello Iris Web App")
	})

app.Handle("GET","/index",func(ctx iris.Context){
	ctx.HTML("Hello World this is using Handle function")
	})

app.Get("/api",func(ctx iris.Context) {
	ctx.JSON(iris.Map{"book":"Learn Go Programming"})
	
})

// Run App or Listen on localhost:5000
app.Run(iris.Addr(":5000"))
	
}