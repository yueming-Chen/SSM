# wordpress

##  安裝Linux, Apache, MySQL, PHP (LAMP) stack on Ubuntu 14.04

### 入門介紹
A "LAMP" stack is a group of open source software that is typically installed together to enable a server to host dynamic websites and web apps. This term is actually an acronym which represents the Linux operating system, with the Apache web server. The site data is stored in a MySQL database, and dynamic content is processed by PHP.

`LAMP`這個系統是一個開放軟體的群組，他特別為安裝在去能夠啟動伺服器去開啟一個動態網站與網陸應用程式。這個專有名詞是真正的arcronym在linux作業系統中。與阿帕契伺服器，這個網站資料會儲存在MySQL資料庫，藉由php產生動態的內容

In this guide, we'll get a LAMP stack installed on an Ubuntu 14.04 Droplet. Ubuntu will fulfill our first requirement: a Linux operating system.

### 先了解
Before you begin with this guide, you should have a separate, non-root user account set up on your server. You can learn how to do this by completing steps 1-4 in the initial server setup for Ubuntu 14.04.

## 在開始之前，我們有四個步驟得先設定好LAMP的設定

### 第一步 安裝apache

```cli
$ sudo apt-get update
$ sudo apt-get install apache2
```

如果裝好的話，我們可以輸入自己的ip去測試阿帕契有沒有開啟成功

```
http://your_server_IP_address
```

> #### 如何找到你的公開ip的位置呢？
> If you do not know what your server's public IP address is, there are a number of ways you can find it. Usually, this is the address you use to connect to your server through SSH.
> From the command line, you can find this a few ways. First, you can use the iproute2 tools to get your address by typing this:

```
$ ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
```

> An alternative method is to use an outside party to tell you how it sees your server. You can do this by asking a specific server what your IP address is:

```
curl http://icanhazip.com
```

> Regardless of the method you use to get your IP address, you can type it into your web browser's address bar to get to your server.

### 第二部 安裝mysql
Now that we have our web server up and running, it is time to install MySQL. MySQL is a database management system. Basically, it will organize and provide access to databases where our site can store information.

Again, we can use apt to acquire and install our software. This time, we'll also install some other "helper" packages that will assist us in getting our components to communicate with each other:

```
$ sudo apt-get install mysql-server php-mysql
```

First, we need to tell MySQL to create its database directory structure where it will store its information. You can do this by typing:

```
$ sudo mysql_install_db
```
如果遇到db需要`specify`的話，需要輸入以下指令

```
$ mysqld --initilzation
```

接著安裝設定mysql密碼，

```
$ sudo mysql_secure_installation
```

此次會遇到三中不同的密碼的權限，分別是低中高

- low security: 需要政策為，輸入長度大於八個，且至少包含一個英文字與一個數字
- medium security: 需要政策為，輸入長度大於八個，且至少得包含一個大寫與小寫字母·數字與一個非字母的特殊符號
- higj security:需要政策為，輸入長度大於十個，規則與中等安全性相同，但裡頭的英文單字，不得由四個字組成，且由字典搜尋所搜查到

### 第三步 安裝php
PHP is the component of our setup that will process code to display dynamic content. It can run scripts, connect to our MySQL databases to get information, and hand the processed content over to our web server to display.

We can once again leverage the `apt` system to install our components. We're going to include some helper packages as well:

```
$ sudo apt-get install php7.0 libapache2-mod-php7.0 php-mcrypt
```

This should install PHP without any problems. We'll test this in a moment.

In most cases, we'll want to modify the way that Apache serves files when a directory is requested. Currently, if a user requests a directory from the server, Apache will first look for a file called index.html. We want to tell our web server to prefer PHP files, so we'll make Apache look for an index.php file first.

```
$ sudo nano /etc/apache2/mods-enabled/dir.conf
```

建議如果有`gui`的人，可以去使用gedit，會比在終端機上更好去做編輯。

```conf
<IfModule mod_dir.c>
    DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
</IfModule>
```

我們需要將`index.php`移到最前頭

```
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```

如果有對於使用`nano`有問題，可以至鳥哥的nano教學去學習。

最後我們去從新啟用我們的`apache2`

```cli
$ sudo service apache2 restart
```

### 第四部 測試php 

In order to test that our system is configured properly for PHP, we can create a very basic PHP script.

We will call this script info.php. In order for Apache to find the file and serve it correctly, it must be saved to a very specific directory, which is called the "web root".

After Ubuntu 14.04, this directory is located at /var/www/html/. We can create the file at that location by typing:

```
$ sudo nano /var/www/html/info.php
```

```php info.php
<?php phpinfo(); ?>
```

The address you want to visit will be:

```
http://your_server_IP_address/info.php
```

You probably want to remove this file after this test because it could actually give information about your server to unauthorized users. To do this, you can type this:
```
$ sudo rm /var/www/html/info.php
```

Now that you have a LAMP stack installed, you have many choices for what to do next. Basically, you've installed a platform that will allow you to install most kinds of websites and web software on your server.

## 我們終於設定完成lamp，我們可以來正式進入我們的wordpress了！

### 步驟一 為wordpress在mysql中設定一組帳號密碼

To get started, log into the MySQL root (administrative) account by issuing this command:

```
$ mysql -u root -p
```

First, we can create a separate database that WordPress can control. You can call this whatever you would like, but I will be calling it wordpress because it is descriptive and simple. Enter this command to create the database:

```
> CREATE DATABASE your_db_name;
```
> your_db_name在此處，就取一個你自己喜歡的名字吧！
> 每一個sql的指令，後頭都需要有個分號去做結尾，就如同c語言一樣。

Every MySQL statement must end in a semi-colon (;), so check to make sure this is present if you are running into any issues.

Next, we are going to create a separate MySQL user account that we will use exclusively to operate on our new database. Creating one-function databases and accounts is a good idea from a management and security standpoint.

I am going to call the new account that I'm making wordpressuser and will assign it a password of password. You should definitely change the password for your installation and can name the user whatever you'd like. This is the command you need to create the user:

```
> CREATE USER wordpressuser@localhost IDENTIFIED BY 'password';
```

> 記住，password中要符合我們在前置作業中，設定密碼模組中的條件，如果覺得太麻煩可以直接把`mysql_secure`刪除，但是並不推薦這樣做。
> wordpressuser這個是要自己設定的帳號，在後頭會需要輸入，輸入完要確定自己記下來看

At this point, you have a database and a user account, each made specifically for WordPress. However, these two components have no relationship yet. The user has no access to the database.

Let's fix that by granting our user account access to our database with this command:

```
> GRANT ALL PRIVILEGES ON wordpress.* TO wordpressuser@localhost;
```
Now the user has access to the database. We need to flush the privileges so that the current instance of MySQL knows about the recent privilege changes we've made:

```
> FLUSH PRIVILEGES;
```
We're all set now. We can exit out of the MySQL prompt by typing:

```
> exit;
```
You should now be back to your regular command prompt.

### 步驟二 gogo下載wordpress囉

Luckily, the WordPress team always links the most recent stable version of their software to the same URL, so we can get the most up-to-date version of WordPress by typing this:

我們就一次下載完畢，並且直接安裝他與更新套件:
```
$ cd ~
$ wget http://wordpress.org/latest.tar.gz
$ tar xzvf latest.tar.gz
$ sudo apt-get update
$ sudo apt-get install php7.0-gd php-ssh2
```

### 步驟三 為wordpress做設定

Most of the configuration that we will be doing will be through a web interface later on. However, we do need to do some work from the command line before we can get this up and running.

Begin by moving into the WordPress directory that you just unpacked:

```
$ cd ~/wordpress
```

接著你需要把default的config檔案化作一般

```
$ cp wp-config-sample.php wp-config.php
```

最後我們需要去查看我們的token，並且把他複製下來，貼上去！最好是弄過一次後，不要把他複製到其他地方。

```
$ curl -s https://api.wordpress.org/secret-key/1.1/salt/
```

    Output
    define('AUTH_KEY',         '1jl/vqfs<XhdXoAPz9 DO NOT COPY THESE VALUES c_j{iwqD^<+c9.k<J@4H');
    define('SECURE_AUTH_KEY',  'E2N-h2]Dcvp+aS/p7X DO NOT COPY THESE VALUES {Ka(f;rv?Pxf})CgLi-3');
    define('LOGGED_IN_KEY',    'W(50,{W^,OPB%PB<JF DO NOT COPY THESE VALUES 2;y&,2m%3]R6DUth[;88');
    define('NONCE_KEY',        'll,4UC)7ua+8<!4VM+ DO NOT COPY THESE VALUES #`DXF+[$atzM7 o^-C7g');
    define('AUTH_SALT',        'koMrurzOA+|L_lG}kf DO NOT COPY THESE VALUES  07VC*Lj*lD&?3w!BT#-');
    define('SECURE_AUTH_SALT', 'p32*p,]z%LZ+pAu:VY DO NOT COPY THESE VALUES C-?y+K0DK_+F|0h{!_xY');
    define('LOGGED_IN_SALT',   'i^/G2W7!-1H2OQ+t$3 DO NOT COPY THESE VALUES t6**bRVFSD[Hi])-qS`|');
    define('NONCE_SALT',       'Q6]U:K?j4L%Z]}h^q7 DO NOT COPY THESE VALUES 1% ^qUswWgn+6&xqHN&%');

These are configuration lines that we can paste directly in our configuration file to set secure keys. Copy the output you received now.

Next, let's open the configuration file in a text editor:

```
$ nano wp-config.php
```
Find the section that contains the dummy values for those settings. It will look something like this:

貼上我們剛剛取得會來的salt，並且設定你的mysql的帳號密碼與妳的資料庫

```php
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wordpressuser');

/** MySQL database password */
define('DB_PASSWORD', 'password');

.
.
.
define('AUTH_KEY',         'VALUES COPIED FROM THE COMMAND LINE');
define('SECURE_AUTH_KEY',  'VALUES COPIED FROM THE COMMAND LINE');
define('LOGGED_IN_KEY',    'VALUES COPIED FROM THE COMMAND LINE');
define('NONCE_KEY',        'VALUES COPIED FROM THE COMMAND LINE');
define('AUTH_SALT',        'VALUES COPIED FROM THE COMMAND LINE');
define('SECURE_AUTH_SALT', 'VALUES COPIED FROM THE COMMAND LINE');
define('LOGGED_IN_SALT',   'VALUES COPIED FROM THE COMMAND LINE');
define('NONCE_SALT',       'VALUES COPIED FROM THE COMMAND LINE');
.
.
.
```

### 第四步 將你的檔案移到阿帕契上吧！

```
sudo rsync -avP ~/wordpress/ /var/www/html/
```

> 為什麼使用`rsync`而不使用`cp`是因為有權限的問題，前者能夠完整的把檔案原始的狀態clone到目的地

```
$ cd /var/www/html
```

You will need to change the ownership of our files for increased security.

We want to give user ownership to the regular, non-root user (with sudo privileges) that you plan on using to interact with your site. This can be your regular user if you wish, but some may suggest that you create an additional user for this process. It is up to you which you choose.

For this guide, we will use the same account that we set up during the initial server setup guide, which we called demo. This is the account I am performing all of the actions of this guide as.

The group ownership we will give to our web server process, which is www-data. This will allow Apache to interact with the content as necessary.

We can quickly assign these ownership values by typing:

```
sudo chown -R demo:www-data *
```
> 如果沒有demo這個使用者與www-data這個群組，快去建立一個吧！

First, let's manually create the uploads directory beneath the wp-content directory at our document root. This will be the parent directory of our content:

```
$ sudo mkdir /var/www/html/wp-content/uploads
```

We have a directory now to house uploaded files, however the permissions are still too restrictive. We need to allow the web server itself to write to this directory. We can do this by assigning group ownership of this directory to our web server, like this:

```
$ sudo chown -R :www-data /var/www/html/wp-content/uploads
```

This will allow the web server to create files and directories under this directory, which will permit us to upload content to the server.

### 第五部 完成你的wordpress安裝

Now that you have your files in place and your software is configured, you can complete the installation through the web interface.

In your web browser, navigate to your server's domain name or public IP address:

```
http://server_domain_name_or_IP
```

然後就順著用下去就可以安裝完了！

可能會遇到的問題

### Q1:什麼我的ssh就只有私鑰，難道要自己設定去用嗎？

> 安裝`openssh`，把密碼ssh打開就可以了

### Q2:無法安裝更新，會出現it didn't locate specify directory

> 只需要在`wp-config.php`中，加入`define('fs_file','direct')`即可！
> 這邊可以直接繞過ftp

### Q3:乾你老師，我家了反而出現另外一個錯誤，會顯示存取被拒

> 親愛的，雖然說懶人包很濃縮，幾乎可以讓不會linux的人使用，不過還是去學一下會比較好，權限最簡單就是進到`/var/www/html中`設定`chmod 777 -R ./`