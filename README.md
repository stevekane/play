#Experimenting with javascript quickly and with minimal fuss
I have started a lot of javascript experiments and projects over the past several years
and I thought I would write down the steps I follow to quickly get up and running
with a fun environment to code in.  This general strategy has been employed for:

1. Building webgl demos
2. Building web components
3. Building websock based multiplayer game servers

This setup process should take 2-3 minutes roughly (or less on future repetitions).  The goal
is to avoid complexity and to use the POSIX/Bash environment nearly all of us develop in
to get off to the races with a highly flexible and composable development setup.  

This setup assumes you wish to use NPM for installing modules and you are comfortable installing
and bundling them using browserify.  

However, the setup here is so minimal that if you prefer alternative package managers or bundling tools
it should be very obvious how to substitute them into this configuration with minimal fuss.

NOTE: I will include the bash terminal commands for EVERY step for the sake of clarity and thoroughness.  
Please don't think I am insulting your intelligence!
#How to start
Create a directory for your project and change to it.
```bash
mkdir play && cd play
```
#Setup version control
Initialize git and create a .gitignore file that ignores your node_modules folder.
```bash
git init
echo "/node_modules" > .gitignore
```
You may also wish to ignore other things depending on your development environment.  Typical examples include swo and swp files (for VIM users) and possibly npm-debug.log.

#Setup package manager
Initialize npm.  Be sure to provide reasonable data for each prompt to save yourself from having to edit
your soon-to-exist package.json file.  For version I recommend just starting with 1.0.0.  Everything else
is a waste of time.  For a test command enter 'node test'.  If you know something about your project 
ahead of time you might try adding a few keywords which will help when people try to search for your 
project on npm (should this ever happen).
```bash
npm init
```
#Install basic packages
We would like to have the following features available to us following our setup:

1. Webserver to serve static files
2. System to build our multiple javascript source files into a single bundle
3. Simple testing infrastructure

##http-server
The node.js ecosystem has MANY options to choose from for creating a simple http webserver.  This solution 
works best when you need to support ZERO logic in your server but just want to serve static assets.  If your
needs evolve to include server logic (in the case of an application or demo) then this is trivial to remove
and replace with a server.js file containing your own code.

Install http-server as a global node module.
```bash
npm install -g http-server
```
You should now have the command 'http-server' available in your terminal.

##watchify
Browserify is node module that provides a simple api for a single (or multiple!) javascript files which can
be included in your index.html.  Browserify will process your code that uses commonjs ("node-style") require
statements and build a single javascript file.  Browserify has MANY cool features including a transformation
api, multiple bundle targets, and shims for commonly used node features such as Buffers and the file system module.  
You can read more about it at browserify at browserify.org.

We are going to use a package called watchify which augments browserify and provides a file system watcher 
and caches bundles to avoid rebuilding files that have not changed.

There are alternative solutions to browserify including projects like system.js and webpack.  I am not 
including any information about using them here but know that you can easily substitute them or other solutions
in if you desire to do so.

Install watchify as a global node module.
```bash
npm install -g watchify
```
You should now have the command 'watchify' available in your terminal.

##tape
Tape is a very minimal test runner available in the node ecosystem.  It is a thin wrapper around TAP (the test anything
protocol) and provides basic testing facilities.  Tape is easily able to handle both sync and async tests without complex
fanfare and it's generally considered a quality base for node testing.  

There are myriad alternatives to tape.  Some examples include smokestack, mocha, and junit.  Use what you like.
```bash
npm install --save-dev tape
```

#Create folders
You need only a "public" folder defined to get your playground up and running.  Beyond this, if you need multiple source files
I recommend creating a "src" folder.  If you need multiple test files I recommend creating a "tests" folder.

```bash
mkdir public
```
#Create files
You need to create an index.html file to send to the browser for rendering your browser app.  You may also wish to create 
a separate test.html file which you can serve for running your unit tests in the browser.  
```bash
touch public/index.html
touch public/test.html
echo "<!doctype html><html><head></head><body><script src='app.js'></script></body></html>" > public/index.html
echo "<!doctype html><html><head></head><body><script src='test.js'></script></body></html>" > public/test.html
```
The above lines are of course a bit silly.  You could just create these files yourself by whatever means you prefer.  The only
important bit is that index.html has a script tag with src attribute 'app.js' and that test.html has a script tag with src attribute 
'test.js'.

You will also want to create a main source file and a main test file.
```bash
touch index.js
touch test.js
```

#Setup npm scripts
We would like to define some simple scripts that can be invoked using npm's 'run' feature.  These scripts are all defined
in the package.json file under 'scripts'.  You likely already have one defined for running your unit tests.  

We want the three following tasks to be possible:

1. Watch source files for changes and recompile the app bundle
2. Watch test files for changes and recompile the test bundle
3. Run http-server to serve our application and assets

We can watch our source files using the following bash script.  -d creates sourcemaps and -o specifies where to write the output file.
```bash
watchify -d -o public/app.js index.js
```
We can watch our test files using the following bash script.
```bash
watchify -d -o public/test.js test.js
```
We can run our http-server using the following bash script.
```bash
http-server
```

Each of these could be added to the package json as scripts as shown below.
We have also created a 'start' and 'stop' script which allow all three core scripts to be started
and stopped as background processes.  Note the scripts are separated by a single '&' which will cause
them to be background jobs.

```json
{
  "scripts": {
    "test": "node test",
    "watch-src": "watchify -d -o public/app.js index.js",
    "watch-test": "watchify -d -o public/test.js test.js",
    "server": "http-server",
    "start": "watchify -d -o public/app.js index.js & watchify -d -o public/test.js test.js & http-server &",
    "stop": "job -x kill"
  }
}
```

We can now start our file watchers for both source and tests and have our http server running as background processes of a single terminal (or tab).  This is somewhat convenient though certainly not necessary.  Once your server and watchers are started, visit your app at localhost:8080/index.html or your tests at localhost:8080/test.html.

#Fin
You are now setup with a flexible and minimal browser application development environment.  Feel free
to experiment with this on your own and don't hesitate to submit a pull request to the repo where this example lives if you think you can do better!  Best of luck.
