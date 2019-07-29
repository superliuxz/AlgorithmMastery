# Algorithm Mastery Backend

This is the Django + PostgreSQL backend that serves Algorithm Mastery frontend.

Tested under Python 3.7 and Postgres 10.

## Development
- Install `virtualenv` or `virtualenvwrapper`, and create a virtual environment `algo_mastery`.

- Under virualenv `algo_mastery`, install dependency from `requirements.txt`.

- Under `algo_mastery/settings/`, create a new file `algo_mastery.settings.settings_<YOUR NAME>.py`. Use the template:
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

- You can also run with docker without setting up local dev environment:
  - TODO

## Production
TODO
