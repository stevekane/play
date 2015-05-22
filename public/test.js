console.error("SyntaxError: {\n  \"name\": \"play\",\n  \"version\": \"1.0.0\",\n  \"description\": \"This application is a foundation for experimenting with browser applications\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"node test\",\n    \"watch-src\": \"watchify -d -o public/app.js index.js\",\n    \"watch-test\": \"watchify -d -o public/test.js test.js\",\n    \"server\": \"http-server -p 4004\",\n    \"watch\": \"watchify -d -o public/app.js index.js & watchify -d -o public/test.js test.js & http-server -p 4004\",\n  },\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git+ssh://git@github.com/stevekane/play.git\"\n  },\n  \"keywords\": [\n    \"npm\",\n    \"bash\",\n    \"example\",\n    \"setup\",\n    \"browserify\",\n    \"watchify\"\n  ],\n  \"author\": \"Steve Kane\",\n  \"license\": \"MIT\",\n  \"bugs\": {\n    \"url\": \"https://github.com/stevekane/play/issues\"\n  },\n  \"homepage\": \"https://github.com/stevekane/play#readme\",\n  \"devDependencies\": {\n    \"http-server\": \"^0.8.0\",\n    \"tape\": \"^4.0.0\",\n    \"watchify\": \"^3.2.1\"\n  },\n  \"dependencies\": {\n    \"react\": \"^0.13.3\"\n  }\n}\n : Unexpected token }");