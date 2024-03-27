from flask import Flask, jsonify, request
from flask_cors import CORS 
import speech_recognition as sr
import pyttsx3
import spacy

app = Flask(__name__)
CORS(app)
r = sr.Recognizer()


@app.route("/api/record-sound", methods=["POST"])
def capture_voice():
    try:
        with sr.Microphone() as source:
            print("Listening..")
            r.adjust_for_ambient_noise(source, duration=0.2)
            audio = r.listen(source)
            text = r.recognize_google(audio)
            #print(text)
            return jsonify({'text': text}) , 200
    except Exception as e:
        print('yes')
        return jsonify({'error': str(e)}), 500

@app.route("/api/query")
def commands():
    try:
        user_id = request.args.get('userid')
        statement = request.args.get('audiotext')
        print(statement)
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(statement)
        st = " ".join(token.text for token in doc if token.pos_ != "DET")
        doc = nlp(st)
        action , item = [] , []
        item_location = ""
        
                    
        for i in range(len(doc)):
            if doc[i].pos_ == "VERB":
                action.append(doc[i].text)
            # print(doc[i].text, doc[i].pos_, doc[i].dep_)

        if action[0] in ["find", "search"]:
            it = []
            for token in doc:
                if token.pos_ == "NOUN":
                    it.append(token.text)
            item.append(" ".join(it))
            
        elif action[0] in ["delete", "remove"]:
            it = []
            for token in doc:
                if token.pos_ == "NOUN":
                    it.append(token.text)
            item.append(" ".join(it))

        elif action[0] in ["update"]:
            i = 0
            while i < len(doc) - 1:
                if doc[i].dep_ == "prep":
                    break
                i += 1
            item.append(doc[i + 1].text)
            i += 3
            for i in range(i, len(doc)):
                item_location += doc[i].text + " "
        elif action[0] in ["kept", "placed", "stored", "store", "add"]:
            it = ""
            i = 0
            while i < len(doc) - 1:
                if doc[i].dep_ == "prep":
                    break
                if doc[i].pos_ == "ADJ":
                    it += doc[i].text + " "
                if doc[i].pos_ == "NOUN":
                    loc = i
                    while doc[loc].dep_ != "prep" and loc < len(doc):
                        if doc[loc].dep_ == "cc":
                            it = it.rstrip(it[-1])
                            item.append(it)
                            it = ""
                        else:
                            it += doc[loc].text + " "
                        loc += 1
                    i = loc
                    it = it.rstrip(it[-1])
                    item.append(it)
                else:
                    i += 1
            while i < len(doc) :
                item_location += doc[i].text + " "
                i += 1
            print (item, action, item_location)
            # check = False
            # for i in range(len(doc)):
            #     if not check:
            #         if doc[i].dep_ == "prep":
            #             check = True
            #             item_location += doc[i].text
            #     else:
            #         item_location += " " + doc[i].text
        
        else:
            return jsonify({'query' : 'invalid'}) , 200
        query =  change_to_query(action[0] , item , item_location , user_id)
        print(query)
        return jsonify({'query' : query}) , 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def change_to_query(action, item, item_location , user_id):
    if action in ["find", "search"]:
        for i in item:
            return (
                f"SELECT location FROM Items WHERE name = '{i}' AND uid = {user_id}"
            )
    elif action in ["delete", "remove"]:
        for i in item:
            return (f"DELETE FROM Items WHERE name = '{i}' AND uid = {user_id}")
    elif action in ["kept", "placed", "stored", "store"]:
        for i in item:
            return (f"INSERT INTO Items (uid, name, location) VALUES ( {user_id} , '{i}' , '{item_location}' )")
    elif action in ["update"]:
        for i in item:
            return (
                f"UPDATE Items SET location = {item_location} WHERE name = {i} AND uid = {user_id}"
            )

@app.route('/api/voice-output')
def text_to_voice():
    command = request.args.get('command')
    engine = pyttsx3.init()
    engine.setProperty('rate', 120);
    engine.say(command)
    engine.runAndWait()
    return jsonify({'text': command}) , 200

if __name__ == "__main__":
    app.run(debug=True)
