from flask import Flask,render_template,request,url_for
from flask_uploads import UploadSet,configure_uploads,IMAGES,DATA,ALL
import os

from werkzeug import secure_filename
app = Flask(__name__)

# Configuration for File Uploads
files = UploadSet('files',ALL)
app.config['UPLOADED_FILES_DEST'] = 'static/uploadsDB'
configure_uploads(app,files)



@app.route('/')
def index():
	return render_template('index.html')


@app.route('/upload',methods=['GET','POST'])
def upload():
	if request.method == 'POST' and 'myfile' in request.files:
		file = request.files['myfile']
		filename = secure_filename(file.filename)
		files.save(os.path.join('static/uploadstorage',filename))
		return filename
	return render_template('details.html',filename=filename)


if __name__ == '__main__':
	app.run(debug=True)