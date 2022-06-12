

## 1 Install fowllowing packages
   ```shell
    "express": "^4.18.1",
    "mysql2": "^2.3.3",
    "sequelize": "^6.19.2"
   ```

## 2 Create database if you don't have
   run database/databaseScript.sql

## 3 Create test data

run initialDB.sql


## 4 change config to your database
config/config.json
```json
  "development": {
    "username": "root",  // need to change
    "password": "password", // need to change
    "database": "studentInfo_manageDB",  // need to change
    "host": "127.0.0.1",  // need to change
    "dialect": "mysql"
  },
```

database/connection.js
```js
const sequelize = new Sequelize("studentInfo_manageDB", 'root', 'password', {...} // change to your db name, user name, password
```

## 5 run the backend
Go to root directory and run
```
npm run start
```

## 6 test on postman

GET: http://localhost:3001/api/student/3

You should see the following result.
```json
{
    "success": true,
    "data": [
        {
            "name": "Mangan,Mireille",
            "student_id": 647771,
            "first_name": "Mireille",
            "last_name": "Mangan",
            "birth_date": 1997,
            "gender": "male",
            "home_country": "india",
            "email_address": "mmangan1@sample.ca",
            "campus": "regina",
            "program": "Business",
            "degree": "DIPC",
            "year": "3",
            "status": "graduated"
        }
    ]
}
```

