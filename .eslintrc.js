module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "react/jsx-filename-extension": 0,
        "linebreak-style": 0,
        "import/no-unresolved": 0,
        "indent": 0,
        "react/jsx-indent": 0,
        "jsx-quotes": 0,
        "arrow-body-style": 0,
        "no-use-before-define": 0,
        "class-methods-use-this": 0,
        "react/prop-types": 0,
        "react/prefer-stateless-function": 0,
        "import/prefer-default-export": 0,
        "react/jsx-no-bind": 0,
        "no-console": 0,
        "max-len": 0,
        "camelcase": 0,
        "no-underscore-dangle": 0,
        "jsx-a11y/href-no-hash": 0,
        "react/destructuring-assignment": 0,
        "prefer-destructuring": 0,
        "react/no-access-state-in-setstate": 0,
        "import/no-cycle": 0,
    }
};