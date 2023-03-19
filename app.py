from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)

app.config['SECRET_KEY'] = "toasty"

debug = DebugToolbarExtension(app)

boggle_game = Boggle()


# Home route 
@app.route("/")
def game_start():
    """Start Boggle Game."""
    
    board = boggle_game.make_board()
    
    session["board"] = board
    
    return render_template("boggle-game.html", board=board)

# ------------------------------------------------------------------------------------



@app.route('/word-check')
def word_check():
    
    word = request.args["word"]
    board = session['board']
    res = boggle_game.check_valid_word(board, word)
    
    return jsonify({'result': res})