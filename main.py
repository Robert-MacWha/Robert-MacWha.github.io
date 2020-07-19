from flask import Flask, redirect, url_for, render_template, jsonify, request

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/environment", methods=["POST", "GET"])
def environment():
    if request.method == "POST":
        selectionMode = request.form["env"]

        # User inputs starting year
        if (selectionMode == "0, 0" or 
            selectionMode == "0, 1" or 
            selectionMode == "0, 2"):

            # User inputed year
            year = request.form["y-i1"]
            return (f"{year}")

        # User inputs ground settings
        if (selectionMode == "1, 0"):

            # Option 1, 2, 3, 4 (pop density, agriculture, forest, urban pop)
            pD = request.form["l-i1"]
            aG = request.form["l-i2"]
            fR = request.form["l-i3"]
            uP = request.form["l-i4"]
            return (f"{pD} + {aG} + {fR} + {uP}")

        # User inputs ocean settings
        if (selectionMode == "1, 1"):

            # Option 1, 2, 3, 4 (pop density, temp, PH scl, Sea CO2)
            pD = request.form["o-i1"]
            tMP = request.form["o-i2"]
            pH = request.form["o-i3"]
            CO2 = request.form["o-i4"]
            return (f"{pD} + {tMP} + {pH} + {CO2}")

        # User inputs air settings
        if (selectionMode == "1, 2"):

            # Option 1, 2, 3, 4 (pop density, Nitrous O emm, CO2 emm, Methan emm)
            pD = request.form["s-i1"]
            nE = request.form["s-i2"]
            cE = request.form["s-i3"]
            mE = request.form["s-i4"]
            return (f"{pD} + {nE} + {cE} + {mE}")


        return (f"{selectionMode}")
    else:
        return render_template("environment.html")

if __name__ == "__main__":
    app.run(debug=True)