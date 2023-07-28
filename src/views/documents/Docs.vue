<template>
    <div class="prose lg:prose-xl dark:prose-invert mx-auto" v-once>
        <h3 id="what-is-markdown-">What is Markdown?</h3>
        <p>Markdown is a lightweight markup language that you can use to format plain text documents.<br>Write docs for your
            GitHub projects, edit your GitHub profile <em>README</em> etc. You fill find it all here. </p>
        <p>Let&#39;s dive into it. ⤵️</p>
        <h4 id="table-of-contents">Table of Contents</h4>
        <ol>
            <li><a href="#paragraph">Paragraph</a></li>
            <li><a href="#headings">Headings</a></li>
            <li><a href="#emphasis">Emphasis</a></li>
            <li><a href="#blockquote">Blockquote</a></li>
            <li><a href="#images">Images</a></li>
            <li><a href="#links">Links</a></li>
            <li><a href="#code">Code</a></li>
            <li><a href="#lists">Lists</a>
                <ul>
                    <li><a href="#orderedlist">Ordered List</a></li>
                    <li><a href="#unorderedlist">Unordered List</a></li>
                    <li><a href="#mixedlist">Mixed List</a></li>
                </ul>
            </li>
            <li><a href="#table">Table</a></li>
            <li><a href="#tasklist">Task List</a></li>
            <li><a href="#footnote">Footnote</a></li>
            <li><a href="#sectionjump">Jump to section</a></li>
            <li><a href="#horizontalline">Horizontal Line</a></li>
            <li><a href="#html">HTML</a></li>
        </ol>
        <hr>
        <p><a name="paragraph" /></p>
        <h2 id="paragraph">Paragraph</h2>
        <p>By writing regular text you are basically writing a paragraph.</p>
        <pre><code>This <span class="hljs-keyword">is</span> a <span class="hljs-built_in">paragraph</span>.
</code></pre>
        <p>This is a paragraph.</p>
        <hr>
        <p><a name="headings" /></p>
        <h2 id="headings">Headings</h2>
        <p>There are 6 heading variants. The number of &quot;#&quot; symbols, followed by text, indicates the importance of
            the heading.</p>
        <pre><code># Heading <span class="hljs-number">1</span>
## Heading <span class="hljs-number">2</span>
### Heading <span class="hljs-number">3</span>
#### Heading <span class="hljs-number">4</span>
##### Heading <span class="hljs-number">5</span>
###### Heading <span class="hljs-number">6</span>
</code></pre>
        <h1 id="heading-1">Heading 1</h1>
        <h2 id="heading-2">Heading 2</h2>
        <h3 id="heading-3">Heading 3</h3>
        <h4 id="heading-4">Heading 4</h4>
        <h5 id="heading-5">Heading 5</h5>
        <h6 id="heading-6">Heading 6</h6>
        <hr>
        <p><a name="emphasis" /></p>
        <h2 id="emphasis">Emphasis</h2>
        <p>Modifying text is so neat and easy. You can make your text bold, italic and strikethrough.</p>
        <pre><code><span class="hljs-keyword">Using</span> two asterisks **this <span class="hljs-keyword">text</span> <span class="hljs-keyword">is</span> bold**.  
Two underscores __work <span class="hljs-keyword">as</span> well__.  
<span class="hljs-keyword">Let</span><span class="hljs-comment">'s make it *italic now*.  </span>
You guessed it, _one underscore <span class="hljs-keyword">is</span> also enough_.  
Can we combine **_both <span class="hljs-keyword">of</span> that_?** Absolutely.
What <span class="hljs-keyword">if</span> I want <span class="hljs-keyword">to</span> ~~strikethrough~~?
</code></pre>
        <p>Using two asterisks <strong>this text is bold</strong>.<br>Two underscores <strong>work as
                well</strong>.<br>Let&#39;s make it <em>italic now</em>.<br>You guessed it, <em>one underscore is also
                enough</em>.<br>Can we combine <strong><em>both of that</em>?</strong> Absolutely.<br>What if I want to
            <del>strikethrough</del>?
        </p>
        <hr>
        <p><a name="blockquote" /></p>
        <h2 id="blockquote">Blockquote</h2>
        <p>Want to emphasise importance of the text? Say no more.</p>
        <pre><code>&gt; This <span class="hljs-keyword">is</span> a blockquote.
&gt; Want <span class="hljs-keyword">to</span> <span class="hljs-built_in">write</span> <span class="hljs-keyword">on</span> a new line <span class="hljs-keyword">with</span> <span class="hljs-literal">space</span> <span class="hljs-keyword">between</span>?
&gt;
&gt; &gt; And nested? No problem <span class="hljs-keyword">at</span> all.
&gt; &gt;
&gt; &gt; &gt; PS. you can **style** your <span class="hljs-built_in">text</span> _as you want_.
</code></pre>
        <blockquote>
            <p>This is a blockquote.
                Want to write on a new line with space between?</p>
            <blockquote>
                <p>And nested? No problem at all.</p>
                <blockquote>
                    <p>PS. you can <strong>style</strong> your text <em>as you want</em>. :</p>
                </blockquote>
            </blockquote>
        </blockquote>
        <hr>
        <p><a name="images" /></p>
        <h2 id="images">Images</h2>
        <p>The best way is to simply drag &amp; drop image from your computer directly. You can also create reference to
            image and assign it that way.<br>Here is the syntax.</p>
        <pre><code>![<span class="hljs-string">text if the image fails to load</span>](<span class="hljs-link">auto-generated-path-to-file-when-you-upload-image "Text displayed on hover"</span>)

[<span class="hljs-symbol">logo</span>]: <span class="hljs-link">auto-generated-path-to-file-when-you-upload-image "Hover me"</span>
![<span class="hljs-string">error text</span>][<span class="hljs-symbol">logo</span>]
</code></pre>
        <p><img src="https://user-images.githubusercontent.com/46372998/212541682-9907aaea-5198-45a9-8961-2acc8a98a0db.png"
                alt="text if the image fails to load" title="Text displayed on hover"></p>
        <p><img src="https://user-images.githubusercontent.com/46372998/212541682-9907aaea-5198-45a9-8961-2acc8a98a0db.png"
                alt="error text" title="Hover me"></p>
        <hr>
        <p><a name="links" /></p>
        <h2 id="links">Links</h2>
        <p>Similar to images, links can also be inserted directly or by creating a reference. You can create both inline and
            block links.</p>
        <pre><code>[<span class="hljs-symbol">markdown-cheatsheet</span>]: <span class="hljs-link">https://github.com/im-luka/markdown-cheatsheet</span>
[<span class="hljs-symbol">docs</span>]: <span class="hljs-link">https://github.com/adam-p/markdown-here</span>

[<span class="hljs-string">Like it so far? Follow me on GitHub</span>](<span class="hljs-link">https://github.com/im-luka</span>)
[<span class="hljs-string">My Markdown Cheatsheet - star it if you like it</span>][<span class="hljs-symbol">markdown-cheatsheet</span>]
Find some great docs [<span class="hljs-string">here</span>][<span class="hljs-symbol">docs</span>]
</code></pre>
        <p><a href="https://github.com/im-luka">Like it so far? Follow me on GitHub</a><br><a
                href="https://github.com/im-luka/markdown-cheatsheet">My Markdown Cheatsheet - star it if you like
                it</a><br>Find some great docs <a href="https://github.com/adam-p/markdown-here">here</a></p>
        <hr>
        <p><a name="code" /></p>
        <h2 id="code">Code</h2>
        <p>You can cerate both inline and full block code snippets. You can also define programming language you were using
            in your snippet. All by using backticks.</p>
        <pre><code>    I created `.env` file at the root.
    Backticks inside backticks? `` `No problem.` ``
</code></pre>
        <pre><code>{
  learning: <span class="hljs-string">"Markdown"</span>,
  showing: <span class="hljs-string">"block code snippet"</span>
}
```

```js
const x = <span class="hljs-string">"Block code snippet in JS"</span>;
console.log(x);
```
</code></pre>
        <pre><code>
I created `.env` file at the root.
Backticks inside backticks? `` `No problem.` ``
</code></pre>
        <p>{
            learning: &quot;Markdown&quot;,
            showing: &quot;block code snippet&quot;
            }</p>
        <pre><code>
```js
const x = <span class="hljs-string">"Block code snippet in JS"</span>;
console.log(x);
</code></pre>
        <hr>
        <p><a name="lists" /></p>
        <h2 id="lists">Lists</h2>
        <p>As you can do in HTML, Markdown allows creating of both ordered and unordered lists.</p>
        <p><a name="orderedlist" /></p>
        <h3 id="ordered-list">Ordered List</h3>
        <pre><code><span class="hljs-bullet">1. </span>HTML
<span class="hljs-bullet">2. </span>CSS
<span class="hljs-bullet">3. </span>Javascript
<span class="hljs-bullet">4. </span>React
<span class="hljs-bullet">7. </span>I'm Frontend Dev now 👨🏼‍🎨
</code></pre>
        <ol>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
            <li>React</li>
            <li>I&#39;m Frontend Dev now 👨🏼‍🎨</li>
        </ol>
        <p><a name="unorderedlist" /></p>
        <h3 id="unordered-list">Unordered List</h3>
        <pre><code>- <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>
+ Express
* Nest.js
- Learning Backend ⌛️
</code></pre>
        <ul>
            <li>Node.js</li>
            <li>Express</li>
            <li>Nest.js</li>
            <li>Learning Backend ⌛️</li>
        </ul>
        <p><a name="mixedlist" /></p>
        <h3 id="mixed-list">Mixed List</h3>
        <p>You can also mix both of the lists and create sublists.<br><strong>PS.</strong> Try not to create lists deeper
            than two levels. It is the best practice.</p>
        <pre><code>1. Learn Basics
   1. HTML
   2. CSS
   7. Javascript
2. Learn One Framework
   -<span class="ruby"> React 
</span>     -<span class="ruby"> Router
</span>     -<span class="ruby"> Redux
</span>   * Vue
   + Svelte
</code></pre>
        <ol>
            <li>Learn Basics<ol>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Javascript</li>
                </ol>
            </li>
            <li>Learn One Framework<ul>
                    <li>React <ul>
                            <li>Router</li>
                            <li>Redux</li>
                        </ul>
                    </li>
                    <li>Vue</li>
                    <li>Svelte</li>
                </ul>
            </li>
        </ol>
        <hr>
        <p><a name="table" /></p>
        <h2 id="table">Table</h2>
        <p>Great way to display well-arranged data. Use &quot;|&quot; symbol to separate columns and &quot;:&quot; symbol to
            align row content.</p>
        <pre><code>| Left Align (default) | Center Align | Right Align |
| <span class="hljs-symbol">:-------------------</span> | <span class="hljs-symbol">:----------</span>: | ----------: |
| React.js             | Node.js      | MySQL       |
| Next.js              | Express      | MongoDB     |
| Vue.js               | Nest.js      | Redis       |
</code></pre>
        <table>
            <thead>
                <tr>
                    <th style="text-align:left">Left Align (default)</th>
                    <th style="text-align:center">Center Align</th>
                    <th style="text-align:right">Right Align</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="text-align:left">React.js</td>
                    <td style="text-align:center">Node.js</td>
                    <td style="text-align:right">MySQL</td>
                </tr>
                <tr>
                    <td style="text-align:left">Next.js</td>
                    <td style="text-align:center">Express</td>
                    <td style="text-align:right">MongoDB</td>
                </tr>
                <tr>
                    <td style="text-align:left">Vue.js</td>
                    <td style="text-align:center">Nest.js</td>
                    <td style="text-align:right">Redis</td>
                </tr>
            </tbody>
        </table>
        <hr>
        <p><a name="tasklist" /></p>
        <h2 id="task-list">Task List</h2>
        <p>Keeping track of the tasks that are done, and those that need to be done.</p>
        <pre><code>-<span class="ruby"> [x] Learn Markdown
</span>-<span class="ruby"> [ ] Learn Frontend Development
</span>-<span class="ruby"> [ ] Learn Full Stack Development</span>
</code></pre>
        <ul>
            <li>[x] Learn Markdown</li>
            <li>[ ] Learn Frontend Development</li>
            <li>[ ] Learn Full Stack Development</li>
        </ul>
        <hr>
        <p><a name="footnote" /></p>
        <h2 id="footnote">Footnote</h2>
        <p>Want to describe something at the end of the file? Use footnote!</p>
        <pre><code>#### I am working on a new project. [^<span class="hljs-number">1</span>]
[^<span class="hljs-number">1</span>]: Stack is: React, Typescript, Tailwind CSS  

Project is about music &amp; movies.

##### Hope you will like it. [^see]
[^see]: Loading... ⌛️
</code></pre>
        <h4 id="i-am-working-on-a-new-project-1-">I am working on a new project. [^1]</h4>
        <p>[^1]: Stack is: React, Typescript, Tailwind CSS </p>
        <p>Project is about music &amp; movies.</p>
        <h5 id="hope-you-will-like-it-see-">Hope you will like it. [^see]</h5>
        <p>[^see]: Loading... ⌛️</p>
        <hr>
        <p><a name="sectionjump" /></p>
        <h2 id="jump-to-section">Jump to section</h2>
        <p>You can give ID to a section so that you can jump straight to that part of the file from wherever you are.</p>
        <pre><code>[<span class="hljs-string">Jump to a section with custom ID</span>](<span class="hljs-link">#some-id</span>)

...

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"some-id"</span> /&gt;</span></span>

<span class="hljs-section">##### Section with some ID</span>
</code></pre>
        <p><a href="#some-id">Jump to a section with custom ID</a></p>
        <hr>
        <p><a name="horizontalline" /></p>
        <h2 id="horizontal-line">Horizontal Line</h2>
        <p>You can use asterisks, hyphens or underlines (*, -, _) to create horizontal line.<br>The only rule is that you
            must include at least three chars of the symbol.</p>
        <pre><code>First Horizontal Line

<span class="hljs-emphasis">***</span>

Second One

-----

Third

<span class="hljs-strong">_____</span><span class="hljs-emphasis">___</span>_
</code></pre>
        <p>First Horizontal Line</p>
        <hr>
        <p>Second One</p>
        <hr>
        <p>Third</p>
        <hr>
        <hr>
        <p><a name="html" /></p>
        <h2 id="html">HTML</h2>
        <p>You can also use raw HTML in your Markdown file. Most of the times that will work well, but sometimes you can
            experience some differences that you are not used to when working with standard HTML. Using CSS will not work.
        </p>
        <pre><code><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is a heading<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Paragraph...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">hr</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"auto-generated-path-to-file-when-you-upload-image"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://github.com/im-luka"</span>&gt;</span>Follow me on GitHub<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Quick hack for <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>centering image<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">align</span>=<span class="hljs-string">"center"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"auto-generated-path-to-file-when-you-upload-image"</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>One more quick hack? 🎭<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>

  → Easy  
  → And simple
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
        <p>
        <h1>This is a heading</h1>
        </p>
        <p>Paragraph...</p>

        <hr />
        <p>Quick hack for <strong><em>centering image</em></strong>?</p>
        <p align="center"><img
                src="https://user-images.githubusercontent.com/46372998/212544874-d0654588-82f7-44f2-bbfa-2bf85fd73854.png"
                width="200" /></p>
    </div>
</template>
<script lang="ts" setup>
</script>