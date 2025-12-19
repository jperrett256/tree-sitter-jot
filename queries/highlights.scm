; Headings
(heading
  level: (_) @markup.heading.marker
  content: (paragraph) @markup.heading)

; Inline tags
(inline_tag
  "@" @punctuation.special
  name: (identifier) @function
  "{" @punctuation.bracket
  "}" @punctuation.bracket)

(inline_tag
  "[" @punctuation.bracket
  args: (_) @parameter
  "]" @punctuation.bracket)

; Block tags
(block_tag
  begin: (_) @punctuation.delimiter
  name: (identifier) @function
  end: (_) @punctuation.delimiter)

(block_tag
  "[" @punctuation.bracket
  args: (_) @parameter
  "]" @punctuation.bracket)

; Raw strings
(raw_string
  "@" @punctuation.special
  content: (_) @string)

; Other elements
(text) @text
(escape_sequence) @string.escape
