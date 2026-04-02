// Custom Animated Cursor
(function() {
    'use strict';

    // Check if device supports hover (not a touch device)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Disable custom cursor on touch devices
        document.body.style.cursor = 'auto';
        return;
    }

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) {
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let isHovering = false;
    let isTextInput = false;

    // Clickable elements selector
    const clickableSelectors = [
        'a',
        'button',
        'input[type="submit"]',
        'input[type="button"]',
        'input[type="radio"]',
        'input[type="checkbox"]',
        'label',
        '.btn',
        '.tooltip-icon'
    ].join(', ');

    // Text input selectors
    const textInputSelectors = [
        'input[type="text"]',
        'input[type="email"]',
        'input[type="password"]',
        'input[type="number"]',
        'input[type="tel"]',
        'input[type="url"]',
        'input[type="search"]',
        'textarea'
    ].join(', ');

    // Update mouse position
    function updateMousePosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    // Animate cursor
    function animateCursor() {
        // Smooth follow for dot (faster)
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;

        // Smooth follow for outline (slower, creates trailing effect)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }

    // Handle hover states
    function handleHover(e) {
        const target = e.target;
        const isClickable = target.matches(clickableSelectors) || 
                           target.closest(clickableSelectors);
        const isTextInputElement = target.matches(textInputSelectors);

        if (isTextInputElement && !isTextInput) {
            isTextInput = true;
            cursorDot.classList.add('text-input');
            cursorOutline.classList.add('text-input');
            document.body.style.cursor = 'text';
        } else if (!isTextInputElement && isTextInput) {
            isTextInput = false;
            cursorDot.classList.remove('text-input');
            cursorOutline.classList.remove('text-input');
            document.body.style.cursor = 'none';
        }

        if (isClickable && !isTextInput && !isHovering) {
            isHovering = true;
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        } else if (!isClickable && isHovering) {
            isHovering = false;
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        }
    }

    // Initialize cursor position
    function initCursor() {
        // Set initial position to center of screen
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        dotX = mouseX;
        dotY = mouseY;
        outlineX = mouseX;
        outlineY = mouseY;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
    }

    // Event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousemove', handleHover);
    
    // Handle focus events for text inputs
    document.addEventListener('focusin', function(e) {
        if (e.target.matches(textInputSelectors)) {
            isTextInput = true;
            cursorDot.classList.add('text-input');
            cursorOutline.classList.add('text-input');
            document.body.style.cursor = 'text';
        }
    });

    document.addEventListener('focusout', function(e) {
        if (e.target.matches(textInputSelectors)) {
            isTextInput = false;
            cursorDot.classList.remove('text-input');
            cursorOutline.classList.remove('text-input');
            document.body.style.cursor = 'none';
        }
    });

    // Handle mouse leave
    document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Start animation
    initCursor();
    animateCursor();

    // Ensure cursor is visible on page load
    window.addEventListener('load', function() {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
})();
