# Beautiful Jekyll

[![Gem Version](https://badge.fury.io/rb/beautiful-jekyll-theme.svg)](https://badge.fury.io/rb/beautiful-jekyll-theme)

> *Copyright 2020 [Dean Attali](https://deanattali.com)*

**Beautiful Jekyll** is a ready-to-use template to help you create a beautiful website quickly. Perfect for personal sites, blogs, or simple project websites.  [Check out a demo](https://beautifuljekyll.com) of what you'll get after just two minutes.  You can also look at [my personal website](https://deanattali.com) to see it in use, or see examples of websites other people created using this theme [below](#showcased-users-success-stories).

## Table of contents

- [Features](#features)
- [**Build your website in 3 steps**](#build-your-website-in-3-steps)
- [Add your own content](#add-your-own-content)
- [Customizing parameters for each page](#customizing-parameters-for-each-page)
- [Supported parameters](#supported-parameters)
- [Showcased users (success stories!)](#showcased-users-success-stories)
- [FAQ and support](#faq-and-support)
- [Credits and contributions](#credits)

# Features

- **SIMPLE**: The primary goal of Beautiful Jekyll is to allow literally *anyone* to create a website in a few minutes.
- **Modern**: Uses the latest best practices and technologies to achieve nearly perfect scores on Google Chrome's Audit. 
- **Mobile-first**: Designed to look great on both large-screen and small-screen (mobile) devices.   
- **Highly customizable**: Many personalization settings such as changing the background colour/image, adding a logo.  
- **Flexible usage**: Use Beautiful Jekyll directly on GitHub or using a Ruby gem - choose the best [development method](#build-your-website-in-3-steps) for you.  
- **Battle-tested**:  By using Beautiful Jekyll, you'll be joining tens of thousands of users who used this theme since 2015.  
- **Links to your social media**: You can easily add links to any of your social media accounts in the footer of every page.  
- **Comments support**: Add comments to any page using either [Disqus](https://disqus.com/), [Facebook comments](https://developers.facebook.com/docs/plugins/comments), [Utterances](https://utteranc.es/), or [Staticman](https://staticman.net).  
- **Share blog posts on social media**: By default, all blog posts have buttons to allow people to share on Twitter/Facebook/LinkedIn.
- **Tags**: Any blog post can be tagged with keywords, and an index page showing all the tags is automatically generated.
- **Tracking analytics**: Easily integrate Google Analytics, or other analytics platforms, to track visits to your website.  
- **Photos support**: Any page can have a cover photo around its title, and any blog post can have an associated image.  
- **More advanced features**: I wrote [a blog post](https://deanattali.com/2015/03/12/beautiful-jekyll-how-to-build-a-site-in-minutes/) describing some more advanced features that I used in my website that can be used in any beautiful-jekyll site.

# Customizing parameters for each page

**One last important thing**: In order to have your new pages use this template and not just be plain HTML pages, **you must add [YAML front matter](https://jekyllrb.com/docs/front-matter/) to the top of each page**. This is where you'll be able to give each page some extra parameters such as a title, a subtitle, or an image. [Below is a list of all available parameters](#supported-parameters). If you don't want to use any parameters on a page (this also means having no title), then use the empty YAML front matter:

```
---
---
```

If you do want to use any parameters, write them between these two lines. For example, you can have this at the top of a page:

```
---
title: Contact me
subtitle: Here you'll find all the ways to get in touch with me
---
```

You can look at the top of [`aboutme.md`](https://raw.githubusercontent.com/daattali/beautiful-jekyll/master/aboutme.md) as an example.

**Important takeaway: ALWAYS add the YAML front matter, which is two lines with three dashes, to EVERY page. If you have any parameters, they go between the two lines.**

If you don't include YAML then your file will not use this template.

# Supported parameters

Below is a list of the parameters that **Beautiful Jekyll** supports (any of these can be added to the YAML front matter of any page). Remember to also look in the `_config.yml` file to see additional settings.

## Main paramaters

These are the basic YAML parameters that you are most likely to use on most pages.

Parameter   | Description
----------- | -----------
title       | Page or blog post title
subtitle    | Short description of page or blog post that goes under the title
tags        | List of tags to categorize the post. Separate the tags with commas and place them inside square brackets. Example: `[personal, analysis, finance]`
cover-img   | Include a large full-width image at the top of the page.  You can either give the path to a single image, or provide a list of images to cycle through (see [my personal website](https://deanattali.com/) as an example).
comments    | If you want do add comments to a specific page, use `comments: true`. Comments only work if you enable one of the comments providers (Facebook, disqus, staticman, utterances) in `_config.yml` file. Comments are automatically enabled on blog posts but not on other pages; to turn comments off for a specific post, use `comments: false`. 

## Less commonly used parameters

These are parameters that you may not use often, but can come in handy sometimes.

Parameter   | Description
----------- | -----------
readtime    | If you want a post to show how many minutes it will take to read it, use `readtime: true`.
show-avatar | If you have an avatar configured in the `_config.yml` but you want to turn it off on a specific page, use `show-avatar: false`.
image       | If you want to add an image to your blog post that will show up next to the post's excerpt on the feed and in the post page itself, use `image: /path/to/img`.
share-img   | If you want to specify an image to use when sharing the page on Facebook or Twitter, then provide the image's full URL here.
social-share | By default, every blog post has buttons to share the page on social media. If you want to turn this feature off, use `social-share: false`.
nav-short   | By default, the navigation bar gets shorter after scrolling down the page. If you want the navigation bar to always be short on a certain page, use `nav-short: true` 
gh-repo   | If you want to show GitHub buttons at the top of a post, this sets the GitHub repo name (eg. `daattali/beautiful-jekyll`). You must also use the `gh-badge` parameter to specify what buttons to show.
gh-badge  | Select which GitHub buttons to display. Available options are: [star, watch, fork, follow]. You must also use the `gh-repo` parameter to specify the GitHub repo.
layout      | What type of page this is (default is `post` for blog posts and `page` for other pages). See _Page types_ section below for more information. 

## Advanced parameters

These are advanced parameters that are only useful for people who need very fine control over their website.

Parameter   | Description
----------- | -----------
footer-extra | If you want to include extra information in the footer, create an HTML file in the `_includes/` folder (for example `_includes/myinfo.html`) and set `footer-extra` to the name of the file (for example `footer-extra: myinfo.html`) 
language    | HTML language code to be set on the page's &lt;html&gt; element.
use-site-title | If you want to use the site title rather than the page title as the HTML document title, use `use-site-title: true`.
js          | List of local JavaScript files to include in the page (eg. `/assets/js/mypage.js`)
ext-js      | List of external JavaScript files to include in the page (eg. `//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js`). External JavaScript files that support [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) can be specified using the `href` and `sri` parameters eg.<br/>`href: "//code.jquery.com/jquery-3.1.1.min.js"`<br/>`sri: "sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="`
css         | List of local CSS files to include in the page
ext-css      | List of external CSS files to include in the page. External CSS files using SRI (see `ext-js` parameter) are also supported.

## Page types

- **post** - To write a blog post, add a markdown or HTML file in the `_posts` folder. As long as you give it YAML front matter (the two lines of three dashes), it will automatically be rendered like a blog post. Look at the existing blog post files to see examples of how to use YAML parameters in blog posts.
- **page** - Any page outside the `_posts` folder that uses YAML front matter will have a very similar style to blog posts.
- **home** - The home layout is meant to act as the homepage of your blog posts - it will display all your blog posts, sorted from newest to oldest. A file using the `home` layout must be named `index.html` (not `index.md` or anything else!).
- **minimal** - If you want to create a page with minimal styling (ie. without the bulky navigation bar and footer), assign `layout: minimal` to the YAML front matter.
- If you want to completely bypass the template engine and just write your own HTML page, simply omit the YAML front matter. Only do this if you know how to write HTML!
