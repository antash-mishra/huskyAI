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

/***/ "(app-pages-browser)/./src/app/history/page.tsx":
/*!**********************************!*\
  !*** ./src/app/history/page.tsx ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HistoryPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./src/components/ui/card.tsx\");\n/* harmony import */ var _components_ui_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/alert */ \"(app-pages-browser)/./src/components/ui/alert.tsx\");\n/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/badge */ \"(app-pages-browser)/./src/components/ui/badge.tsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./src/components/ui/input.tsx\");\n/* harmony import */ var _components_VoteButtons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/VoteButtons */ \"(app-pages-browser)/./src/components/VoteButtons.tsx\");\n// app/history/page.tsx\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction HistoryPage() {\n    _s();\n    const [history, setHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchHistory = async ()=>{\n            try {\n                const response = await fetch('http://localhost:5000/history');\n                if (!response.ok) {\n                    const errorData = await response.json();\n                    throw new Error(errorData.error || 'Failed to fetch history');\n                }\n                const data = await response.json();\n                setHistory(data);\n            } catch (err) {\n                setError(err instanceof Error ? err.message : 'An error occurred');\n            } finally{\n                setLoading(false);\n            }\n        };\n        fetchHistory();\n    }, []);\n    const handleVote = async (url, voteDirection)=>{\n        try {\n            const response = await fetch(\"http://localhost:5000/history/\".concat(url, \"/vote\"), {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                    voteDirection\n                })\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                throw new Error(errorData.error || 'Failed to process vote');\n            }\n            // Update the history state with the new vote\n            const updatedHistory = history.map((item)=>{\n                if (item.url === url) {\n                    return {\n                        ...item,\n                        vote: voteDirection === 'none' ? null : voteDirection\n                    };\n                }\n                return item;\n            });\n            setHistory(updatedHistory);\n        } catch (err) {\n            console.error('Error voting:', err);\n        // Handle error, e.g., show a toast notification\n        }\n    };\n    const filteredHistory = history.filter((item)=>item.url.toLowerCase().includes(searchTerm.toLowerCase()) || item.url_summary.toLowerCase().includes(searchTerm.toLowerCase()));\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container mx-auto p-4\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center items-center h-32\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500\"\n                }, void 0, false, {\n                    fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                    lineNumber: 81,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                lineNumber: 80,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n            lineNumber: 79,\n            columnNumber: 7\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container mx-auto p-4\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_alert__WEBPACK_IMPORTED_MODULE_3__.Alert, {\n                variant: \"destructive\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_alert__WEBPACK_IMPORTED_MODULE_3__.AlertDescription, {\n                    children: error\n                }, void 0, false, {\n                    fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                    lineNumber: 91,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                lineNumber: 90,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n            lineNumber: 89,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto p-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mb-6\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__.Input, {\n                    type: \"text\",\n                    placeholder: \"Search URLs and summaries...\",\n                    value: searchTerm,\n                    onChange: (e)=>setSearchTerm(e.target.value),\n                    className: \"max-w-md\"\n                }, void 0, false, {\n                    fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                    lineNumber: 100,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                lineNumber: 99,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"space-y-4\",\n                children: filteredHistory.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.CardContent, {\n                        className: \"p-6\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center text-gray-500\",\n                            children: searchTerm ? 'No matching results found.' : 'No scraping history found.'\n                        }, void 0, false, {\n                            fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                            lineNumber: 113,\n                            columnNumber: 15\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                        lineNumber: 112,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                    lineNumber: 111,\n                    columnNumber: 11\n                }, this) : filteredHistory.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n                        className: \"hover:shadow-lg transition-shadow duration-200 flex flex-row items-center justify-between\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex-1\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.CardHeader, {\n                                        className: \"flex flex-row items-center justify-between space-y-0 pb-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.CardTitle, {\n                                                className: \"text-lg font-medium\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                                    href: item.url,\n                                                    target: \"_blank\",\n                                                    rel: \"noopener noreferrer\",\n                                                    className: \"text-blue-500 hover:underline\",\n                                                    children: item.url\n                                                }, void 0, false, {\n                                                    fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                                    lineNumber: 127,\n                                                    columnNumber: 21\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                                lineNumber: 126,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_4__.Badge, {\n                                                variant: \"secondary\",\n                                                className: \"capitalize\",\n                                                children: item.page_type\n                                            }, void 0, false, {\n                                                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                                lineNumber: 136,\n                                                columnNumber: 19\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                        lineNumber: 125,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.CardContent, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-gray-600 text-sm\",\n                                            children: item.url_summary\n                                        }, void 0, false, {\n                                            fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                            lineNumber: 144,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                        lineNumber: 143,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                lineNumber: 124,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_VoteButtons__WEBPACK_IMPORTED_MODULE_6__.VoteButtons, {\n                                item: item,\n                                onVote: handleVote\n                            }, void 0, false, {\n                                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                                lineNumber: 149,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, index, true, {\n                        fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                        lineNumber: 120,\n                        columnNumber: 13\n                    }, this))\n            }, void 0, false, {\n                fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n                lineNumber: 109,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/antash/workspace/snatched-crawler-client/src/app/history/page.tsx\",\n        lineNumber: 98,\n        columnNumber: 5\n    }, this);\n}\n_s(HistoryPage, \"ZBmgUTlnbHZBfsGJl4m5ywETaW0=\");\n_c = HistoryPage;\nvar _c;\n$RefreshReg$(_c, \"HistoryPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvaGlzdG9yeS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1QkFBdUI7OztBQUVxQjtBQUVvQztBQUNoQjtBQUNsQjtBQUNBO0FBQ087QUFNdEMsU0FBU1c7O0lBQ3RCLE1BQU0sQ0FBQ0MsU0FBU0MsV0FBVyxHQUFHWiwrQ0FBUUEsQ0FBZSxFQUFFO0lBQ3ZELE1BQU0sQ0FBQ2EsU0FBU0MsV0FBVyxHQUFHZCwrQ0FBUUEsQ0FBVTtJQUNoRCxNQUFNLENBQUNlLE9BQU9DLFNBQVMsR0FBR2hCLCtDQUFRQSxDQUFTO0lBQzNDLE1BQU0sQ0FBQ2lCLFlBQVlDLGNBQWMsR0FBR2xCLCtDQUFRQSxDQUFTO0lBRXJERCxnREFBU0EsQ0FBQztRQUNSLE1BQU1vQixlQUFlO1lBQ25CLElBQUk7Z0JBQ0YsTUFBTUMsV0FBVyxNQUFNQyxNQUFNO2dCQUM3QixJQUFJLENBQUNELFNBQVNFLEVBQUUsRUFBRTtvQkFDaEIsTUFBTUMsWUFBc0IsTUFBTUgsU0FBU0ksSUFBSTtvQkFDL0MsTUFBTSxJQUFJQyxNQUFNRixVQUFVUixLQUFLLElBQUk7Z0JBQ3JDO2dCQUNBLE1BQU1XLE9BQXFCLE1BQU1OLFNBQVNJLElBQUk7Z0JBQzlDWixXQUFXYztZQUNiLEVBQUUsT0FBT0MsS0FBSztnQkFDWlgsU0FBU1csZUFBZUYsUUFBUUUsSUFBSUMsT0FBTyxHQUFHO1lBQ2hELFNBQVU7Z0JBQ1JkLFdBQVc7WUFDYjtRQUNGO1FBRUFLO0lBQ0YsR0FBRyxFQUFFO0lBR0wsTUFBTVUsYUFBYSxPQUFPQyxLQUFhQztRQUNyQyxJQUFJO1lBQ0YsTUFBTVgsV0FBVyxNQUFNQyxNQUFNLGlDQUFxQyxPQUFKUyxLQUFJLFVBQVE7Z0JBQ3hFRSxRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtnQkFDbEI7Z0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQkFBRUw7Z0JBQWM7WUFDdkM7WUFFQSxJQUFJLENBQUNYLFNBQVNFLEVBQUUsRUFBRTtnQkFDaEIsTUFBTUMsWUFBc0IsTUFBTUgsU0FBU0ksSUFBSTtnQkFDL0MsTUFBTSxJQUFJQyxNQUFNRixVQUFVUixLQUFLLElBQUk7WUFDckM7WUFFQSw2Q0FBNkM7WUFDN0MsTUFBTXNCLGlCQUFpQjFCLFFBQVEyQixHQUFHLENBQUMsQ0FBQ0M7Z0JBQ2xDLElBQUlBLEtBQUtULEdBQUcsS0FBS0EsS0FBSztvQkFDcEIsT0FBTzt3QkFBRSxHQUFHUyxJQUFJO3dCQUFFQyxNQUFNVCxrQkFBa0IsU0FBUyxPQUFPQTtvQkFBYztnQkFDMUU7Z0JBQ0EsT0FBT1E7WUFDVDtZQUNBM0IsV0FBV3lCO1FBQ2IsRUFBRSxPQUFPVixLQUFLO1lBQ1pjLFFBQVExQixLQUFLLENBQUMsaUJBQWlCWTtRQUMvQixnREFBZ0Q7UUFDbEQ7SUFDRjtJQUdBLE1BQU1lLGtCQUFrQi9CLFFBQVFnQyxNQUFNLENBQUNKLENBQUFBLE9BQ3JDQSxLQUFLVCxHQUFHLENBQUNjLFdBQVcsR0FBR0MsUUFBUSxDQUFDNUIsV0FBVzJCLFdBQVcsT0FDdERMLEtBQUtPLFdBQVcsQ0FBQ0YsV0FBVyxHQUFHQyxRQUFRLENBQUM1QixXQUFXMkIsV0FBVztJQUdoRSxJQUFJL0IsU0FBUztRQUNYLHFCQUNFLDhEQUFDa0M7WUFBSUMsV0FBVTtzQkFDYiw0RUFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNEO29CQUFJQyxXQUFVOzs7Ozs7Ozs7Ozs7Ozs7O0lBSXZCO0lBRUEsSUFBSWpDLE9BQU87UUFDVCxxQkFDRSw4REFBQ2dDO1lBQUlDLFdBQVU7c0JBQ2IsNEVBQUMzQyx1REFBS0E7Z0JBQUM0QyxTQUFROzBCQUNiLDRFQUFDM0Msa0VBQWdCQTs4QkFBRVM7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJM0I7SUFFQSxxQkFDRSw4REFBQ2dDO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ3hDLHVEQUFLQTtvQkFDSjBDLE1BQUs7b0JBQ0xDLGFBQVk7b0JBQ1pDLE9BQU9uQztvQkFDUG9DLFVBQVUsQ0FBQ0MsSUFBTXBDLGNBQWNvQyxFQUFFQyxNQUFNLENBQUNILEtBQUs7b0JBQzdDSixXQUFVOzs7Ozs7Ozs7OzswQkFJZCw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ1pOLGdCQUFnQmMsTUFBTSxLQUFLLGtCQUMxQiw4REFBQ3ZELHFEQUFJQTs4QkFDSCw0RUFBQ0csNERBQVdBO3dCQUFDNEMsV0FBVTtrQ0FDckIsNEVBQUNTOzRCQUFFVCxXQUFVO3NDQUNWL0IsYUFBYSwrQkFBK0I7Ozs7Ozs7Ozs7Ozs7OzsyQkFLbkR5QixnQkFBZ0JKLEdBQUcsQ0FBQyxDQUFDQyxNQUFNbUIsc0JBQ3pCLDhEQUFDekQscURBQUlBO3dCQUVIK0MsV0FBVTs7MENBRVYsOERBQUNEO2dDQUFJQyxXQUFVOztrREFDYiw4REFBQzlDLDJEQUFVQTt3Q0FBQzhDLFdBQVU7OzBEQUNwQiw4REFBQzdDLDBEQUFTQTtnREFBQzZDLFdBQVU7MERBQ25CLDRFQUFDVztvREFDQ0MsTUFBTXJCLEtBQUtULEdBQUc7b0RBQ2R5QixRQUFPO29EQUNQTSxLQUFJO29EQUNKYixXQUFVOzhEQUVUVCxLQUFLVCxHQUFHOzs7Ozs7Ozs7OzswREFHYiw4REFBQ3ZCLHVEQUFLQTtnREFDSjBDLFNBQVE7Z0RBQ1JELFdBQVU7MERBRVRULEtBQUt1QixTQUFTOzs7Ozs7Ozs7Ozs7a0RBR25CLDhEQUFDMUQsNERBQVdBO2tEQUNWLDRFQUFDcUQ7NENBQUVULFdBQVU7c0RBQ1ZULEtBQUtPLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQUl2Qiw4REFBQ3JDLGdFQUFXQTtnQ0FBQzhCLE1BQU1BO2dDQUFNd0IsUUFBUWxDOzs7Ozs7O3VCQTVCNUI2Qjs7Ozs7Ozs7Ozs7Ozs7OztBQW1DbkI7R0E3SXdCaEQ7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9oaXN0b3J5L3BhZ2UudHN4P2Y0MmYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwL2hpc3RvcnkvcGFnZS50c3hcbid1c2UgY2xpZW50JztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDaGV2cm9uVXBJY29uLCBDaGV2cm9uRG93bkljb24gfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ2FyZCwgQ2FyZEhlYWRlciwgQ2FyZFRpdGxlLCBDYXJkQ29udGVudCB9IGZyb20gJ0AvY29tcG9uZW50cy91aS9jYXJkJztcbmltcG9ydCB7IEFsZXJ0LCBBbGVydERlc2NyaXB0aW9uIH0gZnJvbSAnQC9jb21wb25lbnRzL3VpL2FsZXJ0JztcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSAnQC9jb21wb25lbnRzL3VpL2JhZGdlJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnQC9jb21wb25lbnRzL3VpL2lucHV0JztcbmltcG9ydCB7Vm90ZUJ1dHRvbnN9IGZyb20gJ0AvY29tcG9uZW50cy9Wb3RlQnV0dG9ucyc7XG5cbmltcG9ydCB7IFNjcmFwZWRVcmwsIEFwaUVycm9yLCBWb3RlZFVybH0gZnJvbSAnQC90eXBlcy9zY3JhcGluZyc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIaXN0b3J5UGFnZSgpIHtcbiAgY29uc3QgW2hpc3RvcnksIHNldEhpc3RvcnldID0gdXNlU3RhdGU8U2NyYXBlZFVybFtdPihbXSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoSGlzdG9yeSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9oaXN0b3J5Jyk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zdCBlcnJvckRhdGE6IEFwaUVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0ZhaWxlZCB0byBmZXRjaCBoaXN0b3J5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YTogU2NyYXBlZFVybFtdID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBzZXRIaXN0b3J5KGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnQW4gZXJyb3Igb2NjdXJyZWQnKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaEhpc3RvcnkoKTtcbiAgfSwgW10pO1xuXG5cbiAgY29uc3QgaGFuZGxlVm90ZSA9IGFzeW5jICh1cmw6IHN0cmluZywgdm90ZURpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyB8ICdub25lJykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjUwMDAvaGlzdG9yeS8ke3VybH0vdm90ZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHZvdGVEaXJlY3Rpb24gfSksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGE6IEFwaUVycm9yID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdGYWlsZWQgdG8gcHJvY2VzcyB2b3RlJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgaGlzdG9yeSBzdGF0ZSB3aXRoIHRoZSBuZXcgdm90ZVxuICAgICAgY29uc3QgdXBkYXRlZEhpc3RvcnkgPSBoaXN0b3J5Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS51cmwgPT09IHVybCkge1xuICAgICAgICAgIHJldHVybiB7IC4uLml0ZW0sIHZvdGU6IHZvdGVEaXJlY3Rpb24gPT09ICdub25lJyA/IG51bGwgOiB2b3RlRGlyZWN0aW9uIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICAgIHNldEhpc3RvcnkodXBkYXRlZEhpc3RvcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igdm90aW5nOicsIGVycik7XG4gICAgICAvLyBIYW5kbGUgZXJyb3IsIGUuZy4sIHNob3cgYSB0b2FzdCBub3RpZmljYXRpb25cbiAgICB9XG4gIH07XG5cblxuICBjb25zdCBmaWx0ZXJlZEhpc3RvcnkgPSBoaXN0b3J5LmZpbHRlcihpdGVtID0+IFxuICAgIGl0ZW0udXJsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgIGl0ZW0udXJsX3N1bW1hcnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpXG4gICk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBoLTMyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtOCB3LTggYm9yZGVyLWItMiBib3JkZXItYmx1ZS01MDBcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIG14LWF1dG8gcC00XCI+XG4gICAgICAgIDxBbGVydCB2YXJpYW50PVwiZGVzdHJ1Y3RpdmVcIj5cbiAgICAgICAgICA8QWxlcnREZXNjcmlwdGlvbj57ZXJyb3J9PC9BbGVydERlc2NyaXB0aW9uPlxuICAgICAgICA8L0FsZXJ0PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBwLTRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNlwiPlxuICAgICAgICA8SW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggVVJMcyBhbmQgc3VtbWFyaWVzLi4uXCJcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoVGVybX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1heC13LW1kXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICB7ZmlsdGVyZWRIaXN0b3J5Lmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8Q2FyZD5cbiAgICAgICAgICAgIDxDYXJkQ29udGVudCBjbGFzc05hbWU9XCJwLTZcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgIHtzZWFyY2hUZXJtID8gJ05vIG1hdGNoaW5nIHJlc3VsdHMgZm91bmQuJyA6ICdObyBzY3JhcGluZyBoaXN0b3J5IGZvdW5kLid9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgICAgPC9DYXJkPlxuICAgICAgICApIDogKFxuICAgICAgICAgIGZpbHRlcmVkSGlzdG9yeS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8Q2FyZCBcbiAgICAgICAgICAgICAga2V5PXtpbmRleH0gXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnNoYWRvdy1sZyB0cmFuc2l0aW9uLXNoYWRvdyBkdXJhdGlvbi0yMDAgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICA8Q2FyZEhlYWRlciBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0wIHBiLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxDYXJkVGl0bGUgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPXtpdGVtLnVybH0gXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCIgXG4gICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ibHVlLTUwMCBob3Zlcjp1bmRlcmxpbmVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0udXJsfVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L0NhcmRUaXRsZT5cbiAgICAgICAgICAgICAgICAgIDxCYWRnZSBcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNhcGl0YWxpemVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5wYWdlX3R5cGV9XG4gICAgICAgICAgICAgICAgICA8L0JhZGdlPlxuICAgICAgICAgICAgICAgIDwvQ2FyZEhlYWRlcj5cbiAgICAgICAgICAgICAgICA8Q2FyZENvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0udXJsX3N1bW1hcnl9XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9DYXJkQ29udGVudD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxWb3RlQnV0dG9ucyBpdGVtPXtpdGVtfSBvblZvdGU9e2hhbmRsZVZvdGV9IC8+XG4gICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgKSlcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNhcmQiLCJDYXJkSGVhZGVyIiwiQ2FyZFRpdGxlIiwiQ2FyZENvbnRlbnQiLCJBbGVydCIsIkFsZXJ0RGVzY3JpcHRpb24iLCJCYWRnZSIsIklucHV0IiwiVm90ZUJ1dHRvbnMiLCJIaXN0b3J5UGFnZSIsImhpc3RvcnkiLCJzZXRIaXN0b3J5IiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwic2VhcmNoVGVybSIsInNldFNlYXJjaFRlcm0iLCJmZXRjaEhpc3RvcnkiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJlcnJvckRhdGEiLCJqc29uIiwiRXJyb3IiLCJkYXRhIiwiZXJyIiwibWVzc2FnZSIsImhhbmRsZVZvdGUiLCJ1cmwiLCJ2b3RlRGlyZWN0aW9uIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlZEhpc3RvcnkiLCJtYXAiLCJpdGVtIiwidm90ZSIsImNvbnNvbGUiLCJmaWx0ZXJlZEhpc3RvcnkiLCJmaWx0ZXIiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidXJsX3N1bW1hcnkiLCJkaXYiLCJjbGFzc05hbWUiLCJ2YXJpYW50IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJsZW5ndGgiLCJwIiwiaW5kZXgiLCJhIiwiaHJlZiIsInJlbCIsInBhZ2VfdHlwZSIsIm9uVm90ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/history/page.tsx\n"));

/***/ })

});