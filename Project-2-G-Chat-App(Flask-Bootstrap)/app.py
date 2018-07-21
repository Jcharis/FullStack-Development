from flask import Flask,render_template,url_for,request
from flask_bootstrap import Bootstrap 
from flask_socketio import SocketIO,send,emit
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
Bootstrap(app)
app.config['SECRET_KEY'] = 'mysecretkey'
socketio = SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////static/dbase/chathistory.db'
db = SQLAlchemy(app)


# Model for our Database 
class History(db.Model):
	id = db.Column('id',db.Integer,primary_key=True)
	message = db.Column('message',db.String(500))
	



# @app.route('/')
# def index():
# 	# messages = ['Message 1','Message 2']
# 	messages = History.query.all()
# 	return render_template('index.html',messages=messages)

# @app.route('/home')
# def home():
# 	# messages = ['Message 1','Message 2']
# 	messages = History.query.all()
# 	return render_template('home.html',messages=messages)

 # Socket To Get Message and Add to History.db
@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	# Add message  to DB before sending it
	message = History(message=msg)
	db.session.add(message)
	db.session.commit()

	send(msg,broadcast=True)


@app.route('/')
def index():
  return render_template( './chats.html' )

def messageRecived():
  print( 'message was received!!!' )

@socketio.on( 'my event' )
def handle_my_custom_event( json ):
	print( 'recived my event: ' + str( json ) )
	socketio.emit( 'my response', json, callback=messageRecived )



if __name__ == '__main__':
	socketio.run(app)