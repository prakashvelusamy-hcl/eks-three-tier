# import os
# import boto3
# import json

# def get_secret():
#     secret_name = os.getenv("SECRET_NAME")
#     region_name = os.getenv("AWS_REGION", "us-east-1")

#     client = boto3.client("secretsmanager", region_name=region_name)
#     response = client.get_secret_value(SecretId=secret_name)
#     return json.loads(response['SecretString'])

# secret = get_secret()
# DATABASE_URL = secret["DATABASE_URL"]



# config.py

import os
import boto3
import json

def get_secret():
    secret_name = os.getenv("SECRET_NAME", "rds!db-71168077-35cc-4ad7-97fe-b2b67b9696ae")
    region_name = os.getenv("AWS_REGION", "ap-south-1")

    client = boto3.client("secretsmanager", region_name=region_name)
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])

# Load secrets
secret = get_secret()

DB_USERNAME = secret["username"]
DB_PASSWORD = secret["password"]
DB_HOST = secret["host"]
DB_NAME = secret["dbname"]

SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
