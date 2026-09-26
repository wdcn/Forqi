/* Forqi storefront — preview renderers, modal, catalog + home widgets.
 * Depends on window.FORQI_CATALOG (catalog-data.js). Vanilla JS, no deps. */
(function () {
  "use strict";
  var C = window.FORQI_CATALOG;
  if (!C) return;
  var ORANGE = "#F37021", INK = "#1A161A";
  var CONTACT = "partner@forqi.ai";

  var catById = {};
  C.categories.forEach(function (c) { catById[c.id] = c; });
  var dsById = {};
  C.datasets.forEach(function (d) { dsById[d.id] = d; });

  /* ---------- analytics ---------- */
  // Sends a GA4 event. gtag is only live on production hosts (see <head>);
  // elsewhere it is a no-op stub, so nothing is counted from localhost/previews.
  // Never pass personal data (names, emails, message text) in params.
  function track(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {}
  }

  /* ---------- utils ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function rng(seed) { // mulberry32 — deterministic previews
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function requestHref(d) {
    var subj = "Dataset request: " + d.id + " — " + d.name;
    var body = "Hi Forqi team,\n\nI'm interested in " + d.id + " (" + d.name + ").\n\nUse case:\nTarget volume / languages:\nTimeline:\n\nThanks,";
    return "mailto:" + CONTACT + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
  }

  /* ---------- JSON pretty with highlight ---------- */
  function jsonHTML(obj) {
    var s = esc(JSON.stringify(obj, null, 2));
    return s.replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;)(\s*:)?|\b(-?\d+(?:\.\d+)?)\b|\b(true|false|null)\b/g,
      function (m, str, colon, num, lit) {
        if (str) return colon ? '<span class="k">' + str + "</span>" + colon : '<span class="s">' + str + "</span>";
        if (num) return '<span class="n">' + num + "</span>";
        return '<span class="n">' + lit + "</span>";
      });
  }

  /* ---------- SVG scene backgrounds (640×360) ---------- */
  var BG = {
    street: function () {
      return '<rect width="640" height="360" fill="#E9EEF2"/>' +
        '<rect x="0" y="40" width="130" height="200" fill="#D5D9DE"/><rect x="140" y="10" width="160" height="230" fill="#CBD0D6"/>' +
        '<rect x="310" y="60" width="150" height="180" fill="#D9DDE2"/><rect x="470" y="30" width="170" height="210" fill="#C9CED4"/>' +
        '<g fill="#B8BEC6">' + [0,1,2,3].map(function (r) { return [0,1,2].map(function (c) {
          return '<rect x="' + (160 + c * 48) + '" y="' + (30 + r * 44) + '" width="30" height="26"/>'; }).join(""); }).join("") + '</g>' +
        '<rect x="0" y="240" width="640" height="120" fill="#A9AEB5"/><rect x="0" y="240" width="640" height="14" fill="#C3C7CC"/>' +
        '<g fill="#F6F5F6">' + [0,1,2,3,4,5,6,7].map(function (i) { return '<rect x="' + (i * 84 + 10) + '" y="300" width="44" height="6"/>'; }).join("") + '</g>' +
        '<line x1="488" y1="150" x2="488" y2="240" stroke="#6E737A" stroke-width="4"/>';
    },
    road: function () {
      return '<rect width="640" height="175" fill="#DCE3EA"/><rect y="175" width="640" height="185" fill="#8E949B"/>' +
        '<polygon points="0,175 300,175 190,360 0,360" fill="#9AA79A"/><polygon points="340,175 640,175 640,360 450,360" fill="#9AA79A"/>' +
        '<polygon points="300,175 340,175 450,360 190,360" fill="#7B8189"/>' +
        '<g fill="#B9BEC5"><rect x="20" y="95" width="80" height="80"/><rect x="520" y="80" width="100" height="95"/><rect x="420" y="120" width="60" height="55"/></g>' +
        '<line x1="313" y1="45" x2="313" y2="175" stroke="#6E737A" stroke-width="3"/><line x1="542" y1="146" x2="542" y2="200" stroke="#6E737A" stroke-width="3"/>' +
        '<line x1="102" y1="154" x2="102" y2="200" stroke="#6E737A" stroke-width="3"/>';
    },
    indoor: function () {
      return '<rect width="640" height="250" fill="#EFE8E1"/><rect y="250" width="640" height="110" fill="#D9CBBB"/>' +
        '<rect x="420" y="40" width="100" height="80" fill="#F8F5F1" stroke="#CDBFAF" stroke-width="3"/>' +
        '<rect x="80" y="170" width="220" height="90" rx="10" fill="#A7A9AE"/><rect x="80" y="150" width="220" height="40" rx="10" fill="#B6B8BD"/>' +
        '<ellipse cx="190" cy="205" rx="36" ry="17" fill="#D98A48"/>' +
        '<rect x="360" y="200" width="160" height="14" fill="#A0764F"/><rect x="380" y="214" width="10" height="50" fill="#8C6644"/><rect x="490" y="214" width="10" height="50" fill="#8C6644"/>' +
        '<rect x="430" y="186" width="18" height="16" fill="#F6F5F6" stroke="#9E9B9E"/>' +
        '<rect x="545" y="80" width="55" height="170" fill="#B38A62"/>' +
        '<g fill="#8FA7B8"><rect x="552" y="92" width="10" height="34"/><rect x="566" y="96" width="8" height="30"/><rect x="580" y="90" width="12" height="36"/>' +
        '<rect x="552" y="142" width="14" height="30"/><rect x="570" y="146" width="10" height="26"/></g>';
    },
    shelf: function () {
      var s = '<rect width="640" height="360" fill="#F1EFEA"/>';
      [135, 245, 355].forEach(function (y) { s += '<rect x="0" y="' + y + '" width="640" height="10" fill="#8C8F94"/>'; });
      var cols = ["#D4502A", "#2F6FAE", "#3E9A5B", "#E0B33A", "#8A5CA8"];
      for (var r = 0; r < 3; r++) for (var i = 0; i < 12; i++) {
        var x = 30 + i * 50, y = 50 + r * 110;
        if (r === 1 && x >= 400 && x < 520) continue;
        s += '<rect x="' + x + '" y="' + y + '" width="38" height="' + (80 - (i % 3) * 8) + '" fill="' + cols[(i + r) % 5] + '" opacity=".75" transform="translate(0 ' + ((i % 3) * 8) + ')"/>';
      }
      return s;
    },
    aerial: function () {
      var s = '<rect width="640" height="360" fill="#9DB08A"/>' +
        '<rect x="0" y="170" width="640" height="26" fill="#8E9194"/><rect x="220" y="0" width="24" height="360" fill="#8E9194"/>' +
        '<rect x="0" y="182" width="640" height="2" fill="#E8E8E8"/>';
      var R = rng(4);
      for (var i = 0; i < 18; i++) s += '<circle cx="' + (R() * 640) + '" cy="' + (R() * 360) + '" r="' + (8 + R() * 14) + '" fill="#6F8A5E"/>';
      s += '<rect x="70" y="60" width="110" height="80" fill="#C9B9A6"/><polygon points="70,60 180,60 125,100" fill="#B39E86"/>' +
        '<rect x="260" y="55" width="120" height="90" fill="#BFB2A3"/><rect x="470" y="70" width="90" height="60" fill="#35507A"/>' +
        '<g stroke="#5B7299" stroke-width="1">' + [0,1,2,3].map(function (i) { return '<line x1="' + (470 + i * 22.5) + '" y1="70" x2="' + (470 + i * 22.5) + '" y2="130"/>'; }).join("") + '</g>' +
        '<rect x="455" y="230" width="70" height="50" rx="8" fill="#5FB7D6"/><rect x="302" y="207" width="24" height="12" fill="#D9D9D9"/>';
      return s;
    },
    doc: function (opt) {
      var s = '<rect width="640" height="360" fill="#DAD6D1"/><rect x="30" y="20" width="580" height="330" fill="#fff"/>';
      if (opt && opt.table) {
        for (var r = 0; r < 5; r++) s += '<line x1="80" y1="' + (70 + r * 46) + '" x2="560" y2="' + (70 + r * 46) + '" stroke="#D0CCD0"/>';
        for (var r2 = 0; r2 < 5; r2++) for (var c = 0; c < 4; c++)
          s += '<rect x="' + (92 + c * 120) + '" y="' + (84 + r2 * 46 - (r2 === 0 ? 4 : 0)) + '" width="' + (r2 === 0 ? 70 : 50 + (c * 13 + r2 * 7) % 40) + '" height="7" fill="' + (r2 === 0 ? "#6E6A6E" : "#B3AFB3") + '"/>';
        return s;
      }
      if (opt && opt.hw) {
        var paths = ["M70 84 q20 -14 40 0 t40 0 t40 0 t40 -4 t40 4 t40 0 t40 -2 t40 0 t40 2",
                     "M70 144 q18 -12 36 0 t36 0 t36 2 t36 -2 t36 0 t36 2 t36 0 t36 -2",
                     "M70 204 q16 -18 32 0 t32 0 t40 -6 t32 6 t32 0 t40 0 t32 -4 t20 4"];
        paths.forEach(function (p) { s += '<path d="' + p + '" fill="none" stroke="#2A3A6A" stroke-width="2.4" stroke-linecap="round"/>'; });
        for (var l = 0; l < 7; l++) s += '<line x1="50" y1="' + (100 + l * 60 - 60) + '" x2="590" y2="' + (100 + l * 60 - 60) + '" stroke="#DCE6F2"/>';
        return s;
      }
      s += '<rect x="66" y="56" width="150" height="12" fill="#3F3B3F"/><rect x="408" y="58" width="120" height="9" fill="#6E6A6E"/><rect x="408" y="94" width="100" height="8" fill="#9E9B9E"/>';
      for (var i = 0; i < 4; i++) {
        s += '<line x1="60" y1="' + (155 + i * 22) + '" x2="580" y2="' + (155 + i * 22) + '" stroke="#E4E0E4"/>';
        s += '<rect x="70" y="' + (162 + i * 22) + '" width="' + (180 + (i * 37) % 90) + '" height="7" fill="#B3AFB3"/><rect x="510" y="' + (162 + i * 22) + '" width="50" height="7" fill="#B3AFB3"/>';
      }
      s += '<rect x="440" y="280" width="120" height="10" fill="#3F3B3F"/>';
      return s;
    },
    plain: function () { return '<rect width="640" height="360" fill="#EEEBEE"/><rect y="300" width="640" height="60" fill="#E2DEE2"/>'; },
    scan: function () {
      return '<rect width="640" height="360" fill="#0E0E10"/>' +
        '<ellipse cx="250" cy="190" rx="90" ry="140" fill="#3B3B40"/><ellipse cx="400" cy="190" rx="90" ry="140" fill="#3B3B40"/>' +
        '<ellipse cx="310" cy="210" rx="70" ry="80" fill="#8A8A90" opacity=".75"/>' +
        '<g stroke="#6A6A70" stroke-width="3" fill="none">' + [0,1,2,3,4,5].map(function (i) {
          return '<path d="M160 ' + (80 + i * 38) + ' q165 -40 330 0"/>'; }).join("") + '</g>' +
        '<rect x="316" y="30" width="10" height="310" fill="#B5B5BA" opacity=".6"/><circle cx="405" cy="197" r="10" fill="#C9C9CE"/>';
    }
  };

  function tag(x, y, text, dashed) {
    var w = Math.min(260, 10 + text.length * 6.4);
    var ty = y - 18 < 0 ? y + 2 : y - 18;
    return '<rect x="' + x + '" y="' + ty + '" width="' + w + '" height="16" fill="' + (dashed ? INK : ORANGE) + '"/>' +
      '<text x="' + (x + 5) + '" y="' + (ty + 11.5) + '" font-size="10.5" font-family="Helvetica Neue,Arial,sans-serif" font-weight="600" fill="#fff">' + esc(text) + "</text>";
  }
  var HAND_E = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],[0,17],[17,18],[18,19],[19,20],[5,9],[9,13],[13,17]];
  function handPts(ox, oy) { // stylised right hand, pinch
    var rel = [[0,0],[-38,-22],[-62,-50],[-70,-82],[-62,-108],[-24,-86],[-24,-128],[-30,-158],[-52,-120],
               [0,-92],[4,-140],[6,-176],[8,-204],[22,-86],[30,-128],[36,-160],[40,-186],[40,-72],[54,-104],[62,-128],[68,-150]];
    return rel.map(function (p) { return [ox + p[0], oy + p[1]]; });
  }
  function shapesSVG(shapes) {
    var s = "";
    (shapes || []).forEach(function (sh) {
      var dash = sh.d ? ' stroke-dasharray="6 4"' : "";
      var col = sh.d ? INK : ORANGE;
      if (sh.b) {
        s += '<rect x="' + sh.b[0] + '" y="' + sh.b[1] + '" width="' + sh.b[2] + '" height="' + sh.b[3] + '" fill="' + col + '" fill-opacity=".08" stroke="' + col + '" stroke-width="2.5"' + dash + "/>";
        s += tag(sh.b[0], sh.b[1], sh.l, sh.d);
      } else if (sh.p) {
        var pts = sh.p.map(function (p) { return p.join(","); }).join(" ");
        s += '<polygon points="' + pts + '" fill="' + ORANGE + '" fill-opacity="' + (sh.f || 0.25) + '" stroke="' + ORANGE + '" stroke-width="2"/>';
        s += tag(sh.p[0][0] + 4, sh.p[0][1] + 20, sh.l);
      } else if (sh.ln) {
        s += '<polyline points="' + sh.ln.map(function (p) { return p.join(","); }).join(" ") + '" fill="none" stroke="' + (sh.d ? "#fff" : ORANGE) + '" stroke-width="4"' + dash + "/>";
        var first = sh.ln[0];
        s += tag(Math.min(first[0] - 20, 520), first[1] - 30, sh.l, sh.d);
      } else if (sh.kp || sh.hand) {
        var k = sh.kp || handPts(sh.hand[0], sh.hand[1]);
        var e = sh.e || HAND_E;
        if (sh.hand) s += '<path d="M' + k[0].join(",") + " L" + k[17].join(",") + " L" + k[20].join(",") + " L" + k[12].join(",") + " L" + k[8].join(",") + " L" + k[4].join(",") + ' Z" fill="#E6C6AE" opacity=".6"/>';
        e.forEach(function (p) { s += '<line x1="' + k[p[0]][0] + '" y1="' + k[p[0]][1] + '" x2="' + k[p[1]][0] + '" y2="' + k[p[1]][1] + '" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>'; });
        k.forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + ORANGE + '" stroke="#fff" stroke-width="1.5"/>'; });
        var minx = Math.min.apply(null, k.map(function (p) { return p[0]; })), miny = Math.min.apply(null, k.map(function (p) { return p[1]; }));
        s += tag(minx, miny - 8, sh.l + " · " + k.length + " kp");
      }
    });
    return s;
  }
  function sceneSVG(bg, shapes, opt, label) {
    var b = (BG[bg] || BG.plain)(opt);
    return '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(label || "Annotated sample") + '">' + b + shapesSVG(shapes) + "</svg>";
  }

  /* ---------- renderers ---------- */
  var R = {};
  R.table = function (p) {
    var h = '<div class="pv-table-wrap"><table class="pv"><thead><tr>' + p.columns.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
    p.rows.forEach(function (r) { h += "<tr>" + r.map(function (v) { return "<td>" + esc(v) + "</td>"; }).join("") + "</tr>"; });
    h += "</tbody></table></div>";
    if (p.note) h += '<p class="pv-note">' + esc(p.note) + "</p>";
    return h;
  };
  R.json = function (p) {
    var data = Array.isArray(p.data) ? p.data.map(function (x) { return JSON.stringify(x); }).join("\n") : null;
    return Array.isArray(p.data)
      ? '<pre class="pv-json">' + p.data.map(function (x) { return jsonHTML(x); }).join("\n\n") + "</pre>"
      : '<pre class="pv-json">' + jsonHTML(p.data) + "</pre>";
  };
  R.chat = function (p) {
    var h = (p.meta ? '<div class="pv-meta">' + esc(p.meta) + "</div>" : "") + '<div class="chat">';
    p.messages.forEach(function (m) {
      var isCode = /\n\s{2,}|def |\{\n|\[\n/.test(m.content) && m.role !== "note";
      h += '<div class="msg ' + m.role + (isCode ? " code" : "") + '"><div class="role">' + esc(m.role) + "</div><pre>" + esc(m.content) + "</pre></div>";
    });
    return h + "</div>";
  };
  R.image = function (p, d) {
    var h = (p.meta ? '<div class="pv-meta">' + esc(p.meta) + "</div>" : "") +
      '<figure class="pv-figure">' + sceneSVG(p.bg, p.shapes, { hw: p.hw, table: p.table }, d.name + " sample") +
      (p.caption ? '<figcaption class="pv-caption">' + esc(p.caption) + "</figcaption>" : "") + "</figure>";
    return h;
  };
  R.frames = function (p, d) {
    var h = (p.meta ? '<div class="pv-meta">' + esc(p.meta) + "</div>" : "") + '<div class="frames">';
    p.frames.forEach(function (f) {
      h += "<figure>" + sceneSVG(p.bg, f.shapes, {}, d.name + " frame " + f.t) + "<figcaption><b>" + esc(f.t) + "</b>" + esc(f.text || "") + "</figcaption></figure>";
    });
    return h + "</div>";
  };
  R.spans = function (p) {
    var h = '<div class="spans">';
    p.items.forEach(function (it) {
      var txt = esc(it.text);
      it.spans.forEach(function (sp) {
        var needle = esc(sp[0]);
        txt = txt.replace(needle, '<mark class="ent">' + needle + "<sup>" + esc(sp[1]) + "</sup></mark>");
      });
      h += '<div class="span-item"><div class="lbl">' + esc(it.label) + '</div><div class="txt">' + txt + "</div></div>";
    });
    return h + "</div>";
  };
  R.audio = function (p, d) {
    var W = 640, H = 150, n = 220, rnd = rng(p.seed || 1), bars = "";
    var dur = p.duration;
    function inSeg(t) { for (var i = 0; i < p.segments.length; i++) if (t >= p.segments[i][0] && t <= p.segments[i][1]) return i; return -1; }
    for (var i = 0; i < n; i++) {
      var t = (i / n) * dur, seg = inSeg(t);
      var amp = seg >= 0 ? (0.25 + 0.75 * Math.abs(Math.sin(i * 0.37 + rnd() * 2)) * (0.5 + rnd() * 0.5)) : 0.04 + rnd() * 0.06;
      var bh = Math.max(2, amp * (H - 30));
      bars += '<rect x="' + (i * (W / n)).toFixed(1) + '" y="' + ((H - 20) / 2 - bh / 2 + 4).toFixed(1) + '" width="' + (W / n * 0.6).toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="' + (seg >= 0 ? INK : "#B9B5B9") + '"/>';
    }
    var segs = p.segments.map(function (s, i) {
      var x = s[0] / dur * W, w = (s[1] - s[0]) / dur * W;
      return '<rect class="seg" data-i="' + i + '" x="' + x.toFixed(1) + '" y="0" width="' + w.toFixed(1) + '" height="' + (H - 18) + '" fill="' + ORANGE + '" fill-opacity=".10" stroke="' + ORANGE + '" stroke-width="1"/>' +
        '<text x="' + (x + 4).toFixed(1) + '" y="' + (H - 5) + '" font-size="10" font-family="ui-monospace,Menlo,monospace" fill="#565357">' + s[0].toFixed(1) + "s · " + esc(s[2]) + "</text>";
    }).join("");
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Waveform with labeled segments">' + segs + bars +
      '<line class="playhead" x1="0" y1="0" x2="0" y2="' + (H - 18) + '" stroke="' + ORANGE + '" stroke-width="2" opacity="0"/></svg>';
    var rows = p.segments.map(function (s, i) { return '<tr data-i="' + i + '"><td class="mono">' + s[0].toFixed(2) + "</td><td class=\"mono\">" + s[1].toFixed(2) + "</td><td>" + esc(s[2]) + "</td><td>" + esc(s[3]) + "</td></tr>"; }).join("");
    return (p.meta ? '<div class="pv-meta">' + esc(p.meta) + "</div>" : "") +
      '<figure class="pv-figure pv-audio" data-dur="' + dur + '">' + svg +
      '<div class="audio-controls"><button class="play" type="button" aria-label="Play visual preview">▶</button><span class="clock">0.00 / ' + dur.toFixed(2) + ' s</span>' +
      '<span style="margin-left:auto;color:#9E9B9E">visual preview · audio samples on request</span></div></figure>' +
      '<div class="pv-h">Segments</div><div class="pv-table-wrap"><table class="pv"><thead><tr><th>start</th><th>end</th><th>' + (p.segments[0][2] === "event" ? "type" : "speaker") + "</th><th>" + (p.segments[0][2] === "event" ? "label" : "transcript") + "</th></tr></thead><tbody>" + rows + "</tbody></table></div>";
  };
  R.lidar = function (p) {
    var W = 640, H = 400, rnd = rng(p.seed || 3), s = '<rect width="' + W + '" height="' + H + '" fill="#111014"/>';
    var cx = W / 2, cy = H / 2;
    for (var ring = 1; ring <= 5; ring++) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + ring * 42 + '" fill="none" stroke="#2A272D" stroke-dasharray="2 4"/>';
    var pts = "";
    for (var i = 0; i < 2600; i++) { // ground rings
      var a = rnd() * Math.PI * 2, r = (Math.floor(rnd() * 26) + 1) * 11 + rnd() * 2;
      var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.9;
      if (x < 0 || x > W || y < 0 || y > H) continue;
      if (Math.abs(y - cy) > 75 && Math.abs(y - cy) < 95) continue;
      var shade = Math.max(40, 150 - r * 0.45) | 0;
      pts += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="1.6" height="1.6" fill="rgb(' + shade + "," + (shade + 10) + "," + (shade + 30) + ')"/>';
    }
    for (var j = 0; j < 500; j++) { // curbs / walls
      var xx = rnd() * W, side = rnd() > 0.5 ? 1 : -1;
      pts += '<rect x="' + xx.toFixed(1) + '" y="' + (cy + side * (85 + rnd() * 6)).toFixed(1) + '" width="1.8" height="1.8" fill="#8FB6D9"/>';
    }
    var boxes = "";
    p.boxes.forEach(function (b) {
      var bx = cx + b.x * W, by = cy + b.y * H, bw = b.w * W, bh = b.h * H;
      for (var k = 0; k < 90; k++) pts += '<rect x="' + (bx - bw / 2 + rnd() * bw).toFixed(1) + '" y="' + (by - bh / 2 + rnd() * bh).toFixed(1) + '" width="1.8" height="1.8" fill="#F5E6D8"/>';
      boxes += '<g transform="rotate(' + (b.a * 57.3).toFixed(1) + " " + bx.toFixed(1) + " " + by.toFixed(1) + ')"><rect x="' + (bx - bw / 2).toFixed(1) + '" y="' + (by - bh / 2).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="none" stroke="' + ORANGE + '" stroke-width="2"/>' +
        '<line x1="' + bx.toFixed(1) + '" y1="' + by.toFixed(1) + '" x2="' + (bx + bw / 2).toFixed(1) + '" y2="' + by.toFixed(1) + '" stroke="' + ORANGE + '" stroke-width="2"/></g>' +
        '<text x="' + (bx - bw / 2).toFixed(1) + '" y="' + (by - bh / 2 - 5).toFixed(1) + '" font-size="10.5" font-family="Helvetica Neue,Arial" font-weight="600" fill="' + ORANGE + '">' + esc(b.l) + "</text>";
    });
    s += pts + boxes + '<polygon points="' + (cx - 10) + "," + (cy - 6) + " " + (cx + 12) + "," + cy + " " + (cx - 10) + "," + (cy + 6) + '" fill="#fff"/>' +
      '<text x="' + (cx - 14) + '" y="' + (cy + 20) + '" font-size="9.5" font-family="ui-monospace,Menlo" fill="#9E9B9E">EGO</text>';
    return (p.meta ? '<div class="pv-meta">' + esc(p.meta) + "</div>" : "") + '<figure class="pv-figure"><svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="LiDAR bird\'s-eye view with 3D cuboids">' + s + "</svg></figure>";
  };

  function renderPreview(d) {
    var p = d.preview, fn = R[p.kind];
    return '<span class="pv-badge">Synthetic sample · illustrates schema &amp; format</span>' + (fn ? fn(p, d) : "");
  }
  function renderSchema(d) {
    var h = '<div class="pv-table-wrap"><table class="pv"><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody>';
    d.schema.forEach(function (r) { h += '<tr><td class="mono">' + esc(r[0]) + '</td><td class="mono">' + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; });
    return h + "</tbody></table></div>";
  }
  function renderSpec(d) {
    var rows = [["Dataset ID", d.id], ["Category", catById[d.cat].code + " · " + catById[d.cat].name], ["Indicative volume", d.volume],
      ["Languages / coverage", d.languages], ["Delivery formats", d.formats.join(", ")], ["Use cases", d.tasks.join(", ")]];
    Object.keys(d.spec).forEach(function (k) { rows.push([k, d.spec[k]]); });
    rows.push(["Licensing", "Commercial license; perpetual or term options. Provenance & consent documentation included."]);
    return '<dl class="kv">' + rows.map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl>";
  }

  /* ---------- audio playhead ---------- */
  function wireAudio(root) {
    root.querySelectorAll(".pv-audio").forEach(function (fig) {
      var btn = fig.querySelector(".play"), head = fig.querySelector(".playhead"), clock = fig.querySelector(".clock");
      var dur = parseFloat(fig.getAttribute("data-dur")), raf = null, t0 = 0;
      var tbl = fig.parentNode.querySelector("table.pv tbody");
      function stop() { cancelAnimationFrame(raf); raf = null; btn.textContent = "▶"; head.setAttribute("opacity", "0"); mark(-1); }
      function mark(idx) { if (!tbl) return; tbl.querySelectorAll("tr").forEach(function (tr) { tr.style.background = tr.getAttribute("data-i") == idx ? "#FBEEE3" : ""; }); }
      function tick(ts) {
        if (!t0) t0 = ts;
        var t = (ts - t0) / 1000;
        if (t >= dur) { stop(); clock.textContent = dur.toFixed(2) + " / " + dur.toFixed(2) + " s"; return; }
        head.setAttribute("x1", (t / dur * 640).toFixed(1)); head.setAttribute("x2", (t / dur * 640).toFixed(1));
        clock.textContent = t.toFixed(2) + " / " + dur.toFixed(2) + " s";
        var idx = -1; fig.querySelectorAll(".seg").forEach(function (sg) {
          var x = +sg.getAttribute("x"), w = +sg.getAttribute("width"), px = t / dur * 640;
          if (px >= x && px <= x + w) idx = sg.getAttribute("data-i");
        });
        mark(idx);
        raf = requestAnimationFrame(tick);
      }
      btn.addEventListener("click", function () {
        if (raf) return stop();
        t0 = 0; btn.textContent = "❚❚"; head.setAttribute("opacity", "1"); raf = requestAnimationFrame(tick);
      });
    });
  }

  /* ---------- modal ---------- */
  var modal, lastFocus;
  function ensureModal() {
    if (modal) return modal;
    modal = el('<div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-title"><div class="modal-bg" data-close></div>' +
      '<div class="modal-panel"><div class="modal-head"><div class="top"><div><div class="id" id="m-id"></div><h2 id="m-title"></h2></div>' +
      '<button class="close" type="button" aria-label="Close preview" data-close>✕</button></div><p id="m-sum"></p></div>' +
      '<div class="tabs" role="tablist"><button role="tab" data-tab="sample" aria-selected="true">Sample preview</button><button role="tab" data-tab="schema" aria-selected="false">Schema</button><button role="tab" data-tab="spec" aria-selected="false">Specs &amp; licensing</button></div>' +
      '<div class="modal-body" id="m-body" role="tabpanel"></div>' +
      '<div class="modal-foot"><small>Volumes are indicative and confirmed per order. Full evaluation samples are shared under NDA.</small>' +
      '<div class="acts"><button class="btn sm" type="button" id="m-dl">Download sample JSON</button><a class="btn sm solid" id="m-req" href="#">Request this dataset</a></div></div></div></div>');
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
    modal.querySelectorAll("[data-tab]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-tab"); showTab(t);
        if (current) track("dataset_preview_tab", { dataset_id: current.id, tab: t });
      });
    });
    return modal;
  }
  var current = null;
  function showTab(name) {
    modal.querySelectorAll("[data-tab]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === name ? "true" : "false"); });
    var body = modal.querySelector("#m-body");
    body.innerHTML = name === "schema" ? renderSchema(current) : name === "spec" ? renderSpec(current) : renderPreview(current);
    body.scrollTop = 0;
    wireAudio(body);
  }
  function openPreview(id, tab, source) {
    var d = dsById[id]; if (!d) return;
    track("dataset_preview_open", { dataset_id: d.id, dataset_name: d.name, dataset_category: catById[d.cat].name, source: source || "unknown" });
    ensureModal(); current = d; lastFocus = document.activeElement;
    modal.querySelector("#m-id").textContent = d.id + " · " + catById[d.cat].name;
    modal.querySelector("#m-title").textContent = d.name;
    modal.querySelector("#m-sum").textContent = d.summary;
    modal.querySelector("#m-req").setAttribute("href", requestHref(d));
    modal.querySelector("#m-req").onclick = function () { track("dataset_request_click", { dataset_id: d.id, dataset_category: catById[d.cat].name, location: "preview_modal" }); };
    modal.querySelector("#m-dl").onclick = function () {
      track("sample_download", { dataset_id: d.id, dataset_category: catById[d.cat].name });
      var blob = new Blob([JSON.stringify({ id: d.id, name: d.name, note: "Synthetic sample for schema/format illustration only.", schema: d.schema, spec: d.spec, sample: d.preview }, null, 2)], { type: "application/json" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "forqi-" + d.id + "-sample.json";
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    };
    modal.classList.add("open"); document.body.style.overflow = "hidden";
    showTab(tab || "sample");
    modal.querySelector(".close").focus();
    if (history.replaceState) history.replaceState(null, "", "#" + d.id);
  }
  function closeModal() {
    modal.classList.remove("open"); document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    if (history.replaceState && /^#[A-Z]+-\d+/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
  }

  /* ---------- catalog page ---------- */
  function card(d) {
    return '<article class="ds-card" data-id="' + d.id + '"><div class="id">' + d.id + "</div><h3>" + esc(d.name) + "</h3><p>" + esc(d.summary) + "</p>" +
      '<dl class="ds-meta"><dt>Volume</dt><dd>' + esc(d.volume) + "</dd><dt>Coverage</dt><dd>" + esc(d.languages) + "</dd><dt>Formats</dt><dd>" + esc(d.formats.join(", ")) + "</dd></dl>" +
      '<div class="tags">' + d.tasks.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
      '<div class="ds-actions"><button class="btn solid" type="button" data-preview="' + d.id + '">Preview sample</button><a class="btn" href="' + esc(requestHref(d)) + '">Request</a></div></article>';
  }
  function initCatalog(root) {
    var chips = document.getElementById("cat-chips"), search = document.getElementById("cat-search"), meta = document.getElementById("cat-meta");
    var state = { cat: "all", q: "" };
    var chipHTML = '<button class="chip" data-cat="all" aria-pressed="true">All domains</button>';
    C.categories.forEach(function (c) {
      var n = C.datasets.filter(function (d) { return d.cat === c.id; }).length;
      chipHTML += '<button class="chip" data-cat="' + c.id + '" aria-pressed="false">' + esc(c.name.split(" & ")[0].replace("Multimodal", "Multimodal")) + "</button>";
    });
    chips.innerHTML = chipHTML;
    function draw() {
      var q = state.q.toLowerCase().trim(), total = 0, h = "";
      C.categories.forEach(function (c) {
        if (state.cat !== "all" && state.cat !== c.id) return;
        var list = C.datasets.filter(function (d) {
          if (d.cat !== c.id) return false;
          if (!q) return true;
          return [d.id, d.name, d.summary, d.languages, d.formats.join(" "), d.tasks.join(" "), JSON.stringify(d.spec)].join(" ").toLowerCase().indexOf(q) >= 0;
        });
        if (!list.length) return;
        total += list.length;
        h += '<div class="cat-block" id="cat-' + c.id + '"><div class="cat-block-head"><h2><span class="code">' + c.code + "</span>" + esc(c.name) + "</h2><p>" + esc(c.blurb) + '</p></div><div class="ds-grid">' + list.map(card).join("") + "</div></div>";
      });
      root.innerHTML = h || '<div class="empty">No datasets match “' + esc(state.q) + '”. <a href="mailto:' + CONTACT + '">Ask us about custom collection →</a></div>';
      meta.textContent = "Featured datasets" + (state.cat !== "all" ? " · " + catById[state.cat].name : " · all domains") + " — more available on request";
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]"); if (!b) return;
      state.cat = b.getAttribute("data-cat");
      chips.querySelectorAll("[data-cat]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      track("catalog_filter", { dataset_category: state.cat === "all" ? "All domains" : catById[state.cat].name });
      draw();
    });
    if (search) search.addEventListener("input", function () { state.q = search.value; draw(); });
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-preview]"); if (b) { openPreview(b.getAttribute("data-preview"), null, "catalog_card"); return; }
      var r = e.target.closest(".ds-card a.btn");
      if (r) { var id = r.closest(".ds-card").getAttribute("data-id"); track("dataset_request_click", { dataset_id: id, dataset_category: catById[dsById[id].cat].name, location: "catalog_card" }); }
    });
    // deep links: #cat=speech  or  #SPE-02
    var hsh = decodeURIComponent(location.hash.slice(1));
    if (/^cat=/.test(hsh) && catById[hsh.slice(4)]) {
      state.cat = hsh.slice(4);
      chips.querySelectorAll("[data-cat]").forEach(function (x) { x.setAttribute("aria-pressed", x.getAttribute("data-cat") === state.cat ? "true" : "false"); });
    }
    draw();
    if (dsById[hsh]) openPreview(hsh, null, "deep_link");
    window.addEventListener("hashchange", function () {
      var h = decodeURIComponent(location.hash.slice(1));
      if (dsById[h] && !(modal && modal.classList.contains("open"))) openPreview(h, null, "deep_link");
    });
  }

  /* ---------- home page ---------- */
  function initHome() {
    var grid = document.getElementById("home-cats");
    if (grid) {
      grid.innerHTML = C.categories.map(function (c) {
        var n = C.datasets.filter(function (d) { return d.cat === c.id; }).length;
        return '<a class="cat-tile" href="data.html#cat=' + c.id + '"><span class="code">' + c.code + "</span><h3>" + esc(c.name) + "</h3><p>" + esc(c.blurb) + '</p><span class="count"><span>Featured datasets</span><span>Browse →</span></span></a>';
      }).join("");
    }
    var nd = document.getElementById("n-datasets"); if (nd) nd.textContent = C.datasets.length + "+";
    var feat = document.getElementById("feature-preview"), tabs = document.getElementById("feature-tabs");
    if (feat && tabs) {
      var picks = ["LLM-03", "SPE-02", "AD-02", "CV-01", "NLP-01", "EMB-02"];
      tabs.innerHTML = picks.map(function (id, i) { return '<button class="chip" data-f="' + id + '" aria-pressed="' + (i === 0) + '">' + id + "</button>"; }).join("");
      var info = document.getElementById("feature-info");
      function show(id) {
        var d = dsById[id];
        feat.innerHTML = renderPreview(d); wireAudio(feat);
        info.innerHTML = '<div class="pv-meta" style="color:#F37021">' + d.id + " · " + esc(catById[d.cat].name) + "</div><h3>" + esc(d.name) + "</h3><p>" + esc(d.summary) + '</p><button class="btn sm" type="button" data-open="' + d.id + '">Open full preview</button>';
        tabs.querySelectorAll("[data-f]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-f") === id ? "true" : "false"); });
      }
      tabs.addEventListener("click", function (e) { var b = e.target.closest("[data-f]"); if (b) show(b.getAttribute("data-f")); });
      info.addEventListener("click", function (e) { var b = e.target.closest("[data-open]"); if (b) openPreview(b.getAttribute("data-open"), null, "home_feature"); });
      show(picks[0]);
    }
    var sel = document.getElementById("f-interest");
    if (sel) sel.innerHTML = '<option value="">Select a domain (optional)</option>' + C.categories.map(function (c) { return "<option>" + esc(c.code + " · " + c.name) + "</option>"; }).join("") + "<option>Custom collection / annotation</option><option>AI solutions & consulting</option>";
  }

  window.ForqiStore = {
    openPreview: function (id, tab, source) { openPreview(id, tab, source || "home_button"); },
    track: track
  };

  /* Site-wide interaction events (both pages) */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a, button"); if (!a) return;
    if (a.closest(".modal") || a.closest(".ds-card")) return; // tracked by dataset_* events
    var href = a.getAttribute("href") || "";
    var sec = a.closest("section, header, footer, .hero, .modal");
    var where = sec ? (sec.classList.contains("hero") ? "hero" : (sec.id || sec.tagName.toLowerCase())) : "page";
    if (/^mailto:/i.test(href)) { track("contact_click", { method: "email", location: where }); return; }
    if (/^tel:/i.test(href)) { track("contact_click", { method: "phone", location: where }); return; }
    if (a.classList.contains("btn") || a.classList.contains("cta")) {
      track("cta_click", { cta_text: (a.textContent || "").trim().slice(0, 60), location: where, link_url: href || "(button)" });
    }
  }, true);
  document.addEventListener("submit", function (e) {
    var f = e.target; if (!f || !f.matches("form.card")) return;
    var sel = f.querySelector("select[name='interest']");
    var interest = sel && sel.value ? sel.value : "(not selected)";
    var group = sel && sel.selectedOptions[0] && sel.selectedOptions[0].parentNode.tagName === "OPTGROUP" ? sel.selectedOptions[0].parentNode.label : "(none)";
    track("contact_form_submit", { interest: interest, offering: group });
    track("generate_lead", { lead_source: "contact_form", offering: group });
  }, true);
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("catalog");
    if (root) initCatalog(root); else initHome();
  });
})();
