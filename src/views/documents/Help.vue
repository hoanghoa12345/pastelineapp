<template>
  <div class="prose lg:prose-xl dark:prose-invert mx-auto px-4" v-once>
    <blockquote>
      <p>Milkdown is a WYSIWYG markdown editor framework.</p>
    </blockquote>
    <p>
      You can check the output markdown text in
      <strong>two columns editing</strong>.
    </p>
    <ul>
      <li>
        Features
        <ul>
          <li>
            [x] 📝 <strong>WYSIWYG Markdown</strong> - Write markdown in an
            elegant way
          </li>
          <li>
            [x] 🎨 <strong>Themable</strong> - Theme can be shared and used with
            npm packages
          </li>
          <li>
            [x] 🎮 <strong>Hackable</strong> - Support your awesome idea by
            plugin
          </li>
          <li>
            [x] 🦾 <strong>Reliable</strong> - Built on top of
            <a href="https://prosemirror.net/">prosemirror</a> and
            <a href="https://github.com/remarkjs/remark">remark</a>
          </li>
          <li>
            [x] ⚡ <strong>Slash &amp; Tooltip</strong> - Write fast for
            everyone, driven by plugin
          </li>
          <li>
            [x] 🧮 <strong>Math</strong> - LaTeX math equations support, driven
            by plugin
          </li>
          <li>
            [x] 📊 <strong>Table</strong> - Table support with fluent ui, driven
            by plugin
          </li>
          <li>
            [x] 📰 <strong>Diagram</strong> - Diagram support with
            <a href="https://mermaid-js.github.io/mermaid/#/">mermaid</a>,
            driven by plugin
          </li>
          <li>
            [x] 🍻 <strong>Collaborate</strong> - Shared editing support with
            <a href="https://docs.yjs.dev/">yjs</a>, driven by plugin
          </li>
          <li>
            [x] 💾 <strong>Clipboard</strong> - Support copy and paste markdown,
            driven by plugin
          </li>
          <li>
            [x] 👍 <strong>Emoji</strong> - Support emoji shortcut and picker,
            driven by plugin
          </li>
        </ul>
      </li>
    </ul>
    <hr />
    <p>You can add <code>inline code</code> and code block:</p>
    <pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello editor!'</span>);
}
</code></pre>
    <blockquote>
      <p>
        Tips: use <code>&lt;mod&gt;+&lt;enter&gt;</code> to exit blocks such as
        code block.
      </p>
    </blockquote>
    <hr />
    <p>You can type <code>|3x2|&lt;space&gt;</code> to create a table:</p>
    <table>
      <thead>
        <tr>
          <th>First Header</th>
          <th style="text-align: center">Second Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Content Cell 1</td>
          <td style="text-align: center">`Content` Cell 1</td>
        </tr>
        <tr>
          <td>Content Cell 2</td>
          <td style="text-align: center"><strong>Content</strong> Cell 2</td>
        </tr>
      </tbody>
    </table>
    <hr />
  </div>
</template>
