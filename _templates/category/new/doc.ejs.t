---
to: docs/<%= h.slug(category) %>/_category_.json
---
{
  "label": "<%= category %>",
  "collapsible": true,
  "collapsed": true,
  "className": "red",
  "link": {
    "type": "generated-index",
    "title": "<%= category %> overview"
  },
  "customProps": {
    "description": "<%= category %> documentation"
  }
}