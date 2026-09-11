const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navDropdowns = [...document.querySelectorAll('.nav-dropdown')];

function closeDropdowns(except = null) {
  navDropdowns.forEach((dropdown) => {
    if (dropdown === except) return;
    dropdown.classList.remove('open');
    dropdown.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
  });
}

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  closeDropdowns();
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mainNav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
navDropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = !dropdown.classList.contains('open');
    closeDropdowns(dropdown);
    dropdown.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeDropdowns();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDropdowns();
    if (mainNav.classList.contains('open')) closeMenu();
  }
});

const hero = document.querySelector('.hero');
const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroDots = [...document.querySelectorAll('.hero-dot')];
let currentHeroSlide = 0;
let heroTimer;
let slideCleanupTimer;

function scheduleHeroAutoplay() {
  window.clearTimeout(heroTimer);
  heroTimer = window.setTimeout(() => {
    showHeroSlide(currentHeroSlide + 1);
  }, 10000);
}

function showHeroSlide(nextIndex) {
  const normalizedIndex = (nextIndex + heroSlides.length) % heroSlides.length;
  if (normalizedIndex === currentHeroSlide) {
    scheduleHeroAutoplay();
    return;
  }

  window.clearTimeout(slideCleanupTimer);
  const previousSlide = heroSlides[currentHeroSlide];
  const nextSlide = heroSlides[normalizedIndex];

  heroSlides.forEach((slide) => slide.classList.remove('is-leaving'));
  previousSlide.classList.remove('is-active');
  previousSlide.classList.add('is-leaving');
  previousSlide.setAttribute('aria-hidden', 'true');
  nextSlide.classList.add('is-active');
  nextSlide.removeAttribute('aria-hidden');

  heroDots[currentHeroSlide].classList.remove('is-active');
  heroDots[currentHeroSlide].setAttribute('aria-selected', 'false');
  heroDots[normalizedIndex].classList.add('is-active');
  heroDots[normalizedIndex].setAttribute('aria-selected', 'true');

  currentHeroSlide = normalizedIndex;
  slideCleanupTimer = window.setTimeout(() => previousSlide.classList.remove('is-leaving'), 950);
  scheduleHeroAutoplay();
}

heroDots.forEach((dot, index) => dot.addEventListener('click', () => showHeroSlide(index)));
hero?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showHeroSlide(currentHeroSlide - 1);
  if (event.key === 'ArrowRight') showHeroSlide(currentHeroSlide + 1);
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) window.clearTimeout(heroTimer);
  else scheduleHeroAutoplay();
});
scheduleHeroAutoplay();

const videoLaunch = document.querySelector('.video-launch');
videoLaunch?.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube-nocookie.com/embed/cn6TcsENj0U?autoplay=1&rel=0';
  iframe.title = 'Video giới thiệu Trạm Dịch Vụ Toàn Trung';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  videoLaunch.replaceWith(iframe);
});

document.querySelectorAll('.service-accordion-row').forEach((row) => {
  const panels = [...row.querySelectorAll('.service-panel')];

  function activatePanel(activePanel) {
    panels.forEach((panel) => {
      const isActive = panel === activePanel;
      panel.classList.toggle('is-active', isActive);
    });
  }

  panels.forEach((panel) => {
    panel.addEventListener('mouseenter', () => activatePanel(panel));
    panel.addEventListener('focusin', () => activatePanel(panel));
    panel.addEventListener('click', (event) => {
      if (!event.target.closest('a')) activatePanel(panel);
    });
    panel.addEventListener('keydown', (event) => {
      if (event.target.closest('a') || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      activatePanel(panel);
    });
  });
});

const processSteps = [
  {
    heading: 'Tiếp nhận xe & lắng nghe nhu cầu',
    description: 'Cố vấn dịch vụ trao đổi với chủ xe, ghi nhận dấu hiệu cần kiểm tra và tình trạng ban đầu trước khi xe được chuyển vào khu vực kỹ thuật.',
    checklist: ['Trao đổi dấu hiệu của xe', 'Ghi nhận hiện trạng ban đầu', 'Xác nhận nhu cầu sử dụng', 'Lập thông tin tiếp nhận'],
    image: 'pictures/dpauto/777951601_122116718091336820_4842196137194744608_n.jpg',
    alt: 'Khu vực tiếp nhận xe tại Toàn Trung',
    caption: 'Tiếp nhận và ghi nhận hiện trạng xe'
  },
  {
    heading: 'Kiểm tra hiện trạng & chẩn đoán',
    description: 'Kỹ thuật viên kiểm tra những khu vực liên quan đến dấu hiệu được ghi nhận, sử dụng thiết bị phù hợp khi cần và xác định nguyên nhân trước khi đề xuất phương án.',
    checklist: ['Kiểm tra trực quan', 'Kiểm tra bằng thiết bị khi cần', 'Xác định nguyên nhân', 'Ghi nhận kết quả kiểm tra'],
    image: 'pictures/dpauto/783730351_122116963089336820_8356334090627028982_n.jpg',
    alt: 'Kỹ thuật viên kiểm tra xe trong garage',
    caption: 'Kiểm tra theo tình trạng thực tế của xe'
  },
  {
    heading: 'Thống nhất phương án & báo giá',
    description: 'Kết quả kiểm tra được giải thích rõ ràng cùng các hạng mục đề xuất, mức độ ưu tiên và chi phí dự kiến. Công việc chỉ bắt đầu sau khi hai bên đã thống nhất.',
    checklist: ['Giải thích tình trạng xe', 'Đề xuất hạng mục phù hợp', 'Trao đổi chi phí dự kiến', 'Xác nhận trước khi làm'],
    image: 'pictures/dpauto/779957568_122116717953336820_1674540578645069727_n.jpg',
    alt: 'Trao đổi phương án dịch vụ tại Toàn Trung',
    caption: 'Phương án được trao đổi trước khi thực hiện'
  },
  {
    heading: 'Thực hiện công việc & kiểm tra lại',
    description: 'Đội ngũ kỹ thuật thực hiện các hạng mục đã xác nhận, theo dõi từng công đoạn và kiểm tra lại kết quả sau khi hoàn tất.',
    checklist: ['Thực hiện hạng mục đã duyệt', 'Theo dõi từng công đoạn', 'Kiểm tra kết quả', 'Hoàn thiện khu vực làm việc'],
    image: 'pictures/dpauto/779019198_122116962813336820_8944046044272620719_n.jpg',
    alt: 'Kỹ thuật viên thực hiện dịch vụ cho xe',
    caption: 'Thực hiện và kiểm tra lại từng hạng mục'
  },
  {
    heading: 'Hoàn thiện & bàn giao xe',
    description: 'Xe được kiểm tra tổng thể, vệ sinh khu vực đã thao tác và đối chiếu lại các hạng mục. Khi bàn giao, khách hàng được trao đổi rõ những gì đã thực hiện và lưu ý cần thiết.',
    checklist: ['Đối chiếu hạng mục', 'Kiểm tra tổng thể', 'Vệ sinh trước bàn giao', 'Trao đổi lưu ý sử dụng'],
    image: 'pictures/dpauto/778985479_122117550015336820_3220353053352064340_n.jpg',
    alt: 'Xe hoàn thiện trước khi bàn giao',
    caption: 'Kiểm tra hoàn thiện trước khi giao xe'
  }
];

const processTabs = [...document.querySelectorAll('.process-tab')];
const processStepper = document.querySelector('.process-stepper');
const processProgress = document.querySelector('#process-progress');
const processDetail = document.querySelector('#process-detail');
const processHeading = document.querySelector('#process-heading');
const processDescription = document.querySelector('#process-description');
const processChecklist = document.querySelector('#process-checklist');
const processImage = document.querySelector('#process-image');
let activeProcessIndex = 0;
let processAdvanceTimer;
let processResumeTimer;

function centerActiveProcessTab(index) {
  if (!processStepper || processStepper.scrollWidth <= processStepper.clientWidth) return;
  const tab = processTabs[index];
  const stepperRect = processStepper.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const target = processStepper.scrollLeft + tabRect.left - stepperRect.left
    + (tabRect.width / 2) - (processStepper.clientWidth / 2);
  processStepper.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
}

function showProcessStep(index, moveFocus = false) {
  const step = processSteps[index];
  if (!step || !processDetail) return;
  activeProcessIndex = index;

  processTabs.forEach((tab, tabIndex) => {
    tab.classList.toggle('is-active', tabIndex === index);
    tab.classList.toggle('is-complete', tabIndex < index);
    tab.setAttribute('aria-selected', String(tabIndex === index));
    tab.tabIndex = tabIndex === index ? 0 : -1;
  });

  processProgress.style.width = `${index * 25}%`;
  processHeading.textContent = step.heading;
  processDescription.textContent = step.description;
  processImage.src = step.image;
  processImage.alt = step.alt;
  processChecklist.replaceChildren(...step.checklist.map((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    return listItem;
  }));

  processDetail.classList.remove('is-refreshing');
  void processDetail.offsetWidth;
  processDetail.classList.add('is-refreshing');
  if (moveFocus) processTabs[index].focus();
  centerActiveProcessTab(index);
}

function scheduleProcessAdvance(delay = 7000) {
  window.clearTimeout(processAdvanceTimer);
  processAdvanceTimer = window.setTimeout(() => {
    showProcessStep((activeProcessIndex + 1) % processTabs.length);
    scheduleProcessAdvance();
  }, delay);
}

function pauseProcessAfterInteraction() {
  window.clearTimeout(processAdvanceTimer);
  window.clearTimeout(processResumeTimer);
  processResumeTimer = window.setTimeout(() => scheduleProcessAdvance(), 10000);
}

processTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    showProcessStep(index);
    pauseProcessAfterInteraction();
  });
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + processTabs.length) % processTabs.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % processTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = processTabs.length - 1;
    showProcessStep(nextIndex, true);
    pauseProcessAfterInteraction();
  });
});

if (processTabs.length > 1) scheduleProcessAdvance();

const reviewViewport = document.querySelector('#review-viewport');
const reviewCards = [...document.querySelectorAll('.review-card')];
const reviewDots = [...document.querySelectorAll('.review-dot')];
const reviewPrev = document.querySelector('.review-arrow-prev');
const reviewNext = document.querySelector('.review-arrow-next');
let reviewScrollFrame;

function setActiveReview(index) {
  reviewDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
  if (reviewPrev) reviewPrev.disabled = index === 0;
  if (reviewNext) reviewNext.disabled = index === reviewCards.length - 1;
}

function getActiveReviewIndex() {
  return Math.max(0, reviewDots.findIndex((dot) => dot.classList.contains('is-active')));
}

function getReviewScrollTarget(index) {
  if (!reviewViewport || !reviewCards[index]) return 0;
  const maxScroll = reviewViewport.scrollWidth - reviewViewport.clientWidth;
  const cardOffset = reviewCards[index].offsetLeft - reviewCards[0].offsetLeft;
  return Math.min(maxScroll, Math.max(0, cardOffset));
}

function scrollToReview(index) {
  if (!reviewViewport || reviewCards.length < 2) return;
  reviewViewport.scrollTo({
    left: getReviewScrollTarget(index),
    behavior: 'smooth'
  });
}

reviewDots.forEach((dot, index) => dot.addEventListener('click', () => scrollToReview(index)));
reviewPrev?.addEventListener('click', () => scrollToReview(Math.max(0, getActiveReviewIndex() - 1)));
reviewNext?.addEventListener('click', () => scrollToReview(Math.min(reviewCards.length - 1, getActiveReviewIndex() + 1)));
setActiveReview(0);

reviewViewport?.addEventListener('scroll', () => {
  window.cancelAnimationFrame(reviewScrollFrame);
  reviewScrollFrame = window.requestAnimationFrame(() => {
    const activeIndex = reviewCards.reduce((closestIndex, card, index) => {
      const currentDistance = Math.abs(reviewViewport.scrollLeft - getReviewScrollTarget(index));
      const closestDistance = Math.abs(reviewViewport.scrollLeft - getReviewScrollTarget(closestIndex));
      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);
    setActiveReview(activeIndex);
  });
}, { passive: true });

reviewViewport?.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  const activeIndex = getActiveReviewIndex();
  const direction = event.key === 'ArrowRight' ? 1 : -1;
  const nextIndex = Math.min(reviewCards.length - 1, Math.max(0, activeIndex + direction));
  scrollToReview(nextIndex);
});

document.querySelectorAll('a[href="#booking"]').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => document.querySelector('#booking-form input')?.focus({ preventScroll: true }), 550);
  });
});

const bookingForm = document.querySelector('#booking-form');
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = bookingForm.querySelector('.form-status');
  status.textContent = 'Thông tin hợp lệ. Biểu mẫu demo cần được kết nối hệ thống để gửi lịch.';
  bookingForm.querySelector('button').textContent = 'Thông tin đã sẵn sàng';
});

const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => {
    const target = link.getAttribute('href');
    return target.length > 1 ? document.querySelector(target) : null;
  })
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  observedSections.forEach((section) => observer.observe(section));
}
