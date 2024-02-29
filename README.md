# roman-numerals

## Objective 
This application helps convert integers to their romal numeral equivalents. For example, the Integer 10 can be represented as 'X' as roman numeral. 
More details and rules about roman numeral conversion can be found in the following article.
https://en.wikipedia.org/wiki/Roman_numerals

## Start application

Before you get started, make sure you have node installed and configured correctly. 

To build, open your terminal and navigate to the `javascript` directory in this project and run `npm install`.

To start your server, run `npm start`.  

Or if you are familiar with docker, run docker application on your machine and then 
run `docker compose up --build` in the directory 'roman-numeral-converter'

Open up your favorite browser and navigate to http://localhost:8080/romannumeral?query=2 will output 

```
{
  "input": "2",
  "output": "II"
}
```

Change the query value in the url to test coversion with other integers.

Or to process a range of integers at once enter the min and max range as follows, http://localhost:8080/romannumeral?min=1&max=10 

```
{
    "conversions":[
        {"input":"1","output":"I"},{"input":"2","output":"II"},{"input":"3","output":"III"},{"input":"4","output":"IV"},{"input":"5","output":"V"},{"input":"6","output":"VI"},{"input":"7","output":"VII"},{"input":"8","output":"VIII"},{"input":"9","output":"IX"},{"input":"10","output":"X"}
    ]
}
```

## Testing

To run unit tests run `npm test`.

## Analytics

To see a basic report of how many requests were converted successully versus the error count, navigate to http://localhost:8080/report 

You will see something like
```
{
  "report": {
    "Successful": 3,
    "TotalRequests": 3,
    "Errors": 0
  }
}
```
