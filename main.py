from flask import Flask, redirect, url_for, render_template, jsonify, request
import air_model
import water_model
import land_model

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

@app.route("/dates|<date1>|<date2>|<date3>|<date4>|<id>")
def dates(date1, date2, date3, date4, id):
    return render_template("dates.html", d1=date1, d2=date2, d3=date3, d4=date4, id=id)

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
            year = int(year)

            first = None
            second = None
            third = None
            fourth = None

            # Land
            if selectionMode == "0, 0":
                first = land_model.population(year=year)
                second = land_model.forest_area(year=year)
                third = land_model.urban_population(year=year)
                fourth = land_model.agriculture_area(year=year)

            # Ocean
            if selectionMode == "0, 1":
                first = water_model.population(year=year)
                second = water_model.ocean_temperatures(year=year)
                third = water_model.seawater_carbon(year=year)
                fourth = water_model.ph_scale(year=year)

            # Sky
            if selectionMode == "0, 2":
                first = air_model.population(year=year)
                second = air_model.carbon_dioxide(year=year)
                third = air_model.methane(year=year)
                fourth = air_model.nitrogen_dioxide(year=year)


            dates = [round(first), round(second), round(third), round(fourth)]; # Set this varible to contain any 4 dates ([x, y, z, w])

            return redirect(url_for("dates", date1=dates[0], date2=dates[1], date3=dates[2], date4=dates[3], id=(f"{selectionMode}|{year}")))


        # User inputs ground settings
        if (selectionMode == "1, 0"):

            # Option 1, 2, 3, 4 (pop density, agriculture, forest, urban pop)
            pD = float(request.form["l-i1"])
            aG = float(request.form["l-i2"])
            fR = float(request.form["l-i3"])
            uP = float(request.form["l-i4"])

            pop = land_model.population(value=pD)
            agri = land_model.agriculture_area(value=aG)
            forest = land_model.forest_area(value=fR)
            urban = land_model.urban_population(value=uP)

            dates = [round(pop), round(agri), round(forest), round(urban)]; # Set this varible to contain any 4 dates ([x, y, z, w])

            return redirect(url_for("dates", date1=dates[0], date2=dates[1], date3=dates[2], date4=dates[3], id=(f"{selectionMode}|Land")))

        # User inputs ocean settings
        if (selectionMode == "1, 1"):

            # Option 1, 2, 3, 4 (pop density, temp, PH scl, Sea CO2)
            pD = float(request.form["o-i1"])
            tMP = float(request.form["o-i2"])
            pH = float(request.form["o-i3"])
            CO2 = float(request.form["o-i4"])

            pop = water_model.population(value=pD)
            temp = water_model.ocean_temperatures(value=tMP)
            ph = water_model.ph_scale(value=pH)
            carbon = water_model.seawater_carbon(value=CO2)

            dates = [round(pop), round(temp), round(ph), round(carbon)]; # Set this varible to contain any 4 dates ([x, y, z, w])

            return redirect(url_for("dates", date1=dates[0], date2=dates[1], date3=dates[2], date4=dates[3], id=("{selectionMode}|Sea")))

        # User inputs air settings
        if (selectionMode == "1, 2"):

            # Option 1, 2, 3, 4 (pop density, Nitrous O emm, CO2 emm, Methan emm)
            pD = float(request.form["s-i1"])
            nE = float(request.form["s-i2"])
            cE = float(request.form["s-i3"])
            mE = float(request.form["s-i4"])

            pop = air_model.population(value=pD)
            nox = air_model.nitrogen_dioxide(value=nE)
            carbon = air_model.carbon_dioxide(value=cE)
            methane = air_model.methane(value=mE)

            dates = [round(pop), round(nox), round(carbon), round(methane, 2)]; # Set this varible to contain any 4 dates ([x, y, z, w])

            return redirect(url_for("dates", date1=dates[0], date2=dates[1], date3=dates[2], date4=dates[3], id=("{selectionMode}|Sky")))


        return (f"{selectionMode}")
    else:
        return render_template("environment.html")

if __name__ == "__main__":
    app.run(debug=True)
