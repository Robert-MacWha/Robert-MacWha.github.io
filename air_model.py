#TODO
# - Fix minimum years based on the data set
# - Consider refactoring predict() as a decorator
#!/usr/bin/env python
# coding: utf-8
import numpy as np
import pandas as pd

from sklearn import linear_model

def get_data():
    """
    ret: dataframe df, ndarray years, ndarray ryears
    ryears: reshaped 1D vector to 2D matrix, sklearn requires 2D
    years: used for x-axis
    """
    air_data_path = 'Enviro Lynx Data/AirData.csv'
    df = pd.read_csv(air_data_path)

    # Reuse of x-axis
    years = np.array(df['Year'])
    ryears = years.reshape(-1,1) # Regression model needs a 2D column vector

    return df, years, ryears


def population(year=None, value=None):
    """
    ret: int year, float value
    Value is humans per kilometre squared (based off land surface area)

    """
    df , years, ryears = get_data()
    pass_input = (year, value)
    population_data = np.array(df['Population Density'])
    minimum = int(population_data[-1] + 1) # Minimum value of input

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

def carbon_dioxide(year=None, value=None):
    """
    ret: int year, float value
    Value is CO2 emissions in kilotonnes in a year

    """
    df , years, ryears = get_data()
    carbon = np.array(df['CO2 emissions (kt)'])
    minimum = int(carbon[-1] + 1)

    # Training and fitting
    reg = linear_model.LinearRegression()
    reg.fit(ryears, carbon)

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

def methane(year=None, value=None):
    """
    ret: int year, float value
    Value is methane emissions in kilotonnes in a year

    """
    df , years, ryears = get_data()
    methane_data = np.array(df['Methane emissions (kt)'])
    minimum = int(methane_data[-1] + 1)

    # Training and fitting
    reg = linear_model.LinearRegression()
    reg.fit(ryears, methane_data)

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

def nitrogen_dioxide(year=None, value=None):
    df , years, ryears = get_data()
    nox = np.array(df['Nitrous oxide emissions(kt)'])
    minimum = int(nox[-1] + 1)

    # Training and fitting
    reg = linear_model.LinearRegression()
    reg.fit(ryears, nox)

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
    print(population(value=100, year=2020))
    print(carbon_dioxide(value=832897))
    print(methane(value=21328748))
    print(nitrogen_dioxide(value=3948398))
