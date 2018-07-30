from flask import Flask,render_template,request,jsonify

app = Flask(__name__)

booklist = [{'name':'Secure','author':'John Smith'},
{'name':'PythonDataAnalysis','author':'Wes Mckinney'},
{'name':'Rework','author':'Hannermierh'},
{'name':'SoftwareMastery','author':'John Somers'},
{'name':'ZerotoOne','author':'Peter Tiel'},
{'name':'Deepwork','author':'Cal Newport'},

]

@app.route('/')
def index():
	return "Hello World"


@app.route('/test')
def test():
	return jsonify({'message':'Rest Api Get'})

# Get all books
@app.route('/books',methods=['GET'])
def getallbooks():
	return jsonify({'book':booklist})



@app.route('/books/<string:name>',methods=['GET'])
def getonebooks(name):
	books = [book for book in booklist if book['name'] == name]
	return jsonify({'book':books[0]})


# Post via Postman
@app.route('/books',methods=['POST'])
def addbook():
	book = {'name':request.json['name'],'author':request.json['author']}
	booklist.append(book)
	return jsonify({'books':booklist})

# Updating with PUT
@app.route('/books/<string:name>',methods=['PUT'])
def updatebook(name):
	books = [book for book in booklist if book['name'] == name]
	books[0]['name'] = request.json['name']
	return jsonify({'books':booklist})

# Delete
@app.route('/books/<string:name>',methods=['DELETE'])
def removebook(name):
	books = [book for book in booklist if book['name'] == name]
	booklist.remove([books[0]])
	return jsonify({'books':booklist})


if __name__ == '__main__':
	app.run(debug=True)