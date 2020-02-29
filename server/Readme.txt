Setup variables before launching backend.

> mkdir config
> cd config
> touch default.json

Paste following in default.json

{
    "privateKey": "VerySecretKey",
    "dbUrl": "mongodb://...",
    "port": 3000
}


OR 


Setup Environment variables

> mkdir config
> cd config
> touch custom-environment-variables.json
NOTE: Above json file name should be exactly same

Paste following in custom-environment-variables.json

{
    "privateKey": "SECRET_KEY",
    "dbUrl": "DB_URL",
    "port": "PORT"
}


Setting Environment Variables:
1. Linux/Mac use following commands:
> export PORT=3000
> export SECRET_KEY=VerySecretKey
> export DB_URL=mongodb://user:password@host:port/db_name

2. Windows
> set PORT=3000
> set SECRET_KEY=VerySecretKey
> set DB_URL=mongodb://user:password@host:port/db_name
