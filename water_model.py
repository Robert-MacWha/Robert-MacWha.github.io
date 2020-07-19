#!/usr/bin/env python
# coding: utf-8

import numpy as np
import pandas as pd

from sklearn import linear_model

def get_data(year=None, value=None):
    land_data_path = 'Enviro Lynx Data/WaterData.csv'
    df = pd.read_csv(land_data_path)

    # Reuse of x-axis
    years = np.array(df['Year'])
    ryears = years.reshape(-1,1) # Regression model needs a 2D column vector

    return df, years, ryears

def ocean_temperatures(year=None, value=None):
    df, years, ryears = get_data()
    # -999. is invalid value, fill in with filler data
    temp = df['Temp (C)']
    temp = temp.replace(-999., 25)
    ocean_temp = np.array(temp)

    reg = linear_model.LinearRegression()
    reg.fit(ryears, ocean_temp )

    if value and year:
        year = int(((value- reg.intercept_) / reg.coef_)[0])
        value = reg.predict([[year]])[0]
        return year, value
    elif value:
        year = int(((value- reg.intercept_) / reg.coef_)[0])
        return year
    else:
        value = reg.predict([[year]])[0]
        return value



def ph_scale(year=None, value=None):
    df, years, ryears = get_data()
    ph = df['PH scale']
    ph = ph.replace(-999., 8.1)
    ph_data = np.array(ph)

    reg = linear_model.LinearRegression()
    reg.fit(ryears, ph_data)

    if value and year:
        year = int(((value- reg.intercept_) / reg.coef_)[0])
        value = reg.predict([[year]])[0]
        return year, value
    elif value:
        year = int(((value- reg.intercept_) / reg.coef_)[0])
        return year
    else:
        value = reg.predict([[year]])[0]
        return value



def seawater_carbon(year=None, value=None):
    df , years, ryears = get_data()
    seawater = df.iloc[:, 4] # ppm
    seawater = seawater.replace(-999., 330)
    seawater_carbon = np.array(seawater)

    reg = linear_model.LinearRegression()
    reg.fit(ryears, seawater_carbon)

    if value and year:
        year = int(((value- reg.intercept_) / reg.coef_)[0])
        value = reg.predict([[year]])[0]
        return year, value
    elif value:
        year = int(((value- reg.intercept_) / reg.coef_)[0])
        return year
    else:
        value = reg.predict([[year]])[0]
        return value

def population(year=None, value=None):
    """
    ret: int year, float value
    Value is humans per kilometre squared (based off land surface area)

    """
    df , years, ryears = get_data()
    population_data = np.array(df['Population Density'])

    # Training model
    reg = linear_model.LinearRegression()
    reg.fit(ryears, population_data)

    if value and year:
        year = int(((value- reg.intercept_) / reg.coef_)[0]) # Given user specified input value
        value = reg.predict([[year]])[0] # Given user specified year
        return year, value
    elif value:
        year = int(((value- reg.intercept_) / reg.coef_)[0]) # Given user specified input value
        return year
    else:
        value = reg.predict([[year]])[0] # Given user specified year
        return value

if '__name__' == '__main__':
    print(population(year=2020, value=50))
    print(ocean_temperatures(year=20000, value=26.0))
    print(ph_scale(year=2020, value=7))
    print(seawater_carbon(year=2020, value=400))
