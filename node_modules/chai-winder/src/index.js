import {
    valueMaps,
    flexdirection,
    justifyMap,
    alignMap,
    itemsMap,
    keyString,
    spacingKeys,
    p,
    m,
    colors,
    positionKeys,
    borderRadiusKeys,
    textutils,
    overFlowMap
} from "./maps.js"

export function applyChaiStyles() {

    document.addEventListener("DOMContentLoaded", () => {

        const domdomElement = Array.from(document.querySelectorAll('[class*="chai-"]'))

        domdomElement.forEach(domElement => {

            const allClasses = Array.from(domElement.classList)

            allClasses.forEach(cls => {

                let keyValueArr = cls.split("-").slice(1)
                let key = keyValueArr[0]
                let value

                // object-mappings (cursor, display, position)
                if (typeof valueMaps[key] === "object") {
                    if (key in keyString) {
                        switch (key) {

                            case "cur":
                            case "dp":
                            case "fix":
                                value = keyValueArr[1]
                                domElement.style[keyString[key]] = valueMaps[key][value]
                                break;
                        }
                    }
                }

                // spacing (padding, margin, gap)
                else if (spacingKeys.includes(key)) {
                    switch (key) {
                        case "m":
                            const values = keyValueArr.slice(1)

                            // Convert values (number → px, keep strings like "auto")
                            const parsedValues = values.map(v => {
                                return isNaN(v) ? v : `${Number(v)}px`
                            })

                            domElement.style.margin = parsedValues.join(" ")
                            break;

                        case "p":
                            const pValues = keyValueArr.slice(1)

                            const parsedP = pValues.map(v => {
                                return isNaN(v) ? v : `${Number(v)}px`
                            })

                            domElement.style.padding = parsedP.join(" ")
                            break;
                        case "mx":
                            const mxValue = keyValueArr[1]
                            const parsedMx = isNaN(mxValue) ? mxValue : `${Number(mxValue)}px`
                            domElement.style.marginLeft = parsedMx
                            domElement.style.marginRight = parsedMx
                            break;
                            case "my":
                            const myValue = keyValueArr[1]
                            const parsedMy = isNaN(mxValue) ? mxValue : `${Number(mxValue)}px`
                            domElement.style.marginTop = parsedMx
                            domElement.style.marginBottom = parsedMx
                            break;


                        case "g":
                            domElement.style.rowGap = `${Number(keyValueArr[1])}px`
                            domElement.style.columnGap = `${Number(keyValueArr[1])}px`
                            break;

                        default:
                            domElement.style[valueMaps[key]] = `${Number(keyValueArr[1])}px`
                    }
                }

                // position keys
                else if (positionKeys.includes(key)) {
                    if (key === "z") {
                        domElement.style[valueMaps[key]] = Number(keyValueArr[1])
                    } else {
                        domElement.style[valueMaps[key]] = `${Number(keyValueArr[1])}px`
                    }
                }

                // strings based 
                else {
                    switch (key) {

                        case "f":
                            if (isNaN(keyValueArr[1])) {
                                domElement.style[valueMaps[key]] = keyValueArr[1]
                            } else {
                                domElement.style[valueMaps[key]] = `${Number(keyValueArr[1])}px`
                            }
                            break;

                        case "fw":
                            domElement.style[valueMaps[key]] = keyValueArr[1]
                            break;
                        case "w":
                        case "h":
                        case "wmin":
                        case "wmax":
                        case "hmin":
                        case "hmax":
                            if (isNaN(keyValueArr[1])) {
                                domElement.style[valueMaps[key]] = keyValueArr[1]
                            } else {
                                domElement.style[valueMaps[key]] = `${keyValueArr[1]}px`
                            }
                            break;

                        case "op":
                            domElement.style[valueMaps[key]] = `${keyValueArr[1]}`
                            break;

                        case "ovr":
                            if (keyValueArr[1] === "x" || keyValueArr[1] === "y")
                                domElement.style[overFlowMap[keyValueArr[1]]] = keyValueArr[2]
                            else
                                domElement.style[valueMaps[key]] = overFlowMap[keyValueArr[1]]
                            break;

                        case "scale":
                            keyValueArr[1]
                            domElement.style.transform = `scale(${keyValueArr[1]})`
                            break;
                        case "rotate":

                            domElement.style.transform = `rotate(${keyValueArr[1]})`
                            break;
                        case "tX":
                            domElement.style.transform = `translateX(${keyValueArr[1]}px)`
                            break;
                        case "tY":
                            domElement.style.transform = `translateY(${keyValueArr[1]}px)`
                            break;
                        case "transition":
                            const classARR = cls.split("-").slice(1)

                            const tranFunc = classARR[1] || "all"
                            const dur = classARR[2] || "0.2"
                            const timeFunc = classARR.slice(3).join("-") || "ease"

                            const duration = dur.includes("ms") || dur.includes("s") ? dur : `${dur}s`

                            domElement.style.transition = `${tranFunc} ${duration} ${timeFunc}`
                            break;


                        case "flex":
                            value = keyValueArr.slice(1).join("-")
                            domElement.style[valueMaps[key]] = flexdirection[value]
                            break;

                        case "cols":
                            domElement.style[valueMaps[key]] = `repeat(${keyValueArr[1]}, 1fr)`
                            break;

                        case "rows":
                            domElement.style[valueMaps[key]] = `repeat(${keyValueArr[1]}, 1fr)`
                            break;

                        case "justify":
                            domElement.style.justifyContent = justifyMap[keyValueArr[1]]
                            break;

                        case "align":
                            domElement.style.alignContent = alignMap[keyValueArr[1]]
                            break;

                        case "items":
                            domElement.style.alignItems = itemsMap[keyValueArr[1]]
                            break;

                        case "border":
                            const borderWidth = keyValueArr[1] || 1
                            const borderColor = keyValueArr[2] || "black"
                            const borderStyle = keyValueArr[3] || "solid"

                            if (borderColor in colors) {
                                domElement.style[valueMaps[key]] =
                                    `${Number(borderWidth)}px ${borderStyle} ${borderColor}`
                            } else {
                                domElement.style[valueMaps[key]] =
                                    `${Number(borderWidth)}px ${borderStyle} #${borderColor}`
                            }
                            break;

                        case "rounded":
                            const borderRadius = keyValueArr[1] || 4
                            borderRadiusKeys.forEach(i =>
                                domElement.style[i] = `${Number(borderRadius)}px`
                            )
                            break;

                        case "bg":
                        case "text":
                            const val = keyValueArr[1]
                            if (val in colors) {
                                domElement.style[valueMaps[key]] = keyValueArr[1]
                            }
                            else if (["center", "left", "right", "justify"].includes(val)) {
                                domElement.style.textAlign = val
                            }
                            else if (["uppercase", "lowercase", "capitalize"].includes(val)) {
                                domElement.style.textTransform = val
                            }
                            else {
                                domElement.style[valueMaps[key]] = `#${keyValueArr[1]}`
                            }
                            break;
                        case "dec":
                            const decorationType = keyValueArr[2] || "line"
                            const decorationColor = keyValueArr[3] || "black"
                            const decorationWidth = keyValueArr[4] || 2
                            if (decorationColor in colors) {
                                domElement.style.textDecoration = `${decorationType} ${decorationColor} ${Number(decorationWidth)}px`
                            } else {
                                domElement.style.textDecoration = `${decorationType} #${decorationColor} ${Number(decorationWidth)}px`
                            }

                    }
                }
            })
        })
    })
}