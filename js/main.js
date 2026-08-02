const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: .2
});

document.querySelectorAll(".hero-left,.hero-right").forEach(el => {
    el.classList.add("fade-up");
    observer.observe(el);
});

const typeOnScroll = document.querySelectorAll(".type-on-scroll");

const typeWriterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const paragraph = entry.target;
        const message = paragraph.textContent.replace(/\s+/g, " ").trim();
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            paragraph.textContent = message;
        } else {
            paragraph.textContent = "";
            paragraph.classList.add("is-typing");
            let index = 0;
            const typeNextCharacter = () => {
                paragraph.textContent += message.charAt(index++);
                if (index < message.length) {
                    setTimeout(typeNextCharacter, 13);
                } else {
                    paragraph.classList.remove("is-typing");
                }
            };
            typeNextCharacter();
        }

        typeWriterObserver.unobserve(paragraph);
    });
}, { threshold: 0.45 });

typeOnScroll.forEach(paragraph => typeWriterObserver.observe(paragraph));

const glow1 = document.querySelector(".glow1");
const glow2 = document.querySelector(".glow2");

document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    glow1.style.transform = `translate(${x * 40}px,${y * 30}px)`;
    glow2.style.transform = `translate(${-x * 40}px,${-y * 30}px)`;
});

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;

            const update = () => {
                count += Math.ceil(target / 70);

                if (count < target) {
                    counter.innerText = count;
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            };

            update();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: .5 });

counters.forEach(counter => counterObserver.observe(counter));

const eatTime = document.getElementById("eatTime");

if (eatTime) {
    const updateEatTime = () => {
        const currentEatTime = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Africa/Nairobi",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).format(new Date());

        eatTime.textContent = currentEatTime;
        eatTime.dateTime = currentEatTime;
    };

    updateEatTime();
    setInterval(updateEatTime, 1000);
}

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
});

const filterButtons = document.querySelectorAll(".analysis-filter button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector("i");

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.classList.replace("fa-minus", "fa-plus");
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.classList.replace("fa-plus", "fa-minus");
        }
    });
});

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("loader-hidden");
    }, 800);
});

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

topBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

const equityLine = document.getElementById("equityLine");
const equityArea = document.getElementById("equityArea");
const equityDot = document.getElementById("equityDot");
const equityReturn = document.getElementById("equityReturn");

if (equityLine && equityArea && equityDot && equityReturn) {
    const chartData = {
        "1M": { points: [132, 129, 136, 121, 126, 110, 115, 100, 105, 87, 78], return: "+6.7%" },
        "3M": { points: [182, 170, 175, 151, 159, 129, 136, 112, 117, 82, 68], return: "+18.4%" },
        "6M": { points: [205, 191, 198, 174, 180, 154, 165, 136, 143, 110, 121, 91, 97, 62], return: "+42.8%" }
    };

    const drawEquityChart = range => {
        const points = chartData[range].points;
        const step = 640 / (points.length - 1);
        const line = points.map((y, index) => `${index ? "L" : "M"}${(index * step).toFixed(1)},${y}`).join(" ");
        const lastX = ((points.length - 1) * step).toFixed(1);

        equityLine.setAttribute("d", line);
        equityArea.setAttribute("d", `${line} L${lastX},235 L0,235 Z`);
        equityDot.setAttribute("cx", lastX);
        equityDot.setAttribute("cy", points[points.length - 1]);
        equityReturn.textContent = chartData[range].return;
    };

    drawEquityChart("3M");
    document.querySelectorAll(".chart-range button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".chart-range button").forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            drawEquityChart(button.dataset.range);
        });
    });
}

const tradeToggle = document.querySelector(".trade-toggle");
const tradeProofCard = document.querySelector(".trade-proof-card");

if (tradeToggle && tradeProofCard) {
    tradeToggle.addEventListener("click", () => {
        const isVisible = tradeProofCard.classList.toggle("result-visible");
        tradeToggle.setAttribute("aria-pressed", isVisible);
        tradeToggle.innerHTML = isVisible
            ? '<i class="fas fa-rotate-left"></i> Hide result'
            : '<i class="fas fa-chart-line"></i> Show result';
    });
}

document.querySelectorAll(".tradingview-widget-container").forEach(container => {
    const widgetScript = document.createElement("script");
    widgetScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    widgetScript.async = true;
    widgetScript.innerHTML = JSON.stringify({
        symbol: container.dataset.symbol,
        width: "100%",
        height: "100%",
        locale: "en",
        dateRange: "1D",
        colorTheme: "dark",
        isTransparent: true,
        autosize: true,
        largeChartUrl: ""
    });
    container.appendChild(widgetScript);
});
