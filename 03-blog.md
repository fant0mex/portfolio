---
layout: profile
title: Blog
permalink: /blog/
---

<div class="container">
  <section class="blogfull">
    <div class="col-sm-8">
      <p>Blah</p>
    </div>
    <div class="col-sm-4">
      <h3>Posts</h3>
      <ul class="posts">
        {% for post in site.posts %}
          <li>
            <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
          </li>
        {% endfor %}
      </ul>
    </div>
  </section>
</div>