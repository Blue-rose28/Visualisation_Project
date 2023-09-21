#import dependencies
import sqlalchemy

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

#Create engine to database
engine=create_engine("sqlite:///smoking_database.sqlite")

# Reflect Database into new model
Base = automap_base()

#Reflect the tables
Base.prepare(engine,reflect=True)

#Reference to tables
smoke=Base.classes.master

#Flask setup
app = Flask(__name__)

#Flask routes

#List of routes
@app.route("/")
def home():
    return(
        f"Available Routes:<br/>"
        f"/api/v1.0/pop_gender<br/>"
        f"/api/v1.0/socioeconomic<br/>"
        f"/api/v1.0/2012_socioeconomic<br/>"
    )

#List of smoking data for each country based on year and gender

@app.route("/api/v1.0/pop_gender")
def smoke_pop_gender():

    session=Session(engine)

    results=session.query(smoke.CountryName, smoke.Year,smoke.PercentageMale,smoke.PercentageFemale,smoke.PercentageTotal).all()
    
    session.close()
    
    all_smoking_data=[]

    for CountryName, Year, PercentageMale,PercentageFemale, PercentageTotal in results:
        smoking_dict={}
        smoking_dict["Country"]=CountryName
        smoking_dict["Year"]=Year
        smoking_dict["Percentage Males"]=PercentageMale
        smoking_dict["Percentage Females"]=PercentageFemale
        smoking_dict["Percentage Total"]=PercentageTotal
        all_smoking_data.append(smoking_dict)

    return jsonify(all_smoking_data)

#List of smoking data and socio economic factors of each country

@app.route("/api/v1.0/socioeconomic")
def smoke_socioeconomic():

    session=Session(engine)

    results=session.query(smoke.CountryName, smoke.Year,smoke.PercentageTotal,smoke.GDPPerCapita,smoke.Unemployment,smoke.HealthExpenditure).all()

    session.close()
    
    all_socio_data=[]

    for CountryName, Year, PercentageTotal, GDPPerCapita, Unemployment, HealthExpenditure in results:
        socio_dict={}
        socio_dict["Country"]=CountryName
        socio_dict["Year"]=Year
        socio_dict["Percentage Total"]=PercentageTotal
        socio_dict["GDP per capita"]=GDPPerCapita
        socio_dict["Unemployment"]=Unemployment
        socio_dict["Health Expenditure"]=HealthExpenditure
        all_socio_data.append(socio_dict)

    return jsonify(all_socio_data)

#List of smoking data and socio economic factors of each country for year 2012

@app.route("/api/v1.0/2012_socioeconomic")
def year_socioeconomic():

    session=Session(engine)

    results=session.query(smoke.CountryName, smoke.Year,smoke.PercentageTotal,smoke.GDPPerCapita,smoke.Unemployment,smoke.HealthExpenditure).\
        filter(smoke.Year==2012).all()
    
    session.close()

    year_socio_data=[]

    for CountryName, Year, PercentageTotal, GDPPerCapita, Unemployment, HealthExpenditure in results:
        yr_socio_dict={}
        yr_socio_dict["Country"]=CountryName
        yr_socio_dict["Year"]=Year
        yr_socio_dict["Percentage Total"]=PercentageTotal
        yr_socio_dict["GDP per capita"]=GDPPerCapita
        yr_socio_dict["Unemployment"]=Unemployment
        yr_socio_dict["Health Expenditure"]=HealthExpenditure
        year_socio_data.append(yr_socio_dict)

    return jsonify(year_socio_data)

  
if __name__ == "__main__":
    app.run(debug=True)

