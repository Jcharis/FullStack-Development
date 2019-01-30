package main 
import(
"fmt"
"github.com/kataras/iris"
"github.com/jinzhu/gorm"
 _ "github.com/jinzhu/gorm/dialects/sqlite"
)


var db *gorm.DB
var err error
type Person struct {
 ID uint `json:"id"`
 FirstName string `json:"firstname"`
 LastName string `json:"lastname"`
 Email string `json:"email"`
 DateofBirth string `json:"dateofbirth"`
 City string `json:"city"`
}

func main() {

// initialize app
app := iris.New()

app.RegisterView(iris.HTML("./views",".html"))

db, err = gorm.Open("sqlite3", "./gorm1.db")
 if err != nil {
   fmt.Println(err)
 }
 defer db.Close()

 // Migrate Schema
 db.AutoMigrate(&Person{})

  // Create
 // db.Create(&Person{FirstName: "Jesse", LastName: "JCharis"})

 app.Get("/", func(ctx iris.Context){
 	ctx.View("index.html")
 	})

// app.Get("/",func(ctx iris.Context){
// 	ctx.View("index.html")	
// 	})

app.Post("/process",func(ctx iris.Context){
	firstname := ctx.PostValue("firstname")
	lastname := ctx.PostValue("lastname")
	email := ctx.PostValue("email")
	date := ctx.PostValue("dateofbirth")
	city := ctx.PostValue("city")

	db.Create(&Person{FirstName:firstname, LastName:lastname, Email:email, DateofBirth:date, City:city})

	ctx.ViewData("fname",firstname)
	ctx.View("index.html")	
	})

app.Get("/results", GetProjects)

app.Get("/results/{firstname: string }",func(ctx iris.Context){
	firstname := ctx.Params().Get("firstname")
	var oneresult []Person = db.First(&Person{},firstname) 
	ctx.HTML(oneresult)
	})
// Run App or Listen on localhost:5000
app.Run(iris.Addr(":5000"))
	
}

func GetProjects(ctx iris.Context) {
 var people []Person
 if err := db.Find(&people).Error; err != nil {
    ctx.StatusCode(iris.StatusInternalServerError)
    fmt.Println(err)
 } else {
    // ctx.JSON(people)
    ctx.ViewData("Person",people)
    ctx.View("results.html")
 }}