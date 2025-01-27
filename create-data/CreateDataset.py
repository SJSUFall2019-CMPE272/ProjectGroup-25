
# coding: utf-8

# In[ ]:

import boto3
import numpy as np
import pandas as pd


# In[ ]:

# import data by ethnicity
ethnicities = pd.read_csv('../data/fr-applicants-by-ethnicity.csv')
ethnicities = ethnicities.rename(columns={'County/State/ Territory': 'County', 'Count': 'Status', 'Uad Uc Ethn 6 Cat': 'Ethnicity', 'Pivot Field Values': 'Count'})
ethnicities = ethnicities[['Status', 'Fall Term', 'County', 'Ethnicity', 'Count']]


# In[ ]:

ethnicities.head()


# In[ ]:

ethnicities.size


# In[ ]:

# import data by gender
genders = pd.read_csv('../data/fr-applicants-by-gender.csv')
genders = genders.rename(columns={'Count': 'Status', 'Pivot Field Values': 'Count', 'County/State/ Territory': 'County'})
genders = genders[['Status', 'Fall Term', 'County', 'Gender', 'Count']]


# In[ ]:

genders.head()


# In[ ]:

genders.size


# In[ ]:

# import data by gpa
gpas = pd.read_csv('../data/fr-applicants-by-gpa.csv')
# filter any rows that do not have a GPA or school
gpas = gpas[pd.notnull(gpas['School Name'])]
gpas = gpas[pd.notnull(gpas['Measure Values'])]
# rename columns
gpas = gpas.rename(columns={'Measure Values': 'GPA', 'School Name': 'School'})
gpas = gpas[['Campus', 'County']]

len(gpas)
# In[ ]:

gpas.head()


# In[ ]:

sat_scores = pd.read_csv('../data/sat-report-2015-2016.csv')
# columns to keep
sat_scores = sat_scores[['AvgScrRead', 'AvgScrMath', 'AvgScrWrit', 'cname']]
# rename for join
sat_scores = sat_scores.rename(columns={'cname': 'County'})
# drop any rows that do not have a school
sat_scores = sat_scores[pd.notnull(sat_scores['County'])]
# convert score cols to ints
sat_scores['AvgScrRead'] = pd.to_numeric(sat_scores['AvgScrRead'], errors=coerce)
sat_scores['AvgScrMath'] = pd.to_numeric(sat_scores['AvgScrMath'], errors=coerce)
sat_scores['AvgScrWrit'] = pd.to_numeric(sat_scores['AvgScrWrit'], errors=coerce)
# drop null cols
sat_scores = sat_scores[pd.notnull(sat_scores['AvgScrRead'])]
sat_scores = sat_scores[pd.notnull(sat_scores['AvgScrMath'])]
sat_scores = sat_scores[pd.notnull(sat_scores['AvgScrWrit'])]
sat_scores = sat_scores.groupby('County').mean().reset_index()
sat_scores.head()


# In[ ]:

len(sat_scores)


# In[ ]:

join_cols = ['County']


# In[ ]:

# output just the categorical data
df1 = ethnicities[['County', 'Ethnicity']].drop_duplicates()
df2 = genders[['County', 'Gender']].drop_duplicates()
df3 = gpas[['County', 'Campus']].drop_duplicates()
result = pd.merge(df1, df2, on=join_cols)
result = pd.merge(result, df3, on=join_cols).drop_duplicates()
result.to_csv('../data/uc-campus-categorical-data.csv')


# In[ ]:

# join the datasets
result = pd.merge(ethnicities, genders, on=join_cols)
result = pd.merge(result, gpas, on=join_cols).drop_duplicates()
result = pd.merge(result, sat_scores, on=join_cols).drop_duplicates()
result.drop_duplicates(inplace=True)


# In[ ]:

result.head()


# In[ ]:

result.size


# In[ ]:

result.describe()


# In[ ]:

# fill these columns in later
result['ACT'] = 0.0


# In[ ]:

result.head().to_csv('../data/sample-data.csv')


# In[ ]:

result.describe()


# In[ ]:

S3 = boto3.client('s3', region_name='eu-central-1')
S3.upload_file('../data/sample-data.csv', 'gosat-data', 'sample-data.csv')

