import {
  __rest
} from "./chunk-WSFPFVO6.js";
import {
  C,
  H,
  K,
  _,
  ae,
  b,
  c,
  d,
  ne,
  oe,
  se,
  y
} from "./chunk-RVOIZ2RW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-JZQ37OGZ.js";

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version)
        throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data2) {
      let digit = 0;
      while (data2 !== 0) {
        digit++;
        data2 >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved)
        this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1)
        return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data2) {
      const size = data2.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data2.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5)
              points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data2.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5)
              points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5)
          points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5)
          points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data2) {
      const size = data2.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data2.get(row, col) + data2.get(row, col + 1) + data2.get(row + 1, col) + data2.get(row + 1, col + 1);
          if (last === 4 || last === 0)
            points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data2) {
      const size = data2.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data2.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
            points++;
          bitsRow = bitsRow << 1 & 2047 | data2.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
            points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data2) {
      let darkCount = 0;
      const modulesCount = data2.data.length;
      for (let i = 0; i < modulesCount; i++)
        darkCount += data2.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data2) {
      const size = data2.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data2.isReserved(row, col))
            continue;
          data2.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data2, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data2);
        const penalty = exports.getPenaltyN1(data2) + exports.getPenaltyN2(data2) + exports.getPenaltyN3(data2) + exports.getPenaltyN4(data2);
        exports.applyMask(p, data2);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1)
        throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y2) {
      if (x === 0 || y2 === 0)
        return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y2]];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0)
          offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree)
        this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data2) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data2.length + this.degree);
      paddedData.set(data2);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits)
        throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10)
        return mode.ccBits[0];
      else if (version < 27)
        return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr))
        return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr))
        return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr))
        return exports.KANJI;
      else
        return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id)
        return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data2) {
        const reservedBits = getReservedBitsCount(data2.mode, version);
        totalBits += reservedBits + data2.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined")
        mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED)
        return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data2, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data2)) {
        if (data2.length > 1) {
          return getBestVersionForMixedData(data2, ecl);
        }
        if (data2.length === 0) {
          return 1;
        }
        seg = data2[0];
      } else {
        seg = data2;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d4 = version << 12;
      while (Utils.getBCHDigit(d4) - G18_BCH >= 0) {
        d4 ^= G18 << Utils.getBCHDigit(d4) - G18_BCH;
      }
      return version << 12 | d4;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data2 = errorCorrectionLevel.bit << 3 | mask;
      let d4 = data2 << 10;
      while (Utils.getBCHDigit(d4) - G15_BCH >= 0) {
        d4 ^= G15 << Utils.getBCHDigit(d4) - G15_BCH;
      }
      return (data2 << 10 | d4) ^ G15_MASK;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    var Mode = require_mode();
    function NumericData(data2) {
      this.mode = Mode.NUMERIC;
      this.data = data2.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data2) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data2;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/.pnpm/encode-utf8@1.0.3/node_modules/encode-utf8/index.js
var require_encode_utf8 = __commonJS({
  "node_modules/.pnpm/encode-utf8@1.0.3/node_modules/encode-utf8/index.js"(exports, module) {
    "use strict";
    module.exports = function encodeUtf8(input) {
      var result = [];
      var size = input.length;
      for (var index = 0; index < size; index++) {
        var point = input.charCodeAt(index);
        if (point >= 55296 && point <= 56319 && size > index + 1) {
          var second = input.charCodeAt(index + 1);
          if (second >= 56320 && second <= 57343) {
            point = (point - 55296) * 1024 + second - 56320 + 65536;
            index += 1;
          }
        }
        if (point < 128) {
          result.push(point);
          continue;
        }
        if (point < 2048) {
          result.push(point >> 6 | 192);
          result.push(point & 63 | 128);
          continue;
        }
        if (point < 55296 || point >= 57344 && point < 65536) {
          result.push(point >> 12 | 224);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        if (point >= 65536 && point <= 1114111) {
          result.push(point >> 18 | 240);
          result.push(point >> 12 & 63 | 128);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        result.push(239, 191, 189);
      }
      return new Uint8Array(result).buffer;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var encodeUtf8 = require_encode_utf8();
    var Mode = require_mode();
    function ByteData(data2) {
      this.mode = Mode.BYTE;
      if (typeof data2 === "string") {
        data2 = encodeUtf8(data2);
      }
      this.data = new Uint8Array(data2);
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data2) {
      this.mode = Mode.KANJI;
      this.data = data2;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s2, d4) {
        var predecessors = {};
        var costs = {};
        costs[s2] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s2, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d4 !== "undefined" && typeof costs[d4] === "undefined") {
          var msg = ["Could not find a path from ", s2, " to ", d4, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d4) {
        var nodes = [];
        var u = d4;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s2, d4) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s2, d4);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d4
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b2) {
          return a.cost - b2.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId])
                table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data2, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data2);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data2 + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data2);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data2);
        case Mode.KANJI:
          return new KanjiData(data2);
        case Mode.BYTE:
          return new ByteData(data2);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data2, version) {
      const segs = getSegmentsFromString(data2, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data2) {
      return exports.fromArray(
        getSegmentsFromString(data2, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r)
            continue;
          for (let c2 = -1; c2 <= 7; c2++) {
            if (col + c2 <= -1 || size <= col + c2)
              continue;
            if (r >= 0 && r <= 6 && (c2 === 0 || c2 === 6) || c2 >= 0 && c2 <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c2 >= 2 && c2 <= 4) {
              matrix.set(row + r, col + c2, true, true);
            } else {
              matrix.set(row + r, col + c2, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c2 = -2; c2 <= 2; c2++) {
            if (r === -2 || r === 2 || c2 === -2 || c2 === 2 || r === 0 && c2 === 0) {
              matrix.set(row + r, col + c2, true, true);
            } else {
              matrix.set(row + r, col + c2, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data2) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6)
          col--;
        while (true) {
          for (let c2 = 0; c2 < 2; c2++) {
            if (!matrix.isReserved(row, col - c2)) {
              let dark = false;
              if (byteIndex < data2.length) {
                dark = (data2[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c2, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data2) {
        buffer.put(data2.mode.bit, 4);
        buffer.put(data2.getLength(), Mode.getCharCountIndicator(data2.mode, version));
        data2.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b2 = 0; b2 < ecTotalBlocks; b2++) {
        const dataSize = b2 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b2] = buffer.slice(offset, offset + dataSize);
        ecData[b2] = rs.encode(dcData[b2]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data2 = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data2[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data2[index++] = ecData[r][i];
        }
      }
      return data2;
    }
    function createSymbol(data2, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data2)) {
        segments = Segments.fromArray(data2);
      } else if (typeof data2 === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data2);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data2, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data2, options) {
      if (typeof data2 === "undefined" || data2 === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data2, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c2) {
          return [c2, c2];
        }));
      }
      if (hexCode.length === 6)
        hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions2(options) {
      if (!options)
        options = {};
      if (!options.color)
        options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr2, opts) {
      const size = qr2.modules.size;
      const data2 = qr2.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data2[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style)
        canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render2(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts)
        opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y2) {
      let str = cmd + x;
      if (typeof y2 !== "undefined")
        str += " " + y2;
      return str;
    }
    function qrToPath(data2, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data2.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow)
          newRow = true;
        if (data2[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data2[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data2[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render2(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data2 = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data2, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data2 = QRCode.create(text, opts);
            resolve(renderFunc(data2, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data2 = QRCode.create(text, opts);
        cb(null, renderFunc(data2, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data2, _2, opts) {
      return SvgRenderer.render(data2, opts);
    });
  }
});

// node_modules/.pnpm/@lit+reactive-element@1.6.1/node_modules/@lit/reactive-element/development/css-tag.js
var NODE_MODE = false;
var global = NODE_MODE ? globalThis : window;
var supportsAdoptingStyleSheets = global.ShadowRoot && (global.ShadyCSS === void 0 || global.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var constructionToken = Symbol();
var cssTagCache = /* @__PURE__ */ new WeakMap();
var CSSResult = class {
  constructor(cssText, strings, safeToken) {
    this["_$cssResult$"] = true;
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
    this._strings = strings;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  get styleSheet() {
    let styleSheet = this._styleSheet;
    const strings = this._strings;
    if (supportsAdoptingStyleSheets && styleSheet === void 0) {
      const cacheable = strings !== void 0 && strings.length === 1;
      if (cacheable) {
        styleSheet = cssTagCache.get(strings);
      }
      if (styleSheet === void 0) {
        (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
        if (cacheable) {
          cssTagCache.set(strings, styleSheet);
        }
      }
    }
    return styleSheet;
  }
  toString() {
    return this.cssText;
  }
};
var textFromCSSResult = (value) => {
  if (value["_$cssResult$"] === true) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`);
  }
};
var unsafeCSS = (value) => new CSSResult(typeof value === "string" ? value : String(value), void 0, constructionToken);
var css = (strings, ...values) => {
  const cssText = strings.length === 1 ? strings[0] : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, strings, constructionToken);
};
var adoptStyles = (renderRoot, styles) => {
  if (supportsAdoptingStyleSheets) {
    renderRoot.adoptedStyleSheets = styles.map((s2) => s2 instanceof CSSStyleSheet ? s2 : s2.styleSheet);
  } else {
    styles.forEach((s2) => {
      const style2 = document.createElement("style");
      const nonce = global["litNonce"];
      if (nonce !== void 0) {
        style2.setAttribute("nonce", nonce);
      }
      style2.textContent = s2.cssText;
      renderRoot.appendChild(style2);
    });
  }
};
var cssResultFromStyleSheet = (sheet) => {
  let cssText = "";
  for (const rule of sheet.cssRules) {
    cssText += rule.cssText;
  }
  return unsafeCSS(cssText);
};
var getCompatibleStyle = supportsAdoptingStyleSheets || NODE_MODE && global.CSSStyleSheet === void 0 ? (s2) => s2 : (s2) => s2 instanceof CSSStyleSheet ? cssResultFromStyleSheet(s2) : s2;

// node_modules/.pnpm/@lit+reactive-element@1.6.1/node_modules/@lit/reactive-element/development/reactive-element.js
var _a;
var _b;
var _c;
var _d;
var _e;
var NODE_MODE2 = false;
var global2 = NODE_MODE2 ? globalThis : window;
if (NODE_MODE2) {
  (_a = global2.customElements) !== null && _a !== void 0 ? _a : global2.customElements = customElements;
}
var DEV_MODE = true;
var requestUpdateThenable;
var issueWarning;
var trustedTypes = global2.trustedTypes;
var emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : "";
var polyfillSupport = DEV_MODE ? global2.reactiveElementPolyfillSupportDevMode : global2.reactiveElementPolyfillSupport;
if (DEV_MODE) {
  const issuedWarnings = (_b = global2.litIssuedWarnings) !== null && _b !== void 0 ? _b : global2.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning = (code, warning2) => {
    warning2 += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning2)) {
      console.warn(warning2);
      issuedWarnings.add(warning2);
    }
  };
  issueWarning("dev-mode", `Lit is in dev mode. Not recommended for production!`);
  if (((_c = global2.ShadyDOM) === null || _c === void 0 ? void 0 : _c.inUse) && polyfillSupport === void 0) {
    issueWarning("polyfill-support-missing", `Shadow DOM is being polyfilled via \`ShadyDOM\` but the \`polyfill-support\` module has not been loaded.`);
  }
  requestUpdateThenable = (name) => ({
    then: (onfulfilled, _onrejected) => {
      issueWarning("request-update-promise", `The \`requestUpdate\` method should no longer return a Promise but does so on \`${name}\`. Use \`updateComplete\` instead.`);
      if (onfulfilled !== void 0) {
        onfulfilled(false);
      }
    }
  });
}
var debugLogEvent = DEV_MODE ? (event) => {
  const shouldEmit = global2.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global2.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
} : void 0;
var JSCompiler_renameProperty = (prop, _obj) => prop;
var defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        value = value ? emptyStringForBooleanAttribute : null;
        break;
      case Object:
      case Array:
        value = value == null ? value : JSON.stringify(value);
        break;
    }
    return value;
  },
  fromAttribute(value, type) {
    let fromValue = value;
    switch (type) {
      case Boolean:
        fromValue = value !== null;
        break;
      case Number:
        fromValue = value === null ? null : Number(value);
        break;
      case Object:
      case Array:
        try {
          fromValue = JSON.parse(value);
        } catch (e) {
          fromValue = null;
        }
        break;
    }
    return fromValue;
  }
};
var notEqual = (value, old) => {
  return old !== value && (old === old || value === value);
};
var defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
var finalized = "finalized";
var ReactiveElement = class extends HTMLElement {
  constructor() {
    super();
    this.__instanceProperties = /* @__PURE__ */ new Map();
    this.isUpdatePending = false;
    this.hasUpdated = false;
    this.__reflectingProperty = null;
    this._initialize();
  }
  /**
   * Adds an initializer function to the class that is called during instance
   * construction.
   *
   * This is useful for code that runs against a `ReactiveElement`
   * subclass, such as a decorator, that needs to do work for each
   * instance, such as setting up a `ReactiveController`.
   *
   * ```ts
   * const myDecorator = (target: typeof ReactiveElement, key: string) => {
   *   target.addInitializer((instance: ReactiveElement) => {
   *     // This is run during construction of the element
   *     new MyController(instance);
   *   });
   * }
   * ```
   *
   * Decorating a field will then cause each instance to run an initializer
   * that adds a controller:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   @myDecorator foo;
   * }
   * ```
   *
   * Initializers are stored per-constructor. Adding an initializer to a
   * subclass does not add it to a superclass. Since initializers are run in
   * constructors, initializers will run in order of the class hierarchy,
   * starting with superclasses and progressing to the instance's class.
   *
   * @nocollapse
   */
  static addInitializer(initializer) {
    var _a6;
    this.finalize();
    ((_a6 = this._initializers) !== null && _a6 !== void 0 ? _a6 : this._initializers = []).push(initializer);
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   * @category attributes
   */
  static get observedAttributes() {
    this.finalize();
    const attributes = [];
    this.elementProperties.forEach((v, p) => {
      const attr = this.__attributeNameForProperty(p, v);
      if (attr !== void 0) {
        this.__attributeToPropertyMap.set(attr, p);
        attributes.push(attr);
      }
    });
    return attributes;
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a {@linkcode PropertyDeclaration} for the property with the
   * given options. The property setter calls the property's `hasChanged`
   * property option or uses a strict identity check to determine whether or not
   * to request an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * ```ts
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static createProperty(name, options = defaultPropertyDeclaration) {
    var _a6;
    if (options.state) {
      options.attribute = false;
    }
    this.finalize();
    this.elementProperties.set(name, options);
    if (!options.noAccessor && !this.prototype.hasOwnProperty(name)) {
      const key = typeof name === "symbol" ? Symbol() : `__${name}`;
      const descriptor = this.getPropertyDescriptor(name, key, options);
      if (descriptor !== void 0) {
        Object.defineProperty(this.prototype, name, descriptor);
        if (DEV_MODE) {
          if (!this.hasOwnProperty("__reactivePropertyKeys")) {
            this.__reactivePropertyKeys = new Set((_a6 = this.__reactivePropertyKeys) !== null && _a6 !== void 0 ? _a6 : []);
          }
          this.__reactivePropertyKeys.add(name);
        }
      }
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   * ```ts
   * class MyElement extends LitElement {
   *   static getPropertyDescriptor(name, key, options) {
   *     const defaultDescriptor =
   *         super.getPropertyDescriptor(name, key, options);
   *     const setter = defaultDescriptor.set;
   *     return {
   *       get: defaultDescriptor.get,
   *       set(value) {
   *         setter.call(this, value);
   *         // custom action.
   *       },
   *       configurable: true,
   *       enumerable: true
   *     }
   *   }
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static getPropertyDescriptor(name, key, options) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdate(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a `PropertyDeclaration` via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override
   * {@linkcode createProperty}.
   *
   * @nocollapse
   * @final
   * @category properties
   */
  static getPropertyOptions(name) {
    return this.elementProperties.get(name) || defaultPropertyDeclaration;
  }
  /**
   * Creates property accessors for registered properties, sets up element
   * styling, and ensures any superclasses are also finalized. Returns true if
   * the element was finalized.
   * @nocollapse
   */
  static finalize() {
    if (this.hasOwnProperty(finalized)) {
      return false;
    }
    this[finalized] = true;
    const superCtor = Object.getPrototypeOf(this);
    superCtor.finalize();
    if (superCtor._initializers !== void 0) {
      this._initializers = [...superCtor._initializers];
    }
    this.elementProperties = new Map(superCtor.elementProperties);
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
    if (this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...Object.getOwnPropertySymbols(props)
      ];
      for (const p of propKeys) {
        this.createProperty(p, props[p]);
      }
    }
    this.elementStyles = this.finalizeStyles(this.styles);
    if (DEV_MODE) {
      const warnRemovedOrRenamed = (name, renamed = false) => {
        if (this.prototype.hasOwnProperty(name)) {
          issueWarning(renamed ? "renamed-api" : "removed-api", `\`${name}\` is implemented on class ${this.name}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
        }
      };
      warnRemovedOrRenamed("initialize");
      warnRemovedOrRenamed("requestUpdateInternal");
      warnRemovedOrRenamed("_getUpdateComplete", true);
    }
    return true;
  }
  /**
   * Takes the styles the user supplied via the `static styles` property and
   * returns the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * Styles are deduplicated preserving the _last_ instance in the list. This
   * is a performance optimization to avoid duplicated styles that can occur
   * especially when composing via subclassing. The last item is kept to try
   * to preserve the cascade order with the assumption that it's most important
   * that last added styles override previous styles.
   *
   * @nocollapse
   * @category styles
   */
  static finalizeStyles(styles) {
    const elementStyles = [];
    if (Array.isArray(styles)) {
      const set = new Set(styles.flat(Infinity).reverse());
      for (const s2 of set) {
        elementStyles.unshift(getCompatibleStyle(s2));
      }
    } else if (styles !== void 0) {
      elementStyles.push(getCompatibleStyle(styles));
    }
    return elementStyles;
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */
  static __attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  /**
   * Internal only override point for customizing work done when elements
   * are constructed.
   *
   * @internal
   */
  _initialize() {
    var _a6;
    this.__updatePromise = new Promise((res) => this.enableUpdating = res);
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.__saveInstanceProperties();
    this.requestUpdate();
    (_a6 = this.constructor._initializers) === null || _a6 === void 0 ? void 0 : _a6.forEach((i) => i(this));
  }
  /**
   * Registers a `ReactiveController` to participate in the element's reactive
   * update cycle. The element automatically calls into any registered
   * controllers during its lifecycle callbacks.
   *
   * If the element is connected when `addController()` is called, the
   * controller's `hostConnected()` callback will be immediately called.
   * @category controllers
   */
  addController(controller) {
    var _a6, _b4;
    ((_a6 = this.__controllers) !== null && _a6 !== void 0 ? _a6 : this.__controllers = []).push(controller);
    if (this.renderRoot !== void 0 && this.isConnected) {
      (_b4 = controller.hostConnected) === null || _b4 === void 0 ? void 0 : _b4.call(controller);
    }
  }
  /**
   * Removes a `ReactiveController` from the element.
   * @category controllers
   */
  removeController(controller) {
    var _a6;
    (_a6 = this.__controllers) === null || _a6 === void 0 ? void 0 : _a6.splice(this.__controllers.indexOf(controller) >>> 0, 1);
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */
  __saveInstanceProperties() {
    this.constructor.elementProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        this.__instanceProperties.set(p, this[p]);
        delete this[p];
      }
    });
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   *
   * @return Returns a node into which to render.
   * @category rendering
   */
  createRenderRoot() {
    var _a6;
    const renderRoot = (_a6 = this.shadowRoot) !== null && _a6 !== void 0 ? _a6 : this.attachShadow(this.constructor.shadowRootOptions);
    adoptStyles(renderRoot, this.constructor.elementStyles);
    return renderRoot;
  }
  /**
   * On first connection, creates the element's renderRoot, sets up
   * element styling, and enables updating.
   * @category lifecycle
   */
  connectedCallback() {
    var _a6;
    if (this.renderRoot === void 0) {
      this.renderRoot = this.createRenderRoot();
    }
    this.enableUpdating(true);
    (_a6 = this.__controllers) === null || _a6 === void 0 ? void 0 : _a6.forEach((c2) => {
      var _a7;
      return (_a7 = c2.hostConnected) === null || _a7 === void 0 ? void 0 : _a7.call(c2);
    });
  }
  /**
   * Note, this method should be considered final and not overridden. It is
   * overridden on the element instance with a function that triggers the first
   * update.
   * @category updates
   */
  enableUpdating(_requestedUpdate) {
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   * @category lifecycle
   */
  disconnectedCallback() {
    var _a6;
    (_a6 = this.__controllers) === null || _a6 === void 0 ? void 0 : _a6.forEach((c2) => {
      var _a7;
      return (_a7 = c2.hostDisconnected) === null || _a7 === void 0 ? void 0 : _a7.call(c2);
    });
  }
  /**
   * Synchronizes property values when attributes change.
   *
   * Specifically, when an attribute is set, the corresponding property is set.
   * You should rarely need to implement this callback. If this method is
   * overridden, `super.attributeChangedCallback(name, _old, value)` must be
   * called.
   *
   * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
   * on MDN for more information about the `attributeChangedCallback`.
   * @category attributes
   */
  attributeChangedCallback(name, _old, value) {
    this._$attributeToProperty(name, value);
  }
  __propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    var _a6;
    const attr = this.constructor.__attributeNameForProperty(name, options);
    if (attr !== void 0 && options.reflect === true) {
      const converter = ((_a6 = options.converter) === null || _a6 === void 0 ? void 0 : _a6.toAttribute) !== void 0 ? options.converter : defaultConverter;
      const attrValue = converter.toAttribute(value, options.type);
      if (DEV_MODE && this.constructor.enabledWarnings.indexOf("migration") >= 0 && attrValue === void 0) {
        issueWarning("undefined-attribute-value", `The attribute value for the ${name} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);
      }
      this.__reflectingProperty = name;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this.__reflectingProperty = null;
    }
  }
  /** @internal */
  _$attributeToProperty(name, value) {
    var _a6;
    const ctor = this.constructor;
    const propName = ctor.__attributeToPropertyMap.get(name);
    if (propName !== void 0 && this.__reflectingProperty !== propName) {
      const options = ctor.getPropertyOptions(propName);
      const converter = typeof options.converter === "function" ? { fromAttribute: options.converter } : ((_a6 = options.converter) === null || _a6 === void 0 ? void 0 : _a6.fromAttribute) !== void 0 ? options.converter : defaultConverter;
      this.__reflectingProperty = propName;
      this[propName] = converter.fromAttribute(
        value,
        options.type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      );
      this.__reflectingProperty = null;
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should be called
   * when an element should update based on some state not triggered by setting
   * a reactive property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored.
   *
   * @param name name of requesting property
   * @param oldValue old value of requesting property
   * @param options property options to use instead of the previously
   *     configured options
   * @category updates
   */
  requestUpdate(name, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name !== void 0) {
      options = options || this.constructor.getPropertyOptions(name);
      const hasChanged2 = options.hasChanged || notEqual;
      if (hasChanged2(this[name], oldValue)) {
        if (!this._$changedProperties.has(name)) {
          this._$changedProperties.set(name, oldValue);
        }
        if (options.reflect === true && this.__reflectingProperty !== name) {
          if (this.__reflectingProperties === void 0) {
            this.__reflectingProperties = /* @__PURE__ */ new Map();
          }
          this.__reflectingProperties.set(name, options);
        }
      } else {
        shouldRequestUpdate = false;
      }
    }
    if (!this.isUpdatePending && shouldRequestUpdate) {
      this.__updatePromise = this.__enqueueUpdate();
    }
    return DEV_MODE ? requestUpdateThenable(this.localName) : void 0;
  }
  /**
   * Sets up the element to asynchronously update.
   */
  async __enqueueUpdate() {
    this.isUpdatePending = true;
    try {
      await this.__updatePromise;
    } catch (e) {
      Promise.reject(e);
    }
    const result = this.scheduleUpdate();
    if (result != null) {
      await result;
    }
    return !this.isUpdatePending;
  }
  /**
   * Schedules an element update. You can override this method to change the
   * timing of updates by returning a Promise. The update will await the
   * returned Promise, and you should resolve the Promise to allow the update
   * to proceed. If this method is overridden, `super.scheduleUpdate()`
   * must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```ts
   * override protected async scheduleUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.scheduleUpdate();
   * }
   * ```
   * @category updates
   */
  scheduleUpdate() {
    return this.performUpdate();
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * Call `performUpdate()` to immediately process a pending update. This should
   * generally not be needed, but it can be done in rare cases when you need to
   * update synchronously.
   *
   * Note: To ensure `performUpdate()` synchronously completes a pending update,
   * it should not be overridden. In LitElement 2.x it was suggested to override
   * `performUpdate()` to also customizing update scheduling. Instead, you should now
   * override `scheduleUpdate()`. For backwards compatibility with LitElement 2.x,
   * scheduling updates via `performUpdate()` continues to work, but will make
   * also calling `performUpdate()` to synchronously process updates difficult.
   *
   * @category updates
   */
  performUpdate() {
    var _a6, _b4;
    if (!this.isUpdatePending) {
      return;
    }
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({ kind: "update" });
    if (!this.hasUpdated) {
      if (DEV_MODE) {
        const shadowedProperties = [];
        (_a6 = this.constructor.__reactivePropertyKeys) === null || _a6 === void 0 ? void 0 : _a6.forEach((p) => {
          var _a7;
          if (this.hasOwnProperty(p) && !((_a7 = this.__instanceProperties) === null || _a7 === void 0 ? void 0 : _a7.has(p))) {
            shadowedProperties.push(p);
          }
        });
        if (shadowedProperties.length) {
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${shadowedProperties.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
        }
      }
    }
    if (this.__instanceProperties) {
      this.__instanceProperties.forEach((v, p) => this[p] = v);
      this.__instanceProperties = void 0;
    }
    let shouldUpdate = false;
    const changedProperties = this._$changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.willUpdate(changedProperties);
        (_b4 = this.__controllers) === null || _b4 === void 0 ? void 0 : _b4.forEach((c2) => {
          var _a7;
          return (_a7 = c2.hostUpdate) === null || _a7 === void 0 ? void 0 : _a7.call(c2);
        });
        this.update(changedProperties);
      } else {
        this.__markUpdated();
      }
    } catch (e) {
      shouldUpdate = false;
      this.__markUpdated();
      throw e;
    }
    if (shouldUpdate) {
      this._$didUpdate(changedProperties);
    }
  }
  /**
   * Invoked before `update()` to compute values needed during the update.
   *
   * Implement `willUpdate` to compute property values that depend on other
   * properties and are used in the rest of the update process.
   *
   * ```ts
   * willUpdate(changedProperties) {
   *   // only need to check changed properties for an expensive computation.
   *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
   *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
   *   }
   * }
   *
   * render() {
   *   return html`SHA: ${this.sha}`;
   * }
   * ```
   *
   * @category updates
   */
  willUpdate(_changedProperties) {
  }
  // Note, this is an override point for polyfill-support.
  // @internal
  _$didUpdate(changedProperties) {
    var _a6;
    (_a6 = this.__controllers) === null || _a6 === void 0 ? void 0 : _a6.forEach((c2) => {
      var _a7;
      return (_a7 = c2.hostUpdated) === null || _a7 === void 0 ? void 0 : _a7.call(c2);
    });
    if (!this.hasUpdated) {
      this.hasUpdated = true;
      this.firstUpdated(changedProperties);
    }
    this.updated(changedProperties);
    if (DEV_MODE && this.isUpdatePending && this.constructor.enabledWarnings.indexOf("change-in-update") >= 0) {
      issueWarning("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
    }
  }
  __markUpdated() {
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.isUpdatePending = false;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super.getUpdateComplete()`, then any subsequent state.
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  get updateComplete() {
    return this.getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   override async getUpdateComplete() {
   *     const result = await super.getUpdateComplete();
   *     await this._myChild.updateComplete;
   *     return result;
   *   }
   * }
   * ```
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  getUpdateComplete() {
    return this.__updatePromise;
  }
  /**
   * Controls whether or not `update()` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  update(_changedProperties) {
    if (this.__reflectingProperties !== void 0) {
      this.__reflectingProperties.forEach((v, k) => this.__propertyToAttribute(k, this[k], v));
      this.__reflectingProperties = void 0;
    }
    this.__markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  updated(_changedProperties) {
  }
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * ```ts
   * firstUpdated() {
   *   this.renderRoot.getElementById('my-text-area').focus();
   * }
   * ```
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  firstUpdated(_changedProperties) {
  }
};
_e = finalized;
ReactiveElement[_e] = true;
ReactiveElement.elementProperties = /* @__PURE__ */ new Map();
ReactiveElement.elementStyles = [];
ReactiveElement.shadowRootOptions = { mode: "open" };
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({ ReactiveElement });
if (DEV_MODE) {
  ReactiveElement.enabledWarnings = ["change-in-update"];
  const ensureOwnWarnings = function(ctor) {
    if (!ctor.hasOwnProperty(JSCompiler_renameProperty("enabledWarnings", ctor))) {
      ctor.enabledWarnings = ctor.enabledWarnings.slice();
    }
  };
  ReactiveElement.enableWarning = function(warning2) {
    ensureOwnWarnings(this);
    if (this.enabledWarnings.indexOf(warning2) < 0) {
      this.enabledWarnings.push(warning2);
    }
  };
  ReactiveElement.disableWarning = function(warning2) {
    ensureOwnWarnings(this);
    const i = this.enabledWarnings.indexOf(warning2);
    if (i >= 0) {
      this.enabledWarnings.splice(i, 1);
    }
  };
}
((_d = global2.reactiveElementVersions) !== null && _d !== void 0 ? _d : global2.reactiveElementVersions = []).push("1.6.1");
if (DEV_MODE && global2.reactiveElementVersions.length > 1) {
  issueWarning("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}

// node_modules/.pnpm/lit-html@2.7.4/node_modules/lit-html/development/lit-html.js
var _a2;
var _b2;
var _c2;
var _d2;
var DEV_MODE2 = true;
var ENABLE_EXTRA_SECURITY_HOOKS = true;
var ENABLE_SHADYDOM_NOPATCH = true;
var NODE_MODE3 = false;
var global3 = NODE_MODE3 ? globalThis : window;
var debugLogEvent2 = DEV_MODE2 ? (event) => {
  const shouldEmit = global3.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global3.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
} : void 0;
var debugLogRenderId = 0;
var issueWarning2;
if (DEV_MODE2) {
  (_a2 = global3.litIssuedWarnings) !== null && _a2 !== void 0 ? _a2 : global3.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning2 = (code, warning2) => {
    warning2 += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!global3.litIssuedWarnings.has(warning2)) {
      console.warn(warning2);
      global3.litIssuedWarnings.add(warning2);
    }
  };
  issueWarning2("dev-mode", `Lit is in dev mode. Not recommended for production!`);
}
var wrap = ENABLE_SHADYDOM_NOPATCH && ((_b2 = global3.ShadyDOM) === null || _b2 === void 0 ? void 0 : _b2.inUse) && ((_c2 = global3.ShadyDOM) === null || _c2 === void 0 ? void 0 : _c2.noPatch) === true ? global3.ShadyDOM.wrap : (node) => node;
var trustedTypes2 = global3.trustedTypes;
var policy = trustedTypes2 ? trustedTypes2.createPolicy("lit-html", {
  createHTML: (s2) => s2
}) : void 0;
var identityFunction = (value) => value;
var noopSanitizer = (_node, _name, _type) => identityFunction;
var setSanitizer = (newSanitizer) => {
  if (!ENABLE_EXTRA_SECURITY_HOOKS) {
    return;
  }
  if (sanitizerFactoryInternal !== noopSanitizer) {
    throw new Error(`Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.`);
  }
  sanitizerFactoryInternal = newSanitizer;
};
var _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
  sanitizerFactoryInternal = noopSanitizer;
};
var createSanitizer = (node, name, type) => {
  return sanitizerFactoryInternal(node, name, type);
};
var boundAttributeSuffix = "$lit$";
var marker = `lit$${String(Math.random()).slice(9)}$`;
var markerMatch = "?" + marker;
var nodeMarker = `<${markerMatch}>`;
var d2 = NODE_MODE3 && global3.document === void 0 ? {
  createTreeWalker() {
    return {};
  }
} : document;
var createMarker = () => d2.createComment("");
var isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
var isArray = Array.isArray;
var isIterable = (value) => isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
typeof (value === null || value === void 0 ? void 0 : value[Symbol.iterator]) === "function";
var SPACE_CHAR = `[ 	
\f\r]`;
var ATTR_VALUE_CHAR = `[^ 	
\f\r"'\`<>=]`;
var NAME_CHAR = `[^\\s"'>=/]`;
var textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var COMMENT_START = 1;
var TAG_NAME = 2;
var DYNAMIC_TAG_NAME = 3;
var commentEndRegex = /-->/g;
var comment2EndRegex = />/g;
var tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, "g");
var ENTIRE_MATCH = 0;
var ATTRIBUTE_NAME = 1;
var SPACES_AND_EQUALS = 2;
var QUOTE_CHAR = 3;
var singleQuoteAttrEndRegex = /'/g;
var doubleQuoteAttrEndRegex = /"/g;
var rawTextElement = /^(?:script|style|textarea|title)$/i;
var HTML_RESULT = 1;
var SVG_RESULT = 2;
var ATTRIBUTE_PART = 1;
var CHILD_PART = 2;
var PROPERTY_PART = 3;
var BOOLEAN_ATTRIBUTE_PART = 4;
var EVENT_PART = 5;
var ELEMENT_PART = 6;
var COMMENT_PART = 7;
var tag = (type) => (strings, ...values) => {
  if (DEV_MODE2 && strings.some((s2) => s2 === void 0)) {
    console.warn("Some template strings are undefined.\nThis is probably caused by illegal octal escape sequences.");
  }
  return {
    // This property needs to remain unminified.
    ["_$litType$"]: type,
    strings,
    values
  };
};
var html = tag(HTML_RESULT);
var svg = tag(SVG_RESULT);
var noChange = Symbol.for("lit-noChange");
var nothing = Symbol.for("lit-nothing");
var templateCache = /* @__PURE__ */ new WeakMap();
var walker = d2.createTreeWalker(d2, 129, null, false);
var sanitizerFactoryInternal = noopSanitizer;
var getTemplateHtml = (strings, type) => {
  const l = strings.length - 1;
  const attrNames = [];
  let html2 = type === SVG_RESULT ? "<svg>" : "";
  let rawTextEndRegex;
  let regex = textEndRegex;
  for (let i = 0; i < l; i++) {
    const s2 = strings[i];
    let attrNameEndIndex = -1;
    let attrName;
    let lastIndex = 0;
    let match;
    while (lastIndex < s2.length) {
      regex.lastIndex = lastIndex;
      match = regex.exec(s2);
      if (match === null) {
        break;
      }
      lastIndex = regex.lastIndex;
      if (regex === textEndRegex) {
        if (match[COMMENT_START] === "!--") {
          regex = commentEndRegex;
        } else if (match[COMMENT_START] !== void 0) {
          regex = comment2EndRegex;
        } else if (match[TAG_NAME] !== void 0) {
          if (rawTextElement.test(match[TAG_NAME])) {
            rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, "g");
          }
          regex = tagEndRegex;
        } else if (match[DYNAMIC_TAG_NAME] !== void 0) {
          if (DEV_MODE2) {
            throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
          }
          regex = tagEndRegex;
        }
      } else if (regex === tagEndRegex) {
        if (match[ENTIRE_MATCH] === ">") {
          regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
          attrNameEndIndex = -1;
        } else if (match[ATTRIBUTE_NAME] === void 0) {
          attrNameEndIndex = -2;
        } else {
          attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
          attrName = match[ATTRIBUTE_NAME];
          regex = match[QUOTE_CHAR] === void 0 ? tagEndRegex : match[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
        }
      } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
        regex = tagEndRegex;
      } else if (regex === commentEndRegex || regex === comment2EndRegex) {
        regex = textEndRegex;
      } else {
        regex = tagEndRegex;
        rawTextEndRegex = void 0;
      }
    }
    if (DEV_MODE2) {
      console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, "unexpected parse state B");
    }
    const end = regex === tagEndRegex && strings[i + 1].startsWith("/>") ? " " : "";
    html2 += regex === textEndRegex ? s2 + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s2.slice(0, attrNameEndIndex) + boundAttributeSuffix + s2.slice(attrNameEndIndex)) + marker + end : s2 + marker + (attrNameEndIndex === -2 ? (attrNames.push(void 0), i) : end);
  }
  const htmlResult = html2 + (strings[l] || "<?>") + (type === SVG_RESULT ? "</svg>" : "");
  if (!Array.isArray(strings) || !strings.hasOwnProperty("raw")) {
    let message = "invalid template strings array";
    if (DEV_MODE2) {
      message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.

          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, "\n");
    }
    throw new Error(message);
  }
  return [
    policy !== void 0 ? policy.createHTML(htmlResult) : htmlResult,
    attrNames
  ];
};
var Template = class {
  constructor({ strings, ["_$litType$"]: type }, options) {
    this.parts = [];
    let node;
    let nodeIndex = 0;
    let attrNameIndex = 0;
    const partCount = strings.length - 1;
    const parts = this.parts;
    const [html2, attrNames] = getTemplateHtml(strings, type);
    this.el = Template.createElement(html2, options);
    walker.currentNode = this.el.content;
    if (type === SVG_RESULT) {
      const content = this.el.content;
      const svgElement = content.firstChild;
      svgElement.remove();
      content.append(...svgElement.childNodes);
    }
    while ((node = walker.nextNode()) !== null && parts.length < partCount) {
      if (node.nodeType === 1) {
        if (DEV_MODE2) {
          const tag2 = node.localName;
          if (/^(?:textarea|template)$/i.test(tag2) && node.innerHTML.includes(marker)) {
            const m = `Expressions are not supported inside \`${tag2}\` elements. See https://lit.dev/msg/expression-in-${tag2} for more information.`;
            if (tag2 === "template") {
              throw new Error(m);
            } else
              issueWarning2("", m);
          }
        }
        if (node.hasAttributes()) {
          const attrsToRemove = [];
          for (const name of node.getAttributeNames()) {
            if (name.endsWith(boundAttributeSuffix) || name.startsWith(marker)) {
              const realName = attrNames[attrNameIndex++];
              attrsToRemove.push(name);
              if (realName !== void 0) {
                const value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                const statics = value.split(marker);
                const m = /([.?@])?(.*)/.exec(realName);
                parts.push({
                  type: ATTRIBUTE_PART,
                  index: nodeIndex,
                  name: m[2],
                  strings: statics,
                  ctor: m[1] === "." ? PropertyPart : m[1] === "?" ? BooleanAttributePart : m[1] === "@" ? EventPart : AttributePart
                });
              } else {
                parts.push({
                  type: ELEMENT_PART,
                  index: nodeIndex
                });
              }
            }
          }
          for (const name of attrsToRemove) {
            node.removeAttribute(name);
          }
        }
        if (rawTextElement.test(node.tagName)) {
          const strings2 = node.textContent.split(marker);
          const lastIndex = strings2.length - 1;
          if (lastIndex > 0) {
            node.textContent = trustedTypes2 ? trustedTypes2.emptyScript : "";
            for (let i = 0; i < lastIndex; i++) {
              node.append(strings2[i], createMarker());
              walker.nextNode();
              parts.push({ type: CHILD_PART, index: ++nodeIndex });
            }
            node.append(strings2[lastIndex], createMarker());
          }
        }
      } else if (node.nodeType === 8) {
        const data2 = node.data;
        if (data2 === markerMatch) {
          parts.push({ type: CHILD_PART, index: nodeIndex });
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            parts.push({ type: COMMENT_PART, index: nodeIndex });
            i += marker.length - 1;
          }
        }
      }
      nodeIndex++;
    }
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "template prep",
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings
    });
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @nocollapse */
  static createElement(html2, _options) {
    const el = d2.createElement("template");
    el.innerHTML = html2;
    return el;
  }
};
function resolveDirective(part, value, parent = part, attributeIndex) {
  var _a6, _b4, _c4;
  var _d3;
  if (value === noChange) {
    return value;
  }
  let currentDirective = attributeIndex !== void 0 ? (_a6 = parent.__directives) === null || _a6 === void 0 ? void 0 : _a6[attributeIndex] : parent.__directive;
  const nextDirectiveConstructor = isPrimitive(value) ? void 0 : (
    // This property needs to remain unminified.
    value["_$litDirective$"]
  );
  if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
    (_b4 = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective["_$notifyDirectiveConnectionChanged"]) === null || _b4 === void 0 ? void 0 : _b4.call(currentDirective, false);
    if (nextDirectiveConstructor === void 0) {
      currentDirective = void 0;
    } else {
      currentDirective = new nextDirectiveConstructor(part);
      currentDirective._$initialize(part, parent, attributeIndex);
    }
    if (attributeIndex !== void 0) {
      ((_c4 = (_d3 = parent).__directives) !== null && _c4 !== void 0 ? _c4 : _d3.__directives = [])[attributeIndex] = currentDirective;
    } else {
      parent.__directive = currentDirective;
    }
  }
  if (currentDirective !== void 0) {
    value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
  }
  return value;
}
var TemplateInstance = class {
  constructor(template, parent) {
    this._$parts = [];
    this._$disconnectableChildren = void 0;
    this._$template = template;
    this._$parent = parent;
  }
  // Called by ChildPart parentNode getter
  get parentNode() {
    return this._$parent.parentNode;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  // This method is separate from the constructor because we need to return a
  // DocumentFragment and we don't want to hold onto it with an instance field.
  _clone(options) {
    var _a6;
    const { el: { content }, parts } = this._$template;
    const fragment = ((_a6 = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a6 !== void 0 ? _a6 : d2).importNode(content, true);
    walker.currentNode = fragment;
    let node = walker.nextNode();
    let nodeIndex = 0;
    let partIndex = 0;
    let templatePart = parts[0];
    while (templatePart !== void 0) {
      if (nodeIndex === templatePart.index) {
        let part;
        if (templatePart.type === CHILD_PART) {
          part = new ChildPart(node, node.nextSibling, this, options);
        } else if (templatePart.type === ATTRIBUTE_PART) {
          part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
        } else if (templatePart.type === ELEMENT_PART) {
          part = new ElementPart(node, this, options);
        }
        this._$parts.push(part);
        templatePart = parts[++partIndex];
      }
      if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
        node = walker.nextNode();
        nodeIndex++;
      }
    }
    walker.currentNode = d2;
    return fragment;
  }
  _update(values) {
    let i = 0;
    for (const part of this._$parts) {
      if (part !== void 0) {
        debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
          kind: "set part",
          part,
          value: values[i],
          valueIndex: i,
          values,
          templateInstance: this
        });
        if (part.strings !== void 0) {
          part._$setValue(values, part, i);
          i += part.strings.length - 2;
        } else {
          part._$setValue(values[i]);
        }
      }
      i++;
    }
  }
};
var ChildPart = class {
  constructor(startNode, endNode, parent, options) {
    var _a6;
    this.type = CHILD_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this._$startNode = startNode;
    this._$endNode = endNode;
    this._$parent = parent;
    this.options = options;
    this.__isConnected = (_a6 = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a6 !== void 0 ? _a6 : true;
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      this._textSanitizer = void 0;
    }
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    var _a6, _b4;
    return (_b4 = (_a6 = this._$parent) === null || _a6 === void 0 ? void 0 : _a6._$isConnected) !== null && _b4 !== void 0 ? _b4 : this.__isConnected;
  }
  /**
   * The parent node into which the part renders its content.
   *
   * A ChildPart's content consists of a range of adjacent child nodes of
   * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
   * `.endNode`).
   *
   * - If both `.startNode` and `.endNode` are non-null, then the part's content
   * consists of all siblings between `.startNode` and `.endNode`, exclusively.
   *
   * - If `.startNode` is non-null but `.endNode` is null, then the part's
   * content consists of all siblings following `.startNode`, up to and
   * including the last child of `.parentNode`. If `.endNode` is non-null, then
   * `.startNode` will always be non-null.
   *
   * - If both `.endNode` and `.startNode` are null, then the part's content
   * consists of all child nodes of `.parentNode`.
   */
  get parentNode() {
    let parentNode = wrap(this._$startNode).parentNode;
    const parent = this._$parent;
    if (parent !== void 0 && (parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 11) {
      parentNode = parent.parentNode;
    }
    return parentNode;
  }
  /**
   * The part's leading marker node, if any. See `.parentNode` for more
   * information.
   */
  get startNode() {
    return this._$startNode;
  }
  /**
   * The part's trailing marker node, if any. See `.parentNode` for more
   * information.
   */
  get endNode() {
    return this._$endNode;
  }
  _$setValue(value, directiveParent = this) {
    var _a6;
    if (DEV_MODE2 && this.parentNode === null) {
      throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
    }
    value = resolveDirective(this, value, directiveParent);
    if (isPrimitive(value)) {
      if (value === nothing || value == null || value === "") {
        if (this._$committedValue !== nothing) {
          debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
            kind: "commit nothing to child",
            start: this._$startNode,
            end: this._$endNode,
            parent: this._$parent,
            options: this.options
          });
          this._$clear();
        }
        this._$committedValue = nothing;
      } else if (value !== this._$committedValue && value !== noChange) {
        this._commitText(value);
      }
    } else if (value["_$litType$"] !== void 0) {
      this._commitTemplateResult(value);
    } else if (value.nodeType !== void 0) {
      if (DEV_MODE2 && ((_a6 = this.options) === null || _a6 === void 0 ? void 0 : _a6.host) === value) {
        this._commitText(`[probable mistake: rendered a template's host in itself (commonly caused by writing \${this} in a template]`);
        console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
        return;
      }
      this._commitNode(value);
    } else if (isIterable(value)) {
      this._commitIterable(value);
    } else {
      this._commitText(value);
    }
  }
  _insert(node) {
    return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
  }
  _commitNode(value) {
    var _a6;
    if (this._$committedValue !== value) {
      this._$clear();
      if (ENABLE_EXTRA_SECURITY_HOOKS && sanitizerFactoryInternal !== noopSanitizer) {
        const parentNodeName = (_a6 = this._$startNode.parentNode) === null || _a6 === void 0 ? void 0 : _a6.nodeName;
        if (parentNodeName === "STYLE" || parentNodeName === "SCRIPT") {
          let message = "Forbidden";
          if (DEV_MODE2) {
            if (parentNodeName === "STYLE") {
              message = `Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css\`...\` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.`;
            } else {
              message = `Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.`;
            }
          }
          throw new Error(message);
        }
      }
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "commit node",
        start: this._$startNode,
        parent: this._$parent,
        value,
        options: this.options
      });
      this._$committedValue = this._insert(value);
    }
  }
  _commitText(value) {
    if (this._$committedValue !== nothing && isPrimitive(this._$committedValue)) {
      const node = wrap(this._$startNode).nextSibling;
      if (ENABLE_EXTRA_SECURITY_HOOKS) {
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(node, "data", "property");
        }
        value = this._textSanitizer(value);
      }
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "commit text",
        node,
        value,
        options: this.options
      });
      node.data = value;
    } else {
      if (ENABLE_EXTRA_SECURITY_HOOKS) {
        const textNode = d2.createTextNode("");
        this._commitNode(textNode);
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(textNode, "data", "property");
        }
        value = this._textSanitizer(value);
        debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
          kind: "commit text",
          node: textNode,
          value,
          options: this.options
        });
        textNode.data = value;
      } else {
        this._commitNode(d2.createTextNode(value));
        debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
          kind: "commit text",
          node: wrap(this._$startNode).nextSibling,
          value,
          options: this.options
        });
      }
    }
    this._$committedValue = value;
  }
  _commitTemplateResult(result) {
    var _a6;
    const { values, ["_$litType$"]: type } = result;
    const template = typeof type === "number" ? this._$getTemplate(result) : (type.el === void 0 && (type.el = Template.createElement(type.h, this.options)), type);
    if (((_a6 = this._$committedValue) === null || _a6 === void 0 ? void 0 : _a6._$template) === template) {
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "template updating",
        template,
        instance: this._$committedValue,
        parts: this._$committedValue._$parts,
        options: this.options,
        values
      });
      this._$committedValue._update(values);
    } else {
      const instance = new TemplateInstance(template, this);
      const fragment = instance._clone(this.options);
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "template instantiated",
        template,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      instance._update(values);
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "template instantiated and updated",
        template,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      this._commitNode(fragment);
      this._$committedValue = instance;
    }
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @internal */
  _$getTemplate(result) {
    let template = templateCache.get(result.strings);
    if (template === void 0) {
      templateCache.set(result.strings, template = new Template(result));
    }
    return template;
  }
  _commitIterable(value) {
    if (!isArray(this._$committedValue)) {
      this._$committedValue = [];
      this._$clear();
    }
    const itemParts = this._$committedValue;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      if (partIndex === itemParts.length) {
        itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
      } else {
        itemPart = itemParts[partIndex];
      }
      itemPart._$setValue(item);
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
      itemParts.length = partIndex;
    }
  }
  /**
   * Removes the nodes contained within this Part from the DOM.
   *
   * @param start Start node to clear from, for clearing a subset of the part's
   *     DOM (used when truncating iterables)
   * @param from  When `start` is specified, the index within the iterable from
   *     which ChildParts are being removed, used for disconnecting directives in
   *     those Parts.
   *
   * @internal
   */
  _$clear(start = wrap(this._$startNode).nextSibling, from) {
    var _a6;
    (_a6 = this._$notifyConnectionChanged) === null || _a6 === void 0 ? void 0 : _a6.call(this, false, true, from);
    while (start && start !== this._$endNode) {
      const n = wrap(start).nextSibling;
      wrap(start).remove();
      start = n;
    }
  }
  /**
   * Implementation of RootPart's `isConnected`. Note that this metod
   * should only be called on `RootPart`s (the `ChildPart` returned from a
   * top-level `render()` call). It has no effect on non-root ChildParts.
   * @param isConnected Whether to set
   * @internal
   */
  setConnected(isConnected) {
    var _a6;
    if (this._$parent === void 0) {
      this.__isConnected = isConnected;
      (_a6 = this._$notifyConnectionChanged) === null || _a6 === void 0 ? void 0 : _a6.call(this, isConnected);
    } else if (DEV_MODE2) {
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
    }
  }
};
var AttributePart = class {
  constructor(element, name, strings, parent, options) {
    this.type = ATTRIBUTE_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this.element = element;
    this.name = name;
    this._$parent = parent;
    this.options = options;
    if (strings.length > 2 || strings[0] !== "" || strings[1] !== "") {
      this._$committedValue = new Array(strings.length - 1).fill(new String());
      this.strings = strings;
    } else {
      this._$committedValue = nothing;
    }
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      this._sanitizer = void 0;
    }
  }
  get tagName() {
    return this.element.tagName;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  /**
   * Sets the value of this part by resolving the value from possibly multiple
   * values and static strings and committing it to the DOM.
   * If this part is single-valued, `this._strings` will be undefined, and the
   * method will be called with a single value argument. If this part is
   * multi-value, `this._strings` will be defined, and the method is called
   * with the value array of the part's owning TemplateInstance, and an offset
   * into the value array from which the values should be read.
   * This method is overloaded this way to eliminate short-lived array slices
   * of the template instance values, and allow a fast-path for single-valued
   * parts.
   *
   * @param value The part value, or an array of values for multi-valued parts
   * @param valueIndex the index to start reading values from. `undefined` for
   *   single-valued parts
   * @param noCommit causes the part to not commit its value to the DOM. Used
   *   in hydration to prime attribute parts with their first-rendered value,
   *   but not set the attribute, and in SSR to no-op the DOM operation and
   *   capture the value for serialization.
   *
   * @internal
   */
  _$setValue(value, directiveParent = this, valueIndex, noCommit) {
    const strings = this.strings;
    let change = false;
    if (strings === void 0) {
      value = resolveDirective(this, value, directiveParent, 0);
      change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange;
      if (change) {
        this._$committedValue = value;
      }
    } else {
      const values = value;
      value = strings[0];
      let i, v;
      for (i = 0; i < strings.length - 1; i++) {
        v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
        if (v === noChange) {
          v = this._$committedValue[i];
        }
        change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
        if (v === nothing) {
          value = nothing;
        } else if (value !== nothing) {
          value += (v !== null && v !== void 0 ? v : "") + strings[i + 1];
        }
        this._$committedValue[i] = v;
      }
    }
    if (change && !noCommit) {
      this._commitValue(value);
    }
  }
  /** @internal */
  _commitValue(value) {
    if (value === nothing) {
      wrap(this.element).removeAttribute(this.name);
    } else {
      if (ENABLE_EXTRA_SECURITY_HOOKS) {
        if (this._sanitizer === void 0) {
          this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "attribute");
        }
        value = this._sanitizer(value !== null && value !== void 0 ? value : "");
      }
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "commit attribute",
        element: this.element,
        name: this.name,
        value,
        options: this.options
      });
      wrap(this.element).setAttribute(this.name, value !== null && value !== void 0 ? value : "");
    }
  }
};
var PropertyPart = class extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = PROPERTY_PART;
  }
  /** @internal */
  _commitValue(value) {
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      if (this._sanitizer === void 0) {
        this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "property");
      }
      value = this._sanitizer(value);
    }
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit property",
      element: this.element,
      name: this.name,
      value,
      options: this.options
    });
    this.element[this.name] = value === nothing ? void 0 : value;
  }
};
var emptyStringForBooleanAttribute2 = trustedTypes2 ? trustedTypes2.emptyScript : "";
var BooleanAttributePart = class extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = BOOLEAN_ATTRIBUTE_PART;
  }
  /** @internal */
  _commitValue(value) {
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit boolean attribute",
      element: this.element,
      name: this.name,
      value: !!(value && value !== nothing),
      options: this.options
    });
    if (value && value !== nothing) {
      wrap(this.element).setAttribute(this.name, emptyStringForBooleanAttribute2);
    } else {
      wrap(this.element).removeAttribute(this.name);
    }
  }
};
var EventPart = class extends AttributePart {
  constructor(element, name, strings, parent, options) {
    super(element, name, strings, parent, options);
    this.type = EVENT_PART;
    if (DEV_MODE2 && this.strings !== void 0) {
      throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
    }
  }
  // EventPart does not use the base _$setValue/_resolveValue implementation
  // since the dirty checking is more complex
  /** @internal */
  _$setValue(newListener, directiveParent = this) {
    var _a6;
    newListener = (_a6 = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a6 !== void 0 ? _a6 : nothing;
    if (newListener === noChange) {
      return;
    }
    const oldListener = this._$committedValue;
    const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
    const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit event listener",
      element: this.element,
      name: this.name,
      value: newListener,
      options: this.options,
      removeListener: shouldRemoveListener,
      addListener: shouldAddListener,
      oldListener
    });
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.name, this, oldListener);
    }
    if (shouldAddListener) {
      this.element.addEventListener(this.name, this, newListener);
    }
    this._$committedValue = newListener;
  }
  handleEvent(event) {
    var _a6, _b4;
    if (typeof this._$committedValue === "function") {
      this._$committedValue.call((_b4 = (_a6 = this.options) === null || _a6 === void 0 ? void 0 : _a6.host) !== null && _b4 !== void 0 ? _b4 : this.element, event);
    } else {
      this._$committedValue.handleEvent(event);
    }
  }
};
var ElementPart = class {
  constructor(element, parent, options) {
    this.element = element;
    this.type = ELEMENT_PART;
    this._$disconnectableChildren = void 0;
    this._$parent = parent;
    this.options = options;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value) {
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit to element binding",
      element: this.element,
      value,
      options: this.options
    });
    resolveDirective(this, value);
  }
};
var polyfillSupport2 = DEV_MODE2 ? global3.litHtmlPolyfillSupportDevMode : global3.litHtmlPolyfillSupport;
polyfillSupport2 === null || polyfillSupport2 === void 0 ? void 0 : polyfillSupport2(Template, ChildPart);
((_d2 = global3.litHtmlVersions) !== null && _d2 !== void 0 ? _d2 : global3.litHtmlVersions = []).push("2.7.4");
if (DEV_MODE2 && global3.litHtmlVersions.length > 1) {
  issueWarning2("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
var render = (value, container, options) => {
  var _a6, _b4;
  if (DEV_MODE2 && container == null) {
    throw new TypeError(`The container to render into may not be ${container}`);
  }
  const renderId = DEV_MODE2 ? debugLogRenderId++ : 0;
  const partOwnerNode = (_a6 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a6 !== void 0 ? _a6 : container;
  let part = partOwnerNode["_$litPart$"];
  debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
    kind: "begin render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  if (part === void 0) {
    const endNode = (_b4 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _b4 !== void 0 ? _b4 : null;
    partOwnerNode["_$litPart$"] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, void 0, options !== null && options !== void 0 ? options : {});
  }
  part._$setValue(value);
  debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
    kind: "end render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  return part;
};
if (ENABLE_EXTRA_SECURITY_HOOKS) {
  render.setSanitizer = setSanitizer;
  render.createSanitizer = createSanitizer;
  if (DEV_MODE2) {
    render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
  }
}

// node_modules/.pnpm/lit-element@3.3.2/node_modules/lit-element/development/lit-element.js
var _a3;
var _b3;
var _c3;
var DEV_MODE3 = true;
var issueWarning3;
if (DEV_MODE3) {
  const issuedWarnings = (_a3 = globalThis.litIssuedWarnings) !== null && _a3 !== void 0 ? _a3 : globalThis.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning3 = (code, warning2) => {
    warning2 += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning2)) {
      console.warn(warning2);
      issuedWarnings.add(warning2);
    }
  };
}
var LitElement = class extends ReactiveElement {
  constructor() {
    super(...arguments);
    this.renderOptions = { host: this };
    this.__childPart = void 0;
  }
  /**
   * @category rendering
   */
  createRenderRoot() {
    var _a6;
    var _b4;
    const renderRoot = super.createRenderRoot();
    (_a6 = (_b4 = this.renderOptions).renderBefore) !== null && _a6 !== void 0 ? _a6 : _b4.renderBefore = renderRoot.firstChild;
    return renderRoot;
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param changedProperties Map of changed properties with old values
   * @category updates
   */
  update(changedProperties) {
    const value = this.render();
    if (!this.hasUpdated) {
      this.renderOptions.isConnected = this.isConnected;
    }
    super.update(changedProperties);
    this.__childPart = render(value, this.renderRoot, this.renderOptions);
  }
  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   *
   * ```ts
   * connectedCallback() {
   *   super.connectedCallback();
   *   addEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * Typically, anything done in `connectedCallback()` should be undone when the
   * element is disconnected, in `disconnectedCallback()`.
   *
   * @category lifecycle
   */
  connectedCallback() {
    var _a6;
    super.connectedCallback();
    (_a6 = this.__childPart) === null || _a6 === void 0 ? void 0 : _a6.setConnected(true);
  }
  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * ```ts
   * disconnectedCallback() {
   *   super.disconnectedCallback();
   *   window.removeEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * An element may be re-connected after being disconnected.
   *
   * @category lifecycle
   */
  disconnectedCallback() {
    var _a6;
    super.disconnectedCallback();
    (_a6 = this.__childPart) === null || _a6 === void 0 ? void 0 : _a6.setConnected(false);
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `ChildPart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   * @category rendering
   */
  render() {
    return noChange;
  }
};
LitElement["finalized"] = true;
LitElement["_$litElement$"] = true;
(_b3 = globalThis.litElementHydrateSupport) === null || _b3 === void 0 ? void 0 : _b3.call(globalThis, { LitElement });
var polyfillSupport3 = DEV_MODE3 ? globalThis.litElementPolyfillSupportDevMode : globalThis.litElementPolyfillSupport;
polyfillSupport3 === null || polyfillSupport3 === void 0 ? void 0 : polyfillSupport3({ LitElement });
if (DEV_MODE3) {
  LitElement["finalize"] = function() {
    const finalized2 = ReactiveElement.finalize.call(this);
    if (!finalized2) {
      return false;
    }
    const warnRemovedOrRenamed = (obj, name, renamed = false) => {
      if (obj.hasOwnProperty(name)) {
        const ctorName = (typeof obj === "function" ? obj : obj.constructor).name;
        issueWarning3(renamed ? "renamed-api" : "removed-api", `\`${name}\` is implemented on class ${ctorName}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
      }
    };
    warnRemovedOrRenamed(this, "render");
    warnRemovedOrRenamed(this, "getStyles", true);
    warnRemovedOrRenamed(this.prototype, "adoptStyles");
    return true;
  };
}
((_c3 = globalThis.litElementVersions) !== null && _c3 !== void 0 ? _c3 : globalThis.litElementVersions = []).push("3.3.2");
if (DEV_MODE3 && globalThis.litElementVersions.length > 1) {
  issueWarning3("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}

// node_modules/.pnpm/@lit+reactive-element@1.6.1/node_modules/@lit/reactive-element/development/decorators/custom-element.js
var legacyCustomElement = (tagName, clazz) => {
  customElements.define(tagName, clazz);
  return clazz;
};
var standardCustomElement = (tagName, descriptor) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    // This callback is called once the class is otherwise fully defined
    finisher(clazz) {
      customElements.define(tagName, clazz);
    }
  };
};
var customElement = (tagName) => (classOrDescriptor) => typeof classOrDescriptor === "function" ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);

// node_modules/.pnpm/@lit+reactive-element@1.6.1/node_modules/@lit/reactive-element/development/decorators/property.js
var standardProperty = (options, element) => {
  if (element.kind === "method" && element.descriptor && !("value" in element.descriptor)) {
    return {
      ...element,
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  } else {
    return {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      // store the original key so subsequent decorators have access to it.
      originalKey: element.key,
      // When @babel/plugin-proposal-decorators implements initializers,
      // do this instead of the initializer below. See:
      // https://github.com/babel/babel/issues/9260 extras: [
      //   {
      //     kind: 'initializer',
      //     placement: 'own',
      //     initializer: descriptor.initializer,
      //   }
      // ],
      initializer() {
        if (typeof element.initializer === "function") {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
var legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
function property(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}

// node_modules/.pnpm/@lit+reactive-element@1.6.1/node_modules/@lit/reactive-element/development/decorators/state.js
function state(options) {
  return property({
    ...options,
    state: true
  });
}

// node_modules/.pnpm/@lit+reactive-element@1.6.1/node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js
var _a4;
var NODE_MODE4 = false;
var global4 = NODE_MODE4 ? globalThis : window;
var slotAssignedElements = ((_a4 = global4.HTMLSlotElement) === null || _a4 === void 0 ? void 0 : _a4.prototype.assignedElements) != null ? (slot, opts) => slot.assignedElements(opts) : (slot, opts) => slot.assignedNodes(opts).filter((node) => node.nodeType === Node.ELEMENT_NODE);

// node_modules/.pnpm/lit-html@2.7.4/node_modules/lit-html/development/directive.js
var PartType = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
};
var directive = (c2) => (...values) => ({
  // This property needs to remain unminified.
  ["_$litDirective$"]: c2,
  values
});
var Directive = class {
  constructor(_partInfo) {
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  /** @internal */
  _$initialize(part, parent, attributeIndex) {
    this.__part = part;
    this._$parent = parent;
    this.__attributeIndex = attributeIndex;
  }
  /** @internal */
  _$resolve(part, props) {
    return this.update(part, props);
  }
  update(_part, props) {
    return this.render(...props);
  }
};

// node_modules/.pnpm/lit-html@2.7.4/node_modules/lit-html/development/directives/class-map.js
var ClassMapDirective = class extends Directive {
  constructor(partInfo) {
    var _a6;
    super(partInfo);
    if (partInfo.type !== PartType.ATTRIBUTE || partInfo.name !== "class" || ((_a6 = partInfo.strings) === null || _a6 === void 0 ? void 0 : _a6.length) > 2) {
      throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
  }
  render(classInfo) {
    return " " + Object.keys(classInfo).filter((key) => classInfo[key]).join(" ") + " ";
  }
  update(part, [classInfo]) {
    var _a6, _b4;
    if (this._previousClasses === void 0) {
      this._previousClasses = /* @__PURE__ */ new Set();
      if (part.strings !== void 0) {
        this._staticClasses = new Set(part.strings.join(" ").split(/\s/).filter((s2) => s2 !== ""));
      }
      for (const name in classInfo) {
        if (classInfo[name] && !((_a6 = this._staticClasses) === null || _a6 === void 0 ? void 0 : _a6.has(name))) {
          this._previousClasses.add(name);
        }
      }
      return this.render(classInfo);
    }
    const classList = part.element.classList;
    this._previousClasses.forEach((name) => {
      if (!(name in classInfo)) {
        classList.remove(name);
        this._previousClasses.delete(name);
      }
    });
    for (const name in classInfo) {
      const value = !!classInfo[name];
      if (value !== this._previousClasses.has(name) && !((_b4 = this._staticClasses) === null || _b4 === void 0 ? void 0 : _b4.has(name))) {
        if (value) {
          classList.add(name);
          this._previousClasses.add(name);
        } else {
          classList.remove(name);
          this._previousClasses.delete(name);
        }
      }
    }
    return noChange;
  }
};
var classMap = directive(ClassMapDirective);

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/array.es.js
function addUniqueItem(array, item) {
  array.indexOf(item) === -1 && array.push(item);
}

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/clamp.es.js
var clamp = (min, max, v) => Math.min(Math.max(v, min), max);

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/defaults.es.js
var defaults = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
};

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/is-number.es.js
var isNumber = (value) => typeof value === "number";

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/is-easing-list.es.js
var isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/wrap.es.js
var wrap2 = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/easing.es.js
function getEasingForSegment(easing, i) {
  return isEasingList(easing) ? easing[wrap2(0, easing.length, i)] : easing;
}

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/mix.es.js
var mix = (min, max, progress2) => -progress2 * min + progress2 * max + min;

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/noop.es.js
var noop = () => {
};
var noopReturn = (v) => v;

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/progress.es.js
var progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/offset.es.js
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mix(min, 1, offsetProgress));
  }
}
function defaultOffset(length) {
  const offset = [0];
  fillOffset(offset, length - 1);
  return offset;
}

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/interpolate.es.js
function interpolate(output, input = defaultOffset(output.length), easing = noopReturn) {
  const length = output.length;
  const remainder = length - input.length;
  remainder > 0 && fillOffset(input, remainder);
  return (t) => {
    let i = 0;
    for (; i < length - 2; i++) {
      if (t < input[i + 1])
        break;
    }
    let progressInRange = clamp(0, 1, progress(input[i], input[i + 1], t));
    const segmentEasing = getEasingForSegment(easing, i);
    progressInRange = segmentEasing(progressInRange);
    return mix(output[i], output[i + 1], progressInRange);
  };
}

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/is-cubic-bezier.es.js
var isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/is-easing-generator.es.js
var isEasingGenerator = (easing) => typeof easing === "object" && Boolean(easing.createAnimation);

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/is-function.es.js
var isFunction = (value) => typeof value === "function";

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/is-string.es.js
var isString = (value) => typeof value === "string";

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/time.es.js
var time = {
  ms: (seconds) => seconds * 1e3,
  s: (milliseconds) => milliseconds / 1e3
};

// node_modules/.pnpm/@motionone+utils@10.15.1/node_modules/@motionone/utils/dist/velocity.es.js
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/.pnpm/@motionone+easing@10.15.1/node_modules/@motionone/easing/dist/cubic-bezier.es.js
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noopReturn;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

// node_modules/.pnpm/@motionone+easing@10.15.1/node_modules/@motionone/easing/dist/steps.es.js
var steps = (steps2, direction = "end") => (progress2) => {
  progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
  const expanded = progress2 * steps2;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return clamp(0, 1, rounded / steps2);
};

// node_modules/.pnpm/@motionone+animation@10.15.1/node_modules/@motionone/animation/dist/utils/easing.es.js
var namedEasings = {
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  "ease-in": cubicBezier(0.42, 0, 1, 1),
  "ease-in-out": cubicBezier(0.42, 0, 0.58, 1),
  "ease-out": cubicBezier(0, 0, 0.58, 1)
};
var functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
  if (isFunction(definition))
    return definition;
  if (isCubicBezier(definition))
    return cubicBezier(...definition);
  if (namedEasings[definition])
    return namedEasings[definition];
  if (definition.startsWith("steps")) {
    const args = functionArgsRegex.exec(definition);
    if (args) {
      const argsArray = args[1].split(",");
      return steps(parseFloat(argsArray[0]), argsArray[1].trim());
    }
  }
  return noopReturn;
}

// node_modules/.pnpm/@motionone+animation@10.15.1/node_modules/@motionone/animation/dist/Animation.es.js
var Animation = class {
  constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset, direction = "normal" } = {}) {
    this.startTime = null;
    this.rate = 1;
    this.t = 0;
    this.cancelTimestamp = null;
    this.easing = noopReturn;
    this.duration = 0;
    this.totalDuration = 0;
    this.repeat = 0;
    this.playState = "idle";
    this.finished = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    easing = easing || defaults.easing;
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      initialDuration = custom.duration || initialDuration;
    }
    this.repeat = repeat;
    this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
    this.updateDuration(initialDuration);
    const interpolate$1 = interpolate(keyframes, offset, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
    this.tick = (timestamp) => {
      var _a6;
      delay = delay;
      let t = 0;
      if (this.pauseTime !== void 0) {
        t = this.pauseTime;
      } else {
        t = (timestamp - this.startTime) * this.rate;
      }
      this.t = t;
      t /= 1e3;
      t = Math.max(t - delay, 0);
      if (this.playState === "finished" && this.pauseTime === void 0) {
        t = this.totalDuration;
      }
      const progress2 = t / this.duration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      const iterationIsOdd = currentIteration % 2;
      if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
        iterationProgress = 1 - iterationProgress;
      }
      const p = t >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
      const latest = interpolate$1(this.easing(p));
      output(latest);
      const isAnimationFinished = this.pauseTime === void 0 && (this.playState === "finished" || t >= this.totalDuration + endDelay);
      if (isAnimationFinished) {
        this.playState = "finished";
        (_a6 = this.resolve) === null || _a6 === void 0 ? void 0 : _a6.call(this, latest);
      } else if (this.playState !== "idle") {
        this.frameRequestId = requestAnimationFrame(this.tick);
      }
    };
    this.play();
  }
  play() {
    const now = performance.now();
    this.playState = "running";
    if (this.pauseTime !== void 0) {
      this.startTime = now - this.pauseTime;
    } else if (!this.startTime) {
      this.startTime = now;
    }
    this.cancelTimestamp = this.startTime;
    this.pauseTime = void 0;
    this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused";
    this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished";
    this.tick(0);
  }
  stop() {
    var _a6;
    this.playState = "idle";
    if (this.frameRequestId !== void 0) {
      cancelAnimationFrame(this.frameRequestId);
    }
    (_a6 = this.reject) === null || _a6 === void 0 ? void 0 : _a6.call(this, false);
  }
  cancel() {
    this.stop();
    this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {
  }
  updateDuration(duration) {
    this.duration = duration;
    this.totalDuration = duration * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(t) {
    if (this.pauseTime !== void 0 || this.rate === 0) {
      this.pauseTime = t;
    } else {
      this.startTime = performance.now() - t / this.rate;
    }
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(rate) {
    this.rate = rate;
  }
};

// node_modules/.pnpm/hey-listen@1.0.8/node_modules/hey-listen/dist/hey-listen.es.js
var warning = function() {
};
var invariant = function() {
};
if (true) {
  warning = function(check, message) {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant = function(check, message) {
    if (!check) {
      throw new Error(message);
    }
  };
}

// node_modules/.pnpm/@motionone+types@10.15.1/node_modules/@motionone/types/dist/MotionValue.es.js
var MotionValue = class {
  setAnimation(animation) {
    this.animation = animation;
    animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {
    });
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
};

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/data.es.js
var data = /* @__PURE__ */ new WeakMap();
function getAnimationData(element) {
  if (!data.has(element)) {
    data.set(element, {
      transforms: [],
      values: /* @__PURE__ */ new Map()
    });
  }
  return data.get(element);
}
function getMotionValue(motionValues, name) {
  if (!motionValues.has(name)) {
    motionValues.set(name, new MotionValue());
  }
  return motionValues.get(name);
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/transforms.es.js
var axes = ["", "X", "Y", "Z"];
var order = ["translate", "scale", "rotate", "skew"];
var transformAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
var rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v) => v + "deg"
};
var baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v) => v + "px"
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn
  },
  skew: rotation
};
var transformDefinitions = /* @__PURE__ */ new Map();
var asTransformCssVar = (name) => `--motion-${name}`;
var transforms = ["x", "y", "z"];
order.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis);
    transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
  });
});
var compareTransformOrder = (a, b2) => transforms.indexOf(a) - transforms.indexOf(b2);
var transformLookup = new Set(transforms);
var isTransform = (name) => transformLookup.has(name);
var addTransformToElement = (element, name) => {
  if (transformAlias[name])
    name = transformAlias[name];
  const { transforms: transforms2 } = getAnimationData(element);
  addUniqueItem(transforms2, name);
  element.style.transform = buildTransformTemplate(transforms2);
};
var buildTransformTemplate = (transforms2) => transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim();
var transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/css-var.es.js
var isCssVar = (name) => name.startsWith("--");
var registeredProperties = /* @__PURE__ */ new Set();
function registerCssVariable(name) {
  if (registeredProperties.has(name))
    return;
  registeredProperties.add(name);
  try {
    const { syntax, initialValue } = transformDefinitions.has(name) ? transformDefinitions.get(name) : {};
    CSS.registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue
    });
  } catch (e) {
  }
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js
var testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
var featureTests = {
  cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({ opacity: [1] });
    } catch (e) {
      return false;
    }
    return true;
  },
  finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 1e-3 }).finished),
  linearEasing: () => {
    try {
      testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e) {
      return false;
    }
    return true;
  }
};
var results = {};
var supports = {};
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === void 0)
      results[key] = featureTests[key]();
    return results[key];
  };
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/easing.es.js
var resolution = 0.015;
var generateLinearEasingPoints = (easing, duration) => {
  let points = "";
  const numPoints = Math.round(duration / resolution);
  for (let i = 0; i < numPoints; i++) {
    points += easing(progress(0, numPoints - 1, i)) + ", ";
  }
  return points.substring(0, points.length - 2);
};
var convertEasing = (easing, duration) => {
  if (isFunction(easing)) {
    return supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : defaults.easing;
  } else {
    return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
  }
};
var cubicBezierAsString = ([a, b2, c2, d4]) => `cubic-bezier(${a}, ${b2}, ${c2}, ${d4})`;

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js
function hydrateKeyframes(keyframes, readInitialValue) {
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] === null) {
      keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
    }
  }
  return keyframes;
}
var keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js
function getStyleName(key) {
  if (transformAlias[key])
    key = transformAlias[key];
  return isTransform(key) ? asTransformCssVar(key) : key;
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/style.es.js
var style = {
  get: (element, name) => {
    name = getStyleName(name);
    let value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
    if (!value && value !== 0) {
      const definition = transformDefinitions.get(name);
      if (definition)
        value = definition.initialValue;
    }
    return value;
  },
  set: (element, name, value) => {
    name = getStyleName(name);
    if (isCssVar(name)) {
      element.style.setProperty(name, value);
    } else {
      element.style[name] = value;
    }
  }
};

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js
function stopAnimation(animation, needsCommit = true) {
  if (!animation || animation.playState === "finished")
    return;
  try {
    if (animation.stop) {
      animation.stop();
    } else {
      needsCommit && animation.commitStyles();
      animation.cancel();
    }
  } catch (e) {
  }
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js
function getUnitConverter(keyframes, definition) {
  var _a6;
  let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
  const finalKeyframe = keyframes[keyframes.length - 1];
  if (isString(finalKeyframe)) {
    const unit = ((_a6 = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a6 === void 0 ? void 0 : _a6[2]) || "";
    if (unit)
      toUnit = (value) => value + unit;
  }
  return toUnit;
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/animate-style.es.js
function getDevToolsRecord() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
  const record = getDevToolsRecord();
  const isRecording = options.record !== false && record;
  let animation;
  let { duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, easing = defaults.easing, persist = false, direction, offset, allowWebkitAcceleration = false } = options;
  const data2 = getAnimationData(element);
  const valueIsTransform = isTransform(key);
  let canAnimateNatively = supports.waapi();
  valueIsTransform && addTransformToElement(element, key);
  const name = getStyleName(key);
  const motionValue = getMotionValue(data2.values, name);
  const definition = transformDefinitions.get(name);
  stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) && options.record !== false);
  return () => {
    const readInitialValue = () => {
      var _a6, _b4;
      return (_b4 = (_a6 = style.get(element, name)) !== null && _a6 !== void 0 ? _a6 : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b4 !== void 0 ? _b4 : 0;
    };
    let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
    const toUnit = getUnitConverter(keyframes, definition);
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      duration = custom.duration || duration;
    }
    if (isCssVar(name)) {
      if (supports.cssRegisterProperty()) {
        registerCssVariable(name);
      } else {
        canAnimateNatively = false;
      }
    }
    if (valueIsTransform && !supports.linearEasing() && (isFunction(easing) || isEasingList(easing) && easing.some(isFunction))) {
      canAnimateNatively = false;
    }
    if (canAnimateNatively) {
      if (definition) {
        keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
      }
      if (keyframes.length === 1 && (!supports.partialKeyframes() || isRecording)) {
        keyframes.unshift(readInitialValue());
      }
      const animationOptions = {
        delay: time.ms(delay),
        duration: time.ms(duration),
        endDelay: time.ms(endDelay),
        easing: !isEasingList(easing) ? convertEasing(easing, duration) : void 0,
        direction,
        iterations: repeat + 1,
        fill: "both"
      };
      animation = element.animate({
        [name]: keyframes,
        offset,
        easing: isEasingList(easing) ? easing.map((thisEasing) => convertEasing(thisEasing, duration)) : void 0
      }, animationOptions);
      if (!animation.finished) {
        animation.finished = new Promise((resolve, reject) => {
          animation.onfinish = resolve;
          animation.oncancel = reject;
        });
      }
      const target = keyframes[keyframes.length - 1];
      animation.finished.then(() => {
        if (persist)
          return;
        style.set(element, name, target);
        animation.cancel();
      }).catch(noop);
      if (!allowWebkitAcceleration)
        animation.playbackRate = 1.000001;
    } else if (AnimationPolyfill && valueIsTransform) {
      keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue()));
      }
      animation = new AnimationPolyfill((latest) => {
        style.set(element, name, toUnit ? toUnit(latest) : latest);
      }, keyframes, Object.assign(Object.assign({}, options), {
        duration,
        easing
      }));
    } else {
      const target = keyframes[keyframes.length - 1];
      style.set(element, name, definition && isNumber(target) ? definition.toDefaultUnit(target) : target);
    }
    if (isRecording) {
      record(element, key, keyframes, {
        duration,
        delay,
        easing,
        repeat,
        offset
      }, "motion-one");
    }
    motionValue.setAnimation(animation);
    return animation;
  };
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/options.es.js
var getOptions = (options, key) => (
  /**
   * TODO: Make test for this
   * Always return a new object otherwise delay is overwritten by results of stagger
   * and this results in no stagger
   */
  options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options)
);

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/utils/resolve-elements.es.js
function resolveElements(elements, selectorCache) {
  var _a6;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a6 = selectorCache[elements]) !== null && _a6 !== void 0 ? _a6 : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from(elements || []);
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/utils/controls.es.js
var createAnimation = (factory) => factory();
var withControls = (animationFactory, options, duration = defaults.duration) => {
  return new Proxy({
    animations: animationFactory.map(createAnimation).filter(Boolean),
    duration,
    options
  }, controls);
};
var getActiveAnimation = (state2) => state2.animations[0];
var controls = {
  get: (target, key) => {
    const activeAnimation = getActiveAnimation(target);
    switch (key) {
      case "duration":
        return target.duration;
      case "currentTime":
        return time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
      case "playbackRate":
      case "playState":
        return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
      case "finished":
        if (!target.finished) {
          target.finished = Promise.all(target.animations.map(selectFinished)).catch(noop);
        }
        return target.finished;
      case "stop":
        return () => {
          target.animations.forEach((animation) => stopAnimation(animation));
        };
      case "forEachNative":
        return (callback) => {
          target.animations.forEach((animation) => callback(animation, target));
        };
      default:
        return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined" ? void 0 : () => target.animations.forEach((animation) => animation[key]());
    }
  },
  set: (target, key, value) => {
    switch (key) {
      case "currentTime":
        value = time.ms(value);
      case "currentTime":
      case "playbackRate":
        for (let i = 0; i < target.animations.length; i++) {
          target.animations[i][key] = value;
        }
        return true;
    }
    return false;
  }
};
var selectFinished = (animation) => animation.finished;

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/utils/stagger.es.js
function resolveOption(option, i, total) {
  return isFunction(option) ? option(i, total) : option;
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/create-animate.es.js
function createAnimate(AnimatePolyfill) {
  return function animate3(elements, keyframes, options = {}) {
    elements = resolveElements(elements);
    const numElements = elements.length;
    invariant(Boolean(numElements), "No valid element provided.");
    invariant(Boolean(keyframes), "No keyframes defined.");
    const animationFactories = [];
    for (let i = 0; i < numElements; i++) {
      const element = elements[i];
      for (const key in keyframes) {
        const valueOptions = getOptions(options, key);
        valueOptions.delay = resolveOption(valueOptions.delay, i, numElements);
        const animation = animateStyle(element, key, keyframes[key], valueOptions, AnimatePolyfill);
        animationFactories.push(animation);
      }
    }
    return withControls(
      animationFactories,
      options,
      /**
       * TODO:
       * If easing is set to spring or glide, duration will be dynamically
       * generated. Ideally we would dynamically generate this from
       * animation.effect.getComputedTiming().duration but this isn't
       * supported in iOS13 or our number polyfill. Perhaps it's possible
       * to Proxy animations returned from animateStyle that has duration
       * as a getter.
       */
      options.duration
    );
  };
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/animate/index.es.js
var animate = createAnimate(Animation);

// node_modules/.pnpm/@motionone+generators@10.15.1/node_modules/@motionone/generators/dist/utils/velocity.es.js
var sampleT = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - sampleT, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

// node_modules/.pnpm/@motionone+generators@10.15.1/node_modules/@motionone/generators/dist/spring/defaults.es.js
var defaults2 = {
  stiffness: 100,
  damping: 10,
  mass: 1
};

// node_modules/.pnpm/@motionone+generators@10.15.1/node_modules/@motionone/generators/dist/spring/utils.es.js
var calcDampingRatio = (stiffness = defaults2.stiffness, damping = defaults2.damping, mass = defaults2.mass) => damping / (2 * Math.sqrt(stiffness * mass));

// node_modules/.pnpm/@motionone+generators@10.15.1/node_modules/@motionone/generators/dist/utils/has-reached-target.es.js
function hasReachedTarget(origin, target, current) {
  return origin < target && current >= target || origin > target && current <= target;
}

// node_modules/.pnpm/@motionone+generators@10.15.1/node_modules/@motionone/generators/dist/spring/index.es.js
var spring = ({ stiffness = defaults2.stiffness, damping = defaults2.damping, mass = defaults2.mass, from = 0, to: to2 = 1, velocity = 0, restSpeed = 2, restDistance = 0.5 } = {}) => {
  velocity = velocity ? time.s(velocity) : 0;
  const state2 = {
    done: false,
    hasReachedTarget: false,
    current: from,
    target: to2
  };
  const initialDelta = to2 - from;
  const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
  const dampingRatio = calcDampingRatio(stiffness, damping, mass);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = undampedAngularFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    resolveSpring = (t) => to2 - Math.exp(-dampingRatio * undampedAngularFreq * t) * ((-velocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
  } else {
    resolveSpring = (t) => {
      return to2 - Math.exp(-undampedAngularFreq * t) * (initialDelta + (-velocity + undampedAngularFreq * initialDelta) * t);
    };
  }
  return (t) => {
    state2.current = resolveSpring(t);
    const currentVelocity = t === 0 ? velocity : calcGeneratorVelocity(resolveSpring, t, state2.current);
    const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
    const isBelowDisplacementThreshold = Math.abs(to2 - state2.current) <= restDistance;
    state2.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
    state2.hasReachedTarget = hasReachedTarget(from, to2, state2.current);
    return state2;
  };
};

// node_modules/.pnpm/@motionone+generators@10.15.1/node_modules/@motionone/generators/dist/glide/index.es.js
var glide = ({ from = 0, velocity = 0, power = 0.8, decay = 0.325, bounceDamping, bounceStiffness, changeTarget, min, max, restDistance = 0.5, restSpeed }) => {
  decay = time.ms(decay);
  const state2 = {
    hasReachedTarget: false,
    done: false,
    current: from,
    target: from
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = changeTarget === void 0 ? ideal : changeTarget(ideal);
  state2.target = target;
  if (target !== ideal)
    amplitude = target - from;
  const calcDelta = (t) => -amplitude * Math.exp(-t / decay);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state2.done = Math.abs(delta) <= restDistance;
    state2.current = state2.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state2.current))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      from: state2.current,
      to: nearestBoundary(state2.current),
      velocity: calcGeneratorVelocity(calcLatest, t, state2.current),
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDistance,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return (t) => {
    let hasUpdatedFrame = false;
    if (!spring$1 && timeReachedBoundary === void 0) {
      hasUpdatedFrame = true;
      applyFriction(t);
      checkCatchBoundary(t);
    }
    if (timeReachedBoundary !== void 0 && t > timeReachedBoundary) {
      state2.hasReachedTarget = true;
      return spring$1(t - timeReachedBoundary);
    } else {
      state2.hasReachedTarget = false;
      !hasUpdatedFrame && applyFriction(t);
      return state2;
    }
  };
};

// node_modules/.pnpm/@motionone+generators@10.15.1/node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.es.js
var timeStep = 10;
var maxDuration = 1e4;
function pregenerateKeyframes(generator, toUnit = noopReturn) {
  let overshootDuration = void 0;
  let timestamp = timeStep;
  let state2 = generator(0);
  const keyframes = [toUnit(state2.current)];
  while (!state2.done && timestamp < maxDuration) {
    state2 = generator(timestamp);
    keyframes.push(toUnit(state2.done ? state2.target : state2.current));
    if (overshootDuration === void 0 && state2.hasReachedTarget) {
      overshootDuration = timestamp;
    }
    timestamp += timeStep;
  }
  const duration = timestamp - timeStep;
  if (keyframes.length === 1)
    keyframes.push(state2.current);
  return {
    keyframes,
    duration: duration / 1e3,
    overshootDuration: (overshootDuration !== null && overshootDuration !== void 0 ? overshootDuration : duration) / 1e3
  };
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/easing/create-generator-easing.es.js
function canGenerate(value) {
  return isNumber(value) && !isNaN(value);
}
function getAsNumber(value) {
  return isString(value) ? parseFloat(value) : value;
}
function createGeneratorEasing(createGenerator) {
  const keyframesCache = /* @__PURE__ */ new WeakMap();
  return (options = {}) => {
    const generatorCache = /* @__PURE__ */ new Map();
    const getGenerator = (from = 0, to2 = 100, velocity = 0, isScale = false) => {
      const key = `${from}-${to2}-${velocity}-${isScale}`;
      if (!generatorCache.has(key)) {
        generatorCache.set(key, createGenerator(Object.assign({
          from,
          to: to2,
          velocity,
          restSpeed: isScale ? 0.05 : 2,
          restDistance: isScale ? 0.01 : 0.5
        }, options)));
      }
      return generatorCache.get(key);
    };
    const getKeyframes = (generator, toUnit) => {
      if (!keyframesCache.has(generator)) {
        keyframesCache.set(generator, pregenerateKeyframes(generator, toUnit));
      }
      return keyframesCache.get(generator);
    };
    return {
      createAnimation: (keyframes, shouldGenerate = true, getOrigin, name, motionValue) => {
        let settings;
        let origin;
        let target;
        let velocity = 0;
        let toUnit = noopReturn;
        const numKeyframes = keyframes.length;
        if (shouldGenerate) {
          toUnit = getUnitConverter(keyframes, name ? transformDefinitions.get(getStyleName(name)) : void 0);
          const targetDefinition = keyframes[numKeyframes - 1];
          target = getAsNumber(targetDefinition);
          if (numKeyframes > 1 && keyframes[0] !== null) {
            origin = getAsNumber(keyframes[0]);
          } else {
            const prevGenerator = motionValue === null || motionValue === void 0 ? void 0 : motionValue.generator;
            if (prevGenerator) {
              const { animation, generatorStartTime } = motionValue;
              const startTime = (animation === null || animation === void 0 ? void 0 : animation.startTime) || generatorStartTime || 0;
              const currentTime = (animation === null || animation === void 0 ? void 0 : animation.currentTime) || performance.now() - startTime;
              const prevGeneratorCurrent = prevGenerator(currentTime).current;
              origin = prevGeneratorCurrent;
              velocity = calcGeneratorVelocity((t) => prevGenerator(t).current, currentTime, prevGeneratorCurrent);
            } else if (getOrigin) {
              origin = getAsNumber(getOrigin());
            }
          }
        }
        if (canGenerate(origin) && canGenerate(target)) {
          const generator = getGenerator(origin, target, velocity, name === null || name === void 0 ? void 0 : name.includes("scale"));
          settings = Object.assign(Object.assign({}, getKeyframes(generator, toUnit)), { easing: "linear" });
          if (motionValue) {
            motionValue.generator = generator;
            motionValue.generatorStartTime = performance.now();
          }
        }
        if (!settings) {
          const keyframesMetadata = getKeyframes(getGenerator(0, 100));
          settings = {
            easing: "ease",
            duration: keyframesMetadata.overshootDuration
          };
        }
        return settings;
      }
    };
  };
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/easing/spring/index.es.js
var spring2 = createGeneratorEasing(spring);

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/easing/glide/index.es.js
var glide2 = createGeneratorEasing(glide);

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/gestures/in-view.es.js
var thresholds = {
  any: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
  if (typeof IntersectionObserver === "undefined") {
    return () => {
    };
  }
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if (isFunction(newOnEnd)) {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/state/utils/events.es.js
function dispatchPointerEvent(element, name, event) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
}
function dispatchViewEvent(element, name, entry) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
}

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/state/gestures/in-view.es.js
var inView2 = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
    const { once } = inViewOptions, viewOptions = __rest(inViewOptions, ["once"]);
    return inView(element, (enterEntry) => {
      enable();
      dispatchViewEvent(element, "viewenter", enterEntry);
      if (!once) {
        return (leaveEntry) => {
          disable();
          dispatchViewEvent(element, "viewleave", leaveEntry);
        };
      }
    }, viewOptions);
  }
};

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/state/gestures/hover.es.js
var mouseEvent = (element, name, action) => (event) => {
  if (event.pointerType && event.pointerType !== "mouse")
    return;
  action();
  dispatchPointerEvent(element, name, event);
};
var hover = {
  isActive: (options) => Boolean(options.hover),
  subscribe: (element, { enable, disable }) => {
    const onEnter = mouseEvent(element, "hoverstart", enable);
    const onLeave = mouseEvent(element, "hoverend", disable);
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
    };
  }
};

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/state/gestures/press.es.js
var press = {
  isActive: (options) => Boolean(options.press),
  subscribe: (element, { enable, disable }) => {
    const onPointerUp = (event) => {
      disable();
      dispatchPointerEvent(element, "pressend", event);
      window.removeEventListener("pointerup", onPointerUp);
    };
    const onPointerDown = (event) => {
      enable();
      dispatchPointerEvent(element, "pressstart", event);
      window.addEventListener("pointerup", onPointerUp);
    };
    element.addEventListener("pointerdown", onPointerDown);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }
};

// node_modules/.pnpm/@motionone+dom@10.15.5/node_modules/@motionone/dom/dist/state/index.es.js
var gestures = { inView: inView2, hover, press };
var stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];

// node_modules/.pnpm/motion@10.15.5/node_modules/motion/dist/animate.es.js
function animateProgress(target, options = {}) {
  return withControls([
    () => {
      const animation = new Animation(target, [0, 1], options);
      animation.finished.catch(() => {
      });
      return animation;
    }
  ], options, options.duration);
}
function animate2(target, keyframesOrOptions, options) {
  const factory = isFunction(target) ? animateProgress : animate;
  return factory(target, keyframesOrOptions, options);
}

// node_modules/.pnpm/@web3modal+ui@2.4.1_react@18.2.0/node_modules/@web3modal/ui/dist/index.js
var import_qrcode = __toESM(require_browser());
var qe = Object.defineProperty;
var $e = Object.getOwnPropertySymbols;
var Ke = Object.prototype.hasOwnProperty;
var Ye = Object.prototype.propertyIsEnumerable;
var ke = (t, e, a) => e in t ? qe(t, e, { enumerable: true, configurable: true, writable: true, value: a }) : t[e] = a;
var jt = (t, e) => {
  for (var a in e || (e = {}))
    Ke.call(e, a) && ke(t, a, e[a]);
  if ($e)
    for (var a of $e(e))
      Ye.call(e, a) && ke(t, a, e[a]);
  return t;
};
function Qe() {
  var t;
  const e = (t = ae.state.themeMode) != null ? t : "dark", a = { light: { foreground: { 1: "rgb(20,20,20)", 2: "rgb(121,134,134)", 3: "rgb(158,169,169)" }, background: { 1: "rgb(255,255,255)", 2: "rgb(241,243,243)", 3: "rgb(228,231,231)" }, overlay: "rgba(0,0,0,0.1)" }, dark: { foreground: { 1: "rgb(228,231,231)", 2: "rgb(148,158,158)", 3: "rgb(110,119,119)" }, background: { 1: "rgb(20,20,20)", 2: "rgb(39,42,42)", 3: "rgb(59,64,64)" }, overlay: "rgba(255,255,255,0.1)" } }[e];
  return { "--w3m-color-fg-1": a.foreground[1], "--w3m-color-fg-2": a.foreground[2], "--w3m-color-fg-3": a.foreground[3], "--w3m-color-bg-1": a.background[1], "--w3m-color-bg-2": a.background[2], "--w3m-color-bg-3": a.background[3], "--w3m-color-overlay": a.overlay };
}
function Oe() {
  return { "--w3m-accent-color": "#3396FF", "--w3m-accent-fill-color": "#FFFFFF", "--w3m-z-index": "89", "--w3m-background-color": "#3396FF", "--w3m-background-border-radius": "8px", "--w3m-container-border-radius": "30px", "--w3m-wallet-icon-border-radius": "15px", "--w3m-wallet-icon-large-border-radius": "30px", "--w3m-wallet-icon-small-border-radius": "7px", "--w3m-input-border-radius": "28px", "--w3m-button-border-radius": "10px", "--w3m-notification-border-radius": "36px", "--w3m-secondary-button-border-radius": "28px", "--w3m-icon-button-border-radius": "50%", "--w3m-button-hover-highlight-border-radius": "10px", "--w3m-text-big-bold-size": "20px", "--w3m-text-big-bold-weight": "600", "--w3m-text-big-bold-line-height": "24px", "--w3m-text-big-bold-letter-spacing": "-0.03em", "--w3m-text-big-bold-text-transform": "none", "--w3m-text-xsmall-bold-size": "10px", "--w3m-text-xsmall-bold-weight": "700", "--w3m-text-xsmall-bold-line-height": "12px", "--w3m-text-xsmall-bold-letter-spacing": "0.02em", "--w3m-text-xsmall-bold-text-transform": "uppercase", "--w3m-text-xsmall-regular-size": "12px", "--w3m-text-xsmall-regular-weight": "600", "--w3m-text-xsmall-regular-line-height": "14px", "--w3m-text-xsmall-regular-letter-spacing": "-0.03em", "--w3m-text-xsmall-regular-text-transform": "none", "--w3m-text-small-thin-size": "14px", "--w3m-text-small-thin-weight": "500", "--w3m-text-small-thin-line-height": "16px", "--w3m-text-small-thin-letter-spacing": "-0.03em", "--w3m-text-small-thin-text-transform": "none", "--w3m-text-small-regular-size": "14px", "--w3m-text-small-regular-weight": "600", "--w3m-text-small-regular-line-height": "16px", "--w3m-text-small-regular-letter-spacing": "-0.03em", "--w3m-text-small-regular-text-transform": "none", "--w3m-text-medium-regular-size": "16px", "--w3m-text-medium-regular-weight": "600", "--w3m-text-medium-regular-line-height": "20px", "--w3m-text-medium-regular-letter-spacing": "-0.03em", "--w3m-text-medium-regular-text-transform": "none", "--w3m-font-family": "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif", "--w3m-success-color": "rgb(38,181,98)", "--w3m-error-color": "rgb(242, 90, 103)" };
}
function Xe() {
  const { themeVariables: t } = ae.state;
  return { "--w3m-background-image-url": t != null && t["--w3m-background-image-url"] ? `url(${t["--w3m-background-image-url"]})` : "none" };
}
var w = { getPreset(t) {
  return Oe()[t];
}, setTheme() {
  const t = document.querySelector(":root"), { themeVariables: e } = ae.state;
  if (t) {
    const a = jt(jt(jt(jt({}, Qe()), Oe()), e), Xe());
    Object.entries(a).forEach(([r, o]) => t.style.setProperty(r, o));
  }
}, globalCss: css`*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-style:normal;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent;backface-visibility:hidden}button{cursor:pointer;display:flex;justify-content:center;align-items:center;position:relative;border:none;background-color:transparent;transition:all .2s ease}@media (hover:hover) and (pointer:fine){button:active{transition:all .1s ease;transform:scale(.93)}}button::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;transition:background-color,.2s ease}button:disabled{cursor:not-allowed}button svg,button w3m-text{position:relative;z-index:1}input{border:none;outline:0;appearance:none}img{display:block}::selection{color:var(--w3m-accent-fill-color);background:var(--w3m-accent-color)}` };
var Je = css`button{display:flex;border-radius:var(--w3m-button-hover-highlight-border-radius);flex-direction:column;justify-content:center;padding:5px;width:100px}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button>div{display:flex;justify-content:center;align-items:center;width:32px;height:32px;box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);background-color:var(--w3m-accent-color);border-radius:var(--w3m-icon-button-border-radius);margin-bottom:4px}button path{fill:var(--w3m-accent-fill-color)}`;
var to = Object.defineProperty;
var eo = Object.getOwnPropertyDescriptor;
var Mt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? eo(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && to(e, a, o), o;
};
var lt = class extends LitElement {
  constructor() {
    super(...arguments), this.icon = void 0, this.label = "", this.onClick = () => null;
  }
  render() {
    return html`<button @click="${this.onClick}"><div>${this.icon}</div><w3m-text variant="xsmall-regular" color="accent">${this.label}</w3m-text></button>`;
  }
};
lt.styles = [w.globalCss, Je], Mt([property()], lt.prototype, "icon", 2), Mt([property()], lt.prototype, "label", 2), Mt([property()], lt.prototype, "onClick", 2), lt = Mt([customElement("w3m-box-button")], lt);
var oo = css`button{border-radius:var(--w3m-secondary-button-border-radius);height:28px;padding:0 10px;background-color:var(--w3m-accent-color)}button path{fill:var(--w3m-accent-fill-color)}button::after{border-radius:inherit;border:1px solid var(--w3m-color-overlay)}button:disabled::after{background-color:transparent}.w3m-icon-left svg{margin-right:5px}.w3m-icon-right svg{margin-left:5px}button:active::after{background-color:var(--w3m-color-overlay)}.w3m-ghost,.w3m-ghost:active::after,.w3m-outline{background-color:transparent}.w3m-ghost:active{opacity:.5}@media(hover:hover){button:hover::after{background-color:var(--w3m-color-overlay)}.w3m-ghost:hover::after{background-color:transparent}.w3m-ghost:hover{opacity:.5}}button:disabled{background-color:var(--w3m-color-bg-3);pointer-events:none}.w3m-ghost::after{border-color:transparent}.w3m-ghost path{fill:var(--w3m-color-fg-2)}.w3m-outline path{fill:var(--w3m-accent-color)}.w3m-outline:disabled{background-color:transparent;opacity:.5}`;
var ao = Object.defineProperty;
var ro = Object.getOwnPropertyDescriptor;
var nt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ro(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && ao(e, a, o), o;
};
var z = class extends LitElement {
  constructor() {
    super(...arguments), this.disabled = false, this.iconLeft = void 0, this.iconRight = void 0, this.onClick = () => null, this.variant = "default";
  }
  render() {
    const t = { "w3m-icon-left": this.iconLeft !== void 0, "w3m-icon-right": this.iconRight !== void 0, "w3m-ghost": this.variant === "ghost", "w3m-outline": this.variant === "outline" };
    let e = "inverse";
    return this.variant === "ghost" && (e = "secondary"), this.variant === "outline" && (e = "accent"), html`<button class="${classMap(t)}" ?disabled="${this.disabled}" @click="${this.onClick}">${this.iconLeft}<w3m-text variant="small-regular" color="${e}"><slot></slot></w3m-text>${this.iconRight}</button>`;
  }
};
z.styles = [w.globalCss, oo], nt([property()], z.prototype, "disabled", 2), nt([property()], z.prototype, "iconLeft", 2), nt([property()], z.prototype, "iconRight", 2), nt([property()], z.prototype, "onClick", 2), nt([property()], z.prototype, "variant", 2), z = nt([customElement("w3m-button")], z);
var io = css`:host{display:inline-block}button{padding:0 15px 1px;height:40px;border-radius:var(--w3m-button-border-radius);color:var(--w3m-accent-fill-color);background-color:var(--w3m-accent-color)}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--w3m-color-overlay)}button:active::after{background-color:var(--w3m-color-overlay)}button:disabled{padding-bottom:0;background-color:var(--w3m-color-bg-3);color:var(--w3m-color-fg-3)}.w3m-secondary{color:var(--w3m-accent-color);background-color:transparent}.w3m-secondary::after{display:none}@media(hover:hover){button:hover::after{background-color:var(--w3m-color-overlay)}}`;
var lo = Object.defineProperty;
var no = Object.getOwnPropertyDescriptor;
var qt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? no(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && lo(e, a, o), o;
};
var vt = class extends LitElement {
  constructor() {
    super(...arguments), this.disabled = false, this.variant = "primary";
  }
  render() {
    const t = { "w3m-secondary": this.variant === "secondary" };
    return html`<button ?disabled="${this.disabled}" class="${classMap(t)}"><slot></slot></button>`;
  }
};
vt.styles = [w.globalCss, io], qt([property()], vt.prototype, "disabled", 2), qt([property()], vt.prototype, "variant", 2), vt = qt([customElement("w3m-button-big")], vt);
var so = css`:host{background-color:var(--w3m-color-bg-2);border-top:1px solid var(--w3m-color-bg-3)}div{padding:10px 20px;display:inherit;flex-direction:inherit;align-items:inherit;width:inherit;justify-content:inherit}`;
var co = Object.defineProperty;
var mo = Object.getOwnPropertyDescriptor;
var ho = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? mo(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && co(e, a, o), o;
};
var Kt = class extends LitElement {
  render() {
    return html`<div><slot></slot></div>`;
  }
};
Kt.styles = [w.globalCss, so], Kt = ho([customElement("w3m-info-footer")], Kt);
var d3 = { CROSS_ICON: svg`<svg width="12" height="12" viewBox="0 0 12 12"><path d="M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z" fill="#fff"/></svg>`, WALLET_CONNECT_LOGO: svg`<svg width="178" height="29" viewBox="0 0 178 29" id="w3m-wc-logo"><path d="M10.683 7.926c5.284-5.17 13.85-5.17 19.134 0l.636.623a.652.652 0 0 1 0 .936l-2.176 2.129a.343.343 0 0 1-.478 0l-.875-.857c-3.686-3.607-9.662-3.607-13.348 0l-.937.918a.343.343 0 0 1-.479 0l-2.175-2.13a.652.652 0 0 1 0-.936l.698-.683Zm23.633 4.403 1.935 1.895a.652.652 0 0 1 0 .936l-8.73 8.543a.687.687 0 0 1-.956 0L20.37 17.64a.172.172 0 0 0-.239 0l-6.195 6.063a.687.687 0 0 1-.957 0l-8.73-8.543a.652.652 0 0 1 0-.936l1.936-1.895a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .239 0l6.195-6.064a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .24 0l6.195-6.064a.687.687 0 0 1 .956 0ZM48.093 20.948l2.338-9.355c.139-.515.258-1.07.416-1.942.12.872.258 1.427.357 1.942l2.022 9.355h4.181l3.528-13.874h-3.21l-1.943 8.523a24.825 24.825 0 0 0-.456 2.457c-.158-.931-.317-1.625-.495-2.438l-1.883-8.542h-4.201l-2.042 8.542a41.204 41.204 0 0 0-.475 2.438 41.208 41.208 0 0 0-.476-2.438l-1.903-8.542h-3.349l3.508 13.874h4.083ZM63.33 21.304c1.585 0 2.596-.654 3.11-1.605-.059.297-.078.595-.078.892v.357h2.655V15.22c0-2.735-1.248-4.32-4.3-4.32-2.636 0-4.36 1.466-4.52 3.487h2.914c.1-.891.734-1.426 1.705-1.426.911 0 1.407.515 1.407 1.11 0 .435-.258.693-1.03.792l-1.388.159c-2.061.257-3.825 1.01-3.825 3.19 0 1.982 1.645 3.092 3.35 3.092Zm.891-2.041c-.773 0-1.348-.436-1.348-1.19 0-.733.655-1.09 1.645-1.268l.674-.119c.575-.118.892-.218 1.09-.396v.912c0 1.228-.892 2.06-2.06 2.06ZM70.398 7.074v13.874h2.874V7.074h-2.874ZM74.934 7.074v13.874h2.874V7.074h-2.874ZM84.08 21.304c2.735 0 4.5-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922H81.92ZM94.92 21.146c.633 0 1.248-.1 1.525-.179v-2.18c-.218.04-.475.06-.693.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.338v-2.24h-2.338V7.788H91.47v3.448H89.37v2.24h2.1v4.201c0 2.3 1.15 3.469 3.45 3.469ZM104.62 21.304c3.924 0 6.302-2.299 6.599-5.608h-3.111c-.238 1.803-1.506 3.032-3.369 3.032-2.2 0-3.746-1.784-3.746-4.796 0-2.953 1.605-4.638 3.805-4.638 1.883 0 2.953 1.15 3.171 2.834h3.191c-.317-3.448-2.854-5.41-6.342-5.41-3.984 0-7.036 2.695-7.036 7.214 0 4.677 2.676 7.372 6.838 7.372ZM117.449 21.304c2.993 0 5.114-1.882 5.114-5.172 0-3.23-2.121-5.233-5.114-5.233-2.972 0-5.093 2.002-5.093 5.233 0 3.29 2.101 5.172 5.093 5.172Zm0-2.22c-1.327 0-2.18-1.09-2.18-2.952 0-1.903.892-2.973 2.18-2.973 1.308 0 2.2 1.07 2.2 2.973 0 1.862-.872 2.953-2.2 2.953ZM126.569 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.229-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM137.464 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.228-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM149.949 21.304c2.735 0 4.499-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922h-3.984ZM160.876 21.304c3.013 0 4.658-1.645 4.975-4.201h-2.874c-.099 1.07-.713 1.982-2.001 1.982-1.309 0-2.2-1.21-2.2-2.993 0-1.942 1.03-2.933 2.259-2.933 1.209 0 1.803.872 1.883 1.882h2.873c-.218-2.358-1.823-4.142-4.776-4.142-2.874 0-5.153 1.903-5.153 5.193 0 3.25 1.923 5.212 5.014 5.212ZM172.067 21.146c.634 0 1.248-.1 1.526-.179v-2.18c-.218.04-.476.06-.694.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.339v-2.24h-2.339V7.788h-2.854v3.448h-2.1v2.24h2.1v4.201c0 2.3 1.15 3.469 3.449 3.469Z" fill="#fff"/></svg>`, WALLET_CONNECT_ICON: svg`<svg width="28" height="20" viewBox="0 0 28 20"><g clip-path="url(#a)"><path d="M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z" fill="#000000"/></g><defs><clipPath id="a"><path fill="#ffffff" d="M0 0h28v20H0z"/></clipPath></defs></svg>`, WALLET_CONNECT_ICON_COLORED: svg`<svg width="96" height="96" fill="none"><path fill="#fff" d="M25.322 33.597c12.525-12.263 32.83-12.263 45.355 0l1.507 1.476a1.547 1.547 0 0 1 0 2.22l-5.156 5.048a.814.814 0 0 1-1.134 0l-2.074-2.03c-8.737-8.555-22.903-8.555-31.64 0l-2.222 2.175a.814.814 0 0 1-1.134 0l-5.156-5.049a1.547 1.547 0 0 1 0-2.22l1.654-1.62Zm56.019 10.44 4.589 4.494a1.547 1.547 0 0 1 0 2.22l-20.693 20.26a1.628 1.628 0 0 1-2.267 0L48.283 56.632a.407.407 0 0 0-.567 0L33.03 71.012a1.628 1.628 0 0 1-2.268 0L10.07 50.75a1.547 1.547 0 0 1 0-2.22l4.59-4.494a1.628 1.628 0 0 1 2.267 0l14.687 14.38c.156.153.41.153.567 0l14.685-14.38a1.628 1.628 0 0 1 2.268 0l14.687 14.38c.156.153.41.153.567 0l14.686-14.38a1.628 1.628 0 0 1 2.268 0Z"/><path stroke="#000" d="M25.672 33.954c12.33-12.072 32.325-12.072 44.655 0l1.508 1.476a1.047 1.047 0 0 1 0 1.506l-5.157 5.048a.314.314 0 0 1-.434 0l-2.074-2.03c-8.932-8.746-23.409-8.746-32.34 0l-2.222 2.174a.314.314 0 0 1-.434 0l-5.157-5.048a1.047 1.047 0 0 1 0-1.506l1.655-1.62Zm55.319 10.44 4.59 4.494a1.047 1.047 0 0 1 0 1.506l-20.694 20.26a1.128 1.128 0 0 1-1.568 0l-14.686-14.38a.907.907 0 0 0-1.267 0L32.68 70.655a1.128 1.128 0 0 1-1.568 0L10.42 50.394a1.047 1.047 0 0 1 0-1.506l4.59-4.493a1.128 1.128 0 0 1 1.567 0l14.687 14.379a.907.907 0 0 0 1.266 0l-.35-.357.35.357 14.686-14.38a1.128 1.128 0 0 1 1.568 0l14.687 14.38a.907.907 0 0 0 1.267 0l14.686-14.38a1.128 1.128 0 0 1 1.568 0Z"/></svg>`, BACK_ICON: svg`<svg width="10" height="18" viewBox="0 0 10 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z" fill="#fff"/></svg>`, COPY_ICON: svg`<svg width="24" height="24" fill="none"><path fill="#fff" fill-rule="evenodd" d="M7.01 7.01c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185c-.78.397-1.735.505-3.28.534l-.001.01c-.03 1.54-.138 2.493-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545C4.508 7.149 5.46 7.04 7 7.01h.01ZM15 15.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C8.501 11.403 8.5 10.425 8.5 9c0-1.425.001-2.403.063-3.162.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318.759-.062 1.737-.063 3.162-.063 1.425 0 2.403.001 3.162.063.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162 0 1.425-.001 2.403-.063 3.162-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063ZM7 8.511c-.444.009-.825.025-1.162.052-.74.06-1.139.172-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.288-.257.686-.318 1.427-.062.759-.063 1.737-.063 3.162 0 1.425.001 2.403.063 3.162.06.74.172 1.139.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.146.686.257 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403-.001 3.162-.063.74-.06 1.139-.172 1.427-.319a3.5 3.5 0 0 0 1.53-1.53c.146-.287.257-.685.318-1.426.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C7 13.2 7 11.8 7 9v-.489Z" clip-rule="evenodd"/></svg>`, RETRY_ICON: svg`<svg width="15" height="16" viewBox="0 0 15 16"><path d="M6.464 2.03A.75.75 0 0 0 5.403.97L2.08 4.293a1 1 0 0 0 0 1.414L5.403 9.03a.75.75 0 0 0 1.06-1.06L4.672 6.177a.25.25 0 0 1 .177-.427h2.085a4 4 0 1 1-3.93 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.7.748a5.501 5.501 0 1 0 5.45-6.248H4.848a.25.25 0 0 1-.177-.427L6.464 2.03Z" fill="#fff"/></svg>`, DESKTOP_ICON: svg`<svg width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C2.204 1 3.13 1 4.98 1h6.04c1.85 0 2.775 0 3.466.394a3 3 0 0 1 1.12 1.12C16 3.204 16 4.13 16 5.98v1.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C13.796 12 12.87 12 11.02 12H4.98c-1.85 0-2.775 0-3.466-.394a3 3 0 0 1-1.12-1.12C0 9.796 0 8.87 0 7.02V5.98ZM4.98 2.5h6.04c.953 0 1.568.001 2.034.043.446.04.608.108.69.154a1.5 1.5 0 0 1 .559.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033v1.04c0 .952-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.046-.243.114-.69.154-.466.042-1.08.043-2.033.043H4.98c-.952 0-1.568-.001-2.034-.043-.446-.04-.608-.108-.69-.154a1.5 1.5 0 0 1-.559-.56c-.046-.08-.114-.243-.154-.69-.042-.465-.043-1.08-.043-2.033V5.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.046.243-.114.69-.154.465-.042 1.08-.043 2.033-.043Z" fill="#fff"/><path d="M4 14.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, MOBILE_ICON: svg`<svg width="16" height="16" viewBox="0 0 16 16"><path d="M6.75 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C5.204 0 6.136 0 8 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C13 2.204 13 3.13 13 4.98v6.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C10.796 16 9.864 16 8 16s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C3 13.796 3 12.87 3 11.02V4.98Zm8.5 0v6.04c0 .953-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.046-.08-.114-.243-.154-.69-.042-.466-.043-1.08-.043-2.033V4.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.045.243-.113.693-.154C6.42 1.501 7.041 1.5 8 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033Z" fill="#fff"/></svg>`, ARROW_DOWN_ICON: svg`<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.28 7.47a.75.75 0 0 0-1.06 1.06l5.25 5.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-3.544 3.543a.25.25 0 0 1-.426-.177V.75a.75.75 0 0 0-1.5 0v10.086a.25.25 0 0 1-.427.176L2.28 7.47Z" fill="#fff"/></svg>`, ARROW_UP_RIGHT_ICON: svg`<svg width="15" height="14" fill="none"><path d="M4.5 1.75A.75.75 0 0 1 5.25 1H12a1.5 1.5 0 0 1 1.5 1.5v6.75a.75.75 0 0 1-1.5 0V4.164a.25.25 0 0 0-.427-.176L4.061 11.5A.75.75 0 0 1 3 10.44l7.513-7.513a.25.25 0 0 0-.177-.427H5.25a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, ARROW_RIGHT_ICON: svg`<svg width="6" height="14" viewBox="0 0 6 14"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.181 1.099a.75.75 0 0 1 1.024.279l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.257a.75.75 0 1 1-1.303-.744L4.335 7.62a1.25 1.25 0 0 0 0-1.24L1.902 2.122a.75.75 0 0 1 .28-1.023Z" fill="#fff"/></svg>`, QRCODE_ICON: svg`<svg width="25" height="24" viewBox="0 0 25 24"><path d="M23.748 9a.748.748 0 0 0 .748-.752c-.018-2.596-.128-4.07-.784-5.22a6 6 0 0 0-2.24-2.24c-1.15-.656-2.624-.766-5.22-.784a.748.748 0 0 0-.752.748c0 .414.335.749.748.752 1.015.007 1.82.028 2.494.088.995.09 1.561.256 1.988.5.7.398 1.28.978 1.679 1.678.243.427.41.993.498 1.988.061.675.082 1.479.09 2.493a.753.753 0 0 0 .75.749ZM3.527.788C4.677.132 6.152.022 8.747.004A.748.748 0 0 1 9.5.752a.753.753 0 0 1-.749.752c-1.014.007-1.818.028-2.493.088-.995.09-1.561.256-1.988.5-.7.398-1.28.978-1.679 1.678-.243.427-.41.993-.499 1.988-.06.675-.081 1.479-.088 2.493A.753.753 0 0 1 1.252 9a.748.748 0 0 1-.748-.752c.018-2.596.128-4.07.784-5.22a6 6 0 0 1 2.24-2.24ZM1.252 15a.748.748 0 0 0-.748.752c.018 2.596.128 4.07.784 5.22a6 6 0 0 0 2.24 2.24c1.15.656 2.624.766 5.22.784a.748.748 0 0 0 .752-.748.753.753 0 0 0-.749-.752c-1.014-.007-1.818-.028-2.493-.089-.995-.089-1.561-.255-1.988-.498a4.5 4.5 0 0 1-1.679-1.68c-.243-.426-.41-.992-.499-1.987-.06-.675-.081-1.479-.088-2.493A.753.753 0 0 0 1.252 15ZM22.996 15.749a.753.753 0 0 1 .752-.749c.415 0 .751.338.748.752-.018 2.596-.128 4.07-.784 5.22a6 6 0 0 1-2.24 2.24c-1.15.656-2.624.766-5.22.784a.748.748 0 0 1-.752-.748c0-.414.335-.749.748-.752 1.015-.007 1.82-.028 2.494-.089.995-.089 1.561-.255 1.988-.498a4.5 4.5 0 0 0 1.679-1.68c.243-.426.41-.992.498-1.987.061-.675.082-1.479.09-2.493Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 4a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 11h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 4H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM13.5 6.5A2.5 2.5 0 0 1 16 4h2a2.5 2.5 0 0 1 2.5 2.5v2A2.5 2.5 0 0 1 18 11h-2a2.5 2.5 0 0 1-2.5-2.5v-2Zm2.5-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1ZM7 13a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 20h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 13H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" fill="#fff"/><path d="M13.5 15.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.303 13 15.535 13 16 13v2.5h-2.5ZM18 13c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89H18V13ZM18 17.5h2.5c0 .465 0 .697-.038.89a2 2 0 0 1-1.572 1.572C18.697 20 18.465 20 18 20v-2.5ZM13.5 17.5H16V20c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572c-.038-.193-.038-.425-.038-.89Z" fill="#fff"/></svg>`, SCAN_ICON: svg`<svg width="16" height="16" fill="none"><path fill="#fff" d="M10 15.216c0 .422.347.763.768.74 1.202-.064 2.025-.222 2.71-.613a5.001 5.001 0 0 0 1.865-1.866c.39-.684.549-1.507.613-2.709a.735.735 0 0 0-.74-.768.768.768 0 0 0-.76.732c-.009.157-.02.306-.032.447-.073.812-.206 1.244-.384 1.555-.31.545-.761.996-1.306 1.306-.311.178-.743.311-1.555.384-.141.013-.29.023-.447.032a.768.768 0 0 0-.732.76ZM10 .784c0 .407.325.737.732.76.157.009.306.02.447.032.812.073 1.244.206 1.555.384a3.5 3.5 0 0 1 1.306 1.306c.178.311.311.743.384 1.555.013.142.023.29.032.447a.768.768 0 0 0 .76.732.734.734 0 0 0 .74-.768c-.064-1.202-.222-2.025-.613-2.71A5 5 0 0 0 13.477.658c-.684-.39-1.507-.549-2.709-.613a.735.735 0 0 0-.768.74ZM5.232.044A.735.735 0 0 1 6 .784a.768.768 0 0 1-.732.76c-.157.009-.305.02-.447.032-.812.073-1.244.206-1.555.384A3.5 3.5 0 0 0 1.96 3.266c-.178.311-.311.743-.384 1.555-.013.142-.023.29-.032.447A.768.768 0 0 1 .784 6a.735.735 0 0 1-.74-.768c.064-1.202.222-2.025.613-2.71A5 5 0 0 1 2.523.658C3.207.267 4.03.108 5.233.044ZM5.268 14.456a.768.768 0 0 1 .732.76.734.734 0 0 1-.768.74c-1.202-.064-2.025-.222-2.71-.613a5 5 0 0 1-1.865-1.866c-.39-.684-.549-1.507-.613-2.709A.735.735 0 0 1 .784 10c.407 0 .737.325.76.732.009.157.02.306.032.447.073.812.206 1.244.384 1.555a3.5 3.5 0 0 0 1.306 1.306c.311.178.743.311 1.555.384.142.013.29.023.447.032Z"/></svg>`, CHECKMARK_ICON: svg`<svg width="13" height="12" viewBox="0 0 13 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.155.132a.75.75 0 0 1 .232 1.035L5.821 11.535a1 1 0 0 1-1.626.09L.665 7.21a.75.75 0 1 1 1.17-.937L4.71 9.867a.25.25 0 0 0 .406-.023L11.12.364a.75.75 0 0 1 1.035-.232Z" fill="#fff"/></svg>`, HELP_ETH_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#j)"><rect width="60" height="60" rx="30" fill="#987DE8"/><path fill-rule="evenodd" clip-rule="evenodd" d="m15.48 28.367 11.966-19.3c1.174-1.892 3.927-1.892 5.1 0l11.97 19.306a6 6 0 0 1 .9 3.142v.028a6 6 0 0 1-1.154 3.56L33.227 50.208c-1.599 2.188-4.864 2.188-6.461 0L15.733 35.095a6 6 0 0 1-1.154-3.538v-.029a6 6 0 0 1 .9-3.161Z" fill="#fff"/><path d="M30.84 10.112a.992.992 0 0 0-.844-.464V24.5l12.598 5.53c.081-.466-.001-.963-.27-1.398L30.84 10.112Z" fill="#643CDD"/><path d="M29.996 9.648a.991.991 0 0 0-.845.465l-11.489 18.53a1.991 1.991 0 0 0-.264 1.387l12.598-5.53V9.648Z" fill="#BDADEB"/><path d="M29.996 50.544a.994.994 0 0 0 .808-.41l11.235-15.38c.307-.434-.193-.988-.658-.72L31.49 39.71a2.998 2.998 0 0 1-1.494.398v10.437Z" fill="#643CDD"/><path d="M17.966 34.762 29.19 50.134c.2.274.503.41.807.41V40.108a2.998 2.998 0 0 1-1.493-.398l-9.884-5.676c-.468-.27-.971.292-.653.728Z" fill="#BDADEB"/><path d="M42.594 30.03 29.996 24.5v13.138a3 3 0 0 0 1.495-.399l10.149-5.83c.525-.31.856-.823.954-1.38Z" fill="#401AB3"/><path d="M29.996 37.638V24.462l-12.598 5.566c.098.564.437 1.083.974 1.392l10.13 5.82c.462.265.978.398 1.494.398Z" fill="#7C5AE2"/></g><rect class="help-img-highlight" x=".5" y=".5" width="59" height="59" rx="29.5"/><defs><clipPath id="j"><rect width="60" height="60" rx="30" fill="#fff"/></clipPath></defs></svg>`, HELP_PAINTING_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#k)"><rect width="60" height="60" rx="3" fill="#C653C6"/><path d="M52.094 47.344c0-4.246-1.436-9.557-5.885-12.4a2.876 2.876 0 0 0-1.615-3.891v-.819a4.037 4.037 0 0 0-1.34-3.007 4.75 4.75 0 0 0-2.41-6.252v-5.506c0-6.248-5.065-11.313-11.313-11.313-6.247 0-11.312 5.065-11.312 11.313v2.152a3.343 3.343 0 0 0-1.18 5.045 4.738 4.738 0 0 0-1.633 3.584 4.73 4.73 0 0 0 .956 2.858 5.218 5.218 0 0 0-2.358 6.815c-3.06 4.129-6.098 8.298-6.098 15.64 0 2.668.364 4.856.731 6.385.184.765.368 1.366.509 1.78a12.721 12.721 0 0 0 .225.611l.015.037.005.011.001.004v.002h.001l.92-.393-.92.394.26.606h38.26l.291-.49-.86-.51.86.51v-.001l.002-.002.002-.005.01-.017.035-.06.127-.225c.108-.195.26-.477.441-.835.363-.714.845-1.732 1.328-2.953.959-2.427 1.945-5.725 1.945-9.068Z" fill="#E87DE8" stroke="#fff" stroke-width="2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.5 29.5c-3-.5-5.5-3-5.503-7l.002-7c0-.466 0-.698.026-.893a3 3 0 0 1 2.582-2.582c.195-.026.428-.026.893-.026 2 0 2.5-2.5 2.5-2.5s0 2.5 2.5 2.5c1.398 0 2.097 0 2.648.229a3 3 0 0 1 1.624 1.623c.228.552.228 1.25.228 2.649v6c0 4-3 7-6.5 7 1.35.23 4 0 6.5-2v9.53C34 38.5 31.495 40 28 40s-6-1.5-6-2.97L24 34l2.5 1.5v-6ZM26 47h4.5c2.5 0 3 4 3 5.5h-3l-1-1.5H26v-4Zm-6.25 5.5H24V57h-8c0-1 1-4.5 3.75-4.5Z" fill="#fff"/></g><rect class="help-img-highlight" x=".5" y=".5" width="59" height="59" rx="2.5"/><defs><clipPath id="k"><rect width="60" height="60" rx="3" fill="#fff"/></clipPath></defs></svg>`, HELP_CHART_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#l)"><path d="M0 25.01C0 15.76 0 11.133 1.97 7.678a15 15 0 0 1 5.598-5.597C11.023.11 15.648.11 24.9.11h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.597C60 11.133 60 15.758 60 25.01v10.2c0 9.252 0 13.877-1.97 17.332a15 15 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a14.999 14.999 0 0 1-5.597-5.598C0 49.087 0 44.462 0 35.21v-10.2Z" fill="#1DC956"/><path d="M.5 25.01c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.289a14.5 14.5 0 0 1 5.412-5.41c1.639-.936 3.579-1.418 6.289-1.661C16.822.61 20.265.61 24.9.61h10.2c4.635 0 8.078 0 10.795.245 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.579 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.795-.244 2.71-.726 4.65-1.66 6.29a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.412C1.47 50.655.988 48.716.745 46.005.5 43.288.5 39.845.5 35.21v-10.2Z" stroke="#fff" stroke-opacity=".1"/><path d="M16.109 60c-3.833-.179-6.41-.645-8.541-1.86a15 15 0 0 1-5.598-5.598C.553 50.057.155 46.967.043 41.985l4.146-1.382a4 4 0 0 0 2.48-2.39l4.654-12.409a2 2 0 0 1 2.505-1.195l2.526.842a2 2 0 0 0 2.422-1.003l2.968-5.938c.81-1.62 3.185-1.415 3.705.32l3.774 12.581a2 2 0 0 0 3.025 1.09l3.342-2.228c.27-.18.49-.422.646-.706l5.297-9.712a2 2 0 0 1 1.428-1.016l4.134-.689a2 2 0 0 1 1.61.437l3.892 3.243a2 2 0 0 0 2.694-.122l4.633-4.632C60 19.28 60 21.88 60 25.01v10.2c0 9.252 0 13.877-1.97 17.332a14.998 14.998 0 0 1-5.598 5.598c-2.131 1.215-4.708 1.681-8.54 1.86H16.108Z" fill="#2BEE6C"/><path d="M.072 43.03a112.37 112.37 0 0 1-.048-2.093l3.85-1.283a3 3 0 0 0 1.86-1.793l4.653-12.408a3 3 0 0 1 3.758-1.793l2.526.842a1 1 0 0 0 1.21-.501l2.97-5.938c1.214-2.43 4.775-2.123 5.556.48l3.774 12.58a1 1 0 0 0 1.513.545l3.341-2.227a1 1 0 0 0 .323-.353l5.298-9.712a3 3 0 0 1 2.14-1.523l4.135-.69a3 3 0 0 1 2.414.655l3.892 3.244a1 1 0 0 0 1.347-.061l5.28-5.28c.046.845.077 1.752.097 2.732l-3.962 3.962a3 3 0 0 1-4.042.183l-3.893-3.243a1 1 0 0 0-.804-.218l-4.135.689a1 1 0 0 0-.714.507l-5.297 9.712c-.233.427-.565.79-.97 1.06l-3.34 2.228a3 3 0 0 1-4.538-1.635l-3.775-12.58c-.26-.868-1.447-.97-1.852-.16l-2.969 5.937a3 3 0 0 1-3.632 1.505l-2.526-.842a1 1 0 0 0-1.252.597L7.606 38.564a5 5 0 0 1-3.1 2.988L.072 43.029Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.5 19a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" fill="#2BEE6C"/><path d="M47.5 19a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" fill="#fff"/><path d="M45 .283v59.654c-.63.042-1.294.074-2 .098V.185c.706.025 1.37.056 2 .098Z" fill="#fff"/><path class="help-img-highlight" d="M.5 25.01c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.289a14.5 14.5 0 0 1 5.412-5.41c1.639-.936 3.579-1.418 6.289-1.661C16.822.61 20.265.61 24.9.61h10.2c4.635 0 8.078 0 10.795.245 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.579 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.795-.244 2.71-.726 4.65-1.66 6.29a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.412C1.47 50.655.988 48.716.745 46.005.5 43.288.5 39.845.5 35.21v-10.2Z"/></g><defs><clipPath id="l"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, HELP_KEY_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#m)"><path fill="#EB8B47" d="M0 24.9c0-9.252 0-13.878 1.97-17.332A15 15 0 0 1 7.569 1.97C11.023 0 15.648 0 24.9 0h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.022 60 15.648 60 24.899v10.2c0 9.252 0 13.878-1.97 17.332a15.001 15.001 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.351 0 35.1V24.9Z"/><path class="help-img-highlight" d="M.5 24.9c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.29a14.5 14.5 0 0 1 5.412-5.41C9.455 1.468 11.395.986 14.105.743 16.822.5 20.265.5 24.9.5h10.2c4.635 0 8.078 0 10.795.244 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.58 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.796-.244 2.71-.726 4.65-1.66 6.289a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.411c-.935-1.64-1.417-3.58-1.66-6.29C.5 43.178.5 39.734.5 35.1V24.9Z"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M39.192 29.192c5.077-5.077 5.077-13.308 0-18.385-5.076-5.077-13.308-5.077-18.384 0-5.077 5.077-5.077 13.308 0 18.385l1.287 1.291c1.137 1.142 1.706 1.712 2.097 2.387.267.462.472.957.608 1.473.2.755.2 1.56.2 3.171V48.75c0 1.077 0 1.615.134 2.119a4 4 0 0 0 .407.984c.262.45.643.831 1.404 1.592l.294.295c.654.654.982.981 1.365 1.086.26.07.533.07.792 0 .383-.105.71-.432 1.365-1.086l3.478-3.479c.655-.654.982-.981 1.087-1.365a1.5 1.5 0 0 0 0-.791c-.105-.384-.432-.711-1.087-1.365l-.478-.479c-.655-.654-.982-.981-1.087-1.365a1.5 1.5 0 0 1 0-.791c.105-.384.432-.711 1.087-1.365l.478-.479c.655-.654.982-.981 1.087-1.365a1.5 1.5 0 0 0 0-.791c-.105-.384-.432-.711-1.087-1.365l-.492-.493c-.65-.65-.974-.974-1.08-1.355a1.5 1.5 0 0 1-.003-.788c.102-.382.425-.71 1.069-1.364l5.46-5.547Z"/><circle cx="30" cy="17" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/></g><defs><clipPath id="m"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, HELP_USER_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#n)"><rect width="60" height="60" fill="#00ACE6" rx="30"/><path fill="#1AC6FF" stroke="#fff" stroke-width="2" d="M59 73c0 16.016-12.984 29-29 29S1 89.016 1 73c0-16.017 11-29 29-29s29 12.983 29 29ZM18.69 19.902a11 11 0 0 1 9.281-8.692 14.842 14.842 0 0 1 4.058 0 11 11 0 0 1 9.28 8.692c.178.866.322 1.75.44 2.625.132.977.132 1.968 0 2.945a39.467 39.467 0 0 1-.44 2.625 11 11 0 0 1-9.28 8.692 14.862 14.862 0 0 1-4.058 0 11 11 0 0 1-9.28-8.692 39.467 39.467 0 0 1-.44-2.625 11.004 11.004 0 0 1 0-2.945c.118-.876.262-1.759.44-2.625Z"/><circle cx="24.5" cy="23.5" r="1.5" fill="#fff"/><circle cx="35.5" cy="23.5" r="1.5" fill="#fff"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m31 20-3 8h4"/></g><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="29.5"/><defs><clipPath id="n"><rect width="60" height="60" fill="#fff" rx="30"/></clipPath></defs></svg>`, HELP_LOCK_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#C653C6" rx="3"/><path fill="#fff" d="M20.034 15.216C20 15.607 20 16.07 20 17v2.808c0 1.13 0 1.696-.2 2.11a1.78 1.78 0 0 1-.584.714c-.366.28-1.051.42-2.423.7a7.076 7.076 0 0 0-1.597.511 9.001 9.001 0 0 0-4.353 4.353C10 30.005 10 32.336 10 37c0 4.663 0 6.995.843 8.804a9.001 9.001 0 0 0 4.353 4.353C17.005 51 19.336 51 24 51h12c4.663 0 6.995 0 8.804-.843a9.001 9.001 0 0 0 4.353-4.353C50 43.995 50 41.664 50 37c0-4.663 0-6.995-.843-8.804a9.001 9.001 0 0 0-4.353-4.353 7.076 7.076 0 0 0-1.597-.511c-1.372-.28-2.057-.42-2.423-.7a1.78 1.78 0 0 1-.583-.715C40 21.505 40 20.94 40 19.809V17c0-.929 0-1.393-.034-1.784a9 9 0 0 0-8.182-8.182C31.393 7 30.93 7 30 7s-1.393 0-1.784.034a9 9 0 0 0-8.182 8.182Z"/><path fill="#E87DE8" d="M22 17c0-.929 0-1.393.044-1.784a7 7 0 0 1 6.172-6.172C28.606 9 29.071 9 30 9s1.393 0 1.784.044a7 7 0 0 1 6.172 6.172c.044.39.044.855.044 1.784v4.5a1.5 1.5 0 0 1-3 0V17c0-.93 0-1.394-.077-1.78a4 4 0 0 0-3.143-3.143C31.394 12 30.93 12 30 12s-1.394 0-1.78.077a4 4 0 0 0-3.143 3.143C25 15.606 25 16.07 25 17v4.5a1.5 1.5 0 0 1-3 0V17Z"/><path fill="#E87DE8" fill-rule="evenodd" d="M12 36.62c0-4.317 0-6.476.92-8.088a7 7 0 0 1 2.612-2.612c1.612-.92 3.77-.92 8.088-.92h6.855c.469 0 .703 0 .906.017 2.73.222 4.364 2.438 4.619 4.983.27-2.698 2.111-5 5.015-5A6.985 6.985 0 0 1 48 31.985v5.395c0 4.317 0 6.476-.92 8.088a7 7 0 0 1-2.612 2.612c-1.612.92-3.77.92-8.088.92h-5.855c-.469 0-.703 0-.906-.017-2.73-.222-4.364-2.438-4.619-4.983-.258 2.583-1.943 4.818-4.714 4.99-.155.01-.335.01-.694.01-.55 0-.825 0-1.057-.015a7 7 0 0 1-6.52-6.52C12 42.233 12 41.958 12 41.408V36.62Zm21.24-.273a4 4 0 1 0-6.478 0c.985 1.36 1.479 2.039 1.564 2.229.178.398.176.818.174 1.247V42.5a1.5 1.5 0 0 0 3 0v-2.677c-.002-.429-.004-.85.174-1.247.085-.19.579-.87 1.565-2.229Z" clip-rule="evenodd"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="2.5"/></svg>`, HELP_COMPAS_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#1DC956" rx="30"/><circle cx="30" cy="29.999" r="3" fill="#fff"/><path fill="#2BEE6C" stroke="#fff" stroke-width="2" d="m45.316 17.9-.88-.425.88.424a7.9 7.9 0 0 1 .026-.053c.093-.192.21-.432.26-.687l-.819-.162.819.162a2 2 0 0 0-.239-1.405c-.132-.224-.32-.412-.472-.562a8.415 8.415 0 0 1-.042-.042l-.042-.042c-.15-.151-.338-.34-.562-.472l-.508.862.508-.862a2 2 0 0 0-1.405-.239c-.255.05-.495.167-.687.26l-.053.026-15.05 7.246-.108.052c-1.131.545-1.843.887-2.456 1.374a6.994 6.994 0 0 0-1.13 1.13c-.487.613-.83 1.325-1.375 2.457l-.051.108-7.247 15.05-.025.053c-.094.192-.21.431-.26.686a2 2 0 0 0 .239 1.406l.855-.505-.856.505c.133.224.321.411.473.562l.042.042.041.042c.15.151.338.34.563.472a2 2 0 0 0 1.405.239l-.195-.981.195.98c.255-.05.494-.166.686-.26l.054-.025-.419-.87.419.87 15.05-7.247.107-.051c1.132-.545 1.844-.888 2.457-1.374a7.002 7.002 0 0 0 1.13-1.13c.487-.614.83-1.325 1.374-2.457l.052-.108 7.246-15.05Z"/><path fill="#1DC956" d="m33.376 32.723-2.669-3.43-14.85 14.849.206.205a1 1 0 0 0 1.141.194l15.105-7.273a3 3 0 0 0 1.067-4.545Z"/><path fill="#86F999" d="m26.624 27.276 2.669 3.43 14.85-14.849-.206-.205a1 1 0 0 0-1.141-.194L27.69 22.731a3 3 0 0 0-1.067 4.545Z"/><circle cx="30" cy="30" r="3" fill="#fff" transform="rotate(45 30 30)"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="29.5"/></svg>`, HELP_NOUN_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#794CFF" rx="3"/><path fill="#987DE8" stroke="#fff" stroke-width="2" d="M33 22.5v-1H16v5H8.5V36H13v-5h3v7.5h17V31h1v7.5h17v-17H34v5h-1v-4Z"/><path fill="#fff" d="M37.5 25h10v10h-10z"/><path fill="#4019B2" d="M42.5 25h5v10h-5z"/><path fill="#fff" d="M19.5 25h10v10h-10z"/><path fill="#4019B2" d="M24.5 25h5v10h-5z"/><path fill="#fff" d="M12 30.5h4V37h-4v-6.5Z"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="2.5"/></svg>`, HELP_DAO_IMG: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#o)"><path fill="#EB8B47" d="M0 24.9c0-9.252 0-13.878 1.97-17.332A15 15 0 0 1 7.569 1.97C11.023 0 15.648 0 24.9 0h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.022 60 15.648 60 24.899v10.2c0 9.252 0 13.878-1.97 17.332a15.001 15.001 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.351 0 35.1V24.9Z"/><path class="help-img-highlight" d="M.5 24.9c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.29a14.5 14.5 0 0 1 5.412-5.41C9.455 1.468 11.395.986 14.105.743 16.822.5 20.265.5 24.9.5h10.2c4.635 0 8.078 0 10.795.244 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.58 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.796-.244 2.71-.726 4.65-1.66 6.289a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.411c-.935-1.64-1.417-3.58-1.66-6.29C.5 43.178.5 39.734.5 35.1V24.9Z"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M19 52c5.523 0 10-4.477 10-10s-4.477-10-10-10S9 36.477 9 42s4.477 10 10 10Z"/><path fill="#fff" fill-rule="evenodd" d="M42.844 8.326a1 1 0 0 0-1.687 0L28.978 27.463A1 1 0 0 0 29.822 29h24.357a1 1 0 0 0 .843-1.537L42.844 8.326Z" clip-rule="evenodd"/><path fill="#FF974C" fill-rule="evenodd" d="M42.335 11.646c.324.115.571.504 1.066 1.28l7.332 11.523c.562.883.843 1.325.792 1.69a1 1 0 0 1-.342.623c-.28.238-.803.238-1.85.238H34.667c-1.047 0-1.57 0-1.85-.238a1 1 0 0 1-.342-.623c-.051-.365.23-.806.792-1.69l7.332-11.523c.495-.776.742-1.165 1.066-1.28a1 1 0 0 1 .67 0ZM35 27a7 7 0 0 0 7-7 7 7 0 0 0 7 7H35Z" clip-rule="evenodd"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M10.106 9.357c-.109.32-.107.682-.106.975V25.668c-.001.293-.003.654.106.975a2 2 0 0 0 1.251 1.25c.32.11.682.108.975.107H19c5.523 0 10-4.477 10-10S24.523 8 19 8h-6.668c-.293-.001-.654-.003-.975.106a2 2 0 0 0-1.25 1.251Z"/><circle cx="19" cy="18" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/><circle cx="19" cy="41.999" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/></g><defs><clipPath id="o"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, SEARCH_ICON: svg`<svg width="20" height="21"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.432 13.992c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#949E9E"/></svg>`, HELP_ICON: svg`<svg width="11" height="17" viewBox="0 0 11 17"><path fill="#fff" d="M5.22 2.97c-1.07 0-2.25.843-2.25 2.25a.75.75 0 0 1-1.5 0c0-2.393 2.019-3.75 3.75-3.75 1.73 0 3.75 1.357 3.75 3.75 0 1.64-1.038 2.466-1.785 3.057-.802.635-1.215.984-1.215 1.693a.75.75 0 1 1-1.5 0c0-1.466.985-2.24 1.681-2.788l.103-.081C7.007 6.504 7.47 6.08 7.47 5.22c0-1.407-1.181-2.25-2.25-2.25ZM5.22 14.97a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>`, WALLET_ICON: svg`<svg width="15" height="14" fill="none" viewBox="0 0 15 14"><path fill="#fff" fill-rule="evenodd" d="M.64 9.2v-3h.001c.009-1.857.07-2.886.525-3.682a4 4 0 0 1 1.492-1.493C3.58.5 4.813.5 7.28.5h3.735c.58 0 .871 0 1.114.04A3 3 0 0 1 14.6 3.011c.04.243.04.533.04 1.114 0 .58 0 .871-.04 1.114a3 3 0 0 1-2.471 2.47c-.243.041-.533.041-1.114.041h-.777c.178.307.302.648.362 1.011.04.243.04.533.04 1.114 0 .58 0 .871-.04 1.114a3 3 0 0 1-2.471 2.47c-.243.041-.533.041-1.114.041H4.507A3.867 3.867 0 0 1 .64 9.633V9.2ZM7.28 2h3.735c.64 0 .779.005.87.02a1.5 1.5 0 0 1 1.235 1.236c.015.09.02.229.02.869s-.005.779-.02.87a1.5 1.5 0 0 1-1.236 1.235c-.09.015-.229.02-.869.02H4.023c-.697 0-1.345.21-1.883.572V6.25h.001c.004-.791.015-1.383.059-1.867.056-.629.157-.926.269-1.122a2.5 2.5 0 0 1 .932-.933c.197-.111.494-.212 1.123-.268C5.173 2 6.019 2 7.28 2Zm-.265 5.75H4.023c-1.04 0-1.883.843-1.883 1.883A2.367 2.367 0 0 0 4.507 12h2.508c.64 0 .779-.005.87-.02a1.5 1.5 0 0 0 1.235-1.236c.015-.09.02-.229.02-.869s-.005-.779-.02-.87A1.5 1.5 0 0 0 7.884 7.77c-.09-.015-.228-.02-.869-.02Z" clip-rule="evenodd"/></svg>`, NETWORK_PLACEHOLDER: svg`<svg width="28" height="28" fill="none" viewBox="0 0 28 28"><mask id="p" width="26" height="28" x="1" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#D9D9D9" d="M12 1.172a4 4 0 0 1 4 0l8.124 4.69a4 4 0 0 1 2 3.465v9.381a4 4 0 0 1-2 3.464L16 26.862a4 4 0 0 1-4 0l-8.124-4.69a4 4 0 0 1-2-3.464V9.327a4 4 0 0 1 2-3.464L12 1.173Z"/></mask><g mask="url(#p)"><path id="network-placeholder-fill" fill="#fff" d="M0 0h28v28H0z"/><path id="network-placeholder-dash" stroke="#000" stroke-dasharray="2 2" d="m8.953 2.931 2.032-1.173.25.433 1.015-.586c.269-.155.553-.271.844-.35l-.13-.483a4.003 4.003 0 0 1 2.071 0l-.13.483c.293.079.576.195.845.35l1.016.586.25-.433 2.03 1.173-.25.433 2.032 1.173.25-.433 2.03 1.172-.25.433 1.016.587c.269.155.512.342.725.556l.354-.354a4.003 4.003 0 0 1 1.035 1.794l-.483.129c.078.292.12.596.12.906v1.172h.5v2.346h-.5v2.345h.5v2.345h-.5v1.173c0 .31-.042.614-.12.906l.483.13a4.003 4.003 0 0 1-1.035 1.793l-.354-.354a3.498 3.498 0 0 1-.725.556l-1.015.586.25.434-2.031 1.172-.25-.433-2.031 1.173.25.433-2.031 1.172-.25-.433-1.016.587a3.494 3.494 0 0 1-.844.35l.13.482a4.003 4.003 0 0 1-2.071 0l.13-.483a3.496 3.496 0 0 1-.845-.35l-1.015-.586-.25.433-2.032-1.172.25-.433-2.03-1.173-.25.433L4.89 22.76l.25-.434-1.015-.586a3.498 3.498 0 0 1-.725-.556l-.354.354a4.003 4.003 0 0 1-1.035-1.794l.483-.13a3.497 3.497 0 0 1-.12-.905v-1.173h-.5V15.19h.5v-2.345h-.5v-2.346h.5V9.327c0-.31.042-.614.12-.906l-.483-.13a4.003 4.003 0 0 1 1.035-1.793l.354.354c.213-.214.456-.401.725-.556l1.015-.587-.25-.433 2.031-1.172.25.433 2.031-1.173-.25-.433Z"/><path fill="#798686" stroke="#fff" d="M14.243 13.563 14 13.428l-.243.135-6.388 3.549-.024.013c-.432.24-.79.44-1.053.622-.266.184-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.317.37.538.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722l-.468-.177.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.317-.37-.538-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-6.388-3.55Z"/><path fill="#9EA9A9" stroke="#fff" d="M14.243 8.563 14 8.428l-.243.135-6.388 3.549-.024.013c-.432.24-.79.44-1.053.622-.266.184-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.316.37.537.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722l-.468-.177.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.316-.37-.537-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-6.388-3.55Z"/><path fill="#C9CFCF" stroke="#fff" d="m22.344 9.53-.468-.176.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.317-.37-.537-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-3.163-1.758-.09-.05c-1.163-.645-1.856-1.03-2.606-1.161a4.5 4.5 0 0 0-1.544 0c-.75.13-1.443.516-2.607 1.162l-.088.05-3.164 1.757-.024.013c-.432.24-.79.44-1.053.622-.266.185-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.317.37.537.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722Z"/></g></svg>`, WALLET_PLACEHOLDER: svg`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#q)"><path id="wallet-placeholder-fill" fill="#fff" d="M0 24.9c0-9.251 0-13.877 1.97-17.332a15 15 0 0 1 5.598-5.597C11.023 0 15.648 0 24.9 0h10.2c9.252 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.023 60 15.648 60 24.9v10.2c0 9.252 0 13.877-1.97 17.332a15.001 15.001 0 0 1-5.598 5.597C48.977 60 44.352 60 35.1 60H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.352 0 35.1V24.9Z"/><path id="wallet-placeholder-dash" stroke="#000" stroke-dasharray="4 4" stroke-width="1.5" d="M.04 41.708a231.598 231.598 0 0 1-.039-4.403l.75-.001L.75 35.1v-2.55H0v-5.1h.75V24.9l.001-2.204h-.75c.003-1.617.011-3.077.039-4.404l.75.016c.034-1.65.099-3.08.218-4.343l-.746-.07c.158-1.678.412-3.083.82-4.316l.713.236c.224-.679.497-1.296.827-1.875a14.25 14.25 0 0 1 1.05-1.585L3.076 5.9A15 15 0 0 1 5.9 3.076l.455.596a14.25 14.25 0 0 1 1.585-1.05c.579-.33 1.196-.603 1.875-.827l-.236-.712C10.812.674 12.217.42 13.895.262l.07.746C15.23.89 16.66.824 18.308.79l-.016-.75C19.62.012 21.08.004 22.695.001l.001.75L24.9.75h2.55V0h5.1v.75h2.55l2.204.001v-.75c1.617.003 3.077.011 4.404.039l-.016.75c1.65.034 3.08.099 4.343.218l.07-.746c1.678.158 3.083.412 4.316.82l-.236.713c.679.224 1.296.497 1.875.827a14.24 14.24 0 0 1 1.585 1.05l.455-.596A14.999 14.999 0 0 1 56.924 5.9l-.596.455c.384.502.735 1.032 1.05 1.585.33.579.602 1.196.827 1.875l.712-.236c.409 1.233.663 2.638.822 4.316l-.747.07c.119 1.264.184 2.694.218 4.343l.75-.016c.028 1.327.036 2.787.039 4.403l-.75.001.001 2.204v2.55H60v5.1h-.75v2.55l-.001 2.204h.75a231.431 231.431 0 0 1-.039 4.404l-.75-.016c-.034 1.65-.099 3.08-.218 4.343l.747.07c-.159 1.678-.413 3.083-.822 4.316l-.712-.236a10.255 10.255 0 0 1-.827 1.875 14.242 14.242 0 0 1-1.05 1.585l.596.455a14.997 14.997 0 0 1-2.824 2.824l-.455-.596c-.502.384-1.032.735-1.585 1.05-.579.33-1.196.602-1.875.827l.236.712c-1.233.409-2.638.663-4.316.822l-.07-.747c-1.264.119-2.694.184-4.343.218l.016.75c-1.327.028-2.787.036-4.403.039l-.001-.75-2.204.001h-2.55V60h-5.1v-.75H24.9l-2.204-.001v.75a231.431 231.431 0 0 1-4.404-.039l.016-.75c-1.65-.034-3.08-.099-4.343-.218l-.07.747c-1.678-.159-3.083-.413-4.316-.822l.236-.712a10.258 10.258 0 0 1-1.875-.827 14.252 14.252 0 0 1-1.585-1.05l-.455.596A14.999 14.999 0 0 1 3.076 54.1l.596-.455a14.24 14.24 0 0 1-1.05-1.585 10.259 10.259 0 0 1-.827-1.875l-.712.236C.674 49.188.42 47.783.262 46.105l.746-.07C.89 44.77.824 43.34.79 41.692l-.75.016Z"/><path fill="#fff" fill-rule="evenodd" d="M35.643 32.145c-.297-.743-.445-1.114-.401-1.275a.42.42 0 0 1 .182-.27c.134-.1.463-.1 1.123-.1.742 0 1.499.046 2.236-.05a6 6 0 0 0 5.166-5.166c.051-.39.051-.855.051-1.784 0-.928 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.165c-.39-.052-.854-.052-1.783-.052h-7.72c-4.934 0-7.401 0-9.244 1.051a8 8 0 0 0-2.985 2.986C16.057 22.28 16.003 24.58 16 29 15.998 31.075 16 33.15 16 35.224A7.778 7.778 0 0 0 23.778 43H28.5c1.394 0 2.09 0 2.67-.116a6 6 0 0 0 4.715-4.714c.115-.58.115-1.301.115-2.744 0-1.31 0-1.964-.114-2.49a4.998 4.998 0 0 0-.243-.792Z" clip-rule="evenodd"/><path fill="#9EA9A9" fill-rule="evenodd" d="M37 18h-7.72c-2.494 0-4.266.002-5.647.126-1.361.122-2.197.354-2.854.728a6.5 6.5 0 0 0-2.425 2.426c-.375.657-.607 1.492-.729 2.853-.11 1.233-.123 2.777-.125 4.867 0 .7 0 1.05.097 1.181.096.13.182.181.343.2.163.02.518-.18 1.229-.581a6.195 6.195 0 0 1 3.053-.8H37c.977 0 1.32-.003 1.587-.038a4.5 4.5 0 0 0 3.874-3.874c.036-.268.039-.611.039-1.588 0-.976-.003-1.319-.038-1.587a4.5 4.5 0 0 0-3.875-3.874C38.32 18.004 37.977 18 37 18Zm-7.364 12.5h-7.414a4.722 4.722 0 0 0-4.722 4.723 6.278 6.278 0 0 0 6.278 6.278H28.5c1.466 0 1.98-.008 2.378-.087a4.5 4.5 0 0 0 3.535-3.536c.08-.397.087-.933.087-2.451 0-1.391-.009-1.843-.08-2.17a3.5 3.5 0 0 0-2.676-2.676c-.328-.072-.762-.08-2.108-.08Z" clip-rule="evenodd"/></g><defs><clipPath id="q"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, TOKEN_PLACEHOLDER: svg`<svg width="60" height="60" viewBox="0 0 60 60" fill="none"><rect id="token-placeholder-fill" width="58" height="58" x="1" y="1" fill="#fff" rx="29"/><path fill="#3B4040" stroke="#fff" stroke-width="2" d="M32 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5.566c0 .357.192.685.495.875a16.001 16.001 0 0 1 4.256 3.894c.667.88.33 2.113-.627 2.665l-2.494 1.44c-.956.552-2.166.204-2.913-.609a9.12 9.12 0 1 0 .064 12.267c.739-.82 1.945-1.181 2.907-.64l2.509 1.415c.962.542 1.312 1.77.654 2.658a16 16 0 0 1-4.356 4.028c-.303.19-.495.518-.495.875V50a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.992c0-.602-.528-1.065-1.13-1.032-.579.032-1.16.032-1.74 0-.602-.032-1.13.43-1.13 1.032V50a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5.566c0-.357-.192-.685-.495-.875a16 16 0 0 1 0-27.118c.303-.19.495-.517.495-.875V10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.992c0 .601.528 1.064 1.13 1.032.58-.032 1.161-.032 1.74 0 .602.033 1.13-.43 1.13-1.032V10Z"/><rect id="token-placeholder-dash" width="58" height="58" x="1" y="1" stroke="#000" stroke-dasharray="6 6" stroke-width="2" rx="29"/></svg>`, ACCOUNT_COPY: svg`<svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path fill="#fff" fill-rule="evenodd" d="M4.003 4.005c.012-1.225.074-1.936.391-2.491a3 3 0 0 1 1.12-1.12C6.204 0 7.136 0 9 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C14 2.204 14 3.136 14 5s0 2.795-.394 3.486a3 3 0 0 1-1.12 1.12c-.555.317-1.266.379-2.491.391l.002.003c-.012 1.222-.075 1.932-.391 2.486a3 3 0 0 1-1.12 1.12C7.796 14 6.864 14 5 14s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C0 11.796 0 10.864 0 9s0-2.795.394-3.486a3 3 0 0 1 1.12-1.12c.554-.316 1.264-.379 2.486-.391l.003.002ZM9 8.5c-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.045-.08-.113-.243-.154-.693C5.501 6.58 5.5 5.959 5.5 5c0-.959.001-1.58.043-2.05.04-.45.109-.613.154-.693a1.5 1.5 0 0 1 .56-.56c.08-.045.243-.113.693-.154C7.42 1.501 8.041 1.5 9 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.045.08.113.243.154.693.042.47.043 1.091.043 2.05 0 .959-.001 1.58-.043 2.05-.04.45-.109.613-.154.693a1.5 1.5 0 0 1-.56.56c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043ZM4 5.503a13.77 13.77 0 0 0-1.05.04c-.45.04-.613.109-.693.154a1.5 1.5 0 0 0-.56.56c-.045.08-.113.243-.154.693C1.501 7.42 1.5 8.041 1.5 9c0 .959.001 1.58.043 2.05.04.45.109.613.154.693a1.5 1.5 0 0 0 .56.56c.08.045.243.113.693.154.47.042 1.091.043 2.05.043.959 0 1.58-.001 2.05-.043.45-.04.613-.109.693-.154a1.5 1.5 0 0 0 .56-.56c.045-.08.113-.242.154-.693.025-.283.035-.619.04-1.05-1.534-.003-2.358-.037-2.983-.394a3 3 0 0 1-1.12-1.12c-.357-.625-.39-1.449-.394-2.983Z" clip-rule="evenodd"/></svg>`, ACCOUNT_DISCONNECT: svg`<svg width="16" height="14" fill="none" viewBox="0 0 16 14"><path fill="#fff" d="M9.677 1.5h-2.61c-1.261 0-2.107.001-2.757.06-.629.056-.926.157-1.122.268a2.5 2.5 0 0 0-.933.933c-.112.196-.212.493-.269 1.122-.058.65-.06 1.496-.06 2.757v.72c0 1.26.002 2.107.06 2.756.057.63.157.927.27 1.123a2.5 2.5 0 0 0 .932.933c.196.111.493.212 1.122.268.65.059 1.496.06 2.757.06h2.61a.75.75 0 1 1 0 1.5h-2.61c-2.467 0-3.7 0-4.622-.525a4 4 0 0 1-1.493-1.493C.427 11.06.427 9.827.427 7.36v-.72c0-2.467 0-3.7.525-4.622A4 4 0 0 1 2.445.525C3.366 0 4.6 0 7.067 0h2.61a.75.75 0 1 1 0 1.5Z"/><path fill="#fff" d="M10.896 11.03a.75.75 0 0 1 0-1.06l1.793-1.793a.25.25 0 0 0-.176-.427H8.177a.75.75 0 0 1 0-1.5h4.336a.25.25 0 0 0 .176-.427L10.896 4.03a.75.75 0 0 1 1.061-1.06l3.323 3.323a1 1 0 0 1 0 1.414l-3.323 3.323a.75.75 0 0 1-1.06 0Z"/></svg>`, GLOBE_ICON: svg`<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-2.113.75c.301 0 .535.264.47.558a6.01 6.01 0 0 1-2.867 3.896c-.203.116-.42-.103-.334-.32.409-1.018.691-2.274.797-3.657a.512.512 0 0 1 .507-.477h1.427Zm.47-2.058c.065.294-.169.558-.47.558H11.96a.512.512 0 0 1-.507-.477c-.106-1.383-.389-2.638-.797-3.656-.087-.217.13-.437.333-.32a6.01 6.01 0 0 1 2.868 3.895Zm-4.402.558c.286 0 .515-.24.49-.525-.121-1.361-.429-2.534-.83-3.393-.279-.6-.549-.93-.753-1.112a.535.535 0 0 0-.724 0c-.204.182-.474.513-.754 1.112-.4.859-.708 2.032-.828 3.393a.486.486 0 0 0 .49.525h2.909Zm-5.415 0c.267 0 .486-.21.507-.477.106-1.383.389-2.638.797-3.656.087-.217-.13-.437-.333-.32a6.01 6.01 0 0 0-2.868 3.895c-.065.294.169.558.47.558H4.04ZM2.143 9.308c-.065-.294.169-.558.47-.558H4.04c.267 0 .486.21.507.477.106 1.383.389 2.639.797 3.657.087.217-.13.436-.333.32a6.01 6.01 0 0 1-2.868-3.896Zm3.913-.033a.486.486 0 0 1 .49-.525h2.909c.286 0 .515.24.49.525-.121 1.361-.428 2.535-.83 3.394-.279.6-.549.93-.753 1.112a.535.535 0 0 1-.724 0c-.204-.182-.474-.513-.754-1.112-.4-.859-.708-2.033-.828-3.394Z" clip-rule="evenodd"/></svg>` };
var po = css`.w3m-toolbar-placeholder{top:0;bottom:0;left:0;right:0;width:100%;position:absolute;display:block;pointer-events:none;height:100px;border-radius:calc(var(--w3m-background-border-radius) * .9);background-color:var(--w3m-background-color);background-image:var(--w3m-background-image-url);background-position:center;background-size:cover}.w3m-toolbar{height:38px;display:flex;position:relative;margin:5px 15px 5px 5px;justify-content:space-between;align-items:center}.w3m-toolbar img,.w3m-toolbar svg{height:28px;object-position:left center;object-fit:contain}#w3m-wc-logo path{fill:var(--w3m-accent-fill-color)}button{width:28px;height:28px;border-radius:var(--w3m-icon-button-border-radius);border:0;display:flex;justify-content:center;align-items:center;cursor:pointer;background-color:var(--w3m-color-bg-1);box-shadow:0 0 0 1px var(--w3m-color-overlay)}button:active{background-color:var(--w3m-color-bg-2)}button svg{display:block;object-position:center}button path{fill:var(--w3m-color-fg-1)}.w3m-toolbar div{display:flex}.w3m-toolbar div button:first-child{margin-right:16px}.w3m-help-active button:first-child{background-color:var(--w3m-color-fg-1)}.w3m-help-active button:first-child path{fill:var(--w3m-color-bg-1)}@media(hover:hover){button:hover{background-color:var(--w3m-color-bg-2)}}`;
var wo = Object.defineProperty;
var go = Object.getOwnPropertyDescriptor;
var Ie = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? go(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && wo(e, a, o), o;
};
var Pt = class extends LitElement {
  constructor() {
    super(), this.isHelp = false, this.unsubscribeRouter = void 0, this.unsubscribeRouter = b.subscribe((t) => {
      this.isHelp = t.view === "Help";
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeRouter) == null || t.call(this);
  }
  onHelp() {
    b.push("Help");
  }
  logoTemplate() {
    var t;
    const e = (t = ae.state.themeVariables) == null ? void 0 : t["--w3m-logo-image-url"];
    return e ? html`<img src="${e}">` : d3.WALLET_CONNECT_LOGO;
  }
  render() {
    const t = { "w3m-help-active": this.isHelp };
    return html`<div class="w3m-toolbar-placeholder"></div><div class="w3m-toolbar">${this.logoTemplate()}<div class="${classMap(t)}"><button @click="${this.onHelp}">${d3.HELP_ICON}</button> <button @click="${se.close}">${d3.CROSS_ICON}</button></div></div>`;
  }
};
Pt.styles = [w.globalCss, po], Ie([state()], Pt.prototype, "isHelp", 2), Pt = Ie([customElement("w3m-modal-backcard")], Pt);
var uo = css`main{padding:20px;padding-top:0;width:100%}`;
var vo = Object.defineProperty;
var bo = Object.getOwnPropertyDescriptor;
var fo = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? bo(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && vo(e, a, o), o;
};
var Yt = class extends LitElement {
  render() {
    return html`<main><slot></slot></main>`;
  }
};
Yt.styles = [w.globalCss, uo], Yt = fo([customElement("w3m-modal-content")], Yt);
var xo = css`footer{padding:10px;display:flex;flex-direction:column;align-items:inherit;justify-content:inherit;border-top:1px solid var(--w3m-color-bg-2)}`;
var yo = Object.defineProperty;
var Co = Object.getOwnPropertyDescriptor;
var $o = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Co(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && yo(e, a, o), o;
};
var Qt = class extends LitElement {
  render() {
    return html`<footer><slot></slot></footer>`;
  }
};
Qt.styles = [w.globalCss, xo], Qt = $o([customElement("w3m-modal-footer")], Qt);
var ko = css`header{display:flex;justify-content:center;align-items:center;padding:20px;position:relative}.w3m-border{border-bottom:1px solid var(--w3m-color-bg-2);margin-bottom:20px}header button{padding:15px 20px}header button:active{opacity:.5}@media(hover:hover){header button:hover{opacity:.5}}.w3m-back-btn{position:absolute;left:0}.w3m-action-btn{position:absolute;right:0}path{fill:var(--w3m-accent-color)}`;
var Oo = Object.defineProperty;
var Io = Object.getOwnPropertyDescriptor;
var bt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Io(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Oo(e, a, o), o;
};
var Y = class extends LitElement {
  constructor() {
    super(...arguments), this.title = "", this.onAction = void 0, this.actionIcon = void 0, this.border = false;
  }
  backBtnTemplate() {
    return html`<button class="w3m-back-btn" @click="${b.goBack}">${d3.BACK_ICON}</button>`;
  }
  actionBtnTemplate() {
    return html`<button class="w3m-action-btn" @click="${this.onAction}">${this.actionIcon}</button>`;
  }
  render() {
    const t = { "w3m-border": this.border }, e = b.state.history.length > 1, a = this.title ? html`<w3m-text variant="big-bold">${this.title}</w3m-text>` : html`<slot></slot>`;
    return html`<header class="${classMap(t)}">${e ? this.backBtnTemplate() : null} ${a} ${this.onAction ? this.actionBtnTemplate() : null}</header>`;
  }
};
Y.styles = [w.globalCss, ko], bt([property()], Y.prototype, "title", 2), bt([property()], Y.prototype, "onAction", 2), bt([property()], Y.prototype, "actionIcon", 2), bt([property()], Y.prototype, "border", 2), Y = bt([customElement("w3m-modal-header")], Y);
var Eo = { 1: "692ed6ba-e569-459a-556a-776476829e00", 42161: "600a9a04-c1b9-42ca-6785-9b4b6ff85200", 43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00", 56: "93564157-2e8e-4ce7-81df-b264dbee9b00", 250: "06b26297-fe0c-4733-5d6b-ffa5498aac00", 10: "ab9c186a-c52f-464b-2906-ca59d760a400", 137: "41d04d42-da3b-4453-8506-668cc0727900", 100: "02b53f6a-e3d4-479e-1cb4-21178987d100", 9001: "f926ff41-260d-4028-635e-91913fc28e00", 324: "b310f07f-4ef7-49f3-7073-2a0a39685800", 314: "5a73b3dd-af74-424e-cae0-0de859ee9400", 4689: "34e68754-e536-40da-c153-6ef2e7188a00", 1088: "3897a66d-40b9-4833-162f-a2c90531c900", 1284: "161038da-44ae-4ec7-1208-0ea569454b00", 1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00" };
var Wo = { ETH: { icon: "692ed6ba-e569-459a-556a-776476829e00" }, WETH: { icon: "692ed6ba-e569-459a-556a-776476829e00" }, AVAX: { icon: "30c46e53-e989-45fb-4549-be3bd4eb3b00" }, FTM: { icon: "06b26297-fe0c-4733-5d6b-ffa5498aac00" }, BNB: { icon: "93564157-2e8e-4ce7-81df-b264dbee9b00" }, MATIC: { icon: "41d04d42-da3b-4453-8506-668cc0727900" }, OP: { icon: "ab9c186a-c52f-464b-2906-ca59d760a400" }, xDAI: { icon: "02b53f6a-e3d4-479e-1cb4-21178987d100" }, EVMOS: { icon: "f926ff41-260d-4028-635e-91913fc28e00" }, METIS: { icon: "3897a66d-40b9-4833-162f-a2c90531c900" }, IOTX: { icon: "34e68754-e536-40da-c153-6ef2e7188a00" } };
var Z = { externalWallets() {
  const { isStandalone: t } = d.state;
  if (t)
    return [];
  let e = C.client().getConnectors();
  return e = e.filter((a) => a.id !== "injected"), e;
}, manualWallets() {
  var t, e;
  const { mobileWallets: a, desktopWallets: r } = y.state, o = (t = Z.recentWallet()) == null ? void 0 : t.id, i = c.isMobile() ? a : r, l = i == null ? void 0 : i.filter((p) => o !== p.id);
  return (e = c.isMobile() ? l == null ? void 0 : l.map(({ id: p, name: u, links: f }) => ({ id: p, name: u, mobile: f, links: f })) : l == null ? void 0 : l.map(({ id: p, name: u, links: f }) => ({ id: p, name: u, desktop: f, links: f }))) != null ? e : [];
}, installedInjectedWallets() {
  const { isStandalone: t } = d.state;
  if (t)
    return [];
  if (!C.client().isInjectedProviderInstalled())
    return [];
  const { namespace: e } = C.client(), { injectedWallets: a } = ne.state;
  let r = a.filter(({ injected: o }) => !!o.some((i) => C.client().safeCheckInjectedProvider(i.injected_id) && i.namespace === e));
  return r.length > 1 && (r = r.filter(({ injected: o }) => !!o.map(({ injected_id: i }) => i).every((i) => i !== "isMetaMask"))), r.length ? r : [{ name: "Browser", id: "browser", image_id: void 0 }];
}, injectedWallets() {
  const { isStandalone: t } = d.state, { explorerExcludedWalletIds: e, explorerRecommendedWalletIds: a } = y.state, r = c.isMobile();
  if (t || e === "ALL" || r)
    return [];
  const { namespace: o } = C.client(), { injectedWallets: i } = ne.state;
  return i.filter(({ id: l, injected: p }) => {
    const u = c.isArray(e) ? e : [], f = c.isArray(a) ? a : [];
    return !!p.some((j) => j.namespace === o && !u.includes(l) && !f.includes(l));
  });
}, recentWallet() {
  return s.getRecentWallet();
}, recomendedWallets(t = false) {
  var e;
  const a = Z.installedInjectedWallets().map(({ id: l }) => l), r = t || (e = Z.recentWallet()) == null ? void 0 : e.id, o = [...a, r], { recomendedWallets: i } = ne.state;
  return i.filter((l) => !o.includes(l.id));
} };
var s = { MOBILE_BREAKPOINT: 600, W3M_RECENT_WALLET_DATA: "W3M_RECENT_WALLET_DATA", EXPLORER_WALLET_URL: "https://explorer.walletconnect.com/?type=wallet", rejectStandaloneButtonComponent() {
  const { isStandalone: t } = d.state;
  if (t)
    throw new Error("Web3Modal button components are not available in standalone mode.");
}, getShadowRootElement(t, e) {
  const a = t.renderRoot.querySelector(e);
  if (!a)
    throw new Error(`${e} not found`);
  return a;
}, getWalletIcon({ id: t, image_id: e }) {
  const { walletImages: a } = y.state;
  return a != null && a[t] ? a[t] : e ? ne.getWalletImageUrl(e) : "";
}, getWalletName(t, e = false) {
  return e ? t.split(" ")[0] : t;
}, getChainIcon(t) {
  var e;
  const a = Eo[t], { projectId: r, chainImages: o } = y.state;
  return (e = o == null ? void 0 : o[t]) != null ? e : r && a ? ne.getAssetImageUrl(a) : "";
}, getTokenIcon(t) {
  var e, a;
  const r = (e = Wo[t]) == null ? void 0 : e.icon, { projectId: o, tokenImages: i } = y.state;
  return (a = i == null ? void 0 : i[t]) != null ? a : o && r ? ne.getAssetImageUrl(r) : "";
}, isMobileAnimation() {
  return window.innerWidth <= s.MOBILE_BREAKPOINT;
}, async preloadImage(t) {
  const e = new Promise((a, r) => {
    const o = new Image();
    o.onload = a, o.onerror = r, o.src = t;
  });
  return Promise.race([e, c.wait(3e3)]);
}, getErrorMessage(t) {
  return t instanceof Error ? t.message : "Unknown Error";
}, debounce(t, e = 500) {
  let a;
  return (...r) => {
    function o() {
      t(...r);
    }
    a && clearTimeout(a), a = setTimeout(o, e);
  };
}, handleMobileLinking(t) {
  const { standaloneUri: e } = d.state, { pairingUri: a } = _.state, { mobile: r, name: o } = t, i = r == null ? void 0 : r.native, l = r == null ? void 0 : r.universal;
  s.setRecentWallet(t);
  function p(u) {
    let f = "";
    i ? f = c.formatUniversalUrl(i, u, o) : l && (f = c.formatNativeUrl(l, u, o)), c.openHref(f, "_self");
  }
  p(e || a);
}, handleAndroidLinking() {
  const { standaloneUri: t } = d.state, { pairingUri: e } = _.state;
  t ? (c.setWalletConnectAndroidDeepLink(t), c.openHref(t, "_self")) : (c.setWalletConnectAndroidDeepLink(e), c.openHref(e, "_self"));
}, async handleUriCopy() {
  const { standaloneUri: t } = d.state, { pairingUri: e } = _.state;
  t ? await navigator.clipboard.writeText(t) : await navigator.clipboard.writeText(e), oe.openToast("Link copied", "success");
}, async handleConnectorConnection(t, e) {
  try {
    const { selectedChain: a } = d.state;
    await C.client().connectConnector(t, a == null ? void 0 : a.id), se.close();
  } catch (a) {
    console.error(a), e ? e() : oe.openToast(s.getErrorMessage(a), "error");
  }
}, getCustomImageUrls() {
  const { chainImages: t, walletImages: e } = y.state, a = Object.values(t ?? {}), r = Object.values(e ?? {});
  return Object.values([...a, ...r]);
}, truncate(t, e = 8) {
  return t.length <= e ? t : `${t.substring(0, 4)}...${t.substring(t.length - 4)}`;
}, generateAvatarColors(t) {
  var e;
  const a = (e = t.match(/.{1,7}/g)) == null ? void 0 : e.splice(0, 5), r = [];
  a == null ? void 0 : a.forEach((i) => {
    let l = 0;
    for (let u = 0; u < i.length; u += 1)
      l = i.charCodeAt(u) + ((l << 5) - l), l = l & l;
    const p = [0, 0, 0];
    for (let u = 0; u < 3; u += 1) {
      const f = l >> u * 8 & 255;
      p[u] = f;
    }
    r.push(`rgb(${p[0]}, ${p[1]}, ${p[2]})`);
  });
  const o = document.querySelector(":root");
  if (o) {
    const i = { "--w3m-color-av-1": r[0], "--w3m-color-av-2": r[1], "--w3m-color-av-3": r[2], "--w3m-color-av-4": r[3], "--w3m-color-av-5": r[4] };
    Object.entries(i).forEach(([l, p]) => o.style.setProperty(l, p));
  }
}, setRecentWallet(t) {
  const { walletConnectVersion: e } = d.state;
  localStorage.setItem(s.W3M_RECENT_WALLET_DATA, JSON.stringify({ [e]: t }));
}, getRecentWallet() {
  const t = localStorage.getItem(s.W3M_RECENT_WALLET_DATA);
  if (t) {
    const { walletConnectVersion: e } = d.state, a = JSON.parse(t);
    if (a[e])
      return a[e];
  }
}, caseSafeIncludes(t, e) {
  return t.toUpperCase().includes(e.toUpperCase());
}, openWalletExplorerUrl() {
  c.openHref(s.EXPLORER_WALLET_URL, "_blank");
}, getCachedRouterWalletPlatforms() {
  const { id: t, desktop: e, mobile: a, injected: r } = c.getWalletRouterData(), o = Z.installedInjectedWallets(), i = !!(r != null && r.length), l = o.some((j) => j.id === t), p = !!(e != null && e.native), u = !!(e != null && e.universal), f = !!(a != null && a.native) || !!(a != null && a.universal);
  return { isInjectedInstalled: l, isInjected: i, isDesktop: p, isMobile: f, isWeb: u };
}, goToConnectingView(t) {
  b.setData({ Wallet: t });
  const e = c.isMobile(), { isDesktop: a, isWeb: r, isMobile: o, isInjectedInstalled: i } = s.getCachedRouterWalletPlatforms();
  e ? i ? b.push("InjectedConnecting") : o ? b.push("MobileConnecting") : r ? b.push("WebConnecting") : b.push("InstallWallet") : i ? b.push("InjectedConnecting") : a ? b.push("DesktopConnecting") : r ? b.push("WebConnecting") : o ? b.push("MobileQrcodeConnecting") : b.push("InstallWallet");
} };
var Ao = css`.w3m-router{overflow:hidden;will-change:transform}.w3m-content{display:flex;flex-direction:column}`;
var jo = Object.defineProperty;
var Mo = Object.getOwnPropertyDescriptor;
var Xt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Mo(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && jo(e, a, o), o;
};
var ft = class extends LitElement {
  constructor() {
    super(), this.view = b.state.view, this.prevView = b.state.view, this.unsubscribe = void 0, this.oldHeight = "0px", this.resizeObserver = void 0, this.unsubscribe = b.subscribe((t) => {
      this.view !== t.view && this.onChangeRoute();
    });
  }
  firstUpdated() {
    this.resizeObserver = new ResizeObserver(([t]) => {
      const e = `${t.contentRect.height}px`;
      this.oldHeight !== "0px" && animate2(this.routerEl, { height: [this.oldHeight, e] }, { duration: 0.2 }), this.oldHeight = e;
    }), this.resizeObserver.observe(this.contentEl);
  }
  disconnectedCallback() {
    var t, e;
    (t = this.unsubscribe) == null || t.call(this), (e = this.resizeObserver) == null || e.disconnect();
  }
  get routerEl() {
    return s.getShadowRootElement(this, ".w3m-router");
  }
  get contentEl() {
    return s.getShadowRootElement(this, ".w3m-content");
  }
  viewTemplate() {
    switch (this.view) {
      case "ConnectWallet":
        return html`<w3m-connect-wallet-view></w3m-connect-wallet-view>`;
      case "SelectNetwork":
        return html`<w3m-select-network-view></w3m-select-network-view>`;
      case "InjectedConnecting":
        return html`<w3m-injected-connecting-view></w3m-injected-connecting-view>`;
      case "DesktopConnecting":
        return html`<w3m-desktop-connecting-view></w3m-desktop-connecting-view>`;
      case "MobileConnecting":
        return html`<w3m-mobile-connecting-view></w3m-mobile-connecting-view>`;
      case "WebConnecting":
        return html`<w3m-web-connecting-view></w3m-web-connecting-view>`;
      case "MobileQrcodeConnecting":
        return html`<w3m-mobile-qr-connecting-view></w3m-mobile-qr-connecting-view>`;
      case "GetWallet":
        return html`<w3m-get-wallet-view></w3m-get-wallet-view>`;
      case "WalletExplorer":
        return html`<w3m-wallet-explorer-view></w3m-wallet-explorer-view>`;
      case "Qrcode":
        return html`<w3m-qrcode-view></w3m-qrcode-view>`;
      case "Help":
        return html`<w3m-help-view></w3m-help-view>`;
      case "Account":
        return html`<w3m-account-view></w3m-account-view>`;
      case "SwitchNetwork":
        return html`<w3m-switch-network-view></w3m-switch-network-view>`;
      case "InstallWallet":
        return html`<w3m-install-wallet-view></w3m-install-wallet-view>`;
      default:
        return html`<div>Not Found</div>`;
    }
  }
  async onChangeRoute() {
    await animate2(this.routerEl, { opacity: [1, 0], scale: [1, 1.02] }, { duration: 0.15, delay: 0.1 }).finished, this.view = b.state.view, animate2(this.routerEl, { opacity: [0, 1], scale: [0.99, 1] }, { duration: 0.37, delay: 0.05 });
  }
  render() {
    return html`<div class="w3m-router"><div class="w3m-content">${this.viewTemplate()}</div></div>`;
  }
};
ft.styles = [w.globalCss, Ao], Xt([state()], ft.prototype, "view", 2), Xt([state()], ft.prototype, "prevView", 2), ft = Xt([customElement("w3m-modal-router")], ft);
var Po = css`div{height:36px;width:max-content;display:flex;justify-content:center;align-items:center;padding:9px 15px 11px;position:absolute;top:12px;box-shadow:0 6px 14px -6px rgba(10,16,31,.3),0 10px 32px -4px rgba(10,16,31,.15);z-index:2;left:50%;transform:translateX(-50%);pointer-events:none;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border-radius:var(--w3m-notification-border-radius);border:1px solid var(--w3m-color-overlay);background-color:var(--w3m-color-overlay)}svg{margin-right:5px}@-moz-document url-prefix(){div{background-color:var(--w3m-color-bg-3)}}.w3m-success path{fill:var(--w3m-accent-color)}.w3m-error path{fill:var(--w3m-error-color)}`;
var To = Object.defineProperty;
var Lo = Object.getOwnPropertyDescriptor;
var Ee = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Lo(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && To(e, a, o), o;
};
var Tt = class extends LitElement {
  constructor() {
    super(), this.open = false, this.unsubscribe = void 0, this.timeout = void 0, this.unsubscribe = oe.subscribe((t) => {
      t.open ? (this.open = true, this.timeout = setTimeout(() => oe.closeToast(), 2200)) : (this.open = false, clearTimeout(this.timeout));
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribe) == null || t.call(this), clearTimeout(this.timeout), oe.closeToast();
  }
  render() {
    const { message: t, variant: e } = oe.state, a = { "w3m-success": e === "success", "w3m-error": e === "error" };
    return this.open ? html`<div class="${classMap(a)}">${e === "success" ? d3.CHECKMARK_ICON : null} ${e === "error" ? d3.CROSS_ICON : null}<w3m-text variant="small-regular">${t}</w3m-text></div>` : null;
  }
};
Tt.styles = [w.globalCss, Po], Ee([state()], Tt.prototype, "open", 2), Tt = Ee([customElement("w3m-modal-toast")], Tt);
var _o = css`button{padding:5px;border-radius:var(--w3m-button-hover-highlight-border-radius);display:flex;flex-direction:column;align-items:center;justify-content:center;width:80px;height:90px;position:relative}w3m-network-image{width:54px;height:59px}w3m-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;margin-top:5px}button:active{background-color:var(--w3m-color-overlay)}.w3m-unsupported{opacity:.3}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}`;
var No = Object.defineProperty;
var Ro = Object.getOwnPropertyDescriptor;
var xt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ro(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && No(e, a, o), o;
};
var Q = class extends LitElement {
  constructor() {
    super(...arguments), this.onClick = () => null, this.name = "", this.chainId = "", this.unsupported = false;
  }
  render() {
    const t = { "w3m-unsupported": this.unsupported };
    return html`<button @click="${this.onClick}" class="${classMap(t)}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="xsmall-regular">${this.name}</w3m-text></button>`;
  }
};
Q.styles = [w.globalCss, _o], xt([property()], Q.prototype, "onClick", 2), xt([property()], Q.prototype, "name", 2), xt([property()], Q.prototype, "chainId", 2), xt([property()], Q.prototype, "unsupported", 2), Q = xt([customElement("w3m-network-button")], Q);
var Do = css`@keyframes loading{to{stroke-dashoffset:0}}:host{width:inherit;height:inherit;position:relative}path{stroke:var(--w3m-color-overlay)}svg{width:100%;height:100%;margin:0}#network-placeholder-fill{fill:var(--w3m-color-bg-3)}#network-placeholder-dash{stroke:var(--w3m-color-overlay)}image{clip-path:path('M17.033 4.964c3.852-2.262 5.778-3.393 7.84-3.77a11.807 11.807 0 0 1 4.254 0c2.062.377 3.988 1.508 7.84 3.77l6.066 3.562c3.852 2.263 5.777 3.394 7.13 5.022a12.268 12.268 0 0 1 2.127 3.747c.71 2.006.71 4.268.71 8.793v7.124c0 4.525 0 6.787-.71 8.793a12.268 12.268 0 0 1-2.126 3.747c-1.354 1.628-3.28 2.76-7.131 5.022l-6.066 3.562c-3.852 2.262-5.778 3.393-7.84 3.771a11.814 11.814 0 0 1-4.254 0c-2.062-.378-3.988-1.509-7.84-3.77l-6.066-3.563c-3.852-2.263-5.778-3.394-7.13-5.022a12.268 12.268 0 0 1-2.127-3.747C1 40 1 37.737 1 33.212v-7.124c0-4.525 0-6.787.71-8.793a12.268 12.268 0 0 1 2.127-3.747c1.352-1.628 3.278-2.76 7.13-5.022l6.066-3.562Z')}`;
var Zo = Object.defineProperty;
var Ho = Object.getOwnPropertyDescriptor;
var We = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ho(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Zo(e, a, o), o;
};
var Lt = class extends LitElement {
  constructor() {
    super(...arguments), this.chainId = "";
  }
  render() {
    const t = s.getChainIcon(this.chainId);
    return t ? html`<svg width="54" height="59" viewBox="0 0 54 59" fill="none"><image href="${t}"/><image href="${t}" width="54" height="59"/><path d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"/></svg>` : html`${d3.NETWORK_PLACEHOLDER}`;
  }
};
Lt.styles = [w.globalCss, Do], We([property()], Lt.prototype, "chainId", 2), Lt = We([customElement("w3m-network-image")], Lt);
var So = 0.1;
var Ae = 2.5;
var U = 7;
function Jt(t, e, a) {
  return t === e ? false : (t - e < 0 ? e - t : t - e) <= a + So;
}
function Bo(t, e) {
  const a = Array.prototype.slice.call(import_qrcode.default.create(t, { errorCorrectionLevel: e }).modules.data, 0), r = Math.sqrt(a.length);
  return a.reduce((o, i, l) => (l % r === 0 ? o.push([i]) : o[o.length - 1].push(i)) && o, []);
}
var Uo = { generate(t, e, a, r) {
  const o = r === "light" ? "#141414" : "#fff", i = r === "light" ? "#fff" : "#141414", l = [], p = Bo(t, "Q"), u = e / p.length, f = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
  f.forEach(({ x: W, y: k }) => {
    const N = (p.length - U) * u * W, I = (p.length - U) * u * k, D = 0.32;
    for (let S = 0; S < f.length; S += 1) {
      const it = u * (U - S * 2);
      l.push(svg`<rect fill="${S % 2 === 0 ? o : i}" height="${it}" rx="${it * D}" ry="${it * D}" width="${it}" x="${N + u * S}" y="${I + u * S}">`);
    }
  });
  const j = Math.floor((a + 25) / u), $ = p.length / 2 - j / 2, _2 = p.length / 2 + j / 2 - 1, Ce = [];
  p.forEach((W, k) => {
    W.forEach((N, I) => {
      if (p[k][I] && !(k < U && I < U || k > p.length - (U + 1) && I < U || k < U && I > p.length - (U + 1)) && !(k > $ && k < _2 && I > $ && I < _2)) {
        const D = k * u + u / 2, S = I * u + u / 2;
        Ce.push([D, S]);
      }
    });
  });
  const ut = {};
  return Ce.forEach(([W, k]) => {
    ut[W] ? ut[W].push(k) : ut[W] = [k];
  }), Object.entries(ut).map(([W, k]) => {
    const N = k.filter((I) => k.every((D) => !Jt(I, D, u)));
    return [Number(W), N];
  }).forEach(([W, k]) => {
    k.forEach((N) => {
      l.push(svg`<circle cx="${W}" cy="${N}" fill="${o}" r="${u / Ae}">`);
    });
  }), Object.entries(ut).filter(([W, k]) => k.length > 1).map(([W, k]) => {
    const N = k.filter((I) => k.some((D) => Jt(I, D, u)));
    return [Number(W), N];
  }).map(([W, k]) => {
    k.sort((I, D) => I < D ? -1 : 1);
    const N = [];
    for (const I of k) {
      const D = N.find((S) => S.some((it) => Jt(I, it, u)));
      D ? D.push(I) : N.push([I]);
    }
    return [W, N.map((I) => [I[0], I[I.length - 1]])];
  }).forEach(([W, k]) => {
    k.forEach(([N, I]) => {
      l.push(svg`<line x1="${W}" x2="${W}" y1="${N}" y2="${I}" stroke="${o}" stroke-width="${u / (Ae / 2)}" stroke-linecap="round">`);
    });
  }), l;
} };
var Vo = css`@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}div{position:relative;user-select:none;display:block;overflow:hidden;width:100%;aspect-ratio:1/1;animation:fadeIn ease .2s}svg:first-child,w3m-wallet-image{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}w3m-wallet-image{transform:translateY(-50%) translateX(-50%)}w3m-wallet-image{width:25%;height:25%;border-radius:var(--w3m-wallet-icon-border-radius)}svg:first-child{transform:translateY(-50%) translateX(-50%) scale(.9)}svg:first-child path:first-child{fill:var(--w3m-accent-color)}svg:first-child path:last-child{stroke:var(--w3m-color-overlay)}`;
var zo = Object.defineProperty;
var Go = Object.getOwnPropertyDescriptor;
var st = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Go(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && zo(e, a, o), o;
};
var G = class extends LitElement {
  constructor() {
    super(...arguments), this.uri = "", this.size = 0, this.imageId = void 0, this.walletId = void 0, this.imageUrl = void 0;
  }
  svgTemplate() {
    var t;
    const e = (t = ae.state.themeMode) != null ? t : "light";
    return svg`<svg height="${this.size}" width="${this.size}">${Uo.generate(this.uri, this.size, this.size / 4, e)}</svg>`;
  }
  render() {
    return html`<div>${this.walletId || this.imageUrl ? html`<w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}" imageUrl="${this.imageUrl}"></w3m-wallet-image>` : d3.WALLET_CONNECT_ICON_COLORED} ${this.svgTemplate()}<w3m-theme-context></w3m-theme-context></div>`;
  }
};
G.styles = [w.globalCss, Vo], st([property()], G.prototype, "uri", 2), st([property({ type: Number })], G.prototype, "size", 2), st([property()], G.prototype, "imageId", 2), st([property()], G.prototype, "walletId", 2), st([property()], G.prototype, "imageUrl", 2), G = st([customElement("w3m-qrcode")], G);
var Fo = css`:host{position:relative;height:28px;width:80%}input{width:100%;height:100%;line-height:28px!important;border-radius:var(--w3m-input-border-radius);font-style:normal;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;font-feature-settings:'case' on;font-weight:500;font-size:16px;letter-spacing:-.03em;padding:0 10px 0 34px;transition:.2s all ease;color:transparent;position:absolute;background-color:var(--w3m-color-bg-3);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay)}input::placeholder{color:transparent}svg{margin:2px 4px 0 0}div{top:0;left:calc(50% - 12px);transform:translateX(-50%);transition:.2s all ease;pointer-events:none;display:flex;align-items:center;justify-content:center;height:calc(100% - 2px);width:fit-content;position:relative}input:focus-within+div,input:not(:placeholder-shown)+div{transform:translateX(10px);left:0}w3m-text{opacity:1;transition:.2s opacity ease}input:focus-within+div w3m-text,input:not(:placeholder-shown)+div w3m-text{opacity:0}input:focus-within,input:not(:placeholder-shown){color:var(--w3m-color-fg-1)}input:focus-within{box-shadow:inset 0 0 0 1px var(--w3m-accent-color)}path{fill:var(--w3m-color-fg-2)}`;
var qo = Object.defineProperty;
var Ko = Object.getOwnPropertyDescriptor;
var je = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ko(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && qo(e, a, o), o;
};
var _t = class extends LitElement {
  constructor() {
    super(...arguments), this.onChange = () => null;
  }
  render() {
    const t = "Search wallets";
    return html`<input type="text" @input="${this.onChange}" placeholder="${t}"><div>${d3.SEARCH_ICON}<w3m-text color="secondary" variant="small-thin">${t}</w3m-text></div>`;
  }
};
_t.styles = [w.globalCss, Fo], je([property()], _t.prototype, "onChange", 2), _t = je([customElement("w3m-search-input")], _t);
var Yo = css`@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}svg{animation:rotate 2s linear infinite;display:flex;justify-content:center;align-items:center}svg circle{stroke-linecap:round;animation:dash 1.5s ease infinite;stroke:var(--w3m-accent-color)}`;
var Qo = Object.defineProperty;
var Xo = Object.getOwnPropertyDescriptor;
var Jo = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Xo(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Qo(e, a, o), o;
};
var te = class extends LitElement {
  render() {
    return html`<svg viewBox="0 0 50 50" width="24" height="24"><circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#fff"/></svg>`;
  }
};
te.styles = [w.globalCss, Yo], te = Jo([customElement("w3m-spinner")], te);
var ta = css`span{font-style:normal;font-family:var(--w3m-font-family);font-feature-settings:'tnum' on,'lnum' on,'case' on}.w3m-xsmall-bold{font-family:var(--w3m-text-xsmall-bold-font-family);font-weight:var(--w3m-text-xsmall-bold-weight);font-size:var(--w3m-text-xsmall-bold-size);line-height:var(--w3m-text-xsmall-bold-line-height);letter-spacing:var(--w3m-text-xsmall-bold-letter-spacing);text-transform:var(--w3m-text-xsmall-bold-text-transform)}.w3m-xsmall-regular{font-family:var(--w3m-text-xsmall-regular-font-family);font-weight:var(--w3m-text-xsmall-regular-weight);font-size:var(--w3m-text-xsmall-regular-size);line-height:var(--w3m-text-xsmall-regular-line-height);letter-spacing:var(--w3m-text-xsmall-regular-letter-spacing);text-transform:var(--w3m-text-xsmall-regular-text-transform)}.w3m-small-thin{font-family:var(--w3m-text-small-thin-font-family);font-weight:var(--w3m-text-small-thin-weight);font-size:var(--w3m-text-small-thin-size);line-height:var(--w3m-text-small-thin-line-height);letter-spacing:var(--w3m-text-small-thin-letter-spacing);text-transform:var(--w3m-text-small-thin-text-transform)}.w3m-small-regular{font-family:var(--w3m-text-small-regular-font-family);font-weight:var(--w3m-text-small-regular-weight);font-size:var(--w3m-text-small-regular-size);line-height:var(--w3m-text-small-regular-line-height);letter-spacing:var(--w3m-text-small-regular-letter-spacing);text-transform:var(--w3m-text-small-regular-text-transform)}.w3m-medium-regular{font-family:var(--w3m-text-medium-regular-font-family);font-weight:var(--w3m-text-medium-regular-weight);font-size:var(--w3m-text-medium-regular-size);line-height:var(--w3m-text-medium-regular-line-height);letter-spacing:var(--w3m-text-medium-regular-letter-spacing);text-transform:var(--w3m-text-medium-regular-text-transform)}.w3m-big-bold{font-family:var(--w3m-text-big-bold-font-family);font-weight:var(--w3m-text-big-bold-weight);font-size:var(--w3m-text-big-bold-size);line-height:var(--w3m-text-big-bold-line-height);letter-spacing:var(--w3m-text-big-bold-letter-spacing);text-transform:var(--w3m-text-big-bold-text-transform)}:host(*){color:var(--w3m-color-fg-1)}.w3m-color-primary{color:var(--w3m-color-fg-1)}.w3m-color-secondary{color:var(--w3m-color-fg-2)}.w3m-color-tertiary{color:var(--w3m-color-fg-3)}.w3m-color-inverse{color:var(--w3m-accent-fill-color)}.w3m-color-accnt{color:var(--w3m-accent-color)}.w3m-color-error{color:var(--w3m-error-color)}`;
var ea = Object.defineProperty;
var oa = Object.getOwnPropertyDescriptor;
var ee = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? oa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && ea(e, a, o), o;
};
var yt = class extends LitElement {
  constructor() {
    super(...arguments), this.variant = "medium-regular", this.color = "primary";
  }
  render() {
    const t = { "w3m-big-bold": this.variant === "big-bold", "w3m-medium-regular": this.variant === "medium-regular", "w3m-small-regular": this.variant === "small-regular", "w3m-small-thin": this.variant === "small-thin", "w3m-xsmall-regular": this.variant === "xsmall-regular", "w3m-xsmall-bold": this.variant === "xsmall-bold", "w3m-color-primary": this.color === "primary", "w3m-color-secondary": this.color === "secondary", "w3m-color-tertiary": this.color === "tertiary", "w3m-color-inverse": this.color === "inverse", "w3m-color-accnt": this.color === "accent", "w3m-color-error": this.color === "error" };
    return html`<span><slot class="${classMap(t)}"></slot></span>`;
  }
};
yt.styles = [w.globalCss, ta], ee([property()], yt.prototype, "variant", 2), ee([property()], yt.prototype, "color", 2), yt = ee([customElement("w3m-text")], yt);
var aa = css`div{overflow:hidden;position:relative;border-radius:50%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:50%;border:1px solid var(--w3m-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}svg{width:100%;height:100%}#token-placeholder-fill{fill:var(--w3m-color-bg-3)}#token-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var ra = Object.defineProperty;
var ia = Object.getOwnPropertyDescriptor;
var Me = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ia(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && ra(e, a, o), o;
};
var Nt = class extends LitElement {
  constructor() {
    super(...arguments), this.symbol = void 0;
  }
  render() {
    var t;
    const e = s.getTokenIcon((t = this.symbol) != null ? t : "");
    return e ? html`<div><img src="${e}" alt="${this.id}"></div>` : d3.TOKEN_PLACEHOLDER;
  }
};
Nt.styles = [w.globalCss, aa], Me([property()], Nt.prototype, "symbol", 2), Nt = Me([customElement("w3m-token-image")], Nt);
var la = css`button{width:100%;height:100%;border-radius:var(--w3m-button-hover-highlight-border-radius);display:flex;align-items:flex-start}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button>div{width:80px;padding:5px 0;display:flex;flex-direction:column;align-items:center}w3m-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}w3m-wallet-image{height:60px;width:60px;transition:all .2s ease;border-radius:var(--w3m-wallet-icon-border-radius);margin-bottom:5px}.w3m-sublabel{margin-top:2px}`;
var na = Object.defineProperty;
var sa = Object.getOwnPropertyDescriptor;
var F = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? sa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && na(e, a, o), o;
};
var B = class extends LitElement {
  constructor() {
    super(...arguments), this.onClick = () => null, this.name = "", this.walletId = "", this.label = void 0, this.imageId = void 0, this.installed = false, this.recent = false;
  }
  sublabelTemplate() {
    return this.recent ? html`<w3m-text class="w3m-sublabel" variant="xsmall-bold" color="tertiary">RECENT</w3m-text>` : this.installed ? html`<w3m-text class="w3m-sublabel" variant="xsmall-bold" color="tertiary">INSTALLED</w3m-text>` : null;
  }
  handleClick() {
    H.click({ name: "WALLET_BUTTON", walletId: this.walletId }), this.onClick();
  }
  render() {
    var t;
    return html`<button @click="${this.handleClick.bind(this)}"><div><w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}"></w3m-wallet-image><w3m-text variant="xsmall-regular">${(t = this.label) != null ? t : s.getWalletName(this.name, true)}</w3m-text>${this.sublabelTemplate()}</div></button>`;
  }
};
B.styles = [w.globalCss, la], F([property()], B.prototype, "onClick", 2), F([property()], B.prototype, "name", 2), F([property()], B.prototype, "walletId", 2), F([property()], B.prototype, "label", 2), F([property()], B.prototype, "imageId", 2), F([property()], B.prototype, "installed", 2), F([property()], B.prototype, "recent", 2), B = F([customElement("w3m-wallet-button")], B);
var ca = css`:host{display:block}div{overflow:hidden;position:relative;border-radius:inherit;width:100%;height:100%;background-color:var(--w3m-color-overlay)}svg{position:relative;width:100%;height:100%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:inherit;border:1px solid var(--w3m-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var da = Object.defineProperty;
var ma = Object.getOwnPropertyDescriptor;
var Rt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ma(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && da(e, a, o), o;
};
var ct = class extends LitElement {
  constructor() {
    super(...arguments), this.walletId = "", this.imageId = void 0, this.imageUrl = void 0;
  }
  render() {
    var t;
    const e = (t = this.imageUrl) != null && t.length ? this.imageUrl : s.getWalletIcon({ id: this.walletId, image_id: this.imageId });
    return html`${e.length ? html`<div><img src="${e}" alt="${this.id}"></div>` : d3.WALLET_PLACEHOLDER}`;
  }
};
ct.styles = [w.globalCss, ca], Rt([property()], ct.prototype, "walletId", 2), Rt([property()], ct.prototype, "imageId", 2), Rt([property()], ct.prototype, "imageUrl", 2), ct = Rt([customElement("w3m-wallet-image")], ct);
var ha = Object.defineProperty;
var pa = Object.getOwnPropertyDescriptor;
var wa = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? pa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && ha(e, a, o), o;
};
var Pe = class extends LitElement {
  constructor() {
    super(), this.unwatchAccount = void 0, K.getAccount(), this.fetchProfile(), this.fetchBalance(), this.unwatchAccount = C.client().watchAccount((t) => {
      const { address: e, isConnected: a } = K.state;
      t.isConnected && t.address !== e && (this.fetchProfile(t.address), this.fetchBalance(t.address), K.setAddress(t.address)), t.isConnected || K.resetAccount(), a !== t.isConnected && se.close(), !a && t.isConnected ? H.track({ name: "ACCOUNT_CONNECTED" }) : a && !t.isConnected && H.track({ name: "ACCOUNT_DISCONNECTED" }), K.setIsConnected(t.isConnected);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchAccount) == null || t.call(this);
  }
  async fetchProfile(t) {
    var e;
    const a = (e = d.state.chains) == null ? void 0 : e.find((r) => r.id === 1);
    if (y.state.enableAccountView && a)
      try {
        await K.fetchProfile(s.preloadImage, t);
      } catch (r) {
        console.error(r), oe.openToast(s.getErrorMessage(r), "error");
      }
  }
  async fetchBalance(t) {
    if (y.state.enableAccountView)
      try {
        await K.fetchBalance(t);
      } catch (e) {
        console.error(e), oe.openToast(s.getErrorMessage(e), "error");
      }
  }
};
Pe = wa([customElement("w3m-account-context")], Pe);
var ga = Object.defineProperty;
var ua = Object.getOwnPropertyDescriptor;
var Te = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ua(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && ga(e, a, o), o;
};
var oe2 = class extends LitElement {
  constructor() {
    super(), this.preload = true, this.preloadData();
  }
  async loadImages(t) {
    try {
      t != null && t.length && await Promise.all(t.map(async (e) => s.preloadImage(e)));
    } catch {
      console.info("Unsuccessful attempt at preloading some images", t);
    }
  }
  async preloadListings() {
    var t;
    if (y.state.enableExplorer) {
      const { chains: e } = d.state;
      await Promise.all([ne.getRecomendedWallets(), ne.getInjectedWallets()]), d.setIsDataLoaded(true);
      const { recomendedWallets: a } = ne.state, r = Z.installedInjectedWallets(), o = (t = e == null ? void 0 : e.map((p) => s.getChainIcon(p.id))) != null ? t : [], i = a.map((p) => s.getWalletIcon(p)), l = r.map((p) => s.getWalletIcon(p));
      await this.loadImages([...o, ...i, ...l]);
    } else
      d.setIsDataLoaded(true);
  }
  async preloadCustomImages() {
    const t = s.getCustomImageUrls();
    await this.loadImages(t);
  }
  async preloadData() {
    try {
      this.preload && (this.preload = false, await Promise.all([this.preloadListings(), this.preloadCustomImages()]));
    } catch (t) {
      console.error(t), oe.openToast("Failed preloading", "error");
    }
  }
};
Te([state()], oe2.prototype, "preload", 2), oe2 = Te([customElement("w3m-explorer-context")], oe2);
var va = Object.defineProperty;
var ba = Object.getOwnPropertyDescriptor;
var Le = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ba(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && va(e, a, o), o;
};
var ae2 = class extends LitElement {
  constructor() {
    super(), this.activeChainId = void 0, this.unwatchNetwork = void 0;
    const t = d.getSelectedChain();
    this.activeChainId = t == null ? void 0 : t.id, this.unwatchNetwork = C.client().watchNetwork((e) => {
      const a = e.chain;
      a && this.activeChainId !== a.id && (d.setSelectedChain(a), this.activeChainId = a.id, K.resetBalance(), this.fetchBalance());
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchNetwork) == null || t.call(this);
  }
  async fetchBalance() {
    if (y.state.enableAccountView)
      try {
        await K.fetchBalance();
      } catch (t) {
        console.error(t), oe.openToast(s.getErrorMessage(t), "error");
      }
  }
};
Le([state()], ae2.prototype, "activeChainId", 2), ae2 = Le([customElement("w3m-network-context")], ae2);
var fa = Object.defineProperty;
var xa = Object.getOwnPropertyDescriptor;
var ya = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? xa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && fa(e, a, o), o;
};
var _e2 = class extends LitElement {
  constructor() {
    super(), this.unsubscribeTheme = void 0, w.setTheme(), this.unsubscribeTheme = ae.subscribe(w.setTheme), this.preloadThemeImages();
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeTheme) == null || t.call(this);
  }
  async preloadThemeImages() {
    try {
      const { themeVariables: t } = ae.state, e = [t == null ? void 0 : t["--w3m-background-image-url"], t == null ? void 0 : t["--w3m-logo-image-url"]].filter(Boolean);
      e.length && await Promise.all(e.map(async (a) => s.preloadImage(a)));
    } catch {
      console.info("Unsuccessful attempt at preloading some images");
    }
  }
};
_e2 = ya([customElement("w3m-theme-context")], _e2);
var Ca = Object.defineProperty;
var $a = Object.getOwnPropertyDescriptor;
var ka = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? $a(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ca(e, a, o), o;
};
var Oa = 18e4;
var Ne = 1e3;
var Re;
var De = class extends LitElement {
  constructor() {
    super(), this.unwatchOptions = void 0, this.unwatchAccount = void 0, this.timeout = void 0, this.isGenerated = false, this.selectedChainId = (Re = d.state.selectedChain) == null ? void 0 : Re.id, this.isAccountConnected = K.state.isConnected, this.lastRetry = Date.now(), this.unwatchOptions = d.subscribe((t) => {
      var e, a;
      ((e = t.selectedChain) == null ? void 0 : e.id) !== this.selectedChainId && (this.selectedChainId = (a = t.selectedChain) == null ? void 0 : a.id, this.connectAndWait());
    }), this.unwatchAccount = K.subscribe((t) => {
      (this.isAccountConnected !== t.isConnected || !this.isGenerated) && (this.isAccountConnected = t.isConnected, setTimeout(this.connectAndWait.bind(this), 0));
    }), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this));
  }
  disconnectedCallback() {
    var t, e;
    (t = this.unwatchOptions) == null || t.call(this), (e = this.unwatchAccount) == null || e.call(this), document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }
  async connectAndWait() {
    if (clearTimeout(this.timeout), !this.isAccountConnected) {
      this.isGenerated = true, this.timeout = setTimeout(this.connectAndWait.bind(this), Oa);
      try {
        const { standaloneUri: t, selectedChain: e } = d.state;
        t ? _.setPairingUri(t) : await C.client().connectWalletConnect((a) => _.setPairingUri(a), e == null ? void 0 : e.id);
      } catch (t) {
        console.error(t), _.setPairingError(true), oe.openToast("Connection request declined", "error"), Date.now() - this.lastRetry >= Ne && (this.lastRetry = Date.now(), this.connectAndWait());
      }
    }
  }
  onVisibilityChange() {
    !document.hidden && c.isMobile() && setTimeout(this.connectAndWait.bind(this), Ne);
  }
};
De = ka([customElement("w3m-wc-connection-context")], De);
var Ia = css`:host{all:initial}div{display:flex;align-items:center;background-color:var(--w3m-color-overlay);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);border-radius:var(--w3m-button-border-radius);padding:4px 4px 4px 8px}div button{border-radius:var(--w3m-secondary-button-border-radius);padding:4px 8px;padding-left:4px;height:auto;margin-left:10px;color:var(--w3m-accent-fill-color);background-color:var(--w3m-accent-color)}.w3m-no-avatar{padding-left:8px}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--w3m-color-overlay)}button:hover::after{background-color:var(--w3m-color-overlay)}w3m-avatar{margin-right:6px}w3m-button-big w3m-avatar{margin-left:-5px}`;
var Ea = Object.defineProperty;
var Wa = Object.getOwnPropertyDescriptor;
var re = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Wa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ea(e, a, o), o;
};
var Ct = class extends LitElement {
  constructor() {
    super(), this.balance = "hide", this.avatar = "show", s.rejectStandaloneButtonComponent();
  }
  onOpen() {
    const { isStandalone: t } = d.state;
    t || (H.click({ name: "ACCOUNT_BUTTON" }), se.open({ route: "Account" }));
  }
  accountTemplate() {
    const t = this.avatar === "show";
    return html`${t ? html`<w3m-avatar></w3m-avatar>` : null}<w3m-address-text></w3m-address-text>`;
  }
  render() {
    const t = this.balance === "show", e = { "w3m-no-avatar": this.avatar === "hide" };
    return t ? html`<div><w3m-balance></w3m-balance><button @click="${this.onOpen}" class="${classMap(e)}">${this.accountTemplate()}</button></div>` : html`<w3m-button-big @click="${this.onOpen}">${this.accountTemplate()}</w3m-button-big>`;
  }
};
Ct.styles = [w.globalCss, Ia], re([property()], Ct.prototype, "balance", 2), re([property()], Ct.prototype, "avatar", 2), Ct = re([customElement("w3m-account-button")], Ct);
var Aa = css`button{display:flex;border-radius:var(--w3m-button-hover-highlight-border-radius);flex-direction:column;justify-content:center;padding:5px;width:100px}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button:disabled{pointer-events:none}w3m-network-image{width:32px;height:32px}w3m-text{margin-top:4px}`;
var ja = Object.defineProperty;
var Ma = Object.getOwnPropertyDescriptor;
var ie = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ma(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && ja(e, a, o), o;
};
var $t = class extends LitElement {
  constructor() {
    super(), this.chainId = 0, this.label = "", this.unsubscribeNetwork = void 0;
    const { selectedChain: t } = d.state;
    this.chainId = t == null ? void 0 : t.id, this.label = t == null ? void 0 : t.name, this.unsubscribeNetwork = d.subscribe(({ selectedChain: e }) => {
      this.chainId = e == null ? void 0 : e.id, this.label = e == null ? void 0 : e.name;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeNetwork) == null || t.call(this);
  }
  onClick() {
    b.push("SelectNetwork");
  }
  render() {
    const { chains: t, selectedChain: e } = d.state, a = t == null ? void 0 : t.map((i) => i.id), r = e && (a == null ? void 0 : a.includes(e.id)), o = t && t.length <= 1 && r;
    return html`<button @click="${this.onClick}" ?disabled="${o}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="xsmall-regular" color="accent">${this.label}</w3m-text></button>`;
  }
};
$t.styles = [w.globalCss, Aa], ie([state()], $t.prototype, "chainId", 2), ie([state()], $t.prototype, "label", 2), $t = ie([customElement("w3m-account-network-button")], $t);
var Pa = css`@keyframes slide{0%{background-position:0 0}100%{background-position:200px 0}}w3m-text{padding:1px 0}.w3m-loading{background:linear-gradient(270deg,var(--w3m-color-fg-1) 36.33%,var(--w3m-color-fg-3) 42.07%,var(--w3m-color-fg-1) 83.3%);background-size:200px 100%;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation-name:slide;animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear}`;
var Ta = Object.defineProperty;
var La = Object.getOwnPropertyDescriptor;
var kt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? La(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ta(e, a, o), o;
};
var X = class extends LitElement {
  constructor() {
    super(), this.address = void 0, this.name = void 0, this.loading = true, this.variant = "button", this.unsubscribeAccount = void 0, this.address = K.state.address, this.name = K.state.profileName, this.loading = !!K.state.profileLoading, this.unsubscribeAccount = K.subscribe(({ address: t, profileName: e, profileLoading: a }) => {
      this.address = t, this.name = e, this.loading = !!a;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    var t;
    const e = this.variant === "button", a = { "w3m-loading": this.loading };
    return html`<w3m-text class="${classMap(a)}" variant="${e ? "medium-regular" : "big-bold"}" color="${e ? "inverse" : "primary"}">${this.name ? this.name : s.truncate((t = this.address) != null ? t : "")}</w3m-text>`;
  }
};
X.styles = [w.globalCss, Pa], kt([state()], X.prototype, "address", 2), kt([state()], X.prototype, "name", 2), kt([state()], X.prototype, "loading", 2), kt([property()], X.prototype, "variant", 2), X = kt([customElement("w3m-address-text")], X);
var P = { onConnecting(t) {
  s.goToConnectingView(t);
}, onExternal(t) {
  s.handleConnectorConnection(t);
}, manualWalletsTemplate() {
  return Z.manualWallets().map((t) => html`<w3m-wallet-button walletId="${t.id}" name="${t.name}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`);
}, recomendedWalletsTemplate(t = false) {
  return Z.recomendedWallets(t).map((e) => html`<w3m-wallet-button walletId="${e.id}" imageId="${e.image_id}" name="${e.name}" .onClick="${() => this.onConnecting(e)}"></w3m-wallet-button>`);
}, externalWalletsTemplate() {
  return Z.externalWallets().map((t) => html`<w3m-wallet-button name="${t.name}" walletId="${t.id}" .onClick="${() => this.onExternal(t.id)}"></w3m-wallet-button>`);
}, recentWalletTemplate() {
  const t = Z.recentWallet();
  if (t)
    return html`<w3m-wallet-button name="${t.name}" walletId="${t.id}" imageId="${t.image_id}" .recent="${true}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`;
}, installedInjectedWalletsTemplate() {
  return Z.installedInjectedWallets().map((t) => html`<w3m-wallet-button .installed="${true}" name="${t.name}" walletId="${t.id}" imageId="${t.image_id}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`);
}, injectedWalletsTemplate() {
  return Z.injectedWallets().map((t) => html`<w3m-wallet-button name="${t.name}" walletId="${t.id}" imageId="${t.image_id}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`);
} };
var _a5 = css`@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(calc(-70px * 9),0,0)}}.w3m-slider{position:relative;overflow-x:hidden;padding:10px 0;margin:0 -20px;width:calc(100% + 40px)}.w3m-track{display:flex;width:calc(70px * 18);animation:scroll 20s linear infinite;opacity:.7}.w3m-track svg{margin:0 5px}w3m-wallet-image{width:60px;height:60px;margin:0 5px;border-radius:var(--w3m-wallet-icon-border-radius)}.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.w3m-title{display:flex;align-items:center;margin-bottom:10px}.w3m-title svg{margin-right:6px}.w3m-title path{fill:var(--w3m-accent-color)}w3m-modal-footer .w3m-title{padding:0 10px}w3m-button-big{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);filter:drop-shadow(0 0 17px var(--w3m-color-bg-1))}w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-info-footer w3m-text{text-align:center;margin-bottom:15px}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var Na = Object.defineProperty;
var Ra = Object.getOwnPropertyDescriptor;
var Da = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ra(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Na(e, a, o), o;
};
var le = class extends LitElement {
  onGoToQrcode() {
    b.push("Qrcode");
  }
  onGetWallet() {
    b.push("GetWallet");
  }
  render() {
    const { recomendedWallets: t } = ne.state, e = [...t, ...t], a = P.externalWalletsTemplate(), r = P.installedInjectedWalletsTemplate(), o = [...r, ...a].length > 0, i = c.RECOMMENDED_WALLET_AMOUNT * 2;
    return html`<w3m-modal-header title="Connect your wallet" .onAction="${this.onGoToQrcode}" .actionIcon="${d3.QRCODE_ICON}"></w3m-modal-header><w3m-modal-content><div class="w3m-title">${d3.MOBILE_ICON}<w3m-text variant="small-regular" color="accent">WalletConnect</w3m-text></div><div class="w3m-slider"><div class="w3m-track">${[...Array(i)].map((l, p) => {
      const u = e[p % e.length];
      return u ? html`<w3m-wallet-image walletId="${u.id}" imageId="${u.image_id}"></w3m-wallet-image>` : d3.WALLET_PLACEHOLDER;
    })}</div><w3m-button-big @click="${s.handleAndroidLinking}"><w3m-text variant="medium-regular" color="inverse">Select Wallet</w3m-text></w3m-button-big></div></w3m-modal-content>${o ? html`<w3m-modal-footer><div class="w3m-title">${d3.WALLET_ICON}<w3m-text variant="small-regular" color="accent">Other</w3m-text></div><div class="w3m-grid">${r} ${a}</div></w3m-modal-footer>` : null}<w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Choose WalletConnect to see supported apps on your device${o ? ", or select from other options" : ""}`}</w3m-text><w3m-button variant="outline" .iconRight="${d3.ARROW_UP_RIGHT_ICON}" .onClick="${() => this.onGetWallet()}">I don't have a wallet</w3m-button></w3m-info-footer>`;
  }
};
le.styles = [w.globalCss, _a5], le = Da([customElement("w3m-android-wallet-selection")], le);
var Za = css`@keyframes slide{0%{transform:translateX(-50px)}100%{transform:translateX(200px)}}.w3m-placeholder,img{border-radius:50%;box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);display:block;position:relative;overflow:hidden!important;background-color:var(--w3m-color-av-1);background-image:radial-gradient(at 66% 77%,var(--w3m-color-av-2) 0,transparent 50%),radial-gradient(at 29% 97%,var(--w3m-color-av-3) 0,transparent 50%),radial-gradient(at 99% 86%,var(--w3m-color-av-4) 0,transparent 50%),radial-gradient(at 29% 88%,var(--w3m-color-av-5) 0,transparent 50%);transform:translateZ(0)}.w3m-loader{width:50px;height:100%;background:linear-gradient(270deg,transparent 0,rgba(255,255,255,.4) 30%,transparent 100%);animation-name:slide;animation-duration:1.5s;transform:translateX(-50px);animation-iteration-count:infinite;animation-timing-function:linear;animation-delay:.55s}.w3m-small{width:24px;height:24px}.w3m-medium{width:60px;height:60px}`;
var Ha = Object.defineProperty;
var Sa = Object.getOwnPropertyDescriptor;
var Ot = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Sa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ha(e, a, o), o;
};
var J = class extends LitElement {
  constructor() {
    super(), this.address = void 0, this.avatar = void 0, this.loading = true, this.size = "small", this.unsubscribeAccount = void 0, this.address = K.state.address, this.avatar = K.state.profileAvatar, this.loading = !!K.state.profileLoading, this.unsubscribeAccount = K.subscribe(({ address: t, profileAvatar: e, profileLoading: a }) => {
      this.address = t, this.avatar = e, this.loading = !!a;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    const t = { "w3m-placeholder": true, "w3m-small": this.size === "small", "w3m-medium": this.size === "medium" };
    return this.avatar ? html`<img class="${classMap(t)}" src="${this.avatar}">` : this.address ? (s.generateAvatarColors(this.address), html`<div class="${classMap(t)}">${this.loading ? html`<div class="w3m-loader"></div>` : null}</div>`) : null;
  }
};
J.styles = [w.globalCss, Za], Ot([state()], J.prototype, "address", 2), Ot([state()], J.prototype, "avatar", 2), Ot([state()], J.prototype, "loading", 2), Ot([property()], J.prototype, "size", 2), J = Ot([customElement("w3m-avatar")], J);
var Ba = css`div{display:flex;align-items:center}w3m-token-image{width:28px;height:28px;margin-right:6px}`;
var Ua = Object.defineProperty;
var Va = Object.getOwnPropertyDescriptor;
var ne2 = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Va(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ua(e, a, o), o;
};
var It = class extends LitElement {
  constructor() {
    var t, e;
    super(), this.symbol = void 0, this.amount = void 0, this.unsubscribeAccount = void 0, this.symbol = (t = K.state.balance) == null ? void 0 : t.symbol, this.amount = (e = K.state.balance) == null ? void 0 : e.amount, this.unsubscribeAccount = K.subscribe(({ balance: a }) => {
      this.symbol = a == null ? void 0 : a.symbol, this.amount = a == null ? void 0 : a.amount;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    let t = "_._";
    return this.amount === "0.0" ? t = 0 : typeof this.amount == "string" && this.amount.length > 6 ? t = parseFloat(this.amount).toFixed(3) : typeof this.amount == "string" && (t = parseFloat(this.amount)), html`<div><w3m-token-image symbol="${this.symbol}"></w3m-token-image><w3m-text variant="medium-regular" color="primary">${t} ${this.symbol}</w3m-text></div>`;
  }
};
It.styles = [w.globalCss, Ba], ne2([state()], It.prototype, "symbol", 2), ne2([state()], It.prototype, "amount", 2), It = ne2([customElement("w3m-balance")], It);
var za = css`:host{all:initial}svg{width:28px;height:20px;margin:-1px 3px 0 -5px}svg path{fill:var(--w3m-accent-fill-color)}button:disabled svg path{fill:var(--w3m-color-fg-3)}w3m-spinner{margin:0 10px 0 0}`;
var Ga = Object.defineProperty;
var Fa = Object.getOwnPropertyDescriptor;
var Dt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Fa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ga(e, a, o), o;
};
var dt = class extends LitElement {
  constructor() {
    super(), this.loading = false, this.label = "Connect Wallet", this.icon = "show", this.modalUnsub = void 0, s.rejectStandaloneButtonComponent(), this.modalUnsub = se.subscribe((t) => {
      t.open && (this.loading = true), t.open || (this.loading = false);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.modalUnsub) == null || t.call(this);
  }
  iconTemplate() {
    return this.icon === "show" ? d3.WALLET_CONNECT_ICON : null;
  }
  onClick() {
    K.state.isConnected ? this.onDisconnect() : this.onConnect();
  }
  async onConnect() {
    this.loading = true, H.click({ name: "CONNECT_BUTTON" }), await se.open(), se.state.open || (this.loading = false);
  }
  async onDisconnect() {
    H.click({ name: "DISCONNECT_BUTTON" }), await C.client().disconnect();
  }
  render() {
    return html`<w3m-button-big .disabled="${this.loading}" @click="${this.onClick}">${this.loading ? html`<w3m-spinner></w3m-spinner><w3m-text variant="medium-regular" color="accent">Connecting...</w3m-text>` : html`${this.iconTemplate()}<w3m-text variant="medium-regular" color="inverse">${this.label}</w3m-text>`}</w3m-button-big>`;
  }
};
dt.styles = [w.globalCss, za], Dt([state()], dt.prototype, "loading", 2), Dt([property()], dt.prototype, "label", 2), Dt([property()], dt.prototype, "icon", 2), dt = Dt([customElement("w3m-connect-button")], dt);
var qa = css`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:2px;top:0;left:0}use{stroke:var(--w3m-accent-color);animation:loading 1s linear infinite}w3m-wallet-image{border-radius:var(--w3m-wallet-icon-large-border-radius);width:90px;height:90px}w3m-text{margin-bottom:40px}.w3m-error svg{stroke:var(--w3m-error-color)}.w3m-error use{display:none}.w3m-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}.w3m-stale svg,.w3m-stale use{display:none}`;
var Ka = Object.defineProperty;
var Ya = Object.getOwnPropertyDescriptor;
var mt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ya(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ka(e, a, o), o;
};
var q = class extends LitElement {
  constructor() {
    super(...arguments), this.walletId = void 0, this.imageId = void 0, this.isError = false, this.isStale = false, this.label = "";
  }
  svgLoaderTemplate() {
    var t, e;
    const a = (e = (t = ae.state.themeVariables) == null ? void 0 : t["--w3m-wallet-icon-large-border-radius"]) != null ? e : w.getPreset("--w3m-wallet-icon-large-border-radius");
    let r = 0;
    a.includes("%") ? r = 88 / 100 * parseInt(a, 10) : r = parseInt(a, 10), r *= 1.17;
    const o = 317 - r * 1.57, i = 425 - r * 1.8;
    return html`<svg viewBox="0 0 110 110" width="110" height="110"><rect id="w3m-loader" x="2" y="2" width="106" height="106" rx="${r}"/><use xlink:href="#w3m-loader" stroke-dasharray="106 ${o}" stroke-dashoffset="${i}"></use></svg>`;
  }
  render() {
    const t = { "w3m-error": this.isError, "w3m-stale": this.isStale };
    return html`<div class="${classMap(t)}">${this.svgLoaderTemplate()}<w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}"></w3m-wallet-image></div><w3m-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Connection declined" : this.label}</w3m-text>`;
  }
};
q.styles = [w.globalCss, qa], mt([property()], q.prototype, "walletId", 2), mt([property()], q.prototype, "imageId", 2), mt([property()], q.prototype, "isError", 2), mt([property()], q.prototype, "isStale", 2), mt([property()], q.prototype, "label", 2), q = mt([customElement("w3m-connector-waiting")], q);
var Qa = Object.defineProperty;
var Xa = Object.getOwnPropertyDescriptor;
var ht = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Xa(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Qa(e, a, o), o;
};
var tt = class extends LitElement {
  constructor() {
    super(), this.isConnected = false, this.label = "Connect Wallet", this.icon = "show", this.avatar = "show", this.balance = "hide", this.unsubscribeAccount = void 0, s.rejectStandaloneButtonComponent(), this.isConnected = K.state.isConnected, this.unsubscribeAccount = K.subscribe(({ isConnected: t }) => {
      this.isConnected = t;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    const { enableAccountView: t } = y.state, e = this.balance, a = this.label, r = this.icon, o = this.avatar;
    return this.isConnected && t ? html`<w3m-account-button balance="${e}" avatar="${o}"></w3m-account-button>` : html`<w3m-connect-button label="${this.isConnected ? "Disconnect" : a}" icon="${r}"></w3m-connect-button>`;
  }
};
ht([state()], tt.prototype, "isConnected", 2), ht([property()], tt.prototype, "label", 2), ht([property()], tt.prototype, "icon", 2), ht([property()], tt.prototype, "avatar", 2), ht([property()], tt.prototype, "balance", 2), tt = ht([customElement("w3m-core-button")], tt);
var Ja = css`.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.w3m-desktop-title,.w3m-mobile-title{display:flex;align-items:center}.w3m-mobile-title{justify-content:space-between;margin-bottom:20px;margin-top:-10px}.w3m-desktop-title{margin-bottom:10px;padding:0 10px}.w3m-subtitle{display:flex;align-items:center}.w3m-subtitle:last-child path{fill:var(--w3m-color-fg-3)}.w3m-desktop-title svg,.w3m-mobile-title svg{margin-right:6px}.w3m-desktop-title path,.w3m-mobile-title path{fill:var(--w3m-accent-color)}`;
var tr = Object.defineProperty;
var er = Object.getOwnPropertyDescriptor;
var or = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? er(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && tr(e, a, o), o;
};
var se2 = class extends LitElement {
  render() {
    const { isStandalone: t } = d.state, { explorerExcludedWalletIds: e, enableExplorer: a } = y.state, r = e !== "ALL" && a, o = P.manualWalletsTemplate(), i = P.recomendedWalletsTemplate(), l = P.externalWalletsTemplate(), p = P.recentWalletTemplate(), u = P.installedInjectedWalletsTemplate();
    let f = [p, ...o, ...i];
    t || (f = [...u, p, ...l, ...o, ...i]), f = f.filter(Boolean);
    const j = f.length > 4 || r;
    let $ = [];
    j ? $ = f.slice(0, 3) : $ = f;
    const _2 = !!$.length;
    return html`<w3m-modal-header .border="${true}" title="Connect your wallet" .onAction="${s.handleUriCopy}" .actionIcon="${d3.COPY_ICON}"></w3m-modal-header><w3m-modal-content><div class="w3m-mobile-title"><div class="w3m-subtitle">${d3.MOBILE_ICON}<w3m-text variant="small-regular" color="accent">Mobile</w3m-text></div><div class="w3m-subtitle">${d3.SCAN_ICON}<w3m-text variant="small-regular" color="secondary">Scan with your wallet</w3m-text></div></div><w3m-walletconnect-qr></w3m-walletconnect-qr></w3m-modal-content>${_2 ? html`<w3m-modal-footer><div class="w3m-desktop-title">${d3.DESKTOP_ICON}<w3m-text variant="small-regular" color="accent">Desktop</w3m-text></div><div class="w3m-grid">${$} ${j ? html`<w3m-view-all-wallets-button></w3m-view-all-wallets-button>` : null}</div></w3m-modal-footer>` : null}`;
  }
};
se2.styles = [w.globalCss, Ja], se2 = or([customElement("w3m-desktop-wallet-selection")], se2);
var ar = css`div{background-color:var(--w3m-color-bg-2);padding:10px 20px 15px 20px;border-top:1px solid var(--w3m-color-bg-3);text-align:center}a{color:var(--w3m-accent-color);text-decoration:none;transition:opacity .2s ease-in-out;display:inline}a:active{opacity:.8}@media(hover:hover){a:hover{opacity:.8}}`;
var rr = Object.defineProperty;
var ir = Object.getOwnPropertyDescriptor;
var lr = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ir(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && rr(e, a, o), o;
};
var ce = class extends LitElement {
  render() {
    const { termsOfServiceUrl: t, privacyPolicyUrl: e } = y.state;
    return t ?? e ? html`<div><w3m-text variant="small-regular" color="secondary">By connecting your wallet to this app, you agree to the app's ${t ? html`<a href="${t}" target="_blank" rel="noopener noreferrer">Terms of Service</a>` : null} ${t && e ? "and" : null} ${e ? html`<a href="${e}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>` : null}</w3m-text></div>` : null;
  }
};
ce.styles = [w.globalCss, ar], ce = lr([customElement("w3m-legal-notice")], ce);
var nr = css`div{display:grid;grid-template-columns:repeat(4,80px);margin:0 -10px;justify-content:space-between;row-gap:10px}`;
var sr = Object.defineProperty;
var cr = Object.getOwnPropertyDescriptor;
var dr = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? cr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && sr(e, a, o), o;
};
var de = class extends LitElement {
  onQrcode() {
    b.push("Qrcode");
  }
  render() {
    const { isStandalone: t } = d.state, { explorerExcludedWalletIds: e, enableExplorer: a } = y.state, r = e !== "ALL" && a, o = P.manualWalletsTemplate(), i = P.recomendedWalletsTemplate(), l = P.externalWalletsTemplate(), p = P.recentWalletTemplate(), u = P.installedInjectedWalletsTemplate();
    let f = [p, ...o, ...i];
    t || (f = [...u, p, ...l, ...o, ...i]), f = f.filter(Boolean);
    const j = f.length > 8 || r;
    let $ = [];
    j ? $ = f.slice(0, 7) : $ = f;
    const _2 = !!$.length;
    return html`<w3m-modal-header title="Connect your wallet" .onAction="${this.onQrcode}" .actionIcon="${d3.QRCODE_ICON}"></w3m-modal-header>${_2 ? html`<w3m-modal-content><div>${$} ${j ? html`<w3m-view-all-wallets-button></w3m-view-all-wallets-button>` : null}</div></w3m-modal-content>` : null}`;
  }
};
de.styles = [w.globalCss, nr], de = dr([customElement("w3m-mobile-wallet-selection")], de);
var mr = css`:host{all:initial}.w3m-overlay{top:0;bottom:0;left:0;right:0;position:fixed;z-index:var(--w3m-z-index);overflow:hidden;display:flex;justify-content:center;align-items:center;background-color:rgba(0,0,0,.3);opacity:0;pointer-events:none}@media(max-height:720px) and (orientation:landscape){.w3m-overlay{overflow:scroll;align-items:flex-start;padding:20px 0}}.w3m-active{pointer-events:auto}.w3m-container{position:relative;max-width:360px;width:100%;outline:0;border-radius:var(--w3m-background-border-radius) var(--w3m-background-border-radius) var(--w3m-container-border-radius) var(--w3m-container-border-radius);border:1px solid var(--w3m-color-overlay);overflow:hidden}.w3m-card{width:100%;position:relative;border-radius:var(--w3m-container-border-radius);overflow:hidden;box-shadow:0 6px 14px -6px rgba(10,16,31,.12),0 10px 32px -4px rgba(10,16,31,.1),0 0 0 1px var(--w3m-color-overlay);background-color:var(--w3m-color-bg-1);color:var(--w3m-color-fg-1)}@media(max-width:600px){.w3m-container{max-width:440px;border-radius:var(--w3m-background-border-radius) var(--w3m-background-border-radius) 0 0}.w3m-card{border-radius:var(--w3m-container-border-radius) var(--w3m-container-border-radius) 0 0}.w3m-overlay{align-items:flex-end}}@media(max-width:440px){.w3m-container{border:0}}`;
var hr = Object.defineProperty;
var pr = Object.getOwnPropertyDescriptor;
var me = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? pr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && hr(e, a, o), o;
};
var Et = class extends LitElement {
  constructor() {
    super(), this.open = false, this.active = false, this.unsubscribeModal = void 0, this.abortController = void 0, this.unsubscribeModal = se.subscribe((t) => {
      t.open ? this.onOpenModalEvent() : this.onCloseModalEvent();
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeModal) == null || t.call(this);
  }
  get overlayEl() {
    return s.getShadowRootElement(this, ".w3m-overlay");
  }
  get containerEl() {
    return s.getShadowRootElement(this, ".w3m-container");
  }
  toggleBodyScroll(t) {
    if (document.querySelector("body"))
      if (t) {
        const e = document.getElementById("w3m-styles");
        e == null ? void 0 : e.remove();
      } else
        document.head.insertAdjacentHTML("beforeend", '<style id="w3m-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>');
  }
  onCloseModal(t) {
    t.target === t.currentTarget && se.close();
  }
  onOpenModalEvent() {
    this.toggleBodyScroll(false), this.addKeyboardEvents(), this.open = true, setTimeout(async () => {
      const t = s.isMobileAnimation() ? { y: ["50vh", "0vh"] } : { scale: [0.98, 1] }, e = 0.1, a = 0.2;
      await Promise.all([animate2(this.overlayEl, { opacity: [0, 1] }, { delay: e, duration: a }).finished, animate2(this.containerEl, t, { delay: e, duration: a }).finished]), this.active = true;
    }, 0);
  }
  async onCloseModalEvent() {
    this.toggleBodyScroll(true), this.removeKeyboardEvents();
    const t = s.isMobileAnimation() ? { y: ["0vh", "50vh"] } : { scale: [1, 0.98] }, e = 0.2;
    await Promise.all([animate2(this.overlayEl, { opacity: [1, 0] }, { duration: e }).finished, animate2(this.containerEl, t, { duration: e }).finished]), this.containerEl.removeAttribute("style"), this.active = false, this.open = false;
  }
  addKeyboardEvents() {
    this.abortController = new AbortController(), window.addEventListener("keydown", (t) => {
      var e;
      t.key === "Escape" ? se.close() : t.key === "Tab" && ((e = t.target) != null && e.tagName.includes("W3M-") || this.containerEl.focus());
    }, this.abortController), this.containerEl.focus();
  }
  removeKeyboardEvents() {
    var t;
    (t = this.abortController) == null || t.abort(), this.abortController = void 0;
  }
  managedModalContextTemplate() {
    const { isStandalone: t } = d.state;
    return t ? null : html`<w3m-wc-connection-context></w3m-wc-connection-context><w3m-account-context></w3m-account-context><w3m-network-context></w3m-network-context>`;
  }
  render() {
    const t = { "w3m-overlay": true, "w3m-active": this.active };
    return html`<w3m-explorer-context></w3m-explorer-context><w3m-theme-context></w3m-theme-context>${this.managedModalContextTemplate()}<div id="w3m-modal" class="${classMap(t)}" @click="${this.onCloseModal}" role="alertdialog" aria-modal="true"><div class="w3m-container" tabindex="0">${this.open ? html`<w3m-modal-backcard></w3m-modal-backcard><div class="w3m-card"><w3m-modal-router></w3m-modal-router><w3m-modal-toast></w3m-modal-toast></div>` : null}</div></div>`;
  }
};
Et.styles = [w.globalCss, mr], me([state()], Et.prototype, "open", 2), me([state()], Et.prototype, "active", 2), Et = me([customElement("w3m-modal")], Et);
var wr = css`:host{all:initial}w3m-network-image{margin-left:-6px;margin-right:6px;width:28px;height:28px}`;
var gr = Object.defineProperty;
var ur = Object.getOwnPropertyDescriptor;
var Zt = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ur(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && gr(e, a, o), o;
};
var pt = class extends LitElement {
  constructor() {
    super(), this.chainId = "", this.label = "", this.wrongNetwork = false, this.unsubscribeNetwork = void 0, s.rejectStandaloneButtonComponent();
    const { selectedChain: t } = d.state;
    this.onSetChainData(t), this.unsubscribeNetwork = d.subscribe(({ selectedChain: e }) => {
      this.onSetChainData(e);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeNetwork) == null || t.call(this);
  }
  onSetChainData(t) {
    if (t) {
      const { chains: e } = d.state, a = e == null ? void 0 : e.map((r) => r.id);
      this.chainId = t.id.toString(), this.wrongNetwork = !(a != null && a.includes(t.id)), this.label = this.wrongNetwork ? "Wrong Network" : t.name;
    }
  }
  onClick() {
    H.click({ name: "NETWORK_BUTTON" }), se.open({ route: "SelectNetwork" });
  }
  render() {
    var t;
    const { chains: e } = d.state, a = e && e.length > 1;
    return html`<w3m-button-big @click="${this.onClick}" ?disabled="${!a}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="medium-regular" color="inverse">${(t = this.label) != null && t.length ? this.label : "Select Network"}</w3m-text></w3m-button-big>`;
  }
};
pt.styles = [w.globalCss, wr], Zt([state()], pt.prototype, "chainId", 2), Zt([state()], pt.prototype, "label", 2), Zt([state()], pt.prototype, "wrongNetwork", 2), pt = Zt([customElement("w3m-network-switch")], pt);
var vr = css`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:1px;top:0;left:0}use{stroke:var(--w3m-accent-color);animation:loading 1s linear infinite}w3m-network-image{width:92px;height:92px}w3m-text{margin-bottom:40px}.w3m-error svg{stroke:var(--w3m-error-color)}.w3m-error use{display:none}.w3m-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}`;
var br = Object.defineProperty;
var fr = Object.getOwnPropertyDescriptor;
var Ht = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? fr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && br(e, a, o), o;
};
var wt = class extends LitElement {
  constructor() {
    super(...arguments), this.chainId = void 0, this.isError = false, this.label = "";
  }
  svgLoaderTemplate() {
    return html`<svg width="54" height="59" viewBox="0 0 54 59" fill="none" class="w3m-loader"><path id="w3m-loader-path" d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"/><use xlink:href="#w3m-loader-path" stroke-dasharray="54 118" stroke-dashoffset="172"></use></svg>`;
  }
  render() {
    const t = { "w3m-error": this.isError };
    return html`<div class="${classMap(t)}">${this.svgLoaderTemplate()}<w3m-network-image chainId="${this.chainId}"></w3m-network-image></div><w3m-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Switch declined" : this.label}</w3m-text>`;
  }
};
wt.styles = [w.globalCss, vr], Ht([property()], wt.prototype, "chainId", 2), Ht([property()], wt.prototype, "isError", 2), Ht([property()], wt.prototype, "label", 2), wt = Ht([customElement("w3m-network-waiting")], wt);
var xr = css`div{display:flex;margin-top:15px}slot{display:inline-block;margin:0 5px}w3m-button{margin:0 5px}`;
var yr = Object.defineProperty;
var Cr = Object.getOwnPropertyDescriptor;
var et = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Cr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && yr(e, a, o), o;
};
var V = class extends LitElement {
  constructor() {
    super(...arguments), this.isMobile = false, this.isInjected = false, this.isInjectedInstalled = false, this.isDesktop = false, this.isWeb = false, this.isRetry = false;
  }
  onMobile() {
    c.isMobile() ? b.replace("MobileConnecting") : b.replace("MobileQrcodeConnecting");
  }
  onInjected() {
    this.isInjectedInstalled ? b.replace("InjectedConnecting") : b.replace("InstallWallet");
  }
  onDesktop() {
    b.replace("DesktopConnecting");
  }
  onWeb() {
    b.replace("WebConnecting");
  }
  render() {
    const { isStandalone: t } = d.state;
    return html`<div>${this.isRetry ? html`<slot></slot>` : null} ${this.isMobile ? html`<w3m-button .onClick="${this.onMobile}" .iconLeft="${d3.MOBILE_ICON}" variant="outline">Mobile</w3m-button>` : null} ${this.isInjected && !t ? html`<w3m-button .onClick="${this.onInjected}" .iconLeft="${d3.WALLET_ICON}" variant="outline">Browser</w3m-button>` : null} ${this.isDesktop ? html`<w3m-button .onClick="${this.onDesktop}" .iconLeft="${d3.DESKTOP_ICON}" variant="outline">Desktop</w3m-button>` : null} ${this.isWeb ? html`<w3m-button .onClick="${this.onWeb}" .iconLeft="${d3.GLOBE_ICON}" variant="outline">Web</w3m-button>` : null}</div>`;
  }
};
V.styles = [w.globalCss, xr], et([property()], V.prototype, "isMobile", 2), et([property()], V.prototype, "isInjected", 2), et([property()], V.prototype, "isInjectedInstalled", 2), et([property()], V.prototype, "isDesktop", 2), et([property()], V.prototype, "isWeb", 2), et([property()], V.prototype, "isRetry", 2), V = et([customElement("w3m-platform-selection")], V);
var $r = css`button{display:flex;flex-direction:column;padding:5px 10px;border-radius:var(--w3m-button-hover-highlight-border-radius);height:100%;justify-content:flex-start}.w3m-icons{width:60px;height:60px;display:flex;flex-wrap:wrap;padding:7px;border-radius:var(--w3m-wallet-icon-border-radius);justify-content:space-between;align-items:center;margin-bottom:5px;background-color:var(--w3m-color-bg-2);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay)}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}.w3m-icons img{width:21px;height:21px;object-fit:cover;object-position:center;border-radius:calc(var(--w3m-wallet-icon-border-radius)/ 2);border:1px solid var(--w3m-color-overlay)}.w3m-icons svg{width:21px;height:21px}.w3m-icons img:nth-child(1),.w3m-icons img:nth-child(2),.w3m-icons svg:nth-child(1),.w3m-icons svg:nth-child(2){margin-bottom:4px}w3m-text{width:100%;text-align:center}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var kr = Object.defineProperty;
var Or = Object.getOwnPropertyDescriptor;
var Ir = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Or(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && kr(e, a, o), o;
};
var he = class extends LitElement {
  onClick() {
    b.push("WalletExplorer");
  }
  render() {
    const { recomendedWallets: t } = ne.state, e = Z.manualWallets(), a = [...t, ...e].reverse().slice(0, 4);
    return html`<button @click="${this.onClick}"><div class="w3m-icons">${a.map((r) => {
      const o = s.getWalletIcon(r);
      if (o)
        return html`<img src="${o}">`;
      const i = s.getWalletIcon({ id: r.id });
      return i ? html`<img src="${i}">` : d3.WALLET_PLACEHOLDER;
    })} ${[...Array(4 - a.length)].map(() => d3.WALLET_PLACEHOLDER)}</div><w3m-text variant="xsmall-regular">View All</w3m-text></button>`;
  }
};
he.styles = [w.globalCss, $r], he = Ir([customElement("w3m-view-all-wallets-button")], he);
var Er = css`.w3m-qr-container{width:100%;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1}`;
var Wr = Object.defineProperty;
var Ar = Object.getOwnPropertyDescriptor;
var St = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ar(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Wr(e, a, o), o;
};
var gt = class extends LitElement {
  constructor() {
    super(), this.walletId = "", this.imageId = "", this.uri = "", this.unwatchWcConnection = void 0, setTimeout(() => {
      const { pairingUri: t } = _.state, { standaloneUri: e } = d.state;
      this.uri = e ?? t;
    }, 0), this.unwatchWcConnection = _.subscribe((t) => {
      t.pairingUri && (this.uri = t.pairingUri);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchWcConnection) == null || t.call(this);
  }
  get overlayEl() {
    return s.getShadowRootElement(this, ".w3m-qr-container");
  }
  render() {
    return html`<div class="w3m-qr-container">${this.uri ? html`<w3m-qrcode size="${this.overlayEl.offsetWidth}" uri="${this.uri}" walletId="${this.walletId}" imageId="${this.imageId}"></w3m-qrcode>` : html`<w3m-spinner></w3m-spinner>`}</div>`;
  }
};
gt.styles = [w.globalCss, Er], St([property()], gt.prototype, "walletId", 2), St([property()], gt.prototype, "imageId", 2), St([state()], gt.prototype, "uri", 2), gt = St([customElement("w3m-walletconnect-qr")], gt);
var jr = css`.w3m-profile{display:flex;justify-content:space-between;align-items:flex-start;padding-top:20px}.w3m-connection-badge{background-color:var(--w3m-color-bg-2);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);padding:6px 10px 6px 26px;position:relative;border-radius:28px}.w3m-connection-badge::before{content:'';position:absolute;width:10px;height:10px;left:10px;background-color:var(--w3m-success-color);border-radius:50%;top:50%;margin-top:-5px;box-shadow:0 1px 4px 1px var(--w3m-success-color),inset 0 0 0 1px var(--w3m-color-overlay)}.w3m-footer{display:flex;justify-content:space-between}w3m-address-text{margin-top:10px;display:block}.w3m-balance{border-top:1px solid var(--w3m-color-bg-2);padding:11px 20px}`;
var Mr = Object.defineProperty;
var Pr = Object.getOwnPropertyDescriptor;
var Tr = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Pr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Mr(e, a, o), o;
};
var pe = class extends LitElement {
  async onDisconnect() {
    await C.client().disconnect();
  }
  async onCopyAddress() {
    var t;
    await navigator.clipboard.writeText((t = K.state.address) != null ? t : ""), oe.openToast("Address copied", "success");
  }
  render() {
    return html`<w3m-modal-content><div class="w3m-profile"><div class="w3m-info"><w3m-avatar size="medium"></w3m-avatar><w3m-address-text variant="modal"></w3m-address-text></div><div class="w3m-connection-badge"><w3m-text variant="small-regular" color="secondary">Connected</w3m-text></div></div></w3m-modal-content><div class="w3m-balance"><w3m-balance></w3m-balance></div><w3m-modal-footer><div class="w3m-footer"><w3m-account-network-button></w3m-account-network-button><w3m-box-button label="Copy Address" .onClick="${this.onCopyAddress}" .icon="${d3.ACCOUNT_COPY}"></w3m-box-button><w3m-box-button label="Disconnect" .onClick="${this.onDisconnect}" .icon="${d3.ACCOUNT_DISCONNECT}"></w3m-box-button></div></w3m-modal-footer>`;
  }
};
pe.styles = [w.globalCss, jr], pe = Tr([customElement("w3m-account-view")], pe);
var Lr = Object.defineProperty;
var _r = Object.getOwnPropertyDescriptor;
var Nr = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? _r(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Lr(e, a, o), o;
};
var we = class extends LitElement {
  viewTemplate() {
    return c.isAndroid() ? html`<w3m-android-wallet-selection></w3m-android-wallet-selection>` : c.isMobile() ? html`<w3m-mobile-wallet-selection></w3m-mobile-wallet-selection>` : html`<w3m-desktop-wallet-selection></w3m-desktop-wallet-selection>`;
  }
  render() {
    return html`${this.viewTemplate()}<w3m-legal-notice></w3m-legal-notice>`;
  }
};
we.styles = [w.globalCss], we = Nr([customElement("w3m-connect-wallet-view")], we);
var Rr = css`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Dr = Object.defineProperty;
var Zr = Object.getOwnPropertyDescriptor;
var Ze = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Zr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Dr(e, a, o), o;
};
var Bt = class extends LitElement {
  constructor() {
    super(), this.isError = false, this.unwatchConnection = void 0, this.openDesktopApp(), this.unwatchConnection = _.subscribe((t) => {
      this.isError = t.pairingError;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchConnection) == null || t.call(this);
  }
  onFormatAndRedirect(t) {
    const { desktop: e, name: a } = c.getWalletRouterData(), r = e == null ? void 0 : e.native;
    if (r) {
      const o = c.formatNativeUrl(r, t, a);
      c.openHref(o, "_self");
    }
  }
  openDesktopApp() {
    _.setPairingError(false);
    const { standaloneUri: t } = d.state, { pairingUri: e } = _.state, a = c.getWalletRouterData();
    s.setRecentWallet(a), t ? this.onFormatAndRedirect(t) : this.onFormatAndRedirect(e);
  }
  render() {
    const { name: t, id: e, image_id: a } = c.getWalletRouterData(), { isMobile: r, isInjected: o, isWeb: i } = s.getCachedRouterWalletPlatforms();
    return html`<w3m-modal-header title="${t}" .onAction="${s.handleUriCopy}" .actionIcon="${d3.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Connection can continue loading if ${t} is not installed on your device`}</w3m-text><w3m-platform-selection .isMobile="${r}" .isInjected="${o}" .isWeb="${i}" .isRetry="${true}"><w3m-button .onClick="${this.openDesktopApp.bind(this)}" .iconRight="${d3.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Bt.styles = [w.globalCss, Rr], Ze([state()], Bt.prototype, "isError", 2), Bt = Ze([customElement("w3m-desktop-connecting-view")], Bt);
var Hr = css`.w3m-info-text{margin:5px 0 15px;max-width:320px;text-align:center}.w3m-wallet-item{margin:0 -20px 0 0;padding-right:20px;display:flex;align-items:center;border-bottom:1px solid var(--w3m-color-bg-2)}.w3m-wallet-item:last-child{margin-bottom:-20px;border-bottom:0}.w3m-wallet-content{margin-left:20px;height:60px;display:flex;flex:1;align-items:center;justify-content:space-between}.w3m-footer-actions{display:flex;flex-direction:column;align-items:center;padding:20px 0;border-top:1px solid var(--w3m-color-bg-2)}w3m-wallet-image{display:block;width:40px;height:40px;border-radius:10px}`;
var Sr = Object.defineProperty;
var Br = Object.getOwnPropertyDescriptor;
var Ur = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Br(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Sr(e, a, o), o;
};
var ge = class extends LitElement {
  onGet(t) {
    c.openHref(t, "_blank");
  }
  render() {
    const t = ne.state.recomendedWallets.slice(0, 5), e = Z.manualWallets().slice(0, 5), a = t.length, r = e.length;
    return html`<w3m-modal-header title="Get a wallet"></w3m-modal-header><w3m-modal-content>${a ? t.map((o) => html`<div class="w3m-wallet-item"><w3m-wallet-image walletId="${o.id}" imageId="${o.image_id}"></w3m-wallet-image><div class="w3m-wallet-content"><w3m-text variant="medium-regular">${o.name}</w3m-text><w3m-button .iconRight="${d3.ARROW_RIGHT_ICON}" .onClick="${() => this.onGet(o.homepage)}">Get</w3m-button></div></div>`) : null} ${r ? e.map((o) => html`<div class="w3m-wallet-item"><w3m-wallet-image walletId="${o.id}"></w3m-wallet-image><div class="w3m-wallet-content"><w3m-text variant="medium-regular">${o.name}</w3m-text><w3m-button .iconRight="${d3.ARROW_RIGHT_ICON}" .onClick="${() => this.onGet(o.links.universal)}">Get</w3m-button></div></div>`) : null}</w3m-modal-content><div class="w3m-footer-actions"><w3m-text variant="medium-regular">Not what you're looking for?</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">With hundreds of wallets out there, there's something for everyone</w3m-text><w3m-button .onClick="${s.openWalletExplorerUrl}" .iconRight="${d3.ARROW_UP_RIGHT_ICON}">Explore Wallets</w3m-button></div>`;
  }
};
ge.styles = [w.globalCss, Hr], ge = Ur([customElement("w3m-get-wallet-view")], ge);
var Vr = css`.w3m-footer-actions{display:flex;justify-content:center}.w3m-footer-actions w3m-button{margin:0 5px}.w3m-info-container{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:20px}.w3m-info-container:last-child{margin-bottom:0}.w3m-info-text{margin-top:5px;text-align:center}.w3m-images svg{margin:0 2px 5px;width:55px;height:55px}.help-img-highlight{stroke:var(--w3m-color-overlay)}`;
var zr = Object.defineProperty;
var Gr = Object.getOwnPropertyDescriptor;
var Fr = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Gr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && zr(e, a, o), o;
};
var ue = class extends LitElement {
  constructor() {
    super(...arguments), this.learnUrl = "https://ethereum.org/en/wallets/";
  }
  onGet() {
    y.state.enableExplorer ? b.push("GetWallet") : s.openWalletExplorerUrl();
  }
  onLearnMore() {
    c.openHref(this.learnUrl, "_blank");
  }
  render() {
    return html`<w3m-modal-header title="What is a wallet?"></w3m-modal-header><w3m-modal-content><div class="w3m-info-container"><div class="w3m-images">${d3.HELP_CHART_IMG} ${d3.HELP_PAINTING_IMG} ${d3.HELP_ETH_IMG}</div><w3m-text variant="medium-regular">A home for your digital assets</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs.</w3m-text></div><div class="w3m-info-container"><div class="w3m-images">${d3.HELP_KEY_IMG} ${d3.HELP_USER_IMG} ${d3.HELP_LOCK_IMG}</div><w3m-text variant="medium-regular">One login for all of web3</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">Log in to any app by connecting your wallet. Say goodbye to countless passwords!</w3m-text></div><div class="w3m-info-container"><div class="w3m-images">${d3.HELP_COMPAS_IMG} ${d3.HELP_NOUN_IMG} ${d3.HELP_DAO_IMG}</div><w3m-text variant="medium-regular">Your gateway to a new web</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more.</w3m-text></div><div class="w3m-footer-actions"><w3m-button .onClick="${this.onGet.bind(this)}" .iconLeft="${d3.WALLET_ICON}">Get a Wallet</w3m-button><w3m-button .onClick="${this.onLearnMore.bind(this)}" .iconRight="${d3.ARROW_UP_RIGHT_ICON}">Learn More</w3m-button></div></w3m-modal-content>`;
  }
};
ue.styles = [w.globalCss, Vr], ue = Fr([customElement("w3m-help-view")], ue);
var qr = css`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Kr = Object.defineProperty;
var Yr = Object.getOwnPropertyDescriptor;
var He = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Yr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Kr(e, a, o), o;
};
var Ut = class extends LitElement {
  constructor() {
    super(), this.isError = false, this.connector = C.client().getConnectorById("injected"), this.openInjectedApp();
  }
  async openInjectedApp() {
    const { ready: t } = this.connector;
    t && (this.isError = false, await s.handleConnectorConnection("injected", () => {
      this.isError = true;
    }));
  }
  render() {
    const { name: t, id: e, image_id: a } = c.getWalletRouterData(), { isMobile: r, isDesktop: o, isWeb: i } = s.getCachedRouterWalletPlatforms();
    return html`<w3m-modal-header title="${t}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">Connection can be declined if multiple wallets are installed or previous request is still active</w3m-text><w3m-platform-selection .isMobile="${r}" .isDesktop="${o}" .isWeb="${i}" .isRetry="${true}"><w3m-button .onClick="${this.openInjectedApp.bind(this)}" .disabled="${!this.isError}" .iconRight="${d3.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Ut.styles = [w.globalCss, qr], He([state()], Ut.prototype, "isError", 2), Ut = He([customElement("w3m-injected-connecting-view")], Ut);
var Qr = css`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}w3m-button{margin-top:15px}`;
var Xr = Object.defineProperty;
var Jr = Object.getOwnPropertyDescriptor;
var ti = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Jr(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Xr(e, a, o), o;
};
var ve = class extends LitElement {
  onInstall(t) {
    t && c.openHref(t, "_blank");
  }
  render() {
    const { name: t, id: e, image_id: a, homepage: r } = c.getWalletRouterData();
    return html`<w3m-modal-header title="${t}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="Not Detected" .isStale="${true}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Download ${t} to continue. If multiple browser extensions are installed, disable non ${t} ones and try again`}</w3m-text><w3m-button .onClick="${() => this.onInstall(r)}" .iconLeft="${d3.ARROW_DOWN_ICON}">Download</w3m-button></w3m-info-footer>`;
  }
};
ve.styles = [w.globalCss, Qr], ve = ti([customElement("w3m-install-wallet-view")], ve);
var ei = css`w3m-wallet-image{border-radius:var(--w3m-wallet-icon-large-border-radius);width:96px;height:96px;margin-bottom:20px}w3m-info-footer{display:flex;width:100%}.w3m-app-store{justify-content:space-between}.w3m-app-store w3m-wallet-image{margin-right:10px;margin-bottom:0;width:28px;height:28px;border-radius:var(--w3m-wallet-icon-small-border-radius)}.w3m-app-store div{display:flex;align-items:center}.w3m-app-store w3m-button{margin-right:-10px}.w3m-note{flex-direction:column;align-items:center;padding:5px 0}.w3m-note w3m-text{text-align:center}w3m-platform-selection div{display:flex}w3m-platform-selection w3m-button:nth-child(2){margin-left:10px}`;
var oi = Object.defineProperty;
var ai = Object.getOwnPropertyDescriptor;
var Se = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ai(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && oi(e, a, o), o;
};
var Vt = class extends LitElement {
  constructor() {
    super(), this.isError = false, this.unwatchConnection = void 0, this.openMobileApp(), this.unwatchConnection = _.subscribe((t) => {
      this.isError = t.pairingError;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchConnection) == null || t.call(this);
  }
  onFormatAndRedirect(t, e = false) {
    const { mobile: a, name: r } = c.getWalletRouterData(), o = a == null ? void 0 : a.native, i = a == null ? void 0 : a.universal;
    if (o && !e) {
      const l = c.formatNativeUrl(o, t, r);
      c.openHref(l, "_self");
    } else if (i) {
      const l = c.formatUniversalUrl(i, t, r);
      c.openHref(l, "_self");
    }
  }
  openMobileApp(t = false) {
    _.setPairingError(false);
    const { standaloneUri: e } = d.state, { pairingUri: a } = _.state, r = c.getWalletRouterData();
    s.setRecentWallet(r), e ? this.onFormatAndRedirect(e, t) : this.onFormatAndRedirect(a, t);
  }
  onGoToAppStore(t) {
    t && c.openHref(t, "_blank");
  }
  render() {
    const { name: t, id: e, image_id: a, app: r, mobile: o } = c.getWalletRouterData(), { isWeb: i } = s.getCachedRouterWalletPlatforms(), l = r == null ? void 0 : r.ios, p = o == null ? void 0 : o.universal;
    return html`<w3m-modal-header title="${t}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="Tap 'Open' to continue…" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer class="w3m-note"><w3m-text color="secondary" variant="small-thin">You can reload the website to try again ${p ? ` or open ${t} using a "Backup" instead` : ""}</w3m-text><w3m-platform-selection .isWeb="${i}" .isRetry="${true}"><div><w3m-button .onClick="${() => this.openMobileApp(false)}" .iconRight="${d3.RETRY_ICON}">Retry</w3m-button>${p ? html`<w3m-button variant="outline" .onClick="${() => this.openMobileApp(true)}" .iconRight="${d3.ARROW_UP_RIGHT_ICON}">Backup</w3m-button>` : null}</div></w3m-platform-selection></w3m-info-footer><w3m-info-footer class="w3m-app-store"><div><w3m-wallet-image walletId="${e}" imageId="${a}"></w3m-wallet-image><w3m-text>${`Get ${t}`}</w3m-text></div><w3m-button .iconRight="${d3.ARROW_RIGHT_ICON}" .onClick="${() => this.onGoToAppStore(l)}" variant="ghost">App Store</w3m-button></w3m-info-footer>`;
  }
};
Vt.styles = [w.globalCss, ei], Se([state()], Vt.prototype, "isError", 2), Vt = Se([customElement("w3m-mobile-connecting-view")], Vt);
var ri = css`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var ii = Object.defineProperty;
var li = Object.getOwnPropertyDescriptor;
var ni = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? li(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && ii(e, a, o), o;
};
var be = class extends LitElement {
  render() {
    const { name: t, id: e, image_id: a } = c.getWalletRouterData(), { isInjected: r, isDesktop: o, isWeb: i } = s.getCachedRouterWalletPlatforms();
    return html`<w3m-modal-header title="${t}" .onAction="${s.handleUriCopy}" .actionIcon="${d3.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-walletconnect-qr walletId="${e}" imageId="${a}"></w3m-walletconnect-qr></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Scan this qrcode with your phone's camera or inside ${t} app`}</w3m-text><w3m-platform-selection .isDesktop="${o}" .isInjected="${r}" .isWeb="${i}"></w3m-platform-selection></w3m-info-footer>`;
  }
};
be.styles = [w.globalCss, ri], be = ni([customElement("w3m-mobile-qr-connecting-view")], be);
var si = Object.defineProperty;
var ci = Object.getOwnPropertyDescriptor;
var di = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ci(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && si(e, a, o), o;
};
var fe = class extends LitElement {
  render() {
    return html`<w3m-modal-header title="Scan the code" .onAction="${s.handleUriCopy}" .actionIcon="${d3.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-walletconnect-qr></w3m-walletconnect-qr></w3m-modal-content>`;
  }
};
fe.styles = [w.globalCss], fe = di([customElement("w3m-qrcode-view")], fe);
var mi = css`div{display:grid;grid-template-columns:repeat(4,80px);margin:-5px -10px;justify-content:space-between}w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-info-footer w3m-text{text-align:center}`;
var Ge = Object.defineProperty;
var hi = Object.defineProperties;
var pi = Object.getOwnPropertyDescriptor;
var wi = Object.getOwnPropertyDescriptors;
var Be = Object.getOwnPropertySymbols;
var gi = Object.prototype.hasOwnProperty;
var ui = Object.prototype.propertyIsEnumerable;
var Ue = (t, e, a) => e in t ? Ge(t, e, { enumerable: true, configurable: true, writable: true, value: a }) : t[e] = a;
var vi = (t, e) => {
  for (var a in e || (e = {}))
    gi.call(e, a) && Ue(t, a, e[a]);
  if (Be)
    for (var a of Be(e))
      ui.call(e, a) && Ue(t, a, e[a]);
  return t;
};
var bi = (t, e) => hi(t, wi(e));
var xe = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? pi(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ge(e, a, o), o;
};
var Wt = class extends LitElement {
  constructor() {
    super(), this.connectedChains = "ALL", this.isUnsupportedChains = false, this.getConnectedChainIds();
  }
  async getConnectedChainIds() {
    this.connectedChains = await C.client().getConnectedChainIds();
  }
  async onSelectChain(t) {
    try {
      const { selectedChain: e, walletConnectVersion: a, isPreferInjected: r } = d.state, { isConnected: o } = K.state;
      o ? (e == null ? void 0 : e.id) === t.id ? b.reset("Account") : a === 2 ? (await C.client().switchNetwork({ chainId: t.id }), b.reset("Account")) : b.push("SwitchNetwork", { SwitchNetwork: t }) : r ? (d.setSelectedChain(t), se.close()) : (d.setSelectedChain(t), b.push("ConnectWallet"));
    } catch (e) {
      console.error(e), oe.openToast(s.getErrorMessage(e), "error");
    }
  }
  isUnsuportedChainId(t) {
    return typeof this.connectedChains == "string" && this.connectedChains !== "ALL" ? (this.isUnsupportedChains = true, true) : Array.isArray(this.connectedChains) && !this.connectedChains.includes(String(t)) ? (this.isUnsupportedChains = true, true) : false;
  }
  render() {
    const { chains: t } = d.state, e = t == null ? void 0 : t.map((r) => bi(vi({}, r), { unsupported: this.isUnsuportedChainId(r.id) })), a = e == null ? void 0 : e.sort((r, o) => Number(r.unsupported) - Number(o.unsupported));
    return html`<w3m-modal-header title="Select network"></w3m-modal-header><w3m-modal-content><div>${a == null ? void 0 : a.map((r) => html`<w3m-network-button name="${r.name}" chainId="${r.id}" .unsupported="${r.unsupported}" .onClick="${async () => this.onSelectChain(r)}">${r.name}</w3m-network-button>`)}</div></w3m-modal-content>${this.isUnsupportedChains ? html`<w3m-info-footer><w3m-text color="secondary" variant="small-thin">Your connected wallet may not support some of the networks available for this dapp</w3m-text></w3m-info-footer>` : null}`;
  }
};
Wt.styles = [w.globalCss, mi], xe([state()], Wt.prototype, "connectedChains", 2), xe([state()], Wt.prototype, "isUnsupportedChains", 2), Wt = xe([customElement("w3m-select-network-view")], Wt);
var fi = css`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}w3m-button{margin-top:15px}`;
var xi = Object.defineProperty;
var yi = Object.getOwnPropertyDescriptor;
var Ve = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? yi(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && xi(e, a, o), o;
};
var zt = class extends LitElement {
  constructor() {
    super(), this.isError = false, this.onSwitchNetwork();
  }
  async onSwitchNetwork() {
    try {
      this.isError = false;
      const t = c.getSwitchNetworkRouterData();
      await C.client().switchNetwork({ chainId: t.id }), d.setSelectedChain(t), b.reset("Account");
    } catch {
      this.isError = true;
    }
  }
  render() {
    const { id: t, name: e } = c.getSwitchNetworkRouterData();
    return html`<w3m-modal-header title="${`Connect to ${e}`}"></w3m-modal-header><w3m-modal-content><w3m-network-waiting chainId="${t}" label="Approve in your wallet" .isError="${this.isError}"></w3m-network-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">Switch can be declined if chain is not supported by a wallet or previous request is still active</w3m-text><w3m-button .onClick="${this.onSwitchNetwork.bind(this)}" .disabled="${!this.isError}" .iconRight="${d3.RETRY_ICON}">Try Again</w3m-button></w3m-info-footer>`;
  }
};
zt.styles = [w.globalCss, fi], Ve([state()], zt.prototype, "isError", 2), zt = Ve([customElement("w3m-switch-network-view")], zt);
var Ci = css`w3m-modal-content{height:clamp(200px,60vh,600px);display:block;overflow:scroll;scrollbar-width:none;position:relative;margin-top:1px}.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between;margin:-15px -10px;padding-top:20px}w3m-modal-content::after,w3m-modal-content::before{content:'';position:fixed;pointer-events:none;z-index:1;width:100%;height:20px;opacity:1}w3m-modal-content::before{box-shadow:0 -1px 0 0 var(--w3m-color-bg-1);background:linear-gradient(var(--w3m-color-bg-1),rgba(255,255,255,0))}w3m-modal-content::after{box-shadow:0 1px 0 0 var(--w3m-color-bg-1);background:linear-gradient(rgba(255,255,255,0),var(--w3m-color-bg-1));top:calc(100% - 20px)}w3m-modal-content::-webkit-scrollbar{display:none}.w3m-placeholder-block{display:flex;justify-content:center;align-items:center;height:100px;overflow:hidden}.w3m-empty,.w3m-loading{display:flex}.w3m-loading .w3m-placeholder-block{height:100%}.w3m-end-reached .w3m-placeholder-block{height:0;opacity:0}.w3m-empty .w3m-placeholder-block{opacity:1;height:100%}w3m-wallet-button{margin:calc((100% - 60px)/ 3) 0}`;
var $i = Object.defineProperty;
var ki = Object.getOwnPropertyDescriptor;
var At = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ki(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && $i(e, a, o), o;
};
var ye = 40;
var ot = class extends LitElement {
  constructor() {
    super(...arguments), this.loading = !ne.state.wallets.listings.length, this.firstFetch = !ne.state.wallets.listings.length, this.search = "", this.endReached = false, this.intersectionObserver = void 0, this.searchDebounce = s.debounce((t) => {
      t.length >= 3 ? (this.firstFetch = true, this.endReached = false, this.search = t, ne.resetSearch(), this.fetchWallets()) : this.search && (this.search = "", this.endReached = this.isLastPage(), ne.resetSearch());
    });
  }
  firstUpdated() {
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    var t;
    (t = this.intersectionObserver) == null || t.disconnect();
  }
  get placeholderEl() {
    return s.getShadowRootElement(this, ".w3m-placeholder-block");
  }
  createPaginationObserver() {
    this.intersectionObserver = new IntersectionObserver(([t]) => {
      t.isIntersecting && !(this.search && this.firstFetch) && this.fetchWallets();
    }), this.intersectionObserver.observe(this.placeholderEl);
  }
  isLastPage() {
    const { wallets: t, search: e } = ne.state, { listings: a, total: r } = this.search ? e : t;
    return r <= ye || a.length >= r;
  }
  async fetchWallets() {
    var t;
    const { wallets: e, search: a, injectedWallets: r } = ne.state, { listings: o, total: i, page: l } = this.search ? a : e;
    if (!this.endReached && (this.firstFetch || i > ye && o.length < i))
      try {
        this.loading = true;
        const p = (t = d.state.standaloneChains) == null ? void 0 : t.join(","), { listings: u } = await ne.getWallets({ page: this.firstFetch ? 1 : l + 1, entries: ye, search: this.search, version: d.state.walletConnectVersion, chains: p }), f = u.map(($) => s.getWalletIcon($)), j = r.map(($) => s.getWalletIcon($));
        await Promise.all([...f.map(async ($) => s.preloadImage($)), ...j.map(async ($) => s.preloadImage($)), c.wait(300)]), this.endReached = this.isLastPage();
      } catch (p) {
        console.error(p), oe.openToast(s.getErrorMessage(p), "error");
      } finally {
        this.loading = false, this.firstFetch = false;
      }
  }
  onConnect(t) {
    c.isAndroid() ? s.handleMobileLinking(t) : s.goToConnectingView(t);
  }
  onSearchChange(t) {
    const { value: e } = t.target;
    this.searchDebounce(e);
  }
  render() {
    const { wallets: t, search: e } = ne.state, { listings: a } = this.search ? e : t, r = this.loading && !a.length, o = this.search.length >= 3;
    let i = P.injectedWalletsTemplate(), l = P.manualWalletsTemplate(), p = P.recomendedWalletsTemplate(true);
    o && (i = i.filter(({ values: $ }) => s.caseSafeIncludes($[0], this.search)), l = l.filter(({ values: $ }) => s.caseSafeIncludes($[0], this.search)), p = p.filter(({ values: $ }) => s.caseSafeIncludes($[0], this.search)));
    const u = !this.loading && !a.length && !i.length && !p.length, f = Math.max(i.length, a.length), j = { "w3m-loading": r, "w3m-end-reached": this.endReached || !this.loading, "w3m-empty": u };
    return html`<w3m-modal-header><w3m-search-input .onChange="${this.onSearchChange.bind(this)}"></w3m-search-input></w3m-modal-header><w3m-modal-content class="${classMap(j)}"><div class="w3m-grid">${r ? null : p} ${r ? null : [...Array(f)].map(($, _2) => html`${l[_2]} ${i[_2]} ${a[_2] ? html`<w3m-wallet-button imageId="${a[_2].image_id}" name="${a[_2].name}" walletId="${a[_2].id}" .onClick="${() => this.onConnect(a[_2])}"></w3m-wallet-button>` : null}`)}</div><div class="w3m-placeholder-block">${u ? html`<w3m-text variant="big-bold" color="secondary">No results found</w3m-text>` : null} ${!u && this.loading ? html`<w3m-spinner></w3m-spinner>` : null}</div></w3m-modal-content>`;
  }
};
ot.styles = [w.globalCss, Ci], At([state()], ot.prototype, "loading", 2), At([state()], ot.prototype, "firstFetch", 2), At([state()], ot.prototype, "search", 2), At([state()], ot.prototype, "endReached", 2), ot = At([customElement("w3m-wallet-explorer-view")], ot);
var Oi = css`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Ii = Object.defineProperty;
var Ei = Object.getOwnPropertyDescriptor;
var ze = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Ei(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
  return r && o && Ii(e, a, o), o;
};
var Gt = class extends LitElement {
  constructor() {
    super(), this.isError = false, this.unwatchConnection = void 0, this.openWebWallet(), this.unwatchConnection = _.subscribe((t) => {
      this.isError = t.pairingError;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchConnection) == null || t.call(this);
  }
  onFormatAndRedirect(t) {
    const { desktop: e, name: a } = c.getWalletRouterData(), r = e == null ? void 0 : e.universal;
    if (r) {
      const o = c.formatUniversalUrl(r, t, a);
      c.openHref(o, "_blank");
    }
  }
  openWebWallet() {
    _.setPairingError(false);
    const { standaloneUri: t } = d.state, { pairingUri: e } = _.state, a = c.getWalletRouterData();
    s.setRecentWallet(a), t ? this.onFormatAndRedirect(t) : this.onFormatAndRedirect(e);
  }
  render() {
    const { name: t, id: e, image_id: a } = c.getWalletRouterData(), { isMobile: r, isInjected: o, isDesktop: i } = s.getCachedRouterWalletPlatforms(), l = c.isMobile();
    return html`<w3m-modal-header title="${t}" .onAction="${s.handleUriCopy}" .actionIcon="${d3.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`${t} web app has opened in a new tab. Go there, accept the connection, and come back`}</w3m-text><w3m-platform-selection .isMobile="${r}" .isInjected="${l ? false : o}" .isDesktop="${l ? false : i}" .isRetry="${true}"><w3m-button .onClick="${this.openWebWallet.bind(this)}" .iconRight="${d3.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Gt.styles = [w.globalCss, Oi], ze([state()], Gt.prototype, "isError", 2), Gt = ze([customElement("w3m-web-connecting-view")], Gt);
export {
  Ct as W3mAccountButton,
  dt as W3mConnectButton,
  tt as W3mCoreButton,
  Et as W3mModal,
  pt as W3mNetworkSwitch,
  G as W3mQrCode
};
/*! Bundled license information:

@lit/reactive-element/development/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/development/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=dist-ROIA3UZS.js.map
