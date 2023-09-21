# Visualisation_Project
## Project Description
### Objectives
This data analyst project examines smoking prevalence across countries and genders by comparing data from 2000 and 2012. It also analyses socioeconomic factors (GDP per capita, unemployment rate, and health expenditure per capita) in 2012 to assess their correlation with smoking rates in each country.

### Data Sources
•	Smoking prevalence data across various countries and genders: Sourced from the Kaggle dataset at https://www.kaggle.com.
•	Socioeconomic data: Retrieved from the World Bank Data repository.

### File Supplied
The Resources folder comprises a sub-folder denoted as "Raw," housing the unprocessed raw data alongside the initial CSV files that serve as the cleaned output derived from this raw data.

### Deliverables
•	Create the smoking_database
•	Create back end with API and Visualization 
•	Create font end with HTML and CSS

### Findings
•	In terms of smoking prevalence based on country, the countries with the highest smoking prevalence(e.g. Denmark, France, Norway) seemed to have a higher GDP per capita and higher Health expenditure than the countries with the lowest smoking prevalence (e.g. Ethiopia, Niger, Liberia)
•	Using a snapshot of smoking prevalence in countries in the year 2000 compared to the year 2012, the countries with the most significant decline in smoking prevalence(e.g. Denmark, Iceland, Norway) seemed to have higher GDP per capita and higher Health expenditure in comparison to countries which had no decrease or even an increase in smoking prevalence(e.g. Portugal, Greece, Lithuania) during that time, with these countries having a higher rate of unemployment 
•	In terms of smoking prevalence between males and females across the world, females seemed to have higher smoking prevalence ranges from 50%-64% in some countries(e.g. Kiribati, South Korea, Armenia), whereas, for males, the highest smoking prevalence rates were from 35%-49%(e.g. Kiribati, Greece, Papua New Guinea). Conversely, the lowest smoking prevalence between males and females was practically identical ~2%-6%
•	In terms of the countries with the highest smoking prevalence in both genders, they were practically identical in both (e.g. Oceanic countries, Eastern European countries), and the same can be said with the lowest smoking prevalence(e.g. Sub-Saharan African countries)
•	Also, with a snapshot of smoking prevalence between countries and genders in the year 2000 compared to 2012, the same trends were seen in both genders, with the most significant decline in smoking countries having higher GDP per capita and higher health expenditure. Furthermore, there was no clear  correlation seen between the countries, with no decrease or even an increase in smoking prevalence and any of the socioeconomic factors analyzed

### Limitations
•	A lot countries in our database did have null values regarding the socio-economic factors we chose to analyse (GDP per capita, Unemployment, Health Expenditure). Therefore, they were removed when certain elements were anal,used and null values were encountered
•	Our dataset for smoking prevalence by country and gender only had data until 2012. Therefore, we only used a snapshot of the socio-economic factors for that year to keep the data consistent, but on the other hand, we were missing quite a large chunk of data more relevant to this day and age.

### Technologies
•	Python
•	Jupyter Notebook
•	Pandas
•	Regular Expressions
•	Numpy
•	Json
•	SQLite
•	HTML
•	CSS
•	Flask
•	SQLalchemy

### Getting Started
•	Clone this repo to your machine.
•	Run all cleaning code files to clean raw files or update cleaned csv files
•	Run Creating Smoking_database code.ipynb in Jupyter Notebook to create smoking_database with SQlite. 
•	Reflect SQLite database to Jupyter Notebook to identify tables and also do some analysis on the data in terms of smoking prevalence per country and gender 
•	Reflect SQLite database and connect it through Flask via SQLalchemy to create three APIs: /pop_gender, /socioeconomic and /2012_socioeconomic 
•	Run code for visualization and HTML

### Disclaimer:
This project has been developed by students as part of a university assignment and is not intended for official or authoritative purposes.

### Contributors
Giang Nguyen, Manasa Uppalapati, Tamika Josiah, Jorge Chicas

