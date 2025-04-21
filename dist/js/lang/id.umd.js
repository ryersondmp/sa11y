
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.1.9
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2025 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangId = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var id = {
    // Indonesian
    strings: {
      LANG_CODE: 'id',
      MAIN_TOGGLE_LABEL: 'Periksa Aksesibilitas',
      CONTAINER_LABEL: 'Pemeriksa Aksesibilitas',
      ERROR: 'Kesalahan',
      ERRORS: 'Kesalahan',
      WARNING: 'Peringatan',
      WARNINGS: 'Peringatan',
      GOOD: 'Bagus.',
      ON: 'Pada',
      OFF: 'Mati',
      ALERT_TEXT: 'Waspada',
      ALERT_CLOSE: 'Tutup',
      OUTLINE: 'Kerangka',
      READABILITY_DESC: 'Menampilkan skor keterbacaan di tab <strong>Kerangka</strong> untuk membantu mengukur kesulitan membaca.',
      TITLE: 'Judul',
      ALT: 'ALT',
      IMAGES: 'Gambar',
      EDIT: 'Edit',
      NO_IMAGES: 'Tidak ada gambar ditemukan.',
      DECORATIVE: 'Dekoratif',
      MISSING: 'Hilang',
      PAGE_ISSUES: 'Masalah Halaman',
      SETTINGS: 'Pengaturan',
      DEVELOPER_CHECKS: 'Pemeriksaan pengembang',
      DEVELOPER_DESC: 'Memeriksa masalah yang mungkin memerlukan pengetahuan pemrograman untuk diperbaiki, seperti atribut HTML, formulir, dan lainnya.',
      DARK_MODE: 'Mode gelap',
      SHORTCUT_SR: 'Loncat ke masalah. Pintasan papan ketik: Alt S',
      SKIP_TO_ISSUE: 'Loncat ke masalah',
      NEW_TAB: 'Membuka tab baru',
      LINKED: 'Tertaut',
      PANEL_HEADING: 'Pemeriksaan aksesibilitas',
      NO_ERRORS_FOUND: 'Tidak ditemukan kesalahan.',
      WARNINGS_FOUND: 'peringatan ditemukan.',
      TOTAL_FOUND: 'total masalah yang ditemukan.',
      NOT_VISIBLE: 'Item yang ingin Anda lihat tidak terlihat; item tersebut mungkin tersembunyi atau berada di dalam komponen akordeon atau tab. Berikut ini adalah pratinjau:',
      MISSING_ROOT: 'Halaman penuh diperiksa aksesibilitasnya karena area target <code>%(root)</code> tidak ada.',
      MISSING_READABILITY_ROOT: 'Skor keterbacaan didasarkan pada area konten <code>%(fallback)</code>, karena area target <code>%(root)</code> tidak ada.',
      HEADING_NOT_VISIBLE: 'Judul tidak terlihat; judul mungkin tersembunyi atau berada di dalam komponen akordeon atau tab.',
      SKIP_TO_PAGE_ISSUES: 'Loncat ke Halaman Masalah',
      CONSOLE_ERROR: 'Maaf, ada masalah dengan pemeriksa aksesibilitas di halaman ini. Bisakah Anda <a href="%(link)">melaporkannya melalui formulir ini</a> atau di <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Tampilan',
      MOVE_PANEL: 'Pindahkan panel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Tampilkan %(dismissCount) diabaikan',
      DISMISS: 'Abaikan',
      DISMISS_ALL: 'Abaikan semua',
      DISMISSED: 'Diabaikan',
      DISMISS_REMINDER: 'Harap diperhatikan bahwa peringatan hanya <strong>sementara</strong> diabaikan. Menghapus riwayat browser dan cookie akan mengembalikan semua peringatan yang sebelumnya diabaikan di semua halaman.',

      // Export
      DATE: 'Tanggal',
      PAGE_TITLE: 'Judul Halaman',
      RESULTS: 'Hasil',
      EXPORT_RESULTS: 'Ekspor hasil',
      GENERATED: 'Hasil dihasilkan dengan %(tool).',
      PREVIEW: 'Pratinjau',
      ELEMENT: 'Elemen',
      PATH: 'Jalur',

      // Colour filters
      COLOUR_FILTER: 'Filter warna',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monokromasi',
      COLOUR_FILTER_MESSAGE: 'Periksa elemen yang sulit dilihat atau dibedakan dari warna lainnya.',
      RED_EYE: 'Merah buta.',
      GREEN_EYE: 'Hijau buta.',
      BLUE_EYE: 'Biru buta.',
      MONO_EYE: 'Buta merah, biru, dan hijau.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Filter warna tidak berfungsi dalam mode kontras tinggi.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'gambar',
        'grafik',
        'gambar',
        'foto',
        'photo',
        'image',
        'graphic',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'gambar',
        'foto',
        'photo',
        'image',
        'graphic',
        'dekoratif',
        'penampung',
        'gambar penampung',
        'spacer',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'klik',
        'klik di sini',
        'klik di sini untuk informasi lebih lanjut',
        'klik di sini untuk mempelajari lebih lanjut',
        'lihat',
        'dirinci di sini',
        'induh',
        'unduh di sini',
        'cari tahu',
        'cari tahu lebih lanjut',
        'formulir',
        'di sini',
        'info',
        'informasi',
        'tautan',
        'belajar',
        'pelajari lebih lanjut',
        'belajar untuk',
        'lebih lanjut',
        'halaman',
        'kertas',
        'baca lebih lanjut',
        'baca',
        'baca ini',
        'ini',
        'halaman ini',
        'situs web ini',
        'melihat',
        'lihat kami',
        'situs web',
      ],
      CLICK: ['click', 'klik'],
      NEW_WINDOW_PHRASES: [
        'eksternal',
        'tab baru',
        'jendela baru',
        'pop-up',
        'muncul',
      ],
      FILE_TYPE_PHRASES: ['dokumen', 'spreadsheet', 'lembar kalkulasi', 'file terkompresi', 'file yang diarsipkan', 'lembar kerja', 'powerpoint', 'presentasi', 'instal', 'video', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Keterbacaan',
      AVG_SENTENCE: 'Rata-rata kata per kalimat:',
      COMPLEX_WORDS: 'Kata-kata yang kompleks:',
      TOTAL_WORDS: 'Kata-kata:',
      VERY_DIFFICULT: 'Sangat sulit',
      DIFFICULT: 'Sulit',
      FAIRLY_DIFFICULT: 'Cukup sulit',
      READABILITY_NO_CONTENT: 'Tidak dapat menghitung skor keterbacaan. Tidak ditemukan paragraf <code>&lt;p&gt;</code> atau konten daftar <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH: 'Konten tidak cukup untuk menghitung skor keterbacaan.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Judul tidak boleh melompati level atau melompat dari <strong>Judul %(PREV_LEVEL)</strong> ke <strong {C}>Judul %(LEVEL)</strong>, karena ini mengganggu urutan dan hierarki konten, sehingga lebih sulit diikuti. <hr> Jika <strong {C}>%(HEADING)</strong> termasuk dalam bagian <strong>%(PREV_HEADING)</strong>, pertimbangkan untuk memformatnya sebagai <strong>Judul %(LEVEL)</strong>.',
      HEADING_EMPTY: 'Judul kosong ditemukan! Untuk memperbaikinya, hapus baris ini atau ubah formatnya dari <strong {C}>Header %(level)</strong> ke <strong>Normal</strong> atau <strong>Paragraph</strong>.',
      HEADING_LONG: 'Judulnya panjang! Judul harus digunakan untuk mengatur konten dan menyampaikan struktur. Judul harus singkat, informatif, dan unik. Harap jaga agar judul kurang dari %(MAX_LENGTH) karakter (tidak lebih dari satu kalimat). <hr> <strong {B}>%(HEADING_LENGTH) Karakter</strong>',
      HEADING_FIRST: 'Judul pertama pada halaman biasanya adalah Heading 1 atau Heading 2. Heading 1 harus menjadi awal dari bagian konten utama, dan merupakan judul utama yang menjelaskan tujuan keseluruhan halaman. Pelajari lebih lanjut tentang <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Struktur Heading.</a>',
      HEADING_MISSING_ONE: 'Heading 1. Heading 1 seharusnya menjadi awal dari area konten utama, dan merupakan heading utama yang menjelaskan tujuan keseluruhan halaman. Pelajari lebih lanjut tentang <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Struktur Judul.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Judul tidak memiliki teks, namun berisi gambar. Jika ini bukan judul, ubah formatnya dari <strong {C}>Judul %(level)</strong> ke <strong>Normal</strong> atau <strong>Paragraf</strong>. Jika tidak, tambahkan teks alt ke gambar jika tidak bersifat dekoratif.',
      PANEL_HEADING_MISSING_ONE: 'Hilang Heading 1!',
      PANEL_NO_HEADINGS: 'Tidak ada judul ditemukan.',

      // Links
      LINK_EMPTY: 'Hapus tautan kosong tanpa teks apa pun.',
      LINK_EMPTY_LABELLEDBY: 'Tautan memiliki nilai untuk <code>aria-labelledby</code> yang kosong atau tidak cocok dengan nilai atribut <code>id</code> dari elemen lain di halaman.',
      LINK_EMPTY_NO_LABEL: 'Tautan tidak memiliki teks yang dapat dilihat oleh pembaca layar dan teknologi bantuan lainnya. Untuk memperbaiki: <ul><li>Tambahkan beberapa teks ringkas yang menjelaskan ke mana tautan tersebut membawa Anda.</li><li>Jika tautan tersebut adalah tautan <a href="https://a11y-101.com/development/icons-and-links">ikon atau SVG,</a> kemungkinan besar tautan tersebut tidak memiliki label deskriptif.</li><li>Jika Anda merasa tautan tersebut merupakan kesalahan akibat bug salin/tempel, pertimbangkan untuk menghapusnya.</li></ul>',
      LINK_STOPWORD: 'Teks tautan mungkin tidak cukup deskriptif tanpa konteks: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Meskipun nama yang dapat diakses telah diberikan, pertimbangkan untuk merevisi teks tautan yang terlihat. Frase seperti &quot;<strong {C}>%(ERROR)</strong>&quot; tidak bermakna.',
      LINK_TIP: '<hr> <strong>Tip!</strong> Gunakan teks tautan yang jelas dan unik yang menjelaskan tujuan tautan, biasanya judul halaman atau dokumen.',
      LINK_CLICK_HERE: 'Frasa "klik" atau "klik di sini" memberi penekanan pada mekanisme mouse, padahal banyak orang tidak menggunakan mouse atau mungkin sedang melihat situs web ini di perangkat seluler. Pertimbangkan untuk menggunakan kata kerja lain yang terkait dengan tugas tersebut.',
      DUPLICATE_TITLE: 'Atribut <code>title</code> pada tautan dan gambar dimaksudkan untuk memberikan informasi tambahan dan harus <strong>berbeda</strong> dari teks atau teks alternatif. Teks judul muncul saat mengarahkan mouse ke elemen, tetapi tidak dapat diakses dengan keyboard atau input sentuh. Pertimbangkan untuk <a href="https://www.a11yproject.com/posts/title-attributes/">menghindari atribut title sepenuhnya.</a>',
      LINK_SYMBOLS: 'Hindari menggunakan simbol sebagai ajakan bertindak dalam teks tautan kecuali jika disembunyikan dari teknologi bantu. Pembaca layar dapat membaca simbol dengan keras, yang bisa membingungkan. Pertimbangkan untuk menghapus: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'URL yang lebih panjang dan kurang dapat dipahami yang digunakan sebagai teks tautan mungkin sulit untuk disimak dengan teknologi bantuan. Dalam kebanyakan kasus, lebih baik menggunakan teks yang dapat dibaca manusia daripada URL. URL pendek (seperti beranda situs) tidak masalah.',
      LINK_DOI: 'Untuk halaman web atau sumber daya yang hanya tersedia secara online, <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">Panduan Gaya APA</a> merekomendasikan penggunaan pranala deskriptif dengan membungkus URL atau DOI karya di sekeliling judulnya. URL yang lebih panjang dan kurang dapat dipahami yang digunakan sebagai teks tautan mungkin sulit dipahami saat diakses dengan teknologi bantu.',
      LINK_NEW_TAB: 'Tautan terbuka di tab atau jendela baru tanpa peringatan. Hal ini dapat membingungkan, terutama bagi orang yang mengalami kesulitan dalam memahami konten visual. Kedua, tidak selalu merupakan praktik yang baik untuk mengontrol pengalaman seseorang atau membuat keputusan untuk mereka. Tunjukkan bahwa tautan akan terbuka di jendela baru di dalam teks tautan. <hr> <strong>Tip!</strong> Pelajari praktik terbaik: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">membuka tautan di jendela dan tab peramban baru</a>.',
      LINK_FILE_EXT: 'Tautan mengarah ke PDF atau file yang dapat diunduh (mis. MP3, Zip, Word Doc) tanpa peringatan. Tunjukkan jenis file di dalam teks tautan. Jika file berukuran besar, pertimbangkan untuk menyertakan ukuran file tersebut. <hr> <strong>Contoh:</strong> Laporan Eksekutif (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'Tautan memiliki teks yang sama dengan tautan lain, meskipun mengarah ke halaman yang berbeda. Beberapa tautan dengan teks yang sama dapat menyebabkan kebingungan bagi orang yang menggunakan pembaca layar. <strong>Pertimbangkan untuk membuat tautan berikut ini lebih deskriptif untuk membantu membedakannya dari tautan lain.</strong> <hr> <strong {B}>Nama yang dapat diakses</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Gambar digunakan sebagai tautan dengan teks di sekitarnya, meskipun atribut alt harus ditandai sebagai dekoratif atau nol.',
      MISSING_ALT_LINK: 'Gambar digunakan sebagai tautan tetapi tidak memiliki teks alt! Pastikan teks alt menjelaskan ke mana tautan tersebut membawa Anda.',
      MISSING_ALT: 'Teks alt yang hilang! Jika gambar menyampaikan suatu cerita, suasana hati, atau informasi penting - pastikan untuk mendeskripsikan gambar tersebut.',
      LINK_ALT_FILE_EXT: 'Teks alternatif tidak boleh menyertakan ekstensi file atau dimensi gambar. Pastikan teks alt menjelaskan tujuan tautan, bukan deskripsi harfiah dari gambar. Hapus: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Teks alt non-deskripsi atau placeholder dalam gambar yang ditautkan ditemukan. Pastikan teks alt mendeskripsikan tujuan tautan, bukan deskripsi harfiah gambar. Ganti teks alt berikut ini. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Teknologi bantuan sudah menunjukkan bahwa ini adalah gambar, jadi &quot;<strong {C}>%(ERROR)</strong>&quot; mungkin berlebihan. Pastikan teks alt menjelaskan tujuan tautan, bukan deskripsi harfiah dari gambar. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Teks alternatif tidak boleh menyertakan ekstensi file atau dimensi gambar. Jika gambar menyampaikan cerita, suasana hati, atau informasi penting - pastikan untuk mendeskripsikan gambar. Hapus: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Teks alt non-deskripsi atau placeholder ditemukan. Ganti teks alt berikut dengan sesuatu yang lebih bermakna. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Teknologi bantuan sudah menunjukkan bahwa ini adalah gambar, jadi &quot;<strong {C}>%(ERROR)</strong>&quot; mungkin berlebihan. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Gambar di dalam tautan ditandai sebagai dekoratif dan tidak ada teks tautan. Tambahkan teks alt ke gambar yang menjelaskan tujuan tautan.',
      LINK_IMAGE_TEXT: 'Gambar ditandai sebagai dekoratif, meskipun tautannya menggunakan teks di sekelilingnya sebagai label deskriptif.',
      LINK_IMAGE_LONG_ALT: 'Deskripsi teks alt pada gambar yang ditautkan terlalu panjang. Teks alt pada gambar yang ditautkan harus menjelaskan ke mana tautan tersebut membawa Anda, bukan deskripsi harfiah dari gambar tersebut. <strong>Pertimbangkan untuk menggunakan judul halaman yang ditautkan sebagai teks alt.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Karakter</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Tautan gambar berisi teks alt. <strong>Apakah teks alt menjelaskan ke mana tautan tersebut membawa Anda?</strong> Pertimbangkan untuk menggunakan judul halaman yang ditautkan sebagai teks alt. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Tautan gambar berisi <strong>teks alt dan teks tautan di sekitarnya.</strong> Jika gambar ini bersifat dekoratif dan digunakan sebagai tautan fungsional ke halaman lain, pertimbangkan untuk menandai gambar tersebut sebagai dekoratif atau nol - teks tautan di sekitarnya sudah cukup. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Nama yang dapat diakses</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Gambar ditandai sebagai <strong>dekoratif</strong> dan akan diabaikan oleh teknologi bantuan. <hr> Meskipun <strong>caption</strong> disediakan, gambar juga harus memiliki teks alt dalam banyak kasus. <ul><li>Teks alt harus memberikan deskripsi ringkas tentang apa yang ada di dalam gambar.</li><li>Teks keterangan biasanya harus memberikan konteks untuk menghubungkan gambar kembali ke konten di sekitarnya, atau memberikan perhatian pada bagian informasi tertentu.</li></ul> Pelajari lebih lanjut: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus keterangan gambar.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Jangan gunakan kata-kata yang sama persis untuk teks alt dan teks keterangan. Pembaca layar akan mengumumkan informasi tersebut dua kali. <ul><li>Teks alt harus memberikan deskripsi ringkas tentang apa yang ada dalam gambar.</li><li>Teks keterangan biasanya harus memberikan konteks untuk menghubungkan gambar kembali ke konten di sekitarnya, atau memberikan perhatian pada bagian informasi tertentu.</li></ul> Pelajari lebih lanjut: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus keterangan gambar.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Gambar ditandai sebagai <strong>dekoratif</strong> dan akan diabaikan oleh teknologi bantuan. Jika gambar menyampaikan cerita, suasana hati, atau informasi penting - pastikan untuk menambahkan teks alternatif.',
      IMAGE_DECORATIVE_CAROUSEL: 'Gambar ditandai sebagai dekoratif, tetapi semua gambar di carousel atau galeri harus menyertakan teks alt deskriptif untuk memastikan pengalaman yang setara bagi semua orang.',
      IMAGE_ALT_TOO_LONG: 'Deskripsi teks alt terlalu panjang. Teks alt harus ringkas, namun bermakna seperti <em>tweet</em> (sekitar 100 karakter). Jika ini adalah gambar yang rumit atau grafik, pertimbangkan untuk meletakkan deskripsi gambar yang panjang dalam teks di bawah ini atau komponen akordeon. <hr> {ALT} <strong {B}>%(altLength) Karakter</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'Tombol gambar tidak memiliki teks alt. Tambahkan teks alt untuk memberikan nama yang dapat diakses. Sebagai contoh: <em>Cari</em> atau <em>Kirim</em>.',
      LABELS_INPUT_RESET: 'Tombol Reset sebaiknya <strong>tidak</strong> digunakan kecuali jika secara khusus diperlukan karena mudah diaktifkan secara tidak sengaja. <hr> <strong>Tip!</strong> Pelajari mengapa tombol <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset dan Batal menimbulkan masalah dalam hal kegunaan.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Input memiliki nama yang dapat diakses, meskipun pastikan ada label yang terlihat juga. <hr> <strong {B}>Nama yang dapat diakses</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Tidak ada label yang terkait dengan input ini. Tambahkan atribut <code>untuk</code> ke label yang sesuai dengan <code>id</code> input ini. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Tidak ada label yang terkait dengan input ini. Tambahkan <code>id</code> ke input ini, dan tambahkan atribut <code>untuk</code> yang sesuai ke label.',
      LABELS_PLACEHOLDER: 'Teks placeholder yang menghilang menyulitkan orang untuk mengingat informasi apa yang harus ada di dalam kolom dan untuk mengidentifikasi serta memperbaiki masalah validasi. Sebagai gantinya, pertimbangkan untuk menggunakan petunjuk yang selalu terlihat sebelum kolom formulir. <hr> Pelajari lebih lanjut: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Placeholder di kolom formulir itu berbahaya.</a>',

      // Embedded content
      EMBED_VIDEO: 'Pastikan <strong>semua video memiliki teks tertutup.</strong> Menyediakan teks untuk semua konten audio dan video adalah persyaratan Level A wajib. Teks mendukung orang-orang yang tuli atau sulit mendengar.',
      EMBED_AUDIO: 'Pastikan untuk menyediakan <strong>transkrip untuk semua podcast.</strong> Menyediakan transkrip untuk konten audio adalah persyaratan Level A wajib. Transkrip membantu orang-orang yang tuli atau sulit mendengar, tetapi dapat bermanfaat bagi semua orang. Pertimbangkan untuk menempatkan transkrip di bawah atau di dalam panel akordeon.',
      EMBED_DATA_VIZ: 'Widget visualisasi data seperti ini sering menjadi masalah bagi orang yang menggunakan keyboard atau pembaca layar untuk menavigasi, dan dapat menimbulkan kesulitan yang signifikan bagi orang yang memiliki penglihatan rendah atau buta warna. Disarankan untuk memberikan informasi yang sama dalam format alternatif (teks atau tabel) di bawah widget. <hr> Pelajari lebih lanjut tentang <a href="https://www.w3.org/WAI/tutorials/images/complex">gambar kompleks.</a>',
      EMBED_MISSING_TITLE: 'Konten yang disematkan memerlukan nama yang dapat diakses yang menjelaskan isinya. Berikan atribut <code>judul</code> atau <code>label-aria</code> yang unik pada elemen <code>iframe</code>. Pelajari lebih lanjut tentang <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Tidak dapat memeriksa konten yang disematkan. Pastikan gambar memiliki teks alt, video memiliki keterangan, teks memiliki kontras yang cukup, dan komponen interaktif dapat diakses menggunakan keyboard. Pelajari lebih lanjut tentang <a href="https://webaim.org/techniques/keyboard/">aksesibilitas keyboard.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> dengan elemen yang tidak dapat difokuskan seharusnya tidak memiliki <code>tabindex="-1"</code>. Konten yang disematkan tidak akan dapat diakses menggunakan keyboard.',

      // QA
      QA_BAD_LINK: 'Tautan buruk ditemukan. Tautan yang muncul mengarah ke lingkungan pengembangan. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Tautan dalam halaman rusak. Tujuan tautan tidak cocok dengan elemen apa pun di halaman ini.',
      QA_STRONG_ITALICS: 'Tag cetak tebal dan miring memiliki makna semantik, dan tidak boleh digunakan untuk menyorot seluruh paragraf. Teks yang dicetak tebal harus digunakan untuk memberikan <strong>penekanan</strong> yang kuat pada sebuah kata atau frasa. Huruf miring harus digunakan untuk menyoroti nama diri (misalnya judul buku dan artikel), kata-kata asing, kutipan. Kutipan panjang harus diformat sebagai kutipan blok.',
      QA_PDF: 'Tidak dapat memeriksa aksesibilitas PDF. PDF dianggap sebagai konten web dan harus dapat diakses juga. PDF sering kali mengandung masalah bagi orang yang menggunakan pembaca layar (tag struktural yang hilang atau label bidang formulir yang hilang) dan orang yang memiliki penglihatan rendah (teks tidak dapat dilihat ketika diperbesar). <ul><li>Jika ini adalah formulir, pertimbangkan untuk menggunakan formulir HTML yang dapat diakses sebagai alternatif.</li><li>Jika ini adalah dokumen, pertimbangkan untuk mengonversinya menjadi halaman web.</li></ul> Jika tidak, periksa <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF untuk aksesibilitas di Acrobat DC.</a>',
      QA_DOCUMENT: 'Tidak dapat memeriksa aksesibilitas dokumen. Dokumen yang ditautkan dianggap sebagai konten web dan harus dapat diakses juga. Silakan tinjau dokumen ini secara manual. <ul><li>Buat dokumen atau presentasi <a href="https://support.google.com/docs/answer/6199477?hl=id">Google Workspace Anda lebih mudah diakses.</a></li><li>Buat dokumen <a href="https://support.microsoft.com/id/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office Anda lebih mudah diakses.</a></li></ul>',
      QA_BLOCKQUOTE: 'Apakah ini sebuah judul? <strong {C}>%(TEXT)</strong> <hr> Kutipan blok harus digunakan hanya untuk kutipan. Jika ini dimaksudkan sebagai judul, ubahlah tanda kutip blok ini menjadi judul semantik (misalnya Judul 2 atau Judul 3).',
      QA_FAKE_HEADING: 'Apakah ini sebuah judul? <strong {C}>%(TEXT)</strong> <hr> Sebaris teks yang dicetak tebal atau besar mungkin terlihat seperti judul, namun seseorang yang menggunakan pembaca layar tidak dapat mengetahui bahwa teks tersebut penting atau langsung menuju ke isinya. Teks yang dicetak tebal atau besar tidak boleh menggantikan judul semantik (Judul 2 hingga Judul 6).',
      QA_FAKE_LIST: 'Apakah Anda mencoba membuat daftar? Item daftar yang mungkin ditemukan: <strong {C}>%(firstPrefix)</strong> <hr> Pastikan untuk menggunakan daftar semantik dengan menggunakan tombol pemformatan poin atau angka. Saat menggunakan daftar semantik, teknologi bantuan dapat menyampaikan informasi seperti jumlah total item dan posisi relatif setiap item dalam daftar. Pelajari lebih lanjut tentang <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">daftar semantik.</a>',
      QA_UPPERCASE: 'Ditemukan semua huruf besar. Beberapa pembaca layar mungkin menafsirkan teks huruf besar semua sebagai akronim dan akan membaca setiap huruf satu per satu. Selain itu, beberapa orang menganggap huruf besar lebih sulit dibaca dan mungkin memberikan kesan berteriak.',
      QA_UNDERLINE: 'Teks yang digarisbawahi dapat membingungkan dengan tautan. Pertimbangkan untuk menggunakan gaya yang berbeda seperti <code>&lt;strong&gt;</code><strong>kepentingan yang kuat</strong><code>&lt;/strong&gt;</code> atau <code>&lt;em&gt;</code><em>penekanan</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Opsi pemformatan subskrip dan superskrip hanya boleh digunakan untuk mengubah posisi teks untuk konvensi atau standar tipografi. Opsi ini tidak boleh <strong>tidak</strong> digunakan hanya untuk tujuan presentasi atau penampilan. Memformat seluruh kalimat dapat menimbulkan masalah keterbacaan. Kasus penggunaan yang tepat akan mencakup menampilkan eksponen, angka ordinal seperti 4<sup>th</sup>, bukan keempat, dan rumus kimia (misalnya H<sup>2</sup>O).',
      QA_NESTED_COMPONENTS: 'Hindari menempatkan komponen tata letak interaktif yang bersarang, seperti menempatkan akordeon di dalam tab atau tab di dalam akordeon. Ini dapat mempersulit navigasi, meningkatkan beban kognitif, dan menyebabkan orang mengabaikan konten.',
      QA_JUSTIFY: 'Hindari penggunaan teks rata kanan-kiri, yang sejajar dengan margin kiri dan kanan. Ini bisa sulit dibaca oleh beberapa orang karena spasi antar kata yang tidak merata. Gunakan teks rata kiri untuk keterbacaan yang lebih baik.',
      QA_SMALL_TEXT: 'Teks kecil lebih sulit dibaca, terutama bagi mereka yang memiliki penglihatan rendah. Untuk memastikan keterbacaan yang lebih baik, hindari menggunakan ukuran font yang lebih kecil dari ukuran default.',

      // Shared
      ACC_NAME: '<strong {B}>Nama yang dapat diakses</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Tips!</strong> "Nama yang dapat diakses" adalah label akhir yang dikomunikasikan kepada orang-orang yang menggunakan teknologi bantuan dan dihitung oleh ARIA. Ini membantu mereka memahami tujuan tautan atau tombol.',
      HIDDEN_FOCUSABLE: 'Tautan atau tombol memiliki <code>aria-hidden=&quot;true&quot;</code> namun masih bisa difokuskan melalui keyboard. Jika Anda berniat untuk menyembunyikan tautan atau tombol duplikat, tambahkan juga <code>tabindex=&quot;-1&quot;</code>. Jika tidak, <code>aria-hidden=&quot;true&quot;</code> tidak boleh digunakan pada elemen yang bisa menerima fokus. <hr> Pelajari lebih lanjut tentang <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">atribut aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'Ditemukan <strong>duplikat ID</strong>. Kesalahan ID duplikat diketahui dapat menyebabkan masalah pada teknologi bantuan saat mencoba berinteraksi dengan konten. Harap hapus atau ubah ID berikut ini. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Semua item daftar <code>&lt;li&gt;</code> harus diletakkan di dalam elemen <code>&lt;ul&gt;</code> yang tidak terurut atau <code>&lt;ol&gt;</code> yang terurut. Struktur ini membantu pembaca layar mengumumkan daftar dan item-itemnya dengan akurat.',
      TABINDEX_ATTR: 'Elemen tidak boleh memiliki atribut <code>tabindex</code> yang lebih besar dari 0.',

      // Meta checks
      META_LANG: 'Bahasa halaman tidak dideklarasikan! Silakan <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarasikan bahasa pada tag HTML.</a>',
      META_TITLE: 'Judul halaman tidak ada! Harap berikan <a href="https://developer.mozilla.org/id/docs/Web/HTML/Element/title">judul halaman.</a>',
      META_SCALABLE: 'Hapus parameter <code>user-scalable="no"</code> dalam <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">tag meta viewport</a> untuk memungkinkan zoom.',
      META_MAX: 'Pastikan parameter <code>maximum-scale</code> dalam <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">tag meta viewport</a> tidak kurang dari 2.',
      META_REFRESH: 'Halaman seharusnya tidak menyegarkan secara otomatis menggunakan tag meta.',

      // Buttons
      BTN_EMPTY: 'Tombol tidak memiliki nama aksesibel yang menjelaskan tujuannya.',
      BTN_EMPTY_LABELLEDBY: 'Tombol memiliki nilai <code>aria-labelledby</code> yang kosong atau tidak sesuai dengan nilai <code>id</code> dari elemen lain di halaman.',
      BTN: 'tombol',
      BTN_TIP: 'Pelajari cara membuat <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">tombol aksesibel.</a>',
      BTN_ROLE_IN_NAME: 'Jangan sertakan kata "tombol" dalam nama tombol. Pembaca layar sudah menyampaikan peran elemen selain namanya.',
      LABEL_IN_NAME: 'Teks yang terlihat untuk elemen ini tampaknya berbeda dari nama aksesibel, yang dapat menyebabkan kebingungan bagi pengguna teknologi bantuan. Harap periksa: <hr> <strong {B}>Nama Aksesibel</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Header tabel yang hilang! Tabel yang dapat diakses membutuhkan markup HTML yang menunjukkan sel header dan sel data yang mendefinisikan hubungannya. Informasi ini memberikan konteks kepada orang yang menggunakan teknologi bantu. Tabel harus digunakan hanya untuk data tabular. <hr> Pelajari lebih lanjut tentang <a href="https://www.w3.org/WAI/tutorials/tables/">tabel yang dapat diakses.</a>',
      TABLES_SEMANTIC_HEADING: 'Judul semantik seperti Heading 2 atau Heading 3 hanya boleh digunakan untuk bagian konten; <strong>tidak</strong> dalam tabel HTML. Tunjukkan judul tabel dengan menggunakan elemen <code>&lt;th&gt;</code>. <hr> Pelajari lebih lanjut tentang <a href="https://www.w3.org/WAI/tutorials/tables/">tabel yang dapat diakses.</a>',
      TABLES_EMPTY_HEADING: 'Header tabel kosong ditemukan! Header tabel tidak boleh kosong. Penting untuk menentukan header baris dan/atau kolom untuk menyampaikan hubungan mereka. Informasi ini memberikan konteks kepada orang-orang yang menggunakan teknologi bantu. Harap diingat bahwa tabel harus digunakan hanya untuk data tabular. <hr> Pelajari lebih lanjut tentang <a href="https://www.w3.org/WAI/tutorials/tables/">tabel yang dapat diakses.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Teks ukuran normal harus memiliki rasio kontras setidaknya %(RATIO).',
      CONTRAST_LARGE: 'Teks ukuran besar harus memiliki rasio kontras setidaknya %(RATIO).',
      CONTRAST_ERROR: 'Teks tidak memiliki kontras yang cukup dengan latar belakang, sehingga sulit untuk dibaca.',
      CONTRAST_WARNING: 'Kontras teks ini tidak diketahui dan harus ditinjau secara manual. Pastikan teks dan latar belakang memiliki perbedaan warna yang kuat.',
      CONTRAST_ERROR_GRAPHIC: 'Grafik tidak memiliki kontras yang cukup dengan latar belakang, sehingga sulit untuk dilihat.',
      CONTRAST_WARNING_GRAPHIC: 'Kontras grafik ini tidak diketahui dan harus ditinjau secara manual.',
      CONTRAST_TIP_GRAPHIC: 'Grafik dan elemen antarmuka pengguna harus memiliki rasio kontras minimal 3:1.',
      CONTRAST_OPACITY: 'Tingkatkan opasitas untuk visibilitas yang lebih baik.',
      CONTRAST_APCA: 'Kontras ini tidak cukup untuk ukuran teks apa pun. Apakah Anda ingin menggunakan kombinasi warna dan ukuran teks ini?',
      CONTRAST_COLOR: 'Apakah Anda ingin menggunakan warna ini sebagai gantinya?',
      CONTRAST_SIZE: 'Apakah Anda ingin memperbesar ukuran teks untuk kombinasi warna ini?',
      CONTRAST_PLACEHOLDER: 'Teks placeholder dalam input ini tidak memiliki kontras yang cukup dengan latar belakang, sehingga sulit dibaca.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Kontras dari teks placeholder ini tidak diketahui dan perlu ditinjau secara manual. Pastikan teks dan latar belakang memiliki warna yang sangat kontras.',
      CONTRAST_INPUT: 'Teks dalam input ini tidak memiliki kontras yang cukup dengan latar belakang, sehingga sulit dibaca.',
      CONTRAST: 'Kontras',
      UNKNOWN: 'Tidak diketahui',
      FG: 'Latar depan',
      BG: 'Latar belakang',
      NO_SUGGESTION: 'Tidak ada kombinasi aksesibel yang dapat ditemukan dengan hanya mengubah warna teks. Coba ubah warna latar belakang.',
    },
  };

  return id;

}));
