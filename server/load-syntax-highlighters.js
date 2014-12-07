(function() {
    /*
        Loads all available languages. I got this idea (and part of the script) from
        https://github.com/LeaVerou/prism/blob/gh-pages/test.html
    */
    function loadLanguage (lang) {
        var dependencies = getDependenciesOfLanguage(lang).map(loadLanguage);
        return Promise.all(dependencies)
            .then(function () {
                if (!Prism.languages[lang]) {
                    return new Promise(function (resolve) {
                        //$u.script('components/prism-' + lang + '.js', resolve);
                        $.getScript('/vendor/prism/components/prism-' + lang + '.js', resolve);
                    });
                }
            });
    }
    function getDependenciesOfLanguage (lang) {
        if (!components.languages[lang] || !components.languages[lang].require) {
            return [];
        }

        return (typeof(components.languages[lang].require) === "Array")
            ? components.languages[lang].require
            : [components.languages[lang].require];
    }
    var languages = components.languages;
    for (var id in languages) {
        if (id == 'meta') {
            continue;
        }
        loadLanguage(id);
    }
})();