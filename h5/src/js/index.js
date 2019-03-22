require.config({
    paths: {
        "mui": "libs/mui.min",
        "jsonp": "libs/mui.jsonp",
        "render": "app/render"
    },
    shim: {
        "jsonp": {
            deps: ["mui"]
        }
    }
})
require(["mui", "jsonp", "render"])