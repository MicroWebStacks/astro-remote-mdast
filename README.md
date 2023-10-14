# Astro Remark
render remote markdown content using Astro components with the help of remark mdast

* Pure Markdown .md

 Not MDX nor Markdoc : The rational to sticking to the Markdown standard is leveraging the existing content base and not push authors to rewrite content. Also, a split is intended between content creation and rendering, so MDX is not required as the authors are not expected to be developpers that bring custom components.

 Both MDX and Markdoc come with deviations from the MD content parsing which break on content that is supported or tolerated by MD, which makes neither of MDX nor Markdoc a superset or alternative to Markdown.

* Enhance Markdown with Astro components

Such features already exist for react components (react-markdown) but not for the Astro components or at least not in combination with other required features (remote, remark AST,...).

* Remote markdown

Astro allow already a similar use case with MDX and also for local files, not for remote markdown. Although remote markdown is more relevant for SSR, even in SSG it offer more flexibility when fetching content from a CMS or using a flexible path in the file system.

* Remark AST

The remark AST is the safest way to parse Markdown which keeps closest compatibility with other ecosystem tools, this is a guarantee to enhance Markdown without deriving a new Markdown flavor.

* No custom components

Given the required purity of Markdown content, it is not intended to introduce custom components inside the .md files e.g. (`# Heading with <MyComponent/>`). It is nevertheless possible to use custom components with existing AST types, e.g. replace images, tables, code,... this ensures content compatibility and prevents needs for new flavors.

* custom components through standard Markdown API

Some content generation providers e.g. Mermaid, Plantuml allow already custom images generation from content, the idea is to use code meta data to derive a custom handler for each content type. Given the naming flexibility of code meta data, this can allow endless components types variations using one single markdwon type 'code'. Same can be introduced for images with e.g. special meta data (extension, alt,...)


# References
* marked docs : https://marked.js.org/using_advanced

# Related projects
## Astro remote
* https://github.com/natemoo-re/astro-remote

* Markdown renderer : https://marked.js.org/
* transform and include custom components : https://github.com/natemoo-re/ultrahtml
* renderer : JSX runtime
* components enhancement (Headings,...) : goes through litteral string replace ment with parameters then fed to ultrahtml

reasons for not using Astro remote :
* the JSX runtime renderer inherits deviations from the Markdown standard and can throw errors that would otherwise be supported or tolerated by Markdown
* Ultrahtml components enhancement not needed : given that Astro-Remark only intends to use standard remark AST types, all parsing is offloaded to the same parser which takes out the risk of deviation in content interpretation (e.g. some open issues related to space parsing,...).


## React Markdown
mentioned just for reference not relevant as solution but similarities in e.g. the APIs are to be considered

* React markdown : https://github.com/remarkjs/react-markdown

## Other projects
* https://github.com/jonschlinkert/remarkable
* https://github.com/jonschlinkert/markdown-toc
