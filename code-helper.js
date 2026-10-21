/* ==========================================================================
   G.T DEV - Code Helper & Interactive Navigation Engine
   Designed for Students & Developers
   ========================================================================== */

// 1. Universal Copy Code to Clipboard (Supports file://, localhost & HTTPS)
function copyCodeSnippet(button) {
    if (!button) return;
    var wrapper = button.closest('.code-box-wrapper') || button.closest('.code-explainer-card');
    if (!wrapper) return;
    var codeElement = wrapper.querySelector('code');
    if (!codeElement) return;

    var textToCopy = codeElement.innerText || codeElement.textContent;

    function showSuccess() {
        var originalText = button.getAttribute('data-orig-text');
        if (!originalText) {
            originalText = button.innerHTML;
            button.setAttribute('data-orig-text', originalText);
        }
        button.innerHTML = '✔ Αντιγράφηκε!';
        button.classList.add('copied');
        setTimeout(function() {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(showSuccess).catch(function() {
            fallbackCopyText(textToCopy, showSuccess);
        });
    } else {
        fallbackCopyText(textToCopy, showSuccess);
    }
}

function fallbackCopyText(text, callback) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.warn('G.T DEV Copy warning:', err);
    }
    document.body.removeChild(textarea);
    if (callback) {
        callback();
    }
}

// 2. Smooth Scroll to Code Explainer Card
function scrollToCodeExplainer() {
    var card = document.querySelector('.code-explainer-card');
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 3. Auto-inject G.T DEV Sticky Topbar and Live Preview Banner
document.addEventListener('DOMContentLoaded', function() {
    // Check if we are inside an exercise page
    var isExercise = !!document.querySelector('.code-explainer-card') || /chapter-\d+/i.test(window.location.pathname);
    
    if (isExercise && !document.querySelector('.gtdev-topbar')) {
        // Parse Chapter Number from URL
        var path = window.location.pathname.replace(/\\/g, '/');
        var chapterMatch = path.match(/chapter-(\d+)/i);
        var chapterNum = chapterMatch ? parseInt(chapterMatch[1], 10) : '';
        var chapterTag = chapterNum ? 'Κεφάλαιο ' + (chapterNum < 10 ? '0' + chapterNum : chapterNum) : 'HTML & CSS';
        var pageTitle = document.title || 'Παράδειγμα';

        // Create Sticky Topbar
        var topbar = document.createElement('header');
        topbar.className = 'gtdev-topbar';
        topbar.innerHTML = [
            '<div class="gtdev-brand">',
            '    <a href="../index.html" class="gtdev-logo-pill" title="Επιστροφή στην Αρχική Πύλη G.T DEV">G.T DEV</a>',
            '    <span class="gtdev-platform-title">Learning Suite</span>',
            '    <span class="gtdev-divider">/</span>',
            '    <span class="gtdev-chapter-tag">' + chapterTag + '</span>',
            '</div>',
            '<div class="gtdev-center-info">',
            '    <span class="gtdev-page-title">' + pageTitle + '</span>',
            '</div>',
            '<div class="gtdev-topbar-actions">',
            '    <button class="gtdev-action-btn" onclick="scrollToCodeExplainer()" title="Μετάβαση στον κώδικα">',
            '        <span>💻</span> Κώδικας &amp; Οδηγός',
            '    </button>',
            '    <a href="../index.html" class="gtdev-back-btn" title="Επιστροφή στον Πίνακα Περιεχομένων">',
            '        <span>⬅</span> Όλα τα Κεφάλαια',
            '    </a>',
            '</div>'
        ].join('');

        // Prepend to body
        document.body.prepend(topbar);

        // Add Live Preview Banner right below topbar
        var previewBanner = document.createElement('div');
        previewBanner.className = 'gtdev-preview-banner';
        previewBanner.innerHTML = [
            '<span class="gtdev-preview-badge"><span>👁️</span> Ζωντανή Προεπισκόπηση Παραδείγματος</span>',
            '<span>Εκπαιδευτικό Περιβάλλον G.T DEV</span>'
        ].join('');

        topbar.insertAdjacentElement('afterend', previewBanner);

        // Add Floating Action Button for easy navigation
        var fab = document.createElement('button');
        fab.className = 'gtdev-floating-btn';
        fab.innerHTML = '<span>💻</span> Κώδικας';
        fab.title = 'Μετάβαση στον Πηγαίο Κώδικα & Οδηγό';
        fab.onclick = scrollToCodeExplainer;
        document.body.appendChild(fab);
    }
});
