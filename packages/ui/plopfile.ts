export default function (plop) {
    plop.setGenerator("widget", {
        prompts: [
            {
                type: "input",
                name: "name",
                message: function () {
                    return "test name"
                },
                validate: function (value) {
                    if (/.+/.test(value)) {
                        return true
                    }
                    return "test name is required"
                }
            }
        ],
        actions: [
            {
                type: "add",
                path: "src/core/{{dashCase name}}/format.ts",
                templateFile: "plop-templates/node-plop-test.js"
            },
            {
                type: "add",
                path: "src/core/{{dashCase name}}/svg.ts",
                templateFile: "plop-templates/node-plop-test.js"
            },
            {
                type: "add",
                path: "src/core/{{dashCase name}}/widget.ts",
                templateFile: "plop-templates/node-plop-test.js"
            },
            {
                type: "add",
                path: "src/core/{{dashCase name}}/index.ts",
                templateFile: "plop-templates/node-plop-test.js"
            }
        ]
    })
}
