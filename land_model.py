# TODO
# - Find a way to stop reuse of the get_data function
# - Make sure polynomial function works
#!/usr/bin/env python
# coding: utf-8

import numpy as np
import pandas as pd

from sklearn import linear_model
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline


def get_data():
    land_data_path = 'Enviro Lynx Data/GroundData.csv'
    df = pd.read_csv(land_data_path)

    # Reuse of x-axis
    years = np.array(df['Year'])
    ryears = years.reshape(-1,1) # Regression model needs a 2D column vector

    return df, years, ryears


def forest_area(year=None, value=None):
    df, years, ryears = get_data()
    forest_area = np.array(df['Forest Area(sq . Km)'])

    # Model
    reg = linear_model.LinearRegression()
    reg.fit(ryears, forest_area)

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


def urban_population(year=None, value=None):
    df, years, ryears = get_data()
    urban_population = np.array(df['Urban Population(people)'])

    # Polynomial model
    #poly_model = PolynomialFeatures(3)
    #model = make_pipeline(poly_model, linear_model.Ridge())
    #model.fit(ryears, urban_population)

    # Linear
    reg = linear_model.LinearRegression()
    reg.fit(ryears, urban_population)


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


def agriculture_area(year=None, value=None):
    df , years, ryears = get_data()
    agriculture = np.array(df['World Agriculture Area(%)'])

    # Linear model, restricting to most recent results
    # Very large drop starting in 2018
    restricted_agri = agriculture[-10:]
    reg = linear_model.LinearRegression()
    reg.fit(ryears[-10:], restricted_agri)

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


# Find a way to reuse
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
    print(forest_area(year=2020, value=39899))
    #print(urban_population()) 
    print(agriculture_area(year=2018, value=20))
    print(population(year=2030, value=298298))
