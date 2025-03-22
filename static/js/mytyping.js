document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById("typed-output");
    let i = 0;

    function typeNext() {
        const prefix = "I am a ";
        const identity = identities[i];
        const suffix = "!";
        const fullText = prefix + identity + suffix;
        let j = 0;

        const typeInterval = setInterval(() => {
            j++;

            if (j <= prefix.length) {
                el.innerHTML = fullText.slice(0, j);
            } else if (j <= prefix.length + identity.length) {
                const typedPrefix = fullText.slice(0, prefix.length);
                const typedIdentity = fullText.slice(prefix.length, j);
                el.innerHTML = `${typedPrefix}<span style="color:#50fa7b;">${typedIdentity}</span>`;
            } else if (j <= fullText.length) {
                const typedPrefix = fullText.slice(0, prefix.length);
                const fullIdentity = fullText.slice(prefix.length, prefix.length + identity.length);
                const typedSuffix = fullText.slice(prefix.length + identity.length, j);
                el.innerHTML = `${typedPrefix}<span style="color:#50fa7b;">${fullIdentity}</span>${typedSuffix}`;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    deleteText(prefix, identity, suffix, () => {
                        i = (i + 1) % identities.length;
                        typeNext();
                    });
                }, 1500);
            }
        }, 100);
    }

    function deleteText(prefix, identity, suffix, callback) {
        let total = prefix + identity + suffix;
        let j = total.length;

        const deleteInterval = setInterval(() => {
            j--;

            if (j >= prefix.length + identity.length) {
                // Deleting suffix
                const fullIdentity = identity;
                const typedSuffix = suffix.slice(0, j - (prefix.length + identity.length));
                el.innerHTML = `${prefix}<span style="color:#50fa7b;">${fullIdentity}</span>${typedSuffix}`;
            } else if (j >= prefix.length) {
                // Deleting green identity
                const typedIdentity = identity.slice(0, j - prefix.length);
                el.innerHTML = `${prefix}<span style="color:#50fa7b;">${typedIdentity}</span>`;
            } else if (j >= 0) {
                // Deleting prefix
                el.innerHTML = prefix.slice(0, j);
            } else {
                clearInterval(deleteInterval);
                callback();
            }
        }, 50);
    }

    typeNext();
});
