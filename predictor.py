#!/usr/bin/env python
# coding: utf-8

def predict(data, model):
    """
    ret: int year, float value
    Finds the year when a given parameter will be reacher
    Finds the value of an environmental issue at a given year
    """
    minimum = int(data[-1] + 1)
    find_year_inp = float(input(f'Enter a value greater than {minimum}\n'))
    find_val_inp = int(input(f'Enter a year greater than 2019\n'))

    # Only allows for future predictions
    try:
        assert find_year_inp > minimum
    except:
        print(f'Please enter a value larger than {minimum}')
        find_year_inp = float(input(f'Enter a value greater than {minimum}\n'))

    try:
        assert find_val_inp >= 2020
    except:
        print(f'Please enter a year larger than 2019')
        find_val_inp = int(input(f'Enter a year greater than 2019\n'))

    year = int(((find_year_inp - model.intercept_) / model.coef_)[0]) # Given user specified input value
    value = model.predict([[find_val_inp]])[0] # Given user specified year

    return year, value
