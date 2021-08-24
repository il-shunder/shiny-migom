let headerBurger = document.querySelector('.header__burger');
let headerNav = document.querySelector('.header-top__nav');
let navLinks = document.querySelectorAll('.header-top__link');

if (headerBurger && navLinks) {
    headerBurger.addEventListener('click', () => {
        headerBurger.classList.toggle('active');
        document.body.classList.toggle('body-lock');
        headerNav.classList.toggle('active');
    });

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', (e) => {
            headerBurger.classList.remove('active');
            document.body.classList.remove('body-lock');
            headerNav.classList.remove('active');
        });
    }
}

let rangeSlider = document.querySelector('.prices__range');
if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [1],
        behaviour: 'snap',
        step: 1,
        range: {
            min: [1],
            max: [7],
        },
    });

    rangeItemWidth(rangeSlider);

    function rangeItemWidth(rangeName) {
        let width = rangeName.offsetWidth + 60;
        let itemCount = parseInt(rangeName.querySelector('.noUi-handle').getAttribute('aria-valuemax'));
        let items = rangeSlider.querySelectorAll('.prices-range__item');
        items = Array.prototype.slice.call(items);

        for (let i = 0; i < items.length; i++) {
            items[i].style.width = width / itemCount + 'px';
        }
    }

    rangeSlider.noUiSlider.on('update', function (values) {
        let id = parseInt(values);
        let items = rangeSlider.querySelectorAll('.prices-range__item');
        items = Array.prototype.slice.call(items);

        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('active')) {
                items[i].classList.remove('active');
            }
        }
        items[id - 1].classList.add('active');
    });
}

let pricesSelect = document.querySelector('.prices-select');

if (pricesSelect) {
    let pricesSelectMain = pricesSelect.querySelector('.prices-select__main');
    pricesSelectMain.addEventListener('click', () => {
        pricesSelect.classList.toggle('active');
    });

    let pricesSelectItems = pricesSelect.querySelectorAll('.prices-select__item');
    pricesSelectItems.forEach((el) => {
        el.addEventListener('click', () => {
            let text = el.textContent.trim();
            let id = el.getAttribute('data-id');

            pricesSelectMain.setAttribute('data-main', id);
            pricesSelectMain.querySelector('span').textContent = text;

            pricesSelectItems.forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            el.classList.add('active');

            pricesSelect.classList.remove('active');
        });
    });
}

document.body.addEventListener('click', (e) => {
    if (pricesSelect.classList.contains('active')) {
        if (!e.target.closest('.prices-select')) {
            pricesSelect.classList.remove('active');
        }
    }
});

let reviewsItem = document.querySelectorAll('.reviews__item');
if (reviewsItem.length > 0) {
    reviewsItem.forEach((el) => {
        let video = el.querySelector('video');
        let playBtn = el.querySelector('.reviews__play');

        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        video.addEventListener('click', (e) => {
            e.preventDefault();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            video.controls = true;
        });
        video.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            video.controls = true;
        });
        video.addEventListener('play', (e) => {
            playBtn.classList.remove('active');
            video.addEventListener('mouseover', (e) => {
                video.controls = true;
            });
            video.addEventListener('mouseout', (e) => {
                if (e.relatedTarget && !e.relatedTarget.closest('.reviews__play')) {
                    playBtn.classList.remove('active');
                }
            });
        });
        video.addEventListener('pause', (e) => {
            playBtn.classList.add('active');
            video.addEventListener('mouseout', (e) => {
                playBtn.classList.add('active');
                if (e.relatedTarget && !e.relatedTarget.closest('.reviews__play')) {
                    video.controls = false;
                }
            });
        });
        video.addEventListener('ended', (e) => {
            playBtn.classList.add('active');
            video.addEventListener('mouseout', (e) => {
                if (e.relatedTarget && !e.relatedTarget.closest('.reviews__play')) {
                    video.controls = false;
                }
            });
        });
    });
}

window.addEventListener(`resize`, (e) => {
    if (document.body.offsetWidth > 768) {
        rangeItemWidth(rangeSlider);
    }
});

window.addEventListener(`click, mouseover`, (e) => {
    console.log(1);
});

const animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
                animItem.classList.add('anim');
            } else {
                if (!animItem.classList.contains('anim-no-repeat')) {
                    animItem.classList.remove('anim');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}

const scrollLinks = document.querySelectorAll('a[href*="#"]');

if (scrollLinks.length > 0) {
    for (let i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', function (e) {
            e.preventDefault();

            const scrollID = scrollLinks[i].getAttribute('href').substr(1);
            if (scrollID.length > 0) {
                const scrollTarget = document.getElementById(scrollID);

                const scrollTopOffset = 100;
                const scrollElementPosition = scrollTarget.getBoundingClientRect().top;
                const scrollOffsetPosition = scrollElementPosition - scrollTopOffset;

                if (scrollLinks[i].classList.contains('.header-top__link')) {
                    headerBurger.classList.remove('active');
                    document.body.classList.remove('body-lock');
                    headerNav.classList.remove('active');
                }

                window.scrollBy({
                    top: scrollOffsetPosition,
                    behavior: 'smooth',
                });
            }
        });
    }
}
