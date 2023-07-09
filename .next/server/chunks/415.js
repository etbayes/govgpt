"use strict";
exports.id = 415;
exports.ids = [415];
exports.modules = {

/***/ 415:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(247);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(236);
/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_search_autocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(827);
/* harmony import */ var react_search_autocomplete__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_search_autocomplete__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(924);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(153);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_5__]);
axios__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
"use client";

{}





const Search = ({ setConversation , setIsInitialInputGiven  })=>{
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [initialText, setInitialText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [language, setLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("English");
    const handleInitialSubmit = async (text)=>{
        setConversation([
            {
                message: text,
                speaker: "user"
            }
        ]);
        setIsInitialInputGiven(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: text
                })
            });
            await response.json();
        } catch (error) {
            console.error("Error submitting initial message:", error);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchData = async ()=>{
            let url;
            if (language === "Cymraeg") {
                url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqKi1YOqksJOO3U07eGgNKU2P62-QjGmY4wzwI6vnUp8sjtU1CvnHcYu3PD_BVDfIjZUCuouNjsd9L/pub?output=csv";
            } else {
                url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYnQg-krksesMIkfe-VcoJMS3C92t99MgvjklMkz_5VRLMHaRfNPzXcjwUg3hL7-4E77C-8V1-8HM-/pub?output=csv";
            }
            const response = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].get(url);
            const results = papaparse__WEBPACK_IMPORTED_MODULE_6___default().parse(response.data, {
                header: true,
                dynamicTyping: true
            });
            setItems(results.data);
        };
        fetchData();
    }, [
        language
    ]);
    const handleOnSearch = (string, results)=>{
        console.log(string, results);
    };
    const handleOnHover = (result)=>{
        console.log(result);
    };
    const handleOnSelect = (item)=>{
        setInitialText(item.name);
    };
    const clickButton = (buttonText)=>{
        setInitialText(buttonText);
        handleInitialSubmit(buttonText);
    };
    const handleOnClick = (e)=>{
        e.preventDefault();
    };
    const handleOnFocus = ()=>{
        console.log("Focused");
    };
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        handleInitialSubmit(initialText);
    };
    const formatResult = (item)=>{
        if (item && item.name) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    style: {
                        display: "block",
                        textAlign: "left"
                    },
                    children: item.name
                })
            });
        }
        return null;
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        id: "homepage",
        className: "flex flex-col h-screen items-center justify-between",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col items-center justify-center flex-grow",
                children: [
                    language === "Cymraeg" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Image, {
                        className: "pb-6",
                        height: 50,
                        fit: "contain",
                        src: "https://i.postimg.cc/bJhZ6j53/Frame-4.png"
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Image, {
                        className: "pb-6",
                        height: 50,
                        fit: "contain",
                        src: "https://i.postimg.cc/xTngTWcK/Group-7.png"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex mb-2 px-28 w-full",
                        children: [
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                                id: "searchbar",
                                className: "relative flex-grow pr-3",
                                onSubmit: handleFormSubmit,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_search_autocomplete__WEBPACK_IMPORTED_MODULE_4__.ReactSearchAutocomplete, {
                                    className: "autocomplete-dropdown",
                                    items: items,
                                    onSearch: handleOnSearch,
                                    onHover: handleOnHover,
                                    onSelect: handleOnSelect,
                                    onFocus: handleOnFocus,
                                    autoFocus: true,
                                    formatResult: formatResult,
                                    maxResults: 7,
                                    placeholder: language === "Cymraeg" ? "Gofyn cwestiwn..." : "Ask a question...",
                                    showNoResults: false,
                                    showIcon: false,
                                    styling: {
                                        borderRadius: "5px",
                                        fontSize: "14px",
                                        height: "38px"
                                    }
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.ActionIcon, {
                                id: "sendbutton",
                                className: "border border-gray-300 rounded h-10 w-10",
                                type: "submit",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconSend, {
                                    size: "1.125rem"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        id: "prompts",
                        className: "w-full flex gap-3 mb-2 pt-2 px-40 items-center justify-center gap-3",
                        children: [
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__.IconTrendingUp, {
                                size: "1.125rem",
                                style: {
                                    color: "#697075"
                                }
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                variant: "outline",
                                color: "gray",
                                radius: "xl",
                                compact: true,
                                style: {
                                    borderColor: "#D8DBDF",
                                    color: "#697075",
                                    fontWeight: "normal"
                                },
                                onClick: ()=>clickButton(language === "Cymraeg" ? "Sut alla i gael cymorth costau byw?" : "How can I get cost of living support?"),
                                children: language === "Cymraeg" ? "Costau byw" : "Cost of living"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                variant: "outline",
                                color: "gray",
                                radius: "xl",
                                compact: true,
                                style: {
                                    borderColor: "#D8DBDF",
                                    color: "#697075",
                                    fontWeight: "normal"
                                },
                                onClick: ()=>clickButton(language === "Cymraeg" ? "Pa help alla i ei gael gyda fy miliau ynni?" : "What help can I get with my energy bills?"),
                                children: language === "Cymraeg" ? "Biliau ynni" : "Energy bills"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                variant: "outline",
                                color: "gray",
                                radius: "xl",
                                compact: true,
                                style: {
                                    borderColor: "#D8DBDF",
                                    color: "#697075",
                                    fontWeight: "normal"
                                },
                                onClick: ()=>clickButton(language === "Cymraeg" ? "Sut mae cyflwyno hunanasesiad treth?" : "How do I submit a tax self assessment?"),
                                children: language === "Cymraeg" ? "Hunanasesiad treth" : "Tax self assessment"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                variant: "outline",
                                color: "gray",
                                radius: "xl",
                                compact: true,
                                style: {
                                    borderColor: "#D8DBDF",
                                    color: "#697075",
                                    fontWeight: "normal"
                                },
                                onClick: ()=>clickButton(language === "Cymraeg" ? "Sut mae gwneud cais am basbort?" : "How do I apply for a passport?"),
                                children: language === "Cymraeg" ? "Pasbort" : "Passport"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        id: "language",
                        className: "w-full flex gap-3 pt-3 px-40 items-center justify-center gap-3",
                        children: [
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.SegmentedControl, {
                                data: [
                                    {
                                        value: "English",
                                        label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Center, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                                    children: "\uD83C\uDDEC\uD83C\uDDE7"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                                    ml: 6,
                                                    sx: {
                                                        fontSize: "0.75rem"
                                                    },
                                                    children: "English"
                                                })
                                            ]
                                        })
                                    },
                                    {
                                        value: "Cymraeg",
                                        label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Center, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                                    children: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Box, {
                                                    ml: 6,
                                                    sx: {
                                                        fontSize: "0.75rem"
                                                    },
                                                    children: "Cymraeg"
                                                })
                                            ]
                                        })
                                    }
                                ],
                                onChange: setLanguage
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                id: "bottom",
                className: "w-full h-12 flex items-center justify-center gap-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        fz: "xs",
                        style: {
                            color: "#697075"
                        },
                        children: language === "Cymraeg" ? "Mae GOVGPT yn arbrawf" : "GOVGPT is an experiment"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            fontSize: "11px",
                            color: "#697075"
                        },
                        children: "|"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        fz: "xs",
                        style: {
                            color: "#697075"
                        },
                        children: [
                            language === "Cymraeg" ? "Cynnwys a gyhoeddwyd o dan y" : "Content published under the",
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
                                style: {
                                    textDecoration: "underline"
                                },
                                children: "Open Government Licence v3.0"
                            }),
                            "."
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            fontSize: "11px",
                            color: "#697075"
                        },
                        children: "|"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        fz: "xs",
                        style: {
                            color: "#697075"
                        },
                        children: [
                            language === "Cymraeg" ? "Adeiladwyd gyda ❤ yn \xf4l" : "Built with ❤ by",
                            "  ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "https://www.general-purpose.io",
                                style: {
                                    textDecoration: "underline"
                                },
                                children: "General Purpose"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;