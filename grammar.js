/**
 * @file JOT grammar for tree-sitter
 * @author Joshua Perrett <jperrett256@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'jot',

  rules: {
    document: $ => repeat($._block_element),

    _block_element: $ => choice(
      $.heading,
      $.paragraph,
      $.block_tag,
      $.blank_line,
    ),

    blank_line: $ => '\n',

    heading: $ => seq(
      field('level', $.heading_marker),
      ' ',
      field('content', $.paragraph)
    ),

    heading_marker: $ => /#+/,

    paragraph: $ => prec.right(
      repeat1(seq(
        $._inline_content,
        optional('\n')
      ))
    ),

    _inline_content: $ => choice(
      $.text,
      $.inline_tag,
      $.escape_sequence,
      $.raw_string,
    ),

    text: $ => /[^@#{}\\\n]+/,

    raw_string: $ => seq(
      '@',
      field('content', $.raw_string_content)
    ),

    raw_string_content: $ => seq(
      '`',
      /[^`\n]+/,
      '`'
    ),

    escape_sequence: $ => /\\[@{}\\]/,

    inline_tag: $ => seq(
      '@',
      field('name', $.identifier),
      optional(seq(
        '[',
        field('args', $.tag_args),
        ']'
      )),
      '{',
      field('content', $.paragraph),
      '}'
    ),

    block_tag: $ => seq(
      field('begin', $.block_begin),
      field('name', $.identifier),
      optional(seq(
        '[',
        field('args', $.tag_args),
        ']'
      )),
      '\n',
      optional(
        field('content', $.block_content)
      ),
      field('end', $.block_end),
    ),

    block_begin: $ => /@>+/,
    block_end: $ => /@<+/,
    block_content: $ => repeat1($._block_element),

    tag_args: $ => /[^\]]*/,

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_-]*/,
  }
});

