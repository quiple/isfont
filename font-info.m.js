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
  var prefix = 'Family Type: ';
  switch (i) {
    case 0: return prefix + 'Any'; break;
    case 1: return prefix + 'No Fit'; break;
    case 2: return prefix + 'Latin Text'; break;
    case 3: return prefix + 'Latin Handwritten'; break;
    case 4: return prefix + 'Latin Decorative'; break;
    case 5: return prefix + 'Latin Symbol'; break;
    default: return prefix + i; break;
  }
}

function panose2(p, i) {
  var prefix = 'Serif Style: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Cove'; break;
      case 3: return prefix + 'Obtuse Cove'; break;
      case 4: return prefix + 'Square Cove'; break;
      case 5: return prefix + 'Obtuse Square Cove'; break;
      case 6: return prefix + 'Square'; break;
      case 7: return prefix + 'Thin'; break;
      case 8: return prefix + 'Oval'; break;
      case 9: return prefix + 'Exaggerated'; break;
      case 10: return prefix + 'Triangle'; break;
      case 11: return prefix + 'Normal Sans'; break;
      case 12: return prefix + 'Obtuse Sans'; break;
      case 13: return prefix + 'Perpendicular Sans'; break;
      case 14: return prefix + 'Flared'; break;
      case 15: return prefix + 'Rounded'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3) {
    var prefix = 'Tool Type: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Flat Nib'; break;
      case 3: return prefix + 'Pressure Point'; break;
      case 4: return prefix + 'Engraved'; break;
      case 5: return prefix + 'Ball (Round Cap)'; break;
      case 6: return prefix + 'Brush'; break;
      case 7: return prefix + 'Rough'; break;
      case 8: return prefix + 'Felt Pen / Brush Tip'; break;
      case 9: return prefix + 'Wild Brush - Drips a lot'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Class: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Derivative'; break;
      case 3: return prefix + 'Non-standard Topology'; break;
      case 4: return prefix + 'Non-standard Elements'; break;
      case 5: return prefix + 'Non-standard Aspect'; break;
      case 6: return prefix + 'Initials'; break;
      case 7: return prefix + 'Cartoon'; break;
      case 8: return prefix + 'Picture Stems'; break;
      case 9: return prefix + 'Ornamented'; break;
      case 10: return prefix + 'Text and Background'; break;
      case 11: return prefix + 'Collage'; break;
      case 12: return prefix + 'Montage'; break;
      default: return prefix + i; break;
    }
  } else if (p == 5) {
    var prefix = 'Type: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Montages'; break;
      case 3: return prefix + 'Pictures'; break;
      case 4: return prefix + 'Shapes'; break;
      case 5: return prefix + 'Scientific'; break;
      case 6: return prefix + 'Music'; break;
      case 7: return prefix + 'Expert'; break;
      case 8: return prefix + 'Patterns'; break;
      case 9: return prefix + 'Boarders'; break;
      case 10: return prefix + 'Icons'; break;
      case 11: return prefix + 'Logos'; break;
      case 12: return prefix + 'Industry Specific'; break;
      default: return prefix + i; break;
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
  var prefix = 'Weight: ';
  if (p == 2 || p == 3 || p == 4) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Very Light'; break;
      case 3: return prefix + 'Light'; break;
      case 4: return prefix + 'Thin'; break;
      case 5: return prefix + 'Book'; break;
      case 6: return prefix + 'Medium'; break;
      case 7: return prefix + 'Demi'; break;
      case 8: return prefix + 'Bold'; break;
      case 9: return prefix + 'Heavy'; break;
      case 10: return prefix + 'Black'; break;
      case 11: return prefix + 'Extra Black (Nord)'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function panose4(p, i) {
  var prefix = 'Proportion: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Old Style'; break;
      case 3: return prefix + 'Modern'; break;
      case 4: return prefix + 'Even Width'; break;
      case 5: return prefix + 'Extended'; break;
      case 6: return prefix + 'Condensed'; break;
      case 7: return prefix + 'Very Extended'; break;
      case 8: return prefix + 'Very Condensed'; break;
      case 9: return prefix + 'Monospaced'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3 || p == 5) {
    var prefix = 'Spacing: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Proportional Spaced'; break;
      case 3: return prefix + 'Monospaced'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Aspect Ratio: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Super Condensed'; break;
      case 3: return prefix + 'Very Condensed'; break;
      case 4: return prefix + 'Condensed'; break;
      case 5: return prefix + 'Normal'; break;
      case 6: return prefix + 'Extended'; break;
      case 7: return prefix + 'Very Extended'; break;
      case 8: return prefix + 'Super Extended'; break;
      case 9: return prefix + 'Monospaced'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function panose5(p, i) {
  var prefix = 'Contrast: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'None'; break;
      case 3: return prefix + 'Very Low'; break;
      case 4: return prefix + 'Low'; break;
      case 5: return prefix + 'Medium Low'; break;
      case 6: return prefix + 'Medium'; break;
      case 7: return prefix + 'Medium High'; break;
      case 8: return prefix + 'High'; break;
      case 9: return prefix + 'Very High'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3) {
    var prefix = 'Aspect Ratio: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Very Condensed'; break;
      case 3: return prefix + 'Condensed'; break;
      case 4: return prefix + 'Normal'; break;
      case 5: return prefix + 'Expanded'; break;
      case 6: return prefix + 'Very Expanded'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Contrast: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'None'; break;
      case 3: return prefix + 'Very Low'; break;
      case 4: return prefix + 'Low'; break;
      case 5: return prefix + 'Medium Low'; break;
      case 6: return prefix + 'Medium'; break;
      case 7: return prefix + 'Medium High'; break;
      case 8: return prefix + 'High'; break;
      case 9: return prefix + 'Very High'; break;
      case 10: return prefix + 'Horizontal Low'; break;
      case 11: return prefix + 'Horizontal Medium'; break;
      case 12: return prefix + 'Horizontal High'; break;
      case 13: return prefix + 'Broken'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function panose6(p, i) {
  var prefix = 'Stroke Variation: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'No Variation'; break;
      case 3: return prefix + 'Gradual / Diagonal'; break;
      case 4: return prefix + 'Gradual / Transitional'; break;
      case 5: return prefix + 'Gradual / Vertical'; break;
      case 6: return prefix + 'Gradual / Horizontal'; break;
      case 7: return prefix + 'Rapid / Vertical'; break;
      case 8: return prefix + 'Rapid / Horizontal'; break;
      case 9: return prefix + 'Instant / Vertical'; break;
      case 10: return prefix + 'Instant / Horizontal'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3) {
    var prefix = 'Contrast: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'None'; break;
      case 3: return prefix + 'Very Low'; break;
      case 4: return prefix + 'Low'; break;
      case 5: return prefix + 'Medium Low'; break;
      case 6: return prefix + 'Medium'; break;
      case 7: return prefix + 'Medium High'; break;
      case 8: return prefix + 'High'; break;
      case 9: return prefix + 'Very High'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Serif Variation: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Cove'; break;
      case 3: return prefix + 'Obtuse Cove'; break;
      case 4: return prefix + 'Square Cove'; break;
      case 5: return prefix + 'Obtuse Square Cove'; break;
      case 6: return prefix + 'Square'; break;
      case 7: return prefix + 'Thin'; break;
      case 8: return prefix + 'Oval'; break;
      case 9: return prefix + 'Exaggerated'; break;
      case 10: return prefix + 'Triangle'; break;
      case 11: return prefix + 'Normal Sans'; break;
      case 12: return prefix + 'Obtuse Sans'; break;
      case 13: return prefix + 'Perpendicular Sans'; break;
      case 14: return prefix + 'Flared'; break;
      case 15: return prefix + 'Rounded'; break;
      case 16: return prefix + 'Script'; break;
      default: return prefix + i; break;
    }
  } else if (p == 5) {
    var prefix = 'Aspect Ratio of Character 94: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'No Width'; break;
      case 3: return prefix + 'Exceptionally Wide'; break;
      case 4: return prefix + 'Super Wide'; break;
      case 5: return prefix + 'Very Wide'; break;
      case 6: return prefix + 'Wide'; break;
      case 7: return prefix + 'Normal'; break;
      case 8: return prefix + 'Narrow'; break;
      case 9: return prefix + 'Very Narrow'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function panose7(p, i) {
  var prefix = 'Arm Style: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Straight Arms / Horizontal'; break;
      case 3: return prefix + 'Straight Arms / Wedge'; break;
      case 4: return prefix + 'Straight Arms / Vertical'; break;
      case 5: return prefix + 'Straight Arms / Single Serif'; break;
      case 6: return prefix + 'Straight Arms / Double Serif'; break;
      case 7: return prefix + 'Non-Straight / Horizontal'; break;
      case 8: return prefix + 'Non-Straight / Wedge'; break;
      case 9: return prefix + 'Non-Straight / Vertical'; break;
      case 10: return prefix + 'Non-Straight / Single Serif'; break;
      case 11: return prefix + 'Non-Straight / Double Serif'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3) {
    var prefix = 'Topology: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Roman Disconnected'; break;
      case 3: return prefix + 'Roman Trailing'; break;
      case 4: return prefix + 'Roman Connected'; break;
      case 5: return prefix + 'Cursive Disconnected'; break;
      case 6: return prefix + 'Cursive Trailing'; break;
      case 7: return prefix + 'Cursive Connected'; break;
      case 8: return prefix + 'Blackletter Disconnected'; break;
      case 9: return prefix + 'Blackletter Trailing'; break;
      case 10: return prefix + 'Blackletter Connected'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Treatment: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'None - Standard Solid Fill'; break;
      case 3: return prefix + 'White / No Fill'; break;
      case 4: return prefix + 'Patterned Fill'; break;
      case 5: return prefix + 'Complex Fill'; break;
      case 6: return prefix + 'Shaped Fill'; break;
      case 7: return prefix + 'Drawn / Distressed'; break;
      default: return prefix + i; break;
    }
  } else if (p == 5) {
    var prefix = 'Aspect Ratio of Character 119: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'No Width'; break;
      case 3: return prefix + 'Exceptionally Wide'; break;
      case 4: return prefix + 'Super Wide'; break;
      case 5: return prefix + 'Very Wide'; break;
      case 6: return prefix + 'Wide'; break;
      case 7: return prefix + 'Normal'; break;
      case 8: return prefix + 'Narrow'; break;
      case 9: return prefix + 'Very Narrow'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function panose8(p, i) {
  var prefix = 'Letterform: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Normal / Contact'; break;
      case 3: return prefix + 'Normal / Weighted'; break;
      case 4: return prefix + 'Normal / Boxed'; break;
      case 5: return prefix + 'Normal / Flattened'; break;
      case 6: return prefix + 'Normal / Rounded'; break;
      case 7: return prefix + 'Normal / Off Center'; break;
      case 8: return prefix + 'Normal / Square'; break;
      case 9: return prefix + 'Oblique / Contact'; break;
      case 10: return prefix + 'Oblique / Weighted'; break;
      case 11: return prefix + 'Oblique / Boxed'; break;
      case 12: return prefix + 'Oblique / Flattened'; break;
      case 13: return prefix + 'Oblique / Rounded'; break;
      case 14: return prefix + 'Oblique / Off Center'; break;
      case 15: return prefix + 'Oblique / Square'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3) {
    var prefix = 'Form: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Upright / No Wrapping'; break;
      case 3: return prefix + 'Upright / Some Wrapping'; break;
      case 4: return prefix + 'Upright / More Wrapping'; break;
      case 5: return prefix + 'Upright / Extreme Wrapping'; break;
      case 6: return prefix + 'Oblique / No Wrapping'; break;
      case 7: return prefix + 'Oblique / Some Wrapping'; break;
      case 8: return prefix + 'Oblique / More Wrapping'; break;
      case 9: return prefix + 'Oblique / Extreme Wrapping'; break;
      case 10: return prefix + 'Exaggerated / No Wrapping'; break;
      case 11: return prefix + 'Exaggerated / Some Wrapping'; break;
      case 12: return prefix + 'Exaggerated / More Wrapping'; break;
      case 13: return prefix + 'Exaggerated / Extreme Wrapping'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Lining: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'None'; break;
      case 3: return prefix + 'Inline'; break;
      case 4: return prefix + 'Outline'; break;
      case 5: return prefix + 'Engraved (Multiple Lines)'; break;
      case 6: return prefix + 'Shadow'; break;
      case 7: return prefix + 'Relief'; break;
      case 8: return prefix + 'Backdrop'; break;
      default: return prefix + i; break;
    }
  } else if (p == 5) {
    var prefix = 'Aspect Ratio of Character 157: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'No Width'; break;
      case 3: return prefix + 'Exceptionally Wide'; break;
      case 4: return prefix + 'Super Wide'; break;
      case 5: return prefix + 'Very Wide'; break;
      case 6: return prefix + 'Wide'; break;
      case 7: return prefix + 'Normal'; break;
      case 8: return prefix + 'Narrow'; break;
      case 9: return prefix + 'Very Narrow'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function panose9(p, i) {
  var prefix = 'Midline: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Standard / Trimmed'; break;
      case 3: return prefix + 'Standard / Pointed'; break;
      case 4: return prefix + 'Standard / Serifed'; break;
      case 5: return prefix + 'High / Trimmed'; break;
      case 6: return prefix + 'High / Pointed'; break;
      case 7: return prefix + 'High / Serifed'; break;
      case 8: return prefix + 'Constant / Trimmed'; break;
      case 9: return prefix + 'Constant / Pointed'; break;
      case 10: return prefix + 'Constant / Serifed'; break;
      case 11: return prefix + 'Low / Trimmed'; break;
      case 12: return prefix + 'Low / Pointed'; break;
      case 13: return prefix + 'Low / Serifed'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3) {
    var prefix = 'Finials: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'None / No Loops'; break;
      case 3: return prefix + 'None / Closed Loops'; break;
      case 4: return prefix + 'None / Open Loops'; break;
      case 5: return prefix + 'Sharp / No Loops'; break;
      case 6: return prefix + 'Sharp / Closed Loops'; break;
      case 7: return prefix + 'Sharp / Open Loops'; break;
      case 8: return prefix + 'Tapered / No Loops'; break;
      case 9: return prefix + 'Tapered / Closed Loops'; break;
      case 10: return prefix + 'Tapered / Open Loops'; break;
      case 11: return prefix + 'Round / No Loops'; break;
      case 12: return prefix + 'Round / Closed Loops'; break;
      case 13: return prefix + 'Round / Open Loops'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Topology: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Standard'; break;
      case 3: return prefix + 'Square'; break;
      case 4: return prefix + 'Multiple Segment'; break;
      case 5: return prefix + 'Deco (E,M,S) Waco midlines'; break;
      case 6: return prefix + 'Uneven Weighting'; break;
      case 7: return prefix + 'Diverse Arms'; break;
      case 8: return prefix + 'Diverse Forms'; break;
      case 9: return prefix + 'Lombardic Forms'; break;
      case 10: return prefix + 'Upper Case in Lower Case'; break;
      case 11: return prefix + 'Implied Topology'; break;
      case 12: return prefix + 'Horseshoe E and A'; break;
      case 13: return prefix + 'Cursive'; break;
      case 14: return prefix + 'Blackletter'; break;
      case 15: return prefix + 'Swash Variance'; break;
      default: return prefix + i; break;
    }
  } else if (p == 5) {
    var prefix = 'Aspect Ratio of Character 163: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'No Width'; break;
      case 3: return prefix + 'Exceptionally Wide'; break;
      case 4: return prefix + 'Super Wide'; break;
      case 5: return prefix + 'Very Wide'; break;
      case 6: return prefix + 'Wide'; break;
      case 7: return prefix + 'Normal'; break;
      case 8: return prefix + 'Narrow'; break;
      case 9: return prefix + 'Very Narrow'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function panose10(p, i) {
  var prefix = 'x-height: ';
  if (p == 2) {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Constant / Small'; break;
      case 3: return prefix + 'Constant / Standard'; break;
      case 4: return prefix + 'Constant / Large'; break;
      case 5: return prefix + 'Ducking / Small'; break;
      case 6: return prefix + 'Ducking / Standard'; break;
      case 7: return prefix + 'Ducking / Large'; break;
      default: return prefix + i; break;
    }
  } else if (p == 3) {
    var prefix = 'x-Ascender: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Very Low'; break;
      case 3: return prefix + 'Low'; break;
      case 4: return prefix + 'Medium'; break;
      case 5: return prefix + 'High'; break;
      case 6: return prefix + 'Very High'; break;
      default: return prefix + i; break;
    }
  } else if (p == 4) {
    var prefix = 'Range of Characters: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'Extended Collection'; break;
      case 3: return prefix + 'Litterals'; break;
      case 4: return prefix + 'No Lower Case'; break;
      case 5: return prefix + 'Small Caps'; break;
      default: return prefix + i; break;
    }
  } else if (p == 5) {
    var prefix = 'Aspect Ratio of Character 211: ';
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      case 2: return prefix + 'No Width'; break;
      case 3: return prefix + 'Exceptionally Wide'; break;
      case 4: return prefix + 'Super Wide'; break;
      case 5: return prefix + 'Very Wide'; break;
      case 6: return prefix + 'Wide'; break;
      case 7: return prefix + 'Normal'; break;
      case 8: return prefix + 'Narrow'; break;
      case 9: return prefix + 'Very Narrow'; break;
      default: return prefix + i; break;
    }
  } else {
    switch (i) {
      case 0: return prefix + 'Any'; break;
      case 1: return prefix + 'No Fit'; break;
      default: return prefix + i; break;
    }
  }
}

function weightClass(i) {
  switch (i) {
    case 100: return i + ' Thin'; break;
    case 200: return i + ' Extra-light (Ultra-light)'; break;
    case 300: return i + ' Light'; break;
    case 400: return i + ' Normal (Regular)'; break;
    case 500: return i + ' Medium'; break;
    case 600: return i + ' Semi-bold (Demi-bold)'; break;
    case 700: return i + ' Bold'; break;
    case 800: return i + ' Extra-bold (Ultra-bold)'; break;
    case 900: return i + ' Black (Heavy)'; break;
    default: return i; break;
  }
}

function widthClass(i) {
  switch (i) {
    case 1: return 'Ultra-condensed (50%)'; break;
    case 2: return 'Extra-condensed (62.5%)'; break;
    case 3: return 'Condensed (75%)'; break;
    case 4: return 'Semi-condensed (87.5%)'; break;
    case 5: return 'Medium (100%)'; break;
    case 6: return 'Semi-expanded (112.5%)'; break;
    case 7: return 'Expanded (125%)'; break;
    case 8: return 'Extra-expanded (150%)'; break;
    case 9: return 'Ultra-expanded (200%)'; break;
    default: return i; break;
  }
}

function font_info(body, tables) {
  const uint8 = (b, o) => b[o];
  const int8 = (b, o) => (uint8(b, o) ^ 0x80) - 0x80;
  const uint16 = (b, o) => b[o] << 8 | b[o + 1];
  const int16 = (b, o) => (uint16(b, o) ^ 0x8000) - 0x8000;
  const uint32 = (b, o) => (uint16(b, o) << 16 | uint16(b, o + 2)) >>> 0;
  const int32 = (b, o) => uint16(b, o) << 16 | uint16(b, o + 2);
  const range32 = (b, o) => Object.keys(Object.fromEntries(Object.entries(Object.assign({}, uint32(b, o).toString(2).padStart(32, '0').split('').reverse())).filter(([, x]) => x == 1)));
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
      'Major Version': uint16(tab, 0),
      'Minor Version': uint16(tab, 2),
      'Ascender': int16(tab, 4),
      'Descender': int16(tab, 6),
      'Line Gap': int16(tab, 8),
      'Maximum Advance Width': uint16(tab, 0x0a),
      'Minimum Left Sidebearing': int16(tab, 0x0c),
      'Minimum Right Sidebearing': int16(tab, 0x0e),
      'xMax Extent': int16(tab, 0x10),
      'Caret Slope Rise': int16(tab, 0x12),
      'Caret Slope Run': int16(tab, 0x14),
      'Caret Offset': int16(tab, 0x16),
      'Metric Data Format': int16(tab, 0x20),
      'Number of Horizontal Metrics': int16(tab, 0x22)
    }

    var tab = tables['OS/2']
    if (tab) {
      var v = uint16(tab, 0);
      var p = uint8(tab, 0x20);
      font.os2 = {
        'Version': v,
        'Average Character Width': int16(tab, 2),
        'Weight Class': weightClass(uint16(tab, 4)),
        'Width Class': widthClass(uint16(tab, 6)),
        'Type Flags': uint16(tab, 8),
        'Subscript X Size': int16(tab, 0x0a),
        'Subscript Y Size': int16(tab, 0x0c),
        'Subscript X Offset': int16(tab, 0x0e),
        'Subscript Y Offset': int16(tab, 0x10),
        'Superscript X Size': int16(tab, 0x12),
        'Superscript Y Size': int16(tab, 0x14),
        'Superscript X Offset': int16(tab, 0x16),
        'Superscript Y Offset': int16(tab, 0x18),
        'Strikeout Size': int16(tab, 0x1a),
        'Strikeout Position': int16(tab, 0x1c),
        'Family Class': int16(tab, 0x1e),
        'Panose': [
          panose1(p),
          panose2(p, uint8(tab, 0x21)),
          panose3(p, uint8(tab, 0x22)),
          panose4(p, uint8(tab, 0x23)),
          panose5(p, uint8(tab, 0x24)),
          panose6(p, uint8(tab, 0x25)),
          panose7(p, uint8(tab, 0x26)),
          panose8(p, uint8(tab, 0x27)),
          panose9(p, uint8(tab, 0x28)),
          panose10(p, uint8(tab, 0x29))
        ].join('<br>').replace(/(<br>)+$/, ''),
        'Unicode Range': [
          unicodeRange1(range32(tab, 0x2a)),
          unicodeRange2(range32(tab, 0x2e)),
          unicodeRange3(range32(tab, 0x32)),
          unicodeRange4(range32(tab, 0x36))
        ].join('<br>').replace(/(<br>)+$/, ''),
        'Vendor ID': gstr(tab, 0x3a, 4),
        'Selection Flags': uint16(tab, 0x3e),
        'First Character Index': uint16(tab, 0x40),
        'Last Character Index': uint16(tab, 0x42),
        'Typographic Ascender': int16(tab, 0x44),
        'Typographic Descender': int16(tab, 0x46),
        'Typographic Line Gap': int16(tab, 0x48),
        'Windows Ascender': uint16(tab, 0x4a),
        'Windows Descender': uint16(tab, 0x4c)
      }
      if (v >= 1) {
        font.os21 = {
          'Code Page Range': [
            codePageRange1(range32(tab, 0x4e)),
            codePageRange2(range32(tab, 0x52))
          ].join('<br>').replace(/(<br>)+$/, '')
        }
        font.os2 = { ...font.os2, ...font.os21 }
      }
      if (v >= 4) {
        font.os24 = {
          'x-height': int16(tab, 0x56),
          'Capital Height': int16(tab, 0x58),
          'Default Character': uint16(tab, 0x5a),
          'Break Character': uint16(tab, 0x5c),
          'Max Context': uint16(tab, 0x5e)
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
    }
  }

  if (features)
    font.features = Object.keys(features)

  return font
}
