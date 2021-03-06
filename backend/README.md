# Algorithm Mastery Backend

This is the Django + PostgreSQL backend that serves Algorithm Mastery frontend.

Tested under Python 3.7 and Postgres 10.

## Development
- Install `virtualenv` or `virtualenvwrapper`, and create a virtual environment `algo_mastery`.

- Under virualenv `algo_mastery`, install dependency from `requirements.txt`.

- Under `algo_mastery/settings/`, create a new file `settings_<YOUR NAME>.py`. Use the template:
  ```python
  from .settings import *
  
  DATABASES['default']['NAME'] = 'algo_mastery'
  DATABASES['default']['USER'] = 'algo_mastery'
  DATABASES['default']['PASSWORD'] = <YOUR PASSWORD>
  DATABASES['default']['HOST'] = 'localhost'
  ``` 
  - This local setting file will not be tracked by version control, and it overwrites database configs from the 
  production setting file.

- Make sure `DJANGO_SETTINGS_MODULE` is set to `algo_mastery.settings.settings_<YOUR NAME>.py`.
  - To make life easier, consider using `autoenv`.
    - Create an `.env` file in the `algo_mastery` directory:
      ```
      export DJANGO_SETTINGS_MODULE=algo_mastery.settings.settings_<YOUR NAME>
      workon algo_mastery
      ```

- Install and setup the database. The default backend is Postgres:
  ```SQL
  createdb -U postgres algorithm_mastery
  createuser -U postgres algorithm_mastery
  psql -U postgres -c "GRANT CONNECT ON DATABASE algorithm_mastery TO algorithm_mastery;" 
  psql -U postgres -c "ALTER USER algorithm_mastery PASSWORD '<password from local setting file>'"
  ```
 
~~- __Important__: after setting up the database, run `python3 manage.py bearer_token create`, and copy the generated 
token to the frontend app's environment.ts file, replace the `accessToken` field.~~

- You can also run with docker without setting up local dev environment:
  1. Configuring the database following the above instructions, and __expose the db to the ethernet__.
      - https://blog.bigbinary.com/2016/01/23/configure-postgresql-to-allow-remote-connection.html can help - basically set up the server to listen to '*' instead of 'localhost'; and accept connections over the ethernet.
  2. Build the image by `docker build . -t algo_backend:latest`.
  3. By default, port 10101 is exposed. Run the container by:
    `docker run -p 10101:10101 -e DJANGO_SETTINGS_MODULE=algo_mastery.settings.settings
    -e DATABASE_NAME=<name of the db> -e DATABASE_USER=<db user> -e DATABASE_PASSWORD=<db password>
    -e DATABASE_HOST=<db host> algo_backend:latest`.

## Production
Follow the instructions in the `README` from the upper directory.
