Users
=====

Croc supports two types of users: **default user** and **admin**. The default
user (referred to simply as "user" for the remainder of this document) has
limited access to certain features of Croc which out outlined below:


## Permissions

| Ability                         | user | admin |
|------------------------------------------------|
| Login                           | yes  | yes   |
| Create/Update/Delete Hooks [*]  | yes  | yes   |
| Add modules                     | no   | yes   |
| Update System Settings          | no   | yes   |
| Update/Add/Delete Users         | no   | yes   |
| Update profile                  | yes  | yes   |

[*] Hooks have their own set of permissions, but in general both users and
admins are able to create, update, and delete hooks. See [Hooks](hooks.md) for
more information.


## Modifying Users

Only admin users have the ability to modify system users other than themselves.
To update, add, or delete users navigate to the "Users" tab under Settings.
There you will find a list of all available users on the left and a form to add
a user on the right. To edit or delete a user click the pencil icon next to the
users name and either update the information on the form or click the "delete"
button. To add a user simply fill out and submit the form on the right.