import spacy
import speech_recognition as sr
import pyttsx3

r = sr.Recognizer()


def capture_voice():
    with sr.Microphone() as source:
        print("Listening..")
        r.adjust_for_ambient_noise(source, duration=0.2)
        audio = r.listen(source)
    return audio


def voice_to_text(audio):
    try:
        text = r.recognize_google(audio)
        print("You said: " + text)
    except sr.UnknownValueError:
        text = ""
        print("Sorry, I didn't understand that.")
    except sr.RequestError as e:
        text = ""
        print("Error; {0}".format(e))
    return text


def text_to_voice(command):
    engine = pyttsx3.init()
    engine.say(command)
    engine.runAndWait()


def commands(statement):
    nlp = spacy.load("en_core_web_sm")

    doc = nlp(statement)

    st = " ".join(token.text for token in doc if token.pos_ != "DET")

    doc = nlp(st)
    action = []
    item = []
    item_location = ""
    # print(doc)
    for i in range(len(doc)):
        if doc[i].pos_ == "VERB":
            action.append(doc[i].text)

    if action[0] in ["find", "search"]:
        it = []
        for token in doc:
            if token.pos_ == "NOUN":
                it.append(token.text)
        item.append(" ".join(it))
        change_to_query(action[0], item, item_location)

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
    elif action[0] in ["kept", "placed", "stored", "store"]:
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
                        item.append(it)
                        it = ""
                    else:
                        it += doc[loc].text + " "
                    loc += 1
                i = loc
                item.append(it)
            else:
                i += 1

        check = False
        for i in range(len(doc)):
            if not check:
                if doc[i].dep_ == "prep":
                    check = True
                    item_location += doc[i].text
            else:
                item_location += " " + doc[i].text

    print("Action : ", action)
    print("Items : ", item)
    print("Location : ", item_location)


def change_to_query(action, item, item_location):
    if action in ["find", "search"]:
        for i in item:
            print(
                f"SELECT location FROM Items WHERE name = '{i}' AND uid = {}"
            )
    elif action in ["delete", "remove"]:
        for i in item:
            print(f"DELETE FROM Items WHERE name = '{i}' AND uid = {}")
    elif action[0] in ["kept", "placed", "stored", "store"]:
        for i in item:
            print(f"INSERT INTO Items(name , location) VALUES ({i} , {item_location})")
    elif action[0] in ["update"]:
        for i in item:
            print(
                f"UPDATE Items SET location = {item_location} WHERE name = {i} AND uid = {}"
            )


# commands("update location of charger to bedbox")


def main():
    end_program = False
    while not end_program:
        audio = capture_voice()
        text = voice_to_text(audio)
        commands(text)
        end_program = True


if __name__ == "__main__":
    main()
