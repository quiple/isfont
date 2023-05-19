/* Parse TTF & WOFF fonts © 2021, 2022 Jan Bobrowski */

if (typeof exports == 'object') {
  exports.font_info = font_info
  inflate = require('./inflate.m').inflate
}

/*
 tables:
  true: required
  false: optional
  missing: ignored
 Replaced with actual table raw data.
 eg. tables = { head: true, maxp: true, cmap: true, name: true, GPOS: false, GSUB: false }
*/

function unicodeRange1(arr) {
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '0': arr[i] = 'Basic Latin'; break;
      case '1': arr[i] = 'Latin-1 Supplement'; break;
      case '2': arr[i] = 'Latin Extended-A'; break;
      case '3': arr[i] = 'Latin Extended-B'; break;
      case '4': arr[i] = 'IPA / Phonetic Extensions (& Supplement)'; break;
      case '5': arr[i] = 'Spacing Modifier / Modifier Tone Letters'; break;
      case '6': arr[i] = 'Combining Diacritical Marks (& Supplement)'; break;
      case '7': arr[i] = 'Greek and Coptic'; break;
      case '8': arr[i] = 'Coptic'; break;
      case '9': arr[i] = 'Cyrillic (& Supplement / Extended-A/B)'; break;
      case '10': arr[i] = 'Armenian'; break;
      case '11': arr[i] = 'Hebrew'; break;
      case '12': arr[i] = 'Vai'; break;
      case '13': arr[i] = 'Arabic (& Supplement)'; break;
      case '14': arr[i] = 'NKo'; break;
      case '15': arr[i] = 'Devanagari'; break;
      case '16': arr[i] = 'Bengali'; break;
      case '17': arr[i] = 'Gurmukhi'; break;
      case '18': arr[i] = 'Gujarati'; break;
      case '19': arr[i] = 'Oriya'; break;
      case '20': arr[i] = 'Tamil'; break;
      case '21': arr[i] = 'Telugu'; break;
      case '22': arr[i] = 'Kannada'; break;
      case '23': arr[i] = 'Malayalam'; break;
      case '24': arr[i] = 'Thai'; break;
      case '25': arr[i] = 'Lao'; break;
      case '26': arr[i] = 'Georgian (& Supplement)'; break;
      case '27': arr[i] = 'Balinese'; break;
      case '28': arr[i] = 'Hangul Jamo'; break;
      case '29': arr[i] = 'Latin Extended Additional / Extended-C/D'; break;
      case '30': arr[i] = 'Greek Extended'; break;
      case '31': arr[i] = 'General / Supplemental Punctuation'; break;
    }
  }
  return arr.join('<br>');
}

function unicodeRange2(arr) {
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '0': arr[i] = 'Superscripts and Subscripts'; break;
      case '1': arr[i] = 'Currency Symbols'; break;
      case '2': arr[i] = 'Combining Diacritical Marks For Symbols'; break;
      case '3': arr[i] = 'Letterlike Symbols'; break;
      case '4': arr[i] = 'Number Forms'; break;
      case '5': arr[i] = 'Arrows / Supplemental Arrows-A/B / Miscellaneous Symbols and Arrows'; break;
      case '6': arr[i] = 'Mathematical / Supplemental Mathematical Operators / Miscellaneous Mathematical Symbols-A/B'; break;
      case '7': arr[i] = 'Miscellaneous Technical'; break;
      case '8': arr[i] = 'Control Pictures'; break;
      case '9': arr[i] = 'Optical Character Recognition'; break;
      case '10': arr[i] = 'Enclosed Alphanumerics'; break;
      case '11': arr[i] = 'Box Drawing'; break;
      case '12': arr[i] = 'Block Elements'; break;
      case '13': arr[i] = 'Geometric Shapes'; break;
      case '14': arr[i] = 'Miscellaneous Symbols'; break;
      case '15': arr[i] = 'Dingbats'; break;
      case '16': arr[i] = 'CJK Symbols and Punctuation'; break;
      case '17': arr[i] = 'Hiragana'; break;
      case '18': arr[i] = 'Katakana (& Phonetic Extensions)'; break;
      case '19': arr[i] = 'Bopomofo (& Extended)'; break;
      case '20': arr[i] = 'Hangul Compatibility Jamo'; break;
      case '21': arr[i] = 'Phags-pa'; break;
      case '22': arr[i] = 'Enclosed CJK Letters and Months'; break;
      case '23': arr[i] = 'CJK Compatibility'; break;
      case '24': arr[i] = 'Hangul Syllables'; break;
      case '25': arr[i] = 'Non-Plane 0'; break;
      case '26': arr[i] = 'Phoenician'; break;
      case '27': arr[i] = 'CJK Unified Ideographs (& Extension A/B) / Radicals Supplement / Kangxi Radicals / Ideographic Description Characters / Kanbun'; break;
      case '28': arr[i] = 'Private Use Area (plane 0)'; break;
      case '29': arr[i] = 'CJK Strokes / Compatibility Ideographs (& Supplement)'; break;
      case '30': arr[i] = 'Alphabetic Presentation Forms'; break;
      case '31': arr[i] = 'Arabic Presentation Forms-A'; break;
    }
  }
  return arr.join('<br>');
}

function unicodeRange3(arr) {
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '0': arr[i] = 'Combining Half Marks'; break;
      case '1': arr[i] = 'Vertical Forms'; break;
      case '2': arr[i] = 'Small Form Variants'; break;
      case '3': arr[i] = 'Arabic Presentation Forms-B'; break;
      case '4': arr[i] = 'Halfwidth and Fullwidth Forms'; break;
      case '5': arr[i] = 'Specials'; break;
      case '6': arr[i] = 'Tibetan'; break;
      case '7': arr[i] = 'Syriac'; break;
      case '8': arr[i] = 'Thaana'; break;
      case '9': arr[i] = 'Sinhala'; break;
      case '10': arr[i] = 'Myanmar'; break;
      case '11': arr[i] = 'Ethiopic (& Supplement / Extended)'; break;
      case '12': arr[i] = 'Cherokee'; break;
      case '13': arr[i] = 'Unified Canadian Aboriginal Syllabics'; break;
      case '14': arr[i] = 'Ogham'; break;
      case '15': arr[i] = 'Runic'; break;
      case '16': arr[i] = 'Khmer (& Symbols)'; break;
      case '17': arr[i] = 'Mongolian'; break;
      case '18': arr[i] = 'Braille Patterns'; break;
      case '19': arr[i] = 'Yi Syllables / Radicals'; break;
      case '20': arr[i] = 'Tagalog / Hanunoo / Buhid / Tagbanwa'; break;
      case '21': arr[i] = 'Old Italic'; break;
      case '22': arr[i] = 'Gothic'; break;
      case '23': arr[i] = 'Deseret'; break;
      case '24': arr[i] = 'Byzantine Musical / Musical Symbols / Ancient Greek Musical Notation'; break;
      case '25': arr[i] = 'Mathematical Alphanumeric Symbols'; break;
      case '26': arr[i] = 'Private Use (plane 15/16)'; break;
      case '27': arr[i] = 'Variation Selectors (& Supplement)'; break;
      case '28': arr[i] = 'Tags'; break;
      case '29': arr[i] = 'Limbu'; break;
      case '30': arr[i] = 'Tai Le'; break;
      case '31': arr[i] = 'New Tai Lue'; break;
    }
  }
  return arr.join('<br>');
}

function unicodeRange4(arr) {
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '0': arr[i] = 'Buginese'; break;
      case '1': arr[i] = 'Glagolitic'; break;
      case '2': arr[i] = 'Tifinagh'; break;
      case '3': arr[i] = 'Yijing Hexagram Symbols'; break;
      case '4': arr[i] = 'Syloti Nagri'; break;
      case '5': arr[i] = 'Linear B Syllabary (& Ideograms) / Aegean Numbers'; break;
      case '6': arr[i] = 'Ancient Greek Numbers'; break;
      case '7': arr[i] = 'Ugaritic'; break;
      case '8': arr[i] = 'Old Persian'; break;
      case '9': arr[i] = 'Shavian'; break;
      case '10': arr[i] = 'Osmanya'; break;
      case '11': arr[i] = 'Cypriot Syllabary'; break;
      case '12': arr[i] = 'Kharoshthi'; break;
      case '13': arr[i] = 'Tai Xuan Jing Symbols'; break;
      case '14': arr[i] = 'Cuneiform (& Numbers and Punctuation)'; break;
      case '15': arr[i] = 'Counting Rod Numerals'; break;
      case '16': arr[i] = 'Sundanese'; break;
      case '17': arr[i] = 'Lepcha'; break;
      case '18': arr[i] = 'Ol Chiki'; break;
      case '19': arr[i] = 'Saurashtra'; break;
      case '20': arr[i] = 'Kayah Li'; break;
      case '21': arr[i] = 'Rejang'; break;
      case '22': arr[i] = 'Cham'; break;
      case '23': arr[i] = 'Ancient Symbols'; break;
      case '24': arr[i] = 'Phaistos Disc'; break;
      case '25': arr[i] = 'Carian / Lycian / Lydian'; break;
      case '26': arr[i] = 'Domino / Mahjong Tiles'; break;
    }
  }
  return arr.join('<br>');
}

function codePageRange1(arr) {
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '0': arr[i] = 'Latin 1'; break;
      case '1': arr[i] = 'Latin 2: Eastern Europe'; break;
      case '2': arr[i] = 'Cyrillic'; break;
      case '3': arr[i] = 'Greek'; break;
      case '4': arr[i] = 'Turkish'; break;
      case '5': arr[i] = 'Hebrew'; break;
      case '6': arr[i] = 'Arabic'; break;
      case '7': arr[i] = 'Windows Baltic'; break;
      case '8': arr[i] = 'Vietnamese'; break;
      case '16': arr[i] = 'Thai'; break;
      case '17': arr[i] = 'JIS / Japan'; break;
      case '18': arr[i] = 'Chinese: Simplified chars — PRC and Singapore'; break;
      case '19': arr[i] = 'Korean Wansung'; break;
      case '20': arr[i] = 'Chinese: Traditional chars — Taiwan and Hong Kong'; break;
      case '21': arr[i] = 'Korean Johab'; break;
      case '29': arr[i] = 'Macintosh Character Set (US Roman)'; break;
      case '30': arr[i] = 'OEM Character Set'; break;
      case '31': arr[i] = 'Symbol Character Set'; break;
    }
  }
  return arr.join('<br>');
}

function codePageRange2(arr) {
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '16': arr[i] = 'IBM Greek'; break;
      case '17': arr[i] = 'MS-DOS Russian'; break;
      case '18': arr[i] = 'MS-DOS Nordic'; break;
      case '19': arr[i] = 'Arabic'; break;
      case '20': arr[i] = 'MS-DOS Canadian French'; break;
      case '21': arr[i] = 'Hebrew'; break;
      case '22': arr[i] = 'MS-DOS Icelandic'; break;
      case '23': arr[i] = 'MS-DOS Portuguese'; break;
      case '24': arr[i] = 'IBM Turkish'; break;
      case '25': arr[i] = 'IBM Cyrillic; primarily Russian'; break;
      case '26': arr[i] = 'Latin 2'; break;
      case '27': arr[i] = 'MS-DOS Baltic'; break;
      case '28': arr[i] = 'Greek; former 437 G'; break;
      case '29': arr[i] = 'Arabic; ASMO 708'; break;
      case '30': arr[i] = 'WE / Latin 1'; break;
      case '31': arr[i] = 'US'; break;
    }
  }
  return arr.join('<br>');
}

function panose1(i) {
  switch (i) {
    case 0: return 'Any'; break;
    case 1: return 'No Fit'; break;
    case 2: return 'Latin Text'; break;
    case 3: return 'Latin Handwritten'; break;
    case 4: return 'Latin Decorative'; break;
    case 5: return 'Latin Symbol'; break;
    default: return i; break;
  }
}

function panose2(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Cove'; break;
      case 3: return 'Obtuse Cove'; break;
      case 4: return 'Square Cove'; break;
      case 5: return 'Obtuse Square Cove'; break;
      case 6: return 'Square'; break;
      case 7: return 'Thin'; break;
      case 8: return 'Oval'; break;
      case 9: return 'Exaggerated'; break;
      case 10: return 'Triangle'; break;
      case 11: return 'Normal Sans'; break;
      case 12: return 'Obtuse Sans'; break;
      case 13: return 'Perpendicular Sans'; break;
      case 14: return 'Flared'; break;
      case 15: return 'Rounded'; break;
      default: return i; break;
    }
  } else if (p == 3) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Flat Nib'; break;
      case 3: return 'Pressure Point'; break;
      case 4: return 'Engraved'; break;
      case 5: return 'Ball (Round Cap)'; break;
      case 6: return 'Brush'; break;
      case 7: return 'Rough'; break;
      case 8: return 'Felt Pen / Brush Tip'; break;
      case 9: return 'Wild Brush - Drips a lot'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Derivative'; break;
      case 3: return 'Non-standard Topology'; break;
      case 4: return 'Non-standard Elements'; break;
      case 5: return 'Non-standard Aspect'; break;
      case 6: return 'Initials'; break;
      case 7: return 'Cartoon'; break;
      case 8: return 'Picture Stems'; break;
      case 9: return 'Ornamented'; break;
      case 10: return 'Text and Background'; break;
      case 11: return 'Collage'; break;
      case 12: return 'Montage'; break;
      default: return i; break;
    }
  } else if (p == 5) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Montages'; break;
      case 3: return 'Pictures'; break;
      case 4: return 'Shapes'; break;
      case 5: return 'Scientific'; break;
      case 6: return 'Music'; break;
      case 7: return 'Expert'; break;
      case 8: return 'Patterns'; break;
      case 9: return 'Boarders'; break;
      case 10: return 'Icons'; break;
      case 11: return 'Logos'; break;
      case 12: return 'Industry Specific'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose3(p, i) {
  if (p == 2 || p == 3 || p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Very Light'; break;
      case 3: return 'Light'; break;
      case 4: return 'Thin'; break;
      case 5: return 'Book'; break;
      case 6: return 'Medium'; break;
      case 7: return 'Demi'; break;
      case 8: return 'Bold'; break;
      case 9: return 'Heavy'; break;
      case 10: return 'Black'; break;
      case 11: return 'Extra Black (Nord)'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose4(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Old Style'; break;
      case 3: return 'Modern'; break;
      case 4: return 'Even Width'; break;
      case 5: return 'Extended'; break;
      case 6: return 'Condensed'; break;
      case 7: return 'Very Extended'; break;
      case 8: return 'Very Condensed'; break;
      case 9: return 'Monospaced'; break;
      default: return i; break;
    }
  } else if (p == 3 || p == 5) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Proportional Spaced'; break;
      case 3: return 'Monospaced'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Super Condensed'; break;
      case 3: return 'Very Condensed'; break;
      case 4: return 'Condensed'; break;
      case 5: return 'Normal'; break;
      case 6: return 'Extended'; break;
      case 7: return 'Very Extended'; break;
      case 8: return 'Super Extended'; break;
      case 9: return 'Monospaced'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose5(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'None'; break;
      case 3: return 'Very Low'; break;
      case 4: return 'Low'; break;
      case 5: return 'Medium Low'; break;
      case 6: return 'Medium'; break;
      case 7: return 'Medium High'; break;
      case 8: return 'High'; break;
      case 9: return 'Very High'; break;
      default: return i; break;
    }
  } else if (p == 3) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Very Condensed'; break;
      case 3: return 'Condensed'; break;
      case 4: return 'Normal'; break;
      case 5: return 'Expanded'; break;
      case 6: return 'Very Expanded'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'None'; break;
      case 3: return 'Very Low'; break;
      case 4: return 'Low'; break;
      case 5: return 'Medium Low'; break;
      case 6: return 'Medium'; break;
      case 7: return 'Medium High'; break;
      case 8: return 'High'; break;
      case 9: return 'Very High'; break;
      case 10: return 'Horizontal Low'; break;
      case 11: return 'Horizontal Medium'; break;
      case 12: return 'Horizontal High'; break;
      case 13: return 'Broken'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose6(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'No Variation'; break;
      case 3: return 'Gradual / Diagonal'; break;
      case 4: return 'Gradual / Transitional'; break;
      case 5: return 'Gradual / Vertical'; break;
      case 6: return 'Gradual / Horizontal'; break;
      case 7: return 'Rapid / Vertical'; break;
      case 8: return 'Rapid / Horizontal'; break;
      case 9: return 'Instant / Vertical'; break;
      case 10: return 'Instant / Horizontal'; break;
      default: return i; break;
    }
  } else if (p == 3) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'None'; break;
      case 3: return 'Very Low'; break;
      case 4: return 'Low'; break;
      case 5: return 'Medium Low'; break;
      case 6: return 'Medium'; break;
      case 7: return 'Medium High'; break;
      case 8: return 'High'; break;
      case 9: return 'Very High'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Cove'; break;
      case 3: return 'Obtuse Cove'; break;
      case 4: return 'Square Cove'; break;
      case 5: return 'Obtuse Square Cove'; break;
      case 6: return 'Square'; break;
      case 7: return 'Thin'; break;
      case 8: return 'Oval'; break;
      case 9: return 'Exaggerated'; break;
      case 10: return 'Triangle'; break;
      case 11: return 'Normal Sans'; break;
      case 12: return 'Obtuse Sans'; break;
      case 13: return 'Perpendicular Sans'; break;
      case 14: return 'Flared'; break;
      case 15: return 'Rounded'; break;
      case 16: return 'Script'; break;
      default: return i; break;
    }
  } else if (p == 5) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'No Width'; break;
      case 3: return 'Exceptionally Wide'; break;
      case 4: return 'Super Wide'; break;
      case 5: return 'Very Wide'; break;
      case 6: return 'Wide'; break;
      case 7: return 'Normal'; break;
      case 8: return 'Narrow'; break;
      case 9: return 'Very Narrow'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose7(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Straight Arms / Horizontal'; break;
      case 3: return 'Straight Arms / Wedge'; break;
      case 4: return 'Straight Arms / Vertical'; break;
      case 5: return 'Straight Arms / Single Serif'; break;
      case 6: return 'Straight Arms / Double Serif'; break;
      case 7: return 'Non-Straight / Horizontal'; break;
      case 8: return 'Non-Straight / Wedge'; break;
      case 9: return 'Non-Straight / Vertical'; break;
      case 10: return 'Non-Straight / Single Serif'; break;
      case 11: return 'Non-Straight / Double Serif'; break;
      default: return i; break;
    }
  } else if (p == 3) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Roman Disconnected'; break;
      case 3: return 'Roman Trailing'; break;
      case 4: return 'Roman Connected'; break;
      case 5: return 'Cursive Disconnected'; break;
      case 6: return 'Cursive Trailing'; break;
      case 7: return 'Cursive Connected'; break;
      case 8: return 'Blackletter Disconnected'; break;
      case 9: return 'Blackletter Trailing'; break;
      case 10: return 'Blackletter Connected'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'None - Standard Solid Fill'; break;
      case 3: return 'White / No Fill'; break;
      case 4: return 'Patterned Fill'; break;
      case 5: return 'Complex Fill'; break;
      case 6: return 'Shaped Fill'; break;
      case 7: return 'Drawn / Distressed'; break;
      default: return i; break;
    }
  } else if (p == 5) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'No Width'; break;
      case 3: return 'Exceptionally Wide'; break;
      case 4: return 'Super Wide'; break;
      case 5: return 'Very Wide'; break;
      case 6: return 'Wide'; break;
      case 7: return 'Normal'; break;
      case 8: return 'Narrow'; break;
      case 9: return 'Very Narrow'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose8(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Normal / Contact'; break;
      case 3: return 'Normal / Weighted'; break;
      case 4: return 'Normal / Boxed'; break;
      case 5: return 'Normal / Flattened'; break;
      case 6: return 'Normal / Rounded'; break;
      case 7: return 'Normal / Off Center'; break;
      case 8: return 'Normal / Square'; break;
      case 9: return 'Oblique / Contact'; break;
      case 10: return 'Oblique / Weighted'; break;
      case 11: return 'Oblique / Boxed'; break;
      case 12: return 'Oblique / Flattened'; break;
      case 13: return 'Oblique / Rounded'; break;
      case 14: return 'Oblique / Off Center'; break;
      case 15: return 'Oblique / Square'; break;
      default: return i; break;
    }
  } else if (p == 3) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Upright / No Wrapping'; break;
      case 3: return 'Upright / Some Wrapping'; break;
      case 4: return 'Upright / More Wrapping'; break;
      case 5: return 'Upright / Extreme Wrapping'; break;
      case 6: return 'Oblique / No Wrapping'; break;
      case 7: return 'Oblique / Some Wrapping'; break;
      case 8: return 'Oblique / More Wrapping'; break;
      case 9: return 'Oblique / Extreme Wrapping'; break;
      case 10: return 'Exaggerated / No Wrapping'; break;
      case 11: return 'Exaggerated / Some Wrapping'; break;
      case 12: return 'Exaggerated / More Wrapping'; break;
      case 13: return 'Exaggerated / Extreme Wrapping'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'None'; break;
      case 3: return 'Inline'; break;
      case 4: return 'Outline'; break;
      case 5: return 'Engraved (Multiple Lines)'; break;
      case 6: return 'Shadow'; break;
      case 7: return 'Relief'; break;
      case 8: return 'Backdrop'; break;
      default: return i; break;
    }
  } else if (p == 5) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'No Width'; break;
      case 3: return 'Exceptionally Wide'; break;
      case 4: return 'Super Wide'; break;
      case 5: return 'Very Wide'; break;
      case 6: return 'Wide'; break;
      case 7: return 'Normal'; break;
      case 8: return 'Narrow'; break;
      case 9: return 'Very Narrow'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose9(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Standard / Trimmed'; break;
      case 3: return 'Standard / Pointed'; break;
      case 4: return 'Standard / Serifed'; break;
      case 5: return 'High / Trimmed'; break;
      case 6: return 'High / Pointed'; break;
      case 7: return 'High / Serifed'; break;
      case 8: return 'Constant / Trimmed'; break;
      case 9: return 'Constant / Pointed'; break;
      case 10: return 'Constant / Serifed'; break;
      case 11: return 'Low / Trimmed'; break;
      case 12: return 'Low / Pointed'; break;
      case 13: return 'Low / Serifed'; break;
      default: return i; break;
    }
  } else if (p == 3) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'None / No Loops'; break;
      case 3: return 'None / Closed Loops'; break;
      case 4: return 'None / Open Loops'; break;
      case 5: return 'Sharp / No Loops'; break;
      case 6: return 'Sharp / Closed Loops'; break;
      case 7: return 'Sharp / Open Loops'; break;
      case 8: return 'Tapered / No Loops'; break;
      case 9: return 'Tapered / Closed Loops'; break;
      case 10: return 'Tapered / Open Loops'; break;
      case 11: return 'Round / No Loops'; break;
      case 12: return 'Round / Closed Loops'; break;
      case 13: return 'Round / Open Loops'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Standard'; break;
      case 3: return 'Square'; break;
      case 4: return 'Multiple Segment'; break;
      case 5: return 'Deco (E,M,S) Waco midlines'; break;
      case 6: return 'Uneven Weighting'; break;
      case 7: return 'Diverse Arms'; break;
      case 8: return 'Diverse Forms'; break;
      case 9: return 'Lombardic Forms'; break;
      case 10: return 'Upper Case in Lower Case'; break;
      case 11: return 'Implied Topology'; break;
      case 12: return 'Horseshoe E and A'; break;
      case 13: return 'Cursive'; break;
      case 14: return 'Blackletter'; break;
      case 15: return 'Swash Variance'; break;
      default: return i; break;
    }
  } else if (p == 5) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'No Width'; break;
      case 3: return 'Exceptionally Wide'; break;
      case 4: return 'Super Wide'; break;
      case 5: return 'Very Wide'; break;
      case 6: return 'Wide'; break;
      case 7: return 'Normal'; break;
      case 8: return 'Narrow'; break;
      case 9: return 'Very Narrow'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function panose10(p, i) {
  if (p == 2) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Constant / Small'; break;
      case 3: return 'Constant / Standard'; break;
      case 4: return 'Constant / Large'; break;
      case 5: return 'Ducking / Small'; break;
      case 6: return 'Ducking / Standard'; break;
      case 7: return 'Ducking / Large'; break;
      default: return i; break;
    }
  } else if (p == 3) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Very Low'; break;
      case 3: return 'Low'; break;
      case 4: return 'Medium'; break;
      case 5: return 'High'; break;
      case 6: return 'Very High'; break;
      default: return i; break;
    }
  } else if (p == 4) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'Extended Collection'; break;
      case 3: return 'Litterals'; break;
      case 4: return 'No Lower Case'; break;
      case 5: return 'Small Caps'; break;
      default: return i; break;
    }
  } else if (p == 5) {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      case 2: return 'No Width'; break;
      case 3: return 'Exceptionally Wide'; break;
      case 4: return 'Super Wide'; break;
      case 5: return 'Very Wide'; break;
      case 6: return 'Wide'; break;
      case 7: return 'Normal'; break;
      case 8: return 'Narrow'; break;
      case 9: return 'Very Narrow'; break;
      default: return i; break;
    }
  } else {
    switch (i) {
      case 0: return 'Any'; break;
      case 1: return 'No Fit'; break;
      default: return i; break;
    }
  }
}

function font_info(body, tables) {
  // 추가 내용 시작
  const uint8 = (b, o) => b[o];
  const int8 = (b, o) => (uint8(b, o) ^ 0x80) - 0x80;
  const uint16 = (b, o) => b[o] << 8 | b[o + 1];
  const int16 = (b, o) => (uint16(b, o) ^ 0x8000) - 0x8000;
  const uint32 = (b, o) => (uint16(b, o) << 16 | uint16(b, o + 2)) >>> 0;
  const int32 = (b, o) => uint16(b, o) << 16 | uint16(b, o + 2);
  const range32 = (b, o) => Object.keys(Object.fromEntries(Object.entries(Object.assign({}, uint32(b, o).toString(2).padStart(32, '0').split('').reverse())).filter(([, x]) => x == 1)));
  // 추가 내용 끝
  const g64 = (b, o) => 0x10000 * 0x10000 * uint32(b, o) + uint32(b, o + 4)
  const gstr = (b, o, n) => String.fromCharCode.apply(String, b.subarray(o, o + n))

  var dir = []
  var v = gstr(body, 0, 4)
  var type
  if (v == '\0\1\0\0' || v == 'true' || v == 'typ1' || v == 'OTTO') {
    dir = [4, 12, 16, 8, 12]
    type = 'TTF'
  } else if (v == 'wOFF') {
    type = 'WOFF'
    dir = [12, 44, 20, 4, 8, 12]
  } else if (v == 'wOF2')
    throw 'WOFF2 is not supported'
  else
    throw 'Not a font'

  var [count, pos, step, o_ofs, o_size, o_len] = dir
  count = uint16(body, count)
  if (!count)
    throw 'Bad font'
  do {
    var id = gstr(body, pos, 4)
    if (id in tables) {
      var ofs = uint32(body, pos + o_ofs)
      var size = uint32(body, pos + o_size)
      if (ofs + size > body.length)
        return 'Font truncated'
      var data = body.slice(ofs, ofs + size)
      if (o_len) {
        var len = uint32(body, pos + o_len)
        if (size < len) {
          var zdata = data
          var data = new Uint8Array(len)
          var i = 2, j = 0
          inflate(
            () => zdata[i++],
            v => data[j++] = v
          )
        }
      }
      tables[id] = data
    }
    pos += step
  } while (--count)

  for (var v in tables) {
    var tab = tables[v]
    if (tab && !tab.length)
      throw `No "${v}" table`
  }

  var font = { type }

  var tab = tables.name
  if (tab) {
    var strings = {}
    for (var iter = 0; iter < 2; iter++) {
      var end = 6 + 12 * uint16(tab, 2)
      for (var pos = 6; pos < end; pos += 12) {
        var [pe, lang, id] = [uint32(tab, pos), uint16(tab, pos + 4), uint16(tab, pos + 6)]

        // plat enc lang : priority
        // 00030001 0409 : 3 (we prefer English)
        // 00030001 *    : 2
        // 00010000 *    : 1

        var priority =
          pe == 0x10000 ? 1 :
            pe == 0x30001 ? (lang == 0x409 ? 3 : 2) : 0

        if (iter == 0) {
          if (priority > (strings[id] || 0))
            strings[id] = priority
        } else {
          if (priority == strings[id]) {
            var ofs = uint16(tab, 4) + uint16(tab, pos + 10)
            var size = uint16(tab, pos + 8)
            strings[id] = new TextDecoder(pe == 0x30001 ? 'utf-16be' : 'macintosh').decode(tab.slice(ofs, ofs + size))
          }
        }
      }
    }
    font.name = strings[4]
    font.strings = strings
  }

  const read_date = (name, pos) => {
    var d = g64(tab, pos)
    if (d)
      font[name] = new Date(1e3 * (d - 2082844800))
  }

  var tab = tables.head
  font.em = uint16(tab, 18)
  read_date('created', 20)
  read_date('modified', 28)

  var tab = tables.maxp
  font.num_glyphs = uint16(tab, 4)

  var tab = tables.cmap
  var cmap_ofs = []
  var end = 4 + 8 * uint16(tab, 2)
  for (var pos = 4; pos < end; pos += 8) {
    var pe = uint32(tab, pos)
    if (pe == 0x30001 || pe == 0x3000a) {
      var offset = uint32(tab, pos + 4)
      var format = uint16(tab, offset)
      cmap_ofs[format] = offset
    }
  }

  var ranges

  const add_range = (first, last) => {
    var len = last - first + 1
    if (len <= 0)
      return
    var prev = ranges[ranges.length - 1]
    if (prev && prev[0] + prev[1] == first)
      prev[1] += len
    else
      ranges.push([first, len])
  }

  var pos = cmap_ofs[4]
  if (pos) {
    ranges = []
    var v = uint16(tab, pos + 6)
    var count = v >> 1
    var o_start = 2 + v
    var o_delta = o_start + v
    var o_ofs = o_delta + v
    pos += 14
    for (; count--; pos += 2) {
      var [last, first, delta, ofs] = [uint16(tab, pos), uint16(tab, pos + o_start), uint16(tab, pos + o_delta), uint16(tab, pos + o_ofs)]
      if (!ofs) {
        var i = -delta & 0xffff
        if (i >= first && i <= last) {
          add_range(first, i - 1)
          first = i + 1
        }
      } else {
        var array_pos = pos + o_ofs + ofs
        for (var i = first; i <= last; i++) {
          var v = uint16(tab, array_pos)
          if (!v || !(v + delta & 0xffff)) {
            add_range(first, i - 1)
            first = i + 1
          }
          array_pos += 2
        }
      }
      add_range(first, last)
    }
  }

  var pos = cmap_ofs[12]
  if (pos) {
    ranges = ranges || []
    var count = uint32(tab, pos + 12)
    pos += 16
    for (; count--; pos += 12) {
      var [first, last] = [uint32(tab, pos), uint32(tab, pos + 4)]
      if (cmap_ofs[4] && first < 0x10000)
        first = 0x10000
      add_range(first, last)
    }
  }

  font.ranges = ranges

  var features

  const parse_feature_list = (tab, pos) => {
    features = features || {}
    var featureCount = uint16(tab, pos)
    pos += 2
    for (var i = 0; i < featureCount; i++) {
      var featureTag = gstr(tab, pos, 4)
      features[featureTag] = 1
      pos += 6
    }
  }

  var tab = tables.GPOS
  if (tab) {
    if (uint16(tab, 0) == 1) {
      var featureListOffset = uint16(tab, 6)
      if (featureListOffset)
        parse_feature_list(tab, featureListOffset)
    }
  }

  var tab = tables.GSUB
  if (tab) {
    if (uint16(tab, 0) == 1) {
      var featureListOffset = uint16(tab, 6)
      if (featureListOffset)
        parse_feature_list(tab, featureListOffset)
    }
  }

  var tab = tables.hhea
  if (tab) {
    font.hhea = {
      majorVersion: uint16(tab, 0),
      minorVersion: uint16(tab, 2),
      ascender: int16(tab, 4),
      descender: int16(tab, 6),
      lineGap: int16(tab, 8),
      advanceWidthMax: uint16(tab, 0x0a),
      minLeftSideBearing: int16(tab, 0x0c),
      minRightSideBearing: int16(tab, 0x0e),
      xMaxExtent: int16(tab, 0x10),
      caretSlopeRise: int16(tab, 0x12),
      caretSlopeRun: int16(tab, 0x14),
      caretOffset: int16(tab, 0x16),
      metricDataFormat: int16(tab, 0x20),
      numberOfHMetrics: int16(tab, 0x22),
    }

    var tab = tables['OS/2']
    if (tab) {
      // 추가 내용 시작
      var v = uint16(tab, 0);
      var p = uint8(tab, 0x20);
      font.os2 = {
        version: v,
        xAvgCharWidth: int16(tab, 2),
        usWeightClass: uint16(tab, 4),
        usWidthClass: uint16(tab, 6),
        fsType: uint16(tab, 8),
        ySubscriptXSize: int16(tab, 0x0a),
        ySubscriptYSize: int16(tab, 0x0c),
        ySubscriptXOffset: int16(tab, 0x0e),
        ySubscriptYOffset: int16(tab, 0x10),
        ySuperscriptXSize: int16(tab, 0x12),
        ySuperscriptYSize: int16(tab, 0x14),
        ySuperscriptXOffset: int16(tab, 0x16),
        ySuperscriptYOffset: int16(tab, 0x18),
        yStrikeoutSize: int16(tab, 0x1a),
        yStrikeoutPosition: int16(tab, 0x1c),
        sFamilyClass: int16(tab, 0x1e),
        panoseFamilyType: panose1(p),
        panoseSerifStyle: panose2(p, uint8(tab, 0x21)),
        panoseWeight: panose3(p, uint8(tab, 0x22)),
        panoseProportion: panose4(p, uint8(tab, 0x23)),
        panoseContrast: panose5(p, uint8(tab, 0x24)),
        panoseStrokeVariation: panose6(p, uint8(tab, 0x25)),
        panoseArmStyle: panose7(p, uint8(tab, 0x26)),
        panoseLetterform: panose8(p, uint8(tab, 0x27)),
        panoseMidline: panose9(p, uint8(tab, 0x28)),
        panoseXHeight: panose10(p, uint8(tab, 0x29)),
        ulUnicodeRange: [
          unicodeRange1(range32(tab, 0x2a)),
          unicodeRange2(range32(tab, 0x2e)),
          unicodeRange3(range32(tab, 0x32)),
          unicodeRange4(range32(tab, 0x36))
        ].join('<br>').replace(/(<br>)+$/, ''),
        achVendID: gstr(tab, 0x3a, 4),
        fsSelection: uint16(tab, 0x3e),
        usFirstCharIndex: uint16(tab, 0x40),
        usLastCharIndex: uint16(tab, 0x42),
        sTypoAscender: int16(tab, 0x44),
        sTypoDescender: int16(tab, 0x46),
        sTypoLineGap: int16(tab, 0x48),
        usWinAscent: uint16(tab, 0x4a),
        usWinDescent: uint16(tab, 0x4c)
      }
      if (v >= 1) {
        font.os21 = {
          ulCodePageRange: [
            codePageRange1(range32(tab, 0x4e)),
            codePageRange2(range32(tab, 0x52))
          ].join('<br>').replace(/(<br>)+$/, '')
        }
        font.os2 = { ...font.os2, ...font.os21 }
      }
      if (v >= 4) {
        font.os24 = {
          sxHeight: int16(tab, 0x56),
          sCapHeight: int16(tab, 0x58),
          usDefaultChar: uint16(tab, 0x5a),
          usBreakChar: uint16(tab, 0x5c),
          usMaxContext: uint16(tab, 0x5e)
        }
        font.os2 = { ...font.os2, ...font.os24 }
      }
      if (v >= 5) {
        font.os25 = {
          usLowerOpticalPointSize: uint16(tab, 0x60),
          usUpperOpticalPointSize: uint16(tab, 0x62)
        }
        font.os2 = { ...font.os2, ...font.os25 }
      }
      // 추가 내용 끝
    }
  }

  if (features)
    font.features = Object.keys(features)

  return font
}
