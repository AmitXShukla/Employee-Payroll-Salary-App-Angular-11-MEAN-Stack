<u><h2>Database Installation</h2></u>
<a href="https://youtu.be/sWOXETusJNw" target="_blank">YouTube Video Tutorial</a><br/><br/>
By dafault, Elish HCM Cloud Community Edition is bundled with MongoDB.<br>
<i>please note that MongoDB is my preferred choice, but Developer may choose any database like MYSQL, MS SQL Server or CouchDB, Google Firebase/Firestore or any REST API</i><br />
Other database supported on v1.1.8 release are
MYSQL, MS SQL Server, PostGreSQL, CouchDB, Google Firebase/FireStore, MongoDB<br><br>
<u><i>If you wish to migrate/upgrade your old desktop or client/server software to enterprise desktop/mobile app, please write to info@elishconsulting.com for Enterprise version upgrade.</i></u><br><br>
We will cover MongoDB, CouchDB and MYSQL Server Installation in this document.<br>
<u><h2>MongoDB Installation :- </h2></u>
Download a copy of MongoDB based on your OS.<br>
https://www.mongodb.com/download-center?jmp=nav#community<br><br>
Windows 32 Bit system, please download it from <br>
(https://www.mongodb.com/download-center?jmp=nav#previous)<br>
<i>Users on Windows machine without Admin rights, can install it through Homebrew or<br>
Execute this command from CMD<br>
msiexec /a mongodb-win32-x64-3.2.5.msi /qb TARGETDIR="C:\MongoDB"
<br><br>
MongoDB (for windows 32bit OS, Developers should install 3.2.20).<br>
However, please keep in mind that 32 bit versions have 2GB data limit.<br>
So it's better to plan ahead and instead upgrade windows to 64 bit.<br>
</i>
<h4>Let's get started :-</h4>
https://docs.mongodb.com/manual/administration/install-community/<br />

Download & install appropriate version (Windows, mac or Linux)<br /> 
https://docs.mongodb.com/guides/server/install/<br />

#A :- in case, you want to know your computer infor please open a command prompt and type<br />
$ systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"<br />
#B :- While Installing MongoDB, Please make sure "Install as Service" option is enabled. otherwise, you will need to manually start mongodb server each time computer re-starts.<br />
#C :- on windows machine, please make sure, <br />
PATH = C:\MongoDB\bin<br />
 is setup correctly and points to the directory your mongodb\bin\mongod.exe is located.<br />
#D :- you can manually start MongoDB server by commandPrompt-> mongod<br />
#E :- After your MongoDB server is running (as a self-starting automated <br />windows/Linux/mac service) or running manually as defniend in #D i.e. mongod<br />
open another command prompt and mongo to open a mongo shell<br /><br />
$ mongo <br />
$ show dbs<br />
$ use elisherp  // this is the database we will use in our app<br />
$ show users<br />
// create user to connect to elishERP database<br />
$ db.createUser({<br /> 
    user: "amit",<br />
    pwd: "password",<br />
    roles: [{ role: "readWrite", db: "elishERP" },<br />
       { role: "dbAdmin", db: "elishERP" }]<br />
  })<br /><br />
$ db.users.insertOne(<br />
{ name: "Amit Shukla", email: "amit@elishconsulting.com", password: "amit@elishconsulting.com", roles: ["admin","supervisor"] }<br />
);<br /><br />
$ show users<br />
<br />
<h4>Deploying MongoDB on cloud</h4>
<a href="https://cloud.google.com/solutions/deploy-mongodb">Gloud</a><br />
<a href="https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-introduction">MicroSoft Azure</a><br />
<a href="https://mlab.com/">MLab</a><br />
<a href="https://www.mongodb.com/cloud/atlas/lp/general?jmp=search&utm_source=google&utm_campaign=Americas-US-MongoDB-to-Atlas-Brand-Beta&utm_keyword=mongodb&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=257481955321&utm_matchtype=p&_bt=257481955321&_bk=mongodb&_bm=p&_bn=g&gclid=CjwKCAjw1tDaBRAMEiwA0rYbSNKukS5YoJmykcNgzAVjXAigfphpcpTu_y4EY1styO6H-lbeqDjcZhoCA6EQAvD_BwE">MongoDB Atlas </a><br />
<i>Whatever cloud service you use, please note down mongodb url location to access your database.</i>

<u><h2>MYSQL Installation :-</h2></u>
https://dev.mysql.com/downloads/<br /><br />
create database   elisherp<br /><br />
CREATE TABLE `users` (<br />
  `id` int(11) NOT NULL AUTO_INCREMENT,<br />
  `name` varchar(255) DEFAULT NULL,<br />
  `email` varchar(255) DEFAULT NULL,<br />
  `password` varchar(255) DEFAULT NULL,<br />
  `roles` varchar(255) DEFAULT NULL,<br />
  `createdAt` datetime NOT NULL,<br />
  `updatedAt` datetime NOT NULL,<br />
  PRIMARY KEY (`id`)<br />
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;<br />

--<br />
-- Dumping data for table `users`<br />
--<br />
<br />
INSERT INTO `users` VALUES(1, 'Amit Shukla', 'amit@elishconsulting.com', 'amit@elishconsulting.com', 'admin,supervisor', '2018-07-26<br /> 01:33:32', '2018-07-26 01:33:32');<br />
<br /><br />
<u><h2>MariaDB Installation :-</h2></u>
https://www.apachefriends.org/index.html<br />
create database   elishERP
<u><h2>CouchDB Installation :-</h2></u>
Download a copy of couchdb database.<br>
<a href="http://couchdb.apache.org/">Download CouchDB</a><br>
<h4>Install Couchdb</h4>

When you install couchdb database for Windows, Linux or Mac.<br>
make sure, you "check" the box, where it says, Install as a service.<br>
<h4>Configure Couchdb</h4>
After installation<br>
open your web browser and go to <br>
<a href="http://127.0.0.1:5984/_utils">http://127.0.0.1:5984/_utils</a><br>

Sign in and create an admin user<br>
admin , password<br>

Go to CORS tab <br>
for local install, click on allow "all domains" (For single node local installation only)<br><br>
Go to Verify Installaion, and click on verify, make sure, it comes back with all checked green clicks. <br>

<h4>IMPORTANT</h4>
Shut down your computer and restart<br>
After computer is restarted, <br>
open your web browser and go to <br>
<a href="http://127.0.0.1:5984/_utils">http://127.0.0.1:5984/_utils</a><br>
**We want to make sure, couch db starts as a service, that means, no separate double click/software start is required.<br>
couchdb starts automatically when computer starts.<br>

<h4>Configure databases</h4>
create database   elishERP<br />