        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
        const iconOpen = document.getElementById('icon-open');
        const iconClose = document.getElementById('icon-close');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        function openSidebar() {
            mobileMenu.classList.add('is-open');
            mobileBackdrop.classList.add('is-open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileBackdrop.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
            iconOpen.classList.add('hidden');
            iconClose.classList.remove('hidden');
            document.body.classList.add('sidebar-open');
        }

        function closeSidebar() {
            mobileMenu.classList.remove('is-open');
            mobileBackdrop.classList.remove('is-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileBackdrop.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
            document.body.classList.remove('sidebar-open');
        }

        menuToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        menuClose.addEventListener('click', closeSidebar);
        mobileBackdrop.addEventListener('click', closeSidebar);
        mobileNavLinks.forEach((link) => link.addEventListener('click', closeSidebar));
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSidebar();
        });

        // Contact form — client-side submit feedback
        (function initContactForm() {
            const form = document.getElementById('contact-form');
            const success = document.getElementById('contact-success');
            if (!form || !success) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                success.classList.add('is-visible');
                form.reset();
                success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        })();

        // Typed headline animation
        (function initTypedHero() {
            const el = document.getElementById('typed-hero');
            if (!el) return;

            const phrases = [
                'Control your waitlist.',
                'Seat guests faster.',
                'Reduce walk-outs.',
                'Run a smarter floor.',
                'Track every customer.',
                'Own peak hours.'
            ];

            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typeSpeed = 55;
            const deleteSpeed = 32;
            const pauseEnd = 2200;
            const pauseStart = 400;

            function tick() {
                const current = phrases[phraseIndex];

                if (!isDeleting) {
                    el.textContent = current.substring(0, charIndex + 1);
                    charIndex++;

                    if (charIndex === current.length) {
                        isDeleting = true;
                        setTimeout(tick, pauseEnd);
                        return;
                    }
                    setTimeout(tick, typeSpeed);
                } else {
                    el.textContent = current.substring(0, charIndex - 1);
                    charIndex--;

                    if (charIndex === 0) {
                        isDeleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                        setTimeout(tick, pauseStart);
                        return;
                    }
                    setTimeout(tick, deleteSpeed);
                }
            }

            tick();
        })();

        // App showcase — scroll-triggered entrance + float
        (function initAppsShowcase() {
            const section = document.getElementById('how-it-works');
            if (!section) return;

            const reveal = () => section.classList.add('is-visible');

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                reveal();
                return;
            }

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            reveal();
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
                observer.observe(section);
            } else {
                reveal();
            }
        })();

        // Features section — scroll reveal
        (function initFeaturesSection() {
            const section = document.getElementById('features');
            if (!section) return;

            const reveal = () => section.classList.add('is-visible');

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                reveal();
                return;
            }

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            reveal();
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
                observer.observe(section);
            } else {
                reveal();
            }
        })();

        // Animated queue — 7 visible, infinite continuous flow
        (function initQueueAnimation() {
            const list = document.getElementById('queue-list');
            const countEl = document.getElementById('queue-waiting-count');
            if (!list) return;

            const VISIBLE = 7;
            const NAMES = [
                'Aisha K.', 'Marco R.', 'Priya S.', 'James L.', 'Sofia M.',
                'David T.', 'Nina P.', 'Omar H.', 'Ella W.', 'Ryan C.',
                'Meera V.', 'Lucas B.', 'Zara N.', 'Chris D.', 'Anya G.',
                'Tom H.', 'Lily F.', 'Raj P.', 'Emma S.', 'Noah B.',
                'Ivy T.', 'Kai M.', 'Leah S.', 'Mason W.', 'Nora L.'
            ];
            const PARTIES = [2, 2, 3, 4, 2, 5, 3, 2, 4, 3];
            const WAITS = ['~6m', '~8m', '~10m', '~12m', '~15m', '~18m', '~21m', '~24m', '~27m'];

            let ticketNum = 111;
            let nameIdx = 7;
            let totalInQueue = 18;
            let animating = false;

            const initial = [
                { name: 'Aisha K.', party: 2, ticket: 105, wait: '~6m' },
                { name: 'Marco R.', party: 4, ticket: 106, wait: '~8m' },
                { name: 'Priya S.', party: 3, ticket: 107, wait: '~10m' },
                { name: 'James L.', party: 2, ticket: 108, wait: '~12m' },
                { name: 'Sofia M.', party: 3, ticket: 109, wait: '~15m' },
                { name: 'David T.', party: 4, ticket: 110, wait: '~18m' },
                { name: 'Nina P.', party: 2, ticket: 111, wait: '~21m' },
            ];

            function updateCount() {
                if (countEl) countEl.textContent = String(totalInQueue);
            }

            function nextGuest() {
                const name = NAMES[nameIdx % NAMES.length];
                const party = PARTIES[nameIdx % PARTIES.length];
                nameIdx++;
                ticketNum++;
                return {
                    name,
                    party,
                    ticket: ticketNum,
                    wait: WAITS[Math.floor(Math.random() * WAITS.length)]
                };
            }

            function badgeHtml(position, guest) {
                if (position === 1) {
                    return `<span class="inline-block bg-brand-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Q1</span>
                            <p class="text-[8px] text-emerald-600 font-medium mt-0.5">Serving</p>`;
                }
                if (position === 2) {
                    return `<span class="inline-block bg-brand-ink text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Q2</span>
                            <p class="text-[8px] text-brand-muted mt-0.5">${guest.wait || '~8m'}</p>`;
                }
                const badgeClass = position <= 4 ? 'bg-gray-200 text-brand-ink' : 'bg-gray-100 text-brand-muted';
                return `<span class="inline-block ${badgeClass} text-[8px] font-bold px-1.5 py-0.5 rounded-full">Q${position}</span>
                        <p class="text-[8px] text-brand-muted mt-0.5">${guest.wait || '~15m'}</p>`;
            }

            function createItem(guest, position) {
                const el = document.createElement('div');
                const serving = position === 1;
                el.className = 'queue-item' + (serving ? ' is-serving' : '');
                const avatarBg = serving ? 'bg-brand-ink text-white' : position <= 3 ? 'bg-gray-200 text-brand-ink' : 'bg-gray-100 text-brand-muted';
                const initials = guest.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

                el.innerHTML = `
                    <div class="queue-avatar ${avatarBg}">${initials}</div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[11px] font-semibold text-brand-ink truncate leading-tight">${guest.name}</p>
                        <p class="text-[8px] text-brand-muted truncate">Party of ${guest.party} · #Q-${guest.ticket}</p>
                    </div>
                    <div class="text-right shrink-0">${badgeHtml(position, guest)}</div>
                `;
                return el;
            }

            function applyFadeLayers() {
                const items = [...list.children];
                const n = items.length;
                items.forEach((el, i) => {
                    el.classList.remove('queue-item-dim', 'queue-item-fade-2', 'queue-item-fade-3');
                    const fromBottom = n - 1 - i;
                    if (fromBottom === 0) el.classList.add('queue-item-fade-3');
                    else if (fromBottom === 1) el.classList.add('queue-item-fade-2');
                    else if (fromBottom === 2) el.classList.add('queue-item-dim');
                });
            }

            function syncQueueUI() {
                const items = [...list.children].slice(0, VISIBLE);
                items.forEach((el, i) => {
                    const pos = i + 1;
                    const guest = queue[i];
                    if (!guest) return;

                    el.classList.toggle('is-serving', pos === 1);
                    const avatar = el.querySelector('.queue-avatar');
                    if (avatar) {
                        avatar.className = 'queue-avatar ' + (pos === 1 ? 'bg-brand-ink text-white' : pos <= 3 ? 'bg-gray-200 text-brand-ink' : 'bg-gray-100 text-brand-muted');
                    }
                    const badge = el.querySelector('.text-right');
                    if (badge) badge.innerHTML = badgeHtml(pos, guest);
                });
                while (list.children.length > VISIBLE) {
                    list.lastElementChild.remove();
                }
                applyFadeLayers();
                updateCount();
            }

            function renderQueue(guests) {
                list.innerHTML = '';
                guests.slice(0, VISIBLE).forEach((g, i) => list.appendChild(createItem(g, i + 1)));
                applyFadeLayers();
                updateCount();
            }

            let queue = initial.map(g => ({ ...g }));

            function wait(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            async function cycleQueue() {
                if (animating || queue.length < 3) return;
                animating = true;

                const first = list.firstElementChild;
                if (!first) { animating = false; return; }

                first.classList.add('is-exiting');
                await wait(450);

                const rectsBefore = [...list.children].map(el => el.getBoundingClientRect());
                first.remove();
                queue.shift();
                totalInQueue = Math.max(12, totalInQueue - 1);

                const remaining = [...list.children];
                const rectsAfter = remaining.map(el => el.getBoundingClientRect());

                remaining.forEach((el, i) => {
                    const dy = rectsBefore[i + 1].top - rectsAfter[i].top;
                    if (Math.abs(dy) > 0.5) {
                        el.style.transform = `translateY(${dy}px)`;
                        el.style.transition = 'none';
                    }
                });

                remaining.forEach(el => {
                    void el.offsetHeight;
                    el.classList.add('is-shifting');
                    el.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    el.style.transform = '';
                });

                await wait(400);

                remaining.forEach(el => {
                    el.classList.remove('is-shifting');
                    el.style.transition = '';
                });

                syncQueueUI();

                const newcomer = nextGuest();
                newcomer.wait = WAITS[Math.floor(Math.random() * 4) + 2];
                queue.push(newcomer);
                totalInQueue += 1;
                if (Math.random() > 0.45) totalInQueue += 1;

                const newEl = createItem(newcomer, queue.length);
                newEl.classList.add('is-entering');
                list.appendChild(newEl);

                while (list.children.length > VISIBLE) list.lastElementChild.remove();
                while (queue.length > VISIBLE) queue.pop();

                applyFadeLayers();
                updateCount();

                await wait(480);
                newEl.classList.remove('is-entering');
                applyFadeLayers();

                animating = false;
            }

            async function streamJoin() {
                if (animating || list.children.length >= VISIBLE) return;
                animating = true;

                const newcomer = nextGuest();
                queue.push(newcomer);
                totalInQueue += 1;

                const newEl = createItem(newcomer, list.children.length + 1);
                newEl.classList.add('is-entering');
                list.appendChild(newEl);
                applyFadeLayers();
                updateCount();

                await wait(500);
                newEl.classList.remove('is-entering');
                applyFadeLayers();
                animating = false;
            }

            renderQueue(queue);
            setInterval(cycleQueue, 2000);
            setInterval(streamJoin, 3200);
        })();
