from flask import Flask,render_template
from flask_material import Material 

app = Flask(__name__)
Material(app)

@app.route('/')
def index():
	return 'Hello World Map With Flask'

@app.route('/maps/<string:place>',methods=['GET'])
def mapapi(place):
	return render_template('index.html',place=place)


if __name__ == '__main__':
	app.run(debug=True)