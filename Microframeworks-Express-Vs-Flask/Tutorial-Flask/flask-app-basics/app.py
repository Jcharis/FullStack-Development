from flask import Flask,render_template,request,url_for

app = Flask(__name__)

@app.route('/')
def index():
	return "Hello World this is Flask"


if __name__ == '__main__':
	app.run(debug=True)