from flask import Flask,render_template,request,url_for

app = Flask(__name__)

@app.route('/')
def index():
	return "Hello World this is Flask"


#Templating
@app.route('/about')
def about():
	return render_template("about.html")

# Adding Params
@app.route('/articles/<name>')
def articles(name):
	return render_template("articles.html",name=name)

# Adding More URL Covert Params
@app.route('/apiroute/<int:mynum>')
def apiroute(mynum):
	return 'The request was:' + str(mynum)

@app.route('/stringroute/<string:mystring>')
def stringroute(mystring):
	return 'The request was:' + mystring


@app.route('/pathroute/<path:mypath>')
def pathroute(mypath):
	return 'The path was:' + mypath




if __name__ == '__main__':
	app.run(debug=True)