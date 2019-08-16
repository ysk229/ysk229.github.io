---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: layout
permalink: /tags/
---


<div class="tagCloud">
    {% for tag in site.tags %}
    <a href="#{{ tag | first }}">{{ tag | first }}</a>
    {% endfor %}
</div>

<div>
    <ul class="tag-box inline">
        {% for tag in site.tags %}
        <li><a href="#{{ tag | first }}">{{ tag | first }}<span>{{ tag | last | size }}</span></a></li>
        {% endfor %}
    </ul>
</div>

<div>
    {% for tag in site.tags %}
    <h2 id="{{ tag | first }}">{{ tag | first }}</h2>
    <ul>
        {% for posts in tag  %}{% for post in posts %}{% if post.title != null %}
        <li itemscope><span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date_to_string }}</time></span> &raquo; <a href="{{ post.url | prepend: site.baseurl | prepend: site.url }}">{{ post.title }}</a></li>
        {% endif %}{% endfor %}{% endfor %}
    </ul>
    {% endfor %}
</div>