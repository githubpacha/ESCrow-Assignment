# Assignment 1
### Task
* To create a mockup of given page using HTML/CSS
* That page should be responsive across all screen sizes
* NodeJS along with ExpressJS was used
* Responsive design was used for Desktop, Tablet and Mobile screen sizes.

### Instructions
* Step1: Open command prompt or terminal equivalent of your OS.
* Step2: Type `npm install express`, to install _express_ package.
* Step3: Type `node index.js`, to run the server.
* Step4: Open [Localhost URL](http://127.0.0.1:8080)

**************************************************************************

# Assignment 2
### Task
* To create a client-dashboard of subscribed stock
* Each stock will be shown live rates (generated random values for that), without refreshing the page
* Two users need to be shown the same rate of the same subscribed stock
* NodeJS along with ExpressJS was used

### Instructions
* Step 1: Open command prompt or terminal equivalent of your OS.
* Step 2: Type `npm install express express-sessions ejs socket.io`, to install the following packages.
  * _express_ package to handle server routes withe ease
  * _express-session_ for authentication of user using session storage
  * _ejs_ for templating
  * _socket.io_ for the requirement of updating values, without doing any GET/POST request
* Step 3: `node index.js`, to run the server
* Step 4: Open [Localhost URL](http://127.0.0.1:8880)

### Task 2
* Add Kafka.
* Kafka is used to manage real-time streams, which perfectly fits to the requirement of this assignment.
* Both the kafka-producer (those who writes) and the kafka-consumer (those whi reads) is the user itself.
* Mock stream data is generated in the server and put into client through socket.io
* We have to add kafka functionality, just when the user tried to subscribe to a stock.
* It will read the stock and adds it into a log file.

### Instructions
* In assignment folder, add `kafkajs` module by typing `npm install kafkajs`
* Install Kafka
* Extract Kafka **.tar.gz** zip files into `C://Kafka`
* Open terminal in that folder, in purpose of startig kafka server
* Add some a topic `stock-updates` witrh one available partition by typing `.\bin\windows\kafka-topics.bat --create --topic stock-updates --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1`
* Check the topics by typing, `.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092`. `stock-updates` should be appeared.
* Now, we need to start *zookeeper* (the one who oversees the brokers within kafka-server) by typing `.\bin\windows\zookeeper-server-start.bat config\zookeeper.properties`
* Now finally start *kafka-server* by typing `.\bin\windows\kafka-server-start.bat config\server.properties`
* The the logs of which each user do subscribe will be logged.

