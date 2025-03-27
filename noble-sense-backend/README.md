# food-grocery-backend


### later I have to optimize order service by eliminating the need to call get product from db as the product inside  
### orderDTO contains same data which exist in database

### Now I will work for this specific requirements tailored for this online grocery project.

### Categories will be provided
* principle Dish
* Salads
* Starters ...

# we will suppose that main dishes exist the category of id 1


## the entity sensitiveLogs description:
This entity, named "sensitiveLogs," serves to record all changes made by administrators regarding customer information
or order submissions within the system. It's designed to maintain a clear record of actions taken, 
including modifications to user details and automatic balance deductions upon order confirmation.


##  tomorrow tasks
* I will finish page to see logs with its authorities in the frontend
* I will finish modify user profile if needed, I Will need this logic for customers
* I will build APIs for updating password, which will be allowed by all users
* I will need api for update user profile (the user can change only its informations)


#the order price is the principle plat price, since we multiple primary dish selected by the user so the price will be 
the price of the principle dish that contains priority 1

// all the order price equal to the price of the primary product with priority 1


# aws db installation
```shell
sudo apt update
sudo apt install mysql-server
sudo systemctl status mysql
sudo mysql
# Update the password for the MySql Server
#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'NSDB@2024@03@17';
CREATE USER 'ns_user'@'%' IDENTIFIED BY 'NSDB@2024@03@17';
GRANT ALL  ON *.* TO 'ns_user'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE aws_nsdb;
```
# connect to the database
```shell
cd /etc/mysql/mysql.conf.d
sudo nano mysqld.cnf

# update the following line
bind-address = 0.0.0.0
mysqlx-bind-address = 0.0.0.0

# restart the mysql server
sudo systemctl restart mysql

```
# update inbounds rules, or do it from the aws console
```shell
sudo ufw allow 3306
```