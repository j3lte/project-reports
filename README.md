## Project Reports generator & preview

This is an automated tool to generate project reports, based on [this template](https://github.com/raymonschouwenaar/tech-report-temp), using [Gulp](http://gulpjs.com/).

![REPORT](http://i.imgur.com/gOYNkQe.jpg)

**What is included?**

* Sample template. This is a straight copy from [Raymon Schouwenaar](https://github.com/raymonschouwenaar/), with the exception of some code highlighting. This matches the [Github syntax](https://help.github.com/articles/github-flavored-markdown/).
* Gulpfile to generate and preview (see below)

### Setup

* Clone the git repository (because this is a specific tool, I chose not to publish on NPM):

```bash
git clone https://github.com/j3lte/project-reports.git
```

* Install the dependecies:

```bash
npm install
```

* Copy the config.json.example from the root directory to config.json and edit it. The config has the following structure:

```javascript
{
  "firstName"   : "Jelte",      // Self explanatory
  "surName"     : "Lagendijk",  // Self explanatory
  "category"    : "Frontend",   // At our company we either use Frontend or System
  "reportdir"   : "reports"     // The output dir that will be generated in your folder
}
```

### Getting started

Create a new project report:

```bash
gulp
```

This will ask you to provide a project title.

```
[?] Please enter a project title:
```

Gulp will generate a new report, in the mentioned folder, with the following name:

```bash
<yyyymmdd>-<project title>-<firstname>-<surname>-<category>.md
```

Now you can start editing the file in the report folder

### Preview

>Jelte, I have an editor, but I want to preview my Markdown file. Is there a way?

Glad you asked, the answer is: Yes ofcourse! A little bit out of the ordinary, I decided to dive some further into Gulp (because Gulp is awesome). So I came up with a solution to create a live preview.

* Start the preview

```bash
gulp preview
```

* Open your browser with the live preview. The url is:

http://localhost:5000?file=filename.md

Enjoy your preview! (Guess how I wrote this README.md ;-) )

The livereload (see server/index.html) notes the scroll position of the window. This means that if you change the file, the window will reload and scroll to the previous position (normally LiveReload will make your window scroll to the top of the page)

**The preview has the following plugins enabled:**

* [Marked](https://github.com/chjj/marked), a markdown processor that outputs HTML
* [Prism](http://prismjs.com/), syntax highlighting
* [Github CSS](https://github.com/sindresorhus/github-markdown-css/), looks practically identical to Github Markdown
* [jQuery cookie](https://github.com/carhartl/jquery-cookie), to keep the scroll position saved after live reload

### Changelog

See [History](https://github.com/j3lte/project-reports/blob/master/History.md)

### TODO/BUGS

* Cleanup Gulp tasks, everything is now in a single taks
* Add FTP/SSH upload to a specified server (publish)

## License

Copyright (c) 2014-2014, Jelte Lagendijk. (MIT License)

See [LICENSE](https://raw.githubusercontent.com/j3lte/project-reports/master/LICENSE) for more info.