"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/VoteButtons.tsx":
/*!****************************************!*\
  !*** ./src/components/VoteButtons.tsx ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowDown,ArrowUp!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/arrow-up.js\");\n/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowDown,ArrowUp!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/arrow-down.js\");\n// components/VoteButtons.tsx\n\nvar _s = $RefreshSig$();\n\n\nconst VoteButtons = (param)=>{\n    let { item, onVote } = param;\n    _s();\n    const [hasVoted, setHasVoted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleUpvote = ()=>{\n        if (hasVoted !== 'up') {\n            onVote(item.url, 'up');\n            setHasVoted('up');\n        } else {\n            onVote(item.url, 'none');\n            setHasVoted(null);\n        }\n    };\n    const handleDownvote = ()=>{\n        if (hasVoted !== 'down') {\n            onVote(item.url, 'down');\n            setHasVoted('down');\n        } else {\n            onVote(item.url, 'none');\n            setHasVoted(null);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex items-center space-x-2\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleUpvote,\n                className: \"p-2 rounded-full hover:bg-gray-100 transition-colors \".concat(hasVoted === 'up' ? 'bg-blue-500 text-white' : 'text-gray-500'),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowDown_ArrowUp_lucide_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    className: \"h-5 w-5\"\n                }, void 0, false, {\n                    fileName: \"/home/antash/workspace/snatched-crawler-client/src/components/VoteButtons.tsx\",\n                    lineNumber: 42,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/antash/workspace/snatched-crawler-client/src/components/VoteButtons.tsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleDownvote,\n                className: \"p-2 rounded-full hover:bg-gray-100 transition-colors \".concat(hasVoted === 'down' ? 'bg-blue-500 text-white' : 'text-gray-500'),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowDown_ArrowUp_lucide_react__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    className: \"h-5 w-5\"\n                }, void 0, false, {\n                    fileName: \"/home/antash/workspace/snatched-crawler-client/src/components/VoteButtons.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/antash/workspace/snatched-crawler-client/src/components/VoteButtons.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/antash/workspace/snatched-crawler-client/src/components/VoteButtons.tsx\",\n        lineNumber: 35,\n        columnNumber: 5\n    }, undefined);\n};\n_s(VoteButtons, \"s2AQ21mSgy73dQi5m0qrzuW1bFU=\");\n_c = VoteButtons;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VoteButtons);\nvar _c;\n$RefreshReg$(_c, \"VoteButtons\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1ZvdGVCdXR0b25zLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2QkFBNkI7OztBQUNXO0FBRVU7QUFPbEQsTUFBTUksY0FBMEM7UUFBQyxFQUFFQyxJQUFJLEVBQUVDLE1BQU0sRUFBRTs7SUFDL0QsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdQLCtDQUFRQSxDQUF1QjtJQUUvRCxNQUFNUSxlQUFlO1FBQ25CLElBQUlGLGFBQWEsTUFBTTtZQUNyQkQsT0FBT0QsS0FBS0ssR0FBRyxFQUFFO1lBQ2pCRixZQUFZO1FBQ2QsT0FBTztZQUNMRixPQUFPRCxLQUFLSyxHQUFHLEVBQUU7WUFDakJGLFlBQVk7UUFDZDtJQUNGO0lBRUEsTUFBTUcsaUJBQWlCO1FBQ3JCLElBQUlKLGFBQWEsUUFBUTtZQUN2QkQsT0FBT0QsS0FBS0ssR0FBRyxFQUFFO1lBQ2pCRixZQUFZO1FBQ2QsT0FBTztZQUNMRixPQUFPRCxLQUFLSyxHQUFHLEVBQUU7WUFDakJGLFlBQVk7UUFDZDtJQUNGO0lBRUEscUJBQ0UsOERBQUNJO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDQztnQkFDQ0MsU0FBU047Z0JBQ1RJLFdBQVcsd0RBRVYsT0FEQ04sYUFBYSxPQUFPLDJCQUEyQjswQkFHakQsNEVBQUNMLDZGQUFPQTtvQkFBQ1csV0FBVTs7Ozs7Ozs7Ozs7MEJBRXJCLDhEQUFDQztnQkFDQ0MsU0FBU0o7Z0JBQ1RFLFdBQVcsd0RBRVYsT0FEQ04sYUFBYSxTQUFTLDJCQUEyQjswQkFHbkQsNEVBQUNKLDZGQUFTQTtvQkFBQ1UsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJN0I7R0EzQ01UO0tBQUFBO0FBNkNOLGlFQUFlQSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1ZvdGVCdXR0b25zLnRzeD84OGI5Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbXBvbmVudHMvVm90ZUJ1dHRvbnMudHN4XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTY3JhcGVkVXJsIH0gZnJvbSAnQC90eXBlcy9zY3JhcGluZyc7XG5pbXBvcnQgeyBBcnJvd1VwLCBBcnJvd0Rvd24gfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgVm90ZUJ1dHRvbnNQcm9wcyB7XG4gIGl0ZW06IFNjcmFwZWRVcmw7XG4gIG9uVm90ZTogKGl0ZW1JZDogc3RyaW5nLCB2b3RlRGlyZWN0aW9uOiAndXAnIHwgJ2Rvd24nKSA9PiB2b2lkO1xufVxuXG5jb25zdCBWb3RlQnV0dG9uczogUmVhY3QuRkM8Vm90ZUJ1dHRvbnNQcm9wcz4gPSAoeyBpdGVtLCBvblZvdGUgfSkgPT4ge1xuICBjb25zdCBbaGFzVm90ZWQsIHNldEhhc1ZvdGVkXSA9IHVzZVN0YXRlPCd1cCcgfCAnZG93bicgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBoYW5kbGVVcHZvdGUgPSAoKSA9PiB7XG4gICAgaWYgKGhhc1ZvdGVkICE9PSAndXAnKSB7XG4gICAgICBvblZvdGUoaXRlbS51cmwsICd1cCcpO1xuICAgICAgc2V0SGFzVm90ZWQoJ3VwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uVm90ZShpdGVtLnVybCwgJ25vbmUnKTtcbiAgICAgIHNldEhhc1ZvdGVkKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dudm90ZSA9ICgpID0+IHtcbiAgICBpZiAoaGFzVm90ZWQgIT09ICdkb3duJykge1xuICAgICAgb25Wb3RlKGl0ZW0udXJsLCAnZG93bicpO1xuICAgICAgc2V0SGFzVm90ZWQoJ2Rvd24nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25Wb3RlKGl0ZW0udXJsLCAnbm9uZScpO1xuICAgICAgc2V0SGFzVm90ZWQobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgb25DbGljaz17aGFuZGxlVXB2b3RlfVxuICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZC1mdWxsIGhvdmVyOmJnLWdyYXktMTAwIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgaGFzVm90ZWQgPT09ICd1cCcgPyAnYmctYmx1ZS01MDAgdGV4dC13aGl0ZScgOiAndGV4dC1ncmF5LTUwMCdcbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIDxBcnJvd1VwIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd252b3RlfVxuICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZC1mdWxsIGhvdmVyOmJnLWdyYXktMTAwIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgaGFzVm90ZWQgPT09ICdkb3duJyA/ICdiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlJyA6ICd0ZXh0LWdyYXktNTAwJ1xuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgPEFycm93RG93biBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVm90ZUJ1dHRvbnM7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJBcnJvd1VwIiwiQXJyb3dEb3duIiwiVm90ZUJ1dHRvbnMiLCJpdGVtIiwib25Wb3RlIiwiaGFzVm90ZWQiLCJzZXRIYXNWb3RlZCIsImhhbmRsZVVwdm90ZSIsInVybCIsImhhbmRsZURvd252b3RlIiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/VoteButtons.tsx\n"));

/***/ })

});