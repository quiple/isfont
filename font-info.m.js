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
  // 추가 내용 시작
  const uint8 = (b, o) => b[o];
  const int8 = (b, o) => (uint8(b, o) ^ 0x80) - 0x80;
  const uint16 = (b, o) => b[o] << 8 | b[o + 1];
  const int16 = (b, o) => (uint16(b, o) ^ 0x8000) - 0x8000;
  const uint32 = (b, o) => (uint16(b, o) << 16 | uint16(b, o + 2)) >>> 0;
  const int32 = (b, o) => uint16(b, o) << 16 | uint16(b, o + 2);
  const range32 = (b, o) => uint32(b, o).toString(2).padStart(32, '0');
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
      ascender: int16(tab, 4),
      descender: int16(tab, 6),
      lineGap: int16(tab, 8)
    }

    var tab = tables['OS/2']
    if (tab) {
      // 추가 내용 시작
      var v = uint16(tab, 0);
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
        panoseFamilyType: uint8(tab, 0x20),
        panoseSerifStyle: uint8(tab, 0x21),
        panoseWeight: uint8(tab, 0x22),
        panoseProportion: uint8(tab, 0x23),
        panoseContrast: uint8(tab, 0x24),
        panoseStrokeVariation: uint8(tab, 0x25),
        panoseArmStyle: uint8(tab, 0x26),
        panoseLetterform: uint8(tab, 0x27),
        panoseMidline: uint8(tab, 0x28),
        panoseXHeight: uint8(tab, 0x29),
        ulUnicodeRange1: range32(tab, 0x2a),
        ulUnicodeRange2: range32(tab, 0x2e),
        ulUnicodeRange3: range32(tab, 0x32),
        ulUnicodeRange4: range32(tab, 0x36),
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
          ulCodePageRange1: range32(tab, 0x4e),
          ulCodePageRange2: range32(tab, 0x52)
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
