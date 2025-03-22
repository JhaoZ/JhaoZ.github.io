document.addEventListener("DOMContentLoaded", function () {
    const identities = JSON.parse(document.getElementById("identity-data").textContent);
    const el = document.getElementById("typed-output");
    let i = 0;
    function typeNext() {
        let text = `I am ${identities[i]}`;
        let j = 0;
        el.textContent = '';
        let interval = setInterval(() => {
            el.textContent += text[j++];
            if (j === text.length) {
                clearInterval(interval);
                setTimeout(() => {
                    i = (i + 1) % identities.length;
                    typeNext();
                }, 1500);
            }
        }, 100);
    }
    typeNext();
});
