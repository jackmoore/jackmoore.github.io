---
title: Web Development Using Virtual Machines
layout: post
meta: I develop locally on a virtual server before deploying to a production environment. It's an efficient and flexible workflow and I wanted to share the setup process. This will walk through getting a simple LAMP stack up and running.
tags: [Development]
---

## Virtualization

I use [VirtualBox](https://www.virtualbox.org). It's a free, open source, cross-platform virtualization program. I'll use it to create a virtual system platform for running [Ubuntu 11.10 Sever](http://www.ubuntu.com/download/server/download) 32-bit as a guest operating system. There are significant benefits to using a virtual machine:

1.	**Replicate your production environment.**<br/>
	Avoid headaches by developing on same software configuration and hardware limitations as your production environment.

1.	**Easy to copy, transfer, backup, and restore.**<br/>
	VirtualBox has a snapshot feature that can be used at any time to save the current machine state. Experiment without hesitation knowing that you can always revert to a previous save state. The virtual machine can be copied for use on another computer or used as the starting point for a new machine.

1.	**No network is necessary to communicate with the virtual server.**

## Creating A New Virtual Machine

In VirtualBox, clicking 'New' opens the new virtual machine wizard. It's just a few steps and the defaults are fine. Choose Linux for OS Type and Ubuntu for the version. The memory defaults to 512 MB, which is on par with an entry level VPS.  This can be adjusted at any time. Once the VM is created, select it and click on 'Settings'.

### Storage

Go to the storage option and click on the empty IDE controller. Mount the Ubuntu iso as a DVD drive. When the guest system is started it will boot from the drive and load Ubuntu's installer.

![mount the server iso](/img/vbox/mountiso.png)

### Network

I have the network adapter attached to NAT. From the advanced settings, open 'Port Forwarding'. I added a forwarding rule for http requests.  Any requests to port 80 on the host will be forwarded to the guest, allowing me to access Apache as if it were running locally.


![forward http requests](/img/vbox/forwarding.png)

### Shared Folders

*Update: I have stopped using shared folders due to some outstanding bugs with VirtualBox.  I use an SFTP client to automatically sync files between my host and guest machine.*

I'm going to set up shared folders so that Apache can serve files directly from the host.

![setup file sharing](/img/vbox/share.png)

## Starting The Virtual Machine

I am going to handwave over the specifics of using LAMP. However, the OS installation process should be straight forward. There aren't many things to go wrong when installing a GUI-less system on virtualized hardware. For the sake of brevity, I picked LAMP Server during the software selection stage to have those packages automatically installed.

![install the LAMP packages](/img/vbox/software.png)

### First Login

Update the package index and upgrade existing packages:

	sudo apt-get update
	sudo apt-get upgrade

This might be a good place to create a snapshot. If anything goes wrong, just revert to the snapshot.

### VirtualBox Guest Additions

The Guest Additions package needs to be installed in order to access the shared folder. Guest Additions has a couple of prerequisite packages (dkms and linux-headers) that we'll want to install first. Click on 'Devices' and select 'Install Guest Additions'.  This adds a device to the system that will need to be mounted before we can access it's file system. The device should be under /dev/cdrom and we can mount it to the existing /media/cdrom. Then we can run the VBoxLinuxAdditions script which will install Guest Additions. After, you'll need to logout / login for the shared folder to be auto-mounted.

Once you've clicked on 'Install Guest Addtions', execute the following commands:

	sudo apt-get install linux-headers-$(uname -r)
	sudo apt-get install dkms
	sudo mount /dev/cdrom /media/cdrom
	sudo sh /media/cdrom/VBoxLinuxAdditions.run
	logout

The name of the shared folder will be prefixed with 'sf_' and it will be mounted under /media. Since I named my shared folder 'projects', the path will be /media/sf_projects/. Currently, Apache does not have read/write permissions for the shared folder. The Apache user (www-data) will need to be added to the vboxsf group to have those permissions. I added my user as well.

	sudo usermod -aG vboxsf www-data
	sudo usermod -aG vboxsf jack

### Configure Apache

I'm going to make two small additions to Apache's httpd.conf. I'm going to get Apache a ServerName, but more importantly, I am going to turn off EnableSendfile. There are outstanding cache issues related to using VirtualBox's shared folders, turning EnableSendfile off will help Apache send fresh files.

`File: /etc/apache2/httpd.conf`

	ServerName ubuntu
	EnableSendfile off

### Configure Apache's Virtual Hosts

Let's create a virtual host that serves files from the shared folder. I'm going to use 'dev' as my TLD to indicate that the site is hosted on my development environment. First we need to create an entry for a new site in Apache's sites-available directory:

`File: /etc/apache2/sites-available/jacklmoore.dev`

	<VirtualHost *:80>
		ServerName jacklmoore.dev
		DocumentRoot /media/sf_projects/jacklmoore
	</VirtualHost>

Now enable the site and reload Apache:

	sudo a2ensite jacklmoore.dev
	sudo service apache2 reload

Add an entry to your host machine's <a href='http://en.wikipedia.org/wiki/Hosts_(file)'>hosts</a>  file mapping the server name to your local address. Because port 80 was forwarded, all local HTTP requests will be forwarded to the virtual machine.  There, Apache will check to see if there is a site enabled by that name.

![I heard you like websites](/img/vbox/yodawg.png)