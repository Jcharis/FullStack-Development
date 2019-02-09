package main

import (
	"github.com/kataras/iris"
)

func main() {
	// Initialize app
	app := iris.New()
	
	// Register Template Engine
	app.RegisterView(iris.HTML("./views", ".html"))

	app.Get("/", func(ctx iris.Context) {
		ctx.View("index.html")
	})

	// Group Routes Under Party
	v1 := app.Party("/v1")
	{
		v1.Get("/login", loginPage)
		v1.Get("/about", aboutPage)
	}
	api := app.Party("/api")
	{
		api.Get("/apipage", apiPage)
		api.Get("/books", booksPage)

	}

	// Run App or Listen on localhost:5000
	app.Run(iris.Addr(":5000"))
}

// Individual Functions for routes
func loginPage(ctx iris.Context) {
	ctx.View("login.html")

}

func aboutPage(ctx iris.Context) {
	ctx.View("about.html")

}

func apiPage(ctx iris.Context) {
	ctx.View("apipage.html")

}

func booksPage(ctx iris.Context) {
	ctx.View("books.html")

}
