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

function font_info(body, tables) {
  const g8 = (b, o) => b[o] << 4 | b[o]
  const g16 = (b, o) => b[o] << 8 | b[o + 1]
  const g16s = (b, o) => (g16(b, o) ^ 0x8000) - 0x8000
  const g32 = (b, o) => (g16(b, o) << 16 | g16(b, o + 2)) >>> 0
  const g64 = (b, o) => 0x10000 * 0x10000 * g32(b, o) + g32(b, o + 4)
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
  count = g16(body, count)
  if (!count)
    throw 'Bad font'
  do {
    var id = gstr(body, pos, 4)
    if (id in tables) {
      var ofs = g32(body, pos + o_ofs)
      var size = g32(body, pos + o_size)
      if (ofs + size > body.length)
        return 'Font truncated'
      var data = body.slice(ofs, ofs + size)
      if (o_len) {
        var len = g32(body, pos + o_len)
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
      var end = 6 + 12 * g16(tab, 2)
      for (var pos = 6; pos < end; pos += 12) {
        var [pe, lang, id] = [g32(tab, pos), g16(tab, pos + 4), g16(tab, pos + 6)]

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
            var ofs = g16(tab, 4) + g16(tab, pos + 10)
            var size = g16(tab, pos + 8)
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
  font.em = g16(tab, 18)
  read_date('created', 20)
  read_date('modified', 28)

  var tab = tables.maxp
  font.num_glyphs = g16(tab, 4)

  var tab = tables.cmap
  var cmap_ofs = []
  var end = 4 + 8 * g16(tab, 2)
  for (var pos = 4; pos < end; pos += 8) {
    var pe = g32(tab, pos)
    if (pe == 0x30001 || pe == 0x3000a) {
      var offset = g32(tab, pos + 4)
      var format = g16(tab, offset)
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
    var v = g16(tab, pos + 6)
    var count = v >> 1
    var o_start = 2 + v
    var o_delta = o_start + v
    var o_ofs = o_delta + v
    pos += 14
    for (; count--; pos += 2) {
      var [last, first, delta, ofs] = [g16(tab, pos), g16(tab, pos + o_start), g16(tab, pos + o_delta), g16(tab, pos + o_ofs)]
      if (!ofs) {
        var i = -delta & 0xffff
        if (i >= first && i <= last) {
          add_range(first, i - 1)
          first = i + 1
        }
      } else {
        var array_pos = pos + o_ofs + ofs
        for (var i = first; i <= last; i++) {
          var v = g16(tab, array_pos)
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
    var count = g32(tab, pos + 12)
    pos += 16
    for (; count--; pos += 12) {
      var [first, last] = [g32(tab, pos), g32(tab, pos + 4)]
      if (cmap_ofs[4] && first < 0x10000)
        first = 0x10000
      add_range(first, last)
    }
  }

  font.ranges = ranges

  var features

  const parse_feature_list = (tab, pos) => {
    features = features || {}
    var featureCount = g16(tab, pos)
    pos += 2
    for (var i = 0; i < featureCount; i++) {
      var featureTag = gstr(tab, pos, 4)
      features[featureTag] = 1
      pos += 6
    }
  }

  var tab = tables.GPOS
  if (tab) {
    if (g16(tab, 0) == 1) {
      var featureListOffset = g16(tab, 6)
      if (featureListOffset)
        parse_feature_list(tab, featureListOffset)
    }
  }

  var tab = tables.GSUB
  if (tab) {
    if (g16(tab, 0) == 1) {
      var featureListOffset = g16(tab, 6)
      if (featureListOffset)
        parse_feature_list(tab, featureListOffset)
    }
  }

  var tab = tables.hhea
  if (tab) {
    font.hhea = {
      ascender: g16s(tab, 4),
      descender: g16s(tab, 6),
      lineGap: g16s(tab, 8)
    }

    var tab = tables['OS/2']
    if (tab) {
      var v = g16s(tab, 0);
      font.os2 = {
        version: v,
        xAvgCharWidth: g16s(tab, 2),
        usWeightClass: g16s(tab, 4),
        usWidthClass: g16s(tab, 6),
        fsType: g16s(tab, 8),
        ySubscriptXSize: g16s(tab, 0x0a),
        ySubscriptYSize: g16s(tab, 0x0c),
        ySubscriptXOffset: g16s(tab, 0x0e),
        ySubscriptYOffset: g16s(tab, 0x10),
        ySuperscriptXSize: g16s(tab, 0x12),
        ySuperscriptYSize: g16s(tab, 0x14),
        ySuperscriptXOffset: g16s(tab, 0x16),
        ySuperscriptYOffset: g16s(tab, 0x18),
        yStrikeoutSize: g16s(tab, 0x1a),
        yStrikeoutPosition: g16s(tab, 0x1c),
        sFamilyClass: g16s(tab, 0x1e),
        panoseFamilyType: g8(tab, 0x20),
        panoseSerifStyle: g8(tab, 0x21),
        panoseWeight: g8(tab, 0x22),
        panoseProportion: g8(tab, 0x23),
        panoseContrast: g8(tab, 0x24),
        panoseStrokeVariation: g8(tab, 0x25),
        panoseArmStyle: g8(tab, 0x26),
        panoseLetterform: g8(tab, 0x27),
        panoseMidline: g8(tab, 0x28),
        panoseXHeight: g8(tab, 0x29),
        ulUnicodeRange1: g32(tab, 0x2a),
        ulUnicodeRange2: g32(tab, 0x2e),
        ulUnicodeRange3: g32(tab, 0x32),
        ulUnicodeRange4: g32(tab, 0x36),
        achVendID: gstr(tab, 0x3a, 4),
        fsSelection: g16s(tab, 0x3e),
        usFirstCharIndex: g16s(tab, 0x40),
        usLastCharIndex: g16s(tab, 0x42),
        sTypoAscender: g16s(tab, 0x44),
        sTypoDescender: g16s(tab, 0x46),
        sTypoLineGap: g16s(tab, 0x48),
        usWinAscent: g16s(tab, 0x4a),
        usWinDescent: g16s(tab, 0x4c)
      }
      if (v >= 1) {
        font.os21 = {
          ulCodePageRange1: g32(tab, 0x4e),
          ulCodePageRange2: g32(tab, 0x52)
        }
        font.os2 = { ...font.os2, ...font.os21 }
      }
      if (v >= 4) {
        font.os24 = {
          sxHeight: g16s(tab, 0x56),
          sCapHeight: g16s(tab, 0x58),
          usDefaultChar: g16s(tab, 0x5a),
          usBreakChar: g16s(tab, 0x5c),
          usMaxContext: g16s(tab, 0x5e)
        }
        font.os2 = { ...font.os2, ...font.os24 }
      }
      if (v >= 5) {
        font.os25 = {
          usLowerOpticalPointSize: g16s(tab, 0x60),
          usUpperOpticalPointSize: g16s(tab, 0x62)
        }
        font.os2 = { ...font.os2, ...font.os25 }
      }
    }
  }

  if (features)
    font.features = Object.keys(features)

  return font
}
