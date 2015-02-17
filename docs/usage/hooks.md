Hooks
=====

The user defined scripts that run in Croc are known as hooks. Hooks are scripts
written in JavaScript and support Node.js bindings. They are run in a separate
process so if the script fails, the server won't come crashing down.


## Creating a Hook

Hooks are really easy to create in Croc. Hooks can be created from either the
Croc dashboard or from a form found in the sidebar. Give your hook a name, and
a new record will be added to the database. A slug for the hook will be
automatically generated for you.


## Context

Hooks are run under a particular context, which gives the script access to
various Node.js bindings as well as other utility methods. The `require` method
is implemented in the context to all hooks to import modules with CommonJS style
imports. This allows access to core Node.js modules, as well as third-party
modules installed via npm.

Also included in the hook context is an implementation of console logging. The
basic `console.log()`, `console.warn()`, and `console.error()` are implemented
to give the hook access to the log output. See below for more information about
the logs.


## Execution

Hooks are fully capable of running asynchronous code. However, to prevent a hook
from running forever, a timeout is imposed. To change the duration of this
timeout please refer to [System Settings](settings.md).

In order to end the hook before the timeout is exceeded, a call to `exit()` must
be made. The `exit()` method takes one parameter, an error message. Passing a
non-null value will cause the hook execution to be logged as a fail state.


## Logs

The success or failure of each execution of hook is logged in the database. The
logs can be viewed on the hook page. Before executing, each hook undergoes a
syntax check. If the check returns an error, the execution will be logged as a
failure and and a stack trace will be included with the log output. Similarly,
by using the `console` methods listed above, the hook can log various data which
viewable with the logs on the hook page. Any call to `console.error()` will
cause the hook to be logged as a fail state.


## Settings

There are currently only a few settings which can be adjusted for each hook.
These settings are found under the settings tab of the user interface. From
there the hooks name, slug, and whether or not it is hidden can be modified.
Additionally, the hook can also be deleted from this section.


## Permissions

By default, any user or admin can view a hook even if it was created by another
user or admin. However, only the owner of the hook and admins are capable of
modifying the hook settings. Additionally, only an admin can make a hook hidden.

A hidden hook is a hook that is only viewable by the owner of the hook. It is
even hidden from other admins. If you have a hook that contains sensitive or
privileged information such as passwords and API keys, then a hidden hook would
be right for this task. 