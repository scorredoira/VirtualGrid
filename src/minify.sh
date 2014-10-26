#!/bin/bash

echo grid.js
java -jar /syltek/src/tools/compiler.jar --charset UTF-8 --js_output_file ../demo/grid.js --js \
			./s.js \
			./s.grid.js \
			./s.grid.builder.js \
			./s.grid.edit.js \
			./s.grid.focus.js \
			./s.grid.keyEvents.js \
			./s.grid.mouseEvents.js

echo grid.css
java -jar /syltek/src/tools/closure-stylesheets-20111230.jar --allow-unrecognized-properties \
			grid.css \
			> ../demo/grid.css








