(function () {
    var config = {
        "baseURL": "js",
        map: {
            'babel-runtime/helpers/classCallCheck': 'libs/babel-runtime/helpers/classCallCheck'
        },
        packages: {
            eventbus: {
                main: 'eventbus.js'
            },
            selection: {
                main: 'selection.js'
            },
            core: {
                defaultExtension: 'js'
            }
        }
    };

    System.config(config)
}());