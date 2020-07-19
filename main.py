from flask import Flask, redirect, url_for, render_template, jsonify, request

template_graphSet = [
    (0, 1),
    (10, 20),
    (2, 30),
    (30, 40),
    (4, 50),
    (50, 60),
    (6, 70)
]

template_dates = [
    100,
    222,
    345,
    432
]


app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/graph<svg>")
def graph(svg):
    # Find the max x/y values
    max_x = 0
    min_x = 2147483647
    max_y = 0
    min_y = 2147483647
    for j in range(len(template_graphSet)):
        #Max/min-x
        if (template_graphSet[j][1] > max_x):
            max_x=template_graphSet[j][1]
        if (template_graphSet[j][1] < min_x):
            min_x = template_graphSet[j][1]

        # Max/min-y
        if (template_graphSet[j][0] > max_y):
            max_y=template_graphSet[j][0]
        if (template_graphSet[j][0] < min_y):
            min_y = template_graphSet[j][0]

    # Generate the content for an svg element from the given data
    content = f"<svg class='graph'> <polyline fill='none' stroke='#5cace2' stroke-width='3' points='"

    for i in range(len(template_graphSet)):
        content += f"{(template_graphSet[i][1])}, {(template_graphSet[i][0] * -1) + max_y} "

    content += "'/>"

    return render_template("graph.html", svgInfo=content)

@app.route("/dates/<date1>/<date2>/<date3>/<date4>")
def dates(date1, date2, date3, date4):
    return render_template("dates.html", d1=date1, d2=date2, d3=date3, d4=date4)

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

            return redirect(url_for("graph", svg="This will be an svg element"))

        # User inputs ground settings
        if (selectionMode == "1, 0"):

            # Option 1, 2, 3, 4 (pop density, agriculture, forest, urban pop)
            pD = request.form["l-i1"]
            aG = request.form["l-i2"]
            fR = request.form["l-i3"]
            uP = request.form["l-i4"]

            dates = [100, 200, 300, 400]; # Set this varible to contain any 4 dates ([x, y, z, w])

            return redirect(url_for("dates", date1=dates[0], date2=dates[1], date3=dates[2], date4=dates[3]))

        # User inputs ocean settings
        if (selectionMode == "1, 1"):

            # Option 1, 2, 3, 4 (pop density, temp, PH scl, Sea CO2)
            pD = request.form["o-i1"]
            tMP = request.form["o-i2"]
            pH = request.form["o-i3"]
            CO2 = request.form["o-i4"]

            dates = template_dates; # Set this varible to contain any 4 dates ([x, y, z, w])

            return redirect(url_for("dates", date1=dates[0], date2=dates[1], date3=dates[2], date4=dates[3]))

        # User inputs air settings
        if (selectionMode == "1, 2"):

            # Option 1, 2, 3, 4 (pop density, Nitrous O emm, CO2 emm, Methan emm)
            pD = request.form["s-i1"]
            nE = request.form["s-i2"]
            cE = request.form["s-i3"]
            mE = request.form["s-i4"]

            dates = template_dates; # Set this varible to contain any 4 dates ([x, y, z, w])

            return redirect(url_for("dates", date1=dates[0], date2=dates[1], date3=dates[2], date4=dates[3]))


        return (f"{selectionMode}")
    else:
        return render_template("environment.html")

if __name__ == "__main__":
    app.run(debug=True)