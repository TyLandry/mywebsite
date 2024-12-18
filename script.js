document.addEventListener('DOMContentLoaded', () => {

    const applyStyles = (element, styles) => Object.assign(element.style, styles);
    const addHoverEffect = (element, hoverStyle, defaultStyle) => {
        element.addEventListener('mouseover', () => applyStyles(element, hoverStyle));
        element.addEventListener('mouseout', () => applyStyles(element, defaultStyle));
    };
    const toggleVisibility = (selector, eventIn, eventOut, showStyle = 'block', hideStyle = 'none') => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(eventIn, () => (element.style.display = showStyle));
            element.addEventListener(eventOut, () => (element.style.display = hideStyle));
        });
    };

    const buttonContainer = document.createElement('div');
    applyStyles(buttonContainer, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px',
        zIndex: '1000',
    });
    document.body.appendChild(buttonContainer);

    const scrollTopButton = document.createElement('button');
    scrollTopButton.id = 'scroll-top';
    scrollTopButton.textContent = '↑';
    applyStyles(scrollTopButton, {
        padding: '10px 15px',
        fontSize: '1.5rem',
        color: '#fff',
        backgroundColor: '#05445e',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'none',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    });
    addHoverEffect(scrollTopButton, { backgroundColor: '#75e6da' }, { backgroundColor: '#05445e' });
    buttonContainer.appendChild(scrollTopButton);

    // Scroll-to-Top Functionality
    scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        const referenceButton = document.createElement('button');
        referenceButton.id = 'reference-button';
        referenceButton.textContent = 'R';
        applyStyles(referenceButton, {
            padding: '10px 15px',
            fontSize: '1.5rem',
            color: '#fff',
            backgroundColor: '#05445e',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
        });
        addHoverEffect(referenceButton, { backgroundColor: '#75e6da' }, { backgroundColor: '#05445e' });
        buttonContainer.appendChild(referenceButton);

        const referenceSection = document.getElementById('reference-section');
        referenceButton.addEventListener('click', () => {
            referenceSection.style.display = referenceSection.style.display === 'block' ? 'none' : 'block';
        });

        window.addEventListener('scroll', () => {
            const atBottom = window.scrollY + window.innerHeight >= document.documentElement.offsetHeight;
            referenceButton.style.display = atBottom ? 'block' : 'none';
        });
    }

    window.addEventListener('scroll', () => {
        scrollTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    const greetingDiv = document.getElementById('greeting');
    if (greetingDiv) {
        const hours = new Date().getHours();
        const greeting = hours < 12 ? 'Good Morning!' : hours < 18 ? 'Good Afternoon!' : 'Good Evening!';
        applyStyles(greetingDiv, {
            textAlign: 'center',
            fontSize: '1.5rem',
            color: '#05445e',
            marginBottom: '20px',
        });
        greetingDiv.textContent = greeting;
    }

    document.querySelectorAll('.marker').forEach((marker, index) => {
        setTimeout(() => {
            applyStyles(marker, { transform: 'scale(1.3)', transition: 'transform 0.3s ease' });
            setTimeout(() => applyStyles(marker, { transform: 'scale(1)' }), 300);
        }, index * 150);
    });

    document.querySelectorAll('.skills-table tbody tr').forEach(row => {
        row.addEventListener('mouseenter', () => (row.style.background = '#cce7ea'));
        row.addEventListener('mouseleave', () => (row.style.background = ''));
    });

    toggleVisibility('#html-elements li .example', 'mouseover', 'mouseout');

    document.querySelectorAll('.social-icon').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            alert(`You are being redirected to my ${event.target.textContent} profile. Coming Soon!`);
        });
    });

    const adminMode = false; // Set to true for admin
    const adminNotesDiv = document.getElementById('admin-notes');
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
    const saveNoteButton = document.getElementById('save-note');

    if (adminMode && adminNotesDiv) {
        adminNotesDiv.style.display = 'block';
        const loadNotes = () => {
            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            notesList.innerHTML = '';
            savedNotes.forEach(note => {
                const noteItem = document.createElement('li');
                noteItem.textContent = note;
                notesList.appendChild(noteItem);
            });
        };

        saveNoteButton.addEventListener('click', () => {
            const noteText = noteInput.value.trim();
            if (noteText) {
                const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
                savedNotes.push(noteText);
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                noteInput.value = '';
                loadNotes();
            }
        });

        loadNotes();
    }
});
