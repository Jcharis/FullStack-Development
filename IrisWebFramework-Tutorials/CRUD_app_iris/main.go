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
}

func main() {

// initialize app
app := iris.New()

app.RegisterView(iris.HTML("./views",".html"))

db, err = gorm.Open("sqlite3", "./gorm.db")
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

	db.Create(&Person{FirstName:firstname, LastName:lastname})

	ctx.ViewData("fname",firstname)
	ctx.View("index.html")	
	})

app.Get("/results", GetProjects)


// Run App or Listen on localhost:5000
app.Run(iris.Addr(":5000"))
	
}

func GetProjects(ctx iris.Context) {
 var people []Person
 if err := db.Find(&people).Error; err != nil {
    ctx.StatusCode(iris.StatusInternalServerError)
    fmt.Println(err)
 } else {
    ctx.JSON(people)
 }}